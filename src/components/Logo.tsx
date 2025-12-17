const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
        <path
          d="M26 14C26 14 24.5 14 22 14C18 14 16 16 16 20C16 24 18 26 22 26C24.5 26 26 26 26 26"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 14C14 14 15.5 14 18 14C22 14 24 16 24 20C24 24 22 26 18 26C15.5 26 14 26 14 26"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(189 94% 43%)" />
            <stop offset="1" stopColor="hsl(199 89% 48%)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-heading font-bold text-xl text-foreground">
        Innova<span className="gradient-text">Solutions</span>
      </span>
    </div>
  );
};

export default Logo;
