
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { projectKnowledge } from '@/constants/documentation';
import { KnowledgeItem } from '@/types/documentation';

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterItems = (items: KnowledgeItem[]) => {
    return items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600/20 text-red-400';
      case 'medium': return 'bg-yellow-600/20 text-yellow-400';
      case 'low': return 'bg-green-600/20 text-green-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sections">Documentation</TabsTrigger>
          <TabsTrigger value="issues">Common Issues</TabsTrigger>
          <TabsTrigger value="practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          {projectKnowledge.sections.map(section => (
            <Card key={section.id} className="gallery-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-red-500" />
                  <span>{section.title}</span>
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filterItems(section.items).map(item => (
                    <div key={item.id} className="p-3 bg-card/50 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card className="gallery-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>Common Issues</span>
              </CardTitle>
              <CardDescription>Troubleshooting guide for frequent problems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filterItems(projectKnowledge.commonIssues).map(item => (
                  <div key={item.id} className="p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices" className="space-y-4">
          <Card className="gallery-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Best Practices</span>
              </CardTitle>
              <CardDescription>Recommended approaches for optimal results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filterItems(projectKnowledge.bestPractices).map(item => (
                  <div key={item.id} className="p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
