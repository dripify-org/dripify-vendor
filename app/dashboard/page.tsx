'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  DollarSign, 
  RotateCcw, 
  Wallet,
  TrendingUp,
  Eye,
  Clock
} from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const metrics = [
  {
    title: "Today's Orders",
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: ShoppingCart,
    description: 'vs yesterday'
  },
  {
    title: 'Sales Today',
    value: '₹12,450',
    change: '+8%',
    changeType: 'positive',
    icon: DollarSign,
    description: 'vs yesterday'
  },
  {
    title: 'Pending Returns',
    value: '3',
    change: '-2',
    changeType: 'neutral',
    icon: RotateCcw,
    description: 'vs yesterday'
  },
  {
    title: 'Wallet Balance',
    value: '₹8,250',
    change: '+₹1,200',
    changeType: 'positive',
    icon: Wallet,
    description: 'available'
  }
];

const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'Sarah Johnson',
    items: '2 items',
    amount: '₹1,250',
    status: 'pending',
    time: '2 mins ago'
  },
  {
    id: '#ORD-002',
    customer: 'Michael Chen',
    items: '1 item',
    amount: '₹899',
    status: 'preparing',
    time: '15 mins ago'
  },
  {
    id: '#ORD-003',
    customer: 'Emma Davis',
    items: '3 items',
    amount: '₹2,100',
    status: 'ready',
    time: '32 mins ago'
  },
  {
    id: '#ORD-004',
    customer: 'James Wilson',
    items: '1 item',
    amount: '₹750',
    status: 'completed',
    time: '1 hour ago'
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className?: string }> = {
    pending: { variant: "destructive" },
    preparing: { variant: "secondary", className: "bg-yellow-100 text-yellow-700" },
    ready: { variant: "secondary", className: "bg-blue-100 text-blue-700" },
    completed: { variant: "secondary", className: "bg-green-100 text-green-700" }
  };
  
  const config = variants[status] || { variant: "outline" };
  return (
    <Badge variant={config.variant} className={config.className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&lsquo;s what&lsquo;s happening with your store.</p>
        </div>

        {/* Notification Banner */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">3 orders awaiting acceptance</p>
                  <p className="text-sm text-orange-600">Act quickly to avoid auto-rejection</p>
                </div>
              </div>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <span className={`flex items-center ${
                      metric.changeType === 'positive' ? 'text-green-600' : 
                      metric.changeType === 'negative' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {metric.changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {metric.change}
                    </span>
                    <span>{metric.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-600">{order.items}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{order.amount}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{order.time}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Orders</span>
                  <span className="text-sm font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm font-medium">₹45,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Order</span>
                  <span className="text-sm font-medium">₹356</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Premium T-Shirt</span>
                  <span className="text-sm font-medium">45 sold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Casual Jeans</span>
                  <span className="text-sm font-medium">32 sold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sports Shoes</span>
                  <span className="text-sm font-medium">28 sold</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inventory Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low Stock</span>
                  <Badge variant="destructive">5 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Out of Stock</span>
                  <Badge variant="secondary">2 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Needs Reorder</span>
                  <Badge variant="outline">3 items</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}