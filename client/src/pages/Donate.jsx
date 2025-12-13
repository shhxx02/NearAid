// import React, { useState, useEffect } from 'react';
// import { donationAPI } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// const Donate = () => {
//   const { user } = useAuth();
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'food',
//     quantity: '',
//     condition: 'good',
//     location: {
//       address: '',
//       city: ''
//     },
//     donor: {
//       name: '',
//       phone: '',
//       email: ''
//     },
//     images: []
//   });

//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const categories = ['food', 'clothing', 'books', 'electronics', 'furniture', 'medical', 'other'];
//   const conditions = ['new', 'like-new', 'good', 'fair'];

//   // Auto-fill donor info from logged-in user
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         donor: {
//           name: user.name || '',
//           phone: user.phone || '',
//           email: user.email || ''
//         },
//         location: {
//           ...prev.location,
//           city: user.city || ''
//         }
//       }));
//     }
//   }, [user]);

//   // Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//       console.log("🟡 Selected file:", file);

//     setUploadingImage(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('token');
//       const uploadFormData = new FormData();
//       uploadFormData.append('image', file);

//       console.log("🟢 Sending upload request...");


//       const response = await axios.post(
//         'http://localhost:5000/api/upload/single',
//         uploadFormData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       console.log("✅ Upload success:", response.data);

//       // Add image URL to formData
//       setFormData(prev => ({
//         ...prev,
//         images: [...prev.images, response.data.imageUrl]
//       }));

//       setUploadingImage(false);
//     } catch (err) {
//       console.error("❌ Upload failed:", err.response?.data || err.message);
//       setError('Failed to upload image');
//       setUploadingImage(false);
//     }
//   };

//   // Remove image
//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLocationChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         [name]: value
//       }
//     }));
//   };

//   const handleDonorChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       donor: {
//         ...prev.donor,
//         [name]: value
//       }
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.title.trim()) return 'Title is required';
//     if (!formData.description.trim()) return 'Description is required';
//     if (!formData.quantity.trim()) return 'Quantity is required';
//     if (!formData.location.address.trim()) return 'Address is required';
//     if (!formData.location.city.trim()) return 'City is required';
//     if (!formData.donor.name.trim()) return 'Your name is required';
//     if (!formData.donor.phone.trim()) return 'Phone number is required';
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       await donationAPI.createDonation(formData);
//       setSuccess(true);
      
//       // Reset form
//       setFormData({
//         title: '',
//         description: '',
//         category: 'food',
//         quantity: '',
//         condition: 'good',
//         location: {
//           address: '',
//           city: user?.city || ''
//         },
//         donor: {
//           name: user?.name || '',
//           phone: user?.phone || '',
//           email: user?.email || ''
//         },
//         images: []
//       });
      
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to create donation');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
//           Donate Items 💚
//         </h1>

//         {success && (
//           <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
//             ✅ Donation posted successfully! Thank you for giving back!
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Item Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="e.g., Winter Jackets"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Description *
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Describe the item in detail..."
//               rows="4"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Category & Quantity Row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {categories.map(cat => (
//                   <option key={cat} value={cat}>
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Quantity *
//               </label>
//               <input
//                 type="text"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 5 items"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           {/* Condition */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Condition *
//             </label>
//             <select
//               name="condition"
//               value={formData.condition}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               {conditions.map(cond => (
//                 <option key={cond} value={cond}>
//                   {cond.charAt(0).toUpperCase() + cond.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Address & City Row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Address *
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.location.address}
//                 onChange={handleLocationChange}
//                 placeholder="e.g., MG Road"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 City *
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.location.city}
//                 onChange={handleLocationChange}
//                 placeholder="e.g., Karnal"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           {/* Donor Name, Phone, Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.donor.name}
//               onChange={handleDonorChange}
//               placeholder="Your full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Phone Number *
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.donor.phone}
//               onChange={handleDonorChange}
//               placeholder="9876543210"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Email (Optional)
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.donor.email}
//               onChange={handleDonorChange}
//               placeholder="your@email.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Image Upload Section */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Upload Images (Optional)
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               disabled={uploadingImage}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             {uploadingImage && (
//               <p className="text-sm text-blue-600 mt-2">Uploading image...</p>
//             )}
            
//             {/* Display uploaded images */}
//             {formData.images.length > 0 && (
//               <div className="mt-4 grid grid-cols-3 gap-4">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img 
//                       src={image} 
//                       alt={`Upload ${index + 1}`} 
//                       className="w-full h-32 object-cover rounded-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
//           >
//             {loading ? 'Posting...' : 'Post Donation'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Donate;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationAPI } from '../services/api'; // ✅ Changed import
import axios from 'axios'; // ✅ Added for image upload

const Donate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // ✅ Image upload state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Food',
    quantity: '',
    condition: 'new',
    address: '',
    city: '',
    donorName: '',
    donorPhone: '',
    donorEmail: '',
    coordinates: { lat: null, lng: null },
    images: [] // ✅ Added image field
  });

  const categories = [
    'Food', 'Clothing', 'Books', 'Furniture', 'Electronics',
    'Toys', 'Medical', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Image upload handler
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls = [];
    setUploading(true);

    try {

      const isProduction = window.location.hostname !== 'localhost';
      const API_BASE = isProduction 
        ? 'https://nearaid.onrender.com/api'
        : 'http://localhost:5000/api';

      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        const res = await axios.post(`${API_BASE}/upload/single`, formDataUpload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.data?.imageUrl) {
          uploadedUrls.push(res.data.imageUrl);
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

      alert('✅ Images uploaded successfully!');
    } catch (err) {
      console.error('❌ Image upload failed:', err);
      alert('❌ Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Default coordinates for major cities
  const getCityCoordinates = (city) => {
    const cityCoords = {
      'Delhi': { lat: 28.6139, lng: 77.2090 },
      'New Delhi': { lat: 28.6139, lng: 77.2090 },
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Bangalore': { lat: 12.9716, lng: 77.5946 },
      'Bengaluru': { lat: 12.9716, lng: 77.5946 },
      'Hyderabad': { lat: 17.3850, lng: 78.4867 },
      'Chennai': { lat: 13.0827, lng: 80.2707 },
      'Kolkata': { lat: 22.5726, lng: 88.3639 },
      'Pune': { lat: 18.5204, lng: 73.8567 },
      'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
      'Jaipur': { lat: 26.9124, lng: 75.7873 },
      'Lucknow': { lat: 26.8467, lng: 80.9462 },
      'Kanpur': { lat: 26.4499, lng: 80.3319 },
      'Nagpur': { lat: 21.1458, lng: 79.0882 },
      'Indore': { lat: 22.7196, lng: 75.8577 },
      'Thane': { lat: 19.2183, lng: 72.9781 },
      'Bhopal': { lat: 23.2599, lng: 77.4126 },
      'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
      'Pimpri-Chinchwad': { lat: 18.6298, lng: 73.7997 },
      'Patna': { lat: 25.5941, lng: 85.1376 }
    };

    return cityCoords[city] || { lat: 28.6139, lng: 77.2090 }; // Default to Delhi
  };

  // Geocode address to get coordinates
  const getCoordinates = async () => {
    if (!formData.address || !formData.city) {
      alert('⚠️ Please enter both address and city first');
      return;
    }

    setGeoLoading(true);
    try {
      const fullAddress = `${formData.address}, ${formData.city}, India`;
      console.log('🔍 Searching for:', fullAddress);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`,
        { headers: { 'User-Agent': 'NearAid/1.0' } }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setFormData(prev => ({ ...prev, coordinates: coords }));
        alert(`✅ Location found!\nLat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}`);
      } else {
        const defaultCoords = getCityCoordinates(formData.city);
        setFormData(prev => ({ ...prev, coordinates: defaultCoords }));
        alert(`📍 Using default coordinates for ${formData.city}`);
      }
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      const defaultCoords = getCityCoordinates(formData.city);
      setFormData(prev => ({ ...prev, coordinates: defaultCoords }));
      alert(`⚠️ Network error. Using default coordinates for ${formData.city}`);
    } finally {
      setGeoLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coordinates.lat || !formData.coordinates.lng) {
      alert('⚠️ Please click "Get Location Coordinates" before submitting');
      return;
    }

    setLoading(true);
    try {
      const donationData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        quantity: formData.quantity,
        condition: formData.condition,
        location: {
          address: formData.address,
          city: formData.city,
          coordinates: formData.coordinates
        },
        donor: {
          name: formData.donorName,
          phone: formData.donorPhone,
          email: formData.donorEmail
        },
        images: formData.images // ✅ include images
      };

      console.log('📤 Submitting donation:', donationData);
      const response = await donationAPI.createDonation(donationData);
      console.log('✅ Donation created:', response);
      
      alert('✅ Donation posted successfully!');
      navigate('/browse');
    } catch (error) {
      console.error('❌ Error creating donation:', error);
      alert(`❌ Failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const buildImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return img; // already full URL
    }
    const isProduction = window.location.hostname !== 'localhost';
    const BASE = isProduction 
      ? 'https://nearaid.onrender.com'
      : 'http://localhost:5000';
      
    return `${BASE}/${img.replace(/^\/+/, '')}`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Post a Donation
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Share what you want to donate and help someone in need
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Item Details Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
                Item Details
              </h2>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Rice Bags, Winter Clothes" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Describe the items in detail..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Quantity *</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="e.g., 10 bags" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Condition *</label>
                <select name="condition" value={formData.condition} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              {/* ✅ Image Upload Section */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Upload Images (Optional)</label>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full border-2 border-gray-300 rounded-lg p-2" />
                {uploading && <p className="text-blue-600 text-sm mt-2">Uploading images...</p>}
                {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.images.map((img, i) => (
                    <img
                      key={i}
                      src={buildImageUrl(img)}
                      alt="Uploaded"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}

              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 pb-2">
                📍 Location
              </h2>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Street address, area, landmark" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="e.g., Delhi, Mumbai" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>📌 Location on Map:</strong> Click the button to find your location coordinates
                    </p>
                    {formData.coordinates.lat && (
                      <p className="text-xs text-green-600 font-semibold">
                        ✅ Coordinates: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                  <button type="button" onClick={getCoordinates} disabled={geoLoading} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
                    {geoLoading ? 'Finding...' : '🗺️ Get Coordinates'}
                  </button>
                </div>
              </div>
            </div>

            {/* Donor Info Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-purple-500 pb-2">
                Your Contact Information
              </h2>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                <input type="text" name="donorName" value={formData.donorName} onChange={handleChange} required placeholder="Your full name" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                  <input type="tel" name="donorPhone" value={formData.donorPhone} onChange={handleChange} required placeholder="Your phone number" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input type="email" name="donorEmail" value={formData.donorEmail} onChange={handleChange} required placeholder="Your email address" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !formData.coordinates.lat}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting Donation...' : '🎁 Post Donation'}
            </button>

            {!formData.coordinates.lat && (
              <p className="text-center text-red-600 text-sm font-semibold">
                ⚠️ Please click "Get Coordinates" before submitting
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;
