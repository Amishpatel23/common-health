
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import AdminStats from '@/components/admin/AdminStats';
import AdminCharts from '@/components/admin/AdminCharts';
import AdminActionBar from '@/components/admin/AdminActionBar';
import AdminTabsContent from '@/components/admin/AdminTabsContent';
import { useAuth } from '@/contexts/AuthContext';

// Import mock data from separate file
import { 
  mockUsers, 
  mockSessions, 
  mockPayments, 
  mockRevenueData, 
  mockSessionsData,
  User,
  Session,
  Payment
} from '@/data/mockData';

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if user has admin role
    if (user && user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, navigate, toast]);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(session => session.status === 'completed').length;
  const totalRevenue = payments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "Opening user creation form...",
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Preparing data export...",
    });
  };
  
  const handleUserAction = (userId: string, action: string) => {
    toast({
      description: `${action} user with ID: ${userId}`,
    });
  };
  
  const handleSessionAction = (sessionId: string, action: string) => {
    toast({
      description: `${action} session with ID: ${sessionId}`,
    });
  };
  
  const handlePaymentAction = (paymentId: string, action: string) => {
    toast({
      description: `${action} payment with ID: ${paymentId}`,
    });
  };
  
  return (
    <AdminDashboardLayout 
      title="Admin Dashboard"
      description="Manage users, sessions, and payments"
      showBackButton={false}
    >
      <AdminActionBar 
        handleAddUser={handleAddUser}
        handleExportData={handleExportData}
      />
      
      <AdminStats 
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        totalSessions={totalSessions}
        completedSessions={completedSessions}
        totalRevenue={totalRevenue}
      />
      
      <AdminCharts 
        revenueData={mockRevenueData} 
        sessionsData={mockSessionsData} 
      />
      
      <AdminTabsContent 
        users={filteredUsers}
        sessions={sessions}
        payments={payments}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleUserAction={handleUserAction}
        handleSessionAction={handleSessionAction}
        handlePaymentAction={handlePaymentAction}
      />
    </AdminDashboardLayout>
  );
};

export default AdminPanel;
