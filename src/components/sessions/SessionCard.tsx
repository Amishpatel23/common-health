
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';

interface SessionCardProps {
  session: {
    _id: string;
    id?: string;
    title: string;
    trainer: string | { firstName: string; lastName: string; _id: string };
    date: string;
    duration: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'missed';
    rating?: number;
  };
  formatDate: (dateString: string) => string;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, formatDate }) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTrainerName = (trainer: string | { firstName: string; lastName: string; _id: string }) => {
    if (typeof trainer === 'string') {
      return trainer;
    }
    return `${trainer.firstName} ${trainer.lastName}`;
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{session.title}</CardTitle>
          {getStatusBadge(session.status)}
        </div>
        <CardDescription className="flex items-center gap-1">
          <User size={14} /> {getTrainerName(session.trainer)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-sm">{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm">{session.duration} minutes</span>
          </div>
          
          {session.rating && (
            <div className="flex items-center gap-1 mt-2">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill={i < session.rating ? "gold" : "none"} 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
