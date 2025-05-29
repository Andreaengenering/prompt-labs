
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, BookOpen, Users, TrendingUp, Star, Clock, Award } from 'lucide-react';

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
              Ready to master the art of AI prompting? Let's create something amazing today.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-purple-600" />
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Start
                </CardTitle>
                <CardDescription>
                  Jump right into creating your next great prompt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => navigate('/prompt-lab')}
                >
                  Open Prompt Lab
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/templates')}
                >
                  Browse Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Learning Hub
                </CardTitle>
                <CardDescription>
                  Master the art of effective prompting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Prompt Engineering Basics</p>
                      <p className="text-sm text-gray-600">Learn the fundamentals</p>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Advanced Techniques</p>
                      <p className="text-sm text-gray-600">Take your skills to the next level</p>
                    </div>
                    <Badge>Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
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
                      <p className="font-medium">Completed "Viral Content" challenge</p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <Star className="h-3 w-3 mr-1" />
                    Achievement
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
