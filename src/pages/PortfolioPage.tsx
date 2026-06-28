import { useEffect } from "react";
import { GitBranch, Sparkles, Mail, ArrowRight, Download, GraduationCap, Globe } from "lucide-react";
import { profile, featuredProjects, experience, skillGroups, credentials, contactActions } from "../content";
import ProjectCard from "../components/ProjectCard";
import TimelineItem from "../components/TimelineItem";
import SkillCard from "../components/SkillCard";
import SectionHeader from "../components/SectionHeader";
import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";

type PortfolioPageProps = {
  onNavigate: (route: string) => void;
};

export default function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  useEffect(() => {
    document.title = "Alethea Agung Yodha Pratama | Personal Research Lab & Portfolio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Portfolio of Alethea Agung Yodha Pratama: Computer Science student, AI research paper author (ReINE), enterprise web developer, and digital art teacher."
      );
    }
  }, []);

  // Group projects as required
  const researchProjects = featuredProjects.filter(p => p.tone === "research" || p.name === "DreamConnectNew");
  const webProjects = featuredProjects.filter(p => p.tone === "product");
  const creativeProjects = featuredProjects.filter(p => p.tone === "creative" && p.name !== "DreamConnectNew");

  return (
    <div className="portfolio-shell">
      {/* Hero Bento Section */}
      <section className="hero-bento-grid">
        {/* Main Intro Card */}
        <AnimatedSection className="bento-card hero-main-card" direction="up">
          <span className="bento-mono-label">SYS_IDENTITY // YODHA WORKSPACE</span>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-intro-text">{profile.intro}</p>
          
          <div className="hero-actions-row">
            <a className="action-btn-glow primary-glow" href="#work">
              Explore Projects <ArrowRight size={16} />
            </a>
            <a className="action-btn-glow secondary-glow" href={`mailto:${profile.email}`}>
              <Mail size={16} /> Contact
            </a>
          </div>
        </AnimatedSection>

        {/* Profile Avatar Card */}
        <AnimatedSection className="bento-card hero-avatar-card" direction="up" delay={0.1}>
          <div className="avatar-container">
            <img src={profile.avatar} alt={`${profile.name} Profile`} className="avatar-image" />
            <div className="avatar-grid-overlay"></div>
          </div>
        </AnimatedSection>

        {/* Stats Card */}
        <AnimatedSection className="bento-card hero-stats-card" direction="up" delay={0.15}>
          <span className="bento-mono-label">METRICS // GITHUB</span>
          <div className="stats-number">{profile.githubRepos}</div>
          <span className="stats-label">Public Repositories</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="stats-github-link"
          >
            github.com/yodhasu
          </a>
        </AnimatedSection>

        {/* Quick Credentials / Status Card */}
        <AnimatedSection className="bento-card hero-status-card" direction="up" delay={0.2}>
          <span className="bento-mono-label">SYS_STATUS // ACTIVE</span>
          <div className="status-item">
            <GitBranch size={16} className="text-cyan" />
            <span>AI Research (Steering Vectors)</span>
          </div>
          <div className="status-item">
            <Sparkles size={16} className="text-coral" />
            <span>Creative Teaching & Art</span>
          </div>
          <div className="status-item">
            <Globe size={16} className="text-amber" />
            <span>IT Systems & Dev Work</span>
          </div>
        </AnimatedSection>
      </section>

      {/* Featured Work / Projects Section */}
      <section id="work" className="portfolio-section">
        <SectionHeader
          kicker="Selected proof"
          title="Featured Work"
        />

        {/* Categorized Bento Sections */}
        <div className="projects-categorized-container">
          
          {/* Research & AI Experiments */}
          <div className="project-category-block">
            <div className="category-kicker-row">
              <span className="category-mono-tag text-cyan">CAT_01 // RESEARCH & AI EXPERIMENTS</span>
            </div>
            <div className="projects-bento-row two-columns">
              {researchProjects.map((project) => (
                <ProjectCard key={project.name} project={project} featured={project.name === "ReINE"} />
              ))}
            </div>
          </div>

          {/* Web Systems */}
          <div className="project-category-block">
            <div className="category-kicker-row">
              <span className="category-mono-tag text-green">CAT_02 // WEB SYSTEMS & BACKEND</span>
            </div>
            <div className="projects-bento-row two-columns">
              {webProjects.map((project) => (
                <ProjectCard key={project.name} project={project} featured={project.name === "Pasraman LMS"} />
              ))}
            </div>
          </div>

          {/* Creative Tools */}
          <div className="project-category-block">
            <div className="category-kicker-row">
              <span className="category-mono-tag text-coral">CAT_03 // CREATIVE TOOLS</span>
            </div>
            <div className="projects-bento-row single-column">
              {creativeProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="portfolio-section">
        <SectionHeader
          kicker="Timeline & Chronology"
          title="Professional Experience"
        />
        
        <div className="experience-timeline-container">
          {experience.map((item, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.05} direction="left">
              <TimelineItem item={item} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Creative Teaching Band */}
      <section id="creative" className="portfolio-section creative-showcase-band">
        <span className="blueprint-corner tl">+</span>
        <span className="blueprint-corner br">+</span>
        <div className="blueprint-grid-overlay"></div>

        <div className="creative-band-split">
          <AnimatedSection className="creative-band-copy">
            <span className="section-mono-kicker text-coral">ART & COMMUNICATION</span>
            <h2 className="creative-teaching-header">Creative Teaching</h2>
            <h3 className="creative-tagline">Digital drawing made my technical work easier to explain.</h3>
            <p className="creative-desc">
              Teaching manga and digital drawing workflows at BINUS Nippon Club trained me to
              critique clearly, break down vague goals, and make feedback actionable. That same
              habit shows up in UAT scripts, API handoff docs, and public research explainers.
            </p>
          </AnimatedSection>

          <AnimatedSection className="creative-band-widget-container" direction="right">
            <div className="creative-board-card">
              <span className="card-mono-label text-coral">WORKFLOW_WORKSPACE // PEDAGOGY</span>
              <div className="pedagogy-value">Observe → Explain → Revise</div>
              <p className="pedagogy-desc">
                From drawing critique to software validation, the core skill is making the next steps obvious, actionable, and repeatable.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills & Credentials Section */}
      <section id="skills" className="portfolio-section">
        <SectionHeader
          kicker="Capabilities & Verification"
          title="Skills & Credentials"
        />

        <div className="skills-layout-grid">
          {/* Skills Column */}
          <div className="skills-cards-subgrid">
            {skillGroups.map((group, idx) => (
              <AnimatedSection key={group.title} delay={idx * 0.05} direction="up">
                <SkillCard
                  title={group.title}
                  icon={group.icon}
                  items={group.items}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Credentials Column */}
          <AnimatedSection className="credentials-sidebar-card" direction="right">
            <span className="blueprint-corner tl">+</span>
            <span className="blueprint-corner br">+</span>
            
            <div className="credentials-header-row">
              <GraduationCap size={20} className="text-amber" />
              <h3>Academic & Tech Credentials</h3>
            </div>

            <ul className="credentials-list-bullets">
              {credentials.map((cred, idx) => (
                <li key={idx} className="cred-bullet-item">
                  <span className="bullet-indicator">//</span> {cred}
                </li>
              ))}
            </ul>

            <div className="education-subsegment">
              <h4 className="subsegment-title">Education Detail</h4>
              {profile.education.map((edu, idx) => (
                <div key={idx} className="education-detail-row">
                  <div className="edu-inst">{edu.institution}</div>
                  <div className="edu-deg">{edu.degree}</div>
                  <div className="edu-meta font-mono">
                    <span>{edu.period}</span>
                    {edu.gpa !== "N/A" && <span className="edu-gpa">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="languages-subsegment">
              <h4 className="subsegment-title">Languages</h4>
              <div className="languages-tags-row">
                {profile.languages.map((lang, idx) => (
                  <span key={idx} className="lang-tag font-mono">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section contact-funnel-card">
        <span className="blueprint-corner tl">+</span>
        <span className="blueprint-corner tr">+</span>
        <span className="blueprint-corner bl">+</span>
        <span className="blueprint-corner br">+</span>
        
        <AnimatedSection className="contact-card-content text-center">
          <span className="section-mono-kicker text-cyan">SYS_COMMUNICATION</span>
          <h2 className="contact-cta-headline">Let's build something.</h2>
          <p className="contact-cta-desc">
            Open to software developer roles, research-heavy builds, and backend system collaborations.
          </p>

          <div className="contact-buttons-row justify-center">
            {contactActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  className={`contact-funnel-btn ${action.label === "Download CV" ? "cv-download-btn" : ""}`}
                  download={action.download ? true : undefined}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                  <span>{action.label}</span>
                </motion.a>
              );
            })}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
