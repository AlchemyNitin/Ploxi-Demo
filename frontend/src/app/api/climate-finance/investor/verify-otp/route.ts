import { NextRequest } from 'next/server';
import { jsonOk, jsonError } from '@/lib/auth';

/**
 * DEMO MODE — climate-finance/investor/verify-otp
 *
 * Accepts 123456 as the only valid code. No Supabase or DB calls are made.
 */
export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();
    const otpString = String(otp ?? '').trim();

    if (otpString === '123456') {
      return jsonOk({ success: true, message: 'Email verified successfully.' });
    }

    return jsonError('Invalid OTP. Please check the code and try again.', 400);
  } catch (e) {
    console.error('investor verify-otp', e);
    return jsonError('Verification failed.', 500);
  }
}
