// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { donationAPI } from '../services/api';
// import AcceptDonationModal from '../components/AcceptDonationModal';

// const Browse = () => {
//   const navigate = useNavigate();
//   // Data states
//   const [donations, setDonations] = useState([]);
//   const [filteredDonations, setFilteredDonations] = useState([]);
  
//   // UI states
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Search & Filter states
//   const [searchCity, setSearchCity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   // Modal states
//   const [selectedDonation, setSelectedDonation] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Categories list
//   const categories = ['all', 'food', 'clothing', 'books', 'electronics', 'furniture', 'medical', 'other'];

//   // Fetch donations on mount
//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await donationAPI.getAllDonations();
//         setDonations(response.data || []);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error:', error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   // Filter donations when search or filter changes
//   useEffect(() => {
//     let filtered = donations;

//     // Filter by city
//     if (searchCity.trim()) {
//       filtered = filtered.filter(donation =>
//         donation.location.city.toLowerCase().includes(searchCity.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(donation =>
//         donation.category === selectedCategory
//       );
//     }

//     setFilteredDonations(filtered);
//   }, [searchCity, selectedCategory, donations]);

//   // Modal handlers
//   const handleOpenModal = (donation) => {
//     setSelectedDonation(donation);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedDonation(null);
//   };

//   const handleAcceptSuccess = () => {
//     const fetchDonations = async () => {
//       try {
//         const response = await donationAPI.getAllDonations();
//         setDonations(response.data || []);
//       } catch (error) {
//         console.error('Error refreshing donations:', error);
//       }
//     };
//     fetchDonations();
//   };

//   if (loading) return <div className="p-8 text-center">Loading donations...</div>;
//   if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">
//           Browse Available Donations 🎁
//         </h1>
//         <p className="text-center text-gray-600 mb-8">
//           Found {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''}
//         </p>

//         {/* Search & Filter Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <div className="grid md:grid-cols-2 gap-4">
            
//             {/* Search by City */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Search by City
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g., Karnal, Delhi, Mumbai"
//                 value={searchCity}
//                 onChange={(e) => setSearchCity(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Filter by Category */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Filter by Category
//               </label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>
//                     {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Clear Filters Button */}
//           {(searchCity || selectedCategory !== 'all') && (
//             <button
//               onClick={() => {
//                 setSearchCity('');
//                 setSelectedCategory('all');
//               }}
//               className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>

//         {/* Donations Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 card-grid">
//           {filteredDonations && filteredDonations.length > 0 ? (
//             filteredDonations.map((donation) => (
//               <div 
//                 key={donation._id}
//                 onClick={() => navigate(`/donation/${donation._id}`)}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
//               >
//                 {/* Status Badge */}
//                 <div className="mb-3">
//                   <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
//                     Available
//                   </span>
//                 </div>

//                 {/* ✅ Image Display */}
//                 {donation.images && donation.images.length > 0 ? (
//                   <img
//                     src={donation.images[0]}
//                     alt={donation.title}
//                     className="w-full h-48 object-cover rounded-lg mb-3"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg mb-3 text-gray-400 text-sm">
//                     No Image
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
//                 <p className="text-gray-600 mb-3 line-clamp-2">{donation.description}</p>
                
//                 <div className="space-y-1 text-sm mb-4">
//                   <p><strong>📦 Category:</strong> {donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</p>
//                   <p><strong>📊 Quantity:</strong> {donation.quantity}</p>
//                   <p><strong>⭐ Condition:</strong> {donation.condition.charAt(0).toUpperCase() + donation.condition.slice(1)}</p>
//                   <p><strong>📍 Location:</strong> {donation.location.city}</p>
//                   <p><strong>👤 Donor:</strong> {donation.donor.name}</p>
//                 </div>

//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleOpenModal(donation);
//                   }}
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full transition-colors font-semibold"
//                 >
//                   Accept Donation
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <p className="text-gray-600 text-lg">
//                 {donations.length === 0 
//                   ? '😢 No donations available yet.' 
//                   : '🔍 No donations match your filters.'}
//               </p>
//               {filteredDonations.length === 0 && donations.length > 0 && (
//                 <button
//                   onClick={() => {
//                     setSearchCity('');
//                     setSelectedCategory('all');
//                   }}
//                   className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
//                 >
//                   Clear Filters to See All
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Accept Donation Modal */}
//       {selectedDonation && (
//         <AcceptDonationModal
//           donation={selectedDonation}
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onSuccess={handleAcceptSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default Browse;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationAPI } from '../services/api';
import AcceptDonationModal from '../components/AcceptDonationModal';

const Browse = () => {
  const navigate = useNavigate();

  // Data states
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter states
  const [searchCity, setSearchCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Categories list
  const categories = ['all', 'food', 'clothing', 'books', 'electronics', 'furniture', 'medical', 'other'];

  // Fetch donations on mount
useEffect(() => {
  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await donationAPI.getAllDonations(); // this throws AxiosError
      const list = result.data || [];
      setDonations(list);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to load donations');
    } finally {
      setLoading(false);
    }
};

  fetchDonations();
}, []);


  // Filter donations when search or filter changes
  useEffect(() => {
    let filtered = donations;

    // Filter by city (safe with optional chaining)
    if (searchCity.trim()) {
      const search = searchCity.toLowerCase();
      filtered = filtered.filter(
        (donation) =>
          donation.location?.city &&
          donation.location.city.toLowerCase().includes(search)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (donation) => donation.category === selectedCategory
      );
    }

    setFilteredDonations(filtered);
  }, [searchCity, selectedCategory, donations]);

    const getImageUrl = (imgPath) => {
      if (!imgPath) return null;

      // Already a full URL? Use as is
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        return imgPath;
      }

      // Otherwise, prefix your backend base URL
      // Handles "uploads/..." and "/uploads/..."
      return `http://localhost:5000/${imgPath.replace(/^\/+/, '')}`;
    };

  // Modal handlers
  const handleOpenModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleAcceptSuccess = () => {
    // Re-fetch donations after acceptance
    const refreshDonations = async () => {
      try {
        const response = await donationAPI.getAllDonations();
        const data =
          response?.data?.donations ||
          response?.data ||
          response;

        const list = Array.isArray(data) ? data : [];
        setDonations(list);
      } catch (err) {
        console.error('Error refreshing donations:', err);
      }
    };
    refreshDonations();
  };

  if (loading) return <div className="p-8 text-center">Loading donations...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;



  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">
          Browse Available Donations 🎁
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Found {filteredDonations.length} donation
          {filteredDonations.length !== 1 ? 's' : ''}
        </p>

        {/* Search & Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search by City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by City
              </label>
              <input
                type="text"
                placeholder="e.g., Karnal, Delhi, Mumbai"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter by Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchCity || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchCity('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Donations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 card-grid">
          {filteredDonations && filteredDonations.length > 0 ? (
            filteredDonations.map((donation) => (
              <div
                key={donation._id}
                onClick={() => navigate(`/donation/${donation._id}`)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Status Badge */}
                <div className="mb-3">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {donation.status
                      ? donation.status.charAt(0).toUpperCase() +
                        donation.status.slice(1)
                      : 'Available'}
                  </span>
                </div>
                {console.log('🖼 IMAGE DEBUG', donation.title, donation.images)}
                <p className="text-[10px] text-gray-400 break-words mb-1">
                  Image path: {donation.images && donation.images.length > 0 ? donation.images[0] : 'NONE'}
                </p>


                {/* Image Display */}
                {donation.images && donation.images.length > 0 ? (
                  <img
                    src={getImageUrl(donation.images[0])}
                    alt={donation.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      // fallback if URL is still bad
                      e.target.style.display = 'none';
                      e.target.parentNode?.querySelector?.('.no-image-fallback')?.classList?.remove('hidden');
                    }}
                  />
                ) : null}

                <div
                  className={`no-image-fallback w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg mb-3 text-gray-400 text-sm ${
                    donation.images && donation.images.length > 0 ? 'hidden' : ''
                  }`}
                >
                  No Image
                </div>


                <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {donation.description}
                </p>

                <div className="space-y-1 text-sm mb-4">
                  <p>
                    <strong>📦 Category:</strong>{' '}
                    {donation.category
                      ? donation.category.charAt(0).toUpperCase() +
                        donation.category.slice(1)
                      : 'N/A'}
                  </p>
                  <p>
                    <strong>📊 Quantity:</strong> {donation.quantity}
                  </p>
                  <p>
                    <strong>⭐ Condition:</strong>{' '}
                    {donation.condition
                      ? donation.condition.charAt(0).toUpperCase() +
                        donation.condition.slice(1)
                      : 'N/A'}
                  </p>
                  <p>
                    <strong>📍 Location:</strong>{' '}
                    {donation.location?.city || 'Not provided'}
                  </p>
                  <p>
                    <strong>👤 Donor:</strong>{' '}
                    {donation.donor?.name || 'Unknown'}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(donation);
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full transition-colors font-semibold"
                >
                  Accept Donation
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">
                {donations.length === 0
                  ? '😢 No donations available yet.'
                  : '🔍 No donations match your filters.'}
              </p>
              {filteredDonations.length === 0 && donations.length > 0 && (
                <button
                  onClick={() => {
                    setSearchCity('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear Filters to See All
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Accept Donation Modal */}
      {selectedDonation && (
        <AcceptDonationModal
          donation={selectedDonation}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleAcceptSuccess}
        />
      )}
    </div>
  );
};

export default Browse;

