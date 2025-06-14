import React, { useState, useRef } from "react";
import { Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePromptLabCredits } from "@/hooks/usePromptLabCredits";
import { SidebarUpgradeCTA } from "@/components/sidebar/SidebarUpgradeCTA";

interface CustomPromptCardProps {
  onCopy?: (text: string) => void;
  isLimited?: boolean;
  isPro?: boolean;
  increment?: () => Promise<boolean>;
}

export const CustomPromptCard = ({ onCopy, isLimited, isPro, increment }: CustomPromptCardProps) => {
  const { toast } = useToast();
  const [customPrompt, setCustomPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    if (!customPrompt.trim()) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please enter a prompt before copying.",
      });
      return;
    }
    if (!isPro && isLimited) {
      toast({
        variant: "destructive",
        title: "Upgrade required",
        description: "You have reached your free prompt generation limit. Upgrade to unlock unlimited access.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(customPrompt);
      if (!isPro && increment) await increment();
      toast({
        title: "Prompt copied!",
        description: "Your custom prompt has been copied to clipboard.",
      });
      if (onCopy) onCopy(customPrompt);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy your prompt. Please try again.",
      });
    }
  };

  return (
    <div className="border-2 border-dashed border-red-200 rounded-xl bg-white/50 shadow-sm p-4 flex flex-col min-h-[190px] justify-between">
      <div>
        <div className="font-semibold text-red-500 flex items-center mb-2">
          <Copy className="h-4 w-4 mr-2" />
          Custom Prompt
        </div>
        <Textarea
          ref={textareaRef}
          className="resize-none text-sm bg-white/80 border-red-200 focus:border-red-400 min-h-[90px] mb-2"
          placeholder="Write or paste your own custom prompt here..."
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          maxLength={800}
        />
      </div>
      {isLimited && !isPro ? (
        <div className="flex flex-col gap-2 items-center">
          <div className="text-sm text-red-500 font-semibold text-center mb-1">
            You have reached your 5 free generations.<br />
            <span className="text-muted-foreground">Upgrade to unlock unlimited prompt creation!</span>
          </div>
          <SidebarUpgradeCTA shouldShowUpgrade={true} createCheckout={() => {}} loading={false} />
        </div>
      ) : (
        <button
          onClick={handleCopy}
          className="mt-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-3 py-1.5 rounded-md font-medium hover:from-red-500 hover:to-red-500 transition"
        >
          <Copy className="h-4 w-4 mr-1 inline-block align-middle" />
          Copy Prompt
        </button>
      )}
    </div>
  );
};

export default CustomPromptCard;
