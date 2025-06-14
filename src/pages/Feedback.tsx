
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { MessageCircle, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchFeedback(user_id: string) {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

async function submitFeedback({ user_id, message }: { user_id: string; message: string }) {
  const { error } = await supabase.from("feedback").insert([{ user_id, message }]);
  if (error) throw new Error(error.message);
}

async function deleteFeedback(feedback_id: string) {
  const { error } = await supabase.from("feedback").delete().eq("id", feedback_id);
  if (error) throw new Error(error.message);
}

export default function FeedbackPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const qc = useQueryClient();

  const feedbackQuery = useQuery({
    queryKey: ["feedback", user?.id],
    queryFn: () => fetchFeedback(user!.id),
    enabled: !!user,
  });

  const submitMutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      toast.success("Feedback submitted!");
      setMessage("");
      qc.invalidateQueries({ queryKey: ["feedback", user?.id] });
    },
    onError: (e: any) => {
      toast.error("Could not submit feedback: " + e.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      toast.success("Deleted feedback.");
      qc.invalidateQueries({ queryKey: ["feedback", user?.id] });
    },
    onError: (e: any) => {
      toast.error("Could not delete: " + e.message);
    },
  });

  return (
    <div className="max-w-lg mx-auto my-10 px-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-2xl">Feedback & Ideas</CardTitle>
          </div>
          <p className="text-muted-foreground mt-1">
            Share your feedback or ideas for new features. Your thoughts go directly to the team!
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!message.trim()) return;
              submitMutation.mutate({ user_id: user!.id, message });
            }}
            className="mb-6"
          >
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell us what you think, or what you'd like to see improved…"
              rows={3}
              className="mb-2"
              disabled={submitMutation.isPending}
              required
            />
            <Button type="submit" disabled={submitMutation.isPending || !message.trim()}>
              Submit Feedback
            </Button>
          </form>
          <div>
            <h3 className="font-semibold text-md mb-3">Your recent feedback</h3>
            {feedbackQuery.isLoading ? (
              <div>Loading…</div>
            ) : feedbackQuery.data?.length === 0 ? (
              <div className="text-muted-foreground text-sm">No feedback yet.</div>
            ) : (
              <ul className="space-y-2">
                {feedbackQuery.data?.map((fb: any) => (
                  <li key={fb.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="text-sm break-words">{fb.message}</div>
                    <Button
                      size="icon" variant="ghost"
                      className="ml-2"
                      onClick={() => deleteMutation.mutate(fb.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
