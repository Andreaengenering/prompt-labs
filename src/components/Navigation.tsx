
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  Zap, BookOpen, Bot, User, LogOut, Menu, X,
  Star, Settings, HelpCircle, Crown, Globe, BarChart3,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Zap },
    { path: '/prompt-lab', label: 'Prompt Lab', icon: Bot },
  ];

  const toolsNavItems = [
    { path: '/templates', label: 'Templates', icon: BookOpen, description: 'Ready-to-use prompt templates' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, description: 'Performance insights & metrics' },
    { path: '/integrations', label: 'Integrations', icon: Globe, description: 'Connect your platforms' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Labs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Main Nav Items */}
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavigationMenuItem key={item.path}>
                      <Link to={item.path}>
                        <Button
                          variant={isActive(item.path) ? "default" : "ghost"}
                          className={`flex items-center space-x-2 ${
                            isActive(item.path) 
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}

                {/* Tools Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-gray-100">
                    <span>Tools</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                      {toolsNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{item.label}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Badge variant="secondary" className="hidden md:flex items-center space-x-1">
                  <Crown className="h-3 w-3" />
                  <span>Free</span>
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded-full">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden md:block">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2" />
                      My Prompts
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              {[...mainNavItems, ...toolsNavItems].map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(item.path) 
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                          : ""
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
