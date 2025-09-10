import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  Server, 
  FileCheck, 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Security Dashboard',
    href: '/',
    icon: BarChart3,
  },
  {
    name: 'AI Assets',
    href: '/ai-assets',
    icon: Server,
  },
  {
    name: 'Vulnerabilities',
    href: '/vulnerabilities',
    icon: AlertTriangle,
    badge: 12,
  },
  {
    name: 'Real-time Monitoring',
    href: '/monitoring',
    icon: Shield,
  },
  {
    name: 'Compliance',
    href: '/compliance',
    icon: FileCheck,
    roles: ['ciso', 'compliance_officer'],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const filteredNavigation = navigationItems.filter(item => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  );

  return (
    <div className={cn(
      "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">AI-SPM</h1>
              <p className="text-xs text-muted-foreground">Security Posture</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isActive && "bg-primary/10 text-primary border-primary/20",
                  isCollapsed && "px-2 justify-center"
                )}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="h-5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-2 border-t border-border">
          {!isCollapsed && (
            <div className="p-3 mb-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.role.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            onClick={() => logoutMutation.mutate(undefined)}
            disabled={logoutMutation.isPending}
            className={cn(
              "w-full justify-start h-10 px-3 text-muted-foreground hover:text-foreground",
              isCollapsed && "px-2 justify-center"
            )}
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && "Sign Out"}
          </Button>
        </div>
      )}
    </div>
  );
}