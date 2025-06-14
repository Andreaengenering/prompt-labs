import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/AppLayout';
import { StatsOverview } from '@/components/integrations/StatsOverview';
import { PlatformCard } from '@/components/integrations/PlatformCard';
import { ContentAnalysis } from '@/components/integrations/ContentAnalysis';
import { KnowledgeBase } from '@/components/integrations/KnowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { platforms } from '@/constants/platforms';
import { supabase } from "@/integrations/supabase/client";

const Integrations = () => {
  const { user, loading } = useAuth();
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      setConnectedPlatforms([]);
      setAccounts([]);
      return;
    }

    async function fetchAccounts() {
      const { data, error } = await supabase
        .from("social_accounts")
        .select("*")
        .eq("user_id", user.id);
      if (!error) {
        setAccounts(data || []);
        setConnectedPlatforms((data || []).map((acc: any) => acc.platform));
      } else {
        setAccounts([]);
      }
    }
    fetchAccounts();
  }, [user]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const oauthParam = url.searchParams.get("oauth");
    if (
      oauthParam === "google" && user &&
      !connectedPlatforms.includes("youtube")
    ) {
      async function saveYouTubeConnection() {
        await supabase.from("social_accounts").insert({
          user_id: user.id,
          platform: "youtube",
          account_username: user.email,
          access_token: null // Could fetch or use session if you want, left null for demo
        });
        const { data } = await supabase
          .from("social_accounts")
          .select("*")
          .eq("user_id", user.id);
        setAccounts(data || []);
        setConnectedPlatforms((data || []).map((acc: any) => acc.platform));
      }
      saveYouTubeConnection();

      url.searchParams.delete("oauth");
      window.history.replaceState({}, document.title, url.pathname);
    }
  }, [user, connectedPlatforms]);

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

  // Enhanced connect for all platforms
  const handleConnect = async (platformId: string, accountUsername?: string) => {
    if (!user) return;

    // Don't add duplicate
    if (connectedPlatforms.includes(platformId)) return;

    // Insert new social account
    await supabase.from("social_accounts").insert({
      user_id: user.id,
      platform: platformId,
      account_username: accountUsername || user.email,
      access_token: null // For OAuth later, if implemented
    });
    const { data } = await supabase
      .from("social_accounts")
      .select("*")
      .eq("user_id", user.id);
    setAccounts(data || []);
    setConnectedPlatforms((data || []).map((acc: any) => acc.platform));
  };

  const handleDisconnect = async (platformId: string) => {
    if (user) {
      await supabase
        .from("social_accounts")
        .delete()
        .eq("user_id", user.id)
        .eq("platform", platformId);
      setConnectedPlatforms(connectedPlatforms.filter((id) => id !== platformId));
      setAccounts(accounts.filter((acc) => acc.platform !== platformId));
    } else {
      setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
    }
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
