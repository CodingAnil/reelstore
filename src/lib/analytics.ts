/**
 * Google Analytics 4 utility functions for ReelStore
 * Tracks visitor behavior, conversion funnels, revenue, and Instagram ad campaigns
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function isGAReady(): boolean {
  return typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    !!GA_ID &&
    GA_ID !== 'your-google-analytics-id-here';
}

/** Track any custom GA4 event */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (!isGAReady()) return;
  window.gtag('event', eventName, params);
}

/** Track when user views the pricing/product section */
export function trackViewItem(params: {
  itemId?: string;
  itemName?: string;
  price?: number;
  currency?: string;
}): void {
  trackEvent('view_item', {
    currency: params.currency ?? 'INR',
    value: params.price ?? 79,
    items: [
      {
        item_id: params.itemId ?? 'reelstore-bundle-500',
        item_name: params.itemName ?? 'ReelStore 500+ AI Reels Bundle',
        price: params.price ?? 79,
        quantity: 1,
      },
    ],
  });
}

/** Track checkout initiation (begin_checkout funnel step) */
export function trackBeginCheckout(params: {
  value?: number;
  currency?: string;
} = {}): void {
  trackEvent('begin_checkout', {
    currency: params.currency ?? 'INR',
    value: params.value ?? 79,
    items: [
      {
        item_id: 'reelstore-bundle-500',
        item_name: 'ReelStore 500+ AI Reels Bundle',
        price: params.value ?? 79,
        quantity: 1,
      },
    ],
  });
}

/** Track successful purchase / conversion */
export function trackPurchase(params: {
  transactionId: string;
  value?: number;
  currency?: string;
}): void {
  trackEvent('purchase', {
    transaction_id: params.transactionId,
    currency: params.currency ?? 'INR',
    value: params.value ?? 79,
    items: [
      {
        item_id: 'reelstore-bundle-500',
        item_name: 'ReelStore 500+ AI Reels Bundle',
        price: params.value ?? 79,
        quantity: 1,
      },
    ],
  });
}

/** Track download button click (post-purchase engagement) */
export function trackDownload(fileName: string = 'reelstore-bundle'): void {
  trackEvent('file_download', {
    file_name: fileName,
    link_text: 'Download Bundle',
  });
}

/** Track Instagram ad campaign clicks via UTM parameters */
export function trackCampaignClick(params: {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}): void {
  trackEvent('campaign_click', {
    traffic_source: params.source ?? 'instagram',
    traffic_medium: params.medium ?? 'paid_social',
    campaign_name: params.campaign ?? '',
    ad_content: params.content ?? '',
  });
}

/** Track CTA button clicks */
export function trackCTAClick(ctaLabel: string, location: string): void {
  trackEvent('cta_click', {
    cta_label: ctaLabel,
    page_section: location,
  });
}

/** Track form submission in checkout */
export function trackFormSubmit(formId: string): void {
  trackEvent('form_submit', {
    form_id: formId,
  });
}
