
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Mic, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionStartNotificationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
}

const SessionStartNotification: React.FC<SessionStartNotificationProps> = ({
  isOpen,
  onOpenChange,
  sessionId,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinSession = () => {
    // Navigate to the video session page
    navigate(`/video-session/${sessionId}`);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    
    toast({
      title: "Session Cancelled",
      description: "You can join your session later from your dashboard.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Your session is starting now
          </DialogTitle>
          <DialogDescription className="text-base">
            We'll need access to your camera and microphone so you can connect face-to-face in real-time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Make sure you're in a quiet, well-lit space.</span>
            </li>
            <li className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-blue-500" />
              <span>Click "Join Now" to start the session.</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-500" />
              <span>Your audio and video are private and only shared with your session partner.</span>
            </li>
          </ul>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleJoinSession} 
            className="flex items-center gap-2 sm:w-auto w-full bg-green-600 hover:bg-green-700"
          >
            <Mic className="h-4 w-4" />
            <Camera className="h-4 w-4" />
            Join Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionStartNotification;
