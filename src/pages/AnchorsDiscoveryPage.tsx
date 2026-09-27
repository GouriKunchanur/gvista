import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mic2, MapPin, Languages, Briefcase } from 'lucide-react';
import { AnchorProfile, SupportedLanguage } from '../types';
import { AnchorCard } from '../components/AnchorCard';

export const AnchorsDiscoveryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  // Strict language list: Only Kannada, English, Hindi allowed
  const languages: SupportedLanguage[] = ['Kannada', 'English', 'Hindi'];

  // Real data state (Empty for clean start)
  const anchors: AnchorProfile[] = [];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Introduction */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-[#C9A44C] font-bold">
          Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5E6C8] mt-1">
          Discover Professional Anchors
        </h1>
        <p className="text-sm text-[#F5E6C8]/70 mt-2 max-w-2xl">
          Browse vetted speakers and stage hosts fluent in Kannada, English, and Hindi.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#241A12] border border-[#3E2723] rounded-2xl p-5 mb-10 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#C9A44C]/70 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search anchors by name, skill or location..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] text-sm text-[#F5E6C8] placeholder-[#F5E6C8]/40 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Language Filter: STRICTLY ONLY Kannada, English, Hindi */}
          <div>
            <label className="block text-xs font-semibold text-[#F5E6C8]/80 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-[#C9A44C]" />
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1A120B] border border-[#3E2723] text-xs text-[#F5E6C8] focus:border-[#C9A44C] outline-none"
            >
              <option value="All">All Languages (Kannada / English / Hindi)</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#F5E6C8]/80 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9A44C]" />
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1A120B] border border-[#3E2723] text-xs text-[#F5E6C8] focus:border-[#C9A44C] outline-none"
            >
              <option value="All">All Locations</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Mangaluru">Mangaluru</option>
              <option value="Hubballi">Hubballi</option>
              <option value="Other">Other / Remote</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#F5E6C8]/80 mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#C9A44C]" />
              Experience
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1A120B] border border-[#3E2723] text-xs text-[#F5E6C8] focus:border-[#C9A44C] outline-none"
            >
              <option value="All">Any Experience</option>
              <option value="1-3">1 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results or Clean Empty State */}
      {anchors.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#3E2723] bg-[#241A12]/40 p-16 text-center max-w-xl mx-auto my-12">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#3E2723] border border-[#C9A44C]/30 flex items-center justify-center text-[#C9A44C] mb-4">
            <Mic2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#F5E6C8] mb-2">
            No anchors yet
          </h2>
          <p className="text-xs sm:text-sm text-[#F5E6C8]/70 leading-relaxed mb-6">
            Be among the first speakers to join GVista. Profiles will appear here once registered and approved by moderation.
          </p>
          <Link
            to="/register?role=anchor"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A44C] to-[#DFC27D] text-[#1A120B] font-bold text-xs sm:text-sm shadow-gold-glow"
          >
            Register as an Anchor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anchors.map((anchor) => (
            <AnchorCard key={anchor.id} anchor={anchor} />
          ))}
        </div>
      )}
    </div>
  );
};
