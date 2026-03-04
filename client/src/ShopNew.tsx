import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, ShoppingBag, User, Plus, Minus, X, Trash2, Rocket, Globe, Sparkles, Gem, Wind, Leaf, Star, Quote, ArrowRight, CheckCircle, Sofa, Clock, Shirt, Footprints, Loader2, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShopFooter from './ShopFooter';
import { ToastContainer, useToast, subscribeToToasts, type Toast } from './components/Toast';
import { SkeletonGrid, SkeletonCard } from './components/SkeletonLoader';

interface Comment {
  user: string;
  text: string;
  rating: number;
  date: string;
}

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
  description?: string;
  rating?: number;
  comments?: Comment[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function Shop() {
  const { addToast } = useToast();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem('shopsphere-cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const similarProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products
      .filter(p => p.category === selectedProduct.category && p._id !== selectedProduct._id)
      .slice(0, 4);
  }, [products, selectedProduct]);

  // review form state
  const [commentUser, setCommentUser] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(0);
  const [submittingComment, setSubmittingComment] = useState(false);

  const submitComment = useCallback(async () => {
    if (!selectedProduct) return;
    if (!commentUser.trim() || !commentText.trim() || commentRating === 0) {
      addToast('Please provide name, review and rating', 'info');
      return;
    }
    setSubmittingComment(true);
    try {
      const resp = await fetch(
        `https://shopsphere-p12m.onrender.com/api/products/${selectedProduct._id}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: commentUser, text: commentText, rating: commentRating })
        }
      );
      if (!resp.ok) throw new Error('Failed to submit review');
      const updated: Product = await resp.json();
      setSelectedProduct(updated);
      setProducts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
      addToast('Review submitted!', 'success');
      setCommentUser('');
      setCommentText('');
      setCommentRating(0);
    } catch (err) {
      console.error(err);
      addToast('Unable to submit review', 'error');
    } finally {
      setSubmittingComment(false);
    }
  }, [commentUser, commentText, commentRating, selectedProduct, addToast]);

  useEffect(() => {
    return subscribeToToasts(setToasts);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://shopsphere-p12m.onrender.com/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
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

  useEffect(() => {
    let result = products;
    if (filter !== 'all') {
      result = result.filter(product => product.category === filter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    setFilteredProducts(result);
  }, [filter, products, searchQuery]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    const value = e.target.value;
    setTimeout(() => {
      setSearchQuery(value);
      setIsSearching(false);
    }, 300);
  }, []);

  const addToCart = useCallback((productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        addToast(`Updated ${product.name} quantity in cart`, 'success');
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        addToast(`${product.name} added to cart!`, 'success');
        return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }];
      }
    });
    setIsCartOpen(true);
  }, [products, addToast]);

  const increaseQuantity = (productId: number) => {
    setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (productId: number) => {
    setCart(prevCart => prevCart.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
  };

  const removeFromCart = useCallback((productId: number) => {
    const item = cart.find(item => item.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    if (item) addToast(`${item.name} removed from cart`, 'info');
  }, [cart, addToast]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const spotlightProducts = useMemo(() => products.filter(p => p.isDeal || p.badge).slice(0, 3), [products]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <header className="bg-gradient-to-r from-primary to-secondary text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform">
              <ShoppingBag className="text-accent" /><span>ShopSphere</span>
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><span className="text-accent">Shop</span></li>
                <li><Link to="/categories" className="hover:text-accent transition-colors">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors">Deals</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearch} className="pl-4 pr-10 py-2 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-64 focus:ring-2 focus:ring-accent" />
                {isSearching ? <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 animate-spin" size={18} /> : <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />}
              </div>
              <Link to="/signup" className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80"><User size={18} />Sign Up</Link>
              <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <ShoppingCart size={24} /><span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{totalItems}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SHOP SPOTLIGHT SECTION */}
      <section className="py-16 px-4 bg-[#faf8f7] rounded-[60px] mx-4 my-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4"><span className="border-b-4 border-[#bfa5a0] pb-2">orbiting now</span></h2>
            <p className="text-xl text-gray-600">bestsellers & limited drops</p>
          </div>
          {loading ? <SkeletonGrid count={3} /> : spotlightProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spotlightProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-lg">
                  <div className="bg-[#ece3e0] h-48 rounded-3xl overflow-hidden mb-6">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform" loading="lazy" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#a18882] font-semibold mb-2">{product.category}</p>
                  <h3 className="text-xl font-bold text-secondary mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl font-bold text-secondary">${product.price}</span>
                    {product.originalPrice && <span className="text-gray-400 line-through">${product.originalPrice}</span>}
                  </div>
                  <button type="button" aria-label={`View ${product.name}`} onClick={() => { setSelectedProduct(product); setIsProductModalOpen(true); }} className="w-full py-3 rounded-full border border-[#e3d9d5] text-secondary font-semibold hover:bg-[#f5f0ed]">View Product</button>
                </div>
              ))}
            </div>
          ) : <div className="text-center py-12"><Package className="w-16 h-16 mx-auto text-gray-300" /><p className="text-gray-500 mt-4">No products available</p></div>}
        </div>
      </section>

      {/* All Products Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-secondary mb-4">All Products</h1>
            <p className="text-xl text-gray-600">{searchQuery ? `Search results for "${searchQuery}"` : 'Discover our complete collection'}</p>
          </div>
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['all', 'electronics', 'fashion', 'home', 'sports'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-3 rounded-full font-semibold ${filter === cat ? 'bg-primary text-white' : 'bg-white text-primary border-2 border-primary'}`}>
                {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          {loading ? <SkeletonGrid count={8} /> : filteredProducts.length === 0 ? (
            <div className="text-center py-16"><Package className="w-20 h-20 mx-auto text-gray-300" /><h3 className="text-xl font-semibold mt-4">No products found</h3></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110" loading="lazy" />
                    {product.badge && <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded text-sm font-semibold">{product.badge}</span>}
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-2 capitalize">{product.category}</p>
                    <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                      {product.originalPrice && <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>}
                    </div>
                    <div className="flex justify-between items-center">
                      <button type="button" aria-label={`View ${product.name}`} onClick={() => { setSelectedProduct(product); setIsProductModalOpen(true); }} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary">
                        <ShoppingCart size={16} />View Product
                      </button>
                      <button type="button" aria-label={`Add ${product.name} to wishlist`} className="p-2 border-2 border-gray-300 rounded-full hover:border-accent hover:text-accent"><Heart size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              {cart.length === 0 ? (
                <div className="text-center py-12"><ShoppingCart size={60} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">Your cart is empty</p></div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => decreaseQuantity(item.id)} className="p-1 border rounded-full"><Minus size={16} /></button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)} className="p-1 border rounded-full"><Plus size={16} /></button>
                            <button onClick={() => removeFromCart(item.id)} className="p-1 text-accent ml-auto"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold mb-4"><span>Total:</span><span>${totalPrice.toFixed(2)}</span></div>
                    <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold">Proceed to Checkout</button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {isProductModalOpen && selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsProductModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setIsProductModalOpen(false)}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full"><X size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full max-h-64 md:max-h-full object-cover rounded-lg" />
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{selectedProduct.category}</p>
                    <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-primary">${selectedProduct.price.toFixed(2)}</span>
                      {selectedProduct.originalPrice && <span className="text-lg text-gray-400 line-through">${selectedProduct.originalPrice.toFixed(2)}</span>}
                    </div>
                    <div className="flex items-center gap-1 mb-6 text-[#c6a69b]">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < Math.round(selectedProduct.rating || 0)
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">({(selectedProduct.rating || 0).toFixed(1)})</span>
                    </div>
                    {selectedProduct.badge && <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">{selectedProduct.badge}</span>}
                    <p className="text-gray-600 mb-6">{selectedProduct.description || 'Premium quality product from our curated collection. Free shipping on orders over $50.'}</p>
                    {similarProducts.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">You might also like</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {similarProducts.map(p => (
                            <div key={p._id} className="flex flex-col items-center text-center">
                              <img src={p.image} alt={p.name} className="w-full h-20 object-cover rounded-md mb-1" />
                              <span className="text-sm font-medium truncate w-full">{p.name}</span>
                              <span className="text-primary font-semibold text-sm">${p.price.toFixed(2)}</span>
                              <button
                                className="text-xs text-secondary underline mt-1"
                                onClick={() => setSelectedProduct(p)}
                              >View</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProduct.comments && selectedProduct.comments.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
                        <div className="space-y-4 max-h-40 overflow-y-auto">
                          {selectedProduct.comments.map((c, idx) => (
                            <div key={idx} className="border-b pb-2">
                              <div className="flex items-center gap-1 mb-1 text-[#c6a69b]">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    fill={i < c.rating ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                              <p className="text-sm font-semibold">{c.user}</p>
                              <p className="text-sm text-gray-600">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-6 border-t pt-4">
                      <h3 className="text-lg font-semibold mb-3">Leave a review</h3>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={commentUser}
                        onChange={e => setCommentUser(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                      />
                      <textarea
                        placeholder="Write your review"
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                      />
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`cursor-pointer ${i < commentRating ? 'text-[#c6a69b]' : 'text-gray-300'}`}
                            onClick={() => setCommentRating(i + 1)}
                          />
                        ))}
                        <span className="ml-2 text-sm">{commentRating} / 5</span>
                      </div>
                      <button
                        onClick={submitComment}
                        disabled={submittingComment}
                        className="bg-secondary text-white px-4 py-2 rounded disabled:opacity-50"
                      >
                        {submittingComment ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>

                    <motion.button type="button" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary" onClick={() => { addToCart(selectedProduct.id); setIsProductModalOpen(false); }} whileTap={{ scale: 0.98 }}>
                      <ShoppingCart size={20} />Add to Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ShopFooter />
    </div>
  );
}

export default Shop;
