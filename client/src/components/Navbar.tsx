import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  totalItems?: number;
  onCartClick?: () => void;
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/deals', label: 'Deals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ totalItems = 0, onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary text-white py-4 sticky top-0 z-50 shadow-lg transition-colors">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover:scale-105 transition-transform">
          <ShoppingBag className="text-accent" />
          <span>ShopSphere</span>
        </Link>
        <nav
          className={`${mobileOpen ? 'block absolute bg-primary/90 dark:bg-secondary/90 top-full left-0 w-full py-4' : 'hidden md:flex'} gap-6 items-center`}
        >
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`py-2 px-3 rounded-md transition-colors ${
                isActive(link.to) ? 'text-accent' : 'hover:text-accent'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 rounded-full bg-white/20 text-white placeholder-white/70 border-none outline-none w-64 focus:ring-2 focus:ring-accent transition-all"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
          </div>
          <ThemeToggle />
          <Link
            to="/signup"
            className="hidden md:flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/80 transition-colors"
          >
            <User size={18} />
            Sign Up
          </Link>
          <button onClick={onCartClick} className="relative" aria-label="Cart">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setMobileOpen(prev => !prev)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
