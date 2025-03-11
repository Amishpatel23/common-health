
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'glass-effect bg-white/90 dark:bg-black/80 shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center hover-lift"
            aria-label="Confetti Home"
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
              confetti
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'relative px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:text-primary hover:bg-secondary',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Login button (always visible) */}
          <div className="hidden md:block">
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="ml-4 hover-lift"
            >
              <Link to="/login">
                Login
              </Link>
            </Button>
            <Button 
              asChild 
              variant="default" 
              size="sm" 
              className="ml-2 hover-lift"
            >
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen 
            ? 'max-h-[400px] border-b border-border' 
            : 'max-h-0 border-b-0'
        )}
      >
        <div className="px-4 pt-2 pb-4 glass-effect">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                  'hover:text-primary hover:bg-secondary',
                  location.pathname === link.path 
                    ? 'text-primary bg-secondary/50' 
                    : 'text-foreground/80'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 flex space-x-3">
              <Button asChild variant="outline" className="w-full" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="w-full" size="sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
