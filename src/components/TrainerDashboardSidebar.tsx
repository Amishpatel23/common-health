
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calendar, 
  ClipboardList,
  MessageSquare, 
  DollarSign, 
  User,
  ChevronRight,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarLink = ({ icon: Icon, label, href, isActive }: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-foreground/70 hover:bg-secondary hover:text-primary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
    </Link>
  );
};

interface DashboardSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const TrainerDashboardSidebar = ({ isMobile = false, onClose }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const sidebarLinks = [
    { icon: Home, label: "Dashboard", href: "/trainer-dashboard" },
    { icon: Calendar, label: "Manage Availability", href: "/manage-availability" },
    { icon: ClipboardList, label: "My Sessions", href: "/my-sessions" },
    { icon: MessageSquare, label: "Chat", href: "/chat" },
    { icon: DollarSign, label: "Earnings", href: "/earnings" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'T';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <aside className={cn(
      "h-full bg-white dark:bg-black border-r border-border flex-shrink-0",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out" : "w-64 hidden lg:block"
    )}>
      <div className="p-4 space-y-6 h-full flex flex-col">
        <div className="pt-6 pb-1">
          <div className="flex items-center gap-3 mb-4 px-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user?.name || 'Trainer'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || 'trainer@example.com'}</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold px-3">Trainer Menu</h2>
        </div>
        
        <nav className="space-y-1 flex-1">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.href}
              icon={link.icon}
              label={link.label}
              href={link.href}
              isActive={location.pathname === link.href}
            />
          ))}
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 mt-6 rounded-lg transition-colors duration-200 text-foreground/70 hover:bg-secondary hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
        
        <div className="p-4 bg-secondary/40 rounded-lg space-y-2">
          <h3 className="font-medium text-sm">Trainer Support</h3>
          <p className="text-xs text-muted-foreground">Need help with your trainer account or have questions about payments?</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center text-xs text-primary hover:underline"
          >
            <HelpCircle className="mr-1 h-3 w-3" />
            Contact Support
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default TrainerDashboardSidebar;
