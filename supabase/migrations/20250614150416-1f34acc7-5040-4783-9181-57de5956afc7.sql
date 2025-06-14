
-- Table to store early access signups
CREATE TABLE public.early_access_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable row level security to protect emails/names
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can insert signups (public signup form)
CREATE POLICY "Allow insert public" ON public.early_access_signups
  FOR INSERT
  WITH CHECK (true);

-- Only the owner of the signup (no auth in this case) or staff can read/delete/update (lock it down)
CREATE POLICY "No public read" ON public.early_access_signups
  FOR SELECT
  USING (false);

CREATE POLICY "No public update" ON public.early_access_signups
  FOR UPDATE
  USING (false);

CREATE POLICY "No public delete" ON public.early_access_signups
  FOR DELETE
  USING (false);
