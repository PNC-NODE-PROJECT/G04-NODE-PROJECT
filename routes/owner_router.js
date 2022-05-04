const express = require('express')
const fs = require("fs")
const router = express.Router() //new router

// display all questions in MongoDB
router.get("/own_question", (req, res) => {
    let readFile = JSON.parse(fs.readFileSync("questions.json"))
    res.send(readFile);
});

module.exports = router;