export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bold Curvy Number 4 */}
      {/* Vertical right stroke */}
      <path
        d="M 62 15
           C 65 15, 68 18, 68 21
           L 68 79
           C 68 82, 65 85, 62 85
           L 55 85
           C 52 85, 49 82, 49 79
           L 49 21
           C 49 18, 52 15, 55 15
           L 62 15 Z"
        fill="white"
      />
      
      {/* Diagonal top stroke */}
      <path
        d="M 30 15
           C 33 15, 35 17, 36 20
           L 36 23
           C 36 25, 37 26, 39 27
           L 55 46
           C 56 47, 55 49, 53 49
           L 49 49
           L 49 21
           C 49 19, 48 18, 46 17
           L 34 17
           C 32 17, 30 17, 30 15 Z"
        fill="white"
      />
      
      {/* Horizontal middle stroke */}
      <path
        d="M 25 46
           C 22 46, 20 48, 20 51
           L 20 57
           C 20 60, 22 62, 25 62
           L 75 62
           C 78 62, 80 60, 80 57
           L 80 51
           C 80 48, 78 46, 75 46
           L 25 46 Z"
        fill="white"
      />
    </svg>
  );
}
