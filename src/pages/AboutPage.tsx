import React from 'react';
import { Mic2, Shield, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-bold">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5E6C8] mt-2 mb-4">
          About GVista
        </h1>
        <p className="text-base text-[#F5E6C8]/80 leading-relaxed max-w-2xl mx-auto">
          "Your Voice. Your Stage. Your Opportunity."
        </p>
      </div>

      <div className="bg-[#241A12] border border-[#3E2723] rounded-3xl p-8 sm:p-10 space-y-6 text-sm text-[#F5E6C8]/80 leading-relaxed shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-[#F5E6C8]">
          The Stage Needs the Right Voice
        </h2>
        <p>
          Events are defined by their atmosphere. Whether it is an energetic college fest, a formal corporate summit, a cultural celebration, or a personal wedding reception, the anchor sets the rhythm and keeps the audience captivated.
        </p>
        <p>
          Yet, organizers frequently struggle to discover and evaluate authentic speaking talent, often relying on word of mouth without being able to listen to or watch past stage performances. Simultaneously, gifted public speakers and anchors lack a centralized, dignified stage to exhibit their portfolio and discover genuine speaking opportunities.
        </p>
        <p>
          GVista bridges this gap. By focusing intently on three primary languages — <strong>Kannada</strong>, <strong>English</strong>, and <strong>Hindi</strong> — GVista connects organizers directly with verified speakers whose delivery, stage presence, and voice match the occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#241A12] border border-[#3E2723] text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#3E2723] border border-[#C9A44C]/30 flex items-center justify-center text-[#C9A44C] mb-3">
            <Mic2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-[#F5E6C8] mb-1">Authentic Portfolios</h3>
          <p className="text-xs text-[#F5E6C8]/60">Live speaking video samples allow organizers to hear diction and see stage presence.</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#241A12] border border-[#3E2723] text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#3E2723] border border-[#C9A44C]/30 flex items-center justify-center text-[#C9A44C] mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-[#F5E6C8] mb-1">Moderated Quality</h3>
          <p className="text-xs text-[#F5E6C8]/60">Each anchor profile is carefully reviewed before being published in the public directory.</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#241A12] border border-[#3E2723] text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#3E2723] border border-[#C9A44C]/30 flex items-center justify-center text-[#C9A44C] mb-3">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-[#F5E6C8] mb-1">Focused Reach</h3>
          <p className="text-xs text-[#F5E6C8]/60">Dedicated to Kannada, English, and Hindi event hosting excellence.</p>
        </div>
      </div>
    </div>
  );
};
