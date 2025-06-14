
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { SubscriptionStatus } from '@/components/SubscriptionStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Zap, TrendingUp, Heart, Globe, Eye, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from 'sonner';

// Cosmetic improvements: card UI, contrast, spacing, polish
const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: prompts = [], error } = useQuery({
    queryKey: ['user-prompts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (error) {
        console.error('Error fetching prompts:', error);
        throw error;
      }
      return data;
    },
    enabled: !!user
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load your prompts');
    }
  }, [error]);

  const stats = [
    {
      title: "Total Prompts",
      value: prompts.length,
      icon: FileText,
      description: "Prompts created",
      color: "text-red-400"
    },
    {
      title: "Favorites",
      value: prompts.filter(p => p.is_favorite).length,
      icon: Heart,
      description: "Favorited prompts",
      color: "text-pink-400"
    },
    {
      title: "Public Prompts",
      value: prompts.filter(p => p.is_public).length,
      icon: Globe,
      description: "Shared with community",
      color: "text-blue-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent leading-tight animate-fade-in">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {user?.email ? `Create amazing AI prompts, ${user.email.split('@')[0]}` : 'Create amazing AI prompts'}
          </p>
        </div>

        {/* Stats and Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="rounded-2xl shadow-lg border border-border/70 bg-gradient-to-br from-background via-zinc-900/60 to-black/70 p-6">
              <SubscriptionStatus />
            </div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="gallery-card shadow-lg rounded-2xl border-0 bg-gradient-to-br from-zinc-900/60 to-zinc-800/90 transition-transform duration-200 hover:scale-[1.025]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span>{stat.title}</span>
                  </CardTitle>
                  <span className={`inline-block rounded-lg p-2 bg-black/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground mb-3 drop-shadow-lg">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Prompts Gallery */}
        <Card className="gallery-card border-0 shadow-2xl rounded-2xl bg-gradient-to-br from-background via-zinc-900/50 to-zinc-800/70">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
            <div>
              <CardTitle className="text-2xl font-extrabold text-foreground">Your Creations</CardTitle>
              <CardDescription className="text-muted-foreground">
                Recent prompt masterpieces
              </CardDescription>
            </div>
            <Link to="/prompt-lab">
              <Button className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 transition-shadow shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {prompts.length > 0 ? (
              <div className="gallery-grid">
                {prompts.map((prompt) => (
                  <Card key={prompt.id} className="gallery-card group cursor-pointer shadow-md rounded-xl border-0 bg-gradient-to-br from-zinc-800/80 via-zinc-900/60 to-black/90 hover:ring-2 hover:ring-red-400/60 hover:shadow-2xl transition-all duration-200">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-red-900/20 to-black/40 flex items-center justify-center relative overflow-hidden rounded-t-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="relative z-10 text-center p-4">
                          <Bot className="h-12 w-12 text-red-400 mx-auto mb-2 opacity-60 drop-shadow-xl" />
                          <div className="text-xs text-gray-400 uppercase tracking-wide">
                            {prompt.category || 'General'}
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 flex gap-2 z-20">
                          {prompt.is_favorite && (
                            <Badge variant="secondary" className="bg-red-600/20 text-red-400 border-red-600/30 shadow">
                              <Heart className="h-3 w-3" />
                            </Badge>
                          )}
                          {prompt.is_public && (
                            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30 shadow">
                              <Globe className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-red-400 transition-colors line-clamp-2 text-lg">
                          {prompt.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {prompt.content?.substring(0, 120)}...
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(prompt.created_at).toLocaleDateString()}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>View</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <FileText className="h-14 w-14 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Ready to create magic?</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start your journey into AI prompt mastery. Create your first prompt and unlock endless possibilities.
                </p>
                <Link to="/prompt-lab">
                  <Button className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 shadow">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Prompt
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
