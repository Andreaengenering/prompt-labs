
-- Create content_performance table to store real post analytics
CREATE TABLE public.content_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  platform text NOT NULL,
  post_type text NOT NULL,
  engagement_rate numeric,
  post_time timestamp with time zone,
  hashtags text[],
  word_count integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_performance ENABLE ROW LEVEL SECURITY;

-- Let users view only their own content analytics
CREATE POLICY "Users can view their own content" ON public.content_performance
  FOR SELECT USING (auth.uid() = user_id);

-- Let users insert their own content analytics
CREATE POLICY "Users can create content analytics" ON public.content_performance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Let users update their own content analytics
CREATE POLICY "Users can update their own content analytics" ON public.content_performance
  FOR UPDATE USING (auth.uid() = user_id);

-- Let users delete their own content analytics
CREATE POLICY "Users can delete their own content analytics" ON public.content_performance
  FOR DELETE USING (auth.uid() = user_id);
