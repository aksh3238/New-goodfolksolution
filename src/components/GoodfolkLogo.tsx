import React from 'react';

interface GoodfolkLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (default), 'dark' is for dark backgrounds (footer)
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSymbolOnly?: boolean;
}

export const GoodfolkLogo: React.FC<GoodfolkLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showSymbolOnly = false,
}) => {
  const isDark = variant === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#123578';
  const orangeColor = '#ED650B';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Exact Goodfolk Circular People Symbol */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} w-auto aspect-square shrink-0`}
        aria-label="Goodfolk Solution Symbol"
      >
        {/* 4 Connecting Orange People Figures */}
        <g id="people-ring">
          {/* Top Figure */}
          <path
            d="M 33 34 C 33 25, 43 23, 50 23 C 57 23, 67 25, 67 34 C 67 40, 61 43, 58 45 C 55 42, 53 41, 50 41 C 47 41, 45 42, 42 45 C 39 43, 33 40, 33 34 Z"
            fill={orangeColor}
          />
          {/* Bottom Figure */}
          <path
            d="M 33 66 C 33 75, 43 77, 50 77 C 57 77, 67 75, 67 66 C 67 60, 61 57, 58 55 C 55 58, 53 59, 50 59 C 47 59, 45 58, 42 55 C 39 57, 33 60, 33 66 Z"
            fill={orangeColor}
          />
          {/* Left Figure */}
          <path
            d="M 34 33 C 25 33, 23 43, 23 50 C 23 57, 25 67, 34 67 C 40 67, 43 61, 45 58 C 42 55, 41 53, 41 50 C 41 47, 42 45, 45 42 C 43 39, 40 33, 34 33 Z"
            fill={orangeColor}
          />
          {/* Right Figure */}
          <path
            d="M 66 33 C 75 33, 77 43, 77 50 C 77 57, 75 67, 66 67 C 60 67, 57 61, 55 58 C 58 55, 59 53, 59 50 C 59 47, 58 45, 55 42 C 57 39, 60 33, 66 33 Z"
            fill={orangeColor}
          />

          {/* Interlocking wing shoulders */}
          <path
            d="M 27 27 C 32 23, 39 27, 41 33 C 35 34, 30 39, 29 45 C 23 43, 22 33, 27 27 Z"
            fill={orangeColor}
          />
          <path
            d="M 73 27 C 68 23, 61 27, 59 33 C 65 34, 70 39, 71 45 C 77 43, 78 33, 73 27 Z"
            fill={orangeColor}
          />
          <path
            d="M 27 73 C 32 77, 39 73, 41 67 C 35 66, 30 61, 29 55 C 23 57, 22 67, 27 73 Z"
            fill={orangeColor}
          />
          <path
            d="M 73 73 C 68 77, 61 73, 59 67 C 65 66, 70 61, 71 55 C 77 57, 78 67, 73 73 Z"
            fill={orangeColor}
          />
        </g>

        {/* 4 Navy Head Circles */}
        <circle cx="50" cy="14" r="8" fill={navyColor} />
        <circle cx="50" cy="86" r="8" fill={navyColor} />
        <circle cx="14" cy="50" r="8" fill={navyColor} />
        <circle cx="86" cy="50" r="8" fill={navyColor} />
      </svg>

      {!showSymbolOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1 font-heading font-extrabold text-2xl tracking-tight">
            <span style={{ color: navyColor }}>good folk</span>
            {/* Orange wing accent on 'k' */}
            <span
              className="inline-block w-2.5 h-2 -ml-1 rounded-tr-md"
              style={{ backgroundColor: orangeColor, transform: 'translateY(-6px)' }}
              aria-hidden="true"
            />
          </div>
          <span
            className="font-heading font-semibold text-[13px] tracking-[0.24em] uppercase mt-0.5"
            style={{ color: orangeColor }}
          >
            Solution
          </span>
        </div>
      )}
    </div>
  );
};
