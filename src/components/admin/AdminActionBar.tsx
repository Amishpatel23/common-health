
import React from 'react';
import { Download, UserPlus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/BackButton';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminActionBarProps {
  handleAddUser?: () => void;
  handleExportData?: () => void;
  handleFilter?: (filter: string) => void;
  showBackButton?: boolean;
  showAddUser?: boolean;
  showExport?: boolean;
  showFilter?: boolean;
  filterOptions?: string[];
  title?: string;
  subtitle?: string;
}

const AdminActionBar = ({ 
  handleAddUser, 
  handleExportData, 
  handleFilter,
  showBackButton = true,
  showAddUser = true,
  showExport = true,
  showFilter = false,
  filterOptions = [],
  title,
  subtitle
}: AdminActionBarProps) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {showBackButton && <BackButton />}
          {title && (
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {showFilter && filterOptions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filterOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option} 
                    onClick={() => handleFilter && handleFilter(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {showExport && (
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          
          {showAddUser && (
            <Button onClick={handleAddUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminActionBar;
