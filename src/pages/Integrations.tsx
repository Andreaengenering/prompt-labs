import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/AppLayout';
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
import { tiktok } from 'lucide-react/dynamicIconImports';
import { Icon } from 'lucide-react';

const Integrations = () => {
  const { user, loading } = useAuth();
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </AppLayout>
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
      color: 'text-red-600',
      bgColor: 'bg-red-600/20',
      premium: false
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      description: 'Analyze your YouTube channel and videos',
      color: 'text-red-600',
      bgColor: 'bg-red-600/20',
      premium: false
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      description: 'Connect Facebook pages and analyze posts',
      color: 'text-red-600',
      bgColor: 'bg-red-600/20',
      premium: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      description: 'Analyze Instagram content and engagement',
      color: 'text-red-400',
      bgColor: 'bg-red-600/20',
      premium: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional content analysis and optimization',
      color: 'text-red-600',
      bgColor: 'bg-red-600/20',
      premium: true
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      description: 'Tweet analysis and thread optimization',
      color: 'text-foreground',
      bgColor: 'bg-red-600/20',
      premium: true
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'tiktok',
      description: 'Analyze TikTok videos and engagement metrics',
      color: 'text-red-500',
      bgColor: 'bg-red-600/20',
      premium: true,
      isDynamic: true
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
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              Platform Integrations
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Connect your social media and websites for personalized content analysis
            </p>
            {user && (
              <p className="text-xs text-muted-foreground mt-1">
                Secure access for {user.email}
              </p>
            )}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="gallery-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Link className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Connected Platforms</p>
                    <p className="text-2xl font-bold text-foreground">{connectedPlatforms.length}</p>
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

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {platforms.map((platform) => {
              const connected = isConnected(platform.id);
              
              return (
                <Card key={platform.id} className="gallery-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${platform.bgColor}`}>
                          {platform.isDynamic ? (
                            <Icon iconNode={tiktok} className={`h-6 w-6 ${platform.color}`} />
                          ) : (
                            React.createElement(platform.icon, { className: `h-6 w-6 ${platform.color}` })
                          )}
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2 text-foreground">
                            <span>{platform.name}</span>
                            {platform.premium && (
                              <Badge variant="secondary" className="text-xs bg-red-600/20 text-red-400">
                                Premium
                              </Badge>
                            )}
                          </CardTitle>
                        </div>
                      </div>
                      {connected ? (
                        <CheckCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connected ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-500 font-medium">Connected</span>
                          <Switch checked={true} />
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">Last sync: 2 hours ago</div>
                          <div className="text-xs text-muted-foreground">Content analyzed: 156 items</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 border-red-600/30 hover:bg-red-600/20">
                            View Analytics
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDisconnect(platform.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {platform.id === 'website' && (
                          <Input placeholder="Enter your website URL" className="bg-card border-border" />
                        )}
                        <Button 
                          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                          onClick={() => handleConnect(platform.id)}
                          disabled={platform.premium}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Connect {platform.name}
                        </Button>
                        {platform.premium && (
                          <p className="text-xs text-muted-foreground text-center">
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
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Integrations;
