
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import HowItWorksSection from '@/components/HowItWorks';
import TrainerShowcase from '@/components/TrainerShowcase';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Improved page loading with guaranteed visibility
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Add a small delay to ensure DOM is ready before animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Force a reflow to ensure animations trigger properly
      document.body.getBoundingClientRect();
      
      // Additional technique to ensure visibility
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.add('section-visible');
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
    >
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
