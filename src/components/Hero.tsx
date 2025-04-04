
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced animation handling
    const handleAnimation = () => {
      if (!containerRef.current) return;
      
      const animatedElements = containerRef.current.querySelectorAll('[data-animate]');
      
      // Force initial opacity to ensure proper transitions
      animatedElements.forEach((el) => {
        el.classList.add('opacity-0');
      });
      
      // Add animation classes with proper delay sequence
      setTimeout(() => {
        animatedElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animate-fade-in');
          }, index * 150);
        });
      }, 100);
    };

    // Use both intersection observer and direct animation for reliability
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleAnimation();
          // Once triggered, we can disconnect the observer
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      
      // Also trigger animation directly to ensure it happens
      handleAnimation();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative pt-16 overflow-hidden" ref={containerRef}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000 hover:scale-110" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000)',
            transition: 'transform 15s ease-in-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 sm:pt-32 sm:pb-40">
        <div className="max-w-3xl">
          <div 
            className="opacity-0" 
            data-animate 
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs sm:text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
              Online Fitness Coaching Platform
            </span>
          </div>

          <h1 
            className="opacity-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
            data-animate
            style={{ animationDelay: '0.4s' }}
          >
            Connect with Expert Trainers for Online Fitness Coaching
          </h1>

          <p 
            className="opacity-0 text-lg sm:text-xl text-white/90 mb-8 max-w-2xl"
            data-animate
            style={{ animationDelay: '0.6s' }}
          >
            Book personalized sessions with certified trainers anytime, anywhere. 
            Transform your fitness journey with guidance tailored to your goals.
          </p>

          <div 
            className="opacity-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            data-animate
            style={{ animationDelay: '0.8s' }}
          >
            <Button 
              asChild
              size="lg" 
              className={cn(
                "button-transition text-base font-medium",
                "bg-primary hover:bg-primary/90",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              )}
            >
              <Link to="/trainers">
                Find a Trainer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className={cn(
                "button-transition text-base font-medium",
                "bg-white/10 text-white border-white/20 backdrop-blur-sm",
                "hover:bg-white/20 hover:border-white/30",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              )}
            >
              <Link to="/how-it-works">
                How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-24 bg-gradient-to-r from-transparent to-primary/30 blur-3xl opacity-50 rounded-full transform translate-y-1/2 translate-x-1/4" />
      <div className="hidden lg:block absolute top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="hidden lg:block absolute bottom-1/3 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
    </div>
  );
};

export default Hero;
