import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mic2, Calendar, Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get('role');
  const initialRole: UserRole = queryRole === 'anchor' ? 'anchor' : 'organizer';
  
  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (queryRole === 'anchor' || queryRole === 'organizer') {
      setRole(queryRole);
    }
  }, [queryRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    // In Phase 1, UI only. Authentication connection happens in Phase 2.
    setValidationError('Registration interface ready. Firebase Authentication connects in Phase 2.');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            Create Your Account
          </h2>
          <p className="text-xs text-[#F5E6C8]/60 mt-1">
            Join GVista to connect or showcase your voice
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-1.5 bg-[#1A120B] rounded-2xl border border-[#3E2723]">
          <button
            type="button"
            onClick={() => setRole('anchor')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              role === 'anchor'
                ? 'bg-[#3E2723] text-[#C9A44C] border border-[#C9A44C]/40 shadow-sm'
                : 'text-[#F5E6C8]/70 hover:text-[#F5E6C8]'
            }`}
          >
            <Mic2 className="w-3.5 h-3.5" />
            I am an Anchor
          </button>
          
          <button
            type="button"
            onClick={() => setRole('organizer')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              role === 'organizer'
                ? 'bg-[#3E2723] text-[#C9A44C] border border-[#C9A44C]/40 shadow-sm'
                : 'text-[#F5E6C8]/70 hover:text-[#F5E6C8]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            I am an Organizer
          </button>
        </div>

        {validationError && (
          <div className="mb-6 p-3 rounded-xl bg-[#3E2723]/60 border border-[#C9A44C]/40 text-xs text-[#F5E6C8] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C9A44C] flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#F5E6C8]/80 mb-1.5">
              {role === 'anchor' ? 'Full Name / Stage Name' : 'Contact Person / Organization Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#C9A44C]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'anchor' ? 'e.g. Ramesh Kumar' : 'e.g. Apex Events / Ananya Sharma'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] focus:ring-1 focus:ring-[#C9A44C] text-sm text-[#F5E6C8] placeholder-[#F5E6C8]/30 transition-all outline-none"
              />
            </div>
          </div>

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
            <label className="block text-xs font-medium text-[#F5E6C8]/80 mb-1.5">
              Password
            </label>
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

          <div>
            <label className="block text-xs font-medium text-[#F5E6C8]/80 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C9A44C]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] focus:ring-1 focus:ring-[#C9A44C] text-sm text-[#F5E6C8] placeholder-[#F5E6C8]/30 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm shadow-gold-glow hover:brightness-105 transition-all flex items-center justify-center gap-2"
          >
            Create {role === 'anchor' ? 'Anchor' : 'Organizer'} Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#F5E6C8]/60">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C9A44C] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
