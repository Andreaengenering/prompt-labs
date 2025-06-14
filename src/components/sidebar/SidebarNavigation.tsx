
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Lock } from 'lucide-react';

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ElementType;
  requiresPro?: boolean;
}

interface SidebarNavigationProps {
  navigationItems: NavigationItem[];
  subscriptionTier: string | undefined;
  createCheckout: (tier: string) => void;
}

const proTiers = ['premium', 'pro-plus', 'executive-pro'];

function isProUser(subscriptionTier: string | undefined) {
  return !!subscriptionTier && proTiers.includes(subscriptionTier);
}

export function SidebarNavigation({
  navigationItems,
  subscriptionTier,
  createCheckout,
}: SidebarNavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  function handleLockedFeature(e: React.MouseEvent) {
    e.preventDefault();
    createCheckout('premium');
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const requiresPro = !!item.requiresPro;
            const proLocked = requiresPro && !isProUser(subscriptionTier);

            return (
              <SidebarMenuItem key={item.title}>
                {proLocked ? (
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="opacity-50 cursor-not-allowed pointer-events-auto"
                    onClick={handleLockedFeature}
                    tooltip="Requires Pro"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                      <Lock className="h-4 w-4 ml-auto text-muted-foreground" />
                    </div>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="sidebar-nav-item">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
