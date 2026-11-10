import React from 'react';
import logoImg from '../assets/images/el_boukhari_logo_1784575031184.jpg';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'gold' | 'white' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 50,
  showText = true,
  variant = 'gold'
}) => {
  // Setup color constants
  const goldColor = '#C89B3C';
  const accentColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#111111' : '#C89B3C';
  const textColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#111111' : '#111111';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Emblem Image */}
      <img
        src={logoImg}
        alt="El Boukhari Logo"
        width={size}
        height={size}
        className="rounded-full object-contain p-0.5 bg-black/40 transition-transform duration-300 hover:rotate-3 shadow-md border border-[#C89B3C]/50"
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />

      {/* Optional Brand Text (Beside Logo for header) */}
      {showText && (
        <div className="flex flex-col">
          <span
            className="font-sans font-extrabold tracking-widest text-lg md:text-xl"
            style={{ color: variant === 'white' ? '#FFFFFF' : '#C89B3C' }}
          >
            توابل البوخاري
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] font-semibold -mt-1"
            style={{ color: variant === 'white' ? 'rgba(255,255,255,0.7)' : variant === 'dark' ? '#111111' : '#8B5E3C' }}
          >
            EL BOUKHARI
          </span>
        </div>
      )}
    </div>
  );
};
