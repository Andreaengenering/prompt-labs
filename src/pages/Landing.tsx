
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Bot, BookOpen, Globe, BarChart3, Users, 
  Check, Star, ArrowRight, Sparkles, Shield, 
  Rocket, Target, Brain, Lightbulb, Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: Bot,
      title: "Guided Prompt Builder",
      description: "AI-assisted prompt construction with role-playing, constraints, and examples"
    },
    {
      icon: BookOpen,
      title: "Premium Templates",
      description: "Professional templates for business, marketing, and content creation"
    },
    {
      icon: Globe,
      title: "Social Media Integration",
      description: "Connect Facebook, TikTok, YouTube, LinkedIn, Twitter, and Instagram"
    },
    {
      icon: BarChart3,
      title: "Content Analytics",
      description: "Analyze your existing website and social media content for optimization"
    },
    {
      icon: Brain,
      title: "Chain-of-Thought Prompting",
      description: "Advanced reasoning techniques for better AI responses"
    },
    {
      icon: Target,
      title: "Few-Shot Examples",
      description: "Learn by example with proven prompt patterns"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "Free",
      description: "Explore core functionality",
      features: [
        "Access to basic Prompt Lab",
        "View community prompts", 
        "Limited prompt saves",
        "2 free premium prompts"
      ],
      cta: "Get Started Free",
      popular: false,
      benefits: "Discover community content and explore core functionality"
    },
    {
      name: "Premium",
      price: "$39.99/month",
      description: "Enhanced productivity",
      features: [
        "Full Prompt Lab access",
        "Unlimited saves",
        "Ad-free experience", 
        "Priority access to new LLMs",
        "10 premium prompts/month"
      ],
      cta: "Start Premium",
      popular: true,
      benefits: "Access to curated high-quality prompts and enhanced productivity"
    },
    {
      name: "Pro Plus",
      price: "$59.99/month", 
      description: "Professional optimization",
      features: [
        "All Premium features",
        "Advanced A/B testing analytics",
        "Custom prompt templates",
        "Ability to sell prompts",
        "50 premium prompts/month"
      ],
      cta: "Go Pro Plus",
      popular: false,
      benefits: "Monetization opportunities and deeper analytics"
    },
    {
      name: "Executive Pro",
      price: "$79.99/month",
      description: "Scalable for organizations", 
      features: [
        "All Pro Plus features",
        "Unlimited premium prompts",
        "Tailored solutions",
        "Comprehensive support",
        "White-label options"
      ],
      cta: "Contact Sales",
      popular: false,
      benefits: "Scalable for organizations with comprehensive support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Labs
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Try Dashboard</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-4 w-4 mr-1" />
            AI-Powered Prompt Engineering
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Master AI with
            <br />Perfect Prompts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your AI interactions with our guided prompt builder. Create, optimize, and scale your prompts with proven frameworks and real-time analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prompt-lab">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Start Building Prompts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to master AI prompt engineering</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-purple-600 border-2 scale-105' : ''} hover:shadow-xl transition-all`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  {plan.name === "Executive Pro" && (
                    <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{plan.price}</div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <p className="text-xs text-gray-600 mb-4">{plan.benefits}</p>
                    <Link to="/auth" className="block">
                      <Button 
                        className={`w-full text-sm ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Master AI Prompting?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals already using Prompt Labs to create better AI interactions
          </p>
          <Link to="/prompt-lab">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Your Free Trial
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6" />
                <span className="text-xl font-bold">Prompt Labs</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for AI prompt engineering and optimization.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/prompt-lab" className="hover:text-white">Prompt Lab</Link></li>
                <li><Link to="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Prompt Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
