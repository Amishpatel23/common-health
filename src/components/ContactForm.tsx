
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. We will contact you shortly.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or need assistance? Our team is here to help!
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium">Email</h3>
              <p className="mt-1 text-muted-foreground">
                <a
                  href="mailto:support@confetti.com"
                  className="hover:text-primary transition-colors"
                >
                  support@confetti.com
                </a>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                We'll respond within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Phone className="w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium">Phone</h3>
              <p className="mt-1 text-muted-foreground">
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Mon-Fri from 8am to 6pm
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium">Office</h3>
              <p className="mt-1 text-muted-foreground">
                123 Fitness Street<br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your question or issue..."
                required
                className="min-h-[120px]"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full md:w-auto button-transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
