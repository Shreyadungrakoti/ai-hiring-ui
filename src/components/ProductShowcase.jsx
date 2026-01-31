export default function ProductShowcase() {
  return (
    <section className="landingProductShowcase" id="how-it-works">
      <div className="landingProductContent">
        <div className="landingSectionHeader">
          <h2 className="landingSectionTitle">How It Works</h2>
          <p className="landingSectionSubtitle">
            Three simple steps to transform your hiring process
          </p>
        </div>

        <div className="landingShowcaseGrid">
          {/* Step 1: Create Project */}
          <div className="landingShowcaseCard">
            <div className="landingShowcaseIllustration">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background - Blue theme */}
                <rect width="400" height="300" fill="url(#grad1)"/>
                
                {/* Laptop */}
                <rect x="80" y="100" width="240" height="150" rx="8" fill="#1f2937"/>
                <rect x="90" y="110" width="220" height="130" rx="4" fill="#5b9cf5" opacity="0.2"/>
                
                {/* Document icon */}
                <rect x="140" y="140" width="60" height="80" rx="4" fill="#ffffff"/>
                <line x1="150" y1="155" x2="190" y2="155" stroke="#5b9cf5" strokeWidth="3" strokeLinecap="round"/>
                <line x1="150" y1="170" x2="180" y2="170" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <line x1="150" y1="185" x2="190" y2="185" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <line x1="150" y1="200" x2="175" y2="200" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                
                {/* Plus icon - Blue */}
                <circle cx="240" cy="180" r="20" fill="#5b9cf5"/>
                <line x1="240" y1="170" x2="240" y2="190" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
                <line x1="230" y1="180" x2="250" y2="180" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
                
                {/* Sparkles - Blue */}
                <circle cx="120" cy="120" r="3" fill="#6ba8f5" opacity="0.8"/>
                <circle cx="280" cy="130" r="3" fill="#6ba8f5" opacity="0.8"/>
                <circle cx="270" cy="220" r="3" fill="#6ba8f5" opacity="0.8"/>
                
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="400" y2="300">
                    <stop offset="0%" stopColor="#dbeafe"/>
                    <stop offset="100%" stopColor="#bfdbfe"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="landingShowcaseContent">
              <div className="landingShowcaseNumber">01</div>
              <h3 className="landingShowcaseTitle">Create Project</h3>
              <p className="landingShowcaseText">
                Paste job description. Done.
              </p>
            </div>
          </div>

          {/* Step 2: AI Screening */}
          <div className="landingShowcaseCard">
            <div className="landingShowcaseIllustration">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background - Blue theme */}
                <rect width="400" height="300" fill="url(#grad2)"/>
                
                {/* Robot head */}
                <rect x="150" y="80" width="100" height="90" rx="12" fill="#5b9cf5"/>
                <circle cx="180" cy="120" r="12" fill="#ffffff"/>
                <circle cx="220" cy="120" r="12" fill="#ffffff"/>
                <circle cx="182" cy="122" r="6" fill="#1f2937"/>
                <circle cx="222" cy="122" r="6" fill="#1f2937"/>
                <path d="M 170 145 Q 200 155 230 145" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                
                {/* Antenna */}
                <line x1="200" y1="80" x2="200" y2="60" stroke="#5b9cf5" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="200" cy="55" r="6" fill="#6ba8f5">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                {/* Profiles being scanned */}
                <g opacity="0.8">
                  <rect x="60" y="190" width="50" height="60" rx="4" fill="#ffffff"/>
                  <circle cx="85" cy="210" r="8" fill="#94a3b8"/>
                  <line x1="70" y1="225" x2="100" y2="225" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="70" y1="235" x2="95" y2="235" stroke="#cbd5e1" strokeWidth="2"/>
                  
                  <rect x="130" y="190" width="50" height="60" rx="4" fill="#ffffff"/>
                  <circle cx="155" cy="210" r="8" fill="#94a3b8"/>
                  <line x1="140" y1="225" x2="170" y2="225" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="140" y1="235" x2="165" y2="235" stroke="#cbd5e1" strokeWidth="2"/>
                  
                  <rect x="220" y="190" width="50" height="60" rx="4" fill="#ffffff"/>
                  <circle cx="245" cy="210" r="8" fill="#94a3b8"/>
                  <line x1="230" y1="225" x2="260" y2="225" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="230" y1="235" x2="255" y2="235" stroke="#cbd5e1" strokeWidth="2"/>
                  
                  <rect x="290" y="190" width="50" height="60" rx="4" fill="#ffffff"/>
                  <circle cx="315" cy="210" r="8" fill="#94a3b8"/>
                  <line x1="300" y1="225" x2="330" y2="225" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="300" y1="235" x2="325" y2="235" stroke="#cbd5e1" strokeWidth="2"/>
                </g>
                
                {/* Scan lines - Blue */}
                <line x1="50" y1="175" x2="350" y2="175" stroke="#5b9cf5" strokeWidth="2" opacity="0.6">
                  <animate attributeName="y1" values="175;260;175" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="y2" values="175;260;175" dur="3s" repeatCount="indefinite"/>
                </line>
                
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="400" y2="300">
                    <stop offset="0%" stopColor="#eff6ff"/>
                    <stop offset="100%" stopColor="#dbeafe"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="landingShowcaseContent">
              <div className="landingShowcaseNumber">02</div>
              <h3 className="landingShowcaseTitle">AI Screens Candidates</h3>
              <p className="landingShowcaseText">
                Thousands screened. Minutes, not months.
              </p>
            </div>
          </div>

          {/* Step 3: Review & Hire */}
          <div className="landingShowcaseCard">
            <div className="landingShowcaseIllustration">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background - Blue theme */}
                <rect width="400" height="300" fill="url(#grad3)"/>
                
                {/* Podium - Blue shades */}
                <rect x="160" y="140" width="80" height="100" fill="#6ba8f5" opacity="0.3"/>
                <rect x="90" y="170" width="80" height="70" fill="#8bbef5" opacity="0.3"/>
                <rect x="230" y="190" width="80" height="50" fill="#8bbef5" opacity="0.3"/>
                
                {/* Top candidates - All blue */}
                <circle cx="200" cy="120" r="20" fill="#5b9cf5"/>
                <text x="200" y="128" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">1</text>
                
                <circle cx="130" cy="150" r="18" fill="#6ba8f5"/>
                <text x="130" y="157" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">2</text>
                
                <circle cx="270" cy="170" r="16" fill="#8bbef5"/>
                <text x="270" y="177" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">3</text>
                
                {/* Checkmarks - Blue */}
                <path d="M 185 115 L 195 125 L 215 105" stroke="#5b9cf5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Stars - Blue */}
                <g transform="translate(175, 90)">
                  <path d="M 12.5 0 L 15 10 L 25 10 L 17 16 L 20 26 L 12.5 20 L 5 26 L 8 16 L 0 10 L 10 10 Z" fill="#6ba8f5"/>
                </g>
                <g transform="translate(210, 90)">
                  <path d="M 12.5 0 L 15 10 L 25 10 L 17 16 L 20 26 L 12.5 20 L 5 26 L 8 16 L 0 10 L 10 10 Z" fill="#6ba8f5"/>
                </g>
                
                {/* Trophy - Blue */}
                <path d="M 190 250 L 180 265 L 220 265 L 210 250 Z" fill="#5b9cf5"/>
                <rect x="195" y="245" width="10" height="15" fill="#5b9cf5"/>
                <ellipse cx="200" cy="240" rx="15" ry="12" fill="#5b9cf5"/>
                <path d="M 185 240 Q 175 235 175 225 L 180 230" stroke="#5b9cf5" strokeWidth="3" fill="none"/>
                <path d="M 215 240 Q 225 235 225 225 L 220 230" stroke="#5b9cf5" strokeWidth="3" fill="none"/>
                
                <defs>
                  <linearGradient id="grad3" x1="0" y1="0" x2="400" y2="300">
                    <stop offset="0%" stopColor="#dbeafe"/>
                    <stop offset="100%" stopColor="#bfdbfe"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="landingShowcaseContent">
              <div className="landingShowcaseNumber">03</div>
              <h3 className="landingShowcaseTitle">Review Top Matches</h3>
              <p className="landingShowcaseText">
                Best candidates, ranked and ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
