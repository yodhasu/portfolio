import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PortfolioPage from "./pages/PortfolioPage";
import ReinePage from "./pages/ReinePage";

const getRoute = () => window.location.pathname.replace(/\/$/, "") || "/";

function App() {
  const [currentRoute, setCurrentRoute] = useState(getRoute);

  useEffect(() => {
    const syncRoute = () => {
      setCurrentRoute(getRoute());
    };

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");

      if (!anchor || anchor.target || anchor.hasAttribute("download")) {
        return;
      }

      // Check if it's a mailto or standard external link
      if (anchor.href.startsWith("mailto:") || anchor.href.startsWith("tel:")) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      const path = url.pathname.replace(/\/$/, "") || "/";
      if (!["/", "/reine"].includes(path)) {
        return;
      }

      // Allow hash scrolling
      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.hash}`);
      syncRoute();

      if (url.hash) {
        const target = document.querySelector(url.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", syncRoute);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", syncRoute);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="site-shell">
      <Navbar currentRoute={currentRoute} onNavigate={setCurrentRoute} />
      
      <main className="site-main">
        {currentRoute === "/reine" ? (
          <ReinePage onNavigate={setCurrentRoute} />
        ) : (
          <PortfolioPage onNavigate={setCurrentRoute} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
