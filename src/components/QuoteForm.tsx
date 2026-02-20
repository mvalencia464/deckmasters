import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { validateSimpleForm, sanitizeSimpleFormData, formatPhoneNumber, type SimpleFormData, type ValidationError } from '../utils/formValidation';
import { submitLeadWithTurnstile, type LeadData } from '../utils/leadSubmission';
import { analytics } from '../utils/analyticsTracker';
import TurnstileWidget from './TurnstileWidget';

// Declare google types globally if needed, or rely on runtime check
declare global {
  interface Window {
    google: any;
  }
}

const QuoteForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<SimpleFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    consent: false,
    marketingConsent: false
  });

  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;
    let scriptLoaded = false;

    const initAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places && addressInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' }, // Restrict to US
          fields: ['formatted_address', 'geometry']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({ ...prev, address: place.formatted_address }));
            // Clear address error if exists
            setValidationErrors(prev => prev.filter(error => error.field !== 'address'));
          }
        });

        if (checkInterval) {
          clearInterval(checkInterval);
        }
        scriptLoaded = true;
      }
    };

    // Check if script is already loaded
    if (window.google && window.google.maps) {
      initAutocomplete();
      scriptLoaded = true;
    } else {
      // Lazy-load Google Maps API only when this component mounts
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Once script loads, initialize autocomplete
        let retries = 0;
        const waitForGoogle = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.places) {
            clearInterval(waitForGoogle);
            initAutocomplete();
            scriptLoaded = true;
          }
          retries++;
          if (retries > 50) clearInterval(waitForGoogle); // Timeout after 5s
        }, 100);
      };

      script.onerror = () => {
        console.error('Failed to load Google Maps API');
      };

      document.head.appendChild(script);

      // Poll as fallback in case script was already in process of loading
      if (!scriptLoaded) {
        checkInterval = setInterval(initAutocomplete, 100);
      }
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== name));
    }

    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!turnstileToken) {
      setValidationErrors(prev => [...prev, { field: 'turnstile', message: 'Please complete the security check.' }]);
      return;
    }

    setIsSubmitting(true);
    setValidationErrors([]);
    setSubmissionError(null);

    const sanitizedData = sanitizeSimpleFormData(formData);
    const validation = validateSimpleForm(sanitizedData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const nameParts = sanitizedData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const leadData: LeadData = {
        firstName,
        lastName,
        email: sanitizedData.email,
        phone: sanitizedData.phone ? formatPhoneNumber(sanitizedData.phone) : '',
        address: sanitizedData.address,
        message: 'New Quote Request from Website', // Default message since we removed the field
      };

      const result = await submitLeadWithTurnstile(leadData, turnstileToken);

      if (result.success) {
        setIsSubmitted(true);
        analytics.trackLead('website_quote_form', 'Quote Request');
        analytics.trackFormSubmission('Quote Request Form', {
          source: 'website'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          consent: false,
          marketingConsent: false
        });
        setTurnstileToken(null);
        setValidationErrors([]);
        // Optional: clear the input value manually if needed, though react state should handle it
        if (addressInputRef.current) {
          addressInputRef.current.value = '';
        }
      } else {
        setSubmissionError(result.error || 'Submission failed. Please try again.');
      }

    } catch (err) {
      console.error('Form submission error:', err);
      setSubmissionError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-stone-900 border border-stone-800 p-12 rounded-sm shadow-2xl text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-8 border border-green-900 text-green-500 mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-display font-bold uppercase mb-4">Inquiry Received!</h2>
        <p className="text-stone-400 max-w-md mb-8 leading-relaxed mx-auto">
          Thank you for trusting Deck Masters. We'll get back to you within 1 hour to discuss your project.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="border border-stone-700 text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-stone-950 transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 border border-orange-600/30 p-8 rounded-sm w-full shadow-2xl animate-fade-in-up">
      <div className="mb-8 border-b border-orange-600/10 pb-6 text-center">
        <h3 className="text-2xl font-display font-bold uppercase mb-2">Request Estimate</h3>
        <p className="text-stone-500 text-xs uppercase tracking-widest font-bold">The No-Surprise Guarantee</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {submissionError && (
          <div className="bg-red-900/10 border border-red-900/50 rounded-sm p-4 flex items-start space-x-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-500 text-xs uppercase tracking-widest font-bold">{submissionError}</p>
              <button
                type="button"
                onClick={() => setSubmissionError(null)}
                className="text-red-600 hover:text-red-400 text-[10px] uppercase font-bold mt-2 tracking-widest"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full bg-stone-950 border p-4 font-bold text-white focus:outline-none transition-all text-sm uppercase placeholder:text-stone-700 ${getFieldError('name') ? 'border-red-600' : 'border-stone-800 focus:border-orange-600'}`}
              placeholder="Full Name*"
            />
            {getFieldError('name') && (
              <p className="mt-1 text-[10px] text-red-600 uppercase font-bold tracking-widest">{getFieldError('name')}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={`w-full bg-stone-950 border p-4 font-bold text-white focus:outline-none transition-all text-sm uppercase placeholder:text-stone-700 ${getFieldError('phone') ? 'border-red-600' : 'border-stone-800 focus:border-orange-600'}`}
              placeholder="Phone Number*"
            />
            {getFieldError('phone') && (
              <p className="mt-1 text-[10px] text-red-600 uppercase font-bold tracking-widest">{getFieldError('phone')}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full bg-stone-950 border p-4 font-bold text-white focus:outline-none transition-all text-sm uppercase placeholder:text-stone-700 ${getFieldError('email') ? 'border-red-600' : 'border-stone-800 focus:border-orange-600'}`}
            placeholder="Email Address*"
          />
          {getFieldError('email') && (
            <p className="mt-1 text-[10px] text-red-600 uppercase font-bold tracking-widest">{getFieldError('email')}</p>
          )}
        </div>

        <div>
          <input
            ref={addressInputRef}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className={`w-full bg-stone-950 border p-4 font-bold text-white focus:outline-none transition-all text-sm uppercase placeholder:text-stone-700 ${getFieldError('address') ? 'border-red-600' : 'border-stone-800 focus:border-orange-600'}`}
            placeholder="Property Address (Start Typing)*"
          />
          {getFieldError('address') && (
            <p className="mt-1 text-[10px] text-red-600 uppercase font-bold tracking-widest">{getFieldError('address')}</p>
          )}
        </div>

        <div className="pt-2 border-t border-orange-600/10 space-y-2">
          <label className="flex gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              required
              className="mt-0.5 w-4 h-4 rounded-sm border-orange-600/50 bg-stone-950 text-orange-600 focus:ring-orange-600 accent-orange-600 transition-all font-bold cursor-pointer"
            />
            <span className="text-[9px] text-stone-500 leading-snug uppercase tracking-wider">
              By checking this box I agree to Deck Masters' <a href="#/terms" onClick={(e) => { e.preventDefault(); window.location.hash = '#/terms'; }} className="text-orange-600 hover:underline font-bold">Terms</a> &amp; <a href="#/privacy" onClick={(e) => { e.preventDefault(); window.location.hash = '#/privacy'; }} className="text-orange-600 hover:underline font-bold">Privacy Policy</a> and consent to receive SMS messages about my project. Msg &amp; data rates may apply. Reply STOP to opt out. *
            </span>
          </label>

          <label className="flex gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleInputChange}
              required
              className="mt-0.5 w-4 h-4 rounded-sm border-orange-600/50 bg-stone-950 text-orange-600 focus:ring-orange-600 accent-orange-600 transition-all font-bold cursor-pointer"
            />
            <span className="text-[9px] text-stone-500 leading-snug uppercase tracking-wider">
              I consent to receive recurring automated marketing texts (promos, offers) from Deck Masters. Consent is not required to purchase. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to cancel. *
            </span>
          </label>

          {(getFieldError('consent') || getFieldError('marketingConsent')) && (
            <p className="mt-1 text-[9px] text-red-600 uppercase font-bold tracking-widest pl-7">
              {getFieldError('consent') || getFieldError('marketingConsent')}
            </p>
          )}
        </div>

        {/* Turnstile Widget */}
        <div className="flex justify-center py-2">
          <TurnstileWidget
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
            onVerify={(token) => setTurnstileToken(token)}
            onError={(err) => console.error('Turnstile Error:', err)}
          />
        </div>
        {getFieldError('turnstile') && (
          <p className="text-center text-[9px] text-red-600 uppercase font-bold tracking-widest">{getFieldError('turnstile')}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white hover:bg-orange-500 py-5 rounded-sm font-bold uppercase text-xs tracking-[0.25em] transition-all shadow-xl shadow-orange-950/40 flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Check Availability & Get Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-[10px] text-stone-600 text-center uppercase tracking-widest font-bold mt-4">
        Free Consultation • No Obligation • Locally Owned
      </p>
    </div>
  );
};

export default QuoteForm;

