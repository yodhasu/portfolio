import { motion } from "framer-motion";
import type { Experience } from "../content";

type TimelineItemProps = {
  item: Experience;
};

export default function TimelineItem({ item }: TimelineItemProps) {
  const Icon = item.icon;

  return (
    <motion.article
      className="timeline-item-card"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <span className="blueprint-corner tl">+</span>
      <span className="blueprint-corner tr">+</span>
      
      <div className="timeline-badge-column">
        <div className="timeline-icon-wrapper">
          <Icon size={18} />
        </div>
        <div className="timeline-connector-line"></div>
      </div>

      <div className="timeline-content-column">
        <div className="timeline-meta-row">
          <span className="timeline-period-tag">{item.period}</span>
          <span className="timeline-org-tag">{item.org}</span>
        </div>
        
        <h3 className="timeline-job-title">{item.title}</h3>
        <p className="timeline-brief-summary">{item.summary}</p>

        {item.details && item.details.length > 0 && (
          <ul className="timeline-detail-bullets">
            {item.details.map((detail, idx) => (
              <li key={idx} className="timeline-bullet">
                <span className="bullet-prompt">&gt;</span> {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
