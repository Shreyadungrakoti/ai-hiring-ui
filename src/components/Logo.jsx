export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bold Curvy Letter A */}
      <path
        d="M 35 15 
           C 37 15, 39 17, 40 19
           L 60 70
           C 61 73, 60 76, 57 77
           L 50 77
           C 48 77, 46 76, 45 74
           L 42 64
           C 41.5 62.5, 40 61, 38 61
           L 32 61
           C 30 61, 28.5 62.5, 28 64
           L 25 74
           C 24 76, 22 77, 20 77
           L 13 77
           C 10 76, 9 73, 10 70
           L 30 19
           C 31 17, 33 15, 35 15 Z"
        fill="white"
      />
      {/* Curved cutout for A crossbar */}
      <ellipse cx="35" cy="56" rx="5" ry="3" fill="#000000" />
      
      {/* Bold Curvy Letter H */}
      <path
        d="M 80 20
           C 82 20, 84 22, 84 24
           L 84 43
           C 84 45, 85 46, 87 46
           L 108 46
           C 110 46, 111 45, 111 43
           L 111 24
           C 111 22, 113 20, 115 20
           L 122 20
           C 124 20, 126 22, 126 24
           L 126 73
           C 126 75, 124 77, 122 77
           L 115 77
           C 113 77, 111 75, 111 73
           L 111 54
           C 111 52, 110 51, 108 51
           L 87 51
           C 85 51, 84 52, 84 54
           L 84 73
           C 84 75, 82 77, 80 77
           L 73 77
           C 71 77, 69 75, 69 73
           L 69 24
           C 69 22, 71 20, 73 20
           L 80 20 Z"
        fill="white"
      />
    </svg>
  );
}
