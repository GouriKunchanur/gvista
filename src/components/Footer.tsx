import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#140E08] border-t border-[#3E2723] pt-16 pb-12 text-[#F5E6C8]/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3E2723] border border-[#C9A44C]/40 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-[#C9A44C]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#F5E6C8]">GVista</span>
            </Link>
            <p className="text-xs leading-relaxed text-[#F5E6C8]/60">
              Your Voice. Your Stage. Your Opportunity. Connect with talented Kannada, English and Hindi anchors for your next event.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[#C9A44C] text-sm uppercase tracking-wider mb-4 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/anchors" className="hover:text-[#C9A44C] transition-colors">
                  Find Anchors
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#C9A44C] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9A44C] transition-colors">
                  About GVista
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C9A44C] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages Supported */}
          <div>
            <h4 className="font-serif text-[#C9A44C] text-sm uppercase tracking-wider mb-4 font-semibold">
              Supported Languages
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5E6C8]/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C]" />
                Kannada Anchors & Speakers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C]" />
                English Anchors & Speakers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C]" />
                Hindi Anchors & Speakers
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="font-serif text-[#C9A44C] text-sm uppercase tracking-wider mb-4 font-semibold">
              Join GVista
            </h4>
            <p className="text-xs text-[#F5E6C8]/60 mb-4 leading-relaxed">
              Are you a stage host, MC, or public speaker? Showcase your voice and find quality events.
            </p>
            <Link
              to="/register?role=anchor"
              className="inline-block px-4 py-2 text-xs font-semibold rounded-lg bg-[#3E2723] hover:bg-[#C9A44C] text-[#F5E6C8] hover:text-[#1A120B] border border-[#C9A44C]/30 transition-all"
            >
              Register as Speaker
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3E2723]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E6C8]/50">
          <p>© {new Date().getFullYear()} GVista. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for stage hosts & event organizers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
