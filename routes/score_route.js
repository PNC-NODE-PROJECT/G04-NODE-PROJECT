const express = require('express')
const router = express.Router() //new router
const theCollections = require("../model/quiz_model");
const scoreModel = theCollections.scoreModel;

// display all User
router.get("/display_score", (req, res) => {
    scoreModel.find()
    .populate("quizId")
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

// Add users to Database
router.post("/add_score", (req, res) => {
    scoreModel.create(req.body)
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

// Delete users to Database
router.delete('/delete_score/:id',(req, res) => {
    scoreModel.deleteOne({_id:req.params.id})
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

module.exports = router;