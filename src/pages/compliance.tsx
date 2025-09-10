import { FileCheck, Download, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FrameworkCardProps {
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  score: number;
  requirements: number;
  compliant_requirements: number;
  lastAssessment: string;
}

function FrameworkCard({ 
  name, 
  description, 
  status, 
  score, 
  requirements, 
  compliant_requirements, 
  lastAssessment 
}: FrameworkCardProps) {
  const statusColors = {
    compliant: 'default',
    partial: 'secondary', 
    non_compliant: 'destructive'
  } as const;

  const statusIcons = {
    compliant: CheckCircle,
    partial: Clock,
    non_compliant: AlertCircle
  };

  const StatusIcon = statusIcons[status];

  return (
    <Card className="hover:shadow-elevated transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <Badge variant={statusColors[status]} className="capitalize">
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Compliance Score</span>
            <span className="font-medium">{score}%</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Requirements Met</span>
          <span className="font-medium">
            {compliant_requirements}/{requirements}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Assessment</span>
          <span className="font-medium">{lastAssessment}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface ComplianceRequirementProps {
  id: string;
  title: string;
  framework: string;
  status: 'met' | 'partial' | 'not_met';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  dueDate?: string;
}

function ComplianceRequirement({ 
  title, 
  framework, 
  status, 
  priority, 
  description, 
  dueDate 
}: ComplianceRequirementProps) {
  const statusColors = {
    met: 'default',
    partial: 'secondary',
    not_met: 'destructive'
  } as const;

  const priorityColors = {
    low: 'text-muted-foreground',
    medium: 'text-warning',
    high: 'text-warning',
    critical: 'text-critical'
  };

  return (
    <div className="border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{framework}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={`text-xs ${priorityColors[priority]}`}
          >
            {priority.toUpperCase()}
          </Badge>
          <Badge variant={statusColors[status]} className="text-xs capitalize">
            {status.replace('_', ' ')}
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-foreground">{description}</p>
      
      {dueDate && (
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Due: {dueDate}</span>
        </div>
      )}
    </div>
  );
}

export default function Compliance() {
  const frameworks = [
    {
      name: 'NIST AI Risk Management Framework',
      description: 'Comprehensive framework for AI risk management and governance',
      status: 'partial' as const,
      score: 73,
      requirements: 45,
      compliant_requirements: 33,
      lastAssessment: '1 week ago'
    },
    {
      name: 'ISO/IEC 23053:2022',
      description: 'Framework for AI risk management in organizations',
      status: 'compliant' as const,
      score: 92,
      requirements: 28,
      compliant_requirements: 26,
      lastAssessment: '3 days ago'
    },
    {
      name: 'GDPR AI Compliance',
      description: 'General Data Protection Regulation requirements for AI systems',
      status: 'non_compliant' as const,
      score: 45,
      requirements: 32,
      compliant_requirements: 14,
      lastAssessment: '2 weeks ago'
    },
    {
      name: 'CCPA AI Requirements', 
      description: 'California Consumer Privacy Act compliance for AI applications',
      status: 'partial' as const,
      score: 68,
      requirements: 22,
      compliant_requirements: 15,
      lastAssessment: '5 days ago'
    }
  ];

  const requirements = [
    {
      id: '1',
      title: 'AI Model Documentation and Transparency',
      framework: 'NIST AI RMF',
      status: 'not_met' as const,
      priority: 'high' as const,
      description: 'Maintain comprehensive documentation of AI model architecture, training data, and decision logic.',
      dueDate: 'Dec 15, 2024'
    },
    {
      id: '2',
      title: 'Data Privacy Impact Assessment',
      framework: 'GDPR AI Compliance',
      status: 'partial' as const,
      priority: 'critical' as const,
      description: 'Complete DPIA for all AI systems processing personal data.',
      dueDate: 'Nov 30, 2024'
    },
    {
      id: '3',
      title: 'Algorithmic Bias Testing and Mitigation',
      framework: 'ISO/IEC 23053:2022',
      status: 'met' as const,
      priority: 'high' as const,
      description: 'Implement regular testing for algorithmic bias and establish mitigation procedures.'
    },
    {
      id: '4',
      title: 'Consumer Rights Implementation',
      framework: 'CCPA AI Requirements',
      status: 'partial' as const,
      priority: 'medium' as const,
      description: 'Provide consumers with rights to opt-out of AI-based decision making.',
      dueDate: 'Jan 15, 2025'
    }
  ];

  const totalFrameworks = frameworks.length;
  const compliantFrameworks = frameworks.filter(f => f.status === 'compliant').length;
  const partialFrameworks = frameworks.filter(f => f.status === 'partial').length;
  const averageScore = Math.round(frameworks.reduce((sum, f) => sum + f.score, 0) / frameworks.length);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Compliance Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and maintain compliance across AI governance frameworks and regulations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary">
            <FileCheck className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileCheck className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Frameworks</p>
                <p className="text-2xl font-bold">{totalFrameworks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Compliant</p>
                <p className="text-2xl font-bold text-success">{compliantFrameworks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-warning" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Partial</p>
                <p className="text-2xl font-bold text-warning">{partialFrameworks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-primary rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-primary">{averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Frameworks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Compliance Frameworks</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {frameworks.map((framework, index) => (
            <FrameworkCard key={index} {...framework} />
          ))}
        </div>
      </div>

      {/* Outstanding Requirements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Outstanding Requirements</h2>
        <div className="space-y-4">
          {requirements.map((requirement) => (
            <ComplianceRequirement key={requirement.id} {...requirement} />
          ))}
        </div>
      </div>
    </div>
  );
}