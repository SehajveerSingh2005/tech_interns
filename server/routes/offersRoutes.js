const express = require("express");
const { getAllOffers } = require("../controllers/offersController");
const router = express.Router();

router.get("/", getAllOffers);

module.exports = router;
