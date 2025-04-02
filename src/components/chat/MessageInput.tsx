
import React, { useState, KeyboardEvent } from 'react';
import { Send, Plus, Smile, Paperclip, Mic } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="flex items-end gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full flex-shrink-0 hover:bg-secondary/80"
      >
        <Plus className="w-5 h-5" />
      </Button>
      
      <div className="relative flex-1">
        <Textarea
          placeholder="Type a message..."
          className="resize-none min-h-[48px] pr-24 py-3 border-secondary focus-visible:ring-primary/30 rounded-2xl"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setIsTyping(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8 hover:bg-secondary/80"
          >
            <Smile className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8 hover:bg-secondary/80"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8 hover:bg-secondary/80"
          >
            <Mic className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
      
      <Button 
        className={`p-3 rounded-full flex-shrink-0 hover:opacity-90 transition hover:scale-105 ${isTyping ? 'bg-primary' : 'bg-secondary text-muted-foreground'}`}
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default MessageInput;
