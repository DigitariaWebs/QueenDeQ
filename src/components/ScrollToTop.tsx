import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };
    
    // Execute scroll on route change
    scrollToTop();
    
    // Also try after a small delay to ensure content is loaded
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 