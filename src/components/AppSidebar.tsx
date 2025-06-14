import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Zap, LayoutDashboard, Bot, BookOpen, BarChart3, Globe,
  User, Settings, HelpCircle, LogOut, Plus, Crown, BookText, Sparkles, MessageCircle
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Prompt Lab',
    url: '/prompt-lab',
    icon: Bot,
  },
  {
    title: 'Templates',
    url: '/templates',
    icon: BookOpen,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Integrations',
    url: '/integrations',
    icon: Globe,
  },
  // NEW: Academy link
  {
    title: 'Prompt Labs Academy',
    url: '/academy',
    icon: BookText,
  },
  {
    title: 'Prompt Coach',
    url: '/coach',
    icon: Sparkles,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { subscriptionData, createCheckout, loading } = useSubscription();

  const isActive = (path: string) => location.pathname === path;

  // Show upgrade button only if NOT already on a paid plan
  const shouldShowUpgrade =
    user &&
    (!subscriptionData.subscribed ||
      subscriptionData.subscription_tier === 'free' ||
      !['premium', 'pro-plus', 'executive-pro'].includes(subscriptionData.subscription_tier));

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              Prompt Labs
            </h2>
            <p className="text-xs text-muted-foreground">AI Prompt Mastery</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link to={item.url} className="sidebar-nav-item">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade to Pro Button */}
        {shouldShowUpgrade && (
          <div className="mt-6">
            <Button
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold shadow-lg flex items-center gap-2"
              onClick={() => createCheckout('premium')}
              disabled={loading}
            >
              <Crown className="h-5 w-5 text-yellow-100 mr-2 drop-shadow" />
              Upgrade to Pro
            </Button>
          </div>
        )}

        {/* The existing New Prompt button */}
        <div className="mt-6">
          <Link to="/prompt-lab">
            <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Prompt
            </Button>
          </Link>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-red-600 text-white text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {subscriptionData.subscription_tier
                        ? subscriptionData.subscription_tier === 'free'
                          ? 'Free Plan'
                          : `${subscriptionData.subscription_tier.charAt(0).toUpperCase() + subscriptionData.subscription_tier.slice(1)}`
                        : 'Free Plan'}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
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
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
