
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
`[Goal]
e.g. "Help me write an engaging Instagram caption for a bakery's spring sale."

[Context]
e.g. "The bakery specializes in sourdough, audience is millennial foodies."

[Requirements/Constraints]
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

  const handleExample = () => setText(BLANK_TEMPLATE_HINT);

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "blank" ? "Create a New Prompt Template" : "Paste an Existing Template"}
          </DialogTitle>
          <DialogDescription>
            {mode === "blank"
              ? "Start from step-by-step examples, or paste in your template below."
              : "Paste in a ready-made prompt template or start editing below."}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-2 flex gap-2">
          <Button
            size="sm"
            variant={mode === "blank" ? "default" : "outline"}
            className="flex-1"
            onClick={() => { setMode("blank"); handleExample(); }}
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
          className="min-h-[160px] bg-background/70 text-foreground placeholder:text-muted-foreground"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={BLANK_TEMPLATE_HINT}
        />
        <DialogFooter>
          {/* This is only UI. You can extend it to save the template as required */}
          <Button variant="secondary" type="button" onClick={onClose}>Close</Button>
          {/* Add save or create logic here in future */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
