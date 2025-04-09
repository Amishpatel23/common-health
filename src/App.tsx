
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
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

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Auth-aware Layout component that handles the navbar logic
const AppLayout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || 
                      location.pathname === '/signup' || 
                      location.pathname === '/forgot-password' || 
                      location.pathname.includes('/reset-password');
  const isVideoSessionRoute = location.pathname.includes('/video-session');
  const isDashboardRoute = 
    location.pathname.includes('/dashboard') || 
    location.pathname.includes('/trainer-dashboard') || 
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
  
  // Show dashboard navbar on dashboard routes
  if (isDashboardRoute) {
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
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/find-trainers" element={<FindTrainers />} />
        <Route path="/trainers" element={<FindTrainers />} />
        <Route path="/trainer-profile/:trainerId" element={<TrainerProfile />} />
        <Route path="/book-session/:trainerId" element={<BookSession />} />
        <Route path="/video-session/:sessionId" element={<VideoSession />} />
        <Route path="/video-session" element={<VideoSession />} /> {/* Added for incoming calls simulation */}
        <Route path="/my-sessions" element={<Dashboard />} />
        <Route path="/profile" element={<MemberProfile />} />
        <Route path="/favorites" element={<FavoriteTrainers />} />
        <Route path="/payments" element={<PaymentHistory />} />
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
