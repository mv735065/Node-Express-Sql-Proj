const db = require("./db.js");


// Create a table in the database
db.serialize(() => {
  // SQL query to create a table
  const createTableQuery = `CREATE TABLE IF NOT EXISTS tutorials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    published BOOLEAN DEFAULT false
  );`;


  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully!');
    }
  });
});

class Tutorial {
  constructor(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  }

  // Create a new tutorial
  static create(newTutorial, result) {
    const sql = "INSERT INTO tutorials (title, description, published) VALUES (?, ?, ?)";
    
    db.run(sql, [newTutorial.title, newTutorial.description, newTutorial.published], function (err) {
      if (err) {
        return result(err, null);
      }
      result(null, { id: this.lastID}); // Return the created tutorial with ID
    });
  }

  // Find a tutorial by ID
  static findById(id, result) {
    const sql = "SELECT * FROM tutorials WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        return result(err, null);
      }
      if (!row) {
        return result({ kind: "not_found" }, null); // Tutorial not found
      }
      result(null, row); // Return the found tutorial
    });
  }

  // Get all tutorials with title search
  static getAll(title, result) {
    const sql = "SELECT * FROM tutorials WHERE title LIKE ?";
    const searchTitle = `%${title}%`;
    db.all(sql, [searchTitle], (err, rows) => {
      if (err) {
        return result(err, null);
      }
      result(null, rows); // Return all matching tutorials
    });
  }

  // Get all published tutorials
  static getAllPublished(result) {
    const sql = "SELECT * FROM tutorials WHERE published = 1"; // Published is 1 for true
    db.all(sql, (err, rows) => {
      if (err) {
        return result(err, null);
      }
      result(null, rows); // Return all published tutorials
    });
  }

  // Update tutorial by ID
  static updateById(id, tutorial, result) {
    const sql = "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?";
    db.run(sql, [tutorial.title, tutorial.description, tutorial.published, id], function (err) {
      if (err) {
        return result(err, null);
      }
      if (this.changes === 0) {
        return result({ kind: "not_found" }, null); 
      }
      result(null, { id: id, ...tutorial });
    });
  }

  // Remove a tutorial by ID
  static remove(id, result) {
    const sql = "DELETE FROM tutorials WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) {
        return result(err, null);
      }
      if (this.changes === 0) {
        return result({ kind: "not_found" }, null); // Tutorial not found
      }
      result(null, { message: "deleted", id: id }); // Return the deleted tutorial ID
    });
  }

  // Remove all tutorials
  static removeAll(result) {
    const sql = "DELETE FROM tutorials";
    db.run(sql, function (err) {
      if (err) {
        return result(err, null);
      }
      result(null, { message: `deleted ${this.changes} tutorials` });
    });
  }
}

module.exports = Tutorial;
