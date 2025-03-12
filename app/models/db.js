
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// const dbPath = './mydatabase.db' || '';

// // Delete the database file (for development purposes)
// if(dbPath)
// fs.unlinkSync(dbPath); // Deletes the existing database file

// Create a new database


const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});



  
  module.exports = db;
