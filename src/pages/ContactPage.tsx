import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-bold">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5E6C8] mt-2 mb-4">
          Contact GVista
        </h1>
        <p className="text-sm text-[#F5E6C8]/70 max-w-lg mx-auto">
          Have questions about finding an anchor or joining as a public speaker? Reach out to our support team.
        </p>
      </div>

      <div className="bg-[#241A12] border border-[#3E2723] rounded-3xl p-8 sm:p-10 shadow-sm max-w-2xl mx-auto">
        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#3E2723] border border-[#C9A44C]/40 mx-auto flex items-center justify-center text-[#C9A44C]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#F5E6C8]">Message Received</h3>
            <p className="text-xs text-[#F5E6C8]/70 leading-relaxed">
              Thank you for contacting GVista. Our support team will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F5E6C8]/80 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Your full name"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] text-sm text-[#F5E6C8] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5E6C8]/80 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] text-sm text-[#F5E6C8] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5E6C8]/80 mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              required
              placeholder="How can we help you?"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] text-sm text-[#F5E6C8] outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm shadow-gold-glow hover:brightness-105 transition-all"
          >
            Send Message
          </button>
        </form>
        )}
      </div>
    </div>
  );
};
