
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample trainer data
const trainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Yoga & Pilates',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Michael Chen',
    specialty: 'Strength Training',
    rating: 4.8,
    reviews: 93,
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    specialty: 'HIIT & Cardio',
    rating: 4.7,
    reviews: 108,
    image: 'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?auto=format&fit=crop&q=80&w=300&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Daniel Wilson',
    specialty: 'Nutrition & Wellness',
    rating: 4.9,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Olivia Taylor',
    specialty: 'Dance Fitness',
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'James Lee',
    specialty: 'Martial Arts',
    rating: 4.9,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300&fit=crop',
  },
];

const TrainerShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = { base: 1, sm: 2, md: 3 };
  const [itemsToShow, setItemsToShow] = useState(1);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(itemsPerPage.md);
      } else if (window.innerWidth >= 640) {
        setItemsToShow(itemsPerPage.sm);
      } else {
        setItemsToShow(itemsPerPage.base);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const maxIndex = trainers.length - itemsToShow;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // Update carousel position when index changes
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * (carouselRef.current.scrollWidth / trainers.length);
      carouselRef.current.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }, [currentIndex, itemsToShow]);

  return (
    <section className="bg-secondary/50 py-20" ref={containerRef}>
      <div className="section-container">
        <div className="text-center mb-12">
          <span 
            className="inline-block opacity-0 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4"
            data-animate
          >
            EXPERT TRAINERS
          </span>
          <h2 
            className="opacity-0 text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            data-animate
            style={{ animationDelay: '0.2s' }}
          >
            Meet Our Top Trainers
          </h2>
          <p 
            className="opacity-0 max-w-2xl mx-auto text-muted-foreground text-lg"
            data-animate
            style={{ animationDelay: '0.3s' }}
          >
            Work with certified fitness professionals specialized in various disciplines.
          </p>
        </div>

        <div className="relative px-4 md:px-10">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 w-full flex justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full bg-white/80 shadow-md backdrop-blur-sm pointer-events-auto text-foreground hover:text-primary hover:bg-white",
                "border border-border opacity-0 transition-opacity transform -translate-x-4",
                currentIndex > 0 ? "opacity-100 translate-x-0" : ""
              )}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous trainer"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full bg-white/80 shadow-md backdrop-blur-sm pointer-events-auto text-foreground hover:text-primary hover:bg-white",
                "border border-border opacity-0 transition-opacity transform translate-x-4",
                currentIndex < maxIndex ? "opacity-100 translate-x-0" : ""
              )}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next trainer"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ gap: '24px' }}
            >
              {trainers.map((trainer, idx) => (
                <div 
                  key={trainer.id}
                  className={cn(
                    "opacity-0 flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]",
                    "bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300",
                    "hover:shadow-lg hover:-translate-y-1"
                  )}
                  data-animate
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{trainer.name}</h3>
                    <p className="text-muted-foreground mb-3">{trainer.specialty}</p>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-4 h-4 fill-current", 
                              i < Math.floor(trainer.rating) ? "text-yellow-400" : "text-gray-300",
                              i === Math.floor(trainer.rating) && trainer.rating % 1 > 0 ? "text-yellow-400" : ""
                            )}
                            fill={i < Math.floor(trainer.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{trainer.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
                    </div>
                    <Button 
                      className="w-full button-transition"
                      variant="outline"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="default" 
            size="lg"
            className="button-transition"
          >
            View All Trainers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainerShowcase;
