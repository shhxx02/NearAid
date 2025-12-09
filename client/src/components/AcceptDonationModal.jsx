import React, { useState } from 'react';
import {donationAPI} from '../services/api';

const AcceptDonationModal = ({donation, isOpen, onClose, onSuccess}) =>{

    const [formData, setFormData] = useState({
        name:'',
        phone:''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Name is required';
        if (!formData.phone.trim()) return 'Phone number is required';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
      
            await donationAPI.acceptDonation(donation._id, formData);
            
            alert('✅ Donation accepted! You can now contact the donor.');
            
            onSuccess();
            
            onClose();
            
            setFormData({ name: '', phone: '' });
        }   catch (err) {
            setError(err.message || 'Failed to accept donation');
        }   finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
    
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Accept Donation?
                </h2>
                <p className="text-gray-600 mb-6 break-words">
                    Item: <strong>{donation.title}</strong>
                </p>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    ❌ {error}
                </div>
            )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Phone Number *
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold disabled:opacity-50"
                    >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400"
                    >
                    {loading ? 'Accepting...' : 'Accept'}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptDonationModal;
