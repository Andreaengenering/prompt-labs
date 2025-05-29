
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, TrendingUp, Users, Eye, Heart, MessageSquare,
  Calendar, Clock, Target, Zap, Star, ArrowUp, ArrowDown
} from 'lucide-react';

const Analytics = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
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
      color: 'text-pink-600'
    },
    {
      platform: 'LinkedIn',
      metric: 'Reach',
      value: '23.4K',
      change: '-3.2%',
      trend: 'down',
      color: 'text-blue-600'
    },
    {
      platform: 'Website',
      metric: 'Conversions',
      value: '156',
      change: '+8.9%',
      trend: 'up',
      color: 'text-green-600'
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
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Content Analytics
            </h1>
            <p className="text-lg text-gray-600">
              Analyze your content performance across all platforms
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {performanceData.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{item.platform}</p>
                      <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-500">{item.metric}</p>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Analysis</TabsTrigger>
              <TabsTrigger value="audience">Audience Insights</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Total Reach</span>
                        <Badge variant="secondary">127K</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Engagement Rate</span>
                        <Badge variant="secondary">8.9%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Content Pieces</span>
                        <Badge variant="secondary">234</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-600" />
                      Goal Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Monthly Reach Goal</span>
                          <span className="text-sm font-medium">84%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Engagement Target</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
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
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-2xl font-bold text-purple-600">{insight.type}</div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{insight.engagement} performance</span>
                        </div>
                        <p className="text-sm text-gray-600">{insight.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Age 25-34</span>
                        <Badge variant="secondary">42%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Age 35-44</span>
                        <Badge variant="secondary">28%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Age 18-24</span>
                        <Badge variant="secondary">20%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Age 45+</span>
                        <Badge variant="secondary">10%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Technology</span>
                        <Badge variant="secondary">67%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Business</span>
                        <Badge variant="secondary">54%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Marketing</span>
                        <Badge variant="secondary">41%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Education</span>
                        <Badge variant="secondary">38%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-600" />
                    AI-Powered Recommendations
                  </CardTitle>
                  <CardDescription>
                    Personalized suggestions based on your content performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Content Strategy</h3>
                      <p className="text-blue-800 text-sm mb-3">
                        Your educational content performs 40% better than promotional content. Consider creating more tutorial-style posts.
                      </p>
                      <Badge className="bg-blue-600">High Impact</Badge>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Posting Schedule</h3>
                      <p className="text-green-800 text-sm mb-3">
                        Posting between 2-4 PM EST on weekdays increases engagement by 25%. Adjust your schedule accordingly.
                      </p>
                      <Badge className="bg-green-600">Quick Win</Badge>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">Hashtag Optimization</h3>
                      <p className="text-purple-800 text-sm mb-3">
                        Use 5-7 hashtags with a mix of popular and niche tags. Your current strategy is too broad.
                      </p>
                      <Badge className="bg-purple-600">Medium Impact</Badge>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900 mb-2">Cross-Platform Strategy</h3>
                      <p className="text-orange-800 text-sm mb-3">
                        Your LinkedIn content could be repurposed for Twitter with minor adjustments. This could increase reach by 30%.
                      </p>
                      <Badge className="bg-orange-600">Growth Opportunity</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Analytics;
