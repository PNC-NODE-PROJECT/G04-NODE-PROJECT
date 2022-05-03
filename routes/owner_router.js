const express = require('express')
const router = express.Router() //new router
const theCollections = require("../model/quiz_model");
const ownerModel = theCollections.ownerModel;

// display all questions in MongoDB
router.get("/own_question", (req, res) => {
    ownerModel.find()
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

module.exports = router;