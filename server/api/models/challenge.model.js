const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    complexity: { type: String, enum: ['Bronze', 'Silver', 'Gold'], required: true },
    tags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },
  },
  { collection: 'challenge-data', timestamps: true }
);

const ChallengeModel = mongoose.model('ChallengeData', ChallengeSchema);

module.exports = ChallengeModel;
