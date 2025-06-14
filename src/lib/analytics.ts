
/**
 * Google Analytics (GA4) event and pageview utilities for Prompt Labs.
 * Usage:
 *   import { trackEvent, trackPageview } from '@/lib/analytics';
 */

// Track a custom GA4 event (e.g. for A/B test variant, conversions, churn, retention, button clicks)
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params || {});
  }
}

// Track a pageview (manually, if needed)
export function trackPageview(path: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: path,
    });
  }
}

/**
 * Example usage:
 * 
 * // Track a button click:
 * trackEvent("create_prompt_click", { location: "Dashboard" });
 * 
 * // Track an A/B variant view:
 * trackEvent("experiment_view", { experiment_id: "homepage_test", variant: "B" });
 * 
 * // Track a conversion (e.g. signup):
 * trackEvent("signup_conversion", { method: "email" });
 * 
 * // For retention/churn: fire a "user_active" event on each visit,
 * // analyze retention/churn via GA4 cohorts and custom reports.
 */
