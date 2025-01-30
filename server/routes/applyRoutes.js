const express = require('express');
const { applyOffer } = require('../controllers/applyController');
const router = express.Router();

// Apply for an offer
router.post('/apply/:offerId', applyOffer);

module.exports = router;
