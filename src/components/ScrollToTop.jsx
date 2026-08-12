import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation by default —
 * this restores that browser-native behavior for the whole app.
 * Mount it once, inside <BrowserRouter>, above your <Routes>.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
