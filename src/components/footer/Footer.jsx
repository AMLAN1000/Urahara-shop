import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';

function Footer() {
  const { mode } = useContext(myContext);

  const darkModeStyles = {
    backgroundColor: mode === 'dark' ? '#2e3137' : '',
    color: mode === 'dark' ? '#ffffff' : '',
  };

  const sectionTitle = 'title-font font-semibold text-sm uppercase tracking-wider mb-3';

  return (
    <footer className="pt-16" style={darkModeStyles}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Categories */}
          <div>
            <h2 className={sectionTitle} style={{ color: mode === 'dark' ? '#ffffff' : '#111827' }}>
              Categories
            </h2>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/order" className="hover:underline">Order</Link></li>
              <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className={sectionTitle} style={{ color: mode === 'dark' ? '#ffffff' : '#111827' }}>
              Customer Service
            </h2>
            <ul className="space-y-2">
              <li><Link to="/returnpolicy" className="hover:underline">Return Policy</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className={sectionTitle} style={{ color: mode === 'dark' ? '#ffffff' : '#111827' }}>
              Services
            </h2>
            <ul className="space-y-2">
              <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className={sectionTitle} style={{ color: mode === 'dark' ? '#ffffff' : '#111827' }}>
              Payment Methods
            </h2>
            <img src="https://www.nop-station.com/images/uploaded/Marketplace/bKash-Payment.webp" alt="Payment Methods" className="mt-2 w-48" />
          </div>
        </div>
      </div>

      <div
        className="mt-12 border-t border-gray-300"
        style={{ backgroundColor: mode === 'dark' ? '#37393d' : '#f9fafb', color: mode === 'dark' ? 'white' : '' }}
      >
        <div className="container mx-auto px-6 lg:px-20 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Urahara Shop
            </h1>
          </div>
          <p className="text-sm mt-2 sm:mt-0">
            © {new Date().getFullYear()} Urahara Shop —{' '}
            <a
              href="https://www.uraharatshop.com"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.uraharatshop.com
            </a>
          </p>

          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-blue-500" aria-label="Facebook">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400" aria-label="Twitter">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.47v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="hover:text-pink-500" aria-label="Instagram">
              <svg fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <circle cx={18} cy={6} r={1} />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-700" aria-label="LinkedIn">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2h0a2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
