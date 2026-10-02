import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Mail, ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    if (!isFirebaseConfigured) {
      setErrorMessage(
        'Firebase configuration is not detected. Please verify your VITE_FIREBASE_* environment variables.'
      );
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setStatusMessage(
        'Password reset link has been dispatched to your email address. Please check your inbox and spam folder.'
      );
      setEmail('');
    } catch (err: any) {
      let message = 'Failed to send password reset email. Please try again.';
      if (err.code === 'auth/invalid-email') {
        message = 'Please provide a valid email address.';
      } else if (err.code === 'auth/user-not-found') {
        // Firebase Auth recommended security practice: user might not be revealed, but can mention
        message = 'No account found with this email address.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many requests. Please wait a moment before trying again.';
      } else if (err.code === 'auth/network-request-failed') {
        message = 'Network error. Please check your internet connection.';
      } else if (err.message) {
        message = err.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-[#241A12] border border-[#3E2723] rounded-3xl p-8 sm:p-10 shadow-gold-glow">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] border border-[#C9A44C]/40 flex items-center justify-center">
              <Mic2 className="w-5 h-5 text-[#C9A44C]" />
            </div>
            <span className="text-2xl font-serif font-bold text-[#F5E6C8]">GVista</span>
          </Link>
          <h2 className="text-2xl font-serif font-bold text-[#F5E6C8]">
            Reset Password
          </h2>
          <p className="text-xs text-[#F5E6C8]/60 mt-1">
            Enter your email to receive password reset instructions
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {statusMessage && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#F5E6C8]/80 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C9A44C]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] focus:ring-1 focus:ring-[#C9A44C] text-sm text-[#F5E6C8] placeholder-[#F5E6C8]/30 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm shadow-gold-glow hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Link...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#F5E6C8]/60">
          Remember your password?{' '}
          <Link to="/login" className="text-[#C9A44C] font-semibold hover:underline">
            Back to login
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span className="text-[11px] text-[#F5E6C8]/40">
            Secure authentication powered by Firebase.
          </span>
        </div>
      </div>
    </div>
  );
};
