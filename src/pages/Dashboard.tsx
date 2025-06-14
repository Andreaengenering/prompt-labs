import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Heart, Globe, Eye, Bot, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import CreateTemplateDialog from "@/components/templates/CreateTemplateDialog";

function TopTemplateCard({ template }: { template: any }) {
  return (
    <Card className="gallery-card shadow-lg rounded-2xl border-0 bg-gradient-to-br from-zinc-900/60 to-zinc-800/90 transition-transform duration-200 hover:scale-[1.025] h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2 line-clamp-1">
          {template.title}
        </CardTitle>
        <span className="inline-block rounded-lg p-2 bg-black/10">
          <Bot className="h-6 w-6 text-red-400" />
        </span>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="mb-2 min-h-[48px]">
          <CardDescription className="line-clamp-2">{template.description}</CardDescription>
        </div>
        <div className="flex items-center gap-3 py-1">
          <Badge variant="outline" className="text-xs capitalize">
            {template.difficulty_level}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
            <Star className="h-4 w-4" />
            {template.rating ?? 5.0}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-blue-400">
            <Zap className="h-4 w-4" /> {template.usage_count ?? 0}
          </span>
        </div>
        {template.tags && (
          <div className="flex flex-wrap gap-1 my-1">
            {template.tags.slice(0,2).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-auto">
          <Button
            size="sm"
            className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600"
            onClick={() => {
              navigator.clipboard.writeText(template.prompt_template ?? "").then(() => {
                toast.success("Template copied to clipboard!");
              }).catch(() => {
                toast.error("Failed to copy template.");
              });
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Use
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Cosmetic improvements: card UI, contrast, spacing, polish
const Dashboard = () => {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Existing: fetch user's prompts
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

  // NEW: Fetch top 4 performing templates
  const { data: topTemplates = [], error: templateError, isLoading: templatesLoading } = useQuery({
    queryKey: ['top-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('usage_count', { ascending: false })
        .limit(4);
      if (error) throw error;
      return data ?? [];
    }
  });

  useEffect(() => {
    if (error) toast.error('Failed to load your prompts');
    if (templateError) toast.error('Failed to load top templates');
  }, [error, templateError]);

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

        {/* Top Performing Templates */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-foreground">Top Performing Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templatesLoading ? (
              Array(4).fill(null).map((_, idx) => (
                <Card key={idx} className="h-48 animate-pulse bg-muted/30" />
              ))
            ) : topTemplates && topTemplates.length > 0 ? (
              topTemplates.map((template) => (
                <TopTemplateCard key={template.id} template={template} />
              ))
            ) : (
              <div className="col-span-4 text-center">
                <div className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText className="h-10 w-10 text-red-400" />
                </div>
                <p className="text-muted-foreground">No templates found.</p>
              </div>
            )}
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
            <Button
              className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 transition-shadow shadow-md"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
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
        {/* CreateTemplateDialog Modal */}
        <CreateTemplateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </div>
    </div>
  );
};

export default Dashboard;
