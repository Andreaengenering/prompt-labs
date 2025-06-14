
-- Table to store user's connected social media accounts
CREATE TABLE public.social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  platform TEXT NOT NULL, -- e.g. 'youtube', 'facebook', 'tiktok', etc.
  account_username TEXT,  -- The user's username or page name on the platform
  access_token TEXT,      -- OAuth access token (should be encrypted in production)
  refresh_token TEXT,     -- OAuth refresh token (optional, for platforms that support it)
  token_expires_at TIMESTAMPTZ, -- When the access token expires (optional)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

-- Only the owner of the account can read/write/delete their own social integration
CREATE POLICY "User can manage their own social accounts"
  ON public.social_accounts
  FOR ALL
  USING (user_id::text = auth.uid()::text)
  WITH CHECK (user_id::text = auth.uid()::text);
