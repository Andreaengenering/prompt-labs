
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { SubscriptionStatus } from '@/components/SubscriptionStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from 'sonner';

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
        .limit(5);
      
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
      description: "Prompts created"
    },
    {
      title: "Favorites",
      value: prompts.filter(p => p.is_favorite).length,
      icon: Zap,
      description: "Favorited prompts"
    },
    {
      title: "Public Prompts",
      value: prompts.filter(p => p.is_public).length,
      icon: TrendingUp,
      description: "Shared with community"
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back!
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.email ? `Manage your prompts and subscription, ${user.email}` : 'Manage your prompts and subscription'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Subscription Status */}
            <div className="lg:col-span-1">
              <SubscriptionStatus />
            </div>

            {/* Stats */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Prompt
                </CardTitle>
                <CardDescription>
                  Start building your next AI prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/prompt-lab">
                  <Button className="w-full">
                    Go to Prompt Lab
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Browse Templates
                </CardTitle>
                <CardDescription>
                  Explore professional prompt templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/templates">
                  <Button variant="outline" className="w-full">
                    View Templates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Prompts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Prompts</CardTitle>
              <CardDescription>
                Your latest prompt creations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {prompts.length > 0 ? (
                <div className="space-y-4">
                  {prompts.map((prompt) => (
                    <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{prompt.title}</h3>
                        <p className="text-sm text-gray-600">
                          {prompt.category || 'Uncategorized'} • {new Date(prompt.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {prompt.is_favorite && (
                          <span className="text-yellow-500">⭐</span>
                        )}
                        {prompt.is_public && (
                          <span className="text-green-500">🌐</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts yet</h3>
                  <p className="text-gray-600 mb-4">Get started by creating your first prompt</p>
                  <Link to="/prompt-lab">
                    <Button>Create Your First Prompt</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
