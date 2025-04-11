
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, Bell, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface TrainerDashboardNavbarProps {
  onMenuClick?: () => void;
}

const TrainerDashboardNavbar = ({ onMenuClick }: TrainerDashboardNavbarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'T';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleStatusToggle = (checked: boolean) => {
    setIsOnline(checked);
    toast({
      description: checked 
        ? "You're now online and visible to members" 
        : "You're now offline and not accepting new sessions",
    });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-white/90 dark:bg-black/80 backdrop-blur-sm shadow-sm h-16 lg:pl-64'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Mobile menu button */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary transition-colors"
              onClick={onMenuClick}
              aria-expanded="false"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link 
              to="/" 
              className="flex items-center ml-2 lg:ml-0 hover-lift"
              aria-label="Confetti Home"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                confetti
              </span>
            </Link>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center">
                {isOnline ? 
                  <Wifi className="h-4 w-4 text-green-500 mr-2" /> : 
                  <WifiOff className="h-4 w-4 text-gray-400 mr-2" />
                }
                <span className="text-sm font-medium mr-2">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Switch 
                  checked={isOnline}
                  onCheckedChange={handleStatusToggle}
                  aria-label="Online status toggle"
                />
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TrainerDashboardNavbar;
