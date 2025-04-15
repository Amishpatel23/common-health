
import React from 'react';
import BackButton from '@/components/BackButton';
import DashboardLayout from '@/components/DashboardLayout';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );
};

export default LoadingState;
