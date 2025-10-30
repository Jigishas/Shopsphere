import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

function ShopFooter() {
  return (
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
  );
}

export default ShopFooter;
