import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ShoppingCart, User, ShoppingCart as CartIcon, Heart } from 'lucide-react';
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

function Deals() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Load cart from localStorage on mount
  const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem('shopsphere-cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dealProducts, setDealProducts] = useState<Product[]>([]);

  // Fetch deal products from API
  const fetchDealProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        credentials: 'include'
      });
      const data = await response.json();
      const deals = data.filter((product: Product) => product.isDeal);
      setDealProducts(deals);
    } catch (error) {
      console.error('Error fetching deal products:', error);
    }
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopsphere-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchDealProducts();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();

      // Calculate the next 2-hour interval starting from 00:00
      const hoursSinceMidnight = currentHour;
      const intervalsPassed = Math.floor(hoursSinceMidnight / 2);
      const nextIntervalHour = (intervalsPassed + 1) * 2;
      const nextIntervalTime = new Date(now);
      nextIntervalTime.setHours(nextIntervalHour, 0, 0, 0);

      // If next interval is tomorrow, set to 00:00 tomorrow
      if (nextIntervalHour >= 24) {
        nextIntervalTime.setDate(nextIntervalTime.getDate() + 1);
        nextIntervalTime.setHours(0, 0, 0, 0);
      }

      const distance = nextIntervalTime.getTime() - now.getTime();

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToCart = (productId: number) => {
    const product = dealProducts.find(p => p.id === productId);
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
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform">
              <ShoppingBag className="text-accent" />
              <span>ShopSphere</span>
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li><Link to="/" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Home</Link></li>
                <li><Link to="/shop" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Shop</Link></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Categories</Link></li>
                <li><Link to="/deals" className="text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:transition-all">Deals</Link></li>
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

      {/* Deals Hero */}
      <section className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Special Offers & Deals</h1>
            <p className="text-xl mb-8 opacity-90">Don't miss out on our limited-time discounts and promotions</p>
          </motion.div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-accent text-white p-8 rounded-2xl text-center shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Flash Sale Ends In:</h2>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="bg-white/20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold mb-2">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase">Days</div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold mb-2">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase">Hours</div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold mb-2">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase">Minutes</div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold mb-2">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase">Seconds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deal Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-secondary mb-4">Hot Deals</h2>
            <p className="text-xl text-gray-600">Limited time offers with special discounts</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            {dealProducts.map((product, index) => (
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
                      <CartIcon size={16} />
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
              ×
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
                          −
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border rounded-full hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-accent hover:bg-red-50 rounded-full ml-auto"
                          aria-label="Remove item"
                        >
                          ×
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
    </div>
  );
}

export default Deals;
