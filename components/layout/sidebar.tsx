'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Settings,
  Menu,
  Store,
  Bell,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, badge: '3' },
  { name: 'Payouts', href: '/payouts', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <Store className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold">VendorHub</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <Badge variant="destructive" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">john@store.com</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="bg-white border-r">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b">
          <div className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold">VendorHub</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}