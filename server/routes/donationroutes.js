const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  getDonations,
  createDonation,
  getDonation,
  acceptDonation,
  getDonationsByCity,
  getUserDonations,        
} = require('../controllers/donationcontroller');

// GET all available donations (for Browse)
router.get('/', getDonations);

// 🔹 GET donations for logged-in user (Profile)
router.get('/user', protect, getUserDonations);

// GET donations by city
router.get('/city/:city', getDonationsByCity);

// POST create donation (Protected)
router.post('/', protect, createDonation);

// GET single donation
router.get('/:id', getDonation);

// PUT accept donation
// PUT accept donation (user must be logged in)
router.put('/:id/accept', protect, acceptDonation);



module.exports = router;
