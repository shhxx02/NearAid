// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { donationAPI } from '../services/api';
// import AcceptDonationModal from '../components/AcceptDonationModal';

// const DonationDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [donation, setDonation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch donation details when component mounts
//   useEffect(() => {
//     const fetchDonation = async () => {
//       try {
//         const response = await donationAPI.getDonationById(id);
//         setDonation(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error:', err);
//         setError(err.message || 'Failed to load donation');
//         setLoading(false);
//       }
//     };

//     fetchDonation();
//   }, [id]);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleAcceptSuccess = () => {
//     alert('✅ Donation accepted! Redirecting...');
//     navigate('/browse');
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
//       <p className="text-xl text-gray-600">Loading donation details...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate('/browse')}
//           className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
//         >
//           ← Back to Browse
//         </button>
//         <div className="bg-red-100 text-red-700 p-6 rounded-lg">
//           ❌ {error}
//         </div>
//       </div>
//     </div>
//   );

//   if (!donation) return (
//     <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
//       <p className="text-xl text-gray-600">Donation not found</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Back Button */}
//         <button
//           onClick={() => navigate('/browse')}
//           className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
//         >
//           ← Back to Browse
//         </button>

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
//           {/* Images Section */}
//           {donation.images && donation.images.length > 0 && (
//             <div className="w-full">
//               <img 
//                 src={donation.images[0]} 
//                 alt={donation.title}
//                 className="w-full h-96 object-cover"
//               />
//               {donation.images.length > 1 && (
//                 <div className="grid grid-cols-4 gap-2 p-4">
//                   {donation.images.slice(1).map((image, index) => (
//                     <img 
//                       key={index}
//                       src={image} 
//                       alt={`${donation.title} ${index + 2}`}
//                       className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
          
//           {/* Header with Status */}
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-4xl font-bold mb-2">{donation.title}</h1>
//                 <span className="inline-block bg-green-400 text-green-900 px-4 py-1 rounded-full font-semibold">
//                   Available
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="p-8">
            
//             {/* Description Section */}
//             <div className="mb-8 pb-8 border-b">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 {donation.description}
//               </p>
//             </div>

//             {/* Details Grid */}
//             <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
              
//               {/* Item Details */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Item Details</h3>
//                 <div className="space-y-4">
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600">Category</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}
//                     </p>
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600">Quantity</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.quantity}
//                     </p>
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600">Condition</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.condition.charAt(0).toUpperCase() + donation.condition.slice(1)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Location Details */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Pickup Location</h3>
//                 <div className="space-y-4">
//                   <div className="bg-green-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600">Address</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.location.address}
//                     </p>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600">City</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.location.city}
//                     </p>
//                   </div>
//                   {donation.location.coordinates?.latitude && (
//                     <div className="bg-green-50 p-4 rounded-lg">
//                       <p className="text-sm text-gray-600">Coordinates</p>
//                       <p className="text-lg font-semibold text-gray-800">
//                         {donation.location.coordinates.latitude}, {donation.location.coordinates.longitude}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Donor Information */}
//             <div className="mb-8">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Donor Information</h3>
//               <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-sm text-gray-600">Name</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.donor.name}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Phone</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {donation.donor.phone}
//                     </p>
//                   </div>
//                   {donation.donor.email && (
//                     <div>
//                       <p className="text-sm text-gray-600">Email</p>
//                       <p className="text-lg font-semibold text-gray-800">
//                         {donation.donor.email}
//                       </p>
//                     </div>
//                   )}
//                   <div className="text-sm text-gray-600 pt-3 border-t">
//                     <p>Contact the donor after accepting to arrange pickup.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Timestamps */}
//             <div className="text-sm text-gray-600 pb-6 border-b">
//               <p>Posted on: {new Date(donation.createdAt).toLocaleDateString()}</p>
//             </div>

//             {/* Accept Button */}
//             <div className="pt-8">
//               <button
//                 onClick={handleOpenModal}
//                 className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
//               >
//                 Accept This Donation 💚
//               </button>
//               <p className="text-center text-sm text-gray-600 mt-3">
//                 Click to accept and contact the donor
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Accept Modal */}
//       {donation && (
//         <AcceptDonationModal
//           donation={donation}
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onSuccess={handleAcceptSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default DonationDetail;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { donationAPI } from '../services/api';
import AcceptDonationModal from '../components/AcceptDonationModal';
import DonationMap from '../components/DonationMap';

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    return `http://localhost:5000/${imgPath.replace(/^\/+/, '')}`;
  };

  const fetchDonation = async () => {
  try {
    setLoading(true);

    // this returns response.data from api.js
    const result = await donationAPI.getDonationById(id);

    // backend shape: { success, data: { ...donation } }
    const donationData = result.data || result; 
    setDonation(donationData);
  } catch (error) {
    console.error('Error fetching donation:', error);
    alert('Failed to load donation details');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (id) {
      fetchDonation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Donation not found</h2>
          <button
            onClick={() => navigate('/browse')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Browse
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">{donation.title}</h1>
                <p className="text-blue-100 text-lg">{donation?.category || 'Uncategorized'}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  donation?.status || ''
                )}`}
              >
                {donation?.status ? donation.status.toUpperCase() : 'N/A'}
              </span>
            </div>
          </div>

          {/* Image (if available) */}
          {donation.images && donation.images.length > 0 && (
            <div className="px-8 pt-6">
              <img
                src={getImageUrl(donation.images[0])}
                alt={donation.title}
                className="w-full max-h-80 object-cover rounded-xl shadow-md"
              />
            </div>
          )}


          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{donation.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Item Details */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Item Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-blue-600 font-semibold w-24">Quantity:</span>
                    <span className="text-gray-700">{donation.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-semibold w-24">Condition:</span>
                    <span className="text-gray-700 capitalize">{donation.condition}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-semibold w-24">Category:</span>
                    <span className="text-gray-700">{donation?.category || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>

                {donation.location ? (
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-green-600 font-semibold w-24 flex-shrink-0">
                        Address:
                      </span>
                      <span className="text-gray-700">
                        {donation.location.address || 'Not provided'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold w-24">City:</span>
                      <span className="text-gray-700">
                        {donation.location.city || 'Not provided'}
                      </span>
                    </div>
                    {donation.location.coordinates && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="text-green-600 font-semibold w-24">Coords:</span>
                        <span>
                          {donation.location.coordinates.lat?.toFixed(4)},{" "}
                          {donation.location.coordinates.lng?.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">Location not provided.</p>
                )}
              </div>
            </div>

            {/* MAP SECTION */}
            {donation.location && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Location on Map</h2>
                <DonationMap location={donation.location} title={donation.title} />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Click the marker to see more details
                </p>
              </div>
            )}

            {/* Donor Information */}
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Donor Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-purple-600 font-semibold w-24">Name:</span>
                  <span className="text-gray-700">{donation.donor?.name || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-600 font-semibold w-24">Phone:</span>
                  <span className="text-gray-700">{donation.donor?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-600 font-semibold w-24">Email:</span>
                  <span className="text-gray-700">{donation.donor?.email || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Accept Button */}
            {donation.status === 'available' && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Accept This Donation
                </button>
              </div>
            )}

            {donation.status === 'accepted' && donation.acceptedBy && (
              <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">Accepted By</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {donation.acceptedBy.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span> {donation.acceptedBy.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accept Modal */}
      {showModal && (
        <AcceptDonationModal
          donation={donation}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={fetchDonation}
        />
      )}

    </div>
  );
};

export default DonationDetail;

