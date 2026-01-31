export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bold Curvy Letter A */}
      <path
        d="M 50 15 
           C 52 15, 54 17, 55 19
           L 75 70
           C 76 73, 75 76, 72 77
           L 65 77
           C 63 77, 61 76, 60 74
           L 57 64
           C 56.5 62.5, 55 61, 53 61
           L 47 61
           C 45 61, 43.5 62.5, 43 64
           L 40 74
           C 39 76, 37 77, 35 77
           L 28 77
           C 25 76, 24 73, 25 70
           L 45 19
           C 46 17, 48 15, 50 15 Z"
        fill="white"
      />
      {/* Curved cutout for crossbar */}
      <ellipse cx="50" cy="56" rx="5" ry="3" fill="#000000" />
    </svg>
  );
}
