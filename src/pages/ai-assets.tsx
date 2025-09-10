import { Server, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AssetCardProps {
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  risk: 'low' | 'medium' | 'high' | 'critical';
  lastScan: string;
  vulnerabilities: number;
}

function AssetCard({ name, type, status, risk, lastScan, vulnerabilities }: AssetCardProps) {
  const statusColors = {
    active: 'default',
    inactive: 'secondary', 
    maintenance: 'secondary'
  } as const;

  const riskColors = {
    low: 'default',
    medium: 'secondary',
    high: 'destructive',
    critical: 'destructive'
  } as const;

  return (
    <Card className="hover:shadow-elevated transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          <Badge variant={statusColors[status]} className="capitalize">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Risk Level</span>
          <Badge variant={riskColors[risk]} className="capitalize">
            {risk}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Scan</span>
          <span className="font-medium">{lastScan}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Vulnerabilities</span>
          <span className={`font-medium ${vulnerabilities > 0 ? 'text-warning' : 'text-success'}`}>
            {vulnerabilities}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AIAssets() {
  const assets = [
    {
      name: 'Customer Recommendation Engine',
      type: 'TensorFlow Model',
      status: 'active' as const,
      risk: 'medium' as const,
      lastScan: '2 hours ago',
      vulnerabilities: 3
    },
    {
      name: 'Fraud Detection System',
      type: 'PyTorch Model',
      status: 'active' as const,
      risk: 'high' as const,
      lastScan: '1 day ago',
      vulnerabilities: 7
    },
    {
      name: 'Content Moderation AI',
      type: 'Hugging Face Transformer',
      status: 'maintenance' as const,
      risk: 'low' as const,
      lastScan: '5 hours ago',
      vulnerabilities: 1
    },
    {
      name: 'Price Optimization Model',
      type: 'Scikit-learn',
      status: 'active' as const,
      risk: 'critical' as const,
      lastScan: '30 minutes ago',
      vulnerabilities: 12
    },
    {
      name: 'Chatbot Language Model',
      type: 'OpenAI GPT',
      status: 'inactive' as const,
      risk: 'medium' as const,
      lastScan: '3 days ago',
      vulnerabilities: 4
    },
    {
      name: 'Image Recognition API',
      type: 'Custom CNN',
      status: 'active' as const,
      risk: 'low' as const,
      lastScan: '1 hour ago',
      vulnerabilities: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            AI/ML Assets
          </h1>
          <p className="text-muted-foreground">
            Discover, monitor, and manage your AI/ML assets and their security posture
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets by name, type, or status..."
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
              <Server className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold">{assets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-success rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">
                  {assets.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-warning rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-warning">
                  {assets.filter(a => a.risk === 'high' || a.risk === 'critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-critical rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Vulnerabilities</p>
                <p className="text-2xl font-bold text-critical">
                  {assets.reduce((sum, asset) => sum + asset.vulnerabilities, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>
    </div>
  );
}