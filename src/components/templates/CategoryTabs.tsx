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
        <div className="overflow-x-auto pb-3">
          <TabsList className="inline-flex h-auto p-1 rounded-xl border border-border bg-background/90 shadow-sm backdrop-blur-md">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:scale-[1.06] transition focus-visible:ring-2 focus-visible:ring-primary/30"
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
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{tab.label}</h2>
              <Badge variant="secondary" className="hidden sm:flex bg-border/60 text-foreground/80 border border-border shadow-sm">
                {templates.length} templates
              </Badge>
            </div>
            
            {templates.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

export default CategoryTabs;
