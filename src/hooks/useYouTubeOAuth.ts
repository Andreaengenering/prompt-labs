
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// This initiates the YouTube OAuth flow using Supabase Auth's Google provider
export function useYouTubeOAuth() {
  const startOAuth = useCallback(async () => {
    // For this demo, we'll treat Google as a YouTube provider.
    // In production, you'd go through YouTube-specific OAuth2.
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Redirect back to /integrations after OAuth
        redirectTo: `${window.location.origin}/integrations?oauth=google`
      }
    });
    if (error) {
      console.error("YouTube OAuth Error:", error);
    }
    // On success, user will be redirected and session updated
    return { data, error };
  }, []);

  return { startOAuth };
}
