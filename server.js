let express = require("express");
let path = require("path");
let cors = require("cors");
let app = express();

let router=require('./app/routes/tutorial.routes.js')

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api',router);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });



app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000/`);
});
