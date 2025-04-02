
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Plus, MessageSquare, Filter, ArrowDownUp, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

type FilterOption = 'all' | 'unread' | 'online' | 'trainers' | 'members';
type SortOption = 'recent' | 'unread' | 'alphabetical';

const ChatSidebar = ({ contacts, selectedContactId, onContactSelect }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>(['all']);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  
  // Handle filter changes
  const toggleFilter = (filter: FilterOption) => {
    if (filter === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.filter(f => f !== 'all');
      
      if (newFilters.includes(filter)) {
        // Remove this filter if it's already active
        setActiveFilters(newFilters.filter(f => f !== filter));
        
        // If no filters left, set back to 'all'
        if (newFilters.length === 1) {
          setActiveFilters(['all']);
        }
      } else {
        // Add this filter
        setActiveFilters([...newFilters, filter]);
      }
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters(['all']);
    setSortBy('recent');
    setShowOnlyUnread(false);
    setSearchQuery('');
  };
  
  // Apply filters and sorting to contacts
  let filteredContacts = contacts;
  
  // Apply text search
  if (searchQuery) {
    filteredContacts = filteredContacts.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Apply filters (skip if 'all' is selected)
  if (!activeFilters.includes('all')) {
    if (activeFilters.includes('unread')) {
      filteredContacts = filteredContacts.filter(contact => contact.unread > 0);
    }
    
    if (activeFilters.includes('online')) {
      filteredContacts = filteredContacts.filter(contact => contact.isOnline);
    }
    
    if (activeFilters.includes('trainers')) {
      filteredContacts = filteredContacts.filter(contact => contact.role === 'trainer');
    }
    
    if (activeFilters.includes('members')) {
      filteredContacts = filteredContacts.filter(contact => contact.role === 'member');
    }
  }
  
  // Apply "Show only unread" filter
  if (showOnlyUnread) {
    filteredContacts = filteredContacts.filter(contact => contact.unread > 0);
  }
  
  // Apply sorting
  filteredContacts = [...filteredContacts].sort((a, b) => {
    if (sortBy === 'recent') {
      // Simple sort by time (in a real app, you would use actual timestamps)
      return a.lastMessageTime > b.lastMessageTime ? -1 : 1;
    } else if (sortBy === 'unread') {
      return b.unread - a.unread;
    } else if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  
  // Calculate if any filters are active
  const isFiltering = !activeFilters.includes('all') || showOnlyUnread || sortBy !== 'recent' || searchQuery;
  
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
            className="rounded-full hover:bg-secondary/80 transition-colors relative"
            aria-label="New chat"
          >
            <Plus className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              className="pl-8 bg-secondary/30 border-secondary focus-visible:ring-primary/30 pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full hover:bg-secondary"
                onClick={() => setSearchQuery('')}
              >
                <XCircle className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Filter dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant={isFiltering ? "default" : "outline"} 
                    size="sm" 
                    className="gap-1 h-8 relative px-3"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    <span className="text-xs">Filter</span>
                    {isFiltering && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter by</h4>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="unread" 
                            checked={activeFilters.includes('unread')} 
                            onCheckedChange={() => toggleFilter('unread')}
                          />
                          <Label htmlFor="unread">Unread messages</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="online" 
                            checked={activeFilters.includes('online')} 
                            onCheckedChange={() => toggleFilter('online')}
                          />
                          <Label htmlFor="online">Online contacts</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="trainers" 
                            checked={activeFilters.includes('trainers')} 
                            onCheckedChange={() => toggleFilter('trainers')}
                          />
                          <Label htmlFor="trainers">Trainers only</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="members" 
                            checked={activeFilters.includes('members')} 
                            onCheckedChange={() => toggleFilter('members')}
                          />
                          <Label htmlFor="members">Members only</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 h-8 px-3"
                  >
                    <ArrowDownUp className="h-3.5 w-3.5" />
                    <span className="text-xs">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Sort conversations</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem 
                    checked={sortBy === 'recent'}
                    onCheckedChange={() => setSortBy('recent')}
                  >
                    Most recent
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={sortBy === 'unread'}
                    onCheckedChange={() => setSortBy('unread')}
                  >
                    Most unread
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={sortBy === 'alphabetical'}
                    onCheckedChange={() => setSortBy('alphabetical')}
                  >
                    Alphabetical
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Unread only toggle */}
            <div className="flex items-center gap-1 text-xs">
              <Switch 
                id="unread-only" 
                className="scale-75 data-[state=checked]:bg-primary"
                checked={showOnlyUnread}
                onCheckedChange={setShowOnlyUnread}
              />
              <Label htmlFor="unread-only" className="text-xs cursor-pointer">
                Unread
              </Label>
            </div>
          </div>
          
          {/* Active filters display */}
          {isFiltering && (
            <div className="flex flex-wrap gap-1.5">
              {!activeFilters.includes('all') && activeFilters.map(filter => (
                <Badge key={filter} variant="outline" className="text-xs py-0 h-5 pr-1 gap-1 group">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-3 w-3 rounded-full p-0 hover:bg-background" 
                    onClick={() => toggleFilter(filter)}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {sortBy !== 'recent' && (
                <Badge variant="outline" className="text-xs py-0 h-5 pr-1 gap-1 group">
                  Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-3 w-3 rounded-full p-0 hover:bg-background" 
                    onClick={() => setSortBy('recent')}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {showOnlyUnread && (
                <Badge variant="outline" className="text-xs py-0 h-5 pr-1 gap-1 group">
                  Unread only
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-3 w-3 rounded-full p-0 hover:bg-background" 
                    onClick={() => setShowOnlyUnread(false)}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                className="text-xs h-5 py-0 px-1.5 hover:bg-secondary" 
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
            <MessageSquare className="w-10 h-10 mb-2 text-muted-foreground/60" />
            <p className="font-medium mb-1">No conversations found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
            {isFiltering && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={clearFilters} 
                className="mt-2"
              >
                Clear all filters
              </Button>
            )}
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
                    className={cn(
                      "w-12 h-12 rounded-full object-cover border-2 transition-all",
                      selectedContactId === contact.id 
                        ? "border-primary" 
                        : "border-transparent hover:border-primary/50"
                    )}
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
