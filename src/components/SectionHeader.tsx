import AnimatedSection from "./AnimatedSection";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  id?: string;
  className?: string;
};

export default function SectionHeader({ kicker, title, id, className = "" }: SectionHeaderProps) {
  return (
    <AnimatedSection className={`section-header ${className}`} id={id}>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
    </AnimatedSection>
  );
}
