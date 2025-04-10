
import React from 'react';
import { Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminActionBarProps {
  handleAddUser: () => void;
  handleExportData: () => void;
}

const AdminActionBar = ({ handleAddUser, handleExportData }: AdminActionBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {/* No need for back button on main admin dashboard */}
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
  );
};

export default AdminActionBar;
