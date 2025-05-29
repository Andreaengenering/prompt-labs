
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, Save, Share2, BarChart3, Sparkles, MessageSquare, TrendingUp,
  BookOpen, Briefcase, Megaphone, Users, ShoppingCart, Heart, Copy
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const PromptLab = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('marketing');

  const handleRunPrompt = async () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setOutput(`Response to: "${prompt}"\n\nThis is a simulated AI response. The actual implementation would integrate with various LLM APIs to provide real results.`);
      setIsLoading(false);
    }, 2000);
  };

  const templateCategories = [
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      color: 'bg-red-500',
      templates: [
        {
          title: 'Social Media Post',
          description: 'Create engaging social media content',
          template: 'Create a compelling social media post for [PLATFORM] about [TOPIC] that [GOAL]. Target audience: [AUDIENCE]. Tone: [TONE].'
        },
        {
          title: 'Email Campaign',
          description: 'Professional email marketing copy',
          template: 'Write a persuasive email for [CAMPAIGN_TYPE] targeting [AUDIENCE] about [PRODUCT/SERVICE]. Include: compelling subject line, engaging opening, clear value proposition, and strong call-to-action.'
        },
        {
          title: 'Product Description',
          description: 'Compelling product descriptions',
          template: 'Write a compelling product description for [PRODUCT] highlighting [KEY_FEATURES]. Target audience: [AUDIENCE]. Focus on benefits and emotional appeal.'
        }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      icon: Briefcase,
      color: 'bg-blue-500',
      templates: [
        {
          title: 'Meeting Summary',
          description: 'Professional meeting notes and action items',
          template: 'Create a professional meeting summary for [MEETING_TYPE] on [DATE]. Include: key discussion points, decisions made, action items with owners, and next steps.'
        },
        {
          title: 'Proposal Writing',
          description: 'Business proposal structure',
          template: 'Write a business proposal for [PROJECT/SERVICE] addressing [CLIENT_NEED]. Include: executive summary, proposed solution, timeline, budget overview, and expected outcomes.'
        },
        {
          title: 'SWOT Analysis',
          description: 'Strategic business analysis',
          template: 'Conduct a SWOT analysis for [COMPANY/PROJECT] in the [INDUSTRY] sector. Analyze strengths, weaknesses, opportunities, and threats with specific examples and strategic recommendations.'
        }
      ]
    },
    {
      id: 'content',
      name: 'Content Creation',
      icon: BookOpen,
      color: 'bg-green-500',
      templates: [
        {
          title: 'Blog Post Outline',
          description: 'Structured blog content planning',
          template: 'Create a detailed blog post outline for "[TITLE]" targeting [AUDIENCE]. Include: compelling introduction, main sections with key points, supporting examples, and engaging conclusion with CTA.'
        },
        {
          title: 'Video Script',
          description: 'Engaging video content scripts',
          template: 'Write a [DURATION] video script about [TOPIC] for [PLATFORM]. Include: hook opening, main content sections, transitions, and clear call-to-action. Tone: [TONE].'
        },
        {
          title: 'Newsletter Content',
          description: 'Regular newsletter creation',
          template: 'Create newsletter content for [AUDIENCE] covering [TOPICS]. Include: catchy subject line, personal greeting, main content sections, featured content, and engaging sign-off.'
        }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      templates: [
        {
          title: 'Product Launch',
          description: 'New product announcement copy',
          template: 'Create a product launch announcement for [PRODUCT] highlighting [UNIQUE_FEATURES]. Include: excitement-building opening, key benefits, social proof, limited-time offer, and purchase CTA.'
        },
        {
          title: 'Customer Review Response',
          description: 'Professional review management',
          template: 'Write a professional response to a [POSITIVE/NEGATIVE] customer review about [PRODUCT/SERVICE]. Address their points, show appreciation/concern, and demonstrate commitment to quality.'
        },
        {
          title: 'Abandoned Cart Email',
          description: 'Recovery email sequences',
          template: 'Create an abandoned cart recovery email for customers who left [PRODUCT] in their cart. Include: friendly reminder, product benefits, urgency element, and easy checkout link.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Prompt Lab
          </h1>
          <p className="text-gray-600 mt-1">
            Build, test, and optimize your AI prompts with guided templates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Prompt Builder */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Prompt Builder</span>
                </CardTitle>
                <CardDescription>
                  Create and refine your prompts with our guided builder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Model</label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Temperature</label>
                    <Input type="number" min="0" max="1" step="0.1" defaultValue="0.7" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">System Role (Optional)</label>
                  <Input placeholder="You are a helpful assistant specialized in..." />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Prompt</label>
                  <Textarea 
                    placeholder="Enter your prompt here or select a template from the sidebar..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleRunPrompt}
                    disabled={!prompt || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isLoading ? 'Running...' : 'Run Prompt'}
                  </Button>
                  <Button variant="outline">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enhance
                  </Button>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Output</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  ) : output ? (
                    <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                  ) : (
                    <p className="text-gray-500 text-center">
                      Your AI response will appear here after running a prompt
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Categories */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Template Library</CardTitle>
                <CardDescription>Choose from categorized prompt templates</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
                  <TabsList className="grid grid-cols-2 gap-1 h-auto p-1">
                    {templateCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <TabsTrigger 
                          key={category.id} 
                          value={category.id}
                          className="flex flex-col items-center space-y-1 h-auto py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-xs">{category.name}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {templateCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-3 mt-4">
                      {category.templates.map((template, index) => (
                        <Card key={index} className="border hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setPrompt(template.template)}>
                          <CardContent className="p-3">
                            <div className="flex items-start space-x-2">
                              <div className={`p-1 rounded ${category.color} bg-opacity-20`}>
                                <Copy className="h-3 w-3" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{template.title}</h4>
                                <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full mt-2 text-xs h-7"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPrompt(template.template);
                                  }}
                                >
                                  Use Template
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Success Rate</span>
                    <Badge variant="secondary">94%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <Badge variant="secondary">2.3s</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Prompts This Month</span>
                    <Badge variant="secondary">127</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLab;
