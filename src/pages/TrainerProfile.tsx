
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  MessageSquare,
  Award,
  ThumbsUp,
  Users,
  DollarSign
} from 'lucide-react';

// Mock trainer data - in a real app, you'd fetch this based on the ID
const mockTrainers = {
  '1': {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    specialties: ['HIIT Training', 'Weight Loss', 'Functional Training'],
    location: 'New York, NY',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 45,
    availability: 'Available today',
    bio: 'Certified personal trainer with 5+ years of experience in high-intensity workouts and nutrition planning. I specialize in creating personalized fitness programs that deliver results while keeping workouts engaging and motivating.',
    certifications: [
      'NASM Certified Personal Trainer',
      'ACE Fitness Nutrition Specialist',
      'CrossFit Level 1 Trainer',
      'CPR/AED Certified'
    ],
    experience: '5+ years',
    clientCount: '200+',
    sessionCompleted: 1240,
    languages: ['English', 'Spanish'],
    reviews: [
      {
        id: 'r1',
        user: 'Michael Smith',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 5,
        date: '2 weeks ago',
        comment: "Alex is an amazing trainer! His HIIT sessions are challenging but so effective. I've lost 15lbs in just 2 months.",
      },
      {
        id: 'r2',
        user: 'Jennifer Lee',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
        rating: 5,
        date: '1 month ago',
        comment: "I appreciate how Alex tailors workouts to my specific needs. He's knowledgeable and motivating.",
      },
      {
        id: 'r3',
        user: 'Robert Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        rating: 4,
        date: '2 months ago',
        comment: 'Great trainer who really pushes you to your limits. Sessions are always different which keeps things interesting.',
      },
    ],
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

const TrainerProfile = () => {
  const { trainerId } = useParams<{ trainerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('about');
  
  // In a real app, you'd fetch the trainer data based on the ID
  const trainer = mockTrainers[trainerId as keyof typeof mockTrainers];
  
  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Trainer Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The trainer you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/find-trainers')}>
            Back to Trainers
          </Button>
        </div>
      </div>
    );
  }
  
  const handleBookSession = () => {
    toast({
      description: "Opening booking interface...",
    });
    navigate(`/book-session/${trainerId}`);
  };
  
  const handleContactTrainer = () => {
    toast({
      description: "Opening chat with trainer...",
    });
    navigate('/chat', { state: { contactId: trainerId } });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        <DashboardSidebar />
        
        <main className="pb-8">
          {/* Trainer Header */}
          <div className="relative">
            <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/40">
              {trainer.coverImage && (
                <img 
                  src={trainer.coverImage} 
                  alt="" 
                  className="w-full h-full object-cover opacity-50"
                />
              )}
            </div>
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-end sm:space-x-5 relative -mt-16 sm:-mt-20">
                <div className="flex">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white bg-white"
                  />
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {trainer.name}
                    </h1>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="mr-1 h-4 w-4" />
                      {trainer.location}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Button 
                      onClick={handleBookSession}
                      className="px-8"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Session
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleContactTrainer}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {trainer.name}
                </h1>
              </div>
            </div>
          </div>
          
          {/* Trainer Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {trainer.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Main content */}
              <div className="flex-1">
                <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about">
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">About {trainer.name}</h2>
                        <p className="text-muted-foreground mb-6">
                          {trainer.bio}
                        </p>
                        
                        <h3 className="font-semibold text-lg mb-3">Certifications</h3>
                        <ul className="list-disc list-inside mb-6 space-y-1 text-muted-foreground">
                          {trainer.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                          ))}
                        </ul>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-secondary/20 p-4 rounded-lg flex flex-col items-center text-center">
                            <Award className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">Experience</span>
                            <span className="font-medium">{trainer.experience}</span>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg flex flex-col items-center text-center">
                            <Users className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">Clients</span>
                            <span className="font-medium">{trainer.clientCount}</span>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg flex flex-col items-center text-center">
                            <ThumbsUp className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">Sessions</span>
                            <span className="font-medium">{trainer.sessionCompleted}+</span>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg flex flex-col items-center text-center">
                            <DollarSign className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">Rate</span>
                            <span className="font-medium">${trainer.hourlyRate}/hr</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {trainer.languages.map((language) => (
                            <span key={language} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                              {language}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold">Client Reviews</h2>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 font-semibold">{trainer.rating}</span>
                            <span className="text-muted-foreground ml-1">({trainer.reviewCount} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {trainer.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-6 last:border-0">
                              <div className="flex items-start">
                                <img
                                  src={review.avatar}
                                  alt={review.user}
                                  className="h-10 w-10 rounded-full mr-4"
                                />
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">{review.user}</h4>
                                    <span className="text-sm text-muted-foreground">{review.date}</span>
                                  </div>
                                  <div className="flex items-center mt-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-muted-foreground">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="availability">
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Weekly Availability</h2>
                        <p className="text-muted-foreground mb-6">
                          Select an available time slot to book a session with {trainer.name}.
                        </p>
                        
                        <div className="space-y-4">
                          {trainer.availability_slots.map((daySlot) => (
                            <div key={daySlot.day} className="border-b pb-4 last:border-0">
                              <h3 className="font-medium mb-3">{daySlot.day}</h3>
                              {daySlot.slots.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {daySlot.slots.map((slot) => (
                                    <Button
                                      key={slot}
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center"
                                      onClick={() => {
                                        toast({
                                          description: `Selected ${daySlot.day} at ${slot}`,
                                        });
                                        navigate(`/book-session/${trainerId}?day=${daySlot.day}&time=${slot}`);
                                      }}
                                    >
                                      <Clock className="mr-1 h-3 w-3" />
                                      {slot}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">Not available</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="w-full md:w-72 mt-6 md:mt-0">
                <div className="bg-white rounded-lg border p-4 sticky top-20">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Session Rate</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">${trainer.hourlyRate}</span>
                      <span className="text-muted-foreground ml-1">/hour</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Availability</h3>
                    <div className="flex items-center text-sm">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        trainer.availability.includes('today') ? 'bg-green-500' : 'bg-amber-500'
                      }`}></div>
                      <span>
                        {trainer.availability}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-3" 
                    onClick={handleBookSession}
                  >
                    Book a Session
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleContactTrainer}
                  >
                    Message Trainer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainerProfile;
