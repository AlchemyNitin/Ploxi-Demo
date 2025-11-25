'use client';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function CleanTechSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-2xl p-12 text-center max-w-md">
        <Sparkles className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Ploxi Earth CleanTech!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Your CleanTech registration is complete. We are excited to support your sustainable innovation journey.We'll be in touch with you soon.
        </p>

        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
