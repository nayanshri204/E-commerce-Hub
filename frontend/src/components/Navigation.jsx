import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-secondary">
            E-Commerce Hub
          </Link>

          <div className="hidden md:flex space-x-4">
            <Link to="/products" className="hover:text-secondary transition">
              Products
            </Link>
            <Link to="/cart" className="hover:text-secondary transition">
              Cart
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="hover:text-secondary transition">
                  Profile
                </Link>
                <Link to="/orders" className="hover:text-secondary transition">
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-secondary transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary hover:bg-blue-600 px-3 py-1 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
