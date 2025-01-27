const Offers = require('../models/Offers');

// Get all offers, sorted by the latest posting on top
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offers.find().sort({ posted: -1 }); // -1 for descending order
        res.status(200).json(offers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch offers" });
    }
};

module.exports = { getAllOffers };
