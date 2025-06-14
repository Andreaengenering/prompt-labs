
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
  
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setMode("paste");
    } catch {
      // fallback or toast could be added
    }
  };

  const handleExample = () => {
    setText(BLANK_TEMPLATE_HINT);
    setMode("blank");
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
          {/* Add save or create logic here in future */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
