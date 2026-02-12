import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, ShoppingBag, User, Plus, Minus, X, Trash2, Rocket, Globe, Sparkles, Gem, Wind, Leaf, Star, Quote, ArrowRight, CheckCircle, Sofa, Clock, Shirt, Footprints, Coffee, Armchair, SprayCan } from 'lucide-react';


import { Link } from 'react-router-dom';
import ShopFooter from './ShopFooter';


interface Product {
  _id: string;
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  isDeal: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function Shop() {
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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [_isModalOpen, setIsModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    category: '',
    price: 0,
    originalPrice: 0,
    image: '',
    badge: '',
    isDeal: false
  });

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://shopsphere-p12m.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      console.log( err)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
  }, [filter, products]);

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

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setFormData({
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: '',
      category: '',
      price: 0,
      originalPrice: 0,
      image: '',
      badge: '',
      isDeal: false
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      badge: product.badge || '',
      isDeal: product.isDeal
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`https://shopsphere-p12m.onrender.com/api/products/${productId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          fetchProducts();
        } else {
          console.error('Error deleting product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const _handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted');
  };


  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform">
              <ShoppingBag className="text-accent" />
              <span>ShopSphere</span>
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li><Link to="/" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Home</Link></li>
                <li><span className="text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:transition-all">Shop</span></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Deals</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">About</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Contact</Link></li>
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

      {/* HERO SECTION */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                where <span className="text-[#bfa5a0] underline decoration-4 underline-offset-8">style</span><br />
                orbits around you.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                ShopSphere brings the universe of design to your doorstep. 
                Curated, conscious, endlessly inspiring. One sphere, infinite possibilities.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/categories" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-lg">
                  <Rocket size={20} />
                  Start exploring
                </Link>
                <Link to="/signup" className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-8 py-4 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all hover:-translate-y-1">
                  Join sphere+
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#faf7f5] to-[#f2ece9] rounded-3xl p-6 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-4 right-8 bg-secondary text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                new arrivals
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center">
                  <Sofa size={40} className="mx-auto text-[#9b7b75] mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Lunar lounge</h4>
                  <p className="font-bold text-secondary">$289</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center">
                  <Clock size={40} className="mx-auto text-[#9b7b75] mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Eclipse watch</h4>
                  <p className="font-bold text-secondary">$179</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center">
                  <Shirt size={40} className="mx-auto text-[#9b7b75] mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Merino sphere</h4>
                  <p className="font-bold text-secondary">$89</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center">
                  <Footprints size={40} className="mx-auto text-[#9b7b75] mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Nebula runners</h4>
                  <p className="font-bold text-secondary">$145</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY SECTION */}
      <section className="py-16 px-4 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-[#e7dfdc] rounded-[40px] p-12 text-center min-h-[300px] flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles size={64} className="mx-auto text-[#5e3e38] mb-5" />
              <h3 className="text-3xl font-bold text-secondary mb-2">curated by<br />creatives</h3>
              <p className="mt-4 text-secondary/80">since 2022</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-secondary mb-6">
                more than commerce,<br />
                it's <span className="text-[#977a74]">cosmic</span> connection.
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                ShopSphere isn't just another marketplace — we're a constellation of independent makers, heritage ateliers, and forward-thinking brands. Every piece tells a story, every purchase supports a dream. We believe style should be sustainable, intimate, and boundless.
              </p>
              <p className="text-xl italic text-[#7e605a] font-serif mb-6">— Elena Voss, founder</p>
              <Link to="/about" className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all">
                Read our manifesto →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS SECTION */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-secondary mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="border-b-4 border-[#bfa5a0] pb-2">shop by universe</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={48} />, title: 'object', desc: 'furniture, vessels, light', color: '#977a74' },
              { icon: <Gem size={48} />, title: 'adorn', desc: 'jewelry, textiles', color: '#977a74' },
              { icon: <Wind size={48} />, title: 'essence', desc: 'fragrance, apothecary', color: '#977a74' },
              { icon: <Leaf size={48} />, title: 'cultivate', desc: 'plants, ceramics', color: '#977a74' },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-[#fcfaf9] rounded-[28px] p-8 text-center border border-[#f3efed] hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-[#977a74] mb-5 flex justify-center">{category.icon}</div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{category.title}</h3>
                <p className="text-gray-500 mb-5">{category.desc}</p>
                <Link to="/categories" className="font-semibold text-secondary border-b-2 border-[#bfa5a0] pb-1 hover:text-[#bfa5a0] transition-colors">
                  explore →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP SPOTLIGHT SECTION */}
      <section className="py-16 px-4 bg-[#faf8f7] rounded-[60px] mx-4 my-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-secondary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="border-b-4 border-[#bfa5a0] pb-2">orbiting now</span>
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              bestsellers & limited drops – as infinite as your curiosity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[
              { id: 101, icon: <Coffee size={56} />, category: 'ceramics', title: 'Raku vessel', price: 140, oldPrice: 190, rating: 4.5 },
              { id: 102, icon: <Armchair size={56} />, category: 'furniture', title: 'Pebble stool', price: 390, rating: 5 },
              { id: 103, icon: <SprayCan size={56} />, category: 'fragrance', title: 'Santal sphere', price: 85, rating: 5 },
            ].map((product, index) => (
              <motion.div
                key={product.id}

                className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-[#e6dbd7]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-[#ece3e0] h-48 rounded-3xl flex items-center justify-center mb-6 text-[#5e423d]">
                  {product.icon}
                </div>
                <p className="text-xs uppercase tracking-widest text-[#a18882] font-semibold mb-2">{product.category}</p>
                <h3 className="text-xl font-bold text-secondary mb-2">{product.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl font-bold text-secondary">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through">${product.oldPrice}</span>
                  )}
                </div>
                <div className="flex gap-1 mb-5 text-[#c6a69b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className="w-full py-3 rounded-full border border-[#e3d9d5] text-secondary font-semibold hover:bg-[#f5f0ed] transition-colors"
                >
                  add to cart
                </button>

              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/categories" className="inline-flex items-center gap-2 bg-[#977a74] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#7a635e] transition-colors">
              view all products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY / TESTIMONIAL SECTION */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              className="bg-secondary text-white p-12 rounded-[50px] rounded-bl-none"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Quote size={48} className="text-[#bfa5a0] mb-6 opacity-70" />
              <p className="text-2xl leading-relaxed font-serif mb-8">
                "ShopSphere completely shifted how I discover brands. It feels personal, not algorithmic. Like walking through the most beautiful global bazaar."
              </p>
              <div className="flex items-center gap-4">
                <span className="font-bold text-xl">Maya Chen</span>
                <span className="bg-[#bfa5a0] text-secondary px-4 py-1 rounded-full text-sm font-semibold">verified buyer</span>
              </div>
            </motion.div>
            <motion.div
              className="pl-0 lg:pl-10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-serif font-bold text-secondary mb-8">
                a growing<br />constellation
              </h2>
              <div className="flex gap-8 mb-8 flex-wrap">
                <div>
                  <h4 className="text-3xl font-bold text-[#bfa5a0] mb-1">250+</h4>
                  <p className="text-gray-600">independent brands</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-[#bfa5a0] mb-1">45k</h4>
                  <p className="text-gray-600">happy souls</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-[#bfa5a0] mb-1">12</h4>
                  <p className="text-gray-600">countries</p>
                </div>
              </div>
              <Link to="/signup" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                join our sphere →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-[#dad0cc] to-[#cbbeb9] rounded-[70px] p-12 lg:p-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              designed to integrate,<br />built to inspire.
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
              ShopSphere plays beautifully with your existing store, blog, or portfolio. This very block is ready to drop into any page.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors">
              <Globe size={20} /> embed shopsphere
            </Link>
            <p className="mt-8 text-gray-700 flex items-center justify-center gap-2">
              <CheckCircle size={16} /> seamless integration · fluid spacing · zero conflict
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Page Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-secondary mb-4">All Products</h1>
            <p className="text-xl text-gray-600">Discover our complete collection of premium products</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></div>
          </motion.div>


          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['all', 'electronics', 'fashion', 'home', 'sports'].map((category) => (
              <button
                type="button"
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
                key={product._id}
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
                      type="button"
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => addToCart(product.id)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </motion.button>

                    <button type="button" className="p-2 border-2 border-gray-300 rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Add to wishlist">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

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
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <motion.div
                animate={{ rotate: isCartOpen ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <X size={20} />
              </motion.div>
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
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 border rounded-full hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 border rounded-full hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        type="button"
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
      <ShopFooter />
    </div>
  );
}

export default Shop;
