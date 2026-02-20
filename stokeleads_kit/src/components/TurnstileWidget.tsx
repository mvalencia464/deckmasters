import React, { useEffect, useRef } from 'react';

interface TurnstileWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
    };
  }
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ siteKey, onVerify, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  
  // Use refs for callbacks to avoid re-rendering loop when parent passes inline functions
  const onVerifyRef = useRef(onVerify);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onErrorRef.current = onError;
  }, [onVerify, onError]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Function to render the widget
    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: 'light',
            callback: (token: string) => {
              if (onVerifyRef.current) onVerifyRef.current(token);
            },
            'error-callback': (error: any) => {
              console.error('Turnstile error:', error);
              if (onErrorRef.current) onErrorRef.current(error);
            },
          });
          widgetIdRef.current = id;
        } catch (e) {
          console.error('Failed to render Turnstile widget:', e);
        }
      }
    };

    // If turnstile is already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      // If script hasn't loaded yet, it might scan automatically, 
      // but since we are dynamically mounting this component, we might need to wait.
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      
      return () => clearInterval(interval);
    }

    return () => {
      // Cleanup
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className="my-4 min-h-[65px]" />;
};

export default TurnstileWidget;
