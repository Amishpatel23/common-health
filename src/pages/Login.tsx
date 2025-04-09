import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Enhanced redirection logic
  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'trainer') {
        navigate('/trainer-dashboard');
      } else if (user.role === 'member') {
        navigate('/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Handle login - this should update isAuthenticated and user in AuthContext
      await login(formData.email, formData.password);
      
      // Toast will be shown in login function
      // Redirection is handled by useEffect
      
    } catch (error) {
      // Error handling is in login function
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout 
      heading="Welcome back" 
      subheading="Continue your fitness journey"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="email"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="current-password"
              className="h-11 pr-10"
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="rememberMe" 
            checked={formData.rememberMe}
            onCheckedChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <label 
            htmlFor="rememberMe" 
            className="text-sm text-muted-foreground font-medium cursor-pointer"
          >
            Remember me for 30 days
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-11 bg-red-600 hover:bg-red-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>

        {/* Demo credentials for testing */}
        <div className="text-sm text-center text-muted-foreground">
          <p className="mb-1 font-medium">Demo Credentials:</p>
          <p>Member: member@example.com / password</p>
          <p>Trainer: trainer@example.com / password</p>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account yet?{' '}
          <Link 
            to="/signup" 
            className="font-medium text-red-600 hover:text-red-500 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
