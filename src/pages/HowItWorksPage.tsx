import React from 'react';
import { Calendar, Mic2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-bold">
          The Process
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5E6C8] mt-2 mb-4">
          How GVista Connects Events with Voices
        </h1>
        <p className="text-sm sm:text-base text-[#F5E6C8]/70 leading-relaxed">
          A transparent stage and communication bridge built specifically for event organizers and professional anchors.
        </p>
      </div>

      {/* Pathways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* For Organizers */}
        <div className="bg-[#241A12] border border-[#3E2723] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E2723]/60 border border-[#C9A44C]/30 text-xs font-semibold text-[#DFC27D]">
              <Calendar className="w-3.5 h-3.5 text-[#C9A44C]" />
              ORGANIZER JOURNEY
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#F5E6C8]">
              Finding the Right Anchor in 5 Steps
            </h2>

            <div className="space-y-6 pt-2">
              {[
                { step: '01', title: 'Tell us what you need', desc: 'Specify language (Kannada, English, or Hindi), your event type (cultural, corporate, wedding, college fest), and venue.' },
                { step: '02', title: 'Discover suitable anchors', desc: 'Use filters to find speakers matching your specific audience profile and experience requirements.' },
                { step: '03', title: 'Watch speaking videos', desc: 'Review actual stage footage and delivery samples to assess stage presence and diction.' },
                { step: '04', title: 'Send an enquiry', desc: 'Directly submit event date, audience size, and requirements without intermediaries.' },
                { step: '05', title: 'Connect and finalize', desc: 'Review responses, coordinate logistics, and bring the right voice to your stage.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#3E2723] text-[#C9A44C] font-serif font-bold text-xs flex items-center justify-center border border-[#C9A44C]/30 flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5E6C8]">{item.title}</h3>
                    <p className="text-xs text-[#F5E6C8]/60 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-[#3E2723] flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/anchors"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A44C] hover:text-[#DFC27D]"
            >
              Browse Available Anchors <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register?role=organizer"
              className="text-xs text-[#F5E6C8]/70 hover:text-[#C9A44C] underline"
            >
              Register as Organizer
            </Link>
          </div>
        </div>

        {/* For Anchors */}
        <div className="bg-[#241A12] border border-[#3E2723] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E2723]/60 border border-[#C9A44C]/30 text-xs font-semibold text-[#DFC27D]">
              <Mic2 className="w-3.5 h-3.5 text-[#C9A44C]" />
              ANCHOR JOURNEY
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#F5E6C8]">
              Showcasing Your Voice in 5 Steps
            </h2>

            <div className="space-y-6 pt-2">
              {[
                { step: '01', title: 'Create your profile', desc: 'Register as an anchor and complete your professional speaking portfolio with bio, skills, and event types.' },
                { step: '02', title: 'Showcase your voice', desc: 'Select your languages (Kannada, English, Hindi) and upload real video recordings from previous stage events.' },
                { step: '03', title: 'Get discovered', desc: 'Once verified by our moderation team, your profile becomes publicly searchable by event planners.' },
                { step: '04', title: 'Receive enquiries', desc: 'Get direct enquiries with specific event dates, audience demographics, and requirements.' },
                { step: '05', title: 'Grow your opportunities', desc: 'Expand your network, take on prestigious stages, and build lasting relationships with event organizers.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#3E2723] text-[#C9A44C] font-serif font-bold text-xs flex items-center justify-center border border-[#C9A44C]/30 flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5E6C8]">{item.title}</h3>
                    <p className="text-xs text-[#F5E6C8]/60 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-[#3E2723]">
            <Link
              to="/register?role=anchor"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A44C] hover:text-[#DFC27D]"
            >
              Join as a Speaker <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
