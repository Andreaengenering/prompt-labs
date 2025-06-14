
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Heart, Star, BookOpen } from 'lucide-react';

interface TemplateCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface TemplateCardProps {
  template: any;
  templateCategories: TemplateCategory[];
  onUseTemplate: (template: any) => void;
}

export const TemplateCard = ({ template, templateCategories, onUseTemplate }: TemplateCardProps) => {
  const category = templateCategories.find(cat => cat.id === template.category);
  const IconComponent = category?.icon || BookOpen;

  return (
    <Card className="gallery-card h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-red-600/20">
              <IconComponent className="h-5 w-5 text-red-400" />
            </div>
            <Badge variant="outline" className="text-xs border-red-600/30">
              {template.difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-red-400 text-red-400" />
            <span className="text-sm text-muted-foreground">{template.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg mb-2 line-clamp-2 text-foreground">{template.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {template.description}
        </CardDescription>
        <div className="flex items-center space-x-3 pt-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>{template.usage} uses</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="bg-card/50 rounded-lg p-3 mb-4 flex-1 border border-border">
          <p className="text-sm font-mono text-muted-foreground line-clamp-4">
            {template.prompt}
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
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            onClick={() => onUseTemplate(template)}
          >
            <Zap className="h-4 w-4 mr-1" />
            Use Template
          </Button>
          <Button size="sm" variant="outline" className="border-red-600/30 hover:bg-red-600/20">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
