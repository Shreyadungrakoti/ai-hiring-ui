import React from 'react';

const HeroIllustration = () => {
  return (
    <div className="landingHeroIllustration">
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gradients */}
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="800" y2="600">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="humanSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f3f4f6" />
          </linearGradient>
          <linearGradient id="robotAccent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="400" cy="300" r="250" fill="url(#bgGrad)" />

        {/* HUMAN CHARACTER (LEFT SIDE) */}
        <g className="human-character">
          {/* Human body */}
          <ellipse cx="280" cy="420" rx="50" ry="20" fill="#93c5fd" opacity="0.3" />
          
          {/* Legs */}
          <rect x="260" y="380" width="20" height="60" rx="10" fill="#60a5fa" />
          <rect x="280" y="380" width="20" height="60" rx="10" fill="#60a5fa" />
          
          {/* Shoes */}
          <ellipse cx="270" cy="440" rx="15" ry="8" fill="#1e40af" />
          <ellipse cx="290" cy="440" rx="15" ry="8" fill="#1e40af" />
          
          {/* Torso */}
          <rect x="240" y="280" width="80" height="110" rx="15" fill="#ffffff" />
          <path d="M 250 300 Q 280 310 310 300" stroke="#e5e7eb" strokeWidth="2" fill="none" />
          
          {/* Left arm (extended for handshake) */}
          <rect x="230" y="300" width="30" height="15" rx="7" fill="url(#humanSkin)" transform="rotate(-10 245 307)" />
          <rect x="260" y="295" width="40" height="12" rx="6" fill="#ffffff" transform="rotate(-5 280 301)" />
          <circle cx="300" cy="297" r="12" fill="url(#humanSkin)" className="human-hand-left" />
          
          {/* Right arm */}
          <rect x="290" y="310" width="30" height="15" rx="7" fill="url(#humanSkin)" transform="rotate(20 305 317)" />
          <rect x="280" y="325" width="40" height="12" rx="6" fill="#ffffff" transform="rotate(15 300 331)" />
          
          {/* Neck */}
          <rect x="270" y="260" width="20" height="25" rx="5" fill="url(#humanSkin)" />
          
          {/* Head */}
          <circle cx="280" cy="240" r="35" fill="url(#humanSkin)" />
          
          {/* Hair */}
          <path d="M 250 230 Q 260 210 280 205 Q 300 210 310 230 Q 305 220 280 215 Q 255 220 250 230 Z" fill="#1f2937" />
          
          {/* Face */}
          <ellipse cx="270" cy="240" rx="3" ry="4" fill="#1f2937" />
          <ellipse cx="290" cy="240" rx="3" ry="4" fill="#1f2937" />
          <path d="M 270 255 Q 280 260 290 255" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 265 232 Q 268 230 272 232" stroke="#1f2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 285 232 Q 288 230 292 232" stroke="#1f2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* ROBOT CHARACTER (RIGHT SIDE) */}
        <g className="robot-character">
          {/* Robot shadow */}
          <ellipse cx="520" cy="450" rx="60" ry="20" fill="#000000" opacity="0.1" />
          
          {/* Legs */}
          <rect x="490" y="380" width="25" height="75" rx="8" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="3" />
          <rect x="525" y="380" width="25" height="75" rx="8" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="3" />
          
          {/* Feet */}
          <rect x="485" y="450" width="35" height="15" rx="7" fill="#1f2937" />
          <rect x="520" y="450" width="35" height="15" rx="7" fill="#1f2937" />
          
          {/* Hip joint */}
          <rect x="485" y="365" width="70" height="20" rx="10" fill="url(#robotAccent)" />
          <circle cx="502" cy="375" r="5" fill="#ffffff" />
          <circle cx="538" cy="375" r="5" fill="#ffffff" />
          
          {/* Torso */}
          <rect x="470" y="250" width="100" height="120" rx="20" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="3" />
          
          {/* Chest panel */}
          <rect x="490" y="280" width="60" height="70" rx="8" fill="#e0e7ff" />
          <circle cx="520" cy="315" r="15" fill="url(#robotAccent)" className="robot-core" />
          <circle cx="520" cy="315" r="10" fill="#a78bfa" className="robot-core-inner" />
          
          {/* Screen lines */}
          <line x1="495" y1="290" x2="545" y2="290" stroke="#7c3aed" strokeWidth="2" />
          <line x1="495" y1="300" x2="535" y2="300" stroke="#7c3aed" strokeWidth="2" />
          <line x1="495" y1="340" x2="545" y2="340" stroke="#7c3aed" strokeWidth="2" />
          
          {/* Right arm (extended for handshake) */}
          <rect x="440" y="290" width="35" height="18" rx="9" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="455" cy="299" r="8" fill="url(#robotAccent)" />
          <rect x="390" y="292" width="55" height="15" rx="7" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="390" cy="299" r="12" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" className="robot-hand-right" />
          <line x1="385" y1="294" x2="385" y2="304" stroke="#7c3aed" strokeWidth="2" />
          <line x1="380" y1="295" x2="380" y2="303" stroke="#7c3aed" strokeWidth="2" />
          <line x1="375" y1="296" x2="375" y2="302" stroke="#7c3aed" strokeWidth="2" />
          
          {/* Left arm */}
          <rect x="565" y="290" width="35" height="18" rx="9" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="585" cy="299" r="8" fill="url(#robotAccent)" />
          <rect x="595" y="292" width="55" height="15" rx="7" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" />
          
          {/* Neck */}
          <rect x="505" y="230" width="30" height="25" rx="8" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" />
          
          {/* Head */}
          <rect x="475" y="160" width="90" height="80" rx="20" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="3" />
          
          {/* Face screen */}
          <rect x="490" y="180" width="60" height="50" rx="10" fill="#1f2937" />
          
          {/* Eyes */}
          <circle cx="505" cy="200" r="8" fill="#7c3aed" className="robot-eye-left">
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="535" cy="200" r="8" fill="#7c3aed" className="robot-eye-right">
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Smile */}
          <path d="M 505 220 Q 520 228 535 220" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Antenna */}
          <rect x="518" y="145" width="4" height="20" fill="#7c3aed" />
          <circle cx="520" cy="140" r="8" fill="url(#robotAccent)" className="robot-antenna">
            <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* HANDSHAKE CONNECTION */}
        <g className="handshake-connection">
          {/* Connection sparkles */}
          <circle cx="345" cy="297" r="4" fill="#fbbf24" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="355" cy="292" r="3" fill="#7c3aed" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="350" cy="302" r="3" fill="#3b82f6" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" begin="1s" />
          </circle>
          
          {/* Energy waves */}
          <circle cx="345" cy="297" r="15" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.3">
            <animate attributeName="r" values="10;25;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Floating UI elements */}
        <g className="ui-elements" opacity="0.7">
          {/* Checkmark */}
          <circle cx="320" cy="200" r="20" fill="#10b981" opacity="0.2" />
          <path d="M 310 200 L 318 208 L 330 190" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
          </path>
          
          {/* Data points */}
          <circle cx="560" cy="180" r="3" fill="#3b82f6">
            <animate attributeName="cy" values="180;170;180" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="575" cy="190" r="3" fill="#7c3aed">
            <animate attributeName="cy" values="190;180;190" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="590" cy="185" r="3" fill="#ec4899">
            <animate attributeName="cy" values="185;175;185" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
