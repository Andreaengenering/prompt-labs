
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/AppLayout';
import { StatsOverview } from '@/components/integrations/StatsOverview';
import { PlatformCard } from '@/components/integrations/PlatformCard';
import { ContentAnalysis } from '@/components/integrations/ContentAnalysis';
import { KnowledgeBase } from '@/components/integrations/KnowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { platforms } from '@/constants/platforms';

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

  const handleConnect = (platformId: string) => {
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

          <Tabs defaultValue="integrations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="integrations">Platform Integrations</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            </TabsList>

            <TabsContent value="integrations" className="space-y-8">
              {/* Stats Overview */}
              <StatsOverview connectedPlatformsCount={connectedPlatforms.length} />

              {/* Platform Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {platforms.map((platform) => (
                  <PlatformCard
                    key={platform.id}
                    platform={platform}
                    isConnected={isConnected(platform.id)}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                  />
                ))}
              </div>

              {/* Content Analysis Section */}
              <ContentAnalysis connectedPlatformsCount={connectedPlatforms.length} />
            </TabsContent>

            <TabsContent value="knowledge">
              <KnowledgeBase />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Integrations;
