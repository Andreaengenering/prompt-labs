
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Code, Play, Save, Share2, BarChart3, Settings, 
  Sparkles, Zap, MessageSquare, TrendingUp 
} from 'lucide-react';

const PromptLab = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRunPrompt = async () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setOutput(`Response to: "${prompt}"\n\nThis is a simulated AI response. The actual implementation would integrate with various LLM APIs to provide real results.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Lab
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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
                    placeholder="Enter your prompt here..."
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
            {/* Quick Templates */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setPrompt("Write a professional email to...")}
                >
                  <div>
                    <div className="font-medium">Email Template</div>
                    <div className="text-xs text-gray-500">Professional email writing</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setPrompt("Create a marketing copy for...")}
                >
                  <div>
                    <div className="font-medium">Marketing Copy</div>
                    <div className="text-xs text-gray-500">Persuasive content</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setPrompt("Generate a Python function that...")}
                >
                  <div>
                    <div className="font-medium">Code Generation</div>
                    <div className="text-xs text-gray-500">Programming assistance</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setPrompt("Explain the concept of...")}
                >
                  <div>
                    <div className="font-medium">Educational Content</div>
                    <div className="text-xs text-gray-500">Learning & teaching</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Prompt History */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Recent Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium truncate">Write a product description for...</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium truncate">Create a social media post about...</div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium truncate">Generate a blog outline for...</div>
                  <div className="text-xs text-gray-500">2 days ago</div>
                </div>
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
