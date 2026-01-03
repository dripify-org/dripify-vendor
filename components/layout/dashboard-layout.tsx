import Sidebar from './sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}