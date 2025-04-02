
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'trainer' | 'admin';
  avatar?: string;
  membershipDetails?: {
    plan: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'pending';
  };
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { firstName: string, email: string, password: string, role: 'member' | 'trainer' }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API call - in a real app, this would hit your backend
const mockApiCall = async (endpoint: string, data: any): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (endpoint === '/api/auth/login') {
    // Mock login check
    if (data.email === 'member@example.com' && data.password === 'password') {
      return {
        user: {
          id: '123',
          name: 'Sarah Wilson',
          email: 'member@example.com',
          role: 'member',
          avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
          membershipDetails: {
            plan: 'Premium',
            startDate: '2023-01-15',
            endDate: '2024-01-15',
            status: 'active',
          },
        },
        token: 'mock-jwt-token',
      };
    } else if (data.email === 'trainer@example.com' && data.password === 'password') {
      return {
        user: {
          id: '456',
          name: 'Alex Johnson',
          email: 'trainer@example.com',
          role: 'trainer',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  }
  
  if (endpoint === '/api/auth/signup') {
    // Mock successful signup
    return {
      user: {
        id: '789',
        name: data.firstName,
        email: data.email,
        role: data.role,
        membershipDetails: {
          plan: 'Basic',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'active',
        },
      },
      token: 'mock-jwt-token',
    };
  }
  
  return null;
};

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          // In a real app, validate token with backend
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Auth error:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mockApiCall('/api/auth/login', { email, password });
      
      // Save token and user to localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Update state
      setUser(response.user);
      
      // Show success message
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      
      // Redirect based on role
      if (response.user.role === 'trainer') {
        navigate('/trainer-dashboard');
      } else if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      toast({
        title: "Login failed",
        description: err.message || 'Invalid email or password',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Signup function
  const signup = async (userData: { firstName: string, email: string, password: string, role: 'member' | 'trainer' }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mockApiCall('/api/auth/signup', userData);
      
      // Save token and user to localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Update state
      setUser(response.user);
      
      // Show success message
      toast({
        title: "Signup successful",
        description: `Welcome, ${response.user.name}!`,
      });
      
      // Redirect based on role
      if (response.user.role === 'trainer') {
        navigate('/trainer-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to signup');
      toast({
        title: "Signup failed",
        description: err.message || 'There was an error creating your account',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      description: "You have been logged out",
    });
    navigate('/login');
  };
  
  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
