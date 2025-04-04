
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Improved animation handling
    const handleAnimation = () => {
      if (!containerRef.current) return;
      
      const animatedElements = containerRef.current.querySelectorAll('[data-animate]');
      
      // Set initial state
      animatedElements.forEach(el => {
        el.classList.add('opacity-0');
      });
      
      // Trigger animations
      setTimeout(() => {
        animatedElements.forEach(el => {
          el.classList.add('animate-fade-in');
        });
      }, 100);
    };
    
    // Enhanced intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      
      // Also trigger animation directly for reliability
      handleAnimation();
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-primary to-blue-600 text-white" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        
        {/* Dynamic animations */}
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/30 rounded-full blur-lg opacity-60 animate-pulse" 
          style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-white/20 rounded-full blur-lg opacity-40 animate-pulse" 
          style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div 
          className="opacity-0 max-w-3xl mx-auto"
          data-animate
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Join thousands of members who are achieving their fitness goals with personalized coaching from expert trainers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              asChild
              size="lg" 
              className={cn(
                "button-transition text-base font-medium",
                "bg-white text-primary hover:bg-white/90",
                "border border-transparent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              )}
            >
              <Link to="/signup">
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className={cn(
                "button-transition text-base font-medium",
                "bg-transparent text-white border-white/20",
                "hover:bg-white/10 hover:border-white/30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              )}
            >
              <Link to="/find-trainers">
                Explore Trainers
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
