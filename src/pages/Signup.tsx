
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [userType, setUserType] = useState('member');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleUserTypeChange = (value: string) => {
    if (value) setUserType(value);
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "Please agree to the terms and privacy policy.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Use the AuthContext signup function
      await signup({
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
        role: userType as 'member' | 'trainer'
      });
      
      // Show success state instead of redirecting immediately
      setSignupSuccess(true);
      
      toast({
        title: "Account Created Successfully",
        description: "Your account has been created. Please login to continue.",
      });
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  // If signup was successful, show confirmation screen
  if (signupSuccess) {
    return (
      <AuthLayout 
        heading="Account Created!" 
        subheading="You can now log in to your account"
      >
        <div className="text-center p-6 space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium">Registration Successful!</h3>
          <p className="text-muted-foreground">
            Your account has been created successfully. Redirecting you to login page...
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full h-11 mt-4"
          >
            Go to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      heading="Create your account" 
      subheading="start your fitness journey today"
    >
      {/* User type toggle */}
      <div className="mb-6">
        <ToggleGroup 
          type="single" 
          value={userType}
          onValueChange={handleUserTypeChange}
          className="w-full border rounded-md overflow-hidden"
        >
          <ToggleGroupItem 
            value="member" 
            className="flex-1 py-3 data-[state=on]:bg-red-600 data-[state=on]:text-white"
          >
            MEMBER
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="trainer" 
            className="flex-1 py-3 data-[state=on]:bg-red-600 data-[state=on]:text-white"
          >
            TRAINER
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Form fields */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              className="h-11"
            />
          </div>
        </div>
        
        {/* Email Field */}
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
            className="h-11"
          />
        </div>
        
        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
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
        
        {/* Terms Agreement */}
        <div className="flex items-start space-x-2 mt-4">
          <Checkbox 
            id="agreeTerms" 
            checked={formData.agreeTerms}
            onCheckedChange={handleCheckboxChange}
            disabled={isLoading}
            className="mt-1"
          />
          <label 
            htmlFor="agreeTerms" 
            className="text-sm text-muted-foreground"
          >
            I agree to the <Link to="/terms-of-service" className="text-red-600 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-red-600 hover:underline">Privacy Policy</Link>
          </label>
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 bg-red-600 hover:bg-red-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-red-600 hover:text-red-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
