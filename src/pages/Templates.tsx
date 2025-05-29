
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { TemplateSearch } from '@/components/templates/TemplateSearch';
import { CategoryTabs } from '@/components/templates/CategoryTabs';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { Zap, BookOpen, Briefcase, Megaphone, TrendingUp, Users, Play, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

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
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Security: Ensure user is authenticated before loading data
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to access templates');
    }
  }, [isAuthenticated]);

  const { data: categories = [], error: categoriesError } = useQuery({
    queryKey: ['template-categories'],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('Authentication required');
      }

      const { data, error } = await supabase
        .from('template_categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Categories fetch error:', error);
        throw error;
      }
      return data;
    },
    enabled: isAuthenticated
  });

  const { data: templates = [], error: templatesError } = useQuery({
    queryKey: ['templates', selectedCategory, searchTerm],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('Authentication required');
      }

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
      if (error) {
        console.error('Templates fetch error:', error);
        throw error;
      }
      
      return data.filter(template => 
        searchTerm === '' || 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    },
    enabled: isAuthenticated && categories.length > 0
  });

  // Security: Handle errors appropriately
  useEffect(() => {
    if (categoriesError || templatesError) {
      const error = categoriesError || templatesError;
      console.error('Query error:', error);
      
      if (error?.message?.includes('JWT') || error?.message?.includes('auth')) {
        toast.error('Session expired. Please sign in again.');
      } else {
        toast.error('Failed to load templates. Please try again.');
      }
    }
  }, [categoriesError, templatesError]);

  const categoryTabs = [
    { value: 'all', label: 'All Templates', icon: Zap },
    ...categories.map(cat => ({
      value: cat.name.toLowerCase().replace(/\s+/g, '-'),
      label: cat.name,
      icon: iconMap[cat.icon] || BookOpen
    }))
  ];

  // Security: Only render if authenticated
  if (!isAuthenticated) {
    return null;
  }

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
                {user && (
                  <p className="text-xs text-gray-500 mt-1">
                    Secure access for {user.email}
                  </p>
                )}
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
