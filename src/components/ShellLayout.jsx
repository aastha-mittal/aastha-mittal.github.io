import { NavLink, Outlet } from "react-router-dom";
import { Activity, Cpu, FlaskConical, LayoutDashboard, Sparkles } from "lucide-react";
import { LINKS, RESUME_PDF } from "../data/constants";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: Cpu },
  { to: "/playground", label: "Playground", icon: FlaskConical },
  { to: "/thinking", label: "Thinking", icon: Sparkles },
];

export default function ShellLayout() {
  return (
    <div className="shell">
      <div className="shell-bg" aria-hidden />
      <header className="shell-header">
        <NavLink to="/" className="shell-brand">
          <Activity className="shell-brand-icon" size={22} strokeWidth={2.2} />
          <span className="shell-brand-text">
            <span className="shell-brand-name">aastha.mittal</span>
            <span className="shell-brand-sub">portfolio · projects · demos</span>
          </span>
        </NavLink>
        <nav className="shell-nav" aria-label="Primary">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => `shell-nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={16} strokeWidth={2} aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
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
      </header>
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
