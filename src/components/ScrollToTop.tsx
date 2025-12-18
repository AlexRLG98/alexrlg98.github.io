import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  const lastPathname = useRef(pathname);
  const hasHandledScrollTo = useRef(false);

  // useLayoutEffect runs before the browser paints
  useLayoutEffect(() => {
    // Only handle scrollTo on PUSH navigation (not on refresh/POP) and only once
    if (state?.scrollTo && navigationType === 'PUSH' && !hasHandledScrollTo.current) {
      hasHandledScrollTo.current = true;
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }, 0);
      return;
    }

    // Reset the flag when pathname changes
    if (pathname !== lastPathname.current) {
      hasHandledScrollTo.current = false;
      lastPathname.current = pathname;

      // Only scroll to top on PUSH navigation to a new page
      if (navigationType === 'PUSH' && !state?.scrollTo) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }, [pathname, state, navigationType]);

  return null;
}
