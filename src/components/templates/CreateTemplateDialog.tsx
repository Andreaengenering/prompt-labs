
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardPaste, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

const BLANK_TEMPLATE_HINT = 
`[ Goal ]
e.g. "Help me write an engaging Instagram caption for a bakery's spring sale."

[ Context ]
e.g. "The bakery specializes in sourdough, audience is millennial foodies."

[ Requirements / Constraints ]
e.g. "Tone: playful, Up to 30 words, mention the word 'blooming'."

[You can also paste an existing template here]
`;

export const CreateTemplateDialog = ({ open, onClose }: CreateTemplateDialogProps) => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"blank" | "paste">("blank");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setMode("paste");
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to read clipboard",
        description: "Clipboard access is not available.",
      });
    }
  };

  const handleExample = () => {
    setText(BLANK_TEMPLATE_HINT);
    setMode("blank");
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Cannot generate prompt",
        description: "Please enter or paste a prompt before generating.",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      // Call the Supabase Edge Function 'prompt-coach-chat'
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || "https://nxxhmfimzgxyemoldnqb.supabase.co"}/functions/v1/prompt-coach-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Optionally pass Supabase JWT for protected edge function
            ...(window.localStorage.getItem("sb-access-token")
              ? { Authorization: `Bearer ${window.localStorage.getItem("sb-access-token")}` }
              : {}),
          },
          body: JSON.stringify({
            messages: [
              { role: "user", content: text }
            ]
          }),
        }
      );
      const data = await res.json();

      if (!res.ok || !data?.message) {
        toast({
          variant: "destructive",
          title: "Generation failed",
          description: typeof data?.error === "string" ? data.error : "An error occurred while generating your prompt.",
        });
        setResult(null);
      } else {
        setResult(data.message);
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err?.message || "Could not connect to the prompt generator.",
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="bg-background/95 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "blank" ? (
              <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">Create a New Prompt Template</span>
            ) : (
              "Paste an Existing Template"
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "blank"
              ? "Start with structured hints, or paste in your template below."
              : "Paste a ready-made prompt template or start editing below."}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-2 flex gap-2">
          <Button
            size="sm"
            variant={mode === "blank" ? "default" : "outline"}
            className="flex-1"
            onClick={handleExample}
            type="button"
          >
            <Sparkles className="h-4 w-4 mr-1" /> Use Example Structure
          </Button>
          <Button
            size="sm"
            variant={mode === "paste" ? "default" : "outline"}
            className="flex-1"
            onClick={handlePaste}
            type="button"
          >
            <ClipboardPaste className="h-4 w-4 mr-1" /> Paste Template
          </Button>
        </div>
        <Textarea
          className="min-h-[170px] bg-background/80 rounded-md border border-border text-foreground placeholder:text-muted-foreground font-mono text-base shadow-inner"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={BLANK_TEMPLATE_HINT}
          spellCheck={false}
        />
        <DialogFooter>
          <Button variant="secondary" type="button" onClick={onClose}>Close</Button>
          <Button
            type="button"
            variant="default"
            onClick={handleGenerate}
            disabled={loading || text.trim().length === 0}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2 w-4 h-4 border-2 border-grey-500 border-t-2 border-t-primary rounded-full"></span>
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </DialogFooter>
        {/* Show result */}
        {result && (
          <div className="mt-6 border rounded-lg bg-muted/60 border-border p-4">
            <div className="text-sm font-bold mb-1 text-foreground">AI Coach Suggestion</div>
            <div className="whitespace-pre-line text-base font-mono text-accent-foreground">{result}</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
