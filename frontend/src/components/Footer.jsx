import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-secondary mb-4">E-Commerce Hub</h3>
            <p className="text-gray-400">Your one-stop shop for quality products.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-secondary transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-secondary transition">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:text-secondary transition">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-secondary transition">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/faq" className="hover:text-secondary transition">FAQ</a></li>
              <li><a href="/shipping-info" className="hover:text-secondary transition">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-secondary transition">Returns</a></li>
              <li><a href="/support" className="hover:text-secondary transition">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 E-Commerce Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
