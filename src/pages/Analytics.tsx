
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, TrendingUp, Users, Eye, Heart, MessageSquare,
  Calendar, Clock, Target, Zap, Star, ArrowUp, ArrowDown
} from 'lucide-react';

const Analytics = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const performanceData = [
    {
      platform: 'YouTube',
      metric: 'Views',
      value: '45.2K',
      change: '+12.5%',
      trend: 'up',
      color: 'text-red-600'
    },
    {
      platform: 'Instagram',
      metric: 'Engagement',
      value: '8.7%',
      change: '+2.1%',
      trend: 'up',
      color: 'text-red-400'
    },
    {
      platform: 'LinkedIn',
      metric: 'Reach',
      value: '23.4K',
      change: '-3.2%',
      trend: 'down',
      color: 'text-red-600'
    },
    {
      platform: 'Website',
      metric: 'Conversions',
      value: '156',
      change: '+8.9%',
      trend: 'up',
      color: 'text-red-500'
    }
  ];

  const contentInsights = [
    {
      title: 'Best Performing Content',
      type: 'Educational Posts',
      engagement: '94%',
      recommendation: 'Create more how-to content'
    },
    {
      title: 'Optimal Posting Time',
      type: '2:00 PM - 4:00 PM EST',
      engagement: '87%',
      recommendation: 'Schedule posts during peak hours'
    },
    {
      title: 'Top Keywords',
      type: 'AI, Productivity, Marketing',
      engagement: '91%',
      recommendation: 'Focus on trending topics'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            Content Analytics
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Analyze your content performance across all platforms
          </p>
          {user && (
            <p className="text-xs text-muted-foreground mt-1">
              Secure access for {user.email}
            </p>
          )}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {performanceData.map((item, index) => (
            <Card key={index} className="gallery-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.platform}</p>
                    <p className="text-2xl font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.metric}</p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${item.trend === 'up' ? 'text-red-500' : 'text-gray-500'}`}>
                      {item.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      <span className="text-sm font-medium ml-1">{item.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Content Analysis</TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Audience Insights</TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="gallery-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg border border-border">
                      <span className="font-medium text-foreground">Total Reach</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">127K</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg border border-border">
                      <span className="font-medium text-foreground">Engagement Rate</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">8.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg border border-border">
                      <span className="font-medium text-foreground">Content Pieces</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">234</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gallery-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Target className="h-5 w-5 mr-2 text-red-500" />
                    Goal Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-foreground">Monthly Reach Goal</span>
                        <span className="text-sm font-medium text-foreground">84%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-foreground">Engagement Target</span>
                        <span className="text-sm font-medium text-foreground">92%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {contentInsights.map((insight, index) => (
                <Card key={index} className="gallery-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-red-500">{insight.type}</div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-medium text-foreground">{insight.engagement} performance</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="gallery-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Age 25-34</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">42%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Age 35-44</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">28%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Age 18-24</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">20%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Age 45+</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">10%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gallery-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Technology</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">67%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Business</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">54%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Marketing</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">41%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Education</span>
                      <Badge variant="secondary" className="bg-red-600/20 text-red-400">38%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="gallery-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Zap className="h-5 w-5 mr-2 text-red-600" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized suggestions based on your content performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-red-950/20 rounded-lg border border-red-600/30">
                    <h3 className="font-semibold text-red-400 mb-2">Content Strategy</h3>
                    <p className="text-foreground text-sm mb-3">
                      Your educational content performs 40% better than promotional content. Consider creating more tutorial-style posts.
                    </p>
                    <Badge className="bg-red-600 hover:bg-red-700">High Impact</Badge>
                  </div>

                  <div className="p-4 bg-red-950/20 rounded-lg border border-red-600/30">
                    <h3 className="font-semibold text-red-400 mb-2">Posting Schedule</h3>
                    <p className="text-foreground text-sm mb-3">
                      Posting between 2-4 PM EST on weekdays increases engagement by 25%. Adjust your schedule accordingly.
                    </p>
                    <Badge className="bg-red-600 hover:bg-red-700">Quick Win</Badge>
                  </div>

                  <div className="p-4 bg-red-950/20 rounded-lg border border-red-600/30">
                    <h3 className="font-semibold text-red-400 mb-2">Hashtag Optimization</h3>
                    <p className="text-foreground text-sm mb-3">
                      Use 5-7 hashtags with a mix of popular and niche tags. Your current strategy is too broad.
                    </p>
                    <Badge className="bg-red-600 hover:bg-red-700">Medium Impact</Badge>
                  </div>

                  <div className="p-4 bg-red-950/20 rounded-lg border border-red-600/30">
                    <h3 className="font-semibold text-red-400 mb-2">Cross-Platform Strategy</h3>
                    <p className="text-foreground text-sm mb-3">
                      Your LinkedIn content could be repurposed for Twitter with minor adjustments. This could increase reach by 30%.
                    </p>
                    <Badge className="bg-red-600 hover:bg-red-700">Growth Opportunity</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
