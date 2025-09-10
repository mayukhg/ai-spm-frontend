import { AlertTriangle, Search, Filter, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VulnerabilityItemProps {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved';
  asset: string;
  discovered: string;
  cvss: number;
  description: string;
}

function VulnerabilityItem({ title, severity, status, asset, discovered, cvss, description }: VulnerabilityItemProps) {
  const severityColors = {
    critical: 'destructive',
    high: 'destructive', 
    medium: 'secondary',
    low: 'default'
  } as const;

  const statusColors = {
    open: 'destructive',
    in_progress: 'secondary',
    resolved: 'default'
  } as const;

  const statusIcons = {
    open: AlertTriangle,
    in_progress: Clock,
    resolved: CheckCircle
  };

  const StatusIcon = statusIcons[status];

  return (
    <Card className="hover:shadow-card transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{asset}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={severityColors[severity]} className="capitalize">
              {severity}
            </Badge>
            <Badge variant={statusColors[status]} className="capitalize">
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-muted-foreground">CVSS Score: </span>
              <span className={`font-medium ${
                cvss >= 9 ? 'text-critical' :
                cvss >= 7 ? 'text-warning' :
                cvss >= 4 ? 'text-warning' :
                'text-success'
              }`}>
                {cvss.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Discovered: </span>
              <span className="font-medium">{discovered}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Vulnerabilities() {
  const vulnerabilities = [
    {
      id: '1',
      title: 'Insecure TensorFlow Model Serialization',
      severity: 'critical' as const,
      status: 'open' as const,
      asset: 'Customer Recommendation Engine',
      discovered: '2 hours ago',
      cvss: 9.2,
      description: 'Model files contain serialized code that could execute arbitrary commands during deserialization.'
    },
    {
      id: '2', 
      title: 'Model Poisoning Vulnerability in Training Pipeline',
      severity: 'high' as const,
      status: 'in_progress' as const,
      asset: 'Fraud Detection System',
      discovered: '1 day ago',
      cvss: 8.1,
      description: 'Training data pipeline lacks proper validation, allowing potential model poisoning attacks.'
    },
    {
      id: '3',
      title: 'Outdated PyTorch Version with Known CVEs',
      severity: 'high' as const,
      status: 'open' as const,
      asset: 'Image Recognition API',
      discovered: '3 hours ago',
      cvss: 7.8,
      description: 'Using PyTorch 1.9.0 which contains multiple security vulnerabilities (CVE-2022-45907).'
    },
    {
      id: '4',
      title: 'Insufficient Input Validation in API Endpoint',
      severity: 'medium' as const,
      status: 'resolved' as const,
      asset: 'Chatbot Language Model',
      discovered: '2 days ago',
      cvss: 5.4,
      description: 'API endpoints do not properly validate input size and format, allowing potential DoS attacks.'
    },
    {
      id: '5',
      title: 'Weak Model Access Controls',
      severity: 'medium' as const,
      status: 'open' as const,
      asset: 'Price Optimization Model',
      discovered: '1 day ago',
      cvss: 6.2,
      description: 'Model inference endpoints lack proper authentication and authorization mechanisms.'
    },
    {
      id: '6',
      title: 'Unencrypted Model Storage',
      severity: 'low' as const,
      status: 'in_progress' as const,
      asset: 'Content Moderation AI',
      discovered: '5 days ago',
      cvss: 3.7,
      description: 'Model artifacts stored without encryption, potentially exposing intellectual property.'
    }
  ];

  const openVulns = vulnerabilities.filter(v => v.status === 'open').length;
  const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical').length;
  const inProgressVulns = vulnerabilities.filter(v => v.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Vulnerabilities
          </h1>
          <p className="text-muted-foreground">
            Track, assess, and remediate security vulnerabilities across your AI/ML assets
          </p>
        </div>
        <Button variant="outline">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Run Scan
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vulnerabilities by asset, CVE, or description..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-critical" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Open</p>
                <p className="text-2xl font-bold text-critical">{openVulns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-critical rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-critical">{criticalVulns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-warning" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">{inProgressVulns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-success">
                  {vulnerabilities.filter(v => v.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerabilities List */}
      <div className="space-y-4">
        {vulnerabilities.map((vuln) => (
          <VulnerabilityItem key={vuln.id} {...vuln} />
        ))}
      </div>
    </div>
  );
}