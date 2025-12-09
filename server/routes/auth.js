const express = require('express');
const {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ====================================
// PUBLIC ROUTES (No authentication needed)
// ====================================

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', signup);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// ====================================
// PROTECTED ROUTES (Authentication required)
// ====================================

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get('/me', protect, getCurrentUser);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

// @route   POST /api/auth/logout
// @desc    Logout user (clear token on frontend)
// @access  Private
router.post('/logout', protect, logout);

module.exports = router;