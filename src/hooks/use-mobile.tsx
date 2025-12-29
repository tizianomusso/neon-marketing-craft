import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Check if we're on mobile immediately (SSR-safe)
const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
};

export function useIsMobile() {
  // Initialize with actual value to prevent flash
  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile);

  React.useEffect(() => {
    // Update immediately in case SSR value was wrong
    setIsMobile(getIsMobile());
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
