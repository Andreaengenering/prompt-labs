import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { templateCategories, promptTemplates } from "./promptLabData";
import TemplateCard from "./TemplateCard";
import CustomPromptCard from "./CustomPromptCard";
import { useToast } from "@/hooks/use-toast";
import { usePromptLabCredits } from "@/hooks/usePromptLabCredits";
import { SidebarUpgradeCTA } from "@/components/sidebar/SidebarUpgradeCTA";
import { Loader2 } from "lucide-react";

interface PromptLabTabsProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchTerm: string;
}

const PromptLabTabs = ({ selectedCategory, setSelectedCategory, searchTerm }: PromptLabTabsProps) => {
  const { toast } = useToast();
  const { isLimited, isPro, loading: creditsLoading, increment, count, limit } = usePromptLabCredits();

  const filteredTemplates = promptTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = async (template: any) => {
    if (!isPro && isLimited) {
      toast({
        variant: "destructive",
        title: "Upgrade required",
        description: "You have reached your free prompt generation limit. Upgrade to unlock unlimited access.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(template.prompt);
      if (!isPro) await increment();
      toast({
        title: "Template copied!",
        description: "The prompt template has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Error copying template:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy template. Please try again.",
      });
    }
  };

  return (
    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
      <div className="overflow-x-auto">
        <TabsList className="inline-flex h-auto p-1 bg-card/50 backdrop-blur-sm">
          {templateCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-2 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* Show usage/upgrade CTA if not pro */}
      <div className="w-full flex justify-end mt-1">
        {!isPro && (
          <div className="text-xs flex items-center gap-2">
            {creditsLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-1" />
            ) : (
              <>
                <span>Free generations: </span>
                <span className="font-mono">{count ?? 0}/{limit ?? 5}</span>
                {isLimited && (
                  <span className="ml-2">
                    <SidebarUpgradeCTA shouldShowUpgrade={true} createCheckout={() => {}} loading={false} />
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <TabsContent value={selectedCategory} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {templateCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <Badge variant="secondary" className="hidden sm:flex">
            {filteredTemplates.length} templates
          </Badge>
        </div>
        
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
          </div>
        ) : (
          <div
            className={
              selectedCategory === "all"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                : "gallery-grid"
            }
          >
            {selectedCategory === "all" && (
              <CustomPromptCard
                isLimited={isLimited}
                isPro={isPro}
                increment={increment}
              />
            )}
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                templateCategories={templateCategories}
                onUseTemplate={handleUseTemplate}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default PromptLabTabs;
