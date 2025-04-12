
import React, { useState } from 'react';
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
import { Camera, Mic, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
  const [permissionStatus, setPermissionStatus] = useState<{
    camera: 'pending' | 'granted' | 'denied' | 'error';
    microphone: 'pending' | 'granted' | 'denied' | 'error';
  }>({
    camera: 'pending',
    microphone: 'pending',
  });
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);

  // Check if the browser supports getUserMedia
  const hasMediaSupport = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  const requestMediaPermissions = async () => {
    if (!hasMediaSupport) {
      toast({
        title: "Device Not Supported",
        description: "Your browser doesn't support camera and microphone access.",
        variant: "destructive",
      });
      return false;
    }

    setIsRequestingPermissions(true);
    try {
      // Request both camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      // Permissions granted, update state
      setPermissionStatus({
        camera: 'granted',
        microphone: 'granted',
      });
      
      // Stop all tracks to release the devices
      stream.getTracks().forEach(track => track.stop());
      
      setIsRequestingPermissions(false);
      return true;
    } catch (error: any) {
      console.error("Permission error:", error);
      
      // Determine which permission was denied based on the error name
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setPermissionStatus({
          camera: 'denied',
          microphone: 'denied',
        });
        
        toast({
          title: "Permissions Required",
          description: "Camera and microphone access is needed for the session.",
          variant: "destructive",
        });
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        setPermissionStatus({
          camera: 'error',
          microphone: 'error',
        });
        
        toast({
          title: "Devices Not Found",
          description: "Could not find a camera or microphone on your device.",
          variant: "destructive",
        });
      } else {
        setPermissionStatus({
          camera: 'error',
          microphone: 'error',
        });
        
        toast({
          title: "Error",
          description: `An error occurred while accessing your devices: ${error.message}`,
          variant: "destructive",
        });
      }
      
      setIsRequestingPermissions(false);
      return false;
    }
  };

  const handleJoinSession = async () => {
    // First request permissions
    const permissionsGranted = await requestMediaPermissions();
    
    if (permissionsGranted) {
      // Navigate to the video session page
      navigate(`/video-session/${sessionId}`);
      onOpenChange(false);
      
      toast({
        title: "Joining Session",
        description: "Setting up your video connection...",
      });
    }
  };

  const handleRequestPermissions = async () => {
    await requestMediaPermissions();
  };

  const handleCancel = () => {
    onOpenChange(false);
    
    toast({
      title: "Session Cancelled",
      description: "You can join your session later from your dashboard.",
      variant: "destructive",
    });
  };

  const getPermissionStatusIcon = (status: 'pending' | 'granted' | 'denied' | 'error') => {
    switch (status) {
      case 'granted':
        return <span className="text-green-500">✓</span>;
      case 'denied':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <span className="text-muted-foreground">○</span>;
    }
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
              <Mic className="h-4 w-4 text-blue-500" />
              <div className="flex items-center gap-2">
                <span>Microphone access</span>
                {getPermissionStatusIcon(permissionStatus.microphone)}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-blue-500" />
              <div className="flex items-center gap-2">
                <span>Camera access</span>
                {getPermissionStatusIcon(permissionStatus.camera)}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-500" />
              <span>Your audio and video are private and only shared with your session partner.</span>
            </li>
          </ul>
          
          {!hasMediaSupport && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 inline-block mr-2" />
              Your browser doesn't support camera and microphone access. Please try another browser.
            </div>
          )}
          
          {(permissionStatus.camera === 'denied' || permissionStatus.microphone === 'denied') && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 inline-block mr-2" />
              Camera and microphone permissions are required to join the session. Please allow access in your browser settings.
            </div>
          )}
          
          {(permissionStatus.camera === 'error' || permissionStatus.microphone === 'error') && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 inline-block mr-2" />
              Could not detect camera or microphone devices. Please make sure they are properly connected.
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          
          {permissionStatus.camera === 'pending' && permissionStatus.microphone === 'pending' ? (
            <Button 
              onClick={handleRequestPermissions} 
              className="flex items-center gap-2 sm:w-auto w-full"
              disabled={isRequestingPermissions || !hasMediaSupport}
            >
              <Mic className="h-4 w-4" />
              <Camera className="h-4 w-4" />
              {isRequestingPermissions ? 'Requesting Access...' : 'Allow Camera & Mic Access'}
            </Button>
          ) : (
            <Button 
              onClick={handleJoinSession} 
              className={cn(
                "flex items-center gap-2 sm:w-auto w-full",
                (permissionStatus.camera === 'granted' && permissionStatus.microphone === 'granted') 
                  ? "bg-green-600 hover:bg-green-700" 
                  : ""
              )}
              disabled={(permissionStatus.camera !== 'granted' || permissionStatus.microphone !== 'granted')}
            >
              <Mic className="h-4 w-4" />
              <Camera className="h-4 w-4" />
              Join Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionStartNotification;
