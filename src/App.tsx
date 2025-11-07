import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ShoppingCart, Heart, Trash2, Plus, Minus, X, Facebook, Twitter, Instagram, MapPin, Phone, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  isDeal: boolean;
}

// Product Data - will be fetched from API
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
image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1190&q=80",
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
image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
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
image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
badge: "Popular",
isDeal: false
},
{
id: 47,
name: "Pressure Cooker",
category: "home",
price: 89.99,
originalPrice: 119.99,
image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
badge: "Sale",
isDeal: true
},
{
id: 48,
name: "Fitness Tracker",
category: "sports",
price: 49.99,
originalPrice: 69.99,
image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
badge: "Hot",
isDeal: false
},
{
id: 49,
name: "Laptop Stand",
category: "electronics",
price: 39.99,
originalPrice: 59.99,
image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
badge: "Sale",
isDeal: true
},
{
id: 50,
name: "Evening Dress",
category: "fashion",
price: 129.99,
originalPrice: 169.99,
image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
badge: "New",
isDeal: false
}
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function App() {
  const getCurrentYear = () => new Date().getFullYear();

  // Load cart from localStorage on mount
  const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem('shopsphere-cart');
    return storedCart ? JSON.parse(storedCart) : [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: 3,
        name: "Casual Summer Dress",
        price: 45.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      }
    ];
  };

  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopsphere-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === filter));
    }
  }, [filter]);

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }];
      }
    });
    setIsCartOpen(true);
  };

  const increaseQuantity = (productId: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform">
              <ShoppingBag className="text-accent" />
              <span>ShopSphere</span>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li><Link to="/" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Home</Link></li>
                <li><Link to="/shop" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Shop</Link></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Deals</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">About</Link></li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="pl-4 pr-10 py-2 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-64 focus:ring-2 focus:ring-accent transition-all" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
              </div>
              <Link to="/signup" className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80 transition-colors">
                <User size={18} />
                Sign Up
              </Link>
              <div className="relative cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsCartOpen(!isCartOpen)}>
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{totalItems}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Summer Collection 2023</h1>
            <p className="text-xl mb-8 opacity-90">Discover the latest trends in fashion, electronics, and more with exclusive discounts up to 50% off</p>
            <a href="#" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all">
              Shop Now <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-secondary mb-4">Featured Products</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded"></div>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['all', 'electronics', 'fashion', 'home', 'sports'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded text-sm font-semibold">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2 capitalize">{product.category}</p>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <motion.button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => addToCart(product.id)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </motion.button>
                    <button className="p-2 border-2 border-gray-300 rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Add to wishlist">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <motion.div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        initial={false}
        animate={{ x: isCartOpen ? 0 : 400 }}
        transition={{ type: 'tween' }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-secondary">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={60} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{item.name}</h4>
                      <p className="text-primary font-semibold mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 border rounded-full hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border rounded-full hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-accent hover:bg-red-50 rounded-full ml-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total:</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <a
                  href="#"
                  className="block w-full bg-primary text-white py-4 rounded-xl font-semibold text-center hover:bg-secondary transition-colors"
                >
                  Proceed to Checkout
                </a>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 relative">
                ShopSphere
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-accent"></div>
              </h3>
              <p className="text-gray-300 mb-4">
                Your one-stop destination for all your shopping needs. We offer quality products at affordable prices with excellent customer service.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-accent"></div>
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 relative">
                Customer Service
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-accent"></div>
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Return Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 relative">
                Contact Us
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-accent"></div>
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <MapPin size={16} />
                  123 Commerce St, City, State 12345
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  support@shopsphere.com
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-700">
            <p className="text-gray-400">&copy; {getCurrentYear()} ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
