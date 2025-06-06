
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  fallbackPath?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = '', 
  fallbackPath = '/', 
  label = 'Back'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleGoBack = () => {
    // If there's history to go back to, use that
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // Otherwise use the appropriate fallback path
      navigate(getFallbackPath());
    }
  };
  
  // Determine the appropriate fallback path based on user role or current location
  const getFallbackPath = () => {
    // Check if in admin area
    if (location.pathname.includes('/admin')) {
      return '/admin';
    }
    // Check if in my-sessions area
    else if (location.pathname.includes('/my-sessions')) {
      return '/dashboard';
    }
    // Check if in trainer area
    else if (location.pathname.includes('/trainer-dashboard')) {
      return '/trainer-dashboard';
    }
    // Check if in payments area
    else if (location.pathname.includes('/payments')) {
      return '/dashboard';
    }
    // Default to member dashboard
    else {
      return fallbackPath || '/dashboard';
    }
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`flex items-center gap-1 ${className}`}
      onClick={handleGoBack}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
