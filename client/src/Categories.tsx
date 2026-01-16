import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ShoppingCart, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Discover the latest gadgets, smartphones, laptops, and tech accessories with cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Stay trendy with our collection of clothing, shoes, accessories, and jewelry for every occasion.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Transform your living spaces with furniture, decor, kitchenware, and outdoor essentials.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80"
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    description: "Gear up for your active lifestyle with equipment, apparel, and accessories for all sports.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    name: "Beauty & Health",
    description: "Pamper yourself with premium skincare, makeup, fragrances, and wellness products.",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
  },
  {
    id: 6,
    name: "Toys & Games",
    description: "Find the perfect toys, games, and educational products for children of all ages.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

function Categories() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform">
              <button className="md:hidden mr-3" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                <li><Link to="/categories" className="text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:transition-all">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Deals</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">About</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Contact</Link></li>
              </ul>
            </nav>
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-primary text-white py-4 z-50`}>
              <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4">
                  <Link to="/" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                  <Link to="/api/products" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                  <Link to="/categories" className="text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
                  <Link to="/deals" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
                  <Link to="/about" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                  <Link to="/contact" className="hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
              <div className="relative cursor-pointer hover:scale-110 transition-transform">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Hero */}
      <section className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">Product Categories</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">Explore our wide range of product categories</p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-secondary">{category.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                  <Link
                    to="/api/products"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group"
                  >
                    Explore {category.name}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
