
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video } from 'lucide-react';

interface Session {
  id: string;
  trainer: {
    name: string;
    avatar: string;
    specialty: string;
  };
  date: string;
  time: string;
  status: 'upcoming' | 'canceled' | 'completed';
}

interface UpcomingSessionsTableProps {
  sessions: Session[];
  onJoin: (sessionId: string) => void;
  onReschedule: (sessionId: string) => void;
  onCancel: (sessionId: string) => void;
}

const UpcomingSessionsTable = ({
  sessions,
  onJoin,
  onReschedule,
  onCancel,
}: UpcomingSessionsTableProps) => {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-border rounded-xl bg-background">
        <h3 className="font-medium text-lg">No upcoming sessions</h3>
        <p className="text-muted-foreground mt-1">Book a session with a trainer to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-border rounded-xl bg-white dark:bg-black">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-4 py-3 text-left font-medium text-sm">Trainer</th>
              <th className="px-4 py-3 text-left font-medium text-sm">Date & Time</th>
              <th className="px-4 py-3 text-left font-medium text-sm">Status</th>
              <th className="px-4 py-3 text-right font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={session.trainer.avatar}
                      alt={session.trainer.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{session.trainer.name}</p>
                      <p className="text-xs text-muted-foreground">{session.trainer.specialty}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      {session.date}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      {session.time}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    session.status === 'upcoming'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : session.status === 'canceled'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {session.status === 'upcoming' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default" 
                          onClick={() => onJoin(session.id)}
                        >
                          <Video className="mr-1 h-3.5 w-3.5" />
                          Join
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onReschedule(session.id)}
                        >
                          Reschedule
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onCancel(session.id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingSessionsTable;
