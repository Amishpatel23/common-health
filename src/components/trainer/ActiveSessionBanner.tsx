
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Video, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveSessionBannerProps {
  session?: {
    id: string;
    memberName: string;
    sessionType: string;
    startTime: string;
  };
  className?: string;
}

const ActiveSessionBanner = ({ session, className }: ActiveSessionBannerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!session) return null;
  
  const handleJoinSession = () => {
    navigate(`/video-session/${session.id}`);
  };
  
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      description: "Banner dismissed. You can still join from your upcoming sessions.",
    });
  };
  
  return (
    <div 
      className={cn(
        "bg-primary/10 border border-primary/20 rounded-lg p-4 animate-pulse-slow relative",
        className
      )}
    >
      <div className="absolute top-2 right-2">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-destructive/20 text-destructive px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
          <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-destructive"></span>
          LIVE NOW
        </div>
        <span className="text-xs text-muted-foreground">
          Started at {session.startTime}
        </span>
      </div>
      
      <h3 className="font-medium text-base">{session.sessionType} with {session.memberName}</h3>
      
      <div className="mt-3 flex gap-2">
        <Button onClick={handleJoinSession} className="gap-1.5">
          <Video className="h-4 w-4" />
          Join Session
        </Button>
      </div>
    </div>
  );
};

export default ActiveSessionBanner;
