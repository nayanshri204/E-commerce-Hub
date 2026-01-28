import React from 'react';
import { Link } from 'react-router-dom';

export const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-accent mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p className="text-gray-600 mb-8">
          You will receive an order confirmation email shortly.
        </p>
        <div className="space-y-2">
          <Link
            to="/orders"
            className="block bg-secondary hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
          >
            View Order
          </Link>
          <Link
            to="/products"
            className="block bg-accent hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
