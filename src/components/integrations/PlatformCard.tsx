import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, AlertCircle, Plus, Lock } from 'lucide-react';
import { Platform } from '@/types/integrations';
import { useYouTubeOAuth } from "@/hooks/useYouTubeOAuth";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlatformCardProps {
  platform: Platform;
  isConnected: boolean;
  onConnect: (platformId: string, accountUsername?: string) => void;
  onDisconnect: (platformId: string) => void;
}

export function PlatformCard({ platform, isConnected, onConnect, onDisconnect }: PlatformCardProps) {
  const { user } = useAuth();
  const { subscriptionData, createCheckout } = useSubscription();
  const { startOAuth } = useYouTubeOAuth();
  const isProUser =
    subscriptionData.subscription_tier === "premium" ||
    subscriptionData.subscription_tier === "pro-plus" ||
    subscriptionData.subscription_tier === "executive-pro";

  const [inputValue, setInputValue] = useState('');

  // ---- Helper: true if this platform requires OAuth connection ----
  const isOAuthPlatform = (pid: string) => {
    return (
      pid === "youtube" ||
      pid === "facebook" ||
      pid === "instagram" ||
      pid === "linkedin" ||
      pid === "twitter" ||
      pid === "tiktok"
    );
  };

  // ---- Connect handler for all social integrations ----
  const handleConnectClick = async () => {
    if (!isProUser) {
      toast.info("Upgrade to Pro to connect this platform!");
      createCheckout("premium");
      return;
    }

    // ---- Real Google/YouTube OAuth ----
    if (platform.id === "youtube") {
      await startOAuth();
      // Connections handled after OAuth redirect
      return;
    }

    // ---- Mock "OAuth" for TikTok, Facebook, Instagram, Twitter ----
    if (
      platform.id === "tiktok" ||
      platform.id === "facebook" ||
      platform.id === "instagram" ||
      platform.id === "linkedin" ||
      platform.id === "twitter"
    ) {
      // If manual entry (TikTok username), use input
      const username = inputValue || user?.email || "";
      if ((platform.id === "tiktok" || platform.id === "facebook" || platform.id === "instagram" || platform.id === "twitter" || platform.id === "linkedin") && !username) {
        toast.warning(`Please enter your ${platform.name} username/handle.`);
        return;
      }
      // Store in Supabase (simulate connection)
      onConnect(platform.id, username);
      toast.success(`${platform.name} connected!`);
      return;
    }

    // ---- Website/manual entry ----
    if (platform.id === "website") {
      if (!inputValue) {
        toast.warning("Please enter your website URL.");
        return;
      }
      onConnect(platform.id, inputValue);
      toast.success("Website connected!");
      return;
    }
  };

  // Platform-specific placeholder text
  const getInputPlaceholder = () => {
    switch (platform.id) {
      case "website":
        return "Enter your website URL";
      case "tiktok":
        return "Enter your TikTok username";
      case "facebook":
        return "Enter your Facebook username/page";
      case "instagram":
        return "Enter your Instagram handle";
      case "linkedin":
        return "Enter your LinkedIn username/handle";
      case "twitter":
        return "Enter your Twitter/X handle";
      default:
        return `Enter your ${platform.name} handle`;
    }
  };

  return (
    <Card className="gallery-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${platform.bgColor}`}>
              <platform.icon className={`h-6 w-6 ${platform.color}`} />
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <span>{platform.name}</span>
                {platform.premium && (
                  <Badge variant="secondary" className="text-xs bg-red-600/20 text-red-400">
                    Premium
                  </Badge>
                )}
              </CardTitle>
            </div>
          </div>
          {isConnected ? (
            <CheckCircle className="h-5 w-5 text-red-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <CardDescription>{platform.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-500 font-medium">Connected</span>
              <Switch checked={true} />
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Last sync: 2 hours ago</div>
              <div className="text-xs text-muted-foreground">Content analyzed: 156 items</div>
              {platform.id === 'tiktok' && (
                <div className="text-xs text-red-400">Video insights available</div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1 border-red-600/30 hover:bg-red-600/20">
                View Analytics
              </Button>
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => onDisconnect(platform.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {(platform.id === "website" ||
              platform.id === "tiktok" ||
              platform.id === "facebook" ||
              platform.id === "instagram" ||
              platform.id === "linkedin" ||
              platform.id === "twitter") && (
              <Input
                placeholder={getInputPlaceholder()}
                className="bg-card border-border"
                value={inputValue}
                disabled={!isProUser}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )}
            <Button
              className={`w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 ${!isProUser ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={handleConnectClick}
              disabled={!isProUser}
            >
              {!isProUser && <Lock className="h-4 w-4 mr-2 text-muted-foreground" />}
              {isProUser && <Plus className="h-4 w-4 mr-2" />}
              {isProUser ? `Connect ${platform.name}` : "Upgrade to Connect"}
            </Button>
            {!isProUser && (
              <p className="text-xs text-muted-foreground text-center">
                Upgrade to Premium to connect this platform
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
