
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  MessageSquare, 
  Phone, 
  Users, 
  ScreenShare,
  X,
  Maximize,
  Minimize,
  User,
  SendHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

const getMockSessionData = (sessionId: string) => {
  return {
    id: sessionId,
    type: 'HIIT Training',
    duration: '45 minutes',
    trainer: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    member: {
      name: 'Emily Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    status: 'in_progress',
    startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};

const mockChatMessages = [
  {
    id: 'msg1',
    sender: 'trainer',
    text: 'Welcome to our session! How are you feeling today?',
    time: '2:05 PM',
  },
  {
    id: 'msg2',
    sender: 'member',
    text: "I'm good, but my knee has been bothering me a bit.",
    time: '2:06 PM',
  },
  {
    id: 'msg3',
    sender: 'trainer',
    text: "I'll keep that in mind and adjust the exercises accordingly.",
    time: '2:07 PM',
  },
];

interface ChatMessageProps {
  message: {
    id: string;
    sender: string;
    text: string;
    time: string;
  };
  isTrainer: boolean;
}

const ChatMessage = ({ message, isTrainer }: ChatMessageProps) => {
  const isSelf = (isTrainer && message.sender === 'trainer') || 
                (!isTrainer && message.sender === 'member');
  
  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
        isSelf ? 'bg-primary text-primary-foreground' : 'bg-secondary'
      }`}>
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 block text-right mt-1">{message.time}</span>
      </div>
    </div>
  );
};

// Incoming call dialog component
const IncomingCallDialog = ({ 
  isOpen, 
  callerName, 
  callerAvatar,
  onAccept, 
  onDecline 
}: { 
  isOpen: boolean, 
  callerName: string,
  callerAvatar: string,
  onAccept: () => void, 
  onDecline: () => void 
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center flex-col gap-3">
            <div className="relative">
              <img 
                src={callerAvatar} 
                alt={callerName} 
                className="w-20 h-20 rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Video className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-lg">{callerName} is calling you</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Video training session
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 mt-4">
          <Button 
            variant="destructive" 
            onClick={onDecline} 
            className="flex-1 rounded-full"
          >
            <Phone className="h-4 w-4 mr-2 rotate-135" />
            Decline
          </Button>
          <Button 
            onClick={onAccept} 
            className="flex-1 bg-green-600 hover:bg-green-700 rounded-full"
          >
            <Video className="h-4 w-4 mr-2" />
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VideoSession = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const [sessionData, setSessionData] = useState(getMockSessionData(sessionId || '1'));
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState(45 * 60); // 45 minutes in seconds
  const [isConnecting, setIsConnecting] = useState(true);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simulate connecting and incoming call for demo purposes
  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
      
      // For demo: if no sessionId specified, simulate incoming call
      if (!sessionId) {
        setTimeout(() => {
          setIsIncomingCall(true);
        }, 1500);
      }
    }, 2000);
    
    return () => clearTimeout(connectTimer);
  }, [sessionId]);
  
  // Start timer once connected
  useEffect(() => {
    if (isConnecting) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFeedbackDialogOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isConnecting]);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const isUserTrainer = user?.role === 'trainer';
    const sender = isUserTrainer ? 'trainer' : 'member';
    
    const newChatMessage = {
      id: `msg${chatMessages.length + 1}`,
      sender: sender,
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
    
    // Simulate reply from the other party
    setTimeout(() => {
      const replyMessage = {
        id: `msg${chatMessages.length + 2}`,
        sender: isUserTrainer ? 'member' : 'trainer',
        text: isUserTrainer ? 
          "Got it, I'll try to follow along." : 
          "Great! Keep up that form, you're doing well!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, replyMessage]);
    }, 3000);
  };
  
  const toggleVideo = () => setIsVideoEnabled(prev => !prev);
  const toggleAudio = () => setIsAudioEnabled(prev => !prev);
  const toggleChat = () => setIsChatOpen(prev => !prev);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && videoContainerRef.current) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        toast({
          title: "Error",
          description: `Could not enable fullscreen mode: ${err.message}`,
          variant: "destructive",
        });
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const handleAcceptCall = () => {
    setIsIncomingCall(false);
    setIsConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        description: "Call connected successfully",
      });
    }, 2000);
  };
  
  const handleDeclineCall = () => {
    setIsIncomingCall(false);
    toast({
      description: "Call declined",
    });
    navigate('/dashboard');
  };
  
  const endSession = () => {
    setIsFeedbackDialogOpen(true);
  };
  
  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    
    const redirectPath = user?.role === 'trainer' ? '/trainer-dashboard' : '/dashboard';
    navigate(redirectPath);
  };
  
  const handleExitWithoutFeedback = () => {
    toast({
      description: "Session ended without feedback",
    });
    const redirectPath = user?.role === 'trainer' ? '/trainer-dashboard' : '/dashboard';
    navigate(redirectPath);
  };
  
  // If we're showing the incoming call dialog
  if (isIncomingCall) {
    return (
      <IncomingCallDialog 
        isOpen={isIncomingCall}
        callerName={sessionData.trainer.name}
        callerAvatar={sessionData.trainer.avatar}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
      />
    );
  }
  
  // If still connecting
  if (isConnecting) {
    return (
      <div className="h-screen flex items-center justify-center bg-background flex-col gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold">Connecting to session...</h2>
        <p className="text-muted-foreground">Setting up your video connection</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="px-4 py-3 border-b flex items-center justify-between bg-background shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="bg-destructive/20 text-destructive px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
              <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-destructive"></span>
              LIVE
            </div>
            <span className="mx-2 text-sm text-muted-foreground">
              {formatTime(remainingTime)} remaining
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{sessionData.type}</span>
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 bg-black" ref={videoContainerRef}>
          {/* Main video - Shows the other participant */}
          {isVideoEnabled ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={user?.role === 'trainer' ? sessionData.member.avatar : sessionData.trainer.avatar} 
                alt="Other participant" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center mb-2">
                  <Users className="h-10 w-10 text-secondary-foreground" />
                </div>
                <p className="text-white">
                  {user?.role === 'trainer' ? sessionData.member.name : sessionData.trainer.name}
                </p>
              </div>
            </div>
          )}
          
          {/* Self video */}
          <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-background shadow-lg">
            {isVideoEnabled ? (
              <img 
                src={user?.role === 'trainer' ? sessionData.trainer.avatar : sessionData.member.avatar} 
                alt="Your Video" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-1">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-white text-xs">You</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Participant info */}
          <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-lg p-2 text-white">
            <div className="flex items-center gap-2">
              <img 
                src={user?.role === 'trainer' ? sessionData.member.avatar : sessionData.trainer.avatar} 
                alt="Participant" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">
                  {user?.role === 'trainer' ? sessionData.member.name : sessionData.trainer.name}
                </p>
                <p className="text-xs opacity-80">
                  {user?.role === 'trainer' ? 'Member' : 'Trainer'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat panel */}
        <div className={`w-[300px] border-l border-border flex flex-col bg-background transition-transform duration-300 ease-in-out ${
          isChatOpen || window.innerWidth >= 768 ? 'translate-x-0' : 'translate-x-full hidden'
        }`}>
          <div className="p-3 border-b flex items-center justify-between">
            <h3 className="font-medium">Session Chat</h3>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            ref={chatContainerRef}
          >
            {chatMessages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isTrainer={user?.role === 'trainer'} 
              />
            ))}
          </div>
          
          <div className="border-t p-3 flex gap-2">
            <Textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[40px] max-h-[120px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-background border-t p-3 flex items-center justify-center gap-2 md:gap-4">
        <Button 
          variant={isAudioEnabled ? "outline" : "destructive"} 
          size="icon" 
          className="rounded-full h-12 w-12"
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant={isVideoEnabled ? "outline" : "destructive"} 
          size="icon" 
          className="rounded-full h-12 w-12"
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12"
        >
          <ScreenShare className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 md:hidden"
          onClick={toggleChat}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="destructive" 
          size="icon" 
          className="rounded-full h-12 w-12"
          onClick={endSession}
        >
          <Phone className="h-5 w-5 rotate-135" />
        </Button>
      </div>
      
      {/* Feedback dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Session Feedback</DialogTitle>
            <DialogDescription>
              Please provide feedback on your session with {user?.role === 'trainer' ? sessionData.member.name : sessionData.trainer.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">How would you rate this session?</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={feedbackRating === rating ? "default" : "outline"}
                    className="h-10 w-10 p-0"
                    onClick={() => setFeedbackRating(rating)}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Additional comments</h4>
              <Textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts about this session..."
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-between gap-2 mt-2">
            <Button variant="outline" onClick={handleExitWithoutFeedback}>
              Skip
            </Button>
            <Button onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoSession;
