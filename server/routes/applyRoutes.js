const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { applyForOffer, getAppliedOffers } = require('../controllers/applyController');

// Apply for an offer
router.post('/apply/:id', protect, applyForOffer);

// Get all applied offers
router.get('/applied', protect, getAppliedOffers);

module.exports = router;
