import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ShoppingCart, Heart, Trash2, Plus, Minus, X, Facebook, Twitter, Instagram, MapPin, Phone, Mail, User, Edit, Trash, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
const [showInstallPrompt, setShowInstallPrompt] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://shopsphere-p12m.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
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

  // PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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
    setCart(prevCart => prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
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
  <button
    type="button"
    className="md:hidden mr-3"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
  >
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
  <ShoppingBag className="text-accent" />
  <span>ShopSphere</span>
</div>
            <nav>
<ul className="hidden md:flex gap-6">
                <li><Link to="/" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Home</Link></li>
                <li><Link to="/api/products" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Shop</Link></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Deals</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">About</Link></li>
              </ul>
</nav>
<div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-primary text-white py-4 z-50`}>
  <div className="container mx-auto px-4">
    <div className="flex flex-col gap-4">
      <Link to="/" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
      <Link to="/api/products" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
      <Link to="/categories" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
      <Link to="/deals" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
      <Link to="/about" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
      <div className="relative">
        <input type="text" placeholder="Search products..." className="pl-4 pr-10 py-2 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-full focus:ring-2 focus:ring-accent transition-all" />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
      </div>
      <Link to="/signup" className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
        <User size={18} />
        Sign Up
      </Link>
    </div>
  </div>
</div>
<div className="flex items-center gap-4">
<div className="relative hidden md:block">
  <input type="text" placeholder="Search products..." className="pl-4 pr-10 py-2 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-64 focus:ring-2 focus:ring-accent transition-all" />
  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
</div>
<Link to="/signup" className="hidden md:flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80 transition-colors">
  <User size={18} />
  Sign Up
</Link>

              <button
                type="button"
                className="relative cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label={isCartOpen ? 'Close cart' : 'Open cart'}
                aria-expanded={isCartOpen ? 'true' : 'false'}
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{totalItems}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
<h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">Summer Collection 2026</h1>
<p className="text-lg md:text-xl mb-8 opacity-90">Discover the latest trends in fashion, electronics, and more with exclusive discounts up to 50% off</p>
<a href="/api/products" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-lg hover:scale-105 transition-all">
              Shop Now <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4">Featured Products</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded"></div>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['all', 'electronics', 'fashion', 'home', 'sports'].map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all ${
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
      </section>

      {/* Cart Sidebar */}
<motion.div
  className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto ${
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
                <a href="#" aria-label="Facebook" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Twitter" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" aria-label="Instagram" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-colors">
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
