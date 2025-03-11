
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DashboardNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
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

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would clear auth state
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Find a Trainer', path: '/find-trainers' },
    { name: 'My Sessions', path: '/my-sessions' },
    { name: 'Chat', path: '/chat' },
    { name: 'Payments', path: '/payments' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 dark:bg-black/80 backdrop-blur-sm shadow-sm' 
          : 'bg-white dark:bg-black'
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

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 hover-lift"
              onClick={handleLogout}
            >
              <LogOut className="mr-1 h-4 w-4" />
              Logout
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
        <div className="px-4 pt-2 pb-4 bg-white dark:bg-black">
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
            <Button 
              onClick={handleLogout}
              className="mt-4 w-full"
              variant="outline"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
