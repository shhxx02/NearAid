const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxLength: [50, 'Name cannot exceed 50 characters']
  },

  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password in queries by default
  },

  phone: {
    type: String,
    required: [true, 'Please provide a phone number']
  },

  // Profile Information
  userType: {
    type: String,
    enum: ['individual', 'organization'],
    default: 'individual'
  },

  organizationName: {
    type: String,
    trim: true
  },

  city: {
    type: String,
    required: [true, 'Please provide your city']
  },

  address: {
    type: String,
    required: [true, 'Please provide your address']
  },

  bio: {
    type: String,
    maxLength: [500, 'Bio cannot exceed 500 characters']
  },

  profilePicture: {
    type: String,
    default: null // URL to profile image
  },

  // Statistics
  donationsPosted: {
    type: Number,
    default: 0
  },

  donationsAccepted: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },

  reviews: [{
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Account Status
  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Get public profile (without password)
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  return user;
};

module.exports = mongoose.model('User', userSchema);