const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};


// SIGNUP - Register new user

const signup = async (req, res) => {
  try {
    const { name, email, password, phone, city, address, userType, organizationName } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !city || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      city,
      address,
      userType: userType || 'individual',
      organizationName: organizationName || null
    });

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userWithoutPassword = user.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message
    });
  }
};


// LOGIN - Authenticate user

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare passwords
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userWithoutPassword = user.getPublicProfile();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};


// GET CURRENT USER - Get logged-in user info

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: user.getPublicProfile()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};


// UPDATE PROFILE - Update user information

const updateProfile = async (req, res) => {
  try {
    const { name, phone, city, address, bio, organizationName } = req.body;

    // Build update object (only update provided fields)
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (city) updateData.city = city;
    if (address) updateData.address = address;
    if (bio) updateData.bio = bio;
    if (organizationName) updateData.organizationName = organizationName;

    // Don't allow updating email or password here
    if (req.body.email || req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update email or password here'
      });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};


// LOGOUT - Clear token on frontend

const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  logout
};