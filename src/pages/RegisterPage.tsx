import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mic2, Calendar, Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get('role');
  const initialRole: UserRole = queryRole === 'anchor' ? 'anchor' : 'organizer';

  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryRole === 'anchor' || queryRole === 'organizer') {
      setRole(queryRole);
    }
  }, [queryRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (role !== 'anchor' && role !== 'organizer') {
      setErrorMessage('Please select a valid account role (Anchor or Organizer).');
      return;
    }

    if (!isFirebaseConfigured) {
      setErrorMessage(
        'Firebase configuration is not detected. Please make sure the VITE_FIREBASE_* environment variables are set in your .env or Vercel dashboard.'
      );
      return;
    }

    setLoading(true);

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Set display name in Firebase Auth
      await updateProfile(user, {
        displayName: name.trim(),
      });

      // 3. Store in Firestore users/{uid} collection
      const userDocRef = doc(db, 'users', user.uid);
      const nowIso = new Date().toISOString();

      await setDoc(userDocRef, {
        uid: user.uid,
        name: name.trim(),
        email: user.email ?? email.trim(),
        role: role,
        status: 'active',
        createdAt: nowIso,
        updatedAt: nowIso,
        createdAtServer: serverTimestamp(),
        updatedAtServer: serverTimestamp(),
      });

      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        if (role === 'anchor') {
          navigate('/anchors');
        } else {
          navigate('/');
        }
      }, 1500);
    } catch (err: any) {
      let message = 'Failed to register account. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already registered. Please log in or use another email.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Invalid email address format.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
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
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${role === 'anchor'
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
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${role === 'organizer'
              ? 'bg-[#3E2723] text-[#C9A44C] border border-[#C9A44C]/40 shadow-sm'
              : 'text-[#F5E6C8]/70 hover:text-[#F5E6C8]'
              }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            I am an Organizer
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
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
                minLength={6}
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
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
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
                Registering...
              </>
            ) : (
              <>
                Create {role === 'anchor' ? 'Anchor' : 'Organizer'} Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#F5E6C8]/60">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C9A44C] font-semibold hover:underline">
            Log in
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
}
