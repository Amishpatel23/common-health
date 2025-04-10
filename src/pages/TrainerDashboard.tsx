
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import TrainerDashboardSidebar from '@/components/TrainerDashboardSidebar';
import TrainerDashboardNavbar from '@/components/TrainerDashboardNavbar';
import OverviewCard from '@/components/dashboard/OverviewCard';
import ActiveSessionBanner from '@/components/trainer/ActiveSessionBanner';
import UpcomingSessionCard from '@/components/dashboard/UpcomingSessionCard';
import SessionRequestsTable from '@/components/trainer/SessionRequestsTable';
import UpcomingSessionsTable from '@/components/dashboard/UpcomingSessionsTable';
import RecentChatsList from '@/components/dashboard/RecentChatsList';
import { Calendar, Clock, DollarSign, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// Mock data
const mockUpcomingSessions = [
  {
    id: '1',
    trainer: {
      name: 'Emily Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      specialty: 'HIIT Training',
    },
    date: 'Today',
    time: '2:00 PM',
    status: 'upcoming' as const,
  },
  {
    id: '2',
    trainer: {
      name: 'John Davis',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      specialty: 'Weight Loss',
    },
    date: 'Tomorrow',
    time: '10:30 AM',
    status: 'upcoming' as const,
  },
  {
    id: '3',
    trainer: {
      name: 'Rachel Kim',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      specialty: 'Strength Training',
    },
    date: 'Jun 12, 2023',
    time: '4:00 PM',
    status: 'upcoming' as const,
  },
];

const mockSessionRequests = [
  {
    id: '101',
    member: {
      name: 'Emily Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    requestDate: 'Jun 8, 2023',
    requestTime: '3:30 PM',
    message: "I'd like to focus on strength training for my upper body.",
    status: 'pending' as const,
  },
  {
    id: '102',
    member: {
      name: 'John Davis',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    requestDate: 'Jun 10, 2023',
    requestTime: '5:00 PM',
    message: "I'm a beginner looking to improve my overall fitness.",
    status: 'pending' as const,
  },
];

const mockRecentChats = [
  {
    id: '201',
    name: 'Emily Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    lastMessage: 'Looking forward to our session!',
    lastMessageTime: '10:23 AM',
    unread: 2,
  },
  {
    id: '202',
    name: 'John Davis',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    lastMessage: "Should I eat before our training session?",
    lastMessageTime: 'Yesterday',
    unread: 0,
  },
  {
    id: '203',
    name: 'Rachel Kim',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastMessage: 'Thanks for the great workout!',
    lastMessageTime: '2 days ago',
    unread: 0,
  },
];

const mockActiveSession = {
  id: '1',
  memberName: 'Emily Wilson',
  sessionType: 'HIIT Training',
  startTime: '2:00 PM',
};

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [availabilityStatus, setAvailabilityStatus] = useState('Available');
  const [hasActiveSession, setHasActiveSession] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      setTimeout(() => {
        setContentLoaded(true);
      }, 100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  const getTrainerName = () => {
    if (!user) return 'Trainer';
    return user.name.split(' ')[0];
  };

  const getGreeting = () => {
    if (!user) return "Welcome back, Trainer!";
    
    const firstName = user.name.split(' ')[0];
    
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    return `${timeGreeting}, Trainer ${firstName}!`;
  };
  
  const handleStartSession = (sessionId: string) => {
    toast({
      title: "Starting session",
      description: "Preparing video session...",
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
  
  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request accepted",
      description: "The session has been added to your schedule.",
    });
  };
  
  const handleRejectRequest = (requestId: string) => {
    toast({
      title: "Request rejected",
      description: "The member has been notified.",
    });
  };
  
  const handleChatSelect = (chatId: string) => {
    toast({
      description: "Opening chat conversation...",
    });
    navigate(`/chat/${chatId}`);
  };
  
  const handleUpdateAvailability = () => {
    toast({
      description: "Opening availability settings...",
    });
    navigate('/manage-availability');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <TrainerDashboardSidebar />
          <TrainerDashboardNavbar onMenuClick={toggleMobileSidebar} />
          
          <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 lg:pl-64 pt-16">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Welcome back, {getTrainerName()}!
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Here's an overview of your training business.
                  </p>
                </div>
                <Button 
                  className="shrink-0 animate-fade-in" 
                  style={{ animationDelay: '200ms' }}
                  onClick={handleUpdateAvailability}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Update Availability
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <TrainerDashboardSidebar />
        <TrainerDashboardNavbar onMenuClick={toggleMobileSidebar} />
        {isMobileSidebarOpen && (
          <TrainerDashboardSidebar isMobile={true} onClose={() => setIsMobileSidebarOpen(false)} />
        )}
        
        <main 
          className={`p-4 md:p-6 max-w-7xl mx-auto space-y-6 lg:pl-64 pt-16 ${
            contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-500`}
        >
          {hasActiveSession && (
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <ActiveSessionBanner session={mockActiveSession} />
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {getGreeting()}
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's an overview of your training business.
              </p>
            </div>
            <Button 
              className="shrink-0 animate-fade-in" 
              style={{ animationDelay: '200ms' }}
              onClick={handleUpdateAvailability}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Update Availability
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <OverviewCard
                title="Next Session"
                value="Today at 2:00 PM"
                description="HIIT with Emily Wilson"
                icon={<Calendar className="h-5 w-5" />}
                onClick={() => handleStartSession('1')}
                className="cursor-pointer hover:border-primary/50 hover-lift"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <OverviewCard
                title="Total Sessions"
                value="42"
                description="8 completed this month"
                icon={<Clock className="h-5 w-5" />}
                className="hover-lift"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <OverviewCard
                title="Total Earnings"
                value="$1,240"
                description="$320 pending payout"
                icon={<DollarSign className="h-5 w-5" />}
                className="hover-lift"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <OverviewCard
                title="Availability"
                value={availabilityStatus}
                description="Next available: Today, 5PM-8PM"
                icon={<Users className="h-5 w-5" />}
                onClick={handleUpdateAvailability}
                className="cursor-pointer hover:border-primary/50 hover-lift"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Session Requests</h2>
                  <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {mockSessionRequests.length} New
                  </span>
                </div>
                
                <SessionRequestsTable
                  requests={mockSessionRequests}
                  onAccept={handleAcceptRequest}
                  onReject={handleRejectRequest}
                />
              </div>
              
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
                    onJoin={() => handleStartSession(mockUpcomingSessions[0].id)}
                    onReschedule={() => handleRescheduleSession(mockUpcomingSessions[0].id)}
                    onCancel={() => handleCancelSession(mockUpcomingSessions[0].id)}
                  />
                  <UpcomingSessionCard
                    trainer={mockUpcomingSessions[1].trainer}
                    sessionDate={mockUpcomingSessions[1].date}
                    sessionTime={mockUpcomingSessions[1].time}
                    onJoin={() => handleStartSession(mockUpcomingSessions[1].id)}
                    onReschedule={() => handleRescheduleSession(mockUpcomingSessions[1].id)}
                    onCancel={() => handleCancelSession(mockUpcomingSessions[1].id)}
                  />
                </div>
                
                <UpcomingSessionsTable
                  sessions={mockUpcomingSessions}
                  onJoin={handleStartSession}
                  onReschedule={handleRescheduleSession}
                  onCancel={handleCancelSession}
                />
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
                <RecentChatsList
                  chats={mockRecentChats}
                  onChatSelect={handleChatSelect}
                />
              </div>
              
              <div className="border border-border rounded-xl p-5 bg-white dark:bg-black">
                <h2 className="text-xl font-semibold mb-3">Quick Availability</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your availability to let members book sessions with you.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Today</span>
                    <span className="font-medium">5:00 PM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Tomorrow</span>
                    <span className="font-medium">9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Wednesday</span>
                    <span className="font-medium">2:00 PM - 6:00 PM</span>
                  </div>
                </div>
                <Button onClick={handleUpdateAvailability} className="w-full">
                  Manage Schedule
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainerDashboard;
