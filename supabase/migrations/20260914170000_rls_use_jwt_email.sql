-- The original policies read auth.users, which the authenticated role cannot select on a
-- standard Supabase project ("permission denied for table users"). Use the email claim
-- from the signed-in user's JWT instead.

DROP POLICY IF EXISTS "Users can read their own subscription" ON public.dodo_subscriptions;
CREATE POLICY "Users can read their own subscription"
ON public.dodo_subscriptions FOR SELECT TO authenticated
USING (lower(email) = lower(auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Users can read their own licenses" ON public.licenses;
CREATE POLICY "Users can read their own licenses"
ON public.licenses FOR SELECT TO authenticated
USING (lower(email) = lower(auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Users can read activations for their own licenses" ON public.license_activations;
CREATE POLICY "Users can read activations for their own licenses"
ON public.license_activations FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.licenses l
  WHERE l.id = license_activations.license_id
    AND lower(l.email) = lower(auth.jwt() ->> 'email')
));

-- Subscribers should only read their subscription; writes come from the Dodo webhook (service role).
REVOKE INSERT, UPDATE, DELETE ON public.dodo_subscriptions FROM authenticated;
