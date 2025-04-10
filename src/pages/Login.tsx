
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/LoginForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Login: React.FC = () => {
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  
  return (
    <AuthLayout
      heading="Log in to your account"
      subheading="Welcome back! Please enter your credentials to continue."
    >
      {showAdminInfo && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Admin Access</AlertTitle>
          <AlertDescription>
            For admin access, use these credentials:
            <br />
            Email: amish0609@gmail.com
            <br />
            Password: Amish0609@2003
          </AlertDescription>
        </Alert>
      )}
      
      <LoginForm />
      
      <div className="text-center mt-6">
        <button 
          onClick={() => setShowAdminInfo(!showAdminInfo)}
          className="text-sm text-muted-foreground hover:underline"
        >
          {showAdminInfo ? 'Hide admin info' : 'Admin login info'}
        </button>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-primary hover:underline mt-2 inline-block"
        >
          Forgot password?
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
