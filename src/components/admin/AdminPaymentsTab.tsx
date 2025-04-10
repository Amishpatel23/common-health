
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
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
import { Button } from '@/components/ui/button';

interface Payment {
  id: string;
  user: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: 'credit_card' | 'paypal' | 'bank_transfer';
}

interface AdminPaymentsTabProps {
  payments: Payment[];
  handlePaymentAction: (paymentId: string, action: string) => void;
}

const AdminPaymentsTab = ({ payments, handlePaymentAction }: AdminPaymentsTabProps) => {
  return (
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
  );
};

export default AdminPaymentsTab;
