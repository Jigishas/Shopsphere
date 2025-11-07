import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ShoppingCart, User, Facebook, Twitter, Instagram, MapPin, Phone, Mail, Award, Users, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
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
                <li><Link to="/api/products" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Shop</Link></li>

                <li><Link to="/categories" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Deals</Link></li>
                <li><Link to="/about" className="text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:transition-all">About</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">Contact</Link></li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="pl-4 pr-10 py-2 rounded-full border-none outline-none w-64 focus:ring-2 focus:ring-accent transition-all" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
              <Link to="/signup" className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80 transition-colors">
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

      {/* About Hero */}
      <section className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">About ShopSphere</h1>
            <p className="text-xl mb-8 opacity-90">Your trusted partner in online shopping since 2020</p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-secondary mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">How we started and where we're going</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-secondary">From Vision to Reality</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ShopSphere was born from a simple idea: to create an online shopping experience that combines quality products,
                exceptional customer service, and seamless technology. Founded in 2020, we've grown from a small startup
                to one of the most trusted e-commerce platforms.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our mission is to make shopping accessible, enjoyable, and reliable for everyone. We carefully curate
                our product selection to ensure the highest quality standards, and our dedicated team works tirelessly
                to provide outstanding support to our customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, ShopSphere serves thousands of happy customers worldwide, offering everything from electronics
                and fashion to home goods and sports equipment. We're not just selling products – we're building
                lasting relationships with our community.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Our team"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-secondary mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Quality First</h3>
              <p className="text-gray-600">We never compromise on product quality and ensure every item meets our high standards.</p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Customer Focus</h3>
              <p className="text-gray-600">Our customers are at the heart of everything we do. Your satisfaction is our priority.</p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Fast Delivery</h3>
              <p className="text-gray-600">We ensure quick and reliable delivery so you get your orders when you need them.</p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Trust & Security</h3>
              <p className="text-gray-600">Your data and transactions are always safe with our advanced security measures.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">ShopSphere by Numbers</h2>
            <p className="text-xl opacity-90">Our journey in numbers</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Products</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-lg opacity-90">Average Rating</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Customer Support</div>
            </motion.div>
          </div>
        </div>
      </section>

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
            <p className="text-gray-400">&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
