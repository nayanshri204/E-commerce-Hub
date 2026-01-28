# E-Commerce Hub - Quick Start Guide

## 🚀 Quick Setup

### 1. Clone or Open Project
The project is located at: `c:\Users\nikhi\OneDrive\Desktop\E-commerce Hub`

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

Frontend runs on: `http://localhost:3000`

## ⚙️ Configuration

### MongoDB
- Install MongoDB locally or use MongoDB Atlas
- Add connection string to `backend/.env`

### Stripe
- Create Stripe account at https://stripe.com
- Get test API keys
- Add to `backend/.env` and `frontend/.env`

## 📝 Default Credentials (for testing)

Create a test account through the registration page.

## 🎯 Features to Test

1. **User Management**
   - Register new account
   - Login/Logout
   - Update profile

2. **Shopping**
   - Browse products
   - Filter by category/price
   - Add to cart
   - View cart

3. **Checkout**
   - Proceed to checkout
   - Fill shipping address
   - Complete Stripe payment

4. **Orders**
   - View order history
   - Track order status

## 📚 API Documentation

All API endpoints are documented in the main README.md

## 🐛 Common Issues

**Port already in use:**
```bash
# Frontend uses 3000
# Backend uses 5000
# Change PORT in .env if needed
```

**MongoDB connection failed:**
- Ensure MongoDB service is running
- Check connection string in .env

**Stripe errors:**
- Verify API keys are test keys
- Check Stripe account is active

## 📞 Support Files

- Backend: `backend/README.md` (if created)
- Frontend: `frontend/README.md` (if created)
- Main docs: `README.md`

## 🎉 You're All Set!

The application is ready to use. Start both servers and open `http://localhost:3000` in your browser.

Enjoy building! 🚀
