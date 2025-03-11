
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface SessionRequest {
  id: string;
  member: {
    name: string;
    avatar: string;
  };
  requestDate: string;
  requestTime: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface SessionRequestsTableProps {
  requests: SessionRequest[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const SessionRequestsTable = ({
  requests,
  onAccept,
  onReject,
}: SessionRequestsTableProps) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-border rounded-xl bg-background">
        <h3 className="font-medium text-lg">No pending session requests</h3>
        <p className="text-muted-foreground mt-1">Requests from members will appear here</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-border rounded-xl bg-white dark:bg-black">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-4 py-3 text-left font-medium text-sm">Member</th>
              <th className="px-4 py-3 text-left font-medium text-sm">Date & Time</th>
              <th className="px-4 py-3 text-left font-medium text-sm">Message</th>
              <th className="px-4 py-3 text-right font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={request.member.avatar}
                      alt={request.member.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{request.member.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      {request.requestDate}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      {request.requestTime}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm line-clamp-2">{request.message || 'No message'}</p>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 dark:border-green-900 dark:hover:bg-green-900/30"
                      onClick={() => onAccept(request.id)}
                    >
                      <CheckCircle className="mr-1 h-3.5 w-3.5" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-900/30"
                      onClick={() => onReject(request.id)}
                    >
                      <XCircle className="mr-1 h-3.5 w-3.5" />
                      Reject
                    </Button>
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

export default SessionRequestsTable;
