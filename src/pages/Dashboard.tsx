
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Bot, BookOpen, Zap, TrendingUp, Star, Crown,
  ArrowRight, Lightbulb, Target, Rocket, Users
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: recentTemplates = [] } = useQuery({
    queryKey: ['recent-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates')
        .select(`
          *,
          template_categories (name, color, icon)
        `)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      const [promptsResult, usageResult] = await Promise.all([
        supabase
          .from('prompts')
          .select('*', { count: 'exact' })
          .eq('user_id', user?.id),
        supabase
          .from('user_template_usage')
          .select('*', { count: 'exact' })
          .eq('user_id', user?.id)
      ]);

      return {
        promptsCount: promptsResult.count || 0,
        templatesUsed: usageResult.count || 0
      };
    },
    enabled: !!user?.id
  });

  const promptingTips = [
    {
      icon: Target,
      title: "Be Specific and Clear",
      description: "Provide detailed context and specific requirements for better AI responses.",
      example: "Instead of 'write content', try 'write a 500-word blog post about sustainable gardening for beginners'"
    },
    {
      icon: Lightbulb,
      title: "Use Examples",
      description: "Include examples of the desired output format or style.",
      example: "Show the AI exactly what you want by providing sample outputs"
    },
    {
      icon: Rocket,
      title: "Set the Role",
      description: "Define the AI's role or expertise level for your task.",
      example: "'Act as a marketing expert' or 'Respond as a creative writing coach'"
    },
    {
      icon: Users,
      title: "Define Your Audience",
      description: "Specify who the content is for to get more targeted responses.",
      example: "Clearly state if content is for beginners, experts, children, etc."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600 text-lg">
            Master AI conversations with perfect prompts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Prompts Created
              </CardTitle>
              <Bot className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats?.promptsCount || 0}</div>
              <p className="text-xs text-gray-600">Your prompt library</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Templates Used
              </CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats?.templatesUsed || 0}</div>
              <p className="text-xs text-gray-600">Professional templates</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Skill Level
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Beginner</div>
              <Progress value={25} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Plan
              </CardTitle>
              <Crown className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free</div>
              <Button size="sm" variant="outline" className="mt-2">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Jump into creating and refining prompts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/prompt-lab">
                <Button className="w-full justify-between bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <span className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span>Start Prompt Lab</span>
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/templates">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Browse Templates</span>
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Templates */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Featured Templates</span>
              </CardTitle>
              <CardDescription>
                Popular templates to get you started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{template.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {template.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.template_categories?.name}
                  </Badge>
                </div>
              ))}
              
              <Link to="/templates">
                <Button variant="ghost" className="w-full mt-4">
                  View All Templates
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Prompting Tips */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Master Prompting Tips</span>
            </CardTitle>
            <CardDescription>
              Learn the fundamentals of effective AI communication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promptingTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">{tip.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-blue-800 italic">
                        💡 {tip.example}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
