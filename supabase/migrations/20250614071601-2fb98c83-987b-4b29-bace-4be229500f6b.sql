
-- Create a table for user feedback/suggestions
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Policy to allow insert if user matches
CREATE POLICY "Users can add feedback" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to view their own feedback
CREATE POLICY "Users can view their feedback" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to delete their own feedback
CREATE POLICY "Users can delete their feedback" ON public.feedback
  FOR DELETE USING (auth.uid() = user_id);
