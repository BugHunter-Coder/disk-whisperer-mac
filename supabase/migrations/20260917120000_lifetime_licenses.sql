-- MacDissect Pro is now a one-time, lifetime purchase instead of a yearly subscription.
-- Each paid (or launch-promo free) Dodo payment issues one license that never expires;
-- a refund revokes it. Existing subscription licenses stay valid for life.

CREATE TABLE public.dodo_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dodo_payment_id text NOT NULL UNIQUE,
  email text NOT NULL,
  customer_id text,
  product_id text,
  status text NOT NULL,
  -- In the currency's smallest unit; 0 for a launch-promo free license.
  total_amount integer NOT NULL DEFAULT 0,
  currency text,
  refunded boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.dodo_payments TO authenticated;
GRANT ALL ON public.dodo_payments TO service_role;

ALTER TABLE public.dodo_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own payments"
ON public.dodo_payments FOR SELECT TO authenticated
USING (lower(email) = lower(auth.jwt() ->> 'email'));

ALTER TABLE public.licenses ADD COLUMN dodo_payment_id text UNIQUE;

-- Free launch licenses claimed so far, for the public "N of 50 left" counter.
CREATE OR REPLACE FUNCTION public.get_free_license_claims()
RETURNS bigint AS $$
  SELECT count(*) FROM public.dodo_payments
  WHERE status = 'succeeded' AND total_amount = 0 AND NOT refunded;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

REVOKE ALL ON FUNCTION public.get_free_license_claims() FROM public;
GRANT EXECUTE ON FUNCTION public.get_free_license_claims() TO anon, authenticated, service_role;
