import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"] || "AIzaSyBDZzwe4_lUiCDkWlY_qIlcINxtN4tms1M",
  authDomain: import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"] || "macdissect.firebaseapp.com",
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"] || "macdissect",
  storageBucket:
    import.meta.env["VITE_FIREBASE_STORAGE_BUCKET"] || "macdissect.firebasestorage.app",
  messagingSenderId: import.meta.env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "949869248341",
  appId: import.meta.env["VITE_FIREBASE_APP_ID"] || "1:949869248341:web:eb4eb688e8a83c347739dc",
  measurementId: import.meta.env["VITE_FIREBASE_MEASUREMENT_ID"] || "G-W1MCB8XMPR",
};

let app: FirebaseApp | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

/**
 * Lazily initialize Firebase App (safe in both SSR and client environments).
 */
export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

/**
 * Lazily initialize Firebase Analytics only on the client side if supported by the browser.
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      try {
        const supported = await isSupported();
        if (!supported) return null;
        const currentApp = getFirebaseApp();
        return getAnalytics(currentApp);
      } catch (err) {
        console.warn("Firebase Analytics could not be initialized:", err);
        return null;
      }
    })();
  }

  return analyticsPromise;
}

/**
 * Log a custom event to Firebase Analytics safely without throwing.
 */
export async function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>,
): Promise<void> {
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  } catch (err) {
    // Fail silently in case of ad-blocker or network error
    console.debug(`[Firebase Analytics] trackEvent "${eventName}" suppressed:`, err);
  }
}

/**
 * Log a page view event to Firebase Analytics.
 */
export async function trackPageView(pagePath: string, pageTitle?: string): Promise<void> {
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_path: pagePath,
        page_title: pageTitle || (typeof document !== "undefined" ? document.title : ""),
        page_location: typeof window !== "undefined" ? window.location.href : "",
      });
    }
  } catch (err) {
    console.debug(`[Firebase Analytics] trackPageView "${pagePath}" suppressed:`, err);
  }
}
