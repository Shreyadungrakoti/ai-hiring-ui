export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bold Curvy Number 4 */}
      <path
        d="M 38 5
           C 41 5, 43 7, 43 10
           L 43 70
           C 43 73, 41 75, 38 75
           L 33 75
           C 30 75, 28 73, 28 70
           L 28 48
           L 8 48
           C 6 48, 5 47, 5 45
           L 5 41
           C 5 39.5, 5.5 38.5, 7 37
           L 28 8
           C 29 7, 30.5 5, 33 5
           L 38 5 Z
           M 28 35
           L 28 19
           L 17 35
           L 28 35 Z"
        fill="white"
      />
      
      {/* Horizontal crossbar extension */}
      <path
        d="M 8 41
           C 5 41, 3 43, 3 46
           L 3 48
           C 3 51, 5 53, 8 53
           L 50 53
           C 53 53, 55 51, 55 48
           L 55 46
           C 55 43, 53 41, 50 41
           L 8 41 Z"
        fill="white"
      />
    </svg>
  );
}
