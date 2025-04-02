
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import AdminPanel from "./pages/AdminPanel";
import Chat from "./pages/Chat";
import FindTrainers from "./pages/FindTrainers";
import TrainerProfile from "./pages/TrainerProfile";
import BookSession from "./pages/BookSession";
import VideoSession from "./pages/VideoSession";
import NotFound from "./pages/NotFound";

// Create a new query client instance
const queryClient = new QueryClient();

// Create a layout component to handle the navbar logic
const AppLayout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  const isVideoSessionRoute = location.pathname.includes('/video-session');
  const isDashboardRoute = 
    location.pathname.includes('/dashboard') || 
    location.pathname.includes('/trainer-dashboard') || 
    location.pathname.includes('/admin') ||
    location.pathname.includes('/chat') ||
    location.pathname.includes('/find-trainers') ||
    location.pathname.includes('/trainer-profile') ||
    location.pathname.includes('/book-session') ||
    location.pathname.includes('/my-sessions');
  
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
      <Routes>
        <Route path="/" element={<><AppLayout /><Index /></>} />
        <Route path="/how-it-works" element={<><AppLayout /><HowItWorks /></>} />
        <Route path="/contact" element={<><AppLayout /><Contact /></>} />
        <Route path="/login" element={<><AppLayout /><Login /></>} />
        <Route path="/signup" element={<><AppLayout /><Signup /></>} />
        <Route path="/dashboard" element={<><AppLayout /><Dashboard /></>} />
        <Route path="/trainer-dashboard" element={<><AppLayout /><TrainerDashboard /></>} />
        <Route path="/admin" element={<><AppLayout /><AdminPanel /></>} />
        <Route path="/chat" element={<><AppLayout /><Chat /></>} />
        <Route path="/find-trainers" element={<><AppLayout /><FindTrainers /></>} />
        <Route path="/trainers" element={<><AppLayout /><FindTrainers /></>} />
        <Route path="/trainer-profile/:trainerId" element={<><AppLayout /><TrainerProfile /></>} />
        <Route path="/book-session/:trainerId" element={<><AppLayout /><BookSession /></>} />
        <Route path="/video-session/:sessionId" element={<><AppLayout /><VideoSession /></>} />
        <Route path="/my-sessions" element={<><AppLayout /><Dashboard /></>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<><AppLayout /><NotFound /></>} />
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
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
