import { SecurityMetrics } from '@/components/dashboard/security-metrics';
import { SecurityChart } from '@/components/dashboard/security-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Eye,
  Clock
} from 'lucide-react';

interface AlertItemProps {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  time: string;
  source: string;
}

function AlertItem({ title, severity, time, source }: AlertItemProps) {
  const severityColors = {
    critical: 'destructive',
    high: 'secondary',
    medium: 'outline',
    low: 'default'
  } as const;

  return (
    <div className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <AlertTriangle className={`h-4 w-4 mt-0.5 ${
        severity === 'critical' ? 'text-critical' :
        severity === 'high' ? 'text-warning' :
        severity === 'medium' ? 'text-warning' :
        'text-muted-foreground'
      }`} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <Badge variant={severityColors[severity]} className="text-xs">
            {severity.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
          <span>•</span>
          <span>{source}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const recentAlerts = [
    {
      id: '1',
      title: 'Suspicious AI model inference patterns detected',
      severity: 'critical' as const,
      time: '2 minutes ago',
      source: 'ML Monitor'
    },
    {
      id: '2', 
      title: 'High memory usage in training cluster',
      severity: 'high' as const,
      time: '15 minutes ago',
      source: 'Resource Monitor'
    },
    {
      id: '3',
      title: 'New vulnerability detected in TensorFlow dependency',
      severity: 'medium' as const,
      time: '1 hour ago',
      source: 'Vulnerability Scanner'
    },
    {
      id: '4',
      title: 'Compliance check completed successfully',
      severity: 'low' as const,
      time: '2 hours ago',
      source: 'Compliance Engine'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Security Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage your AI/ML security posture in real-time
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button className="bg-gradient-primary">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Monitor
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <SecurityMetrics />

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Security Chart */}
        <SecurityChart />
        
        {/* Recent Alerts */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Recent Security Alerts</span>
              <Badge variant="destructive" className="ml-auto">
                {recentAlerts.filter(a => a.severity === 'critical').length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertItem key={alert.id} {...alert} />
            ))}
            <Button variant="ghost" className="w-full mt-4">
              View all alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Asset Discovery</h3>
                <p className="text-sm text-muted-foreground">Scan for new AI/ML assets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Vulnerability Scan</h3>
                <p className="text-sm text-muted-foreground">Run security assessment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Compliance Report</h3>
                <p className="text-sm text-muted-foreground">Generate compliance summary</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}