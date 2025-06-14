import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { 
  Search, Copy, Zap, TrendingUp, Users, Play, ShoppingCart,
  Briefcase, Megaphone, BookOpen, Globe, Target, DollarSign,
  BarChart3, Smartphone, Heart, Star, Crown
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import TemplateCard from '@/components/prompt-lab/TemplateCard';
import CustomPromptCard from '@/components/prompt-lab/CustomPromptCard';
import PromptLabHeader from '@/components/prompt-lab/PromptLabHeader';
import PromptLabSearchBar from '@/components/prompt-lab/PromptLabSearchBar';
import PromptLabTabs from '@/components/prompt-lab/PromptLabTabs';

const PromptLab = () => {
  const { loading } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <PromptLabHeader />
        <PromptLabSearchBar value={searchTerm} onChange={setSearchTerm} />
        <PromptLabTabs
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default PromptLab;
