
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  isOnline: boolean;
}

interface ChatSidebarProps {
  contacts: ChatContact[];
  selectedContactId: string | null;
  onContactSelect: (id: string) => void;
}

const ChatSidebar = ({ contacts, selectedContactId, onContactSelect }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="w-full md:w-80 border-r border-border flex flex-col bg-background h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-primary" />
            Messages
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="New chat"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-8 bg-secondary/30 border-secondary focus-visible:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
            <MessageSquare className="w-10 h-10 mb-2 text-muted-foreground/60" />
            <p className="font-medium mb-1">No conversations found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer transition-all duration-200",
                  selectedContactId === contact.id 
                    ? "bg-secondary/70" 
                    : "hover:bg-secondary/40"
                )}
                onClick={() => onContactSelect(contact.id)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-transparent transition-all"
                    style={{
                      borderColor: selectedContactId === contact.id ? 'hsl(var(--primary))' : 'transparent'
                    }}
                  />
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></span>
                  )}
                  {contact.unread > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-bold rounded-full animate-pulse">
                      {contact.unread}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "font-medium truncate",
                      contact.unread > 0 ? "text-foreground font-semibold" : ""
                    )}>
                      {contact.name}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className={cn(
                      "text-sm truncate",
                      contact.unread > 0 ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {contact.lastMessage}
                    </p>
                    {contact.role === 'trainer' && (
                      <span className="ml-1 text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                        Trainer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
