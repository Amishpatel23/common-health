
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import BackButton from '@/components/BackButton';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  children,
  title,
  description,
  showBackButton = true,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar onMenuClick={toggleMobileSidebar} />
      
      <div className="flex-1 pt-16 lg:pl-64">
        {/* Sidebar (desktop-only) */}
        <AdminSidebar />
        {isMobileSidebarOpen && (
          <AdminSidebar isMobile={true} onClose={() => setIsMobileSidebarOpen(false)} />
        )}
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {showBackButton && location.pathname !== '/admin' && (
                <BackButton fallbackPath="/admin" className="mr-2" />
              )}
              <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            </div>
            {description && (
              <p className="text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
