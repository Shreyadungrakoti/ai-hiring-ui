export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: '700px' }}
    >
      {/* Background elements */}
      <circle cx="400" cy="300" r="280" fill="#f3f4f6" opacity="0.5" />
      
      {/* Desk */}
      <rect x="150" y="400" width="500" height="20" fill="#9ca3af" rx="4" />
      <rect x="140" y="420" width="520" height="15" fill="#6b7280" rx="4" />
      
      {/* Resume stack on desk - more prominent */}
      <rect x="250" y="300" width="140" height="180" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" rx="4" />
      <rect x="255" y="295" width="140" height="180" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" rx="4" />
      <rect x="260" y="290" width="140" height="180" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" rx="4" />
      
      {/* Resume details - lines */}
      <line x1="280" y1="315" x2="370" y2="315" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
      <line x1="280" y1="335" x2="360" y2="335" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="280" y1="355" x2="375" y2="355" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="280" y1="375" x2="355" y2="375" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="285" cy="405" r="4" fill="#10b981" />
      <circle cx="297" cy="405" r="4" fill="#10b981" />
      <circle cx="309" cy="405" r="4" fill="#10b981" />
      <circle cx="321" cy="405" r="4" fill="#10b981" />
      <circle cx="333" cy="405" r="4" fill="#d1d5db" />
      
      {/* Human - IMPROVED - Body (professional recruiter) */}
      <ellipse cx="500" cy="470" rx="60" ry="15" fill="#6b7280" opacity="0.3" />
      
      {/* Legs */}
      <rect x="485" y="390" width="15" height="80" fill="#1f2937" rx="8" />
      <rect x="500" y="390" width="15" height="80" fill="#1f2937" rx="8" />
      
      {/* Body - Suit */}
      <rect x="470" y="310" width="60" height="85" fill="#3b82f6" rx="10" />
      
      {/* Tie */}
      <polygon points="500,320 495,345 500,370 505,345" fill="#1e40af" />
      
      {/* Arms - Better proportions */}
      <rect x="435" y="335" width="35" height="14" fill="#fbbf24" rx="7" transform="rotate(-25 452 342)" />
      <rect x="455" y="320" width="15" height="50" fill="#3b82f6" rx="7" transform="rotate(-25 462 345)" />
      
      <rect x="530" y="335" width="35" height="14" fill="#fbbf24" rx="7" transform="rotate(25 548 342)" />
      <rect x="530" y="320" width="15" height="50" fill="#3b82f6" rx="7" transform="rotate(25 537 345)" />
      
      {/* Hands */}
      <circle cx="445" cy="365" r="10" fill="#fbbf24" />
      <circle cx="555" cy="365" r="10" fill="#fbbf24" />
      
      {/* Neck */}
      <rect x="492" y="295" width="16" height="20" fill="#fbbf24" rx="4" />
      
      {/* Head - Better proportions */}
      <circle cx="500" cy="280" r="32" fill="#fbbf24" />
      
      {/* Hair - Professional style */}
      <path d="M 468 275 Q 468 255 485 250 Q 500 248 515 250 Q 532 255 532 275 L 530 280 Q 520 270 500 268 Q 480 270 470 280 Z" fill="#1f2937" />
      
      {/* Face - Better features */}
      <circle cx="488" cy="278" r="3" fill="#1f2937" />
      <circle cx="512" cy="278" r="3" fill="#1f2937" />
      <path d="M 485 292 Q 500 298 515 292" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Eyebrows */}
      <path d="M 480 270 Q 488 268 495 270" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 505 270 Q 512 268 520 270" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Laptop on desk */}
      <rect x="420" y="370" width="90" height="60" fill="#1f2937" rx="4" />
      <rect x="426" y="376" width="78" height="48" fill="#7c3aed" opacity="0.3" rx="2" />
      <line x1="432" y1="385" x2="455" y2="385" stroke="#a78bfa" strokeWidth="1.5" />
      <line x1="432" y1="392" x2="460" y2="392" stroke="#a78bfa" strokeWidth="1.5" />
      <line x1="432" y1="399" x2="450" y2="399" stroke="#a78bfa" strokeWidth="1.5" />
      
      {/* AI Robot - BIGGER and more dynamic */}
      <g transform="translate(590, 240) scale(1.4)">
        {/* Robot body */}
        <rect x="0" y="60" width="65" height="75" fill="#a78bfa" rx="10" />
        
        {/* Robot head */}
        <rect x="5" y="15" width="55" height="50" fill="#7c3aed" rx="8" />
        
        {/* Robot antenna */}
        <line x1="32.5" y1="15" x2="32.5" y2="3" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32.5" cy="0" r="5" fill="#ef4444" />
        <circle cx="32.5" cy="0" r="5" fill="#ef4444" opacity="0.5">
          <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Robot eyes - more expressive */}
        <ellipse cx="20" cy="35" rx="8" ry="10" fill="#ffffff" />
        <ellipse cx="45" cy="35" rx="8" ry="10" fill="#ffffff" />
        <circle cx="22" cy="36" r="4" fill="#1f2937">
          <animate attributeName="cy" values="36;38;36" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="47" cy="36" r="4" fill="#1f2937">
          <animate attributeName="cy" values="36;38;36" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Robot smile */}
        <path d="M 18 52 Q 32.5 60 47 52" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Robot arms */}
        <rect x="-12" y="75" width="20" height="12" fill="#a78bfa" rx="6" />
        <circle cx="-15" cy="81" r="8" fill="#7c3aed" />
        
        <rect x="57" y="75" width="20" height="12" fill="#a78bfa" rx="6" />
        <circle cx="80" cy="81" r="8" fill="#7c3aed" />
        
        {/* Sparkles around robot - MORE DYNAMIC */}
        <g opacity="0.9">
          <circle cx="-10" cy="20" r="3" fill="#fbbf24">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="75" cy="30" r="3" fill="#fbbf24">
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;4;2" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="65" r="3" fill="#fbbf24">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;4;2" dur="1.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="5" cy="50" r="2" fill="#3b82f6">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
      
      {/* Checkmarks floating around - more dynamic */}
      <g opacity="0.7">
        <path d="M 180 240 L 192 252 L 215 220" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
      
      <g opacity="0.7">
        <path d="M 650 180 L 662 192 L 685 160" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="2.5s" repeatCount="indefinite" />
        </path>
      </g>
      
      {/* AI processing indicators */}
      <g opacity="0.6">
        <circle cx="150" cy="350" r="4" fill="#7c3aed">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="165" cy="350" r="4" fill="#7c3aed">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="350" r="4" fill="#7c3aed">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
