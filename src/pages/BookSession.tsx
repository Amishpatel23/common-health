
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  DollarSign, 
  CheckCircle,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

// Mock trainer data
const mockTrainers = {
  '1': {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialties: ['HIIT Training', 'Weight Loss'],
    location: 'New York, NY',
    hourlyRate: 45,
    availability_slots: [
      { day: 'Monday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Tuesday', slots: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'Wednesday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Thursday', slots: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'Friday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Saturday', slots: ['10:00 AM', '1:00 PM'] },
      { day: 'Sunday', slots: [] },
    ]
  },
};

// Helper to get the day name from a Date
const getDayName = (date: Date): string => {
  return format(date, 'EEEE');
};

const BookSession = () => {
  const { trainerId } = useParams<{ trainerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Booking state
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('60');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // In a real app, you'd fetch the trainer data based on the ID
  const trainer = mockTrainers[trainerId as keyof typeof mockTrainers];
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Add a small delay before showing content animation
      setTimeout(() => {
        setContentLoaded(true);
      }, 100);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check for query parameters for pre-selected time slots
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const preSelectedDay = searchParams.get('day');
    const preSelectedTime = searchParams.get('time');
    
    if (preSelectedTime) {
      setSelectedTime(preSelectedTime);
    }
  }, [location.search]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        
        <div className="flex-1 pt-16 lg:pl-64">
          <DashboardSidebar />
          
          <main className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md shimmer w-24 mb-8"></div>
            
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer mb-4"></div>
          </main>
        </div>
      </div>
    );
  }
  
  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">Trainer Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The trainer you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/find-trainers')} className="hover-lift">
            Back to Trainers
          </Button>
        </div>
      </div>
    );
  }
  
  // Get available time slots for the selected date
  const getAvailableTimeSlots = (): string[] => {
    if (!date) return [];
    const dayName = getDayName(date);
    const daySlot = trainer.availability_slots.find(d => d.day === dayName);
    return daySlot ? daySlot.slots : [];
  };
  
  const availableTimeSlots = getAvailableTimeSlots();
  
  // Calculate total price
  const calculatePrice = (): number => {
    const durationInHours = parseInt(duration) / 60;
    return trainer.hourlyRate * durationInHours;
  };
  
  const handleSubmit = async () => {
    if (!date || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your session.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Booking Confirmed",
      description: `Your session with ${trainer.name} has been booked.`,
    });
    
    setIsSubmitting(false);
    setIsComplete(true);
  };
  
  const handleViewSessionDetails = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        <DashboardSidebar />
        
        <main className="p-4 md:p-6 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4 hover-lift animate-fade-in" 
            onClick={() => navigate(`/trainer-profile/${trainerId}`)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
          
          <div 
            className={`${
              contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } transition-all duration-500`}
          >
            {isComplete ? (
              <Card className="animate-fade-in">
                <CardHeader className="text-center pb-2">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
                  <CardTitle>Booking Confirmed!</CardTitle>
                  <CardDescription>
                    Your session with {trainer.name} has been scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-2">
                  <div className="mb-6 space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                          <p className="font-medium mt-1">{date ? format(date, 'PPP') : ''}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
                          <p className="font-medium mt-1">{selectedTime}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                          <p className="font-medium mt-1">{duration} minutes</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Total Price</h3>
                          <p className="font-medium mt-1">${calculatePrice()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 flex items-start space-x-3">
                      <img 
                        src={trainer.avatar} 
                        alt={trainer.name} 
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{trainer.name}</h3>
                        <p className="text-sm text-muted-foreground">{trainer.location}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>You'll receive a confirmation email with details to join this session.</p>
                      <p className="mt-1">You can reschedule or cancel this session up to 24 hours before the scheduled time.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                  <Button onClick={handleViewSessionDetails} className="hover-lift">
                    View Session Details
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Book a Session</CardTitle>
                      <CardDescription>
                        Select a date and time for your session with {trainer.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Date</h3>
                        <div className="border rounded-md">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="p-0"
                            disabled={(date) => {
                              const day = getDayName(date);
                              const daySlot = trainer.availability_slots.find(d => d.day === day);
                              return !daySlot || daySlot.slots.length === 0;
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Time</h3>
                        {availableTimeSlots.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {availableTimeSlots.map((slot) => (
                              <Badge
                                key={slot}
                                variant={selectedTime === slot ? "default" : "outline"}
                                className="px-3 py-1 cursor-pointer hover-lift"
                                onClick={() => setSelectedTime(slot)}
                              >
                                <Clock className="mr-1 h-3 w-3" />
                                {slot}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No available time slots for the selected date.
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Session Duration</h3>
                        <Select
                          value={duration}
                          onValueChange={setDuration}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                            <SelectItem value="120">120 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Message to Trainer (Optional)</h3>
                        <Textarea
                          placeholder="Let the trainer know about your fitness goals, any medical conditions, or questions you have."
                          className="min-h-[120px]"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-full lg:w-80 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={trainer.avatar} 
                          alt={trainer.name} 
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{trainer.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {trainer.specialties.slice(0, 2).map((specialty) => (
                              <span
                                key={specialty}
                                className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-b py-4 space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Date</span>
                          </div>
                          <span className="font-medium">{date ? format(date, 'PP') : 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Time</span>
                          </div>
                          <span className="font-medium">{selectedTime || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration</span>
                          <span className="font-medium">{duration} minutes</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Rate</span>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4" />
                            <span>{trainer.hourlyRate}/hour</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-base font-bold">
                          <span>Total</span>
                          <span>${calculatePrice()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full hover-lift" 
                        onClick={handleSubmit}
                        disabled={!date || !selectedTime || isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Confirm & Pay
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookSession;
