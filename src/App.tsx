
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import TrainerDashboardNavbar from "./components/TrainerDashboardNavbar";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import AdminPanel from "./pages/AdminPanel";
import Chat from "./pages/Chat";
import FindTrainers from "./pages/FindTrainers";
import TrainerProfile from "./pages/TrainerProfile";
import BookSession from "./pages/BookSession";
import VideoSession from "./pages/VideoSession";
import NotFound from "./pages/NotFound";
import MemberProfile from "./pages/MemberProfile";
import FavoriteTrainers from "./pages/FavoriteTrainers";
import PaymentHistory from "./pages/PaymentHistory";
import TrainerEarnings from "./pages/TrainerEarnings";
import ManageAvailability from "./pages/ManageAvailability";
import { useAuth } from "./contexts/AuthContext";

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Redirect to appropriate dashboard based on role
  if (user && user.role === 'member') {
    return <Navigate to="/dashboard" replace />;
  } else if (user && user.role === 'trainer') {
    return <Navigate to="/trainer-dashboard" replace />;
  } else if (user && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
};

// Auth-aware Layout component that handles the navbar logic
const AppLayout = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const isAuthRoute = location.pathname === '/login' || 
                      location.pathname === '/signup' || 
                      location.pathname === '/forgot-password' || 
                      location.pathname.includes('/reset-password');
  const isVideoSessionRoute = location.pathname.includes('/video-session');
  const isTrainerRoute = 
    location.pathname.includes('/trainer-dashboard') || 
    location.pathname.includes('/manage-availability') ||
    location.pathname.includes('/earnings');
  const isDashboardRoute = 
    location.pathname.includes('/dashboard') || 
    isTrainerRoute ||
    location.pathname.includes('/admin') ||
    location.pathname.includes('/chat') ||
    location.pathname.includes('/find-trainers') ||
    location.pathname.includes('/trainer-profile') ||
    location.pathname.includes('/book-session') ||
    location.pathname.includes('/my-sessions') ||
    location.pathname.includes('/profile') ||
    location.pathname.includes('/favorites') ||
    location.pathname.includes('/payments');
  
  // Don't show any navbar on auth routes or video session routes
  if (isAuthRoute || isVideoSessionRoute) {
    return null;
  }
  
  // Show trainer dashboard navbar for trainer routes
  if (isTrainerRoute && isAuthenticated && user?.role === 'trainer') {
    return <TrainerDashboardNavbar />;
  }
  
  // Show dashboard navbar on dashboard routes when authenticated
  if (isDashboardRoute && isAuthenticated) {
    return <DashboardNavbar />;
  }
  
  // Show regular navbar on other routes
  return <Navbar />;
};

// Main app component with routes
const AppRoutes = () => {
  return (
    <>
      <AppLayout />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* Member routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['member']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['member', 'trainer']}>
            <MemberProfile />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute allowedRoles={['member']}>
            <FavoriteTrainers />
          </ProtectedRoute>
        } />
        <Route path="/find-trainers" element={
          <ProtectedRoute allowedRoles={['member']}>
            <FindTrainers />
          </ProtectedRoute>
        } />
        <Route path="/trainers" element={
          <ProtectedRoute allowedRoles={['member']}>
            <FindTrainers />
          </ProtectedRoute>
        } />
        <Route path="/trainer-profile/:trainerId" element={
          <ProtectedRoute allowedRoles={['member']}>
            <TrainerProfile />
          </ProtectedRoute>
        } />
        <Route path="/book-session/:trainerId" element={
          <ProtectedRoute allowedRoles={['member']}>
            <BookSession />
          </ProtectedRoute>
        } />
        <Route path="/payments" element={
          <ProtectedRoute allowedRoles={['member', 'trainer']}>
            <PaymentHistory />
          </ProtectedRoute>
        } />
        
        {/* Trainer routes */}
        <Route path="/trainer-dashboard" element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <TrainerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/earnings" element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <TrainerEarnings />
          </ProtectedRoute>
        } />
        <Route path="/manage-availability" element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <ManageAvailability />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        } />
        
        {/* Shared routes */}
        <Route path="/chat" element={
          <ProtectedRoute allowedRoles={['member', 'trainer']}>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/video-session/:sessionId" element={
          <ProtectedRoute allowedRoles={['member', 'trainer']}>
            <VideoSession />
          </ProtectedRoute>
        } />
        <Route path="/video-session" element={
          <ProtectedRoute allowedRoles={['member', 'trainer']}>
            <VideoSession />
          </ProtectedRoute>
        } />
        <Route path="/my-sessions" element={
          <ProtectedRoute allowedRoles={['member', 'trainer']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </>
  );
};

// Root app component with all providers
const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
