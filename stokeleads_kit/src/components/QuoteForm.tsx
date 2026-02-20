import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Upload, X, Image } from 'lucide-react';
import { validateForm, sanitizeFormData, formatPhoneNumber, type ValidationError } from '../utils/formValidation';
import { submitLeadWithTurnstile, type LeadData } from '../utils/leadSubmission';
import TurnstileWidget from './TurnstileWidget';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  consent: boolean;
  projectImage?: File | null;
}

const QuoteForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    consent: false,
    projectImage: null
  });

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData(prev => ({
      ...prev,
      projectImage: file
    }));

    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== 'projectImage'));
    }

    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      projectImage: null
    }));
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

    const sanitizedData = sanitizeFormData(formData);
    const validation = validateForm(sanitizedData);

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
        message: sanitizedData.projectDetails,
      };

      const result = await submitLeadWithTurnstile(leadData, turnstileToken);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectDetails: '',
          consent: false,
          projectImage: null
        });
        setTurnstileToken(null);
        setValidationErrors([]);
        setTimeout(() => setIsSubmitted(false), 5000);
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
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
        <p className="text-gray-700 mb-4">
          Your quote request has been submitted successfully. We will get back to you within 1 hour.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-primary hover:text-primary/80 underline text-sm transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">
        Request Your Free Estimate
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {submissionError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-800 font-medium mb-1">Submission Error</h4>
              <p className="text-red-700 text-sm">{submissionError}</p>
              <button
                type="button"
                onClick={() => setSubmissionError(null)}
                className="text-red-600 hover:text-red-800 underline text-sm mt-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-colors ${
                getFieldError('name')
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
              }`}
              placeholder="Your full name"
            />
            {getFieldError('name') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-colors ${
                getFieldError('email')
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
              }`}
              placeholder="your@email.com"
            />
            {getFieldError('email') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-colors ${
              getFieldError('phone')
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
            }`}
            placeholder="(555) 123-4567"
          />
          {getFieldError('phone') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
          )}
        </div>

        <div>
          <label htmlFor="project-details" className="block text-sm font-medium text-gray-700 mb-2">
            Project Details
          </label>
          <textarea
            id="project-details"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-colors resize-none ${
              getFieldError('projectDetails')
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
            }`}
            placeholder="Tell us about your project needs, timeline, and budget..."
          />
          {getFieldError('projectDetails') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('projectDetails')}</p>
          )}
        </div>

        {/* Project Image Upload */}
        <div>
          <label htmlFor="project-image" className="block text-sm font-medium text-gray-700 mb-2">
            Project Image (Optional)
          </label>

          {!formData.projectImage ? (
            <div className="relative">
              <input
                type="file"
                id="project-image"
                name="projectImage"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="project-image"
                className={`w-full px-4 py-4 bg-gray-50 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors flex flex-col items-center space-y-2 hover:bg-gray-100 ${
                  getFieldError('projectImage')
                    ? 'border-red-500 hover:border-red-400'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                <Upload className="w-6 h-6 text-gray-500" />
                <span className="text-gray-700 text-sm">
                  Click to upload project image
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>
          ) : (
            <div className="relative bg-gray-50 border border-gray-300 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium text-sm">{formData.projectImage.name}</p>
                  <p className="text-xs text-gray-600">
                    {(formData.projectImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="w-7 h-7 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          )}

          {getFieldError('projectImage') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('projectImage')}</p>
          )}
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-primary bg-white border border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
            By checking this box and submitting this form, I consent to receive marketing communications from Epsak via phone, email, and text message. I understand that I can opt out at any time by replying STOP to text messages or unsubscribing from emails. Message and data rates may apply. I acknowledge that I have read and agree to the{' '}
            <a href="/privacy-policy" className="text-primary hover:text-primary/80 underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms-of-service" className="text-primary hover:text-primary/80 underline">
              Terms of Service
            </a>
            . *
          </label>
          {getFieldError('consent') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('consent')}</p>
          )}
        </div>

        {/* Turnstile Widget - Invisible Mode */}
        <TurnstileWidget
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          onVerify={(token) => setTurnstileToken(token)}
          onError={(err) => console.error('Turnstile Error:', err)}
          invisible={true}
        />
        {getFieldError('turnstile') && (
          <p className="text-center text-sm text-red-600">{getFieldError('turnstile')}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group ${
            isSubmitting
              ? 'opacity-75 cursor-not-allowed'
              : 'transform hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Send Quote Request
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-600 text-center mt-4">
        * Required fields. We'll respond within 1 hour.
      </p>
    </div>
  );
};

export default QuoteForm;