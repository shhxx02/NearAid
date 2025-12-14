// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';

// // Get token from localStorage
// const getToken = () => {
//   return localStorage.getItem('token');
// };

// // Create axios instance with auth header
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests if it exists
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const donationAPI = {
//   getAllDonations: async () => {
//     const response = await api.get('/donations');
//     return response.data;
//   },

//   createDonation: async (donationData) => {
//     const response = await api.post('/donations', donationData);
//     return response.data;
//   },

//   getDonationById: async (id) => {
//     const response = await api.get(`/donations/${id}`);
//     return response.data;
//   },

//   acceptDonation: async (id, acceptorData) => {
//     const response = await api.put(`/donations/${id}/accept`, acceptorData);
//     return response.data;
//   }
// };

import axios from 'axios';

// ✅ Auto-detect environment
const isProduction = window.location.hostname !== 'localhost';
const BASE_URL = isProduction 
  ? 'https://nearaid.onrender.com/api'
  : 'http://localhost:5000/api';

console.log('🔗 API BASE URL:', BASE_URL);

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// DONATION API FUNCTIONS
// ==========================

export const donationAPI = {
  getAllDonations: async () => {
    try {
      const response = await api.get('/donations');
      // ✅ Handle both { data: [...] } and [...] formats
      const donations = response.data?.data || response.data || [];
      console.log('✅ Fetched donations (array):', Array.isArray(donations), donations.length);
      return Array.isArray(donations) ? donations : [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  },

  createDonation: async (donationData) => {
    try {
      const response = await api.post('/donations', donationData);
      return response.data;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  getDonationById: async (id) => {
    try {
      const response = await api.get(`/donations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching donation:', error);
      throw error;
    }
  },

  acceptDonation: async (id, acceptData) => {
    try {
      const response = await api.put(`/donations/${id}/accept`, acceptData);
      return response.data;
    } catch (error) {
      console.error('Error accepting donation:', error);
      throw error;
    }
  },

  getDonationsByCity: async (city) => {
    try {
      const response = await api.get(`/donations/city/${city}`);
      const donations = response.data?.data || response.data || [];
      return Array.isArray(donations) ? donations : [];
    } catch (error) {
      console.error('Error fetching donations by city:', error);
      throw error;
    }
  },
};

// ==========================
// AUTH API FUNCTIONS
// ==========================

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export default api;
