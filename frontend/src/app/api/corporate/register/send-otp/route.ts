import { NextRequest } from 'next/server';
import { jsonOk, jsonError } from '@/lib/auth';

/**
 * DEMO MODE — corporate/register/send-otp
 *
 * No OTP is generated or delivered. Validates required fields and returns
 * success so the OTP modal opens. The user must enter 123456 to proceed.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, formData } = body as {
      email?: string;
      formData?: Record<string, unknown>;
    };

    const em = typeof email === 'string' ? email.toLowerCase().trim() : '';
    if (!em || !em.includes('@')) {
      return jsonError('Valid email required.', 400);
    }

    const fd = formData || {};
    const fullName    = String(fd.fullName    || '').trim();
    const designation = String(fd.designation || '').trim();
    const companyName = String(fd.companyName || '').trim();
    const industrySector = String(fd.industrySector || '').trim();
    const phone       = String(fd.phone       || '').trim();

    if (!fullName || !designation || !companyName || !industrySector || !phone) {
      return jsonError('Please complete all required company detail fields.', 400);
    }

    // DEMO: no email sent — enter 123456 in the OTP modal to continue.
    return jsonOk({ success: true, message: 'Enter 123456 in the verification screen to continue.' });
  } catch (e) {
    console.error('corporate send-otp', e);
    return jsonError('Failed to process registration.', 500);
  }
}
