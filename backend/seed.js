const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Samsung Galaxy M14 5G',
    price: 12999,
    originalPrice: 15999,
    description: '6.6 inch display, 6000mAh battery, 50MP camera.',
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    rating: 4.3,
  },
  {
    name: 'boAt Rockerz 450',
    price: 1499,
    originalPrice: 3990,
    description: 'Wireless Bluetooth headphones with 15 hours playback.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.1,
  },
  {
    name: 'Men Casual Shirt',
    price: 599,
    originalPrice: 1299,
    description: 'Comfortable cotton shirt for daily wear.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b00?w=400',
    rating: 4.0,
  },
  {
    name: 'Prestige Electric Kettle',
    price: 899,
    originalPrice: 1495,
    description: '1.5L stainless steel kettle, auto cut-off.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
    rating: 4.2,
  },
  {
    name: 'Nike Running Shoes',
    price: 2499,
    originalPrice: 4999,
    description: 'Lightweight shoes for running and gym.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.5,
  },
  {
    name: 'HP 15 Laptop',
    price: 38999,
    originalPrice: 45999,
    description: 'Intel i3, 8GB RAM, 512GB SSD, Windows 11.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    rating: 4.4,
  },
];

async function seedProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(sampleProducts);
    console.log('Sample products added');
  }
}

module.exports = seedProducts;
