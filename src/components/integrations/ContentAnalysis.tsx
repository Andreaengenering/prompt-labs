
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContentAnalysisProps {
  connectedPlatformsCount: number;
}

export function ContentAnalysis({ connectedPlatformsCount }: ContentAnalysisProps) {
  if (connectedPlatformsCount === 0) {
    return null;
  }

  return (
    <Card className="gallery-card">
      <CardHeader>
        <CardTitle className="text-foreground">Content Analysis Overview</CardTitle>
        <CardDescription>
          AI-powered insights from your connected platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Top Performing Content Types</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Educational Posts</span>
                <Badge variant="secondary" className="bg-red-600/20 text-red-400">92% engagement</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Behind-the-scenes</span>
                <Badge variant="secondary" className="bg-red-600/20 text-red-400">87% engagement</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Question Posts</span>
                <Badge variant="secondary" className="bg-red-600/20 text-red-400">81% engagement</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Optimization Suggestions</h3>
            <div className="space-y-2">
              <div className="p-3 bg-red-950/20 rounded-lg border border-red-600/30">
                <p className="text-sm font-medium text-red-400">Post Timing</p>
                <p className="text-xs text-foreground">Best engagement at 2-4 PM EST</p>
              </div>
              <div className="p-3 bg-red-950/20 rounded-lg border border-red-600/30">
                <p className="text-sm font-medium text-red-400">Hashtag Strategy</p>
                <p className="text-xs text-foreground">Use 5-7 relevant hashtags for optimal reach</p>
              </div>
              <div className="p-3 bg-red-950/20 rounded-lg border border-red-600/30">
                <p className="text-sm font-medium text-red-400">Content Length</p>
                <p className="text-xs text-foreground">150-200 word posts perform best</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
