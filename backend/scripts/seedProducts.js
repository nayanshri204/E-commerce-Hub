require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    ],
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: 'Smart Watch',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS',
    price: 299.99,
    category: 'Electronics',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
    ],
    rating: 4.3,
    numReviews: 95,
  },
  {
    name: 'USB-C Cable',
    description: 'Durable 6ft USB-C charging and data cable, supports fast charging',
    price: 14.99,
    category: 'Accessories',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1625948515291-d0e7bdb1e1b6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1625948515291-d0e7bdb1e1b6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
    ],
    rating: 4.7,
    numReviews: 342,
  },
  {
    name: 'Portable Phone Charger',
    description: '20000mAh portable power bank with dual USB outputs and LED display',
    price: 29.99,
    category: 'Accessories',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1591290621513-e0916b44a66f?w=500&h=500&fit=crop',
    ],
    rating: 4.6,
    numReviews: 267,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic aluminum laptop stand for better posture and cooling',
    price: 49.99,
    category: 'Accessories',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
    ],
    rating: 4.4,
    numReviews: 156,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches and programmable keys',
    price: 149.99,
    category: 'Electronics',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1587829191301-6f5fb3df0b0f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587829191301-6f5fb3df0b0f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1604426633867-fe58e2343820?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587829191301-6f5fb3df0b0f?w=500&h=500&fit=crop',
    ],
    rating: 4.8,
    numReviews: 203,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and 18-month battery life',
    price: 39.99,
    category: 'Accessories',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
    ],
    rating: 4.5,
    numReviews: 189,
  },
  {
    name: '4K Webcam',
    description: '4K ultra HD webcam with auto-focus and built-in stereo microphone',
    price: 89.99,
    category: 'Electronics',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1633532335997-6f3ee3fbea0f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1633532335997-6f3ee3fbea0f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1633532335997-6f3ee3fbea0f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    ],
    rating: 4.6,
    numReviews: 142,
  },
  {
    name: 'Monitor Light Bar',
    description: 'Screen hanging light bar with auto-dimming and color temperature adjustment',
    price: 69.99,
    category: 'Accessories',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1602544510646-7f331ba9b2f6?w=500&h=500&fit=crop',
    ],
    rating: 4.7,
    numReviews: 98,
  },
  {
    name: 'USB Hub',
    description: '7-port USB 3.0 hub with power supply and individual switches',
    price: 34.99,
    category: 'Accessories',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1625948515291-d0e7bdb1e1b6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1625948515291-d0e7bdb1e1b6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
    ],
    rating: 4.4,
    numReviews: 167,
  },
  // Clothing Products
  {
    name: 'Classic Blue T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear',
    price: 24.99,
    category: 'Clothing',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    ],
    rating: 4.6,
    numReviews: 245,
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with stretch fabric for comfort',
    price: 64.99,
    category: 'Clothing',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1603252109303-2368ff8665a3?w=500&h=500&fit=crop',
    ],
    rating: 4.7,
    numReviews: 318,
  },
  {
    name: 'Leather Jacket',
    description: 'Premium quality leather jacket for a stylish look',
    price: 149.99,
    category: 'Clothing',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1520318155670-38a3d214967d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1548937528-86eb92020bec?w=500&h=500&fit=crop',
    ],
    rating: 4.8,
    numReviews: 156,
  },
  {
    name: 'Summer Sundress',
    description: 'Light and breezy sundress perfect for warm weather',
    price: 44.99,
    category: 'Clothing',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1595777707802-e2267e55ace0?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777707802-e2267e55ace0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1595841305487-25e2a91fedd0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1595847607263-0fbcdce5e020?w=500&h=500&fit=crop',
    ],
    rating: 4.5,
    numReviews: 198,
  },
  // Books
  {
    name: 'The Great Gatsby',
    description: 'Classic literature novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'Books',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507842217343-583f7270bfbb?w=500&h=500&fit=crop',
    ],
    rating: 4.7,
    numReviews: 523,
  },
  {
    name: 'Atomic Habits',
    description: 'Transform your habits and build better ones with proven strategies',
    price: 16.99,
    category: 'Books',
    stock: 180,
    image: 'https://images.unsplash.com/photo-1507842217343-583f7270bfbb?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507842217343-583f7270bfbb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1476825712201-dd50b1ae3e88?w=500&h=500&fit=crop',
    ],
    rating: 4.9,
    numReviews: 876,
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s masterpiece of American literature',
    price: 14.99,
    category: 'Books',
    stock: 160,
    image: 'https://images.unsplash.com/photo-1476825712201-dd50b1ae3e88?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1476825712201-dd50b1ae3e88?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    ],
    rating: 4.8,
    numReviews: 654,
  },
  {
    name: 'Think and Grow Rich',
    description: 'The ultimate guide to personal development and success',
    price: 15.99,
    category: 'Books',
    stock: 140,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507842217343-583f7270bfbb?w=500&h=500&fit=crop',
    ],
    rating: 4.6,
    numReviews: 421,
  },
  // Grocery Products
  {
    name: 'Organic Coffee Beans',
    description: 'Premium quality organic coffee beans from fair-trade sources',
    price: 13.99,
    category: 'Grocery',
    stock: 250,
    image: 'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop',
    ],
    rating: 4.7,
    numReviews: 312,
  },
  {
    name: 'Whole Wheat Flour',
    description: 'High-quality whole wheat flour for healthy baking',
    price: 8.99,
    category: 'Grocery',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1585335971362-e80f6d02e77f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585335971362-e80f6d02e77f?w=500&h=500&fit=crop'
    ],
    rating: 4.5,
    numReviews: 189,
  },
  {
    name: 'Extra Virgin Olive Oil',
    description: 'Cold-pressed extra virgin olive oil from Mediterranean olives',
    price: 19.99,
    category: 'Grocery',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1605597959793-fbf8e4a9f6cf?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605597959793-fbf8e4a9f6cf?w=500&h=500&fit=crop'
    ],
    rating: 4.8,
    numReviews: 267,
  },
  {
    name: 'Raw Honey',
    description: 'Pure raw honey packed with natural nutrients and enzymes',
    price: 11.99,
    category: 'Grocery',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1585528392384-ae2b2da63a1c?w=500&h=500&fit=crop',
    ],
    rating: 4.9,
    numReviews: 445,
  },
  // Jewellery Products
  {
    name: 'Gold Chain Necklace',
    description: 'Elegant 18K gold plated chain necklace for everyday elegance',
    price: 79.99,
    category: 'Jewellery',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'
    ],
    rating: 4.7,
    numReviews: 234,
  },
  {
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings with 14K white gold settings',
    price: 49.99,
    category: 'Jewellery',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop'
    ],
    rating: 4.6,
    numReviews: 198,
  },
  {
    name: 'Pearl Ring',
    description: 'Elegant pearl ring with 10K gold band',
    price: 89.99,
    category: 'Jewellery',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'
    ],
    rating: 4.8,
    numReviews: 167,
  },
  // Home Decoration & Accessories
  {
    name: 'Modern Wall Clock',
    description: 'Contemporary wall clock with minimalist design and silent movement',
    price: 34.99,
    category: 'Home Decor',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1552043148-62cabe59a575?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552043148-62cabe59a575?w=500&h=500&fit=crop',
      
    ],
    rating: 4.6,
    numReviews: 243,
  },
  {
    name: 'Ceramic Vase Set',
    description: 'Set of 3 elegant ceramic vases for flower arrangement',
    price: 44.99,
    category: 'Home Decor',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop'
    ],
    rating: 4.7,
    numReviews: 156,
  },
  {
    name: 'Bamboo Pot Holders',
    description: 'Set of 5 heat-resistant bamboo pot holders for kitchen',
    price: 14.99,
    category: 'Home Decor',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=500&fit=crop',
    ],
    rating: 4.5,
    numReviews: 289,
  },
  {
    name: 'Decorative Pillow Set',
    description: 'Set of 2 colorful decorative pillows for sofa or bed',
    price: 39.99,
    category: 'Home Decor',
    stock: 110,
    image: 'https://images.unsplash.com/photo-1578681033854-71c7f5259b11?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578681033854-71c7f5259b11?w=500&h=500&fit=crop'
    ],
    rating: 4.6,
    numReviews: 201,
  },
  {
    name: 'Wall Art Canvas',
    description: 'Beautiful abstract canvas art for living room or bedroom',
    price: 59.99,
    category: 'Home Decor',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop'
    ],
    rating: 4.8,
    numReviews: 178,
  },
  {
    name: 'LED String Lights',
    description: 'Warm white LED string lights perfect for room decoration',
    price: 19.99,
    category: 'Home Decor',
    stock: 180,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'
    ],
    rating: 4.7,
    numReviews: 356,
  },
];

const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${createdProducts.length} products to the database`);

    console.log('\nProducts added:');
    createdProducts.forEach((product) => {
      console.log(`- ${product.name} ($${product.price}) - ${product.images.length} images`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error ing database:', error);
    process.exit(1);
  }
};

Database();
