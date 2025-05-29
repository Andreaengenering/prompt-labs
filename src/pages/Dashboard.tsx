
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, BookOpen, TrendingUp, Star, Clock, Award, Bot, 
  BarChart3, Globe, MessageSquare, Sparkles, Target, Users
} from 'lucide-react';

const Dashboard = () => {
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

  const featureCategories = [
    {
      title: "AI Prompt Tools",
      description: "Core AI interaction features",
      icon: Bot,
      color: "purple",
      features: [
        {
          title: "Prompt Lab",
          description: "Advanced prompt builder with guided assistance",
          icon: MessageSquare,
          path: "/prompt-lab",
          status: "Available"
        },
        {
          title: "Template Library",
          description: "Professional prompt templates for every use case",
          icon: BookOpen,
          path: "/templates",
          status: "Available"
        },
        {
          title: "Prompt Optimizer",
          description: "AI-powered prompt enhancement suggestions",
          icon: Sparkles,
          path: "/prompt-lab",
          status: "Coming Soon"
        }
      ]
    },
    {
      title: "Analytics & Insights",
      description: "Performance tracking and optimization",
      icon: BarChart3,
      color: "blue",
      features: [
        {
          title: "Performance Analytics",
          description: "Track prompt success rates and response quality",
          icon: TrendingUp,
          path: "/analytics",
          status: "Available"
        },
        {
          title: "Content Analysis",
          description: "Analyze your existing content for optimization",
          icon: Target,
          path: "/analytics",
          status: "Available"
        },
        {
          title: "A/B Testing",
          description: "Compare prompt variations for best results",
          icon: Users,
          path: "/analytics",
          status: "Premium"
        }
      ]
    },
    {
      title: "Platform Integrations",
      description: "Connect your favorite platforms",
      icon: Globe,
      color: "green",
      features: [
        {
          title: "Social Media",
          description: "Facebook, Instagram, LinkedIn, Twitter/X integration",
          icon: Users,
          path: "/integrations",
          status: "Available"
        },
        {
          title: "Content Platforms",
          description: "YouTube, TikTok, and website content sync",
          icon: Globe,
          path: "/integrations",
          status: "Available"
        },
        {
          title: "Business Tools",
          description: "CRM, email marketing, and productivity apps",
          icon: Zap,
          path: "/integrations",
          status: "Coming Soon"
        }
      ]
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.user_metadata?.full_name || user.email}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Ready to master the art of AI prompting? Explore our organized features below.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Prompts Created</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Templates Used</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Level</p>
                    <p className="text-2xl font-bold text-gray-900">Pro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Categories */}
          <div className="space-y-8">
            {featureCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={categoryIndex} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${category.color}-100`}>
                        <CategoryIcon className={`h-6 w-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{category.title}</h3>
                        <p className="text-sm text-gray-600 font-normal">{category.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <Card key={featureIndex} className="border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <FeatureIcon className="h-5 w-5 text-gray-600 mt-1" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                                    <Badge 
                                      variant={feature.status === 'Available' ? 'default' : feature.status === 'Premium' ? 'secondary' : 'outline'}
                                      className="text-xs"
                                    >
                                      {feature.status}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-3">{feature.description}</p>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="w-full text-xs"
                                    onClick={() => navigate(feature.path)}
                                    disabled={feature.status === 'Coming Soon'}
                                  >
                                    {feature.status === 'Available' ? 'Use Now' : feature.status === 'Premium' ? 'Upgrade' : 'Coming Soon'}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="mt-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Jump right into your most-used features
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => navigate('/prompt-lab')}
              >
                <Bot className="h-6 w-6" />
                <span>Create Prompt</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => navigate('/templates')}
              >
                <BookOpen className="h-6 w-6" />
                <span>Browse Templates</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => navigate('/analytics')}
              >
                <BarChart3 className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => navigate('/integrations')}
              >
                <Globe className="h-6 w-6" />
                <span>Connect Platforms</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Created "B2B Email Outreach" prompt</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Marketing</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Used "Content Calendar" template</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Content</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Connected Instagram account</p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <Star className="h-3 w-3 mr-1" />
                    Integration
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
