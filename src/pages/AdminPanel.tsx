
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import AdminStats from '@/components/admin/AdminStats';
import AdminCharts from '@/components/admin/AdminCharts';
import AdminActionBar from '@/components/admin/AdminActionBar';
import AdminTabsContent from '@/components/admin/AdminTabsContent';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [filter, setFilter] = useState('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'member',
    status: 'active',
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if user has admin role - strict check specifically for our one admin
    if (!user || user.email !== 'amish0609@gmail.com') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, navigate, toast]);
  
  // Filter users based on search query and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || user.role === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(session => session.status === 'completed').length;
  const totalRevenue = payments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };
  
  const handleCreateUser = () => {
    const id = `user-${Date.now()}`;
    const newUserData: User = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'member' | 'trainer' | 'admin',
      status: newUser.status as 'active' | 'inactive',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUserData]);
    setIsAddUserModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'member',
      status: 'active',
    });
    
    toast({
      title: "User Created",
      description: `${newUser.name} has been added as a ${newUser.role}`,
    });
  };
  
  const handleExportData = () => {
    const formattedData = JSON.stringify(users, null, 2);
    const blob = new Blob([formattedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Data",
      description: "User data has been exported successfully",
    });
  };
  
  const handleUserAction = (userId: string, action: string) => {
    if (action === 'Delete') {
      setUsers(users.filter(u => u.id !== userId));
      toast({
        description: `User deleted successfully`,
      });
    } else if (action === 'Activate' || action === 'Deactivate') {
      setUsers(users.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            status: action === 'Activate' ? 'active' : 'inactive'
          };
        }
        return u;
      }));
      
      toast({
        description: `User ${action === 'Activate' ? 'activated' : 'deactivated'} successfully`,
      });
    } else {
      toast({
        description: `${action} user with ID: ${userId}`,
      });
    }
  };
  
  const handleSessionAction = (sessionId: string, action: string) => {
    if (action === 'Delete') {
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast({
        description: `Session deleted successfully`,
      });
    } else {
      toast({
        description: `${action} session with ID: ${sessionId}`,
      });
    }
  };
  
  const handlePaymentAction = (paymentId: string, action: string) => {
    if (action === 'Delete') {
      setPayments(payments.filter(p => p.id !== paymentId));
      toast({
        description: `Payment record deleted successfully`,
      });
    } else {
      toast({
        description: `${action} payment with ID: ${paymentId}`,
      });
    }
  };

  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
  };
  
  const filterOptions = ['member', 'trainer', 'admin'];
  
  return (
    <AdminDashboardLayout 
      title="Admin Dashboard"
      description="Manage users, sessions, and payments"
      showBackButton={false}
    >
      <AdminActionBar 
        handleAddUser={handleAddUser}
        handleExportData={handleExportData}
        handleFilter={handleFilter}
        showFilter={true}
        filterOptions={filterOptions}
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

      {/* Add User Modal */}
      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={newUser.name} 
                onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                placeholder="Full Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={newUser.email} 
                onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                placeholder="email@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newUser.status} 
                onValueChange={(value) => setNewUser({...newUser, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AdminPanel;
