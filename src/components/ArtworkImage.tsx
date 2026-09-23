import React, { useState } from 'react';
import { Disc3 } from 'lucide-react';

interface ArtworkImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackAccent?: string;
  fallbackTitle?: string;
  aspectRatio?: string;
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden bg-slate-900',
  fallbackAccent = '#BE1E2F',
  fallbackTitle = 'Sanelow',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={containerClassName}>
      {/* Vinyl Groove Backdrop */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none"
        style={{
          background: `radial-gradient(circle at center, ${fallbackAccent}33 0%, #0f172a 90%)`,
        }}
      >
        <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
            <Disc3 className="w-8 h-8 text-white/40" />
          </div>
        </div>
        <span className="text-[10px] font-['DM_Mono',monospace] text-white/50 uppercase tracking-widest mt-2">
          {fallbackTitle}
        </span>
      </div>

      {/* Real Spotify Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // Try without crossOrigin if failed
            setHasError(true);
          }}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
