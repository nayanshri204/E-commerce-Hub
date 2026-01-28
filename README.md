# Dynamic E-Commerce Hub

A comprehensive full-stack e-commerce platform built with React and Node.js, featuring product catalogs, user authentication, shopping cart, and Stripe-integrated checkout process. The application is powered by a MongoDB database.

## 🚀 Technologies

- **Frontend:** React, React Router, Tailwind CSS, Axios, Stripe.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Processing:** Stripe API
- **Security:** bcryptjs for password hashing

## 📋 Features

### User Features
- **User Authentication:** Register and login with secure JWT tokens
- **Product Catalog:** Browse, search, and filter products by category and price
- **Shopping Cart:** Add/remove items, update quantities
- **Checkout:** Complete checkout process with address and payment info
- **Secure Payments:** Stripe-integrated payment processing
- **Order Tracking:** View order history and status
- **User Profile:** Manage profile and address information
- **Product Reviews:** Add ratings and reviews to products

### Admin Features
- **Product Management:** Create, update, and delete products
- **Order Management:** View all orders and update delivery status
- **Inventory Control:** Manage product stock

## 📁 Project Structure

```
E-commerce Hub/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── OrderSuccess.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce-hub
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

5. Start the development server:
```bash
npm start
```

The application will open on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/reviews` - Add product review (requires auth)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/:productId` - Update cart item quantity (requires auth)
- `DELETE /api/cart/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart` - Clear cart (requires auth)

### Orders
- `POST /api/orders/payment-intent` - Create Stripe payment intent (requires auth)
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get order details (requires auth)
- `GET /api/orders/admin/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## 🔐 Authentication

The application uses JWT tokens for authentication. After login, the token is stored in localStorage and automatically included in all API requests.

## 💳 Stripe Integration

Stripe is integrated for secure payment processing. The checkout flow:
1. User adds items to cart
2. User proceeds to checkout
3. Creates payment intent on backend
4. Frontend handles payment with Stripe SDK
5. Order is created upon successful payment

## 🎨 Styling

The frontend uses Tailwind CSS for styling. Custom colors are configured in `tailwind.config.js`:
- Primary: #1F2937 (dark gray)
- Secondary: #3B82F6 (blue)
- Accent: #10B981 (green)

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce-hub
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

## 🚀 Deployment

### Backend (Heroku/Vercel)
1. Set environment variables in hosting platform
2. Push code to Git repository
3. Connect repository to deployment platform
4. Platform will auto-deploy on push

### Frontend (Netlify/Vercel)
1. Set environment variables in hosting platform
2. Connect GitHub repository
3. Configure build command: `npm run build`
4. Platform will auto-deploy on push

## 🧪 Testing

Run tests:

**Backend:**
```bash
npm test
```

**Frontend:**
```bash
npm test
```

## 📖 Sample Data

To populate the database with sample products, run:
```bash
# This would require a seed script - create one in backend/seeds/seedProducts.js
npm run seed
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify database credentials

### Stripe Errors
- Verify API keys are correct
- Ensure Stripe test mode is active
- Check that webhook endpoints are configured

### CORS Issues
- Verify FRONTEND_URL in backend .env
- Check CORS configuration in server.js
- Ensure both services are running on correct ports

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@ecommercehub.com or open an issue on the repository.

## 🎯 Future Enhancements

- [ ] Email notifications for orders
- [ ] Product recommendations based on browsing history
- [ ] Wishlist functionality
- [ ] Multiple payment methods (PayPal, Apple Pay)
- [ ] Admin dashboard with analytics
- [ ] Product inventory alerts
- [ ] Customer support chat
- [ ] Mobile app version
- [ ] Social media integration
- [ ] Advanced search with autocomplete

---

**Built with ❤️ by Your Development Team**
