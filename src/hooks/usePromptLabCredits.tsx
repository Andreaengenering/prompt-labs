
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

type CreditsState = {
  count: number;
  loading: boolean;
  limit: number;
  isLimited: boolean;
};

export function usePromptLabCredits() {
  const { user } = useAuth();
  const { subscriptionData } = useSubscription();
  const [credits, setCredits] = useState<CreditsState>({
    count: 0,
    loading: true,
    limit: 5,
    isLimited: false,
  });

  // Premium users are unlimited
  const isPro =
    !!subscriptionData?.subscribed &&
    ["premium", "pro-plus", "executive-pro"].includes(subscriptionData?.subscription_tier);

  const fetchCredits = useCallback(async () => {
    if (!user) {
      setCredits({
        count: 0,
        loading: false,
        limit: 5,
        isLimited: false,
      });
      return;
    }
    setCredits(c => ({ ...c, loading: true }));
    const { data, error } = await supabase
      .from("prompt_lab_credits")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) {
      toast.error("Failed to load generation credits");
      setCredits(c => ({ ...c, loading: false }));
    } else if (!data) {
      setCredits({
        count: 0,
        loading: false,
        limit: 5,
        isLimited: false,
      });
    } else {
      setCredits({
        count: data.count,
        loading: false,
        limit: 5,
        isLimited: data.count >= 5,
      });
    }
  }, [user]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  // Increment credits
  const increment = async () => {
    if (!user) return false;
    setCredits(c => ({ ...c, loading: true }));
    // Fix: onConflict as string, not array
    const { data, error } = await supabase
      .from("prompt_lab_credits")
      .upsert(
        { user_id: user.id, count: credits.count + 1, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      )
      .select()
      .maybeSingle();
    if (error) {
      toast.error("Failed to update credits");
      setCredits(c => ({ ...c, loading: false }));
      return false;
    }
    setCredits({
      count: data.count,
      loading: false,
      limit: 5,
      isLimited: data.count >= 5,
    });
    return true;
  };

  // For premium users, never limit
  return {
    count: isPro ? null : credits.count,
    limit: isPro ? null : credits.limit,
    isLimited: isPro ? false : credits.isLimited,
    loading: credits.loading,
    increment,
    refresh: fetchCredits,
    isPro,
  };
}
