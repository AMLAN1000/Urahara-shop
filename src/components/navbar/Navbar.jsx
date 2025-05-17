import React, { Fragment, useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const cartItems = useSelector((state) => state.cart);

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login';
  };

  const darkStyles = mode === 'dark';

  return (
    <div className={`sticky top-0 z-50 ${darkStyles ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md`}>
      {/* Mobile Drawer */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className={`relative w-full max-w-xs bg-white dark:bg-gray-800 p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Menu</h2>
                  <button onClick={() => setOpen(false)} className="text-xl">
                    <RxCross2 />
                  </button>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link to="/allproducts" className="hover:text-pink-500 font-medium">All Products</Link>
                  {user && <Link to="/order" className="hover:text-pink-500 font-medium">Orders</Link>}
                  {user?.user?.email === 'amlan@edsparkle.com' && <Link to="/dashboard" className="hover:text-pink-500 font-medium">Admin</Link>}
                  {user ? (
                    <span onClick={logout} className="cursor-pointer hover:text-pink-500 font-medium">Logout</span>
                  ) : (
                    <Link to="/signup" className="hover:text-pink-500 font-medium">Signup</Link>
                  )}
                  <Link to="/" className="mt-4">
                    <img className="w-12 h-12 rounded-full" src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg" alt="profile" />
                  </Link>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Top Promo Bar */}
      <div className={`h-10 flex items-center justify-center ${darkStyles ? 'bg-gray-700 text-white' : 'bg-pink-600 text-white'} text-sm font-medium`}>
        Get free delivery on orders over ₹300
      </div>

      {/* Main Navbar */}
      <nav className={`px-4 sm:px-6 lg:px-8 ${darkStyles ? 'bg-gray-800' : 'bg-gray-100'} shadow`}>
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button onClick={() => setOpen(true)} className="lg:hidden text-2xl p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
           Urahara Shop
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/allproducts" className="hover:text-pink-500 font-medium">All Products</Link>
            {user && <Link to="/order" className="hover:text-pink-500 font-medium">Orders</Link>}
            {user?.user?.email === 'amlan@edsparkle.com' && (
              <Link to="/dashboard" className="hover:text-pink-500 font-medium">Admin</Link>
            )}
            {!user && (
              <Link to="/signup" className="hover:text-pink-500 font-medium">Signup</Link>
            )}
            {user && (
              <span onClick={logout} className="cursor-pointer hover:text-pink-500 font-medium">Logout</span>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Country */}
            
            {/* Profile */}
            

            {/* Theme Toggle */}
            <button onClick={toggleMode} className="text-xl hover:text-pink-500 transition">
              {mode === 'light' ? <FiSun size={24} /> : <BsFillCloudSunFill size={24} />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <svg className="w-6 h-6 hover:text-pink-500 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.2 6m1.2-6h10m0 0l1.2 6M9 21h0m6 0h0" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
