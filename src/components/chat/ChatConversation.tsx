
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Phone, Video, MoreVertical } from 'lucide-react';
import MessageInput from './MessageInput';

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  date: string;
}

interface ChatConversationProps {
  contact: ChatContact;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ChatConversation = ({ contact, messages, onSendMessage }: ChatConversationProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    if (!groupedMessages[message.date]) {
      groupedMessages[message.date] = [];
    }
    groupedMessages[message.date].push(message);
  });
  
  return (
    <div className="flex-1 flex flex-col bg-secondary/10">
      {/* Chat Header */}
      <div className="p-3 border-b border-border bg-background flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <span className="text-xs text-muted-foreground">
              {contact.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-secondary" aria-label="Voice call">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary" aria-label="Video call">
            <Video className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary" aria-label="More options">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center justify-center">
              <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                {date}
              </span>
            </div>
            
            {dateMessages.map((message) => {
              const isCurrentUser = message.senderId === 'current-user';
              
              return (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[75%] rounded-lg px-4 py-2",
                      isCurrentUser 
                        ? "bg-primary text-primary-foreground rounded-br-none" 
                        : "bg-secondary rounded-bl-none"
                    )}
                  >
                    <p className="break-words">{message.text}</p>
                    <span 
                      className={cn(
                        "text-xs block text-right mt-1",
                        isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <div className="p-3 border-t border-border bg-background">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatConversation;
