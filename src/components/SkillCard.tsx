import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SkillCardProps = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export default function SkillCard({ title, icon: Icon, items }: SkillCardProps) {
  return (
    <motion.article
      className="skill-card-panel"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <span className="blueprint-corner tl">+</span>
      <span className="blueprint-corner tr">+</span>
      <span className="blueprint-corner bl">+</span>
      <span className="blueprint-corner br">+</span>
      
      <div className="skill-card-header">
        <div className="skill-icon-box">
          <Icon size={18} />
        </div>
        <h3 className="skill-group-title">{title}</h3>
      </div>

      <div className="skill-card-body">
        <div className="skill-tags-grid">
          {items.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
