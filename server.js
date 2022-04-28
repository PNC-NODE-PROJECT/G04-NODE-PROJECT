require('dotenv').config() //Use node .env file contains the individual user 
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // To allow any origin
app.use(express.json()); // To read json data in request body
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {console.log('listening on port ' + PORT)});
// Route for display 
let questionsRouter = require('./routes/question_route');
let usersRouter = require('./routes/user_route');
app.use('/questions', questionsRouter)
app.use('/users', usersRouter)
