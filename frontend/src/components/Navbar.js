import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-blue-200 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">S</span>
            </div>
            ShopSphere
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
              <span className="relative z-10">Home</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link to="/products" className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
              <span className="relative z-10">Products</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </Link>
            {user && (
              <>
                <Link to="/orders" className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                  <span className="relative z-10">Orders</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group bg-yellow-500/20 border border-yellow-400/30">
                    <span className="relative z-10 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.012-3H20a2 2 0 012 2v6a2 2 0 01-2 2h-2M9 7a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3V9a3 3 0 00-3-3H9z" />
                      </svg>
                      Admin
                    </span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M7 13h10m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Link>
                <div className="hidden lg:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">Welcome, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/20 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/20 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap space-x-4">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-200 transition-colors">
              Products
            </Link>
            {user && (
              <>
                <Link to="/orders" className="hover:text-blue-200 transition-colors">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 transition-colors">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
