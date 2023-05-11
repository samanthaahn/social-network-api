const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.OBjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString(),
    },
  },
  {
    toJSON: {
        getters: true,
    },
    _id: false,
  }
  );

  module.exports = reactionSchema;