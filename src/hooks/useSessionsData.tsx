
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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

export const useSessionsData = () => {
  const { user } = useAuth();
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

  return {
    upcomingSessions,
    pastSessions,
    isLoading,
    error,
    formatDate
  };
};
