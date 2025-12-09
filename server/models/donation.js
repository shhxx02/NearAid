// const mongoose = require('mongoose');

// const donationSchema= new mongoose.Schema({
//     title:{
//         type: String,
//         trime: true,
//         required: [true, 'Please provide a donation title'],
//         maxLength: [100, 'Title cannot exceed 100 characters']
//     },
//     description:{
//         type: String,
//         required: [true, 'Please provide a description'],
//         maxLength: [500, 'Description cannot exceed 500 characters']
//     },
//     category:{
//         type: String,
//         required: [true, 'Please select category'],
//         enum:  ['food', 'clothing', 'books', 'electronics', 'furniture', 'medical', 'other']
//     },
//     quantity:{
//         type: String,
//         required:[true, 'Please specify quantity']
//     },
//     condition: {
//         type: String,
//         enum: ['new', 'like-new', 'good', 'fair'],
//         default: 'good'
//     },
//     location: {
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         coordinates: {
//             lat: { type: Number, required: true },
//             lng: { type: Number, required: true }
//         }
//     },
//     donor:{
//         name:{
//             type: String,
//             required: [true, 'Please provide donor name']
//         },
//         phone: {
//             type: String,
//             required: [true, 'Please provide contact number']
//         },
//         email: String
//     },
//     postedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['available', 'accepted', 'completed', 'cancelled'],
//         default: 'available'
//     },
//     acceptedBy: {
//         name: String,
//         phone: String,
//         acceptedAt: Date
//     },    
//     images: [{
//         type: String  // Will store image URLs later
//     }],
//     expiryDate: {
//         type: Date  // For perishable items like food
//     }
//     }, {
//     timestamps: true  // Automatically adds createdAt and updatedAt
// });   

// donationSchema.index({'location.city':1, status:1});
// donationSchema.index({category:1, status:1});
// donationSchema.index({createdAt: -1});


// module.exports = mongoose.model('Donation', donationSchema);


const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please provide a donation title'],
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select category'],
    enum: ['food', 'clothing', 'books', 'electronics', 'furniture', 'medical', 'other']
  },
  quantity: {
    type: String,
    required: [true, 'Please specify quantity']
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'good', 'fair'],
    default: 'good'
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  donor: {
    name: { type: String, required: [true, 'Please provide donor name'] },
    phone: { type: String, required: [true, 'Please provide contact number'] },
    email: String
  },
  images: {
  type: [String],
  default: [],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'accepted', 'completed', 'cancelled'],
    default: 'available'
  },
  acceptedBy: {
    name: String,
    phone: String,
    acceptedAt: Date
  },
  acceptedByUser: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null
  },

  images: [{
    type: String
  }],
  expiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
donationSchema.index({ 'location.city': 1, status: 1 });
donationSchema.index({ category: 1, status: 1 });
donationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Donation', donationSchema);
