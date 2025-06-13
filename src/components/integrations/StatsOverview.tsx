
import { Card, CardContent } from '@/components/ui/card';
import { Link, BarChart3, TrendingUp, Eye } from 'lucide-react';

interface StatsOverviewProps {
  connectedPlatformsCount: number;
}

export function StatsOverview({ connectedPlatformsCount }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="gallery-card">
        <CardContent className="p-6">
          <div className="flex items-center">
            <Link className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Connected Platforms</p>
              <p className="text-2xl font-bold text-foreground">{connectedPlatformsCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="gallery-card">
        <CardContent className="p-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Content Analyzed</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="gallery-card">
        <CardContent className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Improvement Score</p>
              <p className="text-2xl font-bold text-foreground">94%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="gallery-card">
        <CardContent className="p-6">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-red-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
              <p className="text-2xl font-bold text-foreground">52.3K</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
