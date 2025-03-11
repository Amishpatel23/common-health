
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import OverviewCard from '@/components/dashboard/OverviewCard';
import UpcomingSessionCard from '@/components/dashboard/UpcomingSessionCard';
import TrainerRecommendation from '@/components/dashboard/TrainerRecommendation';
import RecentChatsList from '@/components/dashboard/RecentChatsList';
import UpcomingSessionsTable from '@/components/dashboard/UpcomingSessionsTable';
import { Calendar, Clock, Users, CreditCard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
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
  const [userName, setUserName] = useState('Sarah');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleJoinSession = (sessionId: string) => {
    toast({
      title: "Joining session",
      description: "Connecting to video session...",
    });
    // In a real app, this would navigate to a video room
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
    toast({
      description: "Viewing trainer profile...",
    });
    // In a real app, navigate to trainer profile
  };
  
  const handleChatSelect = (chatId: string) => {
    toast({
      description: "Opening chat conversation...",
    });
    // In a real app, navigate to chat page with this ID
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        {/* Sidebar (desktop-only) */}
        <DashboardSidebar />
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          {/* Welcome message */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome back, {userName}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your fitness journey today.
              </p>
            </div>
            <Button className="shrink-0" onClick={() => navigate('/find-trainers')}>
              <Search className="mr-2 h-4 w-4" />
              Find Trainers
            </Button>
          </div>
          
          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverviewCard
              title="Next Session"
              value="Today at 2:00 PM"
              description="HIIT with Alex Johnson"
              icon={<Calendar className="h-5 w-5" />}
              onClick={() => handleJoinSession('1')}
              className="cursor-pointer hover:border-primary/50"
            />
            <OverviewCard
              title="Total Sessions"
              value="12"
              description="6 completed this month"
              icon={<Clock className="h-5 w-5" />}
            />
            <OverviewCard
              title="My Trainers"
              value="4"
              description="2 active currently"
              icon={<Users className="h-5 w-5" />}
            />
            <OverviewCard
              title="Subscription"
              value="Premium"
              description="Renews on Jul 15, 2023"
              icon={<CreditCard className="h-5 w-5" />}
            />
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Upcoming session */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/my-sessions')}
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
            
            {/* Right column - Trainer recommendations and chats */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recommended Trainers</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/find-trainers')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {mockRecommendedTrainers.slice(0, 2).map((trainer) => (
                    <TrainerRecommendation
                      key={trainer.id}
                      trainer={trainer}
                      onViewProfile={handleViewTrainerProfile}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
                <RecentChatsList
                  chats={mockRecentChats}
                  onChatSelect={handleChatSelect}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
