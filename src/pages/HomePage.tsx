import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic2, 
  Search, 
  Sparkles, 
  Calendar, 
  ArrowRight
} from 'lucide-react';
import { SoundWaveVisualizer } from '../components/SoundWaveVisualizer';
import { AnchorCard } from '../components/AnchorCard';
import { AnchorProfile } from '../types';

export const HomePage: React.FC = () => {
  // Empty state handling note: In production real data comes from Firebase.
  // For preview when database is brand new, we handle empty state gracefully.
  const featuredAnchors: AnchorProfile[] = [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-[#3E2723]/60 bg-gradient-to-b from-[#1A120B] via-[#241A12] to-[#1A120B]">
        {/* Ambient Stage Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C9A44C]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-[#3E2723]/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Acoustic / Language Tag */}
            <div className="inline-flex items-center gap-2 mb-2">
              <SoundWaveVisualizer />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#F5E6C8] leading-[1.15]">
              Your Voice.{' '}
              <span className="gold-text-gradient block sm:inline">
                Your Stage.
              </span>{' '}
              <br className="hidden sm:inline" />
              Your Opportunity.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#F5E6C8]/80 max-w-2xl font-light leading-relaxed">
              Connect with talented <strong className="text-[#DFC27D] font-medium">Kannada</strong>,{' '}
              <strong className="text-[#DFC27D] font-medium">English</strong> and{' '}
              <strong className="text-[#DFC27D] font-medium">Hindi</strong> anchors for your next event.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              <Link
                to="/anchors"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm sm:text-base shadow-gold-glow hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find an Anchor
              </Link>

              <Link
                to="/register?role=anchor"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#241A12] border border-[#C9A44C]/40 hover:border-[#C9A44C] text-[#F5E6C8] font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 hover:bg-[#3E2723]/50"
              >
                <Mic2 className="w-4 h-4 text-[#C9A44C]" />
                Join as an Anchor
              </Link>

              <Link
                to="/register?role=organizer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#3E2723] hover:border-[#C9A44C] text-[#F5E6C8]/80 hover:text-[#F5E6C8] font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 hover:bg-[#241A12]"
              >
                <Calendar className="w-4 h-4 text-[#C9A44C]" />
                Post an Event
              </Link>
            </div>

            {/* Honest Value Indicators */}
            <div className="pt-10 grid grid-cols-3 gap-6 sm:gap-12 border-t border-[#3E2723]/60 w-full max-w-2xl text-center text-xs sm:text-sm text-[#F5E6C8]/70">
              <div className="flex flex-col items-center">
                <span className="text-[#C9A44C] font-serif text-lg sm:text-xl font-bold">3 Languages</span>
                <span className="text-xs text-[#F5E6C8]/60 mt-0.5">Kannada, English, Hindi</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#C9A44C] font-serif text-lg sm:text-xl font-bold">Real Portfolios</span>
                <span className="text-xs text-[#F5E6C8]/60 mt-0.5">Live Speaking Videos</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#C9A44C] font-serif text-lg sm:text-xl font-bold">Direct Enquiry</span>
                <span className="text-xs text-[#F5E6C8]/60 mt-0.5">Simple Organizer Workflow</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (TWO PATHWAYS) */}
      <section className="py-20 md:py-28 bg-[#1A120B] border-b border-[#3E2723]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-bold">
              Transparent & Simple
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5E6C8] mt-2 mb-4">
              How GVista Works
            </h2>
            <p className="text-sm sm:text-base text-[#F5E6C8]/70">
              A streamlined bridge connecting event organizers with authentic speaking talent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Journey 1: For Organizers */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#241A12] border border-[#3E2723] relative flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E2723]/60 border border-[#C9A44C]/30 text-xs font-semibold text-[#DFC27D]">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A44C]" />
                  FOR EVENT ORGANIZERS
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F5E6C8]">
                  Find the Perfect Voice for Your Stage
                </h3>
                
                <ol className="space-y-4 pt-2">
                  {[
                    { step: '01', title: 'Tell us what you need', desc: 'Specify language (Kannada, English, or Hindi), event type, and location.' },
                    { step: '02', title: 'Discover suitable anchors', desc: 'Browse verified profiles with experience in corporate, college, or cultural stages.' },
                    { step: '03', title: 'Watch their speaking videos', desc: 'Review real video footage of their stage presence, diction, and audience engagement.' },
                    { step: '04', title: 'Send an enquiry', desc: 'Submit event date, audience size, and requirements directly to the anchor.' },
                    { step: '05', title: 'Connect and finalize', desc: 'Receive responses and finalize arrangements directly.' },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3E2723] text-[#C9A44C] font-serif font-bold text-xs flex items-center justify-center border border-[#C9A44C]/30">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-[#F5E6C8]">{item.title}</h4>
                        <p className="text-xs text-[#F5E6C8]/60 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-8 mt-6 border-t border-[#3E2723]">
                <Link
                  to="/anchors"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A44C] hover:text-[#DFC27D] transition-colors"
                >
                  Explore Anchor Directory <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Journey 2: For Anchors */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#241A12] border border-[#3E2723] relative flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E2723]/60 border border-[#C9A44C]/30 text-xs font-semibold text-[#DFC27D]">
                  <Mic2 className="w-3.5 h-3.5 text-[#C9A44C]" />
                  FOR ANCHORS & SPEAKERS
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F5E6C8]">
                  Showcase Your Voice and Get Discovered
                </h3>

                <ol className="space-y-4 pt-2">
                  {[
                    { step: '01', title: 'Create your profile', desc: 'Add your biography, experience years, skills, and contact preferences.' },
                    { step: '02', title: 'Showcase your voice', desc: 'Select Kannada, English, or Hindi and upload real stage video samples.' },
                    { step: '03', title: 'Get discovered', desc: 'Your profile is reviewed and published for event organizers actively seeking talent.' },
                    { step: '04', title: 'Receive enquiries', desc: 'Get direct requests for weddings, cultural festivals, product launches, or college fests.' },
                    { step: '05', title: 'Grow your opportunities', desc: 'Accept bookings, build your speaking portfolio, and expand your career.' },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3E2723] text-[#C9A44C] font-serif font-bold text-xs flex items-center justify-center border border-[#C9A44C]/30">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-[#F5E6C8]">{item.title}</h4>
                        <p className="text-xs text-[#F5E6C8]/60 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-8 mt-6 border-t border-[#3E2723]">
                <Link
                  to="/register?role=anchor"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A44C] hover:text-[#DFC27D] transition-colors"
                >
                  Join GVista as an Anchor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DISCOVERY PREVIEW SECTION */}
      <section className="py-20 md:py-28 bg-[#1A120B] border-b border-[#3E2723]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-bold">
                Talent Discovery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5E6C8] mt-2">
                Featured Public Speakers & Stage Anchors
              </h2>
            </div>
            <Link
              to="/anchors"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A44C] hover:text-[#DFC27D] transition-colors"
            >
              View All Anchors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Genuine Empty State (As instructed: no fake production data) */}
          {featuredAnchors.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#3E2723] bg-[#241A12]/40 p-12 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#3E2723] border border-[#C9A44C]/30 flex items-center justify-center text-[#C9A44C] mb-4 shadow-sm">
                <Mic2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F5E6C8] mb-2">
                No anchors yet
              </h3>
              <p className="text-sm text-[#F5E6C8]/70 max-w-md mx-auto mb-6">
                Be among the first speakers to join GVista and get discovered by event organizers across Karnataka and beyond.
              </p>
              <Link
                to="/register?role=anchor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm shadow-gold-glow"
              >
                <Sparkles className="w-4 h-4" />
                Register as Anchor
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAnchors.map((anchor) => (
                <AnchorCard key={anchor.id} anchor={anchor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. DUAL CALL TO ACTION SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#241A12] to-[#1A120B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Organizer CTA */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1A120B] border border-[#3E2723] hover:border-[#C9A44C]/40 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-semibold">
                  Organizing an Event?
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#F5E6C8] mt-2 mb-3">
                  Find the Voice That Sets the Tone
                </h3>
                <p className="text-xs sm:text-sm text-[#F5E6C8]/70 leading-relaxed mb-6">
                  Whether it’s a college festival, wedding ceremony, seminar, or corporate product launch, discover vetted anchors fluent in Kannada, English, or Hindi.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/anchors"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3E2723] hover:bg-[#C9A44C] text-[#F5E6C8] hover:text-[#1A120B] border border-[#C9A44C]/30 font-semibold text-sm transition-all"
                >
                  Browse Speakers Now
                </Link>
                <Link
                  to="/register?role=organizer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#3E2723] hover:border-[#C9A44C] text-[#F5E6C8] font-semibold text-sm transition-all hover:bg-[#241A12]"
                >
                  Join as Organizer
                </Link>
              </div>
            </div>

            {/* Anchor CTA */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1A120B] border border-[#3E2723] hover:border-[#C9A44C]/40 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-semibold">
                  Are You a Speaker?
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#F5E6C8] mt-2 mb-3">
                  Take the Stage. Reach More Organizers.
                </h3>
                <p className="text-xs sm:text-sm text-[#F5E6C8]/70 leading-relaxed mb-6">
                  Build your verified public speaking portfolio, showcase your live video samples, and receive authentic event enquiries directly.
                </p>
              </div>
              <Link
                to="/register?role=anchor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-sm shadow-gold-glow transition-all"
              >
                Create Anchor Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
