import React from 'react';

interface SolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtext?: boolean;
}

export const SolLogo: React.FC<SolLogoProps> = ({
  className = '',
  size = 'md',
  showSubtext = false
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
    '2xl': 'h-32 w-32'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Exact Circular SOL AGENCY Emblem from User Uploaded Logo */}
      <div className={`relative shrink-0 select-none ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm transition-transform duration-200 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Clip for Sunset Stripes */}
          <defs>
            <clipPath id="circleClip">
              <circle cx="100" cy="100" r="96" />
            </clipPath>
            <clipPath id="sunsetClip">
              <path d="M 10 135 Q 100 150 190 135 L 195 200 L 5 200 Z" />
            </clipPath>
          </defs>

          {/* S Letter in SOL (Bold, Organic Red) */}
          <path
            d="M 68 62 C 67 48 56 42 43 43 C 27 44 14 55 12 75 C 9 98 25 110 44 113 C 58 115 67 116 68 124 C 69 133 58 138 46 138 C 30 138 18 130 11 118 L 2 127 C 12 143 27 151 47 151 C 67 151 84 140 82 122 C 80 102 62 93 45 90 C 31 88 23 85 24 74 C 25 64 34 57 44 57 C 54 57 62 62 65 71 Z"
            fill="#E53826"
          />

          {/* O Letter in SOL (Large Center Egg, Red) */}
          <path
            d="M 103 26 C 75 26 59 47 62 82 C 65 117 84 138 111 138 C 139 138 155 117 152 82 C 149 47 131 26 103 26 Z M 104 49 C 117 49 125 61 126 82 C 128 103 121 115 108 115 C 96 115 88 103 87 82 C 85 61 92 49 104 49 Z"
            fill="#E53826"
          />

          {/* L Letter in SOL (Dynamic Angled Right Arm, Red) */}
          <path
            d="M 137 38 L 157 39 C 158 58 159 78 162 97 C 168 97 175 97 185 96 C 189 104 193 113 197 122 C 182 124 163 123 150 122 C 145 94 140 66 137 38 Z"
            fill="#E53826"
          />

          {/* AGENCY Curved Text in Bold Orange */}
          <g>
            <text
              fill="#EE5D1F"
              fontFamily="'Plus Jakarta Sans', 'Arial Black', Impact, sans-serif"
              fontWeight="900"
              fontSize="31"
              letterSpacing="2"
            >
              <textPath
                href="#agencyPath"
                startOffset="50%"
                textAnchor="middle"
              >
                AGENCY
              </textPath>
            </text>
            <path
              id="agencyPath"
              d="M 12 146 Q 100 162 188 146"
              fill="none"
              stroke="transparent"
            />
          </g>

          {/* Sunset Horizon Stripes (Alternating warm bands matching the uploaded PNG) */}
          <g clipPath="url(#circleClip)">
            {/* Stripe 1: Bold Orange */}
            <path
              d="M 10 156 Q 100 172 190 156 L 195 167 Q 100 183 5 167 Z"
              fill="#EE5D1F"
            />
            {/* Stripe 2: Amber Orange */}
            <path
              d="M 15 168 Q 100 184 185 168 L 180 179 Q 100 194 20 179 Z"
              fill="#F97316"
            />
            {/* Stripe 3: Golden Yellow */}
            <path
              d="M 25 180 Q 100 195 175 180 L 165 190 Q 100 203 35 190 Z"
              fill="#FBBF24"
            />
            {/* Stripe 4: Sunny Yellow */}
            <path
              d="M 40 191 Q 100 204 160 191 L 145 200 Q 100 208 55 200 Z"
              fill="#FDE047"
            />
          </g>
        </svg>
      </div>

      {showSubtext && (
        <div className="flex flex-col">
          <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
            PT. Solusi Optima Laju
          </span>
          <span className="text-xs text-[#EE5D1F] font-bold tracking-wide mt-1">
            SOL Agency • +62 852-1282-8253
          </span>
        </div>
      )}
    </div>
  );
};
