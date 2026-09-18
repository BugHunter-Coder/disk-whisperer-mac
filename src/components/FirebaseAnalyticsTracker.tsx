import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getFirebaseAnalytics, trackPageView } from "../lib/firebase";

/**
 * Component that initializes Firebase Analytics on the client side
 * and automatically logs page_view events on route navigation in TanStack Router.
 */
export function FirebaseAnalyticsTracker() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  // Ensure Firebase Analytics initializes on the client upon mount
  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  // Track page views on route transitions
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void trackPageView(pathname, typeof document !== "undefined" ? document.title : undefined);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
