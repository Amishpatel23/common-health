
import React from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import UsersTable from './UsersTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'trainer' | 'admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinDate: string;
}

interface AdminUsersTabProps {
  users: User[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleUserAction: (userId: string, action: string) => void;
}

const AdminUsersTab = ({ 
  users, 
  searchQuery, 
  setSearchQuery, 
  handleUserAction 
}: AdminUsersTabProps) => {
  // Count statistics
  const memberCount = users.filter(user => user.role === 'member').length;
  const trainerCount = users.filter(user => user.role === 'trainer').length;
  const adminCount = users.filter(user => user.role === 'admin').length;
  const activeCount = users.filter(user => user.status === 'active').length;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription className="mt-1">
              Manage user accounts, roles, and permissions.
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-md">
                {memberCount} Members
              </span>
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-md">
                {trainerCount} Trainers
              </span>
              <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded-md">
                {adminCount} Admins
              </span>
              <span className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 px-2 py-0.5 rounded-md">
                {activeCount} Active
              </span>
            </div>
          </div>
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
      </CardHeader>
      <CardContent>
        <UsersTable 
          users={users} 
          onEdit={(userId) => handleUserAction(userId, 'Edit')}
          onSuspend={(userId) => {
            const user = users.find(u => u.id === userId);
            const action = user?.status === 'active' ? 'Deactivate' : 'Activate';
            handleUserAction(userId, action);
          }}
          onDelete={(userId) => handleUserAction(userId, 'Delete')}
        />
      </CardContent>
    </Card>
  );
};

export default AdminUsersTab;
