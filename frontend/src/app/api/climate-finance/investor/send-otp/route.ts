import { NextRequest } from 'next/server';
import { jsonOk, jsonError } from '@/lib/auth';

/**
 * DEMO MODE — climate-finance/investor/send-otp
 *
 * No OTP is generated or delivered. Returns success so the OTP modal opens.
 * The user must enter 123456 to proceed.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as { email?: string };

    const em = typeof email === 'string' ? email.toLowerCase().trim() : '';
    if (!em || !em.includes('@')) {
      return jsonError('Valid email required.', 400);
    }

    // DEMO: no email sent — enter 123456 in the OTP modal to continue.
    return jsonOk({ success: true, message: 'Enter 123456 in the verification screen to continue.' });
  } catch (e) {
    console.error('investor send-otp', e);
    return jsonError('Failed to process registration.', 500);
  }
}