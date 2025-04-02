
import React, { useEffect, useState } from 'react';
// Remove the Navbar import since we're handling it in App.tsx
// import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import TrainerShowcase from '@/components/TrainerShowcase';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add page loaded animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Remove the Navbar from here */}
      <main>
        <Hero />
        <HowItWorks />
        <TrainerShowcase />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
