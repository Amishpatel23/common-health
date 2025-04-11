
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import TrainerShowcase from '../components/TrainerShowcase';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import SessionStartNotification from '@/components/SessionStartNotification';

const Index = () => {
  const [showSessionNotification, setShowSessionNotification] = useState(false);
  
  // Function to demonstrate the session notification
  const handleDemoNotification = () => {
    setShowSessionNotification(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <TrainerShowcase />
      <Testimonials />
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Try Our Session Notification</h2>
        <p className="mb-6 text-muted-foreground">Click the button below to see the session notification demo</p>
        <Button onClick={handleDemoNotification} className="bg-green-600 hover:bg-green-700">
          Demo Session Notification
        </Button>
      </div>
      <CTABanner />
      <Footer />
      
      <SessionStartNotification
        isOpen={showSessionNotification}
        onOpenChange={setShowSessionNotification}
        sessionId="demo-session-123"
      />
    </div>
  );
};

export default Index;
