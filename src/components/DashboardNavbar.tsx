
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BackButton from './BackButton';

interface DashboardNavbarProps {
  onMenuClick?: () => void;
  showBackButton?: boolean;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ 
  onMenuClick,
  showBackButton = true, 
}) => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Session Reminder',
      message: 'You have a session in 1 hour.',
      time: '10 min ago',
      read: false,
    },
    {
      id: '2',
      title: 'New Message',
      message: 'You have a new message from Sarah.',
      time: '1 hour ago',
      read: true,
    },
    {
      id: '3',
      title: 'Payment Success',
      message: 'Your payment was successful.',
      time: 'Yesterday',
      read: true,
    },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({ description: 'All notifications marked as read' });
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };
  
  // Determine if we should show the back button on this page
  const shouldShowBackButton = () => {
    if (!showBackButton) return false;
    
    // Don't show on main dashboards
    if (location.pathname === '/dashboard' || 
        location.pathname === '/trainer-dashboard' ||
        location.pathname === '/admin') {
      return false;
    }
    
    return true;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-white dark:bg-black z-30">
      <div className="h-full flex items-center px-4 justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          {shouldShowBackButton() && (
            <BackButton className="ml-2" />
          )}
          
          <div className="hidden lg:flex items-center space-x-1 ml-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Search..." 
                className="pl-8 h-9 rounded-md border border-input bg-white dark:bg-black focus-visible:ring-1 focus-visible:ring-ring text-sm w-[180px] lg:w-[240px]" 
              />
            </form>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-[1.2rem] w-[1.2rem]" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-xs text-primary" 
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className="p-3 cursor-pointer"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex">
                      <div className={`mr-3 h-2 w-2 mt-1 rounded-full ${notification.read ? 'invisible' : 'bg-primary'}`} />
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/notifications" className="w-full text-center text-sm text-primary">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 rounded-full" size="sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
