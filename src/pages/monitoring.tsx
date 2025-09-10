import { Shield, Activity, Eye, AlertTriangle, Cpu, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MonitoringMetricProps {
  title: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}

function MonitoringMetric({ title, value, status, icon: Icon, trend }: MonitoringMetricProps) {
  const statusColors = {
    healthy: 'text-success',
    warning: 'text-warning', 
    critical: 'text-critical'
  };

  const statusBg = {
    healthy: 'bg-success/10',
    warning: 'bg-warning/10',
    critical: 'bg-critical/10'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${statusBg[status]}`}>
              <Icon className={`h-4 w-4 ${statusColors[status]}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <p className="text-xs text-muted-foreground">{trend}</p>
              )}
            </div>
          </div>
          <Badge 
            variant={status === 'healthy' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

interface SecurityEventProps {
  type: 'anomaly' | 'threat' | 'compliance' | 'performance';
  title: string;
  description: string;
  time: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

function SecurityEvent({ type, title, description, time, severity }: SecurityEventProps) {
  const typeIcons = {
    anomaly: AlertTriangle,
    threat: Shield,
    compliance: Eye,
    performance: Activity
  };

  const severityColors = {
    low: 'text-muted-foreground',
    medium: 'text-warning',
    high: 'text-warning', 
    critical: 'text-critical'
  };

  const TypeIcon = typeIcons[type];

  return (
    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="p-1 bg-muted rounded">
        <TypeIcon className={`h-4 w-4 ${severityColors[severity]}`} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <Badge variant={severity === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
            {severity.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

export default function Monitoring() {
  const events = [
    {
      type: 'threat' as const,
      title: 'Suspicious Model Access Pattern',
      description: 'Unusual inference request patterns detected from IP 192.168.1.100',
      time: '2 minutes ago',
      severity: 'high' as const
    },
    {
      type: 'anomaly' as const,
      title: 'Model Performance Degradation',
      description: 'Recommendation model accuracy dropped by 15% in the last hour',
      time: '5 minutes ago', 
      severity: 'medium' as const
    },
    {
      type: 'performance' as const,
      title: 'High Memory Usage Alert',
      description: 'Training cluster memory usage exceeded 85% threshold',
      time: '10 minutes ago',
      severity: 'medium' as const
    },
    {
      type: 'compliance' as const,
      title: 'Data Retention Policy Violation',
      description: 'Training data retained beyond policy limits detected',
      time: '15 minutes ago',
      severity: 'critical' as const
    },
    {
      type: 'anomaly' as const,
      title: 'Unusual Data Access Pattern',
      description: 'Bulk data download detected outside normal business hours',
      time: '20 minutes ago',
      severity: 'high' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Real-time Monitoring
          </h1>
          <p className="text-muted-foreground">
            Monitor AI/ML systems for security threats, anomalies, and performance issues
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
          <Button className="bg-gradient-primary">
            <Activity className="w-4 h-4 mr-2" />
            Live Dashboard
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MonitoringMetric
          title="System Health"
          value="98.5%"
          status="healthy"
          icon={Shield}
          trend="↑ 0.2% from yesterday"
        />
        <MonitoringMetric
          title="Active Threats"
          value="3"
          status="warning" 
          icon={AlertTriangle}
          trend="↑ 1 from last hour"
        />
        <MonitoringMetric
          title="Model Performance"
          value="92.1%"
          status="healthy"
          icon={Activity}
          trend="↓ 0.5% from last hour"
        />
        <MonitoringMetric
          title="Resource Usage"
          value="67%"
          status="healthy"
          icon={Cpu}
          trend="Normal operating range"
        />
      </div>

      {/* Monitoring Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Real-time Events */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Real-time Security Events</span>
              <Badge variant="secondary" className="ml-auto">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((event, index) => (
              <SecurityEvent key={index} {...event} />
            ))}
          </CardContent>
        </Card>

        {/* System Resources */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>System Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span className="font-medium">83%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '83%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage Usage</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Monitors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Model Inference Monitor</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vulnerability Scanner</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Anomaly Detector</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Compliance Checker</span>
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}