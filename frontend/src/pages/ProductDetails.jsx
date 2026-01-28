import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, cartService } from '../services/api';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const USD_TO_INR = 83;
  const priceInINR = product ? Math.round(product.price * USD_TO_INR) : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getById(id);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await cartService.addToCart({
        productId: product._id,
        quantity: parseInt(quantity),
      });
      setSuccessMessage('Product added to cart!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/cart');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product to cart');
      console.error(err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Get all images for the gallery
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/500x500?text=No+Image'];
  
  const currentImage = allImages[selectedImage];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center mb-4">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              
              {/* Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index
                          ? 'border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Count */}
              <div className="text-center text-sm text-gray-500 mt-3">
                Image {selectedImage + 1} of {allImages.length}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="mb-6 flex items-center">
                <div className="flex text-yellow-500">
                  {'★'.repeat(Math.round(product.rating || 0))}
                  {'☆'.repeat(5 - Math.round(product.rating || 0))}
                </div>
                <span className="ml-3 text-gray-600">
                  {product.rating?.toFixed(1) || 'N/A'} ({product.numReviews || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b-2">
                <p className="text-gray-600 mb-2">Price</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold text-green-600">₹{priceInINR.toLocaleString('en-IN')}</span>
                  <span className="text-2xl text-gray-400 line-through">${product.price}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-600 font-semibold">
                      In Stock ({product.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Add to Cart Section */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <select
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                    <span className="text-gray-600">
                      (Max: {Math.min(product.stock, 10)})
                    </span>
                  </div>
                </div>
              )}

              {/* Messages */}
              {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg border border-green-400">
                  ✓ {successMessage}
                </div>
              )}

              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-400">
                  ✗ {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {addingToCart ? '🛒 Adding...' : '🛒 Add to Cart'}
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
