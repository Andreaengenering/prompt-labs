
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  selectedCategory: string;
  templates: any[];
  categoryTabs: Array<{ value: string; label: string; icon: any }>;
}

export const TemplateGrid = ({ selectedCategory, templates, categoryTabs }: TemplateGridProps) => {
  return (
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
  );
};
