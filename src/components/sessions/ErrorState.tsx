
import React from 'react';

interface ErrorStateProps {
  errorMessage: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage }) => {
  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center">
      <p className="text-red-600">{errorMessage}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
