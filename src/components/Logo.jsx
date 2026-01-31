export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fancy Letter A */}
      <path
        d="M 50 20 L 70 75 L 62 75 L 57 62 L 43 62 L 38 75 L 30 75 L 50 20 Z"
        fill="white"
      />
      {/* Crossbar */}
      <rect x="44" y="55" width="12" height="3" fill="#0d1117" />
      {/* Decorative serif top */}
      <path
        d="M 48 22 L 50 20 L 52 22"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
