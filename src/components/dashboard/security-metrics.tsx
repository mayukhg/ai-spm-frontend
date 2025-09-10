import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  status: 'critical' | 'warning' | 'success' | 'info';
  icon: React.ComponentType<{ className?: string }>;
}

function MetricCard({ title, value, change, trend, status, icon: Icon }: MetricCardProps) {
  const statusColors = {
    critical: 'text-critical',
    warning: 'text-warning',
    success: 'text-success',
    info: 'text-info'
  };

  const badgeColors = {
    critical: 'destructive',
    warning: 'secondary',
    success: 'default',
    info: 'secondary'
  } as const;

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${
        status === 'critical' ? 'from-critical/5 to-transparent' :
        status === 'warning' ? 'from-warning/5 to-transparent' :
        status === 'success' ? 'from-success/5 to-transparent' :
        'from-info/5 to-transparent'
      }`} />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${statusColors[status]}`} />
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <TrendingUp className={`h-3 w-3 ${trend === 'up' ? 'text-success' : 'text-critical rotate-180'}`} />
          <span>{change}</span>
          <Badge variant={badgeColors[status]} className="text-xs">
            {status.toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function SecurityMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Security Score"
        value="87%"
        change="+2.1% from last week"
        trend="up"
        status="success"
        icon={Shield}
      />
      <MetricCard
        title="Active Vulnerabilities"
        value="23"
        change="-5 from yesterday"
        trend="down"
        status="warning"
        icon={AlertTriangle}
      />
      <MetricCard
        title="Assets Monitored"
        value="156"
        change="+12 new assets"
        trend="up"
        status="info"
        icon={CheckCircle}
      />
      <MetricCard
        title="Critical Alerts"
        value="3"
        change="+1 from last hour"
        trend="up"
        status="critical"
        icon={AlertTriangle}
      />
    </div>
  );
}