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
// Add question to MongoDB
router.post("/add_question", (req, res) => {
    questionsModel.create(req.body)
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});
// Delete question to MongoDB
router.delete('/delete_question/:id',(req, res) => {
    questionsModel.deleteOne({_id:req.params.id})
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});
