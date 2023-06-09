const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    console.log('Getting thoughts')
    Thought.find()
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((error) => {
        console.log(error)
        res.status(500).json(error);
      }
      )
  },
  // Gets a single thought by ID
  getSingleThought(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((error) => res.status(500).json(error));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((error) => res.status(500).json((error)));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { renValidators: true, new: true }
    ).then((thought) =>
      !thought
        ? res.status(400).json({ message: "Sorry, no thought with that id!" })
        : res.json(thought)
    );
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "Sorry, no thought with that id!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(() => res.json({ message: "Your thought has been deleted!" }))
      .catch((error) => res.status(500).json(error));
  },
  // Add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought with that ID!" })
        : res.json(thought)
    )
    .catch((error) => res.status(500).json(error));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought with that ID!" })
        : res.json(thought)
    )
    .catch((error) => res.status(500).json(error));
  },
};
