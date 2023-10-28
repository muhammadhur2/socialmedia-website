const Challenge = require('../models/challenge.model'); 

// Create a new Challenge
exports.createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json({ message: "Challenge created", challenge });
  } catch (error) {
    res.status(400).json({ message: "Error creating challenge", error });
  }
};

// List all Challenges
exports.listChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({});
    res.status(200).json({ challenges });
  } catch (error) {
    res.status(400).json({ message: "Error fetching challenges", error });
  }
};

// Get Challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    res.status(200).json({ challenge });
  } catch (error) {
    res.status(400).json({ message: "Challenge not found", error });
  }
};

// Update Challenge by ID
exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Challenge updated", challenge });
  } catch (error) {
    res.status(400).json({ message: "Error updating challenge", error });
  }
};

// Delete Challenge by ID
exports.deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Challenge deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting challenge", error });
  }
};
