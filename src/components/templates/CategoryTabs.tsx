import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Zap, BookOpen, Briefcase, Megaphone, TrendingUp, Users, Play, ShoppingCart } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import BlankTemplateCard from "@/components/templates/BlankTemplateCard";
import { useState } from "react";
import CreateTemplateDialog from "@/components/templates/CreateTemplateDialog";

const iconMap: { [key: string]: any } = {
  Briefcase,
  Megaphone,
  BookOpen,
  TrendingUp,
  Users,
  Play,
  ShoppingCart
};

interface CategoryTabsProps {
  categories: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  templates: any[];
}

export const CategoryTabs = ({ categories, selectedCategory, onCategoryChange, templates }: CategoryTabsProps) => {
  const categoryTabs = [
    { value: 'all', label: 'All Templates', icon: Zap },
    ...categories.map(cat => ({
      value: cat.name.toLowerCase().replace(/\s+/g, '-'),
      label: cat.name,
      icon: iconMap[cat.icon] || BookOpen
    }))
  ];

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="space-y-6">
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

        {categoryTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{tab.label}</h2>
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
                {/* Patch: always display BlankTemplateCard at the first position */}
                <BlankTemplateCard onCreate={() => setDialogOpen(true)} />
                {templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      <CreateTemplateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};
