import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cartService } from '../services/api';

export const ProductCard = ({ product }) => {
  // Convert USD to INR (approximate conversion rate: 1 USD = 83 INR)
  const USD_TO_INR = 83;
  const priceInINR = Math.round(product.price * USD_TO_INR);

  const [addingToCart, setAddingToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle image errors with fallback
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  };

  const handleQuickAddToCart = async (e) => {
    e.preventDefault();
    try {
      setAddingToCart(true);
      await cartService.addToCart({
        productId: product._id,
        quantity: 1,
      });
      setSuccessMessage('✓ Added to cart!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      setSuccessMessage('✗ Failed to add to cart');
      console.error(err);
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition"
          onError={handleImageError}
        />
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2 w-fit">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{product.description}</p>
        
        {/* Price Display */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-green-600">₹{priceInINR.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-500 line-through">${product.price}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-sm text-gray-600">
            {product.rating?.toFixed(1) || 'N/A'} ({product.numReviews || 0} reviews)
          </span>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className={`mb-2 text-center text-xs font-semibold py-1 rounded ${successMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {successMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleQuickAddToCart}
            disabled={product.stock === 0 || addingToCart}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded transition font-semibold text-sm"
          >
            {addingToCart ? '🛒...' : '🛒 Quick Add'}
          </button>
          <Link
            to={`/products/${product._id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition font-semibold text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
