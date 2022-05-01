
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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

  }
)

// Users Schema 
const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email_address: { type: String, require: true },
    password: { type: String, require: true }
  }
)

// Quiz Schema 
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    }
  }
)
// Create the Model for the Tasks collection from Schema
const questionModel = mongoose.model("display_questions", QuestionSchema);
const userModel = mongoose.model("users", UserSchema);
const quizModel = mongoose.model("quiz_types", quizSchema);
module.exports.questionModel = questionModel;
module.exports.userModel = userModel;
module.exports.quizModel = quizModel;