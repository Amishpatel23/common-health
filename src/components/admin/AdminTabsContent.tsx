
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminUsersTab from './AdminUsersTab';
import AdminSessionsTab from './AdminSessionsTab';
import AdminPaymentsTab from './AdminPaymentsTab';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'trainer' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Session {
  id: string;
  member: string;
  trainer: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'canceled';
}

interface Payment {
  id: string;
  user: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: 'credit_card' | 'paypal' | 'bank_transfer';
}

interface AdminTabsContentProps {
  users: User[];
  sessions: Session[];
  payments: Payment[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleUserAction: (userId: string, action: string) => void;
  handleSessionAction: (sessionId: string, action: string) => void;
  handlePaymentAction: (paymentId: string, action: string) => void;
}

const AdminTabsContent = ({
  users,
  sessions,
  payments,
  searchQuery,
  setSearchQuery,
  handleUserAction,
  handleSessionAction,
  handlePaymentAction
}: AdminTabsContentProps) => {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      
      {/* Users Tab */}
      <TabsContent value="users">
        <AdminUsersTab 
          users={users}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleUserAction={handleUserAction}
        />
      </TabsContent>
      
      {/* Sessions Tab */}
      <TabsContent value="sessions">
        <AdminSessionsTab 
          sessions={sessions}
          handleSessionAction={handleSessionAction}
        />
      </TabsContent>
      
      {/* Payments Tab */}
      <TabsContent value="payments">
        <AdminPaymentsTab 
          payments={payments}
          handlePaymentAction={handlePaymentAction}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabsContent;
