import { useState, useEffect } from "react";
import { Menu, X, Rocket } from "lucide-react";
import { profile } from "../content";

type NavbarProps = {
  currentRoute: string;
  onNavigate: (route: string) => void;
};

export default function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Creative", href: "#creative" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ] as const;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    if (currentRoute !== "/") return;

    const sections = navItems.map(item => document.querySelector(item.href));
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Focus on upper-middle viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(`#${id}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [currentRoute]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (currentRoute === "/reine") {
      e.preventDefault();
      // Go to home first, and append hash
      window.history.pushState(null, "", `/${href}`);
      onNavigate("/");
      
      // Allow route change to commit, then scroll
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home, let standard hash link run, or do smooth scroll manually for safety
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.history.pushState(null, "", `/${href}`);
        target.scrollIntoView({ behavior: "smooth" });
        setActiveSection(href);
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState(null, "", "/");
    onNavigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a className="brand" href="/" onClick={handleLogoClick} aria-label="Alethea portfolio home">
          <span className="brand-mark">AY</span>
          <span className="brand-text">Yodha Studio</span>
        </a>

        {currentRoute === "/" ? (
          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={activeSection === item.href ? "active" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="nav-links" aria-label="Primary">
            <a href="/" onClick={handleLogoClick}>
              Back to Portfolio
            </a>
          </nav>
        )}

        <div className="nav-actions">
          <a className="header-action" href={profile.cvPath} download>
            <Rocket size={14} /> CV
          </a>
          <button
            className="menu-button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile">
            {currentRoute === "/" ? (
              navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={activeSection === item.href ? "active" : ""}
                >
                  {item.label}
                </a>
              ))
            ) : (
              <a href="/" onClick={handleLogoClick}>
                Back to Portfolio
              </a>
            )}
            <a href={profile.cvPath} download onClick={() => setIsMenuOpen(false)}>
              Download CV
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
