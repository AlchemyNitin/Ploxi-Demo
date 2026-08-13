import { NextRequest } from 'next/server';
import { jsonOk, jsonError } from '@/lib/auth';

/**
 * DEMO MODE — vendor/register/send-otp
 *
 * No OTP is generated or delivered. Validates required fields and returns
 * success so the OTP modal opens. The user must enter 123456 to proceed.
 */
export async function POST(req: NextRequest) {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      password,
      vendorType,
    } = await req.json();

    const em = typeof email === 'string' ? email.toLowerCase().trim() : '';

    if (!companyName || !contactPerson || !em || !phone || !password || !vendorType) {
      return jsonError('All fields are required.', 400);
    }
    if (String(password).length < 8) {
      return jsonError('Password must be at least 8 characters.', 400);
    }

    // DEMO: no email sent — enter 123456 in the OTP modal to continue.
    return jsonOk({
      success: true,
      message: 'Enter 123456 in the verification screen to continue.',
      vendorId: 'demo-vendor-id',
    });
  } catch (e) {
    console.error('vendor send-otp', e);
    return jsonError('Failed to process registration.', 500);
  }
}
