
-- Table to track free prompt lab generations per user
CREATE TABLE IF NOT EXISTS public.prompt_lab_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  count integer NOT NULL DEFAULT 0,
  last_used_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS so each user can only see/update their own credits
ALTER TABLE public.prompt_lab_credits ENABLE ROW LEVEL SECURITY;

-- Select: Only user can view their credits
CREATE POLICY "Users can view their own credits" ON public.prompt_lab_credits
  FOR SELECT USING (user_id = auth.uid());

-- Insert: Only user can insert their own row
CREATE POLICY "Users can insert their own credits" ON public.prompt_lab_credits
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Update: Only user can update their own credits row
CREATE POLICY "Users can update their own credits" ON public.prompt_lab_credits
  FOR UPDATE USING (user_id = auth.uid());

-- Optional: Allow deleting credits (shouldn't be needed, but for completeness)
CREATE POLICY "Users can delete own credits" ON public.prompt_lab_credits
  FOR DELETE USING (user_id = auth.uid());

-- Unique constraint: Only one row per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_prompt_lab_credits_user ON public.prompt_lab_credits(user_id);
