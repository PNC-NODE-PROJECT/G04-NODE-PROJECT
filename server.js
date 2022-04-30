require('dotenv').config() //Use node .env file contains the individual user 
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: "*"})); // To allow any origin
app.use(express.json()); // To read json data in request body
app.use(express.static("public"));
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {console.log("http://localhost:"+PORT)});
// Route for display 
let questionsRouter = require('./routes/question_route');
let usersRouter = require('./routes/user_route');
let quizesRouter = require('./routes/quiz_route');
app.use('/questions', questionsRouter)
app.use('/users', usersRouter);
app.use('/quizes', quizesRouter);
