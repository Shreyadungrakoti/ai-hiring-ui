export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
    >
      {/* Background elements */}
      <circle cx="400" cy="300" r="280" fill="#f3f4f6" opacity="0.5" />
      
      {/* Desk */}
      <rect x="150" y="380" width="500" height="20" fill="#9ca3af" rx="4" />
      <rect x="140" y="400" width="520" height="15" fill="#6b7280" rx="4" />
      
      {/* Resume stack on desk */}
      <rect x="280" y="320" width="120" height="160" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" rx="4" />
      <rect x="285" y="315" width="120" height="160" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" rx="4" />
      <rect x="290" y="310" width="120" height="160" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" rx="4" />
      
      {/* Resume details - lines */}
      <line x1="305" y1="330" x2="385" y2="330" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
      <line x1="305" y1="345" x2="375" y2="345" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
      <line x1="305" y1="360" x2="390" y2="360" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
      <line x1="305" y1="375" x2="370" y2="375" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
      <circle cx="310" cy="400" r="3" fill="#10b981" />
      <circle cx="320" cy="400" r="3" fill="#10b981" />
      <circle cx="330" cy="400" r="3" fill="#10b981" />
      <circle cx="340" cy="400" r="3" fill="#d1d5db" />
      <circle cx="350" cy="400" r="3" fill="#d1d5db" />
      
      {/* Human - Body */}
      <ellipse cx="480" cy="450" rx="50" ry="15" fill="#6b7280" opacity="0.3" />
      <rect x="455" y="350" width="50" height="100" fill="#3b82f6" rx="8" />
      
      {/* Human - Arms */}
      <rect x="425" y="365" width="30" height="12" fill="#3b82f6" rx="6" transform="rotate(-20 440 371)" />
      <circle cx="420" cy="375" r="8" fill="#fbbf24" />
      
      <rect x="505" y="365" width="30" height="12" fill="#3b82f6" rx="6" transform="rotate(20 520 371)" />
      <circle cx="530" cy="375" r="8" fill="#fbbf24" />
      
      {/* Human - Head */}
      <circle cx="480" cy="325" r="25" fill="#fbbf24" />
      
      {/* Human - Face */}
      <circle cx="472" cy="322" r="2" fill="#1f2937" />
      <circle cx="488" cy="322" r="2" fill="#1f2937" />
      <path d="M 470 332 Q 480 338 490 332" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Human - Hair */}
      <path d="M 455 320 Q 455 305 470 305 Q 480 305 490 305 Q 505 305 505 320" fill="#1f2937" />
      
      {/* Laptop on desk */}
      <rect x="420" y="360" width="80" height="50" fill="#1f2937" rx="3" />
      <rect x="425" y="365" width="70" height="40" fill="#7c3aed" opacity="0.3" rx="2" />
      <line x1="430" y1="370" x2="450" y2="370" stroke="#a78bfa" strokeWidth="1" />
      <line x1="430" y1="375" x2="455" y2="375" stroke="#a78bfa" strokeWidth="1" />
      <line x1="430" y1="380" x2="445" y2="380" stroke="#a78bfa" strokeWidth="1" />
      
      {/* AI Robot - peeking from side */}
      <g transform="translate(580, 280)">
        {/* Robot body */}
        <rect x="0" y="60" width="60" height="70" fill="#a78bfa" rx="8" />
        
        {/* Robot head */}
        <rect x="5" y="20" width="50" height="45" fill="#7c3aed" rx="6" />
        
        {/* Robot antenna */}
        <line x1="30" y1="20" x2="30" y2="8" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        <circle cx="30" cy="5" r="4" fill="#ef4444" />
        <circle cx="30" cy="5" r="4" fill="#ef4444" opacity="0.5">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Robot eyes */}
        <circle cx="18" cy="38" r="6" fill="#ffffff" />
        <circle cx="42" cy="38" r="6" fill="#ffffff" />
        <circle cx="20" cy="38" r="3" fill="#1f2937" />
        <circle cx="44" cy="38" r="3" fill="#1f2937" />
        
        {/* Robot smile */}
        <path d="M 15 50 Q 30 58 45 50" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Robot arm peeking */}
        <rect x="-15" y="75" width="20" height="10" fill="#a78bfa" rx="5" />
        <circle cx="-18" cy="80" r="6" fill="#7c3aed" />
        
        {/* Sparkles around robot */}
        <circle cx="-5" cy="25" r="2" fill="#fbbf24" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="65" cy="35" r="2" fill="#fbbf24" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="60" r="2" fill="#fbbf24" opacity="0.7">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.3s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Checkmarks floating around */}
      <g opacity="0.6">
        <path d="M 220 280 L 228 288 L 245 265" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
      
      <g opacity="0.6">
        <path d="M 620 200 L 628 208 L 645 185" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="2.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}
