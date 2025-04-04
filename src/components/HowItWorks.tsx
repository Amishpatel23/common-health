
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UserPlus, Search, Video, LineChart } from 'lucide-react';

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your profile as a Member or Trainer.',
    icon: UserPlus,
    delay: '0.1s',
  },
  {
    title: 'Find Your Match',
    description: 'Browse trainers or set your availability.',
    icon: Search,
    delay: '0.3s',
  },
  {
    title: 'Book & Join',
    description: 'Schedule and join a live session.',
    icon: Video,
    delay: '0.5s',
  },
  {
    title: 'Track Progress',
    description: 'Monitor your fitness journey and stay motivated.',
    icon: LineChart,
    delay: '0.7s',
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Improved intersection observer with better thresholds
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find all elements with data-animate attribute
            const elements = entry.target.querySelectorAll('[data-animate]');
            
            // Add animation classes with proper delays
            elements.forEach((el) => {
              el.classList.add('animate-slide-up');
              
              // Force a reflow to ensure animations trigger properly
              el.getBoundingClientRect();
            });
          }
        });
      },
      { 
        threshold: [0.1, 0.2, 0.3], // Multiple thresholds for better detection
        rootMargin: '0px 0px -5% 0px' // Adjusted root margin
      }
    );

    // Observe the section container
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      
      // Immediately add visibility classes to fix partial loading
      const elements = sectionRef.current.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        el.classList.add('opacity-0');
      });
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="section-container bg-white py-20" ref={sectionRef}>
      <div className="text-center mb-16">
        <span 
          className="inline-block opacity-0 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4"
          data-animate
        >
          SIMPLE PROCESS
        </span>
        <h2 
          className="opacity-0 text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          data-animate
          style={{ animationDelay: '0.2s' }}
        >
          How It Works
        </h2>
        <p 
          className="opacity-0 max-w-2xl mx-auto text-muted-foreground text-lg"
          data-animate
          style={{ animationDelay: '0.3s' }}
        >
          Get started with Confetti in just a few simple steps and transform your fitness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
        {steps.map((step, index) => (
          <div 
            key={step.title}
            className="opacity-0 relative flex flex-col items-center text-center px-6 py-8 rounded-2xl transition-all duration-300 hover:shadow-md"
            data-animate
            style={{ animationDelay: step.delay }}
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-70 scale-75" />
              <div className="relative flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-2">
                <step.icon className="w-7 h-7" />
              </div>
              <div className="absolute top-7 left-full h-0.5 w-8 bg-primary/20 hidden lg:block">
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
            <div className="absolute top-0 left-0 w-full h-full rounded-2xl border border-transparent hover:border-primary/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
