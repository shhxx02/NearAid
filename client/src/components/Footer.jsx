import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">NearAid</h3>
            <p className="text-sm mb-4">
              Connecting Hearts, Sharing Hope
            </p>
            <p className="text-sm text-gray-400">
              A location-based donation platform connecting donors with nearby NGOs, shelters, and individuals in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  Browse Donations
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-white transition-colors">
                  Donate Items
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#mission" className="text-gray-400 hover:text-white transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:help@nearaid.com" className="text-gray-400 hover:text-white transition-colors">
                  📧 help@nearaid.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors">
                  📞 +91 9876543210
                </a>
              </li>
              <li>
                <p className="text-gray-400">
                  📍 Bangalore, India
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          
          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Social Media */}
            <div className="flex gap-6">
              <a href="#facebook" className="text-gray-400 hover:text-white transition-colors">
                📘 Facebook
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
                𝕏 Twitter
              </a>
              <a href="#instagram" className="text-gray-400 hover:text-white transition-colors">
                📷 Instagram
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
                💼 LinkedIn
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>© 2024 NearAid. All rights reserved.</p>
              <p>Made with ❤️ for the community</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;