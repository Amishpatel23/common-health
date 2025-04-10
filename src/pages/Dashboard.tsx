import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import OverviewCard from '@/components/dashboard/OverviewCard';
import UpcomingSessionCard from '@/components/dashboard/UpcomingSessionCard';
import TrainerRecommendation from '@/components/dashboard/TrainerRecommendation';
import RecentChatsList from '@/components/dashboard/RecentChatsList';
import UpcomingSessionsTable from '@/components/dashboard/UpcomingSessionsTable';
import { Calendar, Clock, Users, CreditCard, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import SessionNotification from '@/components/SessionNotification';

const mockUpcomingSessions = [
  {
    id: '1',
    trainer: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      specialty: 'HIIT Training',
    },
    date: 'Today',
    time: '2:00 PM',
    status: 'upcoming' as const,
  },
  {
    id: '2',
    trainer: {
      name: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      specialty: 'Yoga & Meditation',
    },
    date: 'Tomorrow',
    time: '10:30 AM',
    status: 'upcoming' as const,
  },
  {
    id: '3',
    trainer: {
      name: 'Daniel Lee',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      specialty: 'Strength Training',
    },
    date: 'Jun 12, 2023',
    time: '4:00 PM',
    status: 'upcoming' as const,
  },
];

const mockRecommendedTrainers = [
  {
    id: '101',
    name: 'Jessica Williams',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    specialty: 'CrossFit Coach',
    rating: 4.9,
  },
  {
    id: '102',
    name: 'Mike Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    specialty: 'Nutritionist',
    rating: 4.7,
  },
  {
    id: '103',
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    specialty: 'Pilates Instructor',
    rating: 4.8,
  },
  {
    id: '104',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    specialty: 'Marathon Coach',
    rating: 4.6,
  },
];

const mockRecentChats = [
  {
    id: '201',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Looking forward to our session!',
    lastMessageTime: '10:23 AM',
    unread: 2,
  },
  {
    id: '202',
    name: 'Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: "Don't forget to stay hydrated before...",
    lastMessageTime: 'Yesterday',
    unread: 0,
  },
  {
    id: '203',
    name: 'Mike Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    lastMessage: 'I sent you the nutrition plan',
    lastMessageTime: '2 days ago',
    unread: 0,
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      setTimeout(() => {
        setContentLoaded(true);
      }, 100);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleJoinSession = (sessionId: string) => {
    toast({
      title: "Joining session",
      description: "Connecting to video session...",
    });
    navigate(`/video-session/${sessionId}`);
  };
  
  const handleRescheduleSession = (sessionId: string) => {
    toast({
      title: "Reschedule session",
      description: "Opening the scheduling interface...",
    });
  };
  
  const handleCancelSession = (sessionId: string) => {
    toast({
      description: "Session has been canceled.",
    });
  };
  
  const handleViewTrainerProfile = (trainerId: string) => {
    navigate(`/trainer-profile/${trainerId}`);
  };
  
  const handleChatSelect = (chatId: string) => {
    navigate('/chat');
  };

  const getGreeting = () => {
    if (!user) return "Welcome";
    
    const firstName = user.name?.split(' ')[0] || '';
    const roleTitle = user?.role === 'trainer' ? 'Trainer' : 'Member';
    
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    return `${timeGreeting}, ${roleTitle} ${firstName}!`;
  };
  
  if (isLoading) {
    return (
      <DashboardLayout 
        title="Loading..." 
        description="Please wait while we load your dashboard"
        showBackButton={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer"></div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer"></div>
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  const renderSessionNotification = () => {
    if (!user || user.role !== 'member') return null;
    return <SessionNotification upcomingSessions={mockUpcomingSessions} />;
  };
  
  return (
    <>
      {renderSessionNotification()}
      
      <DashboardLayout 
        title={getGreeting()}
        description="Here's what's happening with your fitness journey today."
        showBackButton={false}
        actions={
          <Button 
            onClick={() => navigate('/find-trainers')}
            className="shrink-0 animate-fade-in"
          >
            <Search className="mr-2 h-4 w-4" />
            Find Trainers
          </Button>
        }
      >
        <div 
          className={`space-y-6 ${
            contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-500`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <OverviewCard
                title="Next Session"
                value="Today at 2:00 PM"
                description="HIIT with Alex Johnson"
                icon={<Calendar className="h-5 w-5" />}
                onClick={() => handleJoinSession('1')}
                className="cursor-pointer hover:border-primary/50 hover-lift"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <OverviewCard
                title="Total Sessions"
                value="12"
                description="6 completed this month"
                icon={<Clock className="h-5 w-5" />}
                className="hover-lift"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <OverviewCard
                title="My Trainers"
                value="4"
                description="2 active currently"
                icon={<Users className="h-5 w-5" />}
                onClick={() => navigate('/my-trainers')}
                className="hover-lift cursor-pointer"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <OverviewCard
                title="Subscription"
                value={user?.membershipDetails?.plan || "Basic"}
                description={`Renews on ${user?.membershipDetails?.endDate || '2025-05-10'}`}
                icon={<CreditCard className="h-5 w-5" />}
                onClick={() => navigate('/payments')}
                className="hover-lift cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/my-sessions')}
                    className="hover-lift"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <UpcomingSessionCard
                    trainer={mockUpcomingSessions[0].trainer}
                    sessionDate={mockUpcomingSessions[0].date}
                    sessionTime={mockUpcomingSessions[0].time}
                    isNext={true}
                    onJoin={() => handleJoinSession(mockUpcomingSessions[0].id)}
                    onReschedule={() => handleRescheduleSession(mockUpcomingSessions[0].id)}
                    onCancel={() => handleCancelSession(mockUpcomingSessions[0].id)}
                  />
                  <UpcomingSessionCard
                    trainer={mockUpcomingSessions[1].trainer}
                    sessionDate={mockUpcomingSessions[1].date}
                    sessionTime={mockUpcomingSessions[1].time}
                    onJoin={() => handleJoinSession(mockUpcomingSessions[1].id)}
                    onReschedule={() => handleRescheduleSession(mockUpcomingSessions[1].id)}
                    onCancel={() => handleCancelSession(mockUpcomingSessions[1].id)}
                  />
                </div>
                
                <UpcomingSessionsTable
                  sessions={mockUpcomingSessions}
                  onJoin={handleJoinSession}
                  onReschedule={handleRescheduleSession}
                  onCancel={handleCancelSession}
                />
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <div className="bg-white dark:bg-black rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recommended Trainers</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/find-trainers')}
                    className="hover-lift"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {mockRecommendedTrainers.slice(0, 2).map((trainer) => (
                    <TrainerRecommendation
                      key={trainer.id}
                      trainer={trainer}
                      onViewProfile={() => handleViewTrainerProfile(trainer.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-black rounded-xl p-4 border border-border">
                <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
                <RecentChatsList
                  chats={mockRecentChats}
                  onChatSelect={handleChatSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
