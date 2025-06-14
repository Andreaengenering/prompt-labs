
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Zap, BookText, Sparkles, MessageCircle, LayoutDashboard, Bot, BookOpen, BarChart3, Globe } from 'lucide-react';

import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarProfile } from './sidebar/SidebarProfile';
import { SidebarUpgradeCTA } from './sidebar/SidebarUpgradeCTA';
import { SidebarNewPromptButton } from './sidebar/SidebarNewPromptButton';

// Move navigationItems outside the main component for reusability
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
    requiresPro: true,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const { subscriptionData, createCheckout, loading } = useSubscription();

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
        <SidebarNavigation
          navigationItems={navigationItems}
          subscriptionTier={subscriptionData.subscription_tier}
          createCheckout={createCheckout}
        />

        <SidebarUpgradeCTA
          shouldShowUpgrade={shouldShowUpgrade}
          createCheckout={createCheckout}
          loading={loading}
        />

        <SidebarNewPromptButton />
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user && (
          <SidebarProfile
            user={user}
            subscriptionTier={subscriptionData.subscription_tier}
            signOut={signOut}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

