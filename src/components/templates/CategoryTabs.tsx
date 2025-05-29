
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface CategoryTabsProps {
  categories: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const categoryTabs = [
    { value: 'all', label: 'All Templates', icon: Zap },
    ...categories.map(cat => ({
      value: cat.name.toLowerCase().replace(/\s+/g, '-'),
      label: cat.name,
      icon: iconMap[cat.icon] || BookOpen
    }))
  ];

  return (
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
    </Tabs>
  );
};
