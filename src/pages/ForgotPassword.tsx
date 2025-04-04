
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Check } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API endpoint to send a reset email
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        description: "Password reset instructions sent to your email",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            Reset Your<br />Password.
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
              {isSuccess ? "Check your email" : "Forgot your password?"}
            </h2>
            <p className="text-muted-foreground">
              {isSuccess 
                ? "We've sent you instructions to reset your password" 
                : "Enter your email and we'll send you a link to reset it"}
            </p>
          </div>
          
          {isSuccess ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="text-green-600" size={24} />
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                If we find an account associated with {email}, you'll receive an email with a link to reset your password within a few minutes.
              </p>
              <Button asChild className="w-full">
                <Link to="/login">Return to login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send reset instructions'}
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

export default ForgotPassword;
