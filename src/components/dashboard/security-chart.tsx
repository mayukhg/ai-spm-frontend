import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SecurityChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Security Trend Analysis</span>
          <div className="flex items-center space-x-4 ml-auto text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-muted-foreground">Security Score</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-muted-foreground">Vulnerabilities</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-critical rounded-full" />
              <span className="text-muted-foreground">Threats</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Security Analytics</p>
            <p className="text-xs text-muted-foreground">Chart visualization coming soon</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}