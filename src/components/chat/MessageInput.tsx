
import React, { useState, KeyboardEvent } from 'react';
import { Send, Plus, Smile, Paperclip } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
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
      <button className="p-2 rounded-full hover:bg-secondary flex-shrink-0">
        <Plus className="w-5 h-5" />
      </button>
      
      <div className="relative flex-1">
        <Textarea
          placeholder="Type a message..."
          className="resize-none min-h-[48px] pr-24 py-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <button className="p-1.5 rounded-full hover:bg-secondary">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-secondary">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <button 
        className="bg-primary text-primary-foreground p-3 rounded-full flex-shrink-0 hover:opacity-90 transition"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageInput;
