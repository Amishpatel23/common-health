
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Video,
  AlertTriangle
} from 'lucide-react';

interface Session {
  id: string;
  trainer: string;
  member: string;
  date: string;
  time: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  duration: string;
}

interface SessionsTableProps {
  sessions: Session[];
  onViewDetails: (sessionId: string) => void;
  onJoinSession: (sessionId: string) => void;
}

const SessionsTable = ({ sessions, onViewDetails, onJoinSession }: SessionsTableProps) => {
  return (
    <div className="w-full overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trainer</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.trainer}</TableCell>
              <TableCell>{session.member}</TableCell>
              <TableCell>{`${session.date} at ${session.time}`}</TableCell>
              <TableCell>{session.duration}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    session.status === 'in_progress'
                      ? 'destructive'
                      : session.status === 'upcoming'
                      ? 'default'
                      : session.status === 'completed'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {session.status === 'in_progress' 
                    ? 'In Progress' 
                    : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </Badge>
                {session.status === 'in_progress' && (
                  <div className="inline-flex items-center ml-2">
                    <span className="animate-pulse relative flex h-2 w-2 rounded-full bg-red-600 mr-1"></span>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(session.id)}
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {session.status === 'in_progress' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onJoinSession(session.id)}
                      title="Join Session"
                    >
                      <Video className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionsTable;
