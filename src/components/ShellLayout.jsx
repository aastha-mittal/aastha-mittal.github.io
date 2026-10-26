import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Activity, Cpu, FlaskConical, LayoutDashboard, Menu, Sparkles, X } from "lucide-react";
import { LINKS, RESUME_PDF } from "../data/constants";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: Cpu },
  { to: "/playground", label: "Playground", icon: FlaskConical },
  { to: "/thinking", label: "Thinking", icon: Sparkles },
];

function desktopNavClass({ isActive }) {
  return `shell-nav-link ${isActive ? "active" : ""}`;
}

function mobileNavClass({ isActive }) {
  return `shell-nav-link shell-nav-link-mobile ${isActive ? "active" : ""}`;
}

export default function ShellLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const first = drawerRef.current?.querySelector("a");
      window.requestAnimationFrame(() => first?.focus());
    } else if (wasOpenRef.current) {
      menuBtnRef.current?.focus();
    }
    wasOpenRef.current = menuOpen;
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="shell">
      <div className="shell-bg" aria-hidden />
      <header className="shell-header">
        <NavLink to="/" className="shell-brand" onClick={closeMenu}>
          <Activity className="shell-brand-icon" size={22} strokeWidth={2.2} />
          <span className="shell-brand-text">
            <span className="shell-brand-name">aastha.mittal</span>
            <span className="shell-brand-sub">software · systems · demos</span>
          </span>
        </NavLink>
        <nav className="shell-nav shell-nav-desktop" aria-label="Primary">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={desktopNavClass}>
              <Icon size={16} strokeWidth={2} aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="shell-header-end">
          <div className="shell-actions">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="shell-link-ghost">
              LinkedIn
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="shell-link-ghost">
              GitHub
            </a>
            <a href={RESUME_PDF} target="_blank" rel="noreferrer" className="shell-btn-resume">
              Résumé
            </a>
          </div>
          <button
            ref={menuBtnRef}
            type="button"
            className="shell-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} strokeWidth={2.2} aria-hidden /> : <Menu size={22} strokeWidth={2.2} aria-hidden />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <button type="button" className="shell-nav-backdrop" aria-label="Close menu" onClick={closeMenu} />
      ) : null}

      <div
        ref={drawerRef}
        id="site-nav-drawer"
        className={`shell-nav-drawer ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav className="shell-nav-mobile" aria-label="Primary">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={mobileNavClass} onClick={closeMenu}>
              <Icon size={18} strokeWidth={2} aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="shell-main">
        <Outlet />
      </main>
      <footer className="shell-footer">
        <a href={LINKS.email}>aasthami@andrew.cmu.edu</a>
        <span className="shell-dot">·</span>
        <a href={LINKS.phone}>(602) 706-9102</a>
        <span className="shell-dot">·</span>
        <span>CMU · B.S. CS · May 2028</span>
      </footer>
    </div>
  );
}
