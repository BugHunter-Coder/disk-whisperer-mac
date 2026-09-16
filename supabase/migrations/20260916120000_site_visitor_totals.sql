-- Total unique visitors to the marketing site, to date. Each browser gets a
-- random id (stored in localStorage) recorded once; the running total is
-- read back through a count-only RPC so anon clients never see raw rows.
CREATE TABLE public.site_visitors (
  visitor_id uuid PRIMARY KEY,
  first_seen timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_visitors ENABLE ROW LEVEL SECURITY;
-- No policies: table is only reachable through the SECURITY DEFINER functions below.

CREATE OR REPLACE FUNCTION public.record_site_visit(p_visitor_id uuid)
RETURNS void AS $$
  INSERT INTO public.site_visitors (visitor_id) VALUES (p_visitor_id)
  ON CONFLICT (visitor_id) DO NOTHING;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

REVOKE ALL ON FUNCTION public.record_site_visit(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.record_site_visit(uuid) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_site_visitor_count()
RETURNS bigint AS $$
  SELECT count(*) FROM public.site_visitors;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

REVOKE ALL ON FUNCTION public.get_site_visitor_count() FROM public;
GRANT EXECUTE ON FUNCTION public.get_site_visitor_count() TO anon, authenticated;
