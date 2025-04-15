
import React from 'react';
import SessionCard from './SessionCard';
import EmptySessionsCard from './EmptySessionsCard';

interface Session {
  _id: string;
  id?: string;
  title: string;
  trainer: string | { firstName: string; lastName: string; _id: string };
  member: string;
  date: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'missed';
  rating?: number;
}

interface SessionsListProps {
  sessions: Session[];
  emptyMessage: string;
  emptySubMessage: string;
  formatDate: (dateString: string) => string;
}

const SessionsList: React.FC<SessionsListProps> = ({ 
  sessions, 
  emptyMessage, 
  emptySubMessage,
  formatDate
}) => {
  if (sessions.length === 0) {
    return (
      <EmptySessionsCard 
        message={emptyMessage} 
        subMessage={emptySubMessage} 
      />
    );
  }

  return (
    <div>
      {sessions.map(session => (
        <SessionCard 
          key={session._id || session.id} 
          session={session} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
};

export default SessionsList;
