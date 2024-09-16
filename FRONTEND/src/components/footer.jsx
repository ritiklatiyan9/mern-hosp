// src/components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:justify-between"
      >
        {/* Contact Info */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">123 Health St, Wellness City</p>
          <p className="mb-2">Email: <a href="mailto:contact@hospital.com" className="text-blue-400 hover:underline">contact@hospital.com</a></p>
          <p>Phone: <a href="tel:(123)456-7890" className="text-blue-400 hover:underline">(123) 456-7890</a></p>
        </div>
        
        {/* Opening Hours */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Opening Hours</h2>
          <ul className="space-y-1 text-sm">
            <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
            <li>Saturday: 9:00 AM - 5:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
        
        {/* Social Media Links */}
        <div className="text-center md:text-right md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FaFacebook className="text-3xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaTwitter className="text-3xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
              <FaLinkedin className="text-3xl" />
            </a>
          </div>
        </div>
      </motion.div>
      
      <div className="bg-gray-800 py-4 mt-8 text-center">
        <p className="text-gray-400 text-sm">© 2024 Galaxy Hospital. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
