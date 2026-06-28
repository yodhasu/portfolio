import { motion, useReducedMotion } from "framer-motion";

type DiagramProps = {
  type: "architecture" | "hook" | "anchor";
};

export default function AnimatedDiagram({ type }: DiagramProps) {
  if (type === "architecture") {
    return <ArchitectureDiagram />;
  } else if (type === "hook") {
    return <HookInterventionDiagram />;
  } else {
    return <AnchorLossDiagram />;
  }
}

function ArchitectureDiagram() {
  const shouldReduceMotion = useReducedMotion();

  // Layout coordinates for 5 adapted layers & 1 compressed layer block
  const layers = [
    { id: 0, x: 60, label: "Layer 0" },
    { id: 1, x: 145, label: "Layer 1" },
    { id: 2, x: 230, label: "Layer 2" },
    { id: 3, x: 315, label: "Layer 3" },
    { id: 4, x: 400, label: "Layer 4" }
  ];

  const compressedBlock = { x: 505, width: 235, label: "Layers 5–35" };

  return (
    <div className="diagram-box">
      <div className="diagram-caption">ReINE edits early residual states, not the whole model</div>
      <div className="diagram-subcaption text-center" style={{ color: "var(--color-text-muted)", fontSize: "12px", marginBottom: "16px" }}>
        Host weights remain frozen; only tiny adapters are trained
      </div>
      
      <svg viewBox="0 0 800 300" className="animated-svg-diagram">
        <defs>
          <linearGradient id="frozenLayerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="adaptedLayerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="adapterFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B7CF6" />
            <stop offset="100%" stopColor="#5BAEFF" />
          </linearGradient>
          <pattern id="diagGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Grid Background */}
        <rect width="800" height="300" fill="url(#diagGridPattern)" />

        {/* Residual Stream Line */}
        <line x1="30" y1="180" x2="770" y2="180" stroke="rgba(91,174,255,0.15)" strokeWidth="4" strokeDasharray="6 6" />
        
        {/* Animated Stream Path */}
        <motion.path
          d="M 30 180 L 770 180"
          fill="none"
          stroke="#5BAEFF"
          strokeWidth="2.5"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* BRACKET 1: Adapted Section */}
        <g>
          {/* Bracket line */}
          <path d="M 60 48 L 60 40 L 460 40 L 460 48" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" />
          <text x="260" y="26" fill="var(--accent-cyan)" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
            Best variant: Lower-5 + CoT
          </text>
          <text x="260" y="38" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="Inter">
            Only layers 0–4 receive residual adapters
          </text>
        </g>

        {/* BRACKET 2: Frozen Section */}
        <g>
          {/* Bracket line */}
          <path d="M 505 48 L 505 40 L 740 40 L 740 48" fill="none" stroke="#64748b" strokeWidth="1.5" />
          <text x="622" y="26" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
            Remaining layers stay frozen
          </text>
          <text x="622" y="38" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="Inter">
            Base capabilities mostly preserved
          </text>
        </g>

        {/* Sequential Layers */}
        {layers.map((layer, index) => {
          return (
            <g key={layer.id}>
              {/* Connection adapter to layer */}
              <motion.line
                x1={layer.x + 30}
                y1={105}
                x2={layer.x + 30}
                y2={140}
                stroke="var(--accent-violet)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
              />

              {/* Trainable MicroAdapter Module */}
              <motion.g
                initial={shouldReduceMotion ? false : { opacity: 0, y: -15, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 }}
              >
                {/* Adapter outline box */}
                <rect x={layer.x + 2} y={75} width="56" height="30" rx="4" fill="url(#adapterFillGrad)" stroke="var(--accent-violet)" strokeWidth="1.5" />
                <text x={layer.x + 30} y={93} fill="#070a13" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
                  Adapter {layer.id}
                </text>
                <text x={layer.x + 30} y={67} fill="var(--accent-violet)" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
                  TRAINABLE
                </text>
              </motion.g>

              {/* Layer Block */}
              <motion.g
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Layer box */}
                <motion.rect
                  x={layer.x}
                  y={140}
                  width="60"
                  height="80"
                  rx="6"
                  fill="url(#adaptedLayerGrad)"
                  stroke="rgba(91, 174, 255, 0.3)"
                  strokeWidth="1.5"
                  animate={shouldReduceMotion ? {} : {
                    stroke: ["rgba(91, 174, 255, 0.3)", "rgba(91, 174, 255, 1)", "rgba(91, 174, 255, 0.3)"]
                  }}
                  transition={{ delay: 1.2, duration: 1.2, repeat: 0 }}
                />
                <text x={layer.x + 30} y={170} fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Outfit">
                  {layer.label}
                </text>
                <text x={layer.x + 30} y={190} fill="var(--accent-cyan)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
                  ADAPTED
                </text>
                <text x={layer.x + 30} y={205} fill="#475569" fontSize="6.5" textAnchor="middle" fontFamily="Inter">
                  FROZEN HOST
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* Ellipsis dot markers */}
        <g transform="translate(473, 180)" opacity="0.5">
          <circle cx="5" cy="0" r="3" fill="#5BAEFF" />
          <circle cx="15" cy="0" r="3" fill="#5BAEFF" />
          <circle cx="25" cy="0" r="3" fill="#5BAEFF" />
        </g>

        {/* Compressed Frozen layers 5-35 Block */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Dimmed slate background */}
          <rect x={compressedBlock.x} y={140} width={compressedBlock.width} height={80} rx="6" fill="url(#frozenLayerGrad)" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={compressedBlock.x + compressedBlock.width / 2} y={175} fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Outfit">
            {compressedBlock.label}
          </text>
          <text x={compressedBlock.x + compressedBlock.width / 2} y={195} fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
            FROZEN / UNMODIFIED
          </text>
          <text x={compressedBlock.x + compressedBlock.width / 2} y={210} fill="#475569" fontSize="8.5" textAnchor="middle" fontFamily="Inter">
            Base Host Weights Preserved
          </text>
        </motion.g>

        {/* Bottom Callout annotation */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <text x="400" y="270" fill="#F4B860" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
            Shallow Intervention: layers 0–4 adapted; layers 5–35 untouched.
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

function HookInterventionDiagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="diagram-box">
      <div className="diagram-caption">Forward Hook Residual Intervention Flow</div>
      <div className="diagram-subcaption text-center" style={{ color: "var(--color-text-muted)", fontSize: "12px", marginBottom: "16px" }}>
        Concept: h_in → Frozen Layer → Tapped State → MicroAdapter (Δh) → Residual Add → h_out
      </div>
      
      <svg viewBox="0 0 800 300" className="animated-svg-diagram">
        <defs>
          <pattern id="diagGridPattern2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Grid Background */}
        <rect width="800" height="300" fill="url(#diagGridPattern2)" />

        {/* Horizontal main stream path */}
        <line x1="40" y1="180" x2="760" y2="180" stroke="rgba(91,174,255,0.15)" strokeWidth="4" />
        
        {/* Draw main stream line */}
        <motion.path
          d="M 40 180 L 654 180"
          fill="none"
          stroke="#5BAEFF"
          strokeWidth="2.5"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Label h_in */}
        <text x="40" y="150" fill="var(--accent-cyan)" fontSize="11" fontWeight="bold" fontFamily="Fira Code">
          Input: h_in
        </text>
        <text x="40" y="165" fill="var(--color-text-muted)" fontSize="9.5" fontFamily="Inter">
          Hidden State L-1
        </text>

        {/* Frozen transformer block */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Box */}
          <rect x="130" y="130" width="160" height="90" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
          <text x="210" y="165" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Outfit">
            Frozen Layer L
          </text>
          <text x="210" y="185" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
            NOT TRAINABLE
          </text>
          <text x="210" y="200" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="Inter">
            Host weights stay frozen
          </text>
        </motion.g>

        {/* Tap Hook Point */}
        <circle cx="340" cy="180" r="6" fill="var(--accent-violet)" />
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <text x="340" y="210" fill="var(--accent-violet)" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
            Forward Hook Tap
          </text>
        </motion.g>

        {/* Hook Tap Path Upward */}
        <motion.path
          d="M 340 180 L 340 85 L 390 85"
          fill="none"
          stroke="var(--accent-violet)"
          strokeWidth="2"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />

        {/* Trainable MicroAdapter Wrapper */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Outer dotted container */}
          <rect x="390" y="35" width="220" height="90" rx="8" fill="rgba(139, 124, 246, 0.05)" stroke="var(--accent-violet)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="500" y="55" fill="var(--accent-violet)" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Outfit">
            Trainable MicroAdapter (Rank r=16)
          </text>

          {/* Low rank components */}
          <rect x="405" y="68" width="55" height="40" rx="3" fill="#070a13" stroke="var(--accent-violet)" strokeWidth="1.5" />
          <text x="432.5" y="87" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">W_down</text>
          <text x="432.5" y="99" fill="var(--color-text-muted)" fontSize="7" textAnchor="middle" fontFamily="Inter">Projection</text>

          {/* Scale/Dropout */}
          <rect x="475" y="68" width="50" height="40" rx="3" fill="#070a13" stroke="var(--accent-amber)" strokeWidth="1.5" />
          <text x="500" y="87" fill="var(--accent-amber)" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">s / Drop</text>
          <text x="500" y="99" fill="var(--color-text-muted)" fontSize="7" textAnchor="middle" fontFamily="Inter">Scaling</text>

          {/* W_up */}
          <rect x="540" y="68" width="55" height="40" rx="3" fill="#070a13" stroke="var(--accent-violet)" strokeWidth="1.5" />
          <text x="567.5" y="87" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">W_up</text>
          <text x="567.5" y="99" fill="var(--color-text-muted)" fontSize="7" textAnchor="middle" fontFamily="Inter">Projection</text>
          
          <path d="M 460 88 L 475 88" stroke="var(--accent-violet)" strokeWidth="1" />
          <path d="M 525 88 L 540 88" stroke="var(--accent-violet)" strokeWidth="1" />
        </motion.g>

        {/* Path Adapter to Delta h */}
        <motion.path
          d="M 610 80 L 640 80"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="2"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.3 }}
        />

        {/* Delta h block (Produces residual delta) */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <rect x="640" y="55" width="80" height="50" rx="4" fill="#070a13" stroke="var(--accent-cyan)" strokeWidth="2" />
          <text x="680" y="78" fill="var(--accent-cyan)" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Outfit">
            Δh
          </text>
          <text x="680" y="94" fill="var(--color-text-muted)" fontSize="8.5" textAnchor="middle" fontFamily="Fira Code">
            residual delta
          </text>
        </motion.g>

        {/* Path Delta h down to Sum node */}
        <motion.path
          d="M 680 105 L 680 160"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="2"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.3 }}
        />

        {/* Sum / addition node */}
        <g transform="translate(664, 164)">
          <circle cx="16" cy="16" r="16" fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth="2" />
          <text x="16" y="22" fill="var(--accent-cyan)" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Inter">+</text>
        </g>
        <text x="640" y="215" fill="var(--accent-cyan)" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
          Residual Add
        </text>

        {/* Path out of Sum node */}
        <motion.path
          d="M 696 180 L 760 180"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="2.5"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.4 }}
        />

        {/* Label h_out */}
        <text x="760" y="150" fill="var(--accent-cyan)" fontSize="11" fontWeight="bold" textAnchor="end" fontFamily="Fira Code">
          Output: h_out
        </text>
        <text x="760" y="165" fill="var(--color-text-muted)" fontSize="9.5" textAnchor="end" fontFamily="Inter">
          Steered State
        </text>

        {/* Formula details */}
        <text x="400" y="260" fill="var(--accent-cyan)" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code">
          Equation: h_out = h_in + s * f(h_in)
        </text>
        <text x="400" y="278" fill="var(--accent-violet)" fontSize="9.5" textAnchor="middle" fontFamily="Inter">
          * W_up initialized to zero, ensuring zero initial effect on host capabilities.
        </text>
      </svg>
    </div>
  );
}

function AnchorLossDiagram() {
  return (
    <div className="diagram-box">
      <div className="diagram-caption">Lower-Layer Anchor Loss & Regularization Flow</div>
      <svg viewBox="0 0 800 240" className="animated-svg-diagram">
        <pattern id="gridPattern3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        </pattern>
        <rect width="800" height="240" fill="url(#gridPattern3)" />

        {/* Anchor text processing branch */}
        <g transform="translate(50, 40)">
          <rect width="180" height="40" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
          <text x="90" y="24" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="Fira Code">FROZEN HOST BACKBONE</text>
          
          <path d="M 180 20 L 260 20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text x="220" y="12" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="Fira Code">Run anchor text</text>

          {/* Reference representation extraction */}
          <rect x="260" y="5" width="120" height="30" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <text x="320" y="23" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Fira Code">Pool ref vectors (r_L)</text>
        </g>

        {/* Adapted model branch */}
        <g transform="translate(50, 130)">
          <rect width="180" height="40" rx="4" fill="#111827" stroke="#5BAEFF" strokeWidth="1.5" />
          <text x="90" y="24" fill="#5BAEFF" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="Fira Code">ADAPTED MODEL (ReINE)</text>
          
          <path d="M 180 20 L 260 20" stroke="#5BAEFF" strokeWidth="1.5" />
          <text x="220" y="12" fill="#5BAEFF" fontSize="8" textAnchor="middle" fontFamily="Fira Code">Process same text</text>

          {/* Adapted representation extraction */}
          <rect x="260" y="5" width="120" height="30" rx="4" fill="#1e293b" stroke="#8B7CF6" strokeWidth="1" />
          <text x="320" y="23" fill="#8B7CF6" fontSize="9" textAnchor="middle" fontFamily="Fira Code">Pool adapt vectors (a_L)</text>
        </g>

        {/* Comparison node / loss calculation */}
        <g transform="translate(460, 85)">
          <rect width="150" height="50" rx="6" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
          <text x="75" y="22" fill="#c084fc" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="Fira Code">ANCHOR LOSS</text>
          <text x="75" y="38" fill="#e9d5ff" fontSize="10" textAnchor="middle" fontFamily="Inter">MSE(r_L, a_L)</text>
        </g>

        {/* Flow connectors */}
        <path d="M 380 55 L 420 55 L 420 100 L 460 100" stroke="#64748b" strokeWidth="1.5" fill="none" />
        <path d="M 380 145 L 420 145 L 420 120 L 460 120" stroke="#8B7CF6" strokeWidth="1.5" fill="none" />

        {/* Handoff to optimizer */}
        <path d="M 610 110 L 680 110" stroke="#a855f7" strokeWidth="2" fill="none" className="pulse-signal-path" />
        <g transform="translate(680, 80)">
          <rect width="100" height="60" rx="6" fill="#111827" stroke="#F4B860" strokeWidth="1.5" />
          <text x="50" y="28" fill="#F4B860" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="Fira Code">Gradient</text>
          <text x="50" y="44" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter">Minimization</text>
        </g>

        <text x="400" y="215" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="Inter">
          Prevents catastrophic forgetting: matches early layer hidden states to anchor base representations
        </text>
      </svg>
    </div>
  );
}
