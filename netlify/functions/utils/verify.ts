/**
 * Verifies a Cloudflare Turnstile token.
 * @param token The token received from the client.
 * @param secret The Turnstile secret key.
 * @returns A promise that resolves to true if verified, false otherwise.
 */
export async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) {
    console.error('Turnstile verification failed: Missing token or secret.');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    if (!response.ok) {
      console.error('Turnstile verification failed: Cloudflare API returned non-OK status.', response.status);
      return false;
    }

    const data = await response.json() as { success: boolean; 'error-codes'?: string[] };
    
    if (!data.success) {
      console.error('Turnstile verification failed: Cloudflare returned success=false.', data['error-codes']);
    }

    return data.success;
  } catch (error) {
    console.error('Turnstile verification failed: Network error or unexpected exception.', error);
    return false;
  }
}
