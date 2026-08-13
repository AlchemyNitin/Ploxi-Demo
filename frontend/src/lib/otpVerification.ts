// ── DEMO MODE NOTE ─────────────────────────────────────────────────────────────
// When NEXT_PUBLIC_DEMO_MODE=true, this module bypasses all real Supabase OTP
// calls. Entering '123456' is the only accepted code in demo mode. Any other
// value triggers the standard invalid-OTP error. This flag must NEVER be set
// to 'true' in production environments.
// ───────────────────────────────────────────────────────────────────────────────

import { createSupabaseAnonAuthClient } from '@/lib/supabaseAnonAuth';
import type { AuthError, Session } from '@supabase/supabase-js';

export type OtpVerifyResult =
  | { ok: true; session: Session }
  | { ok: false; message: string; status: number };

/** The magic demo passcode. Only active when NEXT_PUBLIC_DEMO_MODE=true. */
const DEMO_OTP = '123456';

/** Returns true when the app is running in demo mode (no real OTP delivery). */
function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
}

export async function verifySupabaseEmailOtp(email: string, otp: unknown): Promise<OtpVerifyResult> {
  const otpString = String(otp ?? '').trim();
  if (!email?.includes('@') || otpString.length < 4) {
    return { ok: false, message: 'Email and OTP are required.', status: 400 };
  }

  // ── DEMO MODE BYPASS ────────────────────────────────────────────────────────
  // No real OTP is generated or delivered in demo mode.
  // Only '123456' is accepted; all other values are rejected normally.
  if (isDemoMode()) {
    if (otpString === DEMO_OTP) {
      // Return a synthetic result that satisfies the `ok: true` branch.
      // Downstream route handlers only check `result.ok` to proceed with
      // database updates; the session object itself is never used after that.
      return { ok: true, session: {} as Session };
    }
    return { ok: false, message: 'Invalid OTP. Please check the code and try again.', status: 400 };
  }
  // ── END DEMO MODE BYPASS ────────────────────────────────────────────────────

  const auth = createSupabaseAnonAuthClient();
  const { data, error } = await auth.auth.verifyOtp({
    email: email.trim(),
    token: otpString,
    type: 'email',
  });

  if (error || !data.session) {
    return { ok: false, message: mapAuthOtpError(error), status: 400 };
  }

  return { ok: true, session: data.session };
}

function mapAuthOtpError(err: AuthError | null): string {
  const msg = err?.message?.toLowerCase() || '';
  if (msg.includes('expired')) return 'OTP has expired. Please request a new one.';
  if (msg.includes('invalid')) return 'Invalid OTP. Please check the code and try again.';
  if (msg.includes('too many')) return 'Too many verification attempts. Please request a new OTP.';
  return 'Invalid or expired OTP. Please try again or request a new code.';
}
