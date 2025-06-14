
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EarlyAccessSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from("early_access_signups")
      .insert([{ name: name.trim() || null, email: email.trim() }]);
    if (error) {
      setError("Something went wrong. Please try again!");
    } else {
      setSubmitted(true);
      setName("");
      setEmail("");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <h3 className="text-2xl font-bold mb-2 text-red-600">Thank you!</h3>
          <p className="text-muted-foreground">You're on the early access list. We’ll notify you at launch.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-red-600">Sign Up for Early Access</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Your name (optional)"
            disabled={submitting}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
          />
          <Input
            type="email"
            placeholder="Your email"
            disabled={submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
            disabled={submitting}
          >
            {submitting ? "Signing up..." : "Join Early Access"}
          </Button>
          {error && <div className="text-destructive text-sm mt-1">{error}</div>}
        </form>
      </CardContent>
    </Card>
  );
}
