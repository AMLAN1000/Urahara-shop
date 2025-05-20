import React, { Fragment, useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

// List of admin emails with access to dashboard
const ADMIN_EMAILS = [
  'amlan@urahara.com',
    'rakib@urahara.com',
    'anika@urahara.com',
    'safaeat@urahara.com',
];

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const cartItems = useSelector((state) => state.cart);
  
  // Check if user has admin privileges
  const isAdmin = user?.user?.email && ADMIN_EMAILS.includes(user.user.email);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login';
  };

  const darkStyles = mode === 'dark';

  return (
    <div className={`sticky top-0 z-50 ${darkStyles ? 'bg-gray-900 text-white' : 'bg-white text-black'} ${scrolled ? 'shadow-lg' : 'shadow-md'} transition-all duration-300`}>
      {/* Mobile Drawer */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className={`relative w-full max-w-xs ${darkStyles ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 overflow-y-auto`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-anime tracking-wide">Menu</h2>
                  <button onClick={() => setOpen(false)} className="text-xl hover:text-pink-500 transition-colors">
                    <RxCross2 />
                  </button>
                </div>
                
                <div className="mb-8 flex justify-center">
                  <Link to="/" className="inline-block" onClick={() => setOpen(false)}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 p-1">
                      <img 
                        className="w-full h-full rounded-full object-cover border-2 border-white" 
                        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg" 
                        alt="profile" 
                      />
                    </div>
                  </Link>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/allproducts" 
                    className="py-2 px-4 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-center"
                    onClick={() => setOpen(false)}
                  >
                    All Products
                  </Link>
                  
                  {user && (
                    <Link 
                      to="/order" 
                      className="py-2 px-4 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-center"
                      onClick={() => setOpen(false)}
                    >
                      Orders
                    </Link>
                  )}
                  
                  {isAdmin && (
                    <Link 
                      to="/dashboard" 
                      className="py-2 px-4 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-center"
                      onClick={() => setOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  
                  {user ? (
                    <button 
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }} 
                      className="py-2 px-4 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-center w-full"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link 
                      to="/signup" 
                      className="py-2 px-4 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-center"
                      onClick={() => setOpen(false)}
                    >
                      Signup
                    </Link>
                  )}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Top Promo Bar */}
      <div className={`h-10 flex items-center justify-center ${darkStyles ? 'bg-purple-800 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'} text-sm font-medium`}>
        <span className="animate-pulse">✨</span>
        <span className="mx-2">Welcome To Urahara</span>
        <span className="animate-pulse">✨</span>
      </div>

      {/* Main Navbar */}
      <nav className={`px-4 sm:px-6 lg:px-8 ${darkStyles ? 'bg-gray-800' : 'bg-white'} transition-all duration-200 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button onClick={() => setOpen(true)} className="lg:hidden text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wider flex items-center">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkStyles ? 'from-blue-400 to-purple-500' : 'from-purple-600 to-pink-600'} font-anime`}>
              Urahara Shop
            </span>
            <span className="ml-1 text-yellow-500 animate-bounce">⭐</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/allproducts" className="px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-all font-medium">
              All Products
            </Link>
            
            {user && (
              <Link to="/order" className="px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-all font-medium">
                Orders
              </Link>
            )}
            
            {isAdmin && (
              <Link to="/dashboard" className="px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-all font-medium">
                Admin
              </Link>
            )}
            
            {!user ? (
              <Link to="/signup" className="px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-all font-medium">
                Signup
              </Link>
            ) : (
              <button onClick={logout} className="px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-all font-medium">
                Logout
              </button>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleMode} 
              className={`text-xl p-2 rounded-full ${darkStyles ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            >
              {mode === 'light' ? <FiSun size={20} className="text-yellow-500" /> : <BsFillCloudSunFill size={20} className="text-blue-400" />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative group p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.2 6m1.2-6h10m0 0l1.2 6M9 21h0m6 0h0" />
              </svg>
              <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-yellow-400 text-gray-900 text-xs font-bold rounded-full border-2 ${darkStyles ? 'border-gray-800' : 'border-white'} transform transition-transform group-hover:scale-110`}>
                {cartItems.length}
              </span>
            </Link>
            
          </div>
        </div>
      </nav>

      {/* Add custom CSS for anime styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-anime {
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.05em;
          font-weight: 700;
        }
        
        /* Add some anime-style hover animations */
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Navbar;