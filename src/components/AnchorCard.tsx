import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Briefcase, Languages } from 'lucide-react';
import { AnchorProfile } from '../types';

interface AnchorCardProps {
  anchor: AnchorProfile;
}

export const AnchorCard: React.FC<AnchorCardProps> = ({ anchor }) => {
  return (
    <div className="group relative bg-[#241A12] border border-[#3E2723] hover:border-[#C9A44C]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between">
      <div>
        {/* Card Header & Photo */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A120B]">
          <img
            src={anchor.profilePhoto}
            alt={anchor.displayName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241A12] via-transparent to-black/20" />
          
          {/* Verification Badge */}
          {anchor.verificationStatus === 'verified' && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1A120B]/80 backdrop-blur-md border border-[#C9A44C]/60 text-[#C9A44C] flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A44C]" />
              Verified
            </span>
          )}

          {/* Experience tag */}
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1A120B]/90 text-[#F5E6C8] border border-[#3E2723] flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-[#C9A44C]" />
            {anchor.experienceYears} Years Exp
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-bold text-[#F5E6C8] group-hover:text-[#C9A44C] transition-colors line-clamp-1">
              {anchor.displayName}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#F5E6C8]/70 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>{anchor.location}</span>
          </div>

          {/* Language badges - strictly Kannada, English, Hindi */}
          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            <Languages className="w-3.5 h-3.5 text-[#C9A44C]/80 mr-0.5" />
            {anchor.languages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#3E2723]/60 text-[#DFC27D] border border-[#C9A44C]/20"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Short description */}
          <p className="text-xs text-[#F5E6C8]/70 line-clamp-2 leading-relaxed mb-4">
            {anchor.bio}
          </p>

          {/* Event types pills */}
          <div className="flex flex-wrap gap-1">
            {anchor.eventTypes.slice(0, 3).map((event) => (
              <span
                key={event}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A120B] text-[#F5E6C8]/60 border border-[#3E2723]"
              >
                {event}
              </span>
            ))}
            {anchor.eventTypes.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-[#C9A44C]/70">
                +{anchor.eventTypes.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-5 pt-0">
        <Link
          to={`/anchor/${anchor.id}`}
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#3E2723]/70 hover:bg-[#C9A44C] text-[#F5E6C8] hover:text-[#1A120B] border border-[#C9A44C]/30 hover:border-[#C9A44C] transition-all duration-200"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};
