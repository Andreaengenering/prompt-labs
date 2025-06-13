
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Platform } from '@/types/integrations';

interface PlatformCardProps {
  platform: Platform;
  isConnected: boolean;
  onConnect: (platformId: string) => void;
  onDisconnect: (platformId: string) => void;
}

export function PlatformCard({ platform, isConnected, onConnect, onDisconnect }: PlatformCardProps) {
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
            {platform.id === 'website' && (
              <Input placeholder="Enter your website URL" className="bg-card border-border" />
            )}
            <Button 
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              onClick={() => onConnect(platform.id)}
              disabled={platform.premium}
            >
              <Plus className="h-4 w-4 mr-2" />
              Connect {platform.name}
            </Button>
            {platform.premium && (
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
