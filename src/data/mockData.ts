
// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'trainer' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Session {
  id: string;
  member: string;
  trainer: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'canceled';
}

export interface Payment {
  id: string;
  user: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: 'credit_card' | 'paypal' | 'bank_transfer';
}

// Mock data
export const mockUsers: User[] = [
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

export const mockSessions: Session[] = [
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

export const mockPayments: Payment[] = [
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

export const mockRevenueData = [
  { month: 'Jan', revenue: 2400, users: 24 },
  { month: 'Feb', revenue: 1398, users: 13 },
  { month: 'Mar', revenue: 9800, users: 98 },
  { month: 'Apr', revenue: 3908, users: 39 },
  { month: 'May', revenue: 4800, users: 48 },
  { month: 'Jun', revenue: 3800, users: 38 },
  { month: 'Jul', revenue: 4300, users: 43 },
];

export const mockSessionsData = [
  { month: 'Jan', completed: 65, canceled: 5 },
  { month: 'Feb', completed: 59, canceled: 4 },
  { month: 'Mar', completed: 80, canceled: 7 },
  { month: 'Apr', completed: 81, canceled: 6 },
  { month: 'May', completed: 56, canceled: 3 },
  { month: 'Jun', completed: 55, canceled: 2 },
  { month: 'Jul', completed: 40, canceled: 1 },
];
