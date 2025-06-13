
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
          <Zap className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent mb-6">
          Welcome to Prompt Labs
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Master the art of AI conversation with professional prompt templates and advanced analytics. 
          Your journey to AI prompt mastery starts here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 text-lg">
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          
          <Link to="/prompt-lab">
            <Button variant="outline" className="border-red-600/30 text-red-400 hover:bg-red-600/20 px-8 py-3 text-lg">
              Explore Templates
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-card/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Start building amazing AI-powered applications with our comprehensive prompt library
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
