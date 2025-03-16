
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
    <div className="w-full md:w-80 border-r border-border flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Messages</h2>
          <button 
            className="p-1 rounded-full hover:bg-secondary"
            aria-label="New chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p>No conversations found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer transition-colors",
                  selectedContactId === contact.id 
                    ? "bg-secondary" 
                    : "hover:bg-secondary/50"
                )}
                onClick={() => onContactSelect(contact.id)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                  )}
                  {contact.unread > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "font-medium truncate",
                      contact.unread > 0 && "text-foreground"
                    )}>
                      {contact.name}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm truncate",
                    contact.unread > 0 ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {contact.lastMessage}
                  </p>
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
