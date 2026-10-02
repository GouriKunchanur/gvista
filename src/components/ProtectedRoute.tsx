import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#C9A44C] animate-spin" />
        <p className="text-sm text-[#F5E6C8]/70">Verifying authentication...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-[#241A12] border border-red-500/30 rounded-3xl p-8 text-center shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-red-950/50 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7 text-red-400" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#F5E6C8] mb-2">
            Access Restricted
          </h2>
          <p className="text-xs text-[#F5E6C8]/70 mb-6 leading-relaxed">
            This administration portal is strictly reserved for authorized GVista platform owners and administrators. Your account (<span className="text-[#C9A44C]">{currentUser.email}</span>) does not have administrator privileges.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-xs shadow-gold-glow hover:brightness-105 transition-all inline-block"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
