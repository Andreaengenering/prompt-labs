
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, Zap, Copy, Heart, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const iconMap: { [key: string]: any } = {
  Briefcase: BookOpen,
  Megaphone: BookOpen,
  BookOpen,
  TrendingUp: BookOpen,
  Users: BookOpen,
  Play: BookOpen,
  ShoppingCart: BookOpen,
  Heart
};

interface TemplateCardProps {
  template: any;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const { toast } = useToast();
  const IconComponent = iconMap[template.template_categories?.icon] || BookOpen;

  const handleUseTemplate = async () => {
    try {
      // Track usage
      await supabase
        .from('user_template_usage')
        .insert({
          template_id: template.id,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      // Copy to clipboard
      await navigator.clipboard.writeText(template.prompt_template);
      
      toast({
        title: "Template copied!",
        description: "The prompt template has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Error using template:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy template. Please try again.",
      });
    }
  };
  
  return (
    <Card className="gallery-card h-full flex flex-col bg-gradient-to-br from-black via-background to-card border border-red-900 hover:border-red-500/80 hover:shadow-red-700/40 shadow-xl transition-all duration-300">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${template.template_categories?.color ?? '#ef4444'}30` }}
            >
              <IconComponent 
                className="h-5 w-5"
                style={{ color: template.template_categories?.color ?? '#ef4444' }}
              />
            </div>
            {template.is_premium && (
              <Badge variant="secondary" className="bg-yellow-200/60 text-yellow-900 border-yellow-400 shadow-sm flex items-center gap-1">
                <Crown className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Badge 
              variant="outline"
              className="text-xs border-red-400 text-slate-200"
              style={{ borderColor: template.template_categories?.color ?? '#ef4444' }}
            >
              {template.difficulty_level}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-lg mb-2 line-clamp-2 text-slate-50 drop-shadow-sm">{template.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2 text-slate-300">
          {template.description}
        </CardDescription>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-sm text-slate-400">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{template.rating || 5.0}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-slate-400">
              <Zap className="h-4 w-4 text-red-400" />
              <span>{template.usage_count || 0}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-black/90 via-background/80 to-red-900/10 rounded-lg p-3 mb-4 flex-1 border border-red-900">
          <p className="text-sm font-mono text-slate-300 line-clamp-4">
            {template.prompt_template}
          </p>
        </div>
        
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs border-red-700 text-slate-300">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-red-700 text-slate-300">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex space-x-2 mt-auto">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-800 hover:to-red-600 text-slate-50 font-semibold shadow border-0"
            onClick={handleUseTemplate}
          >
            <Copy className="h-4 w-4 mr-1" />
            Use Template
          </Button>
          <Button size="sm" variant="outline" className="border-red-700 hover:bg-red-900/20 text-slate-300">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

