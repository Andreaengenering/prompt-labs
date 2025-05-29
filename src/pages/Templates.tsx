
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { TemplateSearch } from '@/components/templates/TemplateSearch';
import { CategoryTabs } from '@/components/templates/CategoryTabs';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { Zap, BookOpen, Briefcase, Megaphone, TrendingUp, Users, Play, ShoppingCart } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Briefcase,
  Megaphone,
  BookOpen,
  TrendingUp,
  Users,
  Play,
  ShoppingCart
};

const Templates = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
              
              <TemplateSearch 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <CategoryTabs 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <TemplateGrid 
            selectedCategory={selectedCategory}
            templates={templates}
            categoryTabs={categoryTabs}
          />
        </div>
      </div>
    </>
  );
};

export default Templates;
