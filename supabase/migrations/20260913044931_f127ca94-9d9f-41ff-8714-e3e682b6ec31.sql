CREATE TABLE public.licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key text NOT NULL UNIQUE,
  email text NOT NULL,
  dodo_subscription_id text,
  status text NOT NULL DEFAULT 'active',
  max_activations integer NOT NULL DEFAULT 3,
  activation_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX licenses_subscription_idx ON public.licenses (dodo_subscription_id) WHERE dodo_subscription_id IS NOT NULL;
CREATE INDEX licenses_email_idx ON public.licenses (lower(email));

GRANT SELECT ON public.licenses TO authenticated;
GRANT ALL ON public.licenses TO service_role;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own licenses"
ON public.licenses FOR SELECT TO authenticated
USING (lower(email) = lower((SELECT users.email FROM auth.users WHERE users.id = auth.uid())::text));

CREATE TABLE public.license_activations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id uuid NOT NULL REFERENCES public.licenses(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  device_name text,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (license_id, device_id)
);

GRANT SELECT ON public.license_activations TO authenticated;
GRANT ALL ON public.license_activations TO service_role;
ALTER TABLE public.license_activations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read activations for their own licenses"
ON public.license_activations FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.licenses l
  WHERE l.id = license_activations.license_id
    AND lower(l.email) = lower((SELECT users.email FROM auth.users WHERE users.id = auth.uid())::text)
));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON public.licenses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_license_activations_updated_at BEFORE UPDATE ON public.license_activations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();