
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
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${template.template_categories?.color}20` }}
            >
              <IconComponent 
                className="h-5 w-5"
                style={{ color: template.template_categories?.color }}
              />
            </div>
            {template.is_premium && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Crown className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Badge 
              variant="outline"
              className="text-xs"
              style={{ borderColor: template.template_categories?.color }}
            >
              {template.difficulty_level}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-lg mb-2 line-clamp-2">{template.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {template.description}
        </CardDescription>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{template.rating || 5.0}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Zap className="h-4 w-4" />
              <span>{template.usage_count || 0}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="bg-gray-50 rounded-lg p-3 mb-4 flex-1">
          <p className="text-sm font-mono text-gray-700 line-clamp-4">
            {template.prompt_template}
          </p>
        </div>
        
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex space-x-2 mt-auto">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleUseTemplate}
          >
            <Copy className="h-4 w-4 mr-1" />
            Use Template
          </Button>
          <Button size="sm" variant="outline">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
