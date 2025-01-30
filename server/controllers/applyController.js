const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Offer = require('../models/Offers');
const mongoose = require('mongoose');

const applyForOffer = asyncHandler(async (req, res) => {
  const offerId = req.params.id;
  const userId = req.user._id;

  console.log(`Applying for offer ID: ${offerId} by user ID: ${userId}`); // Add logging

  // Validate offer ID
  if (!mongoose.Types.ObjectId.isValid(offerId)) {
    return res.status(400).json({ message: "Invalid offer ID" });
  }

  // Check if user has already applied
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.appliedOffers.includes(offerId)) {
    return res.status(400).json({ message: "You have already applied for this offer" });
  }

  // Check if offer exists and is still active
  const offer = await Offer.findById(offerId);
  if (!offer) {
    return res.status(404).json({ message: "Offer not found" });
  }
  if (offer.status !== 'active') {
    return res.status(400).json({ message: "Offer is no longer active" });
  }

  // Add offer to user's applications
  user.appliedOffers.push(offerId);
  await user.save();

  res.status(200).json({ 
    message: "Successfully applied for the offer",
    appliedOffers: user.appliedOffers 
  });
});

const getAppliedOffers = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate('appliedOffers');
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user.appliedOffers);
});

module.exports = { applyForOffer, getAppliedOffers };
