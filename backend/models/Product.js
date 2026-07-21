const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    image: { type: String, required: true },
    rating: { type: Number, default: 4 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
