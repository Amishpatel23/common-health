
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import StatCard from '@/components/admin/StatCard';
import UsersTable from '@/components/admin/UsersTable';
import SessionsTable from '@/components/admin/SessionsTable';
import PaymentsTable from '@/components/admin/PaymentsTable';
import LineChart from '@/components/admin/LineChart';
import { 
  Users, 
  Video, 
  CreditCard, 
  TrendingUp,
  Search,
  Download,
  FileDown,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';

// Mock data for admin dashboard
const mockUsers = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'trainer', status: 'active', joinDate: 'Jan 15, 2023' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', role: 'member', status: 'active', joinDate: 'Feb 3, 2023' },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', role: 'trainer', status: 'suspended', joinDate: 'Dec 18, 2022' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'member', status: 'active', joinDate: 'Mar 21, 2023' },
  { id: '5', name: 'Chris Wilson', email: 'chris@example.com', role: 'admin', status: 'active', joinDate: 'Nov 5, 2022' },
] as const;

const mockSessions = [
  { id: '101', trainer: 'Alex Johnson', member: 'Sarah Miller', date: 'Today', time: '2:00 PM', status: 'upcoming', duration: '60 min' },
  { id: '102', trainer: 'Emma Davis', member: 'David Williams', date: 'Today', time: '4:30 PM', status: 'in_progress', duration: '45 min' },
  { id: '103', trainer: 'Michael Chen', member: 'Jessica Brown', date: 'Yesterday', time: '10:00 AM', status: 'completed', duration: '30 min' },
  { id: '104', trainer: 'Lisa Anderson', member: 'Robert Martinez', date: 'Jun 10, 2023', time: '1:00 PM', status: 'cancelled', duration: '60 min' },
] as const;

const mockPayments = [
  { id: '201', user: 'Sarah Miller', userRole: 'member', amount: '59.99', date: 'Today', type: 'payment', status: 'completed' },
  { id: '202', user: 'Alex Johnson', userRole: 'trainer', amount: '200.00', date: 'Yesterday', type: 'payout', status: 'pending' },
  { id: '203', user: 'David Williams', userRole: 'member', amount: '29.99', date: 'Jun 8, 2023', type: 'payment', status: 'completed' },
  { id: '204', user: 'Emily Davis', userRole: 'member', amount: '59.99', date: 'Jun 7, 2023', type: 'refund', status: 'pending' },
] as const;

const revenueData = [
  { month: 'Jan', revenue: 4000, users: 100 },
  { month: 'Feb', revenue: 5000, users: 120 },
  { month: 'Mar', revenue: 6000, users: 150 },
  { month: 'Apr', revenue: 7500, users: 180 },
  { month: 'May', revenue: 9000, users: 210 },
  { month: 'Jun', revenue: 10500, users: 250 },
];

const sessionData = [
  { month: 'Jan', completed: 250, cancelled: 20, totalHours: 280 },
  { month: 'Feb', completed: 300, cancelled: 25, totalHours: 350 },
  { month: 'Mar', completed: 370, cancelled: 30, totalHours: 400 },
  { month: 'Apr', completed: 450, cancelled: 35, totalHours: 480 },
  { month: 'May', completed: 520, cancelled: 30, totalHours: 550 },
  { month: 'Jun', completed: 600, cancelled: 25, totalHours: 620 },
];

const AdminPanel = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Opening editor for user ID: ${userId}`,
    });
  };

  const handleSuspendUser = (userId: string) => {
    toast({
      title: "User Status Changed",
      description: "User status has been updated.",
      variant: "destructive"
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User Deleted",
      description: "The user has been removed from the platform.",
      variant: "destructive"
    });
  };

  const handleViewSessionDetails = (sessionId: string) => {
    toast({
      description: `Viewing session details for ID: ${sessionId}`,
    });
  };

  const handleJoinSession = (sessionId: string) => {
    toast({
      title: "Joining Live Session",
      description: "Connecting to video stream...",
    });
  };

  const handleViewPaymentDetails = (paymentId: string) => {
    toast({
      description: `Viewing payment details for ID: ${paymentId}`,
    });
  };

  const handleApprovePayment = (paymentId: string) => {
    toast({
      title: "Payment Approved",
      description: "The payment has been processed successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your data is being prepared for download.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        {/* Sidebar (desktop-only) */}
        <AdminSidebar />
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          {/* Welcome message */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome, Admin!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening on your platform today.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportData}
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Users"
              value="1,456"
              icon={<Users className="h-5 w-5" />}
              description="+12% from last month"
              change={{ value: "12%", positive: true }}
              variant="default"
            />
            <StatCard
              title="Active Sessions"
              value="8"
              icon={<Video className="h-5 w-5" />}
              description="3 more than yesterday"
              change={{ value: "37%", positive: true }}
              variant="success"
            />
            <StatCard
              title="Pending Payments"
              value="$2,450"
              icon={<CreditCard className="h-5 w-5" />}
              description="12 transactions to process"
              change={{ value: "5%", positive: false }}
              variant="warning"
            />
            <StatCard
              title="Total Revenue"
              value="$54,350"
              icon={<TrendingUp className="h-5 w-5" />}
              description="This month's earnings"
              change={{ value: "22%", positive: true }}
              variant="default"
            />
          </div>
          
          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart 
              data={revenueData}
              title="Platform Performance"
              xAxisDataKey="month"
              lines={[
                { dataKey: 'revenue', stroke: '#3b82f6', name: 'Revenue ($)' },
                { dataKey: 'users', stroke: '#10b981', name: 'Active Users' }
              ]}
            />
            <LineChart 
              data={sessionData}
              title="Session Statistics"
              xAxisDataKey="month"
              lines={[
                { dataKey: 'completed', stroke: '#3b82f6', name: 'Completed Sessions' },
                { dataKey: 'cancelled', stroke: '#ef4444', name: 'Cancelled Sessions' },
                { dataKey: 'totalHours', stroke: '#8b5cf6', name: 'Total Hours' }
              ]}
            />
          </div>
          
          {/* Users Management Section */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <UsersTable 
              users={mockUsers}
              onEdit={handleEditUser}
              onSuspend={handleSuspendUser}
              onDelete={handleDeleteUser}
            />
          </div>
          
          {/* Sessions Monitoring Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Session Monitoring</h2>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <SessionsTable 
              sessions={mockSessions}
              onViewDetails={handleViewSessionDetails}
              onJoinSession={handleJoinSession}
            />
          </div>
          
          {/* Payment Management Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Payment Management</h2>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <PaymentsTable 
              payments={mockPayments}
              onViewDetails={handleViewPaymentDetails}
              onApprove={handleApprovePayment}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
