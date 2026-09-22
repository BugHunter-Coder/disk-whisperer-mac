-- Dodo's hosted checkout can't skip its card form on a $0 one-time purchase (only subscriptions
-- support "Card-Optional at $0 Price"), so a fully-discounted launch claim is issued directly
-- instead of sending the user through Dodo. This RPC does the atomic "is a free slot still
-- available" check and reservation, serialized with an advisory lock so concurrent claims can't
-- push the count past FREE_LICENSE_LIMIT.
CREATE OR REPLACE FUNCTION public.reserve_free_license_claim(
  p_payment_id text,
  p_email text,
  p_product_id text,
  p_limit integer
) RETURNS boolean AS $$
DECLARE
  v_claimed bigint;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('free_license_claim'));

  SELECT count(*) INTO v_claimed FROM public.dodo_payments
  WHERE status = 'succeeded' AND total_amount = 0 AND NOT refunded;

  IF v_claimed >= p_limit THEN
    RETURN false;
  END IF;

  INSERT INTO public.dodo_payments (dodo_payment_id, email, product_id, status, total_amount, currency, refunded)
  VALUES (p_payment_id, p_email, p_product_id, 'succeeded', 0, NULL, false);

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

REVOKE ALL ON FUNCTION public.reserve_free_license_claim(text, text, text, integer) FROM public;
GRANT EXECUTE ON FUNCTION public.reserve_free_license_claim(text, text, text, integer) TO service_role;
