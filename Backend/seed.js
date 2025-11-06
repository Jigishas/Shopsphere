const mongoose = require('mongoose');
const Product = require('./model/products');
require('dotenv').config();

const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 3,
        name: "Casual Summer Dress",
        category: "fashion",
        price: 45.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        badge: "Popular",
        isDeal: true
    },
    {
        id: 4,
        name: "Modern Coffee Maker",
        category: "home",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: false
    },
    {
        id: 5,
        name: "Running Shoes",
        category: "sports",
        price: 89.99,
        originalPrice: 109.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Hot",
        isDeal: true
    },
    {
        id: 6,
        name: "Smartphone 128GB",
        category: "electronics",
        price: 699.99,
        originalPrice: 799.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 7,
        name: "Designer Handbag",
        category: "fashion",
        price: 149.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 8,
        name: "Yoga Mat Premium",
        category: "sports",
        price: 39.99,
        originalPrice: 49.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 9,
        name: "4K Ultra HD Smart TV",
        category: "electronics",
        price: 599.99,
        originalPrice: 799.99,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 10,
        name: "Men's Formal Suit",
        category: "fashion",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1594938373333-035578b5b8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 11,
        name: "Kitchen Mixer",
        category: "home",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 12,
        name: "Basketball",
        category: "sports",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1190&q=80",
        badge: "Hot",
        isDeal: false
    },
    {
        id: 13,
        name: "Gaming Laptop",
        category: "electronics",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 14,
        name: "Leather Jacket",
        category: "fashion",
        price: 179.99,
        originalPrice: 229.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 15,
        name: "Air Fryer",
        category: "home",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1632236448420-69db66a9234f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 16,
        name: "Dumbbell Set",
        category: "sports",
        price: 149.99,
        originalPrice: 189.99,
        image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
        badge: "Hot",
        isDeal: false
    },
    {
        id: 17,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 18,
        name: "Summer Sandals",
        category: "fashion",
        price: 34.99,
        originalPrice: 44.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 19,
        name: "Blender Pro",
        category: "home",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 20,
        name: "Yoga Pants",
        category: "sports",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1583873335405-7b09ef47dfd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 21,
        name: "Tablet 10 inch",
        category: "electronics",
        price: 299.99,
        originalPrice: 349.99,
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 22,
        name: "Denim Jeans",
        category: "fashion",
        price: 49.99,
        originalPrice: 64.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 23,
        name: "Vacuum Cleaner",
        category: "home",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 24,
        name: "Tennis Racket",
        category: "sports",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1622279457486-62f5b4b75c85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Hot",
        isDeal: false
    },
    {
        id: 25,
        name: "Digital Camera",
        category: "electronics",
        price: 449.99,
        originalPrice: 549.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1138&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 26,
        name: "Winter Coat",
        category: "fashion",
        price: 129.99,
        originalPrice: 169.99,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 27,
        name: "Stand Mixer",
        category: "home",
        price: 229.99,
        originalPrice: 279.99,
        image: "https://images.unsplash.com/photo-1578997332012-82c79f5e652f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 28,
        name: "Football",
        category: "sports",
        price: 24.99,
        originalPrice: 34.99,
        image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 29,
        name: "Smart Speaker",
        category: "electronics",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 30,
        name: "Evening Gown",
        category: "fashion",
        price: 189.99,
        originalPrice: 239.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 31,
        name: "Toaster Oven",
        category: "home",
        price: 69.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 32,
        name: "Bicycle",
        category: "sports",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Hot",
        isDeal: false
    },
    {
        id: 33,
        name: "Gaming Console",
        category: "electronics",
        price: 399.99,
        originalPrice: 499.99,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 34,
        name: "Leather Boots",
        category: "fashion",
        price: 149.99,
        originalPrice: 189.99,
        image: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 35,
        name: "Food Processor",
        category: "home",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 36,
        name: "Camping Tent",
        category: "sports",
        price: 129.99,
        originalPrice: 169.99,
        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        badge: "Hot",
        isDeal: false
    },
    {
        id: 37,
        name: "External Hard Drive",
        category: "electronics",
        price: 89.99,
        originalPrice: 109.99,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 38,
        name: "Sunglasses",
        category: "fashion",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f55e73ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 39,
        name: "Electric Kettle",
        category: "home",
        price: 34.99,
        originalPrice: 44.99,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 40,
        name: "Swimming Goggles",
        category: "sports",
        price: 19.99,
        originalPrice: 29.99,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Popular",
        isDeal: false
    },
    {
        id: 41,
        name: "Wireless Mouse",
        category: "electronics",
        price: 24.99,
        originalPrice: 34.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 42,
        name: "Wool Sweater",
        category: "fashion",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1205&q=80",
        badge: "New",
        isDeal: false
    },
    {
        id: 43,
        name: "Rice Cooker",
        category: "home",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 44,
        name: "Hiking Backpack",
        category: "sports",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "Hot",
        isDeal: false
    },
    {
        id: 45,
        name: "Portable Speaker",
        category: "electronics",
        price: 69.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
        badge: "Sale",
        isDeal: true
    },
    {
        id: 46,
        name: "Silk Scarf",
        category: "fashion",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1601762603332-fd61e28b698a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        badge: "",
        isDeal: false
    }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
