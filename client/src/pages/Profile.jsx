// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Profile = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [myDonations, setMyDonations] = useState([]);
//   const [acceptedCount, setAcceptedCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMyDonations();
//   }, []);

// const fetchMyDonations = async () => {
//   try {
//     const token = localStorage.getItem('token');

//     const response = await axios.get('http://localhost:5000/api/donations', {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     // response.data = { success, data: [...] }
//     const allDonations = response.data?.data || [];
//     const currentUserId = user?._id;

//     // Donations posted BY this user
//     const mine = currentUserId
//       ? allDonations.filter(donation => donation.postedBy === currentUserId)
//       : [];

//     // Donations ACCEPTED by this user
//     const acceptedByMe = currentUserId
//       ? allDonations.filter(donation => {
//           const acc = donation.acceptedBy;
//           const acceptedId = acc?._id || acc?.id; // handle both _id or id
//           return acceptedId === currentUserId;
//         })
//       : [];

//     setMyDonations(mine);
//     setAcceptedCount(acceptedByMe.length);
//   } catch (error) {
//     console.error('Error fetching donations:', error);
//   } finally {
//     setLoading(false);
//   }
// };



//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   if (loading) {
//     return <div className="min-h-screen p-8 text-center">Loading profile...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Header */}
//         <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
//               <p className="text-gray-600 mb-1">📧 {user?.email}</p>
//               <p className="text-gray-600 mb-1">📞 {user?.phone}</p>
//               <p className="text-gray-600 mb-1">📍 {user?.city}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Account Type: <span className="font-semibold">{user?.userType}</span>
//               </p>
//             </div>
            
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
//             <p className="text-sm text-gray-600">Donations Posted</p>
//             <p className="text-3xl font-bold text-blue-600">{myDonations.length}</p>
//           </div>
//           <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
//             <p className="text-sm text-gray-600">Donations Accepted</p>
//             <p className="text-3xl font-bold text-green-600">{acceptedCount}</p>
//           </div>

//           <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
//             <p className="text-sm text-gray-600">Rating</p>
//             <p className="text-3xl font-bold text-yellow-600">⭐ {user?.rating || 5}</p>
//           </div>
//         </div>

//         {/* My Donations */}
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">My Donations</h2>
          
//           {myDonations.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-600 mb-4">You haven't posted any donations yet.</p>
//               <button
//                 onClick={() => navigate('/donate')}
//                 className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 Post Your First Donation
//               </button>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-6">
//               {myDonations.map((donation) => (
//                 <div 
//                   key={donation._id} 
//                   className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => navigate(`/donation/${donation._id}`)}
//                 >
//                   <div className="mb-3">
//                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//                       donation.status === 'available' ? 'bg-green-100 text-green-800' :
//                       donation.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {donation.status}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-semibold mb-2">{donation.title}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{donation.description}</p>
//                   <div className="text-sm text-gray-500">
//                     <p>📦 {donation.category}</p>
//                     <p>📍 {donation.location.city}</p>
//                     <p>📅 {new Date(donation.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { donationAPI } from '../services/api'; // ✅ Import from api.js

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [myDonations, setMyDonations] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyDonations = async () => {
      try {
        // ✅ Use api.js function
        const allDonations = await donationAPI.getAllDonations();
        
        console.log('📦 All donations:', allDonations);
        console.log('👤 Current user:', user);

        // ✅ Filter donations POSTED by this user
        const postedByMe = allDonations.filter((donation) => {
          const posterId = donation.postedBy?._id || donation.postedBy;
          const userId = user._id || user.id;
          console.log('Comparing:', posterId, 'vs', userId);
          return posterId === userId;
        });

        // ✅ Filter donations ACCEPTED by this user (by email/phone)
        const acceptedByMe = allDonations.filter((donation) => {
          return donation.acceptedBy?.email === user.email ||
                 donation.acceptedBy?.phone === user.phone;
        });

        console.log('✅ Posted by me:', postedByMe.length);
        console.log('✅ Accepted by me:', acceptedByMe.length);

        setMyDonations(postedByMe);
        setAcceptedCount(acceptedByMe.length);
      } catch (error) {
        console.error('❌ Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen p-8 text-center">
        <p className="mb-4 text-xl text-gray-700">No user info found. Please log in again.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              
              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-1">📧 {user.email}</p>
                <p className="text-gray-600 mb-1">📞 {user.phone}</p>
                <p className="text-gray-600 mb-1">📍 {user.city}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                  {user.userType === 'individual' ? '👤 Individual' : '🏢 Organization'}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Donations Posted */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Donations Posted</p>
                <p className="text-4xl font-bold text-blue-600">{myDonations.length}</p>
              </div>
              <div className="text-5xl">📦</div>
            </div>
          </div>

          {/* Donations Accepted */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Donations Accepted</p>
                <p className="text-4xl font-bold text-green-600">{acceptedCount}</p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Rating</p>
                <p className="text-4xl font-bold text-yellow-600">{user.rating || 5.0} ⭐</p>
              </div>
              <div className="text-5xl">🌟</div>
            </div>
          </div>
        </div>

        {/* My Donations Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            My Donations
          </h2>

          {myDonations.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No donations yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first donation!</p>
              <button
                onClick={() => navigate('/donate')}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Post Your First Donation
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {myDonations.map((donation) => (
                <div
                  key={donation._id}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer hover:border-blue-400"
                  onClick={() => navigate(`/donation/${donation._id}`)}
                >
                  {/* Status Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : donation.status === 'accepted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : donation.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {donation.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Donation Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{donation.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {donation.description}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-semibold w-20">Category:</span>
                      <span>{donation.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-20">Quantity:</span>
                      <span>{donation.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-20">Location:</span>
                      <span>{donation.location?.city || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-20">Posted:</span>
                      <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Accepted Info */}
                  {donation.status === 'accepted' && donation.acceptedBy && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Accepted by:</p>
                      <p className="text-sm font-semibold text-gray-700">{donation.acceptedBy.name}</p>
                      <p className="text-sm text-gray-600">{donation.acceptedBy.phone}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;