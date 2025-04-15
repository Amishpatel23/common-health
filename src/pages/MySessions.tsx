
import React, { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User } from 'lucide-react';

// Define session type
interface Session {
  _id: string;
  id?: string;
  title: string;
  trainer: string | { firstName: string; lastName: string; _id: string };
  member: string;
  date: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'missed';
  rating?: number;
}

const MySessions: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [pastSessions, setPastSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSessions = async () => {
      if (!user || !user.id) {
        // Use mock data if no user is logged in (for development)
        setUpcomingSessions([
          {
            _id: "1",
            title: "Strength Training",
            trainer: "John Smith",
            member: "user123",
            date: "2025-04-16T10:00:00",
            duration: 60,
            status: "confirmed",
          },
          {
            _id: "2",
            title: "Yoga Flow",
            trainer: "Emma Johnson",
            member: "user123",
            date: "2025-04-20T15:30:00",
            duration: 45,
            status: "pending",
          },
        ]);
        
        setPastSessions([
          {
            _id: "3",
            title: "HIIT Workout",
            trainer: "Michael Brown",
            member: "user123",
            date: "2025-04-05T11:00:00",
            duration: 30,
            status: "completed",
            rating: 5,
          },
          {
            _id: "4",
            title: "Meditation",
            trainer: "Sarah Wilson",
            member: "user123",
            date: "2025-04-01T09:00:00",
            duration: 30,
            status: "completed",
            rating: 4,
          },
          {
            _id: "5",
            title: "Cardio Training",
            trainer: "David Thompson",
            member: "user123",
            date: "2025-03-25T16:00:00",
            duration: 45,
            status: "missed",
          },
        ]);
        
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch upcoming sessions
        const upcomingResponse = await fetch(`http://localhost:5000/api/sessions/upcoming/${user.id}`);
        if (!upcomingResponse.ok) {
          throw new Error('Failed to fetch upcoming sessions');
        }
        const upcomingData = await upcomingResponse.json();
        setUpcomingSessions(upcomingData);
        
        // Fetch past sessions
        const pastResponse = await fetch(`http://localhost:5000/api/sessions/past/${user.id}`);
        if (!pastResponse.ok) {
          throw new Error('Failed to fetch past sessions');
        }
        const pastData = await pastResponse.json();
        setPastSessions(pastData);
        
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Failed to load sessions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSessions();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTrainerName = (trainer: string | { firstName: string; lastName: string; _id: string }) => {
    if (typeof trainer === 'string') {
      return trainer;
    }
    return `${trainer.firstName} ${trainer.lastName}`;
  };

  const renderSessionCard = (session: Session) => (
    <Card key={session._id || session.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{session.title}</CardTitle>
          {getStatusBadge(session.status)}
        </div>
        <CardDescription className="flex items-center gap-1">
          <User size={14} /> {getTrainerName(session.trainer)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-sm">{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm">{session.duration} minutes</span>
          </div>
          
          {session.rating && (
            <div className="flex items-center gap-1 mt-2">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill={i < session.rating ? "gold" : "none"} 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <DashboardLayout title="My Sessions">
        <div className="container mx-auto p-4 max-w-5xl">
          <div className="flex items-center mb-6">
            <BackButton className="mr-4" />
            <h1 className="text-2xl font-bold">My Sessions</h1>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="My Sessions">
        <div className="container mx-auto p-4 max-w-5xl">
          <div className="flex items-center mb-6">
            <BackButton className="mr-4" />
            <h1 className="text-2xl font-bold">My Sessions</h1>
          </div>
          
          <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Sessions">
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="flex items-center mb-6">
          <BackButton className="mr-4" />
          <h1 className="text-2xl font-bold">My Sessions</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past" className="flex-1">Past Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            {upcomingSessions.length > 0 ? (
              <div>
                {upcomingSessions.map(renderSessionCard)}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center text-center pt-6 pb-6">
                  <Calendar className="h-12 w-12 mb-2 text-muted-foreground" />
                  <p className="text-lg font-medium mb-1">No upcoming sessions</p>
                  <p className="text-muted-foreground mb-4">Book a session with a trainer to get started</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            {pastSessions.length > 0 ? (
              <div>
                {pastSessions.map(renderSessionCard)}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center text-center pt-6 pb-6">
                  <Calendar className="h-12 w-12 mb-2 text-muted-foreground" />
                  <p className="text-lg font-medium mb-1">No past sessions</p>
                  <p className="text-muted-foreground">Your session history will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MySessions;
