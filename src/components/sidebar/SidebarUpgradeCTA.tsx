
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

interface SidebarUpgradeCTAProps {
  shouldShowUpgrade: boolean;
  createCheckout: (tier: string) => void;
  loading: boolean;
}

export function SidebarUpgradeCTA({
  shouldShowUpgrade,
  createCheckout,
  loading,
}: SidebarUpgradeCTAProps) {
  if (!shouldShowUpgrade) return null;
  return (
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
  );
}
