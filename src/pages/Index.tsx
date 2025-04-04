
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import HowItWorksSection from '@/components/HowItWorks';
import TrainerShowcase from '@/components/TrainerShowcase';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top on page load and ensure content is fully visible
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Ensure page is fully loaded
    setIsLoaded(true);
    
    // Force a reflow to ensure animations trigger properly
    const forceReflow = () => {
      document.body.getBoundingClientRect();
    };
    
    forceReflow();
    
    // Cleanup function
    return () => {
      // Reset any animations if needed
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <main>
        <Hero />
        <HowItWorksSection />
        <TrainerShowcase />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
