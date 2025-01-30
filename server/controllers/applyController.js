const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Offer = require('../models/Offers');

const applyOffer = asyncHandler(async (req, res) => {
  const { offerId } = req.params;
  const userId = req.user.id; // Make sure the user is authenticated
  
  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the offer exists
  const offer = await Offer.findById(offerId);
  if (!offer) {
    return res.status(404).json({ message: "Offer not found" });
  }

  // Check if the user has already applied for the offer
  if (user.appliedOffers.includes(offerId)) {
    return res.status(400).json({ message: "You have already applied for this offer" });
  }

  // Add the offer to the user's appliedOffers array
  user.appliedOffers.push(offerId);
  await user.save();

  res.status(200).json({ message: "Successfully applied for the offer", appliedOffers: user.appliedOffers });
});

module.exports = { applyOffer };
