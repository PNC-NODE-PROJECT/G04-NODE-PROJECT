const express = require('express')
const router = express.Router() //new router
const theCollections = require("../model/quiz_model");
const questionsModel = theCollections.questionModel;

// display all questions in MongoDB
router.get("/display_question", (req, res) => {
    questionsModel.find()
    .populate("userId")
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});
module.exports = router;