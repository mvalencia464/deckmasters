/**
 * Analytics Tracker - Meta Pixel & GTM Integration
 * Implements route-change listeners for SPA-safe tracking
 * Integrates Andromeda Matrix angle tagging
 */

interface ConversionEvent {
  eventName: string;
  value?: number;
  currency?: string;
  contentName?: string;
  contentType?: string;
  customProperties?: Record<string, any>;
}

interface GTMEvent {
  event: string;
  page_path: string;
  page_title: string;
  andromeda_angle?: string;
  [key: string]: any;
}

export class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private currentPath: string = '';
  private currentAngle: string = '';

  private constructor() {
    this.initializeListeners();
  }

  static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  /**
   * Initialize route change listeners for SPA navigation
   * Fires GTM & Meta Pixel events on path changes
   */
  private initializeListeners(): void {
    // Listen for history changes (popstate)
    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });

    // Track initial page load
    this.trackPageView(window.location.pathname, document.title);
  }

  /**
   * Override history.pushState to intercept route changes
   * Called from router/navigation components
   */
  public hookRouterChange(router: any): void {
    const originalPush = window.history.pushState;
    window.history.pushState = (...args: any[]) => {
      originalPush.apply(window.history, args);
      this.handleRouteChange();
    };
  }

  /**
   * Handle route change and fire tracking events
   */
  private handleRouteChange(): void {
    setTimeout(() => {
      const path = window.location.pathname;
      const title = document.title;
      this.trackPageView(path, title);
    }, 100);
  }

  /**
   * Track page views with Andromeda angle tagging
   */
  public trackPageView(path: string, title: string): void {
    this.currentPath = path;

    const angle = this.getAndromedaAngle(path);
    if (angle) {
      this.currentAngle = angle;
    }

    // Fire GTM event
    this.fireGTMEvent({
      event: 'page_view',
      page_path: path,
      page_title: title,
      andromeda_angle: angle || 'unset'
    });

    // Fire Meta Pixel PageView
    this.fireMetaPixelEvent({
      eventName: 'PageView',
      contentName: title,
      customProperties: {
        page_path: path,
        andromeda_angle: angle
      }
    });

    console.debug(`[Analytics] Page View: ${path}`, { angle });
  }

  /**
   * Track lead conversions (primary goal)
   * Triggered by CTA clicks, form submissions, etc.
   */
  public trackLead(source: string, offer?: string): void {
    const gtmEvent: GTMEvent = {
      event: 'lead',
      page_path: this.currentPath,
      page_title: document.title,
      lead_source: source,
      andromeda_angle: this.currentAngle
    };

    if (offer) {
      gtmEvent.lead_offer = offer;
    }

    // Fire GTM Lead event
    this.fireGTMEvent(gtmEvent);

    // Fire Meta Pixel Lead conversion
    this.fireMetaPixelEvent({
      eventName: 'Lead',
      contentName: offer || source,
      customProperties: {
        lead_source: source,
        page_path: this.currentPath,
        andromeda_angle: this.currentAngle
      }
    });

    console.debug(`[Analytics] Lead Tracked: ${source}`, { offer, angle: this.currentAngle });
  }

  /**
   * Track micro-offer engagement
   * Triggered when users interact with Trust/Value/Luxury CTAs
   */
  public trackMicroOfferClick(offerId: string, label: string): void {
    const angle = this.getAngleForOffer(offerId);

    this.fireGTMEvent({
      event: 'micro_offer_click',
      page_path: this.currentPath,
      page_title: document.title,
      offer_id: offerId,
      offer_label: label,
      andromeda_angle: angle
    });

    this.fireMetaPixelEvent({
      eventName: 'ViewContent',
      contentName: label,
      contentType: 'micro_offer',
      customProperties: {
        offer_id: offerId,
        andromeda_angle: angle
      }
    });

    console.debug(`[Analytics] Micro Offer: ${offerId}`, { label, angle });
  }

  /**
   * Track sticky CTA engagement (mobile)
   */
  public trackStickyCTAClick(): void {
    this.trackLead('sticky_cta_mobile', 'Get My Quote');
    
    this.fireGTMEvent({
      event: 'sticky_cta_engagement',
      page_path: this.currentPath,
      cta_type: 'mobile_sticky'
    });

    console.debug('[Analytics] Sticky CTA Clicked (Mobile)');
  }

  /**
   * Track form submission
   */
  public trackFormSubmission(formName: string, fields?: Record<string, any>): void {
    this.fireGTMEvent({
      event: 'form_submit',
      page_path: this.currentPath,
      page_title: document.title,
      form_name: formName,
      andromeda_angle: this.currentAngle,
      ...fields
    });

    this.fireMetaPixelEvent({
      eventName: 'Lead',
      contentName: formName,
      customProperties: {
        form_name: formName,
        andromeda_angle: this.currentAngle,
        ...fields
      }
    });

    console.debug(`[Analytics] Form Submitted: ${formName}`, { angle: this.currentAngle });
  }

  /**
   * Get Andromeda angle for current path
   */
  private getAndromedaAngle(path: string): string {
    const angleMap: Record<string, string> = {
      '/': 'Angle 1: Premium Outdoor Luxury',
      '/is-trex-decking-right-for-you': 'Angle 4: Smart Investment',
      '/deck-repair': 'Angle 3: Trust/Fixed-Price',
      '/deck-repair-maintenance': 'Angle 3: Trust/Fixed-Price',
      '/custom-deck-design': 'Angle 1: Premium Outdoor Luxury',
      '/new-deck-construction': 'Angle 1: Premium Outdoor Luxury',
      '/dock-building': 'Angle 2: Waterfront Lifestyle'
    };

    // Exact match first
    if (angleMap[path]) {
      return angleMap[path];
    }

    // Partial match
    for (const [route, angle] of Object.entries(angleMap)) {
      if (path.startsWith(route) && route !== '/') {
        return angle;
      }
    }

    return '';
  }

  /**
   * Get angle for specific micro-offer
   */
  private getAngleForOffer(offerId: string): string {
    const offerAngleMap: Record<string, string> = {
      'safety_insp': 'Angle 3: Trust/Fixed-Price',
      'frost_heave': 'Angle 4: Smart Investment',
      '3d_render': 'Angle 1: Premium Outdoor Luxury'
    };

    return offerAngleMap[offerId] || 'Unset';
  }

  /**
   * Fire GTM event
   */
  private fireGTMEvent(event: GTMEvent): void {
    if (typeof (window as any).dataLayer !== 'undefined') {
      (window as any).dataLayer.push(event);
    }
  }

  /**
   * Fire Meta Pixel event
   */
  private fireMetaPixelEvent(event: ConversionEvent): void {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', event.eventName, {
        value: event.value,
        currency: event.currency,
        content_name: event.contentName,
        content_type: event.contentType,
        ...event.customProperties
      });
    }
  }

  /**
   * Track custom event
   */
  public trackCustomEvent(eventName: string, properties: Record<string, any>): void {
    this.fireGTMEvent({
      event: eventName,
      page_path: this.currentPath,
      ...properties
    });

    console.debug(`[Analytics] Custom Event: ${eventName}`, properties);
  }
}

// Export singleton instance
export const analytics = AnalyticsTracker.getInstance();
