import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  Download, 
  Users, 
  Calendar, 
  CreditCard, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import LineChart from '@/components/admin/LineChart';

// Types
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

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'member',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'trainer',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'member',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'trainer',
    status: 'active',
    joinDate: '2023-01-05',
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex@example.com',
    role: 'member',
    status: 'active',
    joinDate: '2023-04-18',
  },
];

const mockSessions: Session[] = [
  {
    id: '101',
    member: 'John Doe',
    trainer: 'Jane Smith',
    date: '2023-06-01',
    time: '10:00 AM',
    status: 'completed',
  },
  {
    id: '102',
    member: 'Alex Brown',
    trainer: 'Sarah Williams',
    date: '2023-06-05',
    time: '2:30 PM',
    status: 'upcoming',
  },
  {
    id: '103',
    member: 'Mike Johnson',
    trainer: 'Jane Smith',
    date: '2023-05-28',
    time: '4:00 PM',
    status: 'canceled',
  },
  {
    id: '104',
    member: 'John Doe',
    trainer: 'Sarah Williams',
    date: '2023-06-10',
    time: '11:15 AM',
    status: 'upcoming',
  },
];

const mockPayments: Payment[] = [
  {
    id: '201',
    user: 'John Doe',
    amount: 50,
    date: '2023-06-01',
    status: 'completed',
    method: 'credit_card',
  },
  {
    id: '202',
    user: 'Alex Brown',
    amount: 75,
    date: '2023-06-03',
    status: 'completed',
    method: 'paypal',
  },
  {
    id: '203',
    user: 'Mike Johnson',
    amount: 50,
    date: '2023-05-25',
    status: 'failed',
    method: 'credit_card',
  },
  {
    id: '204',
    user: 'John Doe',
    amount: 100,
    date: '2023-06-08',
    status: 'pending',
    method: 'bank_transfer',
  },
];

const mockRevenueData = [
  { month: 'Jan', revenue: 2400, users: 24 },
  { month: 'Feb', revenue: 1398, users: 13 },
  { month: 'Mar', revenue: 9800, users: 98 },
  { month: 'Apr', revenue: 3908, users: 39 },
  { month: 'May', revenue: 4800, users: 48 },
  { month: 'Jun', revenue: 3800, users: 38 },
  { month: 'Jul', revenue: 4300, users: 43 },
];

const mockSessionsData = [
  { month: 'Jan', completed: 65, canceled: 5 },
  { month: 'Feb', completed: 59, canceled: 4 },
  { month: 'Mar', completed: 80, canceled: 7 },
  { month: 'Apr', completed: 81, canceled: 6 },
  { month: 'May', completed: 56, canceled: 3 },
  { month: 'Jun', completed: 55, canceled: 2 },
  { month: 'Jul', completed: 40, canceled: 1 },
];

const AdminPanel = () => {
  const [users, setUsers] = useState(mockUsers as User[]);
  const [sessions, setSessions] = useState(mockSessions as Session[]);
  const [payments, setPayments] = useState(mockPayments as Payment[]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        {/* Sidebar (desktop-only) */}
        <DashboardSidebar />
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage users, sessions, and payments
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button onClick={handleAddUser}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeUsers} active users
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSessions}</div>
                <p className="text-xs text-muted-foreground">
                  {completedSessions} completed sessions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3%</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>-3.2% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
              data={mockRevenueData}
              title="Revenue & User Growth"
              xAxisDataKey="month"
              lines={[
                { dataKey: "revenue", stroke: "#3b82f6", name: "Revenue ($)" },
                { dataKey: "users", stroke: "#10b981", name: "New Users" }
              ]}
            />
            <LineChart
              data={mockSessionsData}
              title="Session Statistics"
              xAxisDataKey="month"
              lines={[
                { dataKey: "completed", stroke: "#3b82f6", name: "Completed Sessions" },
                { dataKey: "canceled", stroke: "#ef4444", name: "Canceled Sessions" }
              ]}
            />
          </div>
          
          {/* Tabs for Users, Sessions, Payments */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>User Management</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search users..."
                        className="pl-8 w-full sm:w-[250px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Manage user accounts, roles, and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`capitalize ${
                              user.role === 'admin' 
                                ? 'text-purple-600' 
                                : user.role === 'trainer' 
                                  ? 'text-blue-600' 
                                  : ''
                            }`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, 'View')}>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, 'Edit')}>
                                  Edit user
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, user.status === 'active' ? 'Deactivate' : 'Activate')}
                                  className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}
                                >
                                  {user.status === 'active' ? 'Deactivate' : 'Activate'} user
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Sessions Tab */}
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Session Management</CardTitle>
                  <CardDescription>
                    View and manage all training sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Trainer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.id}</TableCell>
                          <TableCell>{session.member}</TableCell>
                          <TableCell>{session.trainer}</TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              session.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : session.status === 'upcoming'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {session.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleSessionAction(session.id, 'View')}>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSessionAction(session.id, 'Reschedule')}>
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleSessionAction(session.id, 'Cancel')}
                                  className="text-red-600"
                                >
                                  Cancel session
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Management</CardTitle>
                  <CardDescription>
                    View and manage all payment transactions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.user}</TableCell>
                          <TableCell>${payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="capitalize">{payment.method.replace('_', ' ')}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              payment.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : payment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handlePaymentAction(payment.id, 'View')}>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePaymentAction(payment.id, 'Receipt')}>
                                  Generate receipt
                                </DropdownMenuItem>
                                {payment.status === 'pending' && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handlePaymentAction(payment.id, 'Process')}
                                      className="text-green-600"
                                    >
                                      Process payment
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {payment.status === 'failed' && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handlePaymentAction(payment.id, 'Retry')}
                                      className="text-blue-600"
                                    >
                                      Retry payment
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
