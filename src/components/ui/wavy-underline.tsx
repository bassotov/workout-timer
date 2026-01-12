interface WavyUnderlineProps {
  children: React.ReactNode;
  className?: string;
}

export function WavyUnderline({ children, className }: WavyUnderlineProps) {
  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      {children}
      <svg
        className="absolute -bottom-4 left-0 w-full h-3 text-primary"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6 Q 2.5 0, 5 6 T 10 6 T 15 6 T 20 6 T 25 6 T 30 6 T 35 6 T 40 6 T 45 6 T 50 6 T 55 6 T 60 6 T 65 6 T 70 6 T 75 6 T 80 6 T 85 6 T 90 6 T 95 6 T 100 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
