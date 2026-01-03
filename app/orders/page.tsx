'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Clock, 
  CheckCircle, 
  XCircle,
  Package,
  Truck,
  Eye,
  Phone,
  MapPin,
  Timer
} from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import Image from 'next/image';

const orders = {
  pending: [
    {
      id: '#ORD-001',
      customer: {
        name: 'Sarah Johnson',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bangalore, Karnataka 560001'
      },
      items: [
        {
          id: 1,
          name: 'Premium Cotton T-Shirt',
          image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=100',
          variant: 'M, Blue',
          quantity: 2,
          price: 699
        }
      ],
      total: 1398,
      timeLeft: 118, // seconds
      orderTime: '10:30 AM'
    },
    {
      id: '#ORD-002',
      customer: {
        name: 'Michael Chen',
        phone: '+91 98765 43211',
        address: '456 Brigade Road, Bangalore, Karnataka 560025'
      },
      items: [
        {
          id: 2,
          name: 'Casual Denim Jeans',
          image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=100',
          variant: '32, Blue',
          quantity: 1,
          price: 1999
        }
      ],
      total: 1999,
      timeLeft: 45,
      orderTime: '10:45 AM'
    }
  ],
  preparing: [
    {
      id: '#ORD-003',
      customer: {
        name: 'Emma Davis',
        phone: '+91 98765 43212',
        address: '789 Commercial Street, Bangalore, Karnataka 560001'
      },
      items: [
        {
          id: 3,
          name: 'Running Sports Shoes',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100',
          variant: '8, Black',
          quantity: 1,
          price: 2799
        }
      ],
      total: 2799,
      acceptedAt: '11:15 AM',
      estimatedReady: '12:30 PM'
    }
  ],
  ready: [
    {
      id: '#ORD-004',
      customer: {
        name: 'James Wilson',
        phone: '+91 98765 43213',
        address: '321 Infantry Road, Bangalore, Karnataka 560001'
      },
      items: [
        {
          id: 4,
          name: 'Wireless Headphones',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
          variant: 'Black',
          quantity: 1,
          price: 4999
        }
      ],
      total: 4999,
      readyAt: '11:45 AM'
    }
  ],
  completed: [
    {
      id: '#ORD-005',
      customer: {
        name: 'Lisa Anderson',
        phone: '+91 98765 43214',
        address: '654 Koramangala, Bangalore, Karnataka 560034'
      },
      items: [
        {
          id: 1,
          name: 'Premium Cotton T-Shirt',
          image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=100',
          variant: 'L, White',
          quantity: 3,
          price: 699
        }
      ],
      total: 2097,
      completedAt: '9:30 AM',
      deliveredAt: '10:15 AM'
    }
  ]
};

function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className={`flex items-center space-x-1 ${timeLeft < 60 ? 'text-red-600' : 'text-orange-600'}`}>
      <Timer className="h-3 w-3" />
      <span className="text-xs font-mono">
        {minutes}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

function OrderCard({ order, status }: { order: any, status: string }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAction = (action: string) => {
    console.log(`${action} order ${order.id}`);
    // Handle order action
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Order Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{order.id}</h3>
                <p className="text-sm text-gray-600">{order.customer.name}</p>
              </div>
              {status === 'pending' && (
                <CountdownTimer seconds={order.timeLeft} />
              )}
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 relative rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.variant} × {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Total: ₹{order.total}</span>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                      <DialogDescription>Complete order information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Customer Info */}
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Customer Information
                        </h4>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-gray-600">{order.customer.phone}</p>
                          <p className="text-sm text-gray-600 flex items-start">
                            <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                            {order.customer.address}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2">
                        <h4 className="font-medium">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item: any) => (
                            <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                              <div className="w-16 h-16 relative rounded">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.variant}</p>
                                <p className="text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{item.price * item.quantity}</p>
                                <p className="text-sm text-gray-600">₹{item.price} each</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total Amount</span>
                          <span>₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {status === 'pending' && (
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      onClick={() => handleAction('accept')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleAction('reject')}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {status === 'preparing' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleAction('ready')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Package className="h-3 w-3 mr-1" />
                    Mark Ready
                  </Button>
                )}

                {status === 'ready' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleAction('dispatch')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Truck className="h-3 w-3 mr-1" />
                    Dispatch
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const getTabCounts = () => ({
    pending: orders.pending.length,
    preparing: orders.preparing.length,
    ready: orders.ready.length,
    completed: orders.completed.length
  });

  const counts = getTabCounts();

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage your customer orders</p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{counts.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{counts.preparing}</div>
              <div className="text-sm text-gray-600">Preparing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{counts.ready}</div>
              <div className="text-sm text-gray-600">Ready</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{counts.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="relative">
              Pending
              {counts.pending > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                  {counts.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="preparing" className="relative">
              Preparing
              {counts.preparing > 0 && (
                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-700">
                  {counts.preparing}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ready" className="relative">
              Ready
              {counts.ready > 0 && (
                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700">
                  {counts.ready}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4">
              {orders.pending.map((order) => (
                <OrderCard key={order.id} order={order} status="pending" />
              ))}
            </div>
            {orders.pending.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No pending orders
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4">
            <div className="grid gap-4">
              {orders.preparing.map((order) => (
                <OrderCard key={order.id} order={order} status="preparing" />
              ))}
            </div>
            {orders.preparing.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No orders being prepared
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ready" className="space-y-4">
            <div className="grid gap-4">
              {orders.ready.map((order) => (
                <OrderCard key={order.id} order={order} status="ready" />
              ))}
            </div>
            {orders.ready.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No orders ready for dispatch
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {orders.completed.map((order) => (
                <OrderCard key={order.id} order={order} status="completed" />
              ))}
            </div>
            {orders.completed.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No completed orders
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}