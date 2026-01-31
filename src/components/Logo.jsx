export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background with blue gradient */}
      <rect width="100" height="100" rx="16" fill="url(#logoGrad)" />
      
      {/* Resume/Document */}
      <rect x="25" y="20" width="50" height="60" rx="4" fill="white" />
      
      {/* Document lines - blue themed */}
      <line x1="32" y1="30" x2="60" y2="30" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="40" x2="68" y2="40" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="48" x2="65" y2="48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="56" x2="62" y2="56" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="64" x2="68" y2="64" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      
      {/* Checkmark circle - blue */}
      <circle cx="70" cy="70" r="18" fill="#3b82f6" />
      <circle cx="70" cy="70" r="18" fill="white" fillOpacity="0.2" />
      
      {/* Checkmark */}
      <path 
        d="M 62 70 L 67 76 L 78 62" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Blue gradient definition */}
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
    </svg>
  );
}
