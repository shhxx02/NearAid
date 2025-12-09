import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 
          className="text-5xl font-bold text-gray-900 mb-6"
          style={{
            animation: 'slideInLeft 0.8s ease-in-out'
          }}
        >
          Welcome to NearAid 💝
        </h1>
        
        <p 
          className="text-2xl text-gray-600 mb-4"
          style={{
            animation: 'slideInRight 0.8s ease-in-out 0.2s backwards'
          }}
        >
          Connecting Hearts, Sharing Hope
        </p>
        
        <p 
          className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          style={{
            animation: 'fadeIn 0.8s ease-in-out 0.4s backwards'
          }}
        >
          A location-based donation platform connecting donors with nearby NGOs, 
          shelters, and individuals in need. Make a difference in your community today.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex gap-4 justify-center"
          style={{
            animation: 'scaleUp 0.8s ease-in-out 0.6s backwards'
          }}
        >
          <Link 
            to="/browse" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Browse Donations
          </Link>
          <Link 
            to="/donate" 
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all"
          >
            Donate Items
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div 
            className="text-center p-6"
            style={{
              animation: 'fadeIn 0.8s ease-in-out 0.8s backwards'
            }}
          >
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-3">Find Nearby</h3>
            <p className="text-gray-600">
              Discover donations available in your local area and connect with people nearby.
            </p>
          </div>
          
          <div 
            className="text-center p-6"
            style={{
              animation: 'fadeIn 0.8s ease-in-out 1s backwards'
            }}
          >
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">Connect Easily</h3>
            <p className="text-gray-600">
              Simple platform to donate items or find what you need with just a few clicks.
            </p>
          </div>
          
          <div 
            className="text-center p-6"
            style={{
              animation: 'fadeIn 0.8s ease-in-out 1.2s backwards'
            }}
          >
            <div className="text-5xl mb-4">💚</div>
            <h3 className="text-xl font-semibold mb-3">Make Impact</h3>
            <p className="text-gray-600">
              Every donation counts. Help those in need and make a real difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;