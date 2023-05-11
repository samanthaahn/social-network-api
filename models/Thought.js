const mongoose = require("mongoose");

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
      defualt: Date.now,
      get: (date) => date.toLocaleDateString(),
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
