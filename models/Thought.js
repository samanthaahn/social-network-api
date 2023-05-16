const mongoose = require("mongoose");

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

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleString("en-US"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);





thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought; 
