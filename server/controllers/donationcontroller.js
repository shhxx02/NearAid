// const Donation = require('../models/Donation');
// const User = require('../models/User'); 

// // Get all donations
// const getDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find({ status: 'available' })
//       .sort({ createdAt: -1 });
    
//     res.status(200).json({
//       success: true,
//       count: donations.length,
//       data: donations
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };

// // Create new donation
// const createDonation = async (req, res) => {
//   try {
//     // Add postedBy field from authenticated user
//     const donationData = {
//       ...req.body,
//       postedBy: req.user.id,
//       // If donor info not provided, use logged-in user's info
//       donor: {
//         name: req.body.donor?.name || req.user.name,
//         phone: req.body.donor?.phone || req.user.phone,
//         email: req.body.donor?.email || req.user.email
//       }
//     };

//     const donation = await Donation.create(donationData);
    
//     // Update user's donation count
//     await User.findByIdAndUpdate(req.user.id, {
//       $inc: { donationsPosted: 1 }
//     });
    
//     res.status(201).json({
//       success: true,
//       message: 'Donation created successfully',
//       data: donation
//     });
//   } catch (error) {
//     console.error('Donation creation error:', error);
//     res.status(400).json({
//       success: false,
//       message: 'Failed to create donation',
//       error: error.message
//     });
//   }
// };

// // Get single donation
// const getDonation = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);
    
//     if (!donation) {
//       return res.status(404).json({
//         success: false,
//         message: 'Donation not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: donation
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };

// // Accept a donation
// const acceptDonation = async (req, res) => {
//   try {
//     const { name, phone } = req.body;
    
//     const donation = await Donation.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: 'accepted',
//         acceptedBy: {
//           name,
//           phone,
//           acceptedAt: new Date()
//         }
//       },
//       { new: true, runValidators: true }
//     );
    
//     if (!donation) {
//       return res.status(404).json({
//         success: false,
//         message: 'Donation not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       message: 'Donation accepted successfully',
//       data: donation
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Failed to accept donation',
//       error: error.message
//     });
//   }
// };

// // Get donations by city
// const getDonationsByCity = async (req, res) => {
//   try {
//     const donations = await Donation.find({
//       'location.city': new RegExp(req.params.city, 'i'),
//       status: 'available'
//     }).sort({ createdAt: -1 });
    
//     res.status(200).json({
//       success: true,
//       count: donations.length,
//       data: donations
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   getDonations,
//   createDonation,
//   getDonation,
//   acceptDonation,
//   getDonationsByCity
// };


const Donation = require('../models/donation');
const User = require('../models/User');

// 🟢 Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// 🟢 Create new donation
exports.createDonation = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      quantity,
      condition,
      location,
      donor,
      images,
    } = req.body;

    const normalizedCategory = category?.toLowerCase();


    // ✅ Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !quantity ||
      !location ||
      !location.address ||
      !location.city ||
      !location.coordinates ||
      !location.coordinates.lat ||
      !location.coordinates.lng
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required location or donation fields'
      });
    }

    const donation = await Donation.create({
      title,
      description,
      category: normalizedCategory, // ✅ fixed
      quantity,
      condition,
      location,
      donor,
      images: Array.isArray(images) ? images : images ? [images] : [],
      postedBy: req.user._id
    });

    // Update user's donation count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { donationsPosted: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: donation
    });
  } catch (error) {
    console.error('❌ Create donation error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 🟢 Get single donation
exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// 🟢 Accept a donation
exports.acceptDonation = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // logged-in user
    const userId = req.user._id;

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'accepted',
        acceptedBy: { name, phone, acceptedAt: new Date() },
        acceptedByUser: userId,              // 🔹 tie it to this user
      },
      { new: true, runValidators: true }
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation accepted successfully',
      data: donation
    });
  } catch (error) {
    console.error('Accept donation error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to accept donation',
      error: error.message
    });
  }
};


// 🟢 Get donations by city
exports.getDonationsByCity = async (req, res) => {
  try {
    const donations = await Donation.find({
      'location.city': new RegExp(req.params.city, 'i'),
      status: 'available'
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


// 🟢 Get donations related to the logged-in user (posted OR accepted)
exports.getUserDonations = async (req, res) => {
  try {
    const userId = req.user._id;

    const donations = await Donation.find({
      $or: [
        { postedBy: userId },         // donations I posted
        { acceptedByUser: userId },   // donations I accepted
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error('Get user donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};


