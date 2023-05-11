const { User, Thought } = require('../models');

module.exports = {
// Get all users
    getUsers(req,res) {
    User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json(error))
},
// Get a single user
getSingleUser(req, res) {
User.findById(req.params.userId)
.then
.catch


},
// Create a new user
createUser(req, res) {

    .then
    .catch

},
// Update a user
updateUser(req, res) {
    .then
    .catch


},
// Delete a user
deleteUser(req, res) {

    .then
    .catch

},
// Add a friend
addFriend(req, res) {
    .then
    .catch


},
// Remove a friend
deleteFriend(req, res) {
    .then
    .catch


}







}