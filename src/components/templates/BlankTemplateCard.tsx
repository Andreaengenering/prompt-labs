
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface BlankTemplateCardProps {
  onCreate: () => void;
}

export const BlankTemplateCard = ({ onCreate }: BlankTemplateCardProps) => (
  <Card
    className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.025] border-2 border-dashed border-foreground/10 bg-background/60 flex flex-col cursor-pointer"
    onClick={onCreate}
    role="button"
    tabIndex={0}
    aria-label="Start a blank template"
  >
    <CardHeader className="flex items-center justify-center pb-2 pt-6">
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="inline-block rounded-full p-4 bg-gradient-to-br from-yellow-400/30 to-purple-500/20 shadow">
          <Sparkles className="h-8 w-8 text-yellow-400 drop-shadow" />
        </span>
        <CardTitle className="text-xl font-bold text-foreground text-center">
          Start from Scratch
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className="text-center">
      <CardDescription className="text-sm text-muted-foreground mb-2">
        Create a custom prompt from an empty template, with helpful example lines and placeholders. Click to begin!
      </CardDescription>
      <ul className="text-xs text-left text-muted-foreground px-2 list-disc space-y-1 mt-2">
        <li><span className="font-semibold">Describe your goal</span> <span className="text-gray-400">(“Help me write a blog intro...")</span></li>
        <li><span className="font-semibold">Specify the context</span> <span className="text-gray-400">(“My audience is...")</span></li>
        <li><span className="font-semibold">Add constraints or requirements</span> <span className="text-gray-400">(“Use a formal tone, max 200 words...")</span></li>
        <li><span className="font-semibold">Optionally paste an existing template</span></li>
      </ul>
    </CardContent>
  </Card>
);

export default BlankTemplateCard;
