import React from 'react';
import { Mic, Radio } from 'lucide-react';

export const SoundWaveVisualizer: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#241A12]/80 border border-[#3E2723] backdrop-blur-sm shadow-inner">
      <div className="flex items-center gap-1 mr-2 text-[#C9A44C]">
        <Mic className="w-3.5 h-3.5 animate-pulse" />
        <span className="text-[11px] font-medium tracking-wide uppercase">Voice Resonance</span>
      </div>
      <div className="flex items-end gap-1 h-5">
        {[
          { h: 'h-2', delay: '0ms' },
          { h: 'h-4', delay: '150ms' },
          { h: 'h-5', delay: '300ms' },
          { h: 'h-3', delay: '75ms' },
          { h: 'h-5', delay: '220ms' },
          { h: 'h-2.5', delay: '350ms' },
          { h: 'h-4', delay: '180ms' },
          { h: 'h-1.5', delay: '90ms' },
        ].map((bar, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-gradient-to-t from-[#9C7729] to-[#C9A44C] ${bar.h} animate-pulse`}
            style={{ animationDelay: bar.delay }}
          />
        ))}
      </div>
      <div className="ml-2 flex items-center gap-1 text-[10px] text-[#F5E6C8]/60">
        <Radio className="w-3 h-3 text-[#C9A44C]" />
        <span>Kannada • English • Hindi</span>
      </div>
    </div>
  );
};
