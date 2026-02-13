import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Search, ShoppingCart, Heart, Trash2, Plus, Minus, X, 
  Facebook, Twitter, Instagram, MapPin, Phone, Mail, User,
  Truck, Shield, Clock, RotateCcw, ArrowRight, Star, Zap, Eye, Flame,
  Sparkles, Timer, Loader2, Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastContainer, useToast, subscribeToToasts, type Toast } from './components/Toast';
import { SkeletonGrid, SkeletonCard, SkeletonHero, SkeletonCategory } from './components/SkeletonLoader';


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

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders over $50'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment methods'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round the clock customer service'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns'
  }
];

const categories = [
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: '2.5k+ items'
  },
  {
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: '5k+ items'
  },
  {
    name: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: '1.8k+ items'
  },
  {
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: '900+ items'
  }
];

function AppContent() {
  const { addToast } = useToast();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const getCurrentYear = () => new Date().getFullYear();

  const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem('shopsphere-cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [trendingFilter, setTrendingFilter] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Subscribe to toasts
  useEffect(() => {
    return subscribeToToasts(setToasts);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://shopsphere-p12m.onrender.com/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
      addToast('Failed to load products. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  useEffect(() => {
    localStorage.setItem('shopsphere-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        addToast(`Updated ${product.name} quantity in cart`, 'success');
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        addToast(`${product.name} added to cart!`, 'success');
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
  }, [products, addToast]);


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
    setCart(prevCart => prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = useCallback((productId: number) => {
    const item = cart.find(item => item.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    if (item) {
      addToast(`${item.name} removed from cart`, 'info');
    }
  }, [cart, addToast]);


  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Thank you for subscribing! Check your email for confirmation.', 'success');
    setEmail('');
  };


  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Get trending products based on filter
  const getTrendingProducts = () => {
    let filtered = products;
    if (trendingFilter !== 'all') {
      filtered = products.filter(p => p.category === trendingFilter);
    }
    // Return products with deals first, then by price (lower to higher), up to 8 items
    return filtered
      .sort((a, b) => {
        if (a.isDeal && !b.isDeal) return -1;
        if (!a.isDeal && b.isDeal) return 1;
        return a.price - b.price;
      })
      .slice(0, 8);
  };

  const trendingProducts = getTrendingProducts();

  const trendingCategories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'electronics', label: 'Electronics', icon: Zap },
    { id: 'fashion', label: 'Fashion', icon: Star },
    { id: 'home', label: 'Home', icon: ShoppingBag },
    { id: 'sports', label: 'Sports', icon: Flame },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-3 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold cursor-pointer hover:scale-105 transition-transform">
              <button
                type="button"
                className="md:hidden mr-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <ShoppingBag className="text-accent w-6 h-6" />
              <span className="hidden sm:inline">ShopSphere</span>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex gap-6 text-sm">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors">Deals</Link></li>
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-3 pr-8 py-1.5 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-40 lg:w-64 text-sm focus:ring-2 focus:ring-accent transition-all" 
                />
                <Search className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              </div>
              
              <Link to="/signup" className="hidden sm:flex items-center gap-1 bg-accent text-white px-3 py-1.5 rounded-full hover:bg-accent/80 transition-colors text-sm">
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Up</span>
              </Link>

              <button
                type="button"
                className="relative cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-primary text-white py-4 z-50 shadow-lg`}>
          <div className="container mx-auto px-4 flex flex-col gap-3">
            <Link to="/" className="hover:text-accent transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="hover:text-accent transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link to="/categories" className="hover:text-accent transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
            <Link to="/deals" className="hover:text-accent transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
            <Link to="/about" className="hover:text-accent transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <div className="relative mt-2">
              <input type="text" placeholder="Search products..." className="pl-4 pr-10 py-2 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-full text-sm" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
            </div>
            <Link to="/signup" className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80 transition-colors mt-2" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="w-4 h-4" />
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {loading ? (
        <SkeletonHero />
      ) : (
        <section className="relative bg-gradient-to-br from-primary via-secondary to-primary text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Summer Sale Live Now</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Discover Amazing <span className="text-accent">Deals</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-xl mx-auto px-4 sm:px-0">
                Shop the latest trends in fashion, electronics, and more with exclusive discounts up to 50% off
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
                <Link 
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Shop Now 
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
                <Link 
                  to="/deals"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/30 transition-all"
                >
                  View Deals
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}


      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg shrink-0">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3">Shop by Category</h2>
            <p className="text-gray-600 text-sm sm:text-base">Explore our wide range of products</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCategory key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-[4/3] sm:aspect-square">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{category.itemCount}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Trending Products Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-primary/20 text-accent px-4 py-2 rounded-full mb-4">
              <Flame className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">Hot Right Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-3">
              Trending Now
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Discover what's flying off the shelves! Limited-time deals on our most popular items
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {trendingCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setTrendingFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm transition-all ${
                  trendingFilter === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load products</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
              >
                <Loader2 className="w-4 h-4" />
                Try Again
              </button>
            </div>
          ) : trendingProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No products found in this category</p>
              <button 
                onClick={() => setTrendingFilter('all')}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              <AnimatePresence mode="wait">
                {trendingProducts.length > 0 ? trendingProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 relative"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <motion.img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        animate={{ scale: hoveredProduct === product.id ? 1.1 : 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Overlay on Hover */}
                      <motion.div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button 
                          className="p-3 bg-white rounded-full hover:bg-accent hover:text-white transition-colors shadow-lg"
                          aria-label="Quick view"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-3 bg-white rounded-full hover:bg-accent hover:text-white transition-colors shadow-lg"
                          aria-label="Add to wishlist"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </motion.div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.badge && (
                          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            {product.badge}
                          </span>
                        )}
                        {product.isDeal && (
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Deal
                          </span>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-5">
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      {/* Price Section */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl sm:text-2xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Stock Indicator */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500">Selling fast!</span>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all text-sm font-bold"
                        onClick={() => addToCart(product.id)}
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.button>

                    </div>
                  </motion.div>
                )) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No products found in this category</p>
                    <button 
                      onClick={() => setTrendingFilter('all')}
                      className="mt-4 text-primary font-semibold hover:underline"
                    >
                      View all products
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* View All CTA */}
          <motion.div 
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-base hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl"
            >
              Explore All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-accent" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Stay in the Loop</h2>
              <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base px-4 sm:px-0">
                Subscribe to our newsletter and get 15% off your first order, plus exclusive access to new arrivals and special offers.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 sm:px-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 outline-none focus:ring-2 focus:ring-accent transition-all text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent/80 transition-colors whitespace-nowrap text-sm"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-white/60 mt-4">No spam, unsubscribe anytime.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <motion.div
        className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isCartOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >

        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6 pb-4 border-b">
            <h2 className="text-xl sm:text-2xl font-bold text-secondary">Your Cart ({totalItems})</h2>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm sm:text-base mb-4">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-primary font-medium hover:text-secondary text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (

            <>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 p-3 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                      <p className="text-primary font-semibold text-sm mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 border rounded-full hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="font-semibold w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border rounded-full hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-accent hover:bg-red-50 rounded-full ml-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  <span>Total:</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => addToast('Checkout coming soon!', 'info')}
                  className="w-full bg-primary text-white py-3 sm:py-4 rounded-xl font-semibold text-center hover:bg-secondary transition-colors text-sm sm:text-base"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
                >
                  Continue Shopping
                </button>
              </div>

            </>
          )}
        </div>
      </motion.div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-secondary text-white py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-xl font-bold mb-3">
                <ShoppingBag className="text-accent w-6 h-6" />
                <span>ShopSphere</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Your one-stop destination for quality products at affordable prices.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-sm">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors">Deals</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-sm">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-sm">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Shop Street, NY 10001</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@shopsphere.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; {getCurrentYear()} ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
