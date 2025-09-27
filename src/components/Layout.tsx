import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Heart,
  Brain,
  Siren,
  Building2,
  Route,
  BarChart3,
  Settings,
  Menu,
  X,
  Droplets,
  AlertTriangle,
  LogOut,
  Bot,
  Truck,
  ArrowRightLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Filter menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { name: 'Donor Management', href: '/donors', icon: Users },
        { name: 'Recipients/Patients', href: '/recipients', icon: Heart },
        { name: 'AI Matching', href: '/ai-matching', icon: Bot },
        { name: 'Emergency SOS', href: '/emergency', icon: Siren },
        { name: 'Hospital Network', href: '/hospital-connectivity', icon: ArrowRightLeft },
        { name: 'Hospitals/Blood Banks', href: '/hospitals', icon: Building2 },
        { name: 'Logistics/Routing', href: '/logistics', icon: Truck },
        { name: 'Reports/Analytics', href: '/reports', icon: BarChart3 },
        { name: 'Settings/Admin', href: '/settings', icon: Settings },
      ];
    } else if (user?.role === 'doctor') {
      return [
        ...baseItems,
        { name: 'Donor Management', href: '/donors', icon: Users },
        { name: 'Recipients/Patients', href: '/recipients', icon: Heart },
        { name: 'Emergency SOS', href: '/emergency', icon: Siren },
        { name: 'AI Matching', href: '/ai-matching', icon: Bot },
        { name: 'Hospital Network', href: '/hospital-connectivity', icon: ArrowRightLeft },
      ];
    } else {
      // Patient/Donor view
      return [
        ...baseItems,
        { name: 'Emergency SOS', href: '/emergency', icon: Siren },
        { name: 'Settings', href: '/settings', icon: Settings },
      ];
    }
  };

  const sidebarItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-muted">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-30 h-full w-64 transform bg-card border-r border-border shadow-elegant transition-transform lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-primary" />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  LifeLink
                </span>
                {user && (
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role} - {user.name}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                    isActive ? "nav-active" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Emergency Alert */}
          <div className="p-4">
            <div className="card-emergency p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-emergency animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-emergency">Emergency Active</p>
                  <p className="text-xs text-muted-foreground">3 urgent requests</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between bg-card border-b border-border px-6 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}