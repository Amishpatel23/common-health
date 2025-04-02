
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Phone, Video, MoreVertical, ChevronLeft, Check, Clock, Info } from 'lucide-react';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  status?: 'sent' | 'delivered' | 'read' | 'pending';
  type?: 'text' | 'image' | 'voice' | 'file';
  content?: string;
  duration?: number;
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
  
  // Helper function to render message status icon
  const renderMessageStatus = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-primary" />
            <Check className="h-3 w-3 -ml-1 text-primary" />
          </div>
        );
      case 'pending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  // Process messages to add status
  const processedMessages = messages.map(message => {
    if (message.senderId === 'current-user' && !message.status) {
      // Add random status for demo purposes
      const statuses = ['sent', 'delivered', 'read', 'pending'];
      return {
        ...message,
        status: statuses[Math.floor(Math.random() * statuses.length)] as 'sent' | 'delivered' | 'read' | 'pending'
      };
    }
    return message;
  });
  
  // Re-group processed messages
  const processedGroupedMessages: { [key: string]: Message[] } = {};
  processedMessages.forEach(message => {
    if (!processedGroupedMessages[message.date]) {
      processedGroupedMessages[message.date] = [];
    }
    processedGroupedMessages[message.date].push(message);
  });
  
  return (
    <div className="flex-1 flex flex-col bg-secondary/10">
      {/* Chat Header */}
      <div className="py-3 px-4 border-b border-border bg-background flex items-center justify-between shadow-sm backdrop-blur-sm bg-background/90 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full md:hidden mr-1 hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="relative group">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-background transition-all duration-300 group-hover:ring-primary/20"
            />
            {contact.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-medium flex items-center">
              {contact.name}
              {contact.role === 'trainer' && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">
                  Trainer
                </span>
              )}
            </h3>
            <span className="text-xs text-muted-foreground flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${contact.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              {contact.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-secondary text-primary/80 hover:text-primary transition-colors" 
                aria-label="Voice call"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice call</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-secondary text-primary/80 hover:text-primary transition-colors" 
                aria-label="Video call"
              >
                <Video className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Video call</TooltipContent>
          </Tooltip>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" aria-label="More options">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Chat options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View contact info</DropdownMenuItem>
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Block contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-secondary/5 to-secondary/20">
        {Object.entries(processedGroupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                {date}
              </span>
            </div>
            
            {dateMessages.map((message, index) => {
              const isCurrentUser = message.senderId === 'current-user';
              const isConsecutive = index > 0 && dateMessages[index - 1].senderId === message.senderId;
              
              return (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex animate-fade-in",
                    isCurrentUser ? "justify-end" : "justify-start",
                    isConsecutive ? "mt-1" : "mt-4"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {!isCurrentUser && !isConsecutive && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                      <img 
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {!isCurrentUser && isConsecutive && <div className="w-8 mr-2"></div>}
                  
                  <div 
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm transition-all hover:shadow-md",
                      isCurrentUser 
                        ? "bg-primary text-primary-foreground rounded-br-sm" 
                        : "bg-white dark:bg-black/60 rounded-bl-sm"
                    )}
                  >
                    <p className="break-words">{message.text}</p>
                    <div 
                      className={cn(
                        "text-xs flex items-center justify-end mt-1 gap-1",
                        isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      <span>{message.time}</span>
                      {isCurrentUser && renderMessageStatus(message.status)}
                    </div>
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
