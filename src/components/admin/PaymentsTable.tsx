
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Check,
  AlertTriangle
} from 'lucide-react';

interface Payment {
  id: string;
  user: string;
  userRole: 'member' | 'trainer';
  amount: string;
  date: string;
  type: 'payment' | 'payout' | 'refund';
  status: 'pending' | 'completed' | 'failed';
}

interface PaymentsTableProps {
  payments: Payment[];
  onViewDetails: (paymentId: string) => void;
  onApprove: (paymentId: string) => void;
}

const PaymentsTable = ({ payments, onViewDetails, onApprove }: PaymentsTableProps) => {
  return (
    <div className="w-full overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {payment.user}
                <span className="ml-1 text-xs text-muted-foreground">
                  ({payment.userRole === 'trainer' ? 'Trainer' : 'Member'})
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    payment.type === 'payment'
                      ? 'default'
                      : payment.type === 'payout'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    payment.status === 'completed'
                      ? 'default'
                      : payment.status === 'pending'
                      ? 'outline'
                      : 'destructive'
                  }
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(payment.id)}
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {payment.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onApprove(payment.id)}
                      title="Approve"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTable;
