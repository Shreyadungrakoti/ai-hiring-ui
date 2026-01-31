export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Resume/Document */}
      <rect x="25" y="20" width="50" height="60" rx="4" fill="#0d1117" stroke="white" strokeWidth="2" />
      
      {/* Document lines - white themed */}
      <line x1="32" y1="30" x2="60" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="40" x2="68" y2="40" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="48" x2="65" y2="48" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="56" x2="62" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="64" x2="68" y2="64" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      
      {/* Checkmark circle - white */}
      <circle cx="70" cy="70" r="18" fill="white" />
      <circle cx="70" cy="70" r="18" fill="#0d1117" fillOpacity="0.2" />
      
      {/* Checkmark */}
      <path 
        d="M 62 70 L 67 76 L 78 62" 
        stroke="#0d1117" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
