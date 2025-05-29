
-- Create subscribers table to track subscription information
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own subscription info
CREATE POLICY "Users can view own subscription" ON public.subscribers
FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

-- Create policy for users to update their own subscription info
CREATE POLICY "Users can update own subscription" ON public.subscribers
FOR UPDATE USING (user_id = auth.uid() OR email = auth.email());

-- Create policy for inserting subscription info
CREATE POLICY "Users can insert subscription" ON public.subscribers
FOR INSERT WITH CHECK (user_id = auth.uid() OR email = auth.email());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
