
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

interface RecentChatsListProps {
  chats: ChatContact[];
  onChatSelect: (id: string) => void;
}

const RecentChatsList = ({ chats, onChatSelect }: RecentChatsListProps) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white dark:bg-black">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-medium flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Recent Chats
        </h3>
        <span className="text-xs text-muted-foreground">
          {chats.length} conversations
        </span>
      </div>

      <div className="divide-y divide-border max-h-[320px] overflow-y-auto">
        {chats.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            <p>No recent conversations</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-3 hover:bg-secondary/50 cursor-pointer transition-colors"
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={cn(
                    "font-medium truncate",
                    chat.unread > 0 && "text-foreground"
                  )}>
                    {chat.name}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {chat.lastMessageTime}
                  </span>
                </div>
                <p className={cn(
                  "text-sm truncate",
                  chat.unread > 0 ? "text-foreground" : "text-muted-foreground"
                )}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentChatsList;
