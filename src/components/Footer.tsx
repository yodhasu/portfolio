import { profile } from "../content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-meta-block">
          <span className="footer-mono-label">SYS_STATUS</span>
          <span className="footer-status-indicator">ONLINE</span>
        </div>
        
        <p className="footer-copyright">
          © {currentYear} {profile.name} // Yodha Workspace. All rights reserved.
        </p>

        <div className="footer-meta-block text-right">
          <span className="footer-mono-label">LOC: {profile.location}</span>
          <span className="footer-mono-label">REPOS: {profile.githubRepos}</span>
        </div>
      </div>
    </footer>
  );
}
