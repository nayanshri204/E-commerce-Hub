import React, { useState, useEffect } from 'react';
import { cartService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await cartService.getCart();
      setCart(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartService.removeItem(productId);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    try {
      await cartService.updateItem(productId, { quantity });
      fetchCart();
    } catch (err) {
      setError('Failed to update cart');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
          <Link to="/login" className="bg-secondary text-white px-6 py-2 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

        {!cart || cart.items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link to="/products" className="bg-secondary text-white px-6 py-2 rounded-lg">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.items.filter(item => item.product).map((item) => (
                <div key={item.product._id} className="bg-white p-4 rounded-lg mb-4 flex items-center gap-4">
                  <img
                    src={item.product.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600">₹{Math.round(item.price * 83).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {cart.items.some(item => !item.product) && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4 text-yellow-800">
                  ⚠️ Some items in your cart are no longer available and have been hidden.
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{Math.round(cart.totalPrice * 83).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹0.00</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>₹{Math.round(cart.totalPrice * 83).toLocaleString('en-IN')}</span>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-accent text-white py-2 rounded-lg hover:bg-green-600 block text-center font-semibold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
