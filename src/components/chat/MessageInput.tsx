
import React, { useState, KeyboardEvent, useRef } from 'react';
import { Send, Plus, Smile, Paperclip, Mic, Image, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

type AttachmentType = 'image' | 'file' | 'voice';

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [attachmentType, setAttachmentType] = useState<AttachmentType | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
      textareaRef.current?.focus();
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simulate recording with a timer
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Store interval ID in a ref to clear it later
    const intervalRef = { current: interval };
    
    // Show toast with cancel button
    toast({
      title: "Recording voice message",
      description: (
        <div className="flex items-center justify-between">
          <span>Click the microphone again to send</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              clearInterval(intervalRef.current);
              setIsRecording(false);
              setRecordingTime(0);
            }}
          >
            Cancel
          </Button>
        </div>
      ),
      duration: 100000, // Long duration
    });
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    
    // Simulate sending voice message
    onSendMessage("[Voice message]");
    
    toast({
      description: "Voice message sent",
    });
  };
  
  const handleAttachment = (type: AttachmentType) => {
    setAttachmentType(type);
    
    if (type === 'image') {
      toast({
        description: "Image attachment selected (demo)",
      });
    } else if (type === 'file') {
      toast({
        description: "File attachment selected (demo)",
      });
    }
    
    // Reset after a short delay (for demo purposes)
    setTimeout(() => {
      setAttachmentType(null);
    }, 2000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Emojis for the demo
  const demoEmojis = ['👍', '🔥', '💪', '👏', '😊', '🏋️', '🧘', '🏃', '🥗', '💯', '⭐', '❤️'];
  
  return (
    <div className="flex flex-col w-full space-y-2">
      {/* Attachment preview area - only shown when attachment is selected */}
      {attachmentType && (
        <div className="flex items-center bg-secondary/40 rounded-lg p-2 animate-fade-in">
          <div className="flex-1 flex items-center gap-2 text-sm text-muted-foreground">
            {attachmentType === 'image' && (
              <>
                <Image className="h-4 w-4" />
                <span>image_attachment.jpg</span>
              </>
            )}
            {attachmentType === 'file' && (
              <>
                <Paperclip className="h-4 w-4" />
                <span>document_attachment.pdf</span>
              </>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full" 
            onClick={() => setAttachmentType(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* Add attachment button with popover menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full flex-shrink-0 hover:bg-secondary/80 transition-all duration-300 hover:text-primary"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start" side="top">
            <div className="grid grid-cols-3 gap-1">
              <Button 
                variant="ghost" 
                className="flex flex-col items-center gap-1 h-auto py-2"
                onClick={() => handleAttachment('image')}
              >
                <Image className="h-5 w-5" />
                <span className="text-xs">Image</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center gap-1 h-auto py-2"
                onClick={() => handleAttachment('file')}
              >
                <Paperclip className="h-5 w-5" />
                <span className="text-xs">File</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center gap-1 h-auto py-2"
                onClick={() => toast({ description: "Location sharing (demo)" })}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="h-5 w-5"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs">Location</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="resize-none min-h-[48px] max-h-32 pr-24 py-3 border-secondary focus-visible:ring-primary/30 rounded-2xl"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
          />
          
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            {/* Emoji picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-secondary/80 transition-colors"
                >
                  <Smile className="w-5 h-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end" side="top">
                <div className="grid grid-cols-6 gap-2">
                  {demoEmojis.map((emoji, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      className="h-9 w-9 p-0" 
                      onClick={() => setMessage(prev => prev + emoji)}
                    >
                      <span className="text-lg">{emoji}</span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Attachment button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-secondary/80 transition-colors"
                  onClick={() => handleAttachment('file')}
                >
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
            
            {/* Voice recording button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isRecording ? "default" : "ghost"}
                  size="icon" 
                  className={cn(
                    "rounded-full h-8 w-8 transition-all duration-300",
                    isRecording ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-secondary/80"
                  )}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  <Mic className="w-5 h-5" />
                  {isRecording && (
                    <span className="absolute -top-1 -right-1 text-[10px] bg-background text-foreground rounded-full px-1 border border-border">
                      {formatTime(recordingTime)}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isRecording ? "Send voice message" : "Record voice"}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <Button 
          className={cn(
            "p-3 rounded-full flex-shrink-0 transition-all duration-300",
            isTyping 
              ? "bg-primary hover:bg-primary/90 hover:scale-105" 
              : "bg-secondary text-muted-foreground hover:bg-secondary/80",
            message.length > 0 ? "animate-pulse" : ""
          )}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
