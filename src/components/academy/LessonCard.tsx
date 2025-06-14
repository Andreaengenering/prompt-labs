
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
  lesson: {
    title: string;
    description: string;
    free: boolean;
  };
  locked: boolean;
  upgradeLink: string | null;
}

export function LessonCard({ lesson, locked, upgradeLink }: LessonCardProps) {
  return (
    <Card className="relative h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">{lesson.title}</CardTitle>
          {locked ? (
            <Lock className="h-4 w-4 text-red-400" />
          ) : lesson.free === false ? (
            <Unlock className="h-4 w-4 text-green-500" />
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {locked ? (
          <div>
            <p className="mb-2 text-muted-foreground">This lesson requires a Pro subscription.</p>
            {upgradeLink && (
              <Button
                size="sm"
                className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                asChild
              >
                <a href={upgradeLink}>Upgrade to Pro</a>
              </Button>
            )}
          </div>
        ) : (
          <p>{lesson.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
