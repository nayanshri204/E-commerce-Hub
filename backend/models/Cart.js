const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to populate product details and remove null references
cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.product',
    select: 'name price image',
  });
  next();
});

// Post-find middleware to clean up deleted products
cartSchema.post(/^find/, function(docs) {
  if (!Array.isArray(docs)) docs = [docs];
  
  docs.forEach(doc => {
    if (doc && doc.items) {
      doc.items = doc.items.filter(item => item.product !== null);
    }
  });
});

module.exports = mongoose.model('Cart', cartSchema);
