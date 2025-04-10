
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import BackButton from '@/components/BackButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  description,
  showBackButton = true,
  actions,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar 
        onMenuClick={toggleMobileSidebar} 
        showBackButton={showBackButton}
      />
      
      <div className="flex-1 pt-16 lg:pl-64">
        {/* Sidebar (desktop-only) */}
        <DashboardSidebar />
        {isMobileSidebarOpen && (
          <DashboardSidebar isMobile={true} onClose={() => setIsMobileSidebarOpen(false)} />
        )}
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                {showBackButton && location.pathname !== '/dashboard' && (
                  <BackButton fallbackPath="/dashboard" className="mr-2" />
                )}
                <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
              </div>
              {description && (
                <p className="text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
