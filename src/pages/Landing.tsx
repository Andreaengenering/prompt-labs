import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  Zap, Bot, BookOpen, BarChart3, Globe, 
  Star, ArrowRight, Sparkles, Target, Rocket 
} from 'lucide-react';
import { EarlyAccessSignupForm } from "@/components/EarlyAccessSignupForm";

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Bot,
      title: 'AI Prompt Lab',
      description: 'Craft, test, and refine prompts with our advanced editor'
    },
    {
      icon: BookOpen,
      title: 'Template Library',
      description: 'Access hundreds of proven prompt templates'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track and optimize your prompt effectiveness'
    },
    {
      icon: Globe,
      title: 'Platform Integration',
      description: 'Connect with ChatGPT, Claude, and more'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Page Label */}
      <div className="w-full bg-yellow-100 text-yellow-900 text-center py-2 text-sm font-semibold z-50 relative">
        <span>Landing Page</span>
      </div>
      {/* Navigation */}
      <nav className="border-b border-red-900/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                Prompt Labs
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Prompt Mastery Platform
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Master
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              AI Prompting
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Create, test, and optimize AI prompts with professional tools. 
            Turn your ideas into perfect AI conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-lg px-8">
                <Rocket className="h-5 w-5 mr-2" />
                Start Creating
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-red-600/30 text-red-400 hover:bg-red-600/10 text-lg px-8">
              <Target className="h-5 w-5 mr-2" />
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional tools for AI prompt engineering and optimization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="gallery-card">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-red-600 to-red-500 p-3 rounded-lg w-fit mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <Card className="gallery-card max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 rounded-full w-fit mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                  Ready to Transform Your AI Experience?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who've mastered AI prompting with Prompt Labs
              </p>
              <Link to={user ? "/dashboard" : "/auth"}>
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-lg px-8">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Early Access Signup Form */}
          <div className="mt-16 max-w-lg mx-auto">
            <EarlyAccessSignupForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
