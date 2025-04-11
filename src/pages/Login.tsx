
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/LoginForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login: React.FC = () => {
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  
  return (
    <AuthLayout
      heading="Log in to your account"
      subheading="Welcome back! Please enter your credentials to continue."
    >
      {showAdminInfo && (
        <Alert className="mb-6 border-red-200">
          <Shield className="h-4 w-4 text-red-500" />
          <AlertTitle className="text-red-700">Admin Access</AlertTitle>
          <AlertDescription>
            For admin access, use these credentials:
            <br />
            Email: <span className="font-mono bg-gray-100 px-1 rounded">amish0609@gmail.com</span>
            <br />
            Password: <span className="font-mono bg-gray-100 px-1 rounded">Amish0609@2003</span>
          </AlertDescription>
        </Alert>
      )}
      
      <LoginForm />
      
      <div className="text-center mt-6">
        <Button 
          onClick={() => setShowAdminInfo(!showAdminInfo)}
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
        >
          {showAdminInfo ? 'Hide admin info' : 'Admin login info'}
        </Button>
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
