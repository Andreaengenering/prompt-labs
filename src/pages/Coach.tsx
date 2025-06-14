
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Basic ChatBubble component
function ChatBubble({ role, content }: Message) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[70%] px-4 py-2 rounded-lg
        ${role === "user" ? "bg-red-100 text-right" : "bg-gray-100"}
        text-gray-900 whitespace-pre-line text-sm shadow`}>
        {content}
      </div>
    </div>
  );
}

// Main Coach chat page
export default function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Prompt Coach. Ask me anything about prompt engineering, and I'll help you write better prompts or answer your questions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/functions/v1/prompt-coach-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: input },
          ],
        }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.message || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((msgs) => [...msgs, {
        role: "assistant", content: "Oops! I couldn't get a response from the AI. Please try again later.",
      }]);
    }
    setLoading(false);
    textareaRef.current?.focus();
  }

  return (
    <div className="max-w-2xl mx-auto my-10 px-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-red-500" />
            <CardTitle className="text-2xl">Prompt Coach</CardTitle>
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            Chat with an AI coach to improve your prompt writing and learn advanced prompting strategies. Get help, practice, and feedback!
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-72 overflow-y-auto bg-white border rounded p-2 flex flex-col">
            {messages.map((m, idx) => (
              <ChatBubble key={idx} role={m.role} content={m.content} />
            ))}
            {loading && (
              <ChatBubble role="assistant" content="Thinking..." />
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <Textarea
              value={input}
              ref={textareaRef}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your prompt question or an example prompt..."
              rows={2}
              disabled={loading}
              className="resize-none min-h-[40px] flex-1"
              autoFocus
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4 mr-1" />Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
