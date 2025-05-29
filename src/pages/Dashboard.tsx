
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Code, MessageSquare, Users, Zap, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PromptCraft
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="#community" className="text-gray-600 hover:text-purple-600 transition-colors">Community</a>
            <Button variant="outline" className="mr-2">Sign In</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
          🚀 Pioneering AI Prompt Engineering
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
          Master AI with
          <br />Perfect Prompts
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your AI interactions with our comprehensive suite of prompt engineering tools. 
          Create, test, optimize, and monetize prompts like never before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6">
            Start Building Prompts
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">10K+</div>
            <div className="text-gray-600">Prompts Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">AI Models Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive AI Tools Suite</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to master prompt engineering and unlock AI's full potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader>
                <Code className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Prompt Lab</CardTitle>
                <CardDescription>
                  Comprehensive workbench for creating, testing, and optimizing prompts with A/B testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Version control & collaboration</li>
                  <li>• Multi-model testing</li>
                  <li>• Performance analytics</li>
                  <li>• Template library</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Niche Generators</CardTitle>
                <CardDescription>
                  Specialized prompt generators for coding, marketing, content creation, and business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• CodePrompt Pro</li>
                  <li>• Marketing Copy Maestro</li>
                  <li>• Story Weaver's Assistant</li>
                  <li>• Business Templates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Prompt Enhancer</CardTitle>
                <CardDescription>
                  AI-powered coach that analyzes and improves your prompts for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Clarity checker</li>
                  <li>• Specificity suggestions</li>
                  <li>• Before/after comparisons</li>
                  <li>• Advanced techniques</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Prompt-to-App</CardTitle>
                <CardDescription>
                  Low-code platform to transform prompts into full applications and workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Visual app builder</li>
                  <li>• API integrations</li>
                  <li>• Workflow automation</li>
                  <li>• Deployment tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-purple-800">Community & Marketplace</CardTitle>
                <CardDescription className="text-purple-700">
                  Share, discover, and monetize prompts in our vibrant community ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-purple-600">
                  <li>• Prompt sharing & ratings</li>
                  <li>• Monetization tools</li>
                  <li>• Competitions & challenges</li>
                  <li>• Premium content access</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Contextual Weaver</CardTitle>
                <CardDescription>
                  Intelligent context integration with real-time data and personalization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time data integration</li>
                  <li>• Personal context awareness</li>
                  <li>• Smart suggestions</li>
                  <li>• Refinement scoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Scale with our flexible pricing designed for every user</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 border-2">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <CardDescription>Perfect for exploration</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Basic Prompt Lab access</li>
                  <li>• View community prompts</li>
                  <li>• Limited prompt saves</li>
                  <li>• 2 premium prompts</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-purple-200">
              <CardHeader>
                <CardTitle>PRO</CardTitle>
                <div className="text-3xl font-bold text-purple-600">$39.99</div>
                <CardDescription>For serious creators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Full Prompt Lab access</li>
                  <li>• Unlimited saves</li>
                  <li>• Ad-free experience</li>
                  <li>• 10 premium prompts/month</li>
                  <li>• Priority LLM access</li>
                </ul>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Choose PRO</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-blue-600">Most Popular</Badge>
                <CardTitle>PRO PLUS</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$59.99</div>
                <CardDescription>Professional optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• All PRO features</li>
                  <li>• A/B testing analytics</li>
                  <li>• Custom templates</li>
                  <li>• 50 premium prompts/month</li>
                  <li>• Sell prompts</li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Choose PRO PLUS</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-white">Executive PRO</CardTitle>
                <div className="text-3xl font-bold text-yellow-400">$79.99</div>
                <CardDescription className="text-gray-300">Enterprise scale</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• Unlimited premium prompts</li>
                  <li>• Team collaboration</li>
                  <li>• Dedicated support</li>
                  <li>• Custom integrations</li>
                  <li>• White-glove onboarding</li>
                </ul>
                <Button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900">Choose Executive</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Thriving Community</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Connect with prompt engineers, share knowledge, and monetize your expertise
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-300">50K+</div>
              <div className="text-lg">Community Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-300">100K+</div>
              <div className="text-lg">Shared Prompts</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-teal-300">$2M+</div>
              <div className="text-lg">Creator Earnings</div>
            </div>
          </div>
          
          <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-6">
            Join Community
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">PromptCraft</span>
              </div>
              <p className="text-gray-400">
                Pioneering the future of AI prompt engineering with innovative tools and community.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Prompt Lab</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Niche Generators</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PromptCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
