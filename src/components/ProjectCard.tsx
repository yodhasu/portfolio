import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "../content";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.article
      className={`project-card ${project.tone} ${featured ? "featured" : ""}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Blueprint corner decorations */}
      <span className="blueprint-corner tl">+</span>
      <span className="blueprint-corner tr">+</span>
      <span className="blueprint-corner bl">+</span>
      <span className="blueprint-corner br">+</span>
      <div className="blueprint-grid-overlay"></div>

      <div className="project-topline">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="project-role-tag">{project.role}</span>
          {project.status && (
            <span className="project-status-badge">{project.status}</span>
          )}
        </div>
        <span className="project-year-tag">{project.year}</span>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.name}</h3>
        <p className="project-summary-text">{project.summary}</p>
        <p className="project-proof-text">
          <span className="proof-label">Validation / Proof:</span> {project.proof}
        </p>
      </div>

      <div className="project-footer mt-auto">
        <ul className="stack-list" aria-label={`${project.name} tech stack`}>
          {project.stack.map((tech) => (
            <li key={tech} className="tech-badge">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-links-row">
          {project.detailHref ? (
            <a className="project-action-link primary-link" href={project.detailHref}>
              Explore Explainer <ArrowRight size={14} />
            </a>
          ) : null}
          <a
            className="project-action-link secondary-link"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
