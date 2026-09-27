import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Phase 1: Clean UI. In Phase 2 Firebase authentication handles actual login.
    setNotice('Login UI ready. Real Firebase Authentication credentials handling is configured in Phase 2.');
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
            Welcome Back
          </h2>
          <p className="text-xs text-[#F5E6C8]/60 mt-1">
            Access your GVista dashboard and enquiries
          </p>
        </div>

        {notice && (
          <div className="mb-6 p-3 rounded-xl bg-[#3E2723]/60 border border-[#C9A44C]/40 text-xs text-[#F5E6C8] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C9A44C] flex-shrink-0" />
            <span>{notice}</span>
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#F5E6C8]/80">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-[#C9A44C] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C9A44C]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] focus:ring-1 focus:ring-[#C9A44C] text-sm text-[#F5E6C8] placeholder-[#F5E6C8]/30 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm shadow-gold-glow hover:brightness-105 transition-all flex items-center justify-center gap-2"
          >
            Sign In to GVista
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#F5E6C8]/60">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#C9A44C] font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
