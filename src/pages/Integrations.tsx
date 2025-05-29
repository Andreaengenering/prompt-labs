
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, Youtube, Facebook, Instagram, Linkedin, 
  Twitter, Link, CheckCircle, AlertCircle, Plus,
  BarChart3, TrendingUp, Users, Eye
} from 'lucide-react';

const Integrations = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

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

  const platforms = [
    {
      id: 'website',
      name: 'Website',
      icon: Globe,
      description: 'Connect your website for content analysis',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      premium: false
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      description: 'Analyze your YouTube channel and videos',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      premium: false
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      description: 'Connect Facebook pages and analyze posts',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      premium: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      description: 'Analyze Instagram content and engagement',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      premium: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional content analysis and optimization',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      premium: true
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      description: 'Tweet analysis and thread optimization',
      color: 'text-gray-900',
      bgColor: 'bg-gray-100',
      premium: true
    }
  ];

  const handleConnect = (platformId: string) => {
    // Simulate connection
    if (!connectedPlatforms.includes(platformId)) {
      setConnectedPlatforms([...connectedPlatforms, platformId]);
    }
  };

  const handleDisconnect = (platformId: string) => {
    setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
  };

  const isConnected = (platformId: string) => connectedPlatforms.includes(platformId);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Platform Integrations
            </h1>
            <p className="text-lg text-gray-600">
              Connect your social media and websites for personalized content analysis
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Link className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Connected Platforms</p>
                    <p className="text-2xl font-bold text-gray-900">{connectedPlatforms.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Content Analyzed</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Improvement Score</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold text-gray-900">52.3K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const connected = isConnected(platform.id);
              
              return (
                <Card key={platform.id} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${platform.bgColor}`}>
                          <Icon className={`h-6 w-6 ${platform.color}`} />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{platform.name}</span>
                            {platform.premium && (
                              <Badge variant="secondary" className="text-xs">
                                Premium
                              </Badge>
                            )}
                          </CardTitle>
                        </div>
                      </div>
                      {connected ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connected ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600 font-medium">Connected</span>
                          <Switch checked={true} />
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-500">Last sync: 2 hours ago</div>
                          <div className="text-xs text-gray-500">Content analyzed: 156 items</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Analytics
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDisconnect(platform.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {platform.id === 'website' && (
                          <Input placeholder="Enter your website URL" />
                        )}
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={() => handleConnect(platform.id)}
                          disabled={platform.premium}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Connect {platform.name}
                        </Button>
                        {platform.premium && (
                          <p className="text-xs text-gray-500 text-center">
                            Upgrade to Premium to connect this platform
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Content Analysis Section */}
          {connectedPlatforms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Content Analysis Overview</CardTitle>
                <CardDescription>
                  AI-powered insights from your connected platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Top Performing Content Types</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Educational Posts</span>
                        <Badge variant="secondary">92% engagement</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Behind-the-scenes</span>
                        <Badge variant="secondary">87% engagement</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Question Posts</span>
                        <Badge variant="secondary">81% engagement</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Optimization Suggestions</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Post Timing</p>
                        <p className="text-xs text-blue-700">Best engagement at 2-4 PM EST</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-900">Hashtag Strategy</p>
                        <p className="text-xs text-green-700">Use 5-7 relevant hashtags for optimal reach</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900">Content Length</p>
                        <p className="text-xs text-purple-700">150-200 word posts perform best</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Integrations;
