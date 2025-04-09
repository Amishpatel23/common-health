
import React, { useState } from 'react';
import TrainerDashboardSidebar from '@/components/TrainerDashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, DollarSign, BarChart4 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const earningsData = {
  total: 1240,
  thisMonth: 320,
  pending: 320,
  sessions: {
    completed: 42,
    thisMonth: 8,
  },
  recentTransactions: [
    { id: 1, client: 'Emily Wilson', date: '2023-06-01', amount: 60, status: 'paid' },
    { id: 2, client: 'John Davis', date: '2023-06-03', amount: 45, status: 'paid' },
    { id: 3, client: 'Sarah Miller', date: '2023-06-05', amount: 60, status: 'paid' },
    { id: 4, client: 'Robert Johnson', date: '2023-06-08', amount: 75, status: 'processing' },
    { id: 5, client: 'Linda Garcia', date: '2023-06-10', amount: 60, status: 'pending' },
  ],
  upcomingPayouts: [
    { id: 1, date: '2023-06-15', amount: 165, sessions: 3 },
    { id: 2, date: '2023-06-30', amount: 155, sessions: 3 },
  ],
  monthlyEarnings: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [320, 280, 360, 400, 380, 320],
  },
};

const TrainerEarnings = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const chartData = {
    labels: earningsData.monthlyEarnings.labels,
    datasets: [
      {
        label: 'Monthly Earnings ($)',
        data: earningsData.monthlyEarnings.data,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  // Helper function to determine badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'processing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <TrainerDashboardSidebar />
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto lg:pl-64 pt-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Earnings</h1>
            <p className="text-muted-foreground mt-1">
              Track your income, sessions, and upcoming payouts.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                      Total Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${earningsData.total}</div>
                    <p className="text-sm text-muted-foreground">${earningsData.thisMonth} this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-500" />
                      Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{earningsData.sessions.completed}</div>
                    <p className="text-sm text-muted-foreground">{earningsData.sessions.thisMonth} this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                      Pending Payout
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${earningsData.pending}</div>
                    <p className="text-sm text-muted-foreground">Next payout: Jun 15</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart4 className="h-5 w-5 mr-2 text-blue-500" />
                      Avg. Session Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$55</div>
                    <p className="text-sm text-muted-foreground">+$5 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings Trend</CardTitle>
                  <CardDescription>Your monthly earnings for the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest 5 sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earningsData.recentTransactions.slice(0, 5).map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.client}</TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>${transaction.amount}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button variant="ghost" size="sm" className="mt-4 w-full">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Complete history of your training sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Session Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earningsData.recentTransactions.map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.client}</TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>1-on-1 Training</TableCell>
                          <TableCell>${transaction.amount}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payouts</CardTitle>
                  <CardDescription>Scheduled transfers to your bank account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earningsData.upcomingPayouts.map(payout => (
                        <TableRow key={payout.id}>
                          <TableCell>{formatDate(payout.date)}</TableCell>
                          <TableCell>{payout.sessions}</TableCell>
                          <TableCell>${payout.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Scheduled</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payout Settings</CardTitle>
                  <CardDescription>Update your payout preferences and bank details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Bank Account</p>
                      <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Payout Schedule</p>
                      <p className="text-sm text-muted-foreground">Bi-weekly on the 15th and last day</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Tax Information</p>
                      <p className="text-sm text-muted-foreground">W-9 on file</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TrainerEarnings;
