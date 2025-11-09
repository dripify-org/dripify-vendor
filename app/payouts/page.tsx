'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Download, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const transactions = [
  {
    id: 'TXN-001',
    orderId: '#ORD-001',
    date: '2024-01-15',
    amount: 1398,
    commission: 139.80,
    netAmount: 1258.20,
    status: 'completed',
    settlementDate: '2024-01-16'
  },
  {
    id: 'TXN-002',
    orderId: '#ORD-002',
    date: '2024-01-15',
    amount: 1999,
    commission: 199.90,
    netAmount: 1799.10,
    status: 'completed',
    settlementDate: '2024-01-16'
  },
  {
    id: 'TXN-003',
    orderId: '#ORD-003',
    date: '2024-01-14',
    amount: 2799,
    commission: 279.90,
    netAmount: 2519.10,
    status: 'pending',
    settlementDate: '2024-01-17'
  },
  {
    id: 'TXN-004',
    orderId: '#ORD-004',
    date: '2024-01-14',
    amount: 4999,
    commission: 499.90,
    netAmount: 4499.10,
    status: 'processing',
    settlementDate: '2024-01-17'
  },
  {
    id: 'TXN-005',
    orderId: '#ORD-005',
    date: '2024-01-13',
    amount: 2097,
    commission: 209.70,
    netAmount: 1887.30,
    status: 'completed',
    settlementDate: '2024-01-14'
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className?: string, icon: React.ComponentType<any> }> = {
    completed: { variant: "secondary", className: "bg-green-100 text-green-700", icon: CheckCircle },
    processing: { variant: "secondary", className: "bg-blue-100 text-blue-700", icon: Clock },
    pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-700", icon: AlertCircle }
  };
  
  const config = variants[status] || { variant: "outline", icon: AlertCircle };
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function PayoutsPage() {
  const totalBalance = 8250;
  const pendingAmount = 6018.20;
  const completedAmount = 3145.50;
  const totalCommission = 849.30;

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
            <p className="text-gray-600">Track your earnings and settlements</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Current Balance
              </CardTitle>
              <Wallet className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalBalance.toLocaleString()}</div>
              <p className="text-xs text-gray-600 mt-1">Available for withdrawal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Settlement
              </CardTitle>
              <Clock className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-gray-600 mt-1">To be settled soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                This Month
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{completedAmount.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Commission
              </CardTitle>
              <Calendar className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹{totalCommission.toLocaleString()}</div>
              <p className="text-xs text-gray-600 mt-1">Platform fees (10%)</p>
            </CardContent>
          </Card>
        </div>

        {/* Last Settlement Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Last Settlement</CardTitle>
            <CardDescription>Most recent payout to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Settlement Date</p>
                <p className="font-medium">January 16, 2024</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-medium text-green-600">₹3,057.30</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Orders</p>
                <p className="font-medium">2 orders</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Status</p>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Download Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All your earnings and settlements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{transaction.orderId}</p>
                      <p className="text-xs text-gray-500">{transaction.id}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                      <p className="text-xs text-gray-500">Settlement: {transaction.settlementDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{transaction.amount}</p>
                      <p className="text-xs text-red-600">-₹{transaction.commission} commission</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">₹{transaction.netAmount}</p>
                      <p className="text-xs text-gray-500">Net amount</p>
                    </div>
                    <div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                Load More Transactions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payout Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payout Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Frequency</span>
                  <span className="text-sm font-medium">Daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Next Payout</span>
                  <span className="text-sm font-medium">Jan 17, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bank Account</span>
                  <span className="text-sm font-medium">****1234</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Change Bank Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Commission Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Platform Fee</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Gateway</span>
                  <span className="text-sm font-medium">2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">GST</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-medium">
                    <span className="text-sm">Total Deduction</span>
                    <span className="text-sm">~12.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}