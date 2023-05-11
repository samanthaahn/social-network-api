const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findById(req.params.userId)
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(500).json(error));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(500).json(error));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, no user with that ID!" })
          : res.json(user)
      )
      .catch((error) => res.status(500).json(error));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }).then((user) =>
      !user
        ? res.status(404).json({ message: "Sorry, no user with that ID!" })
        : Thought.deleteMany({ _id: { $in: user.thought } }).then(() =>
            res
              .json({ message: "User deleted!" })
              .catch((error) => res.status(500).json(error))
          )
    );
  },
  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, no user with that ID!" })
          : res.json(user)
      )
      .catch((error) => res.status(500).json(error));
  },
  // Remove a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, no user with that ID!" })
          : res.json(user)
      )
      .catch((error) => res.status(500).json(error));
  },
};
