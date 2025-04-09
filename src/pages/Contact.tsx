
import React, { useEffect } from 'react';
// Remove Navbar import since it's handled in App.tsx
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Removed Navbar since it's handled by AppLayout in App.tsx */}
      <main>
        {/* Page header */}
        <section className="pt-20 pb-16 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Contact Us
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Have questions or need assistance? Our team is ready to help you with anything related to your fitness journey.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-secondary/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
              {"https://maps.app.goo.gl/biEKp1tpZbx1sEx57"}
              <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                <p className="text-muted-foreground text-lg">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
