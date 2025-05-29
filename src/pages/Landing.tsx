
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Bot, BookOpen, Globe, BarChart3, Users, 
  Check, Star, ArrowRight, Sparkles, Shield, 
  Rocket, Target, Brain, Lightbulb, Crown, AlertTriangle,
  TrendingDown, Clock, DollarSign, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';

const Landing = () => {
  const { createCheckout, loading } = useSubscription();
  const { user } = useAuth();

  const problemPoints = [
    {
      icon: TrendingDown,
      title: "Inconsistent AI Results",
      description: "Your team gets wildly different results from AI tools, wasting time and money on trial-and-error prompting.",
      cost: "$2,000+/month in lost productivity"
    },
    {
      icon: Clock,
      title: "Time-Consuming Prompt Creation",
      description: "Hours spent crafting the perfect prompt instead of focusing on your core business objectives.",
      cost: "20+ hours/week per team member"
    },
    {
      icon: DollarSign,
      title: "Expensive AI Tool Subscriptions",
      description: "Multiple AI subscriptions with poor ROI because you're not maximizing their potential.",
      cost: "$500-2000+/month in underutilized tools"
    },
    {
      icon: Briefcase,
      title: "Competitive Disadvantage",
      description: "Your competitors are scaling faster with optimized AI workflows while you're still figuring it out.",
      cost: "Lost market share & opportunities"
    }
  ];

  const features = [
    {
      icon: Bot,
      title: "Guided Prompt Builder",
      description: "AI-assisted prompt construction with role-playing, constraints, and examples that guarantee better results"
    },
    {
      icon: BookOpen,
      title: "Premium Business Templates",
      description: "Proven templates for marketing, sales, customer service, and content creation that drive revenue"
    },
    {
      icon: Globe,
      title: "Social Media Integration",
      description: "Connect all platforms and analyze your content to identify what's working and scale it"
    },
    {
      icon: BarChart3,
      title: "ROI Analytics",
      description: "Track exactly how much time and money you're saving with optimized prompts"
    },
    {
      icon: Brain,
      title: "Chain-of-Thought Prompting",
      description: "Advanced reasoning techniques that make AI think like your best employee"
    },
    {
      icon: Target,
      title: "A/B Testing Framework",
      description: "Test and optimize prompts to find what works best for your specific business needs"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "Free",
      description: "Get started and see the difference",
      features: [
        "Access to basic Prompt Lab",
        "View community prompts", 
        "Limited prompt saves",
        "2 premium business templates"
      ],
      cta: "Start Free",
      popular: false,
      benefits: "Perfect for testing our platform"
    },
    {
      name: "Premium",
      price: "$39.99/month",
      description: "For growing businesses",
      features: [
        "Full Prompt Lab access",
        "Unlimited saves & templates",
        "Priority AI model access", 
        "ROI analytics dashboard",
        "50 premium business templates/month"
      ],
      cta: "Start Premium",
      popular: true,
      benefits: "Save 20+ hours/week and $2000+/month in productivity",
      plan: "premium"
    },
    {
      name: "Pro Plus",
      price: "$59.99/month", 
      description: "For scaling teams",
      features: [
        "All Premium features",
        "Advanced A/B testing analytics",
        "Custom prompt templates",
        "Team collaboration tools",
        "100 premium templates/month"
      ],
      cta: "Go Pro Plus",
      popular: false,
      benefits: "Scale your team's AI efficiency across departments",
      plan: "pro-plus"
    },
    {
      name: "Executive Pro",
      price: "$79.99/month",
      description: "For enterprise organizations", 
      features: [
        "All Pro Plus features",
        "Unlimited premium templates",
        "White-label solutions",
        "Dedicated success manager",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false,
      benefits: "Enterprise-grade AI optimization with full support",
      plan: "executive-pro"
    }
  ];

  const handlePlanSelect = async (plan: string) => {
    if (!user) {
      // Redirect to auth if not logged in
      window.location.href = '/auth';
      return;
    }
    await createCheckout(plan);
  };

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
                {user ? 'Dashboard' : 'Sign In'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
            Stop Wasting Money on Ineffective AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Business Is
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent block">
              Bleeding Money
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              on Bad AI Prompts
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Every day your team struggles with AI is costing you thousands in lost productivity, poor results, and competitive disadvantage. 
            <strong className="text-red-600"> Stop the bleeding.</strong> Start scaling with AI that actually works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prompt-lab">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Stop Losing Money - Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('problems')?.scrollIntoView()}>
              See What You're Losing
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Points Section */}
      <section id="problems" className="py-20 px-4 bg-red-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-red-900">
              The Hidden Costs of Poor AI Prompting
            </h2>
            <p className="text-xl text-red-700">These problems are costing your business more than you realize</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problemPoints.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card key={index} className="border-red-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="bg-red-100 p-3 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-red-900">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-3">
                      {problem.description}
                    </CardDescription>
                    <Badge variant="destructive" className="text-sm">
                      Cost: {problem.cost}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Solution That Pays for Itself</h2>
            <p className="text-xl text-gray-600">Transform your AI chaos into competitive advantage</p>
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
            <h2 className="text-4xl font-bold mb-4">Stop the Money Leak. Start Scaling.</h2>
            <p className="text-xl text-gray-600">Choose the plan that will save you the most money</p>
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
                    <Button 
                      className={`w-full text-sm ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => plan.plan ? handlePlanSelect(plan.plan) : window.location.href = '/auth'}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : plan.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Every Day You Wait Costs You More</h2>
          <p className="text-xl mb-8 opacity-90">
            Your competitors are already scaling with AI. Don't let them leave you behind.
          </p>
          <Link to="/prompt-lab">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Stop Losing Money - Start Free Now
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
                Stop losing money on ineffective AI. Start scaling your business with prompts that actually work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/prompt-lab" className="hover:text-white">Prompt Lab</Link></li>
                <li><Link to="/templates" className="hover:text-white">Business Templates</Link></li>
                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
                <li><Link to="/analytics" className="hover:text-white">ROI Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Success Stories</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>ROI Calculator</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Prompt Labs. All rights reserved. Stop losing money on bad AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
