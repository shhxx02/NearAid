const jwt = require('jsonwebtoken');
const User = require('../models/User');


// PROTECT ROUTE - Verify JWT Token

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token payload
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Attach user to request object
      req.user = user;

      // Continue to next middleware/controller
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
        error: error.message
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error in authentication',
      error: error.message
    });
  }
};


// OPTIONAL AUTH - Get user if token exists, but don't require it

const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If token exists, verify it
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user) {
          req.user = user;
        }
      } catch (error) {
        // Token invalid, but we don't block the request
        console.log('Invalid token, but continuing...');
      }
    }

    // Continue regardless of token status
    next();

  } catch (error) {
    next();
  }
};

module.exports = { protect, optionalAuth };