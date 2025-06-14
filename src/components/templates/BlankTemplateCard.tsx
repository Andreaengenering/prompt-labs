
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface BlankTemplateCardProps {
  onCreate: () => void;
}

export const BlankTemplateCard = ({ onCreate }: BlankTemplateCardProps) => (
  <Card
    className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.025] border-2 border-dashed border-primary/20 bg-background/80 flex flex-col cursor-pointer rounded-2xl min-h-[340px] select-none"
    onClick={onCreate}
    role="button"
    tabIndex={0}
    aria-label="Start a blank template"
  >
    <CardHeader className="flex items-center justify-center pb-2 pt-7">
      <div className="flex flex-col items-center gap-3">
        <span className="inline-block rounded-full p-4 bg-gradient-to-br from-yellow-400/30 to-purple-500/20 shadow">
          <Sparkles className="h-8 w-8 text-yellow-400 drop-shadow" />
        </span>
        <CardTitle className="text-xl font-bold text-foreground text-center drop-shadow">Start from Scratch</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="text-center flex flex-col items-center justify-center flex-1">
      <CardDescription className="text-sm text-muted-foreground mb-2 px-2">
        Create a custom prompt with example sections and helpful guidance.<br />Click to begin!
      </CardDescription>
      <ul className="text-xs text-left text-muted-foreground px-2 list-disc space-y-1 mt-3 font-medium">
        <li>
          <span className="font-semibold text-foreground">Describe your goal</span>{" "}
          <span className="text-muted-foreground">(e.g. "Help me write a product description...")</span>
        </li>
        <li>
          <span className="font-semibold text-foreground">Specify the context</span>{" "}
          <span className="text-muted-foreground">(e.g. "Audience: Gen Z, Platform: Instagram")</span>
        </li>
        <li>
          <span className="font-semibold text-foreground">Add any requirements</span>{" "}
          <span className="text-muted-foreground">(e.g. "Use a witty tone, max 80 words")</span>
        </li>
        <li>
          <span className="font-semibold text-foreground">Paste an existing template, or start with hints</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default BlankTemplateCard;
