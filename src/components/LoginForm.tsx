import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
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
      setIsLoading(true);
      
      // Check if admin login
      if (formData.email === 'amish0609@gmail.com' && formData.password === 'Amish0609@2003') {
        await login(formData.email, formData.password);
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate('/admin');
        return;
      }
      
      // Regular user login simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate login (this would be replaced by actual authentication)
      await login(formData.email, formData.password);
      
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-border">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Welcome back</h2>
        <p className="text-muted-foreground">
          Enter your details to access your account
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-primary hover:text-primary/90 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full"
            disabled={isLoading}
          />
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
            className="text-sm text-muted-foreground font-medium"
          >
            Remember me for 30 days
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full button-transition"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-medium text-primary hover:text-primary/90 hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
