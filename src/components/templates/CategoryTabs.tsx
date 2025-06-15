
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Badge } from '@/components/ui/badge';
import { TemplateCard } from './TemplateCard';
import BlankTemplateCard from "@/components/templates/BlankTemplateCard";
import { useState } from "react";
import CreateTemplateDialog from "@/components/templates/CreateTemplateDialog";

const MENU_CATEGORIES = [
  { value: 'business', label: 'Business' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'social', label: 'Social Growth' },
  { value: 'sales', label: 'Sales and Leads' }
];

interface CategoryTabsProps {
  categories: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  templates: any[];
}

export const CategoryTabs = ({ categories, selectedCategory, onCategoryChange, templates }: CategoryTabsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Determine the label for the currently selected category
  const selectedLabel =
    MENU_CATEGORIES.find(c => c.value === selectedCategory)?.label ||
    'All Templates';

  // Filter the templates according to the selected menu item
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(template =>
        template.template_categories?.name?.toLowerCase().includes(selectedLabel.toLowerCase())
      );

  return (
    <>
      {/* Menubar for categories */}
      <div className="mb-6 flex justify-center">
        <Menubar className="gap-4 bg-background border border-red-800 rounded-lg shadow-lg">
          {MENU_CATEGORIES.map(cat => (
            <MenubarMenu key={cat.value}>
              <MenubarTrigger
                onClick={() => onCategoryChange(cat.value)}
                className={`
                  px-6 py-2 font-semibold text-base rounded-md transition-colors
                  ${
                    selectedCategory === cat.value
                      ? "bg-gradient-to-r from-red-600 to-red-400 text-white shadow-md"
                      : "bg-black text-gray-200 hover:bg-red-800 hover:text-white"
                  }
                  border border-transparent hover:border-red-700
                `}
                style={{
                  letterSpacing: '0.01em',
                }}
              >
                {cat.label}
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{selectedLabel}</h2>
        <Badge variant="secondary" className="hidden sm:flex bg-border/60 text-foreground/80 border border-border shadow-sm">
          {filteredTemplates.length} templates
        </Badge>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <span className="block mb-4">No templates found for this category.</span>
          <p className="text-muted-foreground">Try another menu or create a template.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlankTemplateCard onCreate={() => setDialogOpen(true)} />
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
      <CreateTemplateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default CategoryTabs;
