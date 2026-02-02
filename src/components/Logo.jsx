export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleek Modern Number 4 */}
      
      {/* Vertical right stroke - thin and elegant */}
      <path
        d="M 32 5
           C 33.5 5, 35 6.5, 35 8
           L 35 62
           C 35 63.5, 33.5 65, 32 65
           L 29 65
           C 27.5 65, 26 63.5, 26 62
           L 26 8
           C 26 6.5, 27.5 5, 29 5
           L 32 5 Z"
        fill="white"
      />
      
      {/* Diagonal stroke - sleek angled line */}
      <path
        d="M 5 38
           C 4 39, 3 40.5, 3 42
           L 3 44
           C 3 45, 3.5 46, 4.5 46.5
           L 25 46.5
           L 26 46.5
           L 26 10
           C 26 9, 25.5 8.5, 24.5 9
           L 6 38
           C 5.5 38.5, 5 38.5, 5 38 Z"
        fill="white"
      />
      
      {/* Horizontal crossbar - thin modern line */}
      <path
        d="M 4 42
           C 2.5 42, 1 43.5, 1 45
           L 1 47
           C 1 48.5, 2.5 50, 4 50
           L 45 50
           C 46.5 50, 48 48.5, 48 47
           L 48 45
           C 48 43.5, 46.5 42, 45 42
           L 4 42 Z"
        fill="white"
      />
    </svg>
  );
}
