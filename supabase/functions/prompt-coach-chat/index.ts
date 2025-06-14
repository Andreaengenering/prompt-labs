// Deno Deploy Edge Function
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const promptCoachSystem = 
      "You are an expert AI coach for prompt engineering. Your mission is to help users learn to write more effective prompts for AI (ChatGPT, Lovable, etc.). Guide users with practical tips, structure, feedback, and examples. Use educational feedback and never give generic answers. IMPORTANT: Please keep your suggestions short and concise, focusing only on what is most helpful.";

    const chatMessages = [
      { role: "system", content: promptCoachSystem },
      ...messages,
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: chatMessages,
        temperature: 0.4,
        max_tokens: 200, // Reduced from 600 to 200 for brevity
      }),
    });

    // Improved error handling: try to parse error only once
    if (!response.ok) {
      let errorOutput: unknown = null;
      let errorRaw = "";
      try {
        errorOutput = await response.json();
      } catch {
        // If .json() fails, fallback to .text(). But ONLY try one or the other.
        try {
          errorRaw = await response.text();
        } catch {
          errorRaw = "Unable to parse error response from OpenAI.";
        }
      }
      console.error("OpenAI API error:", errorOutput || errorRaw);
      return new Response(
        JSON.stringify({
          error: "OpenAI API error",
          details: errorOutput || errorRaw,
          status: response.status,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const coachMessage = data.choices?.[0]?.message?.content || "OpenAI API returned no content.";
    return new Response(JSON.stringify({ message: coachMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to generate chat response.",
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
