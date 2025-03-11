
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jessica Parker',
    role: 'Lost 15kg in 6 months',
    quote: 'Working with trainers on Confetti completely transformed my approach to fitness. The personalized attention and flexible scheduling made all the difference.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200&fit=crop',
    delay: '0.1s',
  },
  {
    id: 2,
    name: 'Marcus Williams',
    role: 'Marathon Runner',
    quote: 'The specialized coaching I received through Confetti helped me improve my marathon time by 20 minutes. The virtual sessions were convenient and incredibly effective.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200&fit=crop',
    delay: '0.3s',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'Yoga Enthusiast',
    quote: 'Finding the right yoga instructor used to be so difficult until I discovered Confetti. Now I can practice with expert guidance from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200&h=200&fit=crop',
    delay: '0.5s',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="section-container py-20 bg-white" ref={sectionRef}>
      <div className="text-center mb-16">
        <span 
          className="inline-block opacity-0 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4"
          data-animate
        >
          SUCCESS STORIES
        </span>
        <h2 
          className="opacity-0 text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          data-animate
          style={{ animationDelay: '0.2s' }}
        >
          What Our Members Say
        </h2>
        <p 
          className="opacity-0 max-w-2xl mx-auto text-muted-foreground text-lg"
          data-animate
          style={{ animationDelay: '0.3s' }}
        >
          Real results and experiences from people just like you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="opacity-0 bg-secondary/30 rounded-2xl p-8 relative hover:shadow-md transition-all duration-300"
            data-animate
            style={{ animationDelay: testimonial.delay }}
          >
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
            
            <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
            
            <div className="flex items-center">
              <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-t-full transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
