
import React from 'react';
import { Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/BackButton';

interface AdminActionBarProps {
  handleAddUser: () => void;
  handleExportData: () => void;
  showBackButton?: boolean;
}

const AdminActionBar = ({ handleAddUser, handleExportData, showBackButton = true }: AdminActionBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {showBackButton && <BackButton />}
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
