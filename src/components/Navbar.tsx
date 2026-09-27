import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic2, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Find Anchors', path: '/anchors' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1A120B]/90 backdrop-blur-md border-b border-[#3E2723]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C9A44C] rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3E2723] to-[#1A120B] border border-[#C9A44C]/40 flex items-center justify-center shadow-gold-glow group-hover:border-[#C9A44C] transition-all">
              <Mic2 className="w-5 h-5 text-[#C9A44C]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif tracking-wider font-bold text-[#F5E6C8] group-hover:text-white transition-colors">
                GVista
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A44C]/80 font-medium">
                Stage & Voice
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#C9A44C] focus:outline-none focus:ring-1 focus:ring-[#C9A44C] rounded px-2 py-1 ${
                  isActive(link.path)
                    ? 'text-[#C9A44C] font-semibold'
                    : 'text-[#F5E6C8]/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-[#F5E6C8] hover:text-[#C9A44C] px-4 py-2 transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A44C] rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/register?role=anchor"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-[#C9A44C] to-[#9C7729] text-[#1A120B] hover:shadow-gold-glow transition-all"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-150 bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] hover:brightness-105 rounded-[7px] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Join as Anchor
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#F5E6C8] hover:text-[#C9A44C] hover:bg-[#3E2723]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A44C]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A120B] border-b border-[#3E2723] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-[#3E2723] text-[#C9A44C]'
                  : 'text-[#F5E6C8] hover:bg-[#3E2723]/50 hover:text-[#C9A44C]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#3E2723] flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg border border-[#3E2723] text-[#F5E6C8] hover:border-[#C9A44C] font-medium text-sm transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register?role=anchor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-semibold text-sm shadow-gold-glow"
            >
              Join as Anchor
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
