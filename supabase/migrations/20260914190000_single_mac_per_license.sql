-- One license key = one Mac. New and existing licenses allow a single activation.
ALTER TABLE public.licenses ALTER COLUMN max_activations SET DEFAULT 1;
UPDATE public.licenses SET max_activations = 1 WHERE max_activations <> 1;

-- Enforce the limit in the database, so two Macs activating at the same moment can't both
-- slip past the app-level check. Locks the license row while counting.
CREATE OR REPLACE FUNCTION public.enforce_license_activation_limit()
RETURNS TRIGGER AS $$
DECLARE
  allowed integer;
  used integer;
BEGIN
  SELECT max_activations INTO allowed FROM public.licenses WHERE id = NEW.license_id FOR UPDATE;
  SELECT count(*) INTO used FROM public.license_activations WHERE license_id = NEW.license_id;
  IF used >= allowed THEN
    RAISE EXCEPTION 'license activation limit reached' USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS enforce_license_activation_limit ON public.license_activations;
CREATE TRIGGER enforce_license_activation_limit BEFORE INSERT ON public.license_activations
FOR EACH ROW EXECUTE FUNCTION public.enforce_license_activation_limit();
