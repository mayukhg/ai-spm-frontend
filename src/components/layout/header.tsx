import { Bell, Search, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets, vulnerabilities, alerts..."
            className="pl-10 bg-muted/50 border-muted-foreground/20"
          />
        </div>
      </div>

      {/* Status and Notifications */}
      <div className="flex items-center space-x-4">
        {/* System Status */}
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-muted-foreground">All systems operational</span>
        </div>

        {/* Security Alert */}
        <Button variant="outline" size="sm" className="text-warning border-warning/20 hover:bg-warning/10">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>3 Critical Alerts</span>
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs"
            >
              5
            </Badge>
          </Button>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.role.replace('_', ' ').toUpperCase()}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}