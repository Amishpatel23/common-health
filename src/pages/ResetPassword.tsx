
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "All fields are required",
        description: "Please enter and confirm your new password",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API endpoint with the token and new password
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        description: "Your password has been reset successfully",
      });
      
      // In a real app, we'd redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or request a new reset link",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // In a real app, we would validate the token here
  const isValidToken = token && token.length > 10;

  return (
    <div className="flex min-h-screen">
      {/* Left side - Background image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img 
          src="/lovable-uploads/3fc20d41-a17d-421a-af0f-f8f0168454ae.png" 
          alt="Fitness motivation" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Create Your<br />New Password.
          </h1>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and heading */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {isSuccess ? "Password reset successfully" : "Reset your password"}
            </h2>
            <p className="text-muted-foreground">
              {isSuccess 
                ? "You can now log in with your new password" 
                : "Please create a new, strong password for your account"}
            </p>
          </div>
          
          {!isValidToken ? (
            <div className="text-center">
              <p className="mb-6 text-sm text-muted-foreground">
                Invalid or expired reset link. Please request a new password reset link.
              </p>
              <Button asChild className="w-full">
                <Link to="/forgot-password">Request new link</Link>
              </Button>
            </div>
          ) : isSuccess ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="text-green-600" size={24} />
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                Your password has been reset successfully. You will be redirected to the login page.
              </p>
              <Button asChild className="w-full">
                <Link to="/login">Go to login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">New Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10"
                    disabled={isLoading}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>
              
              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset password'}
              </Button>
              
              <div className="text-center mt-4">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  <ArrowLeft className="mr-1" size={16} />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
