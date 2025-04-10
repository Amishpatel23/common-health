
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  CalendarClock,
  CreditCard, 
  User,
  ChevronRight,
  LogOut,
  Settings,
  ShieldAlert,
  MessageSquare,
  Bell,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import BackButton from './BackButton';

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

interface AdminSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isMobile = false, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const sidebarLinks = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "User Management", href: "/admin/users" },
    { icon: CalendarClock, label: "Sessions", href: "/admin/sessions" },
    { icon: CreditCard, label: "Payments", href: "/admin/payments" },
    { icon: MessageSquare, label: "Chat Moderation", href: "/admin/chats" },
    { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    { icon: AlertCircle, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const getInitials = () => {
    if (!user?.name) return 'A';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <aside className={cn(
      "h-full bg-white dark:bg-black border-r border-border flex-shrink-0",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out" : "w-64 hidden lg:block"
    )}>
      <div className="p-4 space-y-6 h-full flex flex-col">
        {isMobile && (
          <div className="flex justify-between items-center">
            <BackButton fallbackPath="/admin" />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="lg:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        )}
        
        <div className="pt-6 pb-1">
          <div className="flex items-center gap-3 mb-4 px-3">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarImage src={user?.avatar} alt={user?.name || 'Admin'} />
              <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
          <div className="px-3 mb-2">
            <div className="w-full h-2 bg-red-400/20 rounded-full overflow-hidden">
              <div className="h-full bg-red-500/70 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Admin Access
            </p>
          </div>
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
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 text-foreground/70 hover:bg-secondary hover:text-red-500 w-full text-left mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
        
        <div className="p-4 bg-red-500/10 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-500" />
            <h3 className="font-medium text-sm">Admin Panel</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            You have full control over the platform. Use your privileges responsibly.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
