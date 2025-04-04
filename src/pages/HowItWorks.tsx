import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import CTABanner from '@/components/CTABanner';
import HowItWorksSection from '@/components/HowItWorks';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "For Members",
      description: "Find the perfect trainer for your fitness goals and schedule sessions that fit your lifestyle.",
      benefits: [
        "Access to certified trainers worldwide",
        "Flexible scheduling for your convenience",
        "Personalized workout and nutrition plans",
        "Track progress and stay motivated",
        "Join sessions from anywhere",
      ],
      cta: {
        text: "Sign Up as a Member",
        link: "/signup?type=member"
      }
    },
    {
      title: "For Trainers",
      description: "Grow your client base and run your fitness business entirely online with our comprehensive platform.",
      benefits: [
        "Showcase your expertise and certifications",
        "Set your own rates and availability",
        "Access a global client base",
        "Manage all clients through a single dashboard",
        "Get paid securely and on time",
      ],
      cta: {
        text: "Join as a Trainer",
        link: "/signup?type=trainer"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
              PLATFORM GUIDE
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              How Confetti Works
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
              Our platform connects fitness enthusiasts with expert trainers for personalized online coaching. 
              Here's everything you need to know to get started.
            </p>
          </div>
        </section>

        {/* Process Section */}
        <div className="bg-white">
          <HowItWorksSection />
        </div>

        {/* Feature Comparison */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                FIND YOUR FIT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Tailored For Everyone
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                Whether you're looking to get fit or share your expertise, Confetti has the tools you need to succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className="ml-3">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="w-full button-transition">
                    <Link to={feature.cta.link}>
                      {feature.cta.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                GOT QUESTIONS?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Find answers to common questions about Confetti.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: "How do I choose the right trainer?",
                  a: "Browse trainer profiles based on your fitness goals, read reviews from other members, and even book an initial consultation to find the perfect match for your needs."
                },
                {
                  q: "What equipment do I need?",
                  a: "This depends on your trainer and workout type. Many sessions require minimal equipment, but your trainer will specify what you need before each session."
                },
                {
                  q: "How are the sessions conducted?",
                  a: "Sessions take place through our secure video platform. You'll receive a link to join at your scheduled time, allowing for real-time interaction with your trainer."
                },
                {
                  q: "What if I need to cancel a session?",
                  a: "Our platform allows for cancellations up to 24 hours before your scheduled session without any penalty. Late cancellations may be subject to the trainer's policy."
                },
                {
                  q: "How do payments work?",
                  a: "We handle all payments securely through our platform. You can purchase single sessions or subscription packages, and trainers receive payment after sessions are completed."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <p className="text-muted-foreground mb-4">
                Still have questions? We're here to help.
              </p>
              <Button asChild variant="outline" className="button-transition">
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
