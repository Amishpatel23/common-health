
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatConversation from '@/components/chat/ChatConversation';
import { MessageSquare } from 'lucide-react';

// Mock data for conversations
const mockContacts = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'trainer',
    lastMessage: 'Looking forward to our session!',
    lastMessageTime: '10:23 AM',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'trainer',
    lastMessage: "Don't forget to stay hydrated before our next session.",
    lastMessageTime: 'Yesterday',
    unread: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Mike Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    role: 'trainer',
    lastMessage: 'I sent you the nutrition plan',
    lastMessageTime: '2 days ago',
    unread: 0,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Rachel Kim',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    role: 'member',
    lastMessage: 'Great job today!',
    lastMessageTime: 'Tuesday',
    unread: 0,
    isOnline: false,
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'trainer',
    lastMessage: 'Do you want to schedule another session this week?',
    lastMessageTime: 'Monday',
    unread: 0,
    isOnline: true,
  },
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: 'm1',
    senderId: '1',
    text: 'Hi there! How are you feeling today?',
    time: '10:00 AM',
    date: 'Today',
  },
  {
    id: 'm2',
    senderId: 'current-user',
    text: "I'm doing great! Ready for our session today.",
    time: '10:05 AM',
    date: 'Today',
  },
  {
    id: 'm3',
    senderId: '1',
    text: 'Perfect! Remember to bring water and wear comfortable clothes.',
    time: '10:08 AM',
    date: 'Today',
  },
  {
    id: 'm4',
    senderId: 'current-user',
    text: 'Already prepared everything. See you soon!',
    time: '10:15 AM',
    date: 'Today',
  },
  {
    id: 'm5',
    senderId: '1',
    text: 'Great! Looking forward to our session!',
    time: '10:23 AM',
    date: 'Today',
  },
];

const Chat = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(mockContacts[0].id);
  const [messages, setMessages] = useState(mockMessages);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const { toast } = useToast();
  
  const selectedContact = contacts.find(contact => contact.id === selectedContactId) || null;
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Add a small delay before showing content animation
      setTimeout(() => {
        setContentLoaded(true);
      }, 100);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    
    // Mark messages as read when selecting a contact
    setContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, unread: 0 } : contact
    ));
  };
  
  const handleSendMessage = (text: string) => {
    if (!text.trim() || !selectedContactId) return;
    
    const newMessage = {
      id: `m${messages.length + 1}`,
      senderId: 'current-user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
    };
    
    setMessages([...messages, newMessage]);
    
    toast({
      description: "Message sent",
    });
    
    // Simulate receiving a response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: `m${messages.length + 2}`,
        senderId: selectedContactId,
        text: "Got your message! I'll respond shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today',
      };
      
      setMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 3000);
  };
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        
        <div className="flex-1 pt-16 lg:pl-64">
          <DashboardSidebar />
          
          <main className="h-[calc(100vh-4rem)]">
            <div className="h-full flex border-t border-border">
              <div className="w-80 border-r border-border bg-background shimmer"></div>
              <div className="flex-1 bg-secondary/30 shimmer"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        <DashboardSidebar />
        
        <main className="h-[calc(100vh-4rem)]">
          <div 
            className={`h-full flex border-t border-border ${
              contentLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}
          >
            {/* Chat Sidebar with Contact List */}
            <ChatSidebar 
              contacts={contacts}
              selectedContactId={selectedContactId}
              onContactSelect={handleContactSelect}
            />
            
            {/* Main Chat Area */}
            {selectedContact ? (
              <ChatConversation
                contact={selectedContact}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-6 bg-secondary/30">
                <div className="text-center animate-fade-in glass-effect p-8 rounded-xl">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary/70" />
                  <h3 className="text-xl font-medium mb-2">Select a contact to start chatting</h3>
                  <p className="text-muted-foreground">Choose from your contacts on the left to begin a conversation</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
