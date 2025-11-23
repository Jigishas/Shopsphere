const mongoose = require('mongoose');
const Products = require('./model/products');
require('dotenv').config();

const sampleProducts = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro Max',
    category: 'Smartphones',
    price: 1099,
    originalPrice: 1199,
    image: 'https://example.com/images/iphone14promax.jpg',
    badge: 'New Arrival',
    isDeal: false
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    category: 'Smartphones',
    price: 999,
    originalPrice: 1099,
    image: 'https://example.com/images/galaxys23ultra.jpg',
    badge: 'Limited Offer',
    isDeal: true
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    price: 348,
    originalPrice: 399,
    image: 'https://example.com/images/sonywh1000xm5.jpg',
    badge: 'Top Rated',
    isDeal: true
  },
  {
    id: 4,
    name: 'Apple MacBook Pro 16-inch',
    category: 'Laptops',
    price: 2499,
    originalPrice: 2699,
    image: 'https://example.com/images/macbookpro16.jpg',
    badge: 'Best Seller',
    isDeal: false
  },
  {
    id: 5,
    name: 'Dell XPS 13',
    category: 'Laptops',
    price: 1299,
    originalPrice: 1399,
    image: 'https://example.com/images/dellxps13.jpg',
    badge: '',
    isDeal: false
  }
];

const connectDBAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected. Starting seeding.');

    // Clear existing products
    await Products.deleteMany({});
    console.log('Existing products cleared.');

    // Insert sample products
    await Products.insertMany(sampleProducts);
    console.log('Sample products inserted successfully.');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

connectDBAndSeed();
