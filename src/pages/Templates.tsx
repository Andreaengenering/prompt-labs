
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TemplateSearch } from '@/components/templates/TemplateSearch';
import { CategoryTabs } from '@/components/templates/CategoryTabs';
import { toast } from 'sonner';
import BlankTemplateCard from "@/components/templates/BlankTemplateCard";
import CreateTemplateDialog from "@/components/templates/CreateTemplateDialog";

const Templates = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: categories = [], error: categoriesError } = useQuery({
    queryKey: ['template-categories'],
    queryFn: async () => {
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
    enabled: true
  });

  const { data: templates = [], error: templatesError } = useQuery({
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
    enabled: categories.length > 0
  });

  useEffect(() => {
    if (categoriesError || templatesError) {
      const error = categoriesError || templatesError;
      console.error('Query error:', error);
      toast.error('Failed to load templates. Please try again.');
    }
  }, [categoriesError, templatesError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card pb-16">
      <div className="container mx-auto max-w-6xl px-2 sm:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            Prompt Templates
          </h1>
          <p className="text-muted-foreground mt-3 text-lg sm:text-xl font-medium">
            Professional templates to master AI conversations
          </p>
          {user && (
            <p className="text-xs text-muted-foreground mt-1">
              Secure access for {user.email}
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mb-8 flex items-center justify-center">
          <TemplateSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <div className="rounded-2xl shadow-xl bg-card/80 border border-border px-2 py-6 sm:px-6">
          <CategoryTabs 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            templates={templates}
          />
        </div>

        {/* Blank Template Dialog */}
        <CreateTemplateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </div>
    </div>
  );
};

export default Templates;

