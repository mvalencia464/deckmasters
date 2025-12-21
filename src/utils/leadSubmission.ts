/**
 * Utility to submit lead data to the backend with Turnstile verification.
 */

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  message?: string;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
}

/**
 * Submits lead data to the Netlify Function lead endpoint.
 * @param data The form data.
 * @param turnstileToken The token from Cloudflare Turnstile.
 */
export async function submitLeadWithTurnstile(
  data: LeadData,
  turnstileToken: string
): Promise<SubmissionResult> {
  if (!turnstileToken) {
    return {
      success: false,
      error: 'Please complete the security check.',
    };
  }

  try {
    const response = await fetch('/.netlify/functions/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        'cf-turnstile-response': turnstileToken,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit form. Please try again.',
      };
    }
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return {
      success: false,
      error: 'A network error occurred. Please try again later.',
    };
  }
}
