
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Download, CreditCard, CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  method: 'credit_card' | 'paypal' | 'bank_transfer';
  description: string;
  reference: string;
  trainer?: {
    name: string;
    avatar: string;
  };
}

const PaymentHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call to fetch payment history
    const fetchPayments = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPayments = [
        {
          id: 'pay_001',
          date: '2023-05-15',
          amount: 65.00,
          status: 'paid' as const,
          method: 'credit_card' as const,
          description: 'Session with Jessica Williams',
          reference: 'INV-2023-001',
          trainer: {
            name: 'Jessica Williams',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          },
        },
        {
          id: 'pay_002',
          date: '2023-05-10',
          amount: 55.00,
          status: 'paid' as const,
          method: 'paypal' as const,
          description: 'Session with Mike Thompson',
          reference: 'INV-2023-002',
          trainer: {
            name: 'Mike Thompson',
            avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
          },
        },
        {
          id: 'pay_003',
          date: '2023-05-05',
          amount: 60.00,
          status: 'paid' as const,
          method: 'credit_card' as const,
          description: 'Session with Emma Davis',
          reference: 'INV-2023-003',
          trainer: {
            name: 'Emma Davis',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          },
        },
        {
          id: 'pay_004',
          date: '2023-04-28',
          amount: 99.00,
          status: 'paid' as const,
          method: 'credit_card' as const,
          description: 'Monthly Membership Fee',
          reference: 'MEM-2023-042',
        },
        {
          id: 'pay_005',
          date: '2023-06-01',
          amount: 65.00,
          status: 'pending' as const,
          method: 'bank_transfer' as const,
          description: 'Session with Jessica Williams',
          reference: 'INV-2023-004',
          trainer: {
            name: 'Jessica Williams',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          },
        },
      ];
      
      setPayments(mockPayments);
      setIsLoading(false);
    };
    
    fetchPayments();
  }, []);
  
  const handleDownloadInvoice = (paymentId: string) => {
    toast({
      description: "Invoice download started",
    });
  };
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Render status badge
  const renderStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Paid</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render payment method icon
  const renderPaymentMethod = (method: Payment['method']) => {
    switch (method) {
      case 'credit_card':
        return (
          <div className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span>Credit Card</span>
          </div>
        );
      case 'paypal':
        return (
          <div className="flex items-center gap-1">
            <span className="text-[#0070BA] font-bold">Pay</span>
            <span className="text-[#003087] font-bold">Pal</span>
          </div>
        );
      case 'bank_transfer':
        return (
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span>Bank Transfer</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 lg:pl-64">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md shimmer mb-2 w-48"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md shimmer w-64"></div>
          </div>
          
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="h-12 bg-gray-200 dark:bg-gray-800 shimmer w-full"></div>
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md shimmer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 lg:pl-64">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Payments & Billing</h1>
          <p className="text-muted-foreground">View your payment history and manage your billing information</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current membership plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Premium</span>
                  <span className="font-semibold text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Billing cycle</span>
                  <span>Monthly</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Next payment</span>
                  <span>June 15, 2023</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span>Amount</span>
                  <span>$99.00</span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-[#1434CB] rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 05/25</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Manage Payment Methods
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>Your current billing address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium">Sarah Wilson</p>
                  <p>123 Fitness St</p>
                  <p>Exercise City, CA 90210</p>
                  <p>United States</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Update Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Tabs defaultValue="all">
            <div className="border-b px-4">
              <TabsList className="h-12">
                <TabsTrigger value="all" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  All Transactions
                </TabsTrigger>
                <TabsTrigger value="sessions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Session Payments
                </TabsTrigger>
                <TabsTrigger value="membership" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Membership Fees
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {formatDate(payment.date)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {payment.trainer && (
                            <img 
                              src={payment.trainer.avatar} 
                              alt={payment.trainer.name} 
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          <span>{payment.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                      <TableCell>{renderPaymentMethod(payment.method)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDownloadInvoice(payment.id)}
                          className="text-muted-foreground"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="sessions" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter(payment => payment.trainer)
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {formatDate(payment.date)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {payment.trainer && (
                              <img 
                                src={payment.trainer.avatar} 
                                alt={payment.trainer.name} 
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            )}
                            <span>{payment.description}</span>
                          </div>
                        </TableCell>
                        <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                        <TableCell>{renderPaymentMethod(payment.method)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDownloadInvoice(payment.id)}
                            className="text-muted-foreground"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="membership" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter(payment => !payment.trainer)
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {formatDate(payment.date)}
                        </TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                        <TableCell>{renderPaymentMethod(payment.method)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDownloadInvoice(payment.id)}
                            className="text-muted-foreground"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
