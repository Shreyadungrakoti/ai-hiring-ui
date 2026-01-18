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
            <stop offset="0%" stopColor="#fdc4a6" />
            <stop offset="100%" stopColor="#f4a88a" />
          </linearGradient>
          <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#c7d2fe" />
          </linearGradient>
          <linearGradient id="robotAccent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* Background elements */}
        <circle cx="400" cy="300" r="280" fill="url(#bgGrad)" />

        {/* Floating elements */}
        <g className="floating-elements" opacity="0.6">
          <circle cx="150" cy="150" r="8" fill="#3b82f6">
            <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="180" r="6" fill="#7c3aed">
            <animate attributeName="cy" values="180;170;180" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="400" r="7" fill="#ec4899">
            <animate attributeName="cy" values="400;390;400" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Desk */}
        <rect x="200" y="420" width="400" height="20" rx="10" fill="#94a3b8" />
        <rect x="180" y="440" width="440" height="80" rx="8" fill="#cbd5e1" />

        {/* HUMAN CHARACTER (LEFT SIDE) */}
        <g className="human-character">
          {/* Shadow */}
          <ellipse cx="320" cy="510" rx="60" ry="15" fill="#000000" opacity="0.1" />
          
          {/* Legs */}
          <rect x="300" y="420" width="30" height="90" rx="8" fill="#60a5fa" />
          <rect x="340" y="420" width="30" height="90" rx="8" fill="#60a5fa" />
          
          {/* Shoes */}
          <ellipse cx="315" cy="510" rx="18" ry="10" fill="#1e40af" />
          <ellipse cx="355" cy="510" rx="18" ry="10" fill="#1e40af" />
          
          {/* Body */}
          <rect x="280" y="320" width="100" height="110" rx="15" fill="#ffffff" className="human-body" />
          
          {/* Collar/Neck detail */}
          <path d="M 295 335 L 305 345 L 365 345 L 375 335" fill="#e5e7eb" />
          
          {/* Right arm */}
          <rect x="370" y="340" width="35" height="18" rx="9" fill="url(#humanSkin)" transform="rotate(15 387 349)" />
          <rect x="395" y="350" width="45" height="15" rx="7" fill="#ffffff" transform="rotate(25 417 357)" />
          <circle cx="430" cy="370" r="14" fill="url(#humanSkin)" />
          
          {/* Left arm holding resumes */}
          <rect x="235" y="360" width="35" height="18" rx="9" fill="url(#humanSkin)" transform="rotate(-20 252 369)" />
          <rect x="200" y="380" width="45" height="15" rx="7" fill="#ffffff" transform="rotate(-15 222 387)" />
          <circle cx="200" cy="400" r="14" fill="url(#humanSkin)" />
          
          {/* Neck */}
          <rect x="315" y="295" width="30" height="30" rx="8" fill="url(#humanSkin)" />
          
          {/* Head */}
          <circle cx="330" cy="270" r="40" fill="url(#humanSkin)" className="human-head" />
          
          {/* Hair */}
          <path d="M 295 260 Q 305 235 330 230 Q 355 235 365 260 Q 360 245 330 238 Q 300 245 295 260 Z" fill="#1f2937" />
          <path d="M 300 265 Q 310 258 320 262" fill="#1f2937" />
          <path d="M 340 262 Q 350 258 360 265" fill="#1f2937" />
          
          {/* Face */}
          <ellipse cx="318" cy="268" rx="4" ry="5" fill="#1f2937" />
          <ellipse cx="342" cy="268" rx="4" ry="5" fill="#1f2937" />
          <path d="M 318 285 Q 330 292 342 285" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 312 260 Q 316 257 320 260" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 340 260 Q 344 257 348 260" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* Resume Stack */}
        <g className="resume-stack">
          <rect x="160" y="380" width="60" height="80" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" className="resume-paper" />
          <rect x="165" y="375" width="60" height="80" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="170" y="370" width="60" height="80" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Resume lines */}
          <line x1="178" y1="385" x2="220" y2="385" stroke="#7c3aed" strokeWidth="2" />
          <line x1="178" y1="395" x2="215" y2="395" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="178" y1="402" x2="218" y2="402" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="178" y1="409" x2="210" y2="409" stroke="#cbd5e1" strokeWidth="1.5" />
          
          {/* Checkmark */}
          <circle cx="195" cy="425" r="12" fill="#10b981" className="checkmark-float">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          <path d="M 190 425 L 193 428 L 200 420" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* AI ROBOT (RIGHT SIDE - PEEKING) */}
        <g className="robot-character" transform="translate(480, 200)">
          {/* Robot body (partial - peeking from behind) */}
          <rect x="0" y="100" width="90" height="100" rx="18" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="3" />
          
          {/* Chest display */}
          <rect x="15" y="120" width="60" height="60" rx="8" fill="#1f2937" />
          <circle cx="45" cy="150" r="18" fill="url(#robotAccent)" className="robot-core">
            <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="45" cy="150" r="12" fill="#a78bfa" className="robot-core-inner">
            <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Robot arm peeking */}
          <rect x="-25" y="120" width="30" height="16" rx="8" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="-10" cy="128" r="7" fill="url(#robotAccent)" />
          
          {/* Head */}
          <rect x="10" y="20" width="70" height="70" rx="18" fill="url(#robotBody)" stroke="#7c3aed" strokeWidth="3" className="robot-head" />
          
          {/* Face screen */}
          <rect x="20" y="35" width="50" height="45" rx="8" fill="#1f2937" />
          
          {/* Eyes */}
          <circle cx="32" cy="50" r="7" fill="#7c3aed" className="robot-eye">
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="58" cy="50" r="7" fill="#7c3aed" className="robot-eye">
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Curious expression */}
          <path d="M 35 65 Q 45 70 55 65" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* Antenna */}
          <rect x="43" y="10" width="4" height="15" fill="#7c3aed" />
          <circle cx="45" cy="6" r="7" fill="url(#robotAccent)" className="robot-antenna">
            <animate attributeName="r" values="7;9;7" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Sparkles around robot (curious/interested) */}
          <circle cx="5" cy="40" r="3" fill="#a78bfa" className="robot-sparkle">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="85" cy="55" r="2.5" fill="#c084fc" className="robot-sparkle">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="75" cy="25" r="2" fill="#e0e7ff" className="robot-sparkle">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
        </g>

        {/* AI Processing indicators */}
        <g className="ai-indicators">
          <circle cx="550" cy="350" r="4" fill="#7c3aed" className="ai-process-dot">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="565" cy="345" r="4" fill="#7c3aed" className="ai-process-dot">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.33s" />
          </circle>
          <circle cx="580" cy="350" r="4" fill="#7c3aed" className="ai-process-dot">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.66s" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
