const express = require("express");
const router = express.Router();
const tutorials = require("../controllers/tutorial.controller.js");

// Create a new Tutorial
router.post("/", tutorials.create);


router.get("/", tutorials.findAll);

router.get("/published", tutorials.findAllPublished);

router.get("/:id", tutorials.findOne);

router.put("/:id", tutorials.update);

router.delete("/:id", tutorials.delete);

router.delete("/", tutorials.deleteAll);

module.exports = router;
