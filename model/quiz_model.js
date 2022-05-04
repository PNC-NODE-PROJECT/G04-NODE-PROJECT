
const mongoose = require("mongoose");

// TODO: Connect to MangoDB
mongoose.connect("mongodb://127.0.0.1:27017/quiz_app")

// Check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () { console.log("Connected successfully"); });

// Question Schema
const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    answers:
    {
      A: { type: String, require: true },
      B: { type: String, require: true },
      C: { type: String, require: true },
      D: { type: String, require: true }
    },
    corr_answer: { type: String, require: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quiz_types" },

  }
)

// Quiz Schema 
const quizSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      require: true
    }
  }
)

// Score Schema
const ScoreSchema = new mongoose.Schema(
  {
    score: { type: String, require: true},
    dataTime:{ type: String, require: true},
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quiz_types" }
  }
)


// Create the Model for the Tasks collection from Schema
const questionModel = mongoose.model("display_questions", QuestionSchema);
const quizModel = mongoose.model("quiz_types", quizSchema);
const scoreModel = mongoose.model("scores", ScoreSchema);
module.exports.questionModel = questionModel;
module.exports.quizModel = quizModel;
module.exports.scoreModel = scoreModel;
