import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Search, Star, Heart, Crown, Zap, Copy,
  Briefcase, Megaphone, BookOpen, TrendingUp, 
  Users, Play, ShoppingCart
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Briefcase,
  Megaphone,
  BookOpen,
  TrendingUp,
  Users,
  Play,
  ShoppingCart,
  Heart
};

const Templates = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const { data: categories = [] } = useQuery({
    queryKey: ['template-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('template_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: templates = [] } = useQuery({
    queryKey: ['templates', selectedCategory, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('templates')
        .select(`
          *,
          template_categories (
            name,
            color,
            icon
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        const category = categories.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return data.filter(template => 
        searchTerm === '' || 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    },
    enabled: categories.length > 0
  });

  const handleUseTemplate = async (template: any) => {
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

  const TemplateCard = ({ template }: { template: any }) => {
    const IconComponent = iconMap[template.template_categories?.icon] || BookOpen;
    
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
              onClick={() => handleUseTemplate(template)}
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

  const categoryTabs = [
    { value: 'all', label: 'All Templates', icon: Zap },
    ...categories.map(cat => ({
      value: cat.name.toLowerCase().replace(/\s+/g, '-'),
      label: cat.name,
      icon: iconMap[cat.icon] || BookOpen
    }))
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Prompt Templates
                </h1>
                <p className="text-gray-600 mt-1">
                  Professional templates to master AI conversations
                </p>
              </div>
              
              <div className="relative max-w-md w-full md:w-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex h-auto p-1 bg-white/50 backdrop-blur-sm">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value}
                      className="flex items-center space-x-2 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {categoryTabs.find(tab => tab.value === selectedCategory)?.label}
                </h2>
                <Badge variant="secondary" className="hidden sm:flex">
                  {templates.length} templates
                </Badge>
              </div>
              
              {templates.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No templates found</h3>
                  <p className="text-gray-500">Try adjusting your search or browse different categories.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Templates;
