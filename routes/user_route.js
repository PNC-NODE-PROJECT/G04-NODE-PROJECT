const express = require('express')
const router = express.Router() //new router
const theCollections = require("../model/quiz_model");
const usersModel = theCollections.userModel;

// display all User
router.get("/display_user", (req, res) => {
    usersModel.find()
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

// Add users to Database
router.post("/add_user", (req, res) => {
    usersModel.create(req.body)
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

// Delete users to Database
router.delete('/delete_user/:id',(req, res) => {
    usersModel.deleteOne({_id:req.params.id})
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
});

// Update users to Database
router.put('/update_user/:id',(req, res) => {
    usersModel.updateOne({_id:req.params.id},req.body)
    .then((result) =>res.send(result))
    .catch((error) =>res.send(error))
})
module.exports = router;