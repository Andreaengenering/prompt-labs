
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { Crown, CreditCard, RefreshCw } from "lucide-react";

export const SubscriptionStatus = () => {
  const { subscriptionData, loading, checkSubscription, openCustomerPortal } = useSubscription();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-blue-500';
      case 'pro-plus': return 'bg-purple-500';
      case 'executive-pro': return 'bg-gold-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'premium': return 'Premium';
      case 'pro-plus': return 'Pro Plus';
      case 'executive-pro': return 'Executive Pro';
      default: return 'Free';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <CardTitle>Subscription Status</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkSubscription}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Manage your subscription and billing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Plan:</span>
          <Badge className={getTierColor(subscriptionData.subscription_tier)}>
            {getTierName(subscriptionData.subscription_tier)}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={subscriptionData.subscribed ? "default" : "secondary"}>
            {subscriptionData.subscribed ? "Active" : "Inactive"}
          </Badge>
        </div>

        {subscriptionData.subscription_end && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Next Billing:</span>
            <span className="text-sm text-muted-foreground">
              {new Date(subscriptionData.subscription_end).toLocaleDateString()}
            </span>
          </div>
        )}

        {subscriptionData.subscribed && (
          <Button
            onClick={openCustomerPortal}
            disabled={loading}
            className="w-full flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Manage Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
