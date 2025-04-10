
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, X } from 'lucide-react';

interface Session {
  id: string;
  trainer: {
    name: string;
    avatar: string;
    specialty: string;
  };
  date: string;
  time: string;
}

interface SessionNotificationProps {
  upcomingSessions: Session[];
}

const SessionNotification: React.FC<SessionNotificationProps> = ({ upcomingSessions }) => {
  const [open, setOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  
  // Check for sessions that are about to start
  useEffect(() => {
    // In a real app, we would check the actual time
    const upcomingToday = upcomingSessions.find(session => session.date === 'Today');
    
    if (upcomingToday) {
      // Show notification after a delay to simulate an upcoming session
      const timer = setTimeout(() => {
        setCurrentSession(upcomingToday);
        setOpen(true);
      }, 5000); // Show after 5 seconds for demonstration
      
      return () => clearTimeout(timer);
    }
  }, [upcomingSessions]);
  
  const handleJoinSession = () => {
    if (currentSession) {
      navigate(`/video-session/${currentSession.id}`);
      setOpen(false);
    }
  };
  
  const handleCancel = () => {
    setOpen(false);
    
    // Show a toast notification instead
    toast({
      title: "Session Reminder",
      description: `You have a session with ${currentSession?.trainer.name} at ${currentSession?.time}`,
      action: (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleJoinSession}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Join Now
        </Button>
      ),
    });
  };
  
  if (!currentSession) return null;
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-red-500" />
            Your Session is About to Start!
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 pt-2">
            <div className="flex items-center gap-3 pt-2">
              <img 
                src={currentSession.trainer.avatar} 
                alt={currentSession.trainer.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-foreground">{currentSession.trainer.name}</p>
                <p className="text-sm text-muted-foreground">{currentSession.trainer.specialty}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{currentSession.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{currentSession.time}</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none shadow-none">
            Remind Me Later
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleJoinSession}
            className="bg-red-600 hover:bg-red-700"
          >
            Join Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionNotification;
