export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Combined 4A Logo - Sleek and Modern */}
      
      {/* Left diagonal - forms the A's left side and 4's angled part */}
      <path
        d="M 20 65
           L 20 50
           L 35 8
           C 35.5 6.5, 36.5 5, 38 5
           L 41 5
           C 42 5, 42.5 5.5, 42.5 6.5
           L 42.5 50
           L 42.5 65
           C 42.5 67, 41 68, 39.5 68
           L 22 68
           C 20.5 68, 20 67, 20 65 Z
           M 28 40
           L 36 18
           L 36 40
           L 28 40 Z"
        fill="white"
      />
      
      {/* Right vertical stroke - extends full height */}
      <rect
        x="42.5"
        y="5"
        width="5.5"
        height="63"
        rx="2"
        fill="white"
      />
      
      {/* Horizontal crossbar - connects both parts */}
      <rect
        x="12"
        y="45"
        width="56"
        height="5"
        rx="2"
        fill="white"
      />
    </svg>
  );
}
