const express = require('express')
const router = express.Router() //new router
const collection = require("../model/quiz_model");
const quizesModel = collection.quizModel;
const questionInQuizModel = collection.questionModel;
const scoreModel = collection.scoreModel

// display all questions in MongoDB
router.get("/quiz-title/", (req, res) => {
    quizesModel.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error)
    })
});

// Add question to MongoDB
router.post("/add_quiz", (req, res) => {
    quizesModel.create(req.body)
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

// Delete question to MongoDB
router.delete('/delete_question/:id',(req, res) => {
    quizesModel.deleteOne({_id:req.params.id}).then(
        questionInQuizModel.deleteMany({quizId:req.params.id}).then(
            scoreModel.deleteMany({quizId:req.params.id})
            .then((result) =>res.send(result))
            .catch((error) =>res.send(error))
        )
    )
});

 // Update question to MongoDB
router.put('/update_question/:id',(req, res) => {
    quizesModel.updateOne({_id:req.params.id},req.body)
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
})
module.exports = router;