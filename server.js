require('dotenv').config()
const express = require('express');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000


app.use(cors({origin: "*"}));
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})