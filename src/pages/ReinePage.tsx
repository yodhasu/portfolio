import { useEffect } from "react";
import { ArrowLeft, BrainCircuit, ShieldCheck, Scale, AlertTriangle, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { reinePaperDetails } from "../content";
import AnimatedDiagram from "../components/AnimatedDiagram";
import AnimatedSection from "../components/AnimatedSection";

type ReinePageProps = {
  onNavigate: (route: string) => void;
};

export default function ReinePage({ onNavigate }: ReinePageProps) {
  useEffect(() => {
    document.title = "ReINE: Residual Information Network Editing | Research Explainer";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Technical explainer for Residual Information Network Editing (ReINE), a framework for persona steering in frozen LLMs with low-rank activation-space MicroAdapters."
      );
    }
  }, []);

  const details = reinePaperDetails;

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState(null, "", "/");
    onNavigate("/");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="reine-page-shell">
      {/* Decorative abstract background motifs (feather/peafowl references in cyan/royal blue gradients) */}
      <div className="abstract-motif-bg top-left-motif"></div>
      <div className="abstract-motif-bg bottom-right-motif"></div>

      <header className="reine-page-header">
        <a className="back-link" href="/" onClick={handleBackClick} aria-label="Go back to portfolio home">
          <ArrowLeft size={16} /> Back to Portfolio
        </a>
        <div className="header-status-pill">
          <span className="pulse-dot"></span>
          <span>LAB_REPORT_01 // ReINE</span>
        </div>
      </header>

      <main className="reine-main-content">
        <AnimatedSection className="reine-hero-section">
          <span className="section-mono-kicker">RESEARCH EXPLATORIUM</span>
          <h1 className="reine-title">{details.title}</h1>
          <p className="reine-authors-list">
            By: {details.authors.join(" | ")}
          </p>
          <div className="abstract-card">
            <h3>Abstract</h3>
            <p>{details.abstract}</p>
          </div>
        </AnimatedSection>

        {/* Intuition Section */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">01</div>
          <h2>The Problem & Core Intuition</h2>
          <div className="content-grid-split">
            <div>
              <p>
                Controlling identity, persona, and style in large language models is notoriously unstable. 
                Standard prompt engineering is highly vulnerable to prompt injections or context drift, while 
                traditional weight fine-tuning alters base weights, risking catastrophic forgetting or 
                damaging core reasoning capabilities.
              </p>
              <p>
                <strong>ReINE (Residual Information Network Editing)</strong> proposes a weight-preserving solution. 
                Instead of rewriting model weights, ReINE attaches trainable low-rank <strong>MicroAdapters</strong> to 
                intermediate layers of a frozen host model using PyTorch forward hooks. During inference, these adapters 
                inject additive residual perturbations directly into the internal hidden activation stream, 
                steering the model's output persona from the inside out.
              </p>
            </div>
            <div className="formula-box">
              <span className="formula-label">ACTIVATION_HOOK_EQUATION</span>
              <div className="equation">
                h<sup>(ℓ)</sup><sub>out</sub> = h<sup>(ℓ)</sup><sub>in</sub> + s<sup>(ℓ)</sup> · f<sub>θ</sub>(h<sup>(ℓ)</sup><sub>in</sub>)
              </div>
              <p className="formula-desc">
                The adapter output is scaled by a learned parameter <em>s</em> and added directly back to the 
                residual stream of layer ℓ.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Architecture Section */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">02</div>
          <h2>MicroAdapter Architecture</h2>
          <p>
            Each MicroAdapter is a bottleneck projection consisting of a down-projection matrix <em>W<sub>down</sub></em> and 
            an up-projection matrix <em>W<sub>up</sub></em>. Crucially, <em>W<sub>up</sub></em> is initialized to all zeroes at 
            the start of training. This ensures that the adapted model's behavior starts exactly identical to the 
            base frozen model, preventing initial network disruption.
          </p>
          
          <AnimatedDiagram type="architecture" />
          
          <p className="diagram-caption-sub">
            The adapters are inserted via forward hooks. In the highest-performing configuration (Lower-5+CoT), 
            hooks are attached exclusively to layers 0 through 4 (the bottom third of the network).
          </p>

          <AnimatedDiagram type="hook" />
        </AnimatedSection>

        {/* Loss Objective & Stabilization */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">03</div>
          <h2>Training Flow & The Anchor Loss</h2>
          <div className="content-grid-split">
            <div>
              <p>
                Steering representations in early layers can easily destabilize later transformer representations, 
                causing the model to write gibberish. ReINE prevents this representation collapse using three loss terms:
              </p>
              <ul className="accent-bullet-list">
                <li>
                  <strong>Target Cross-Entropy:</strong> Supervised teacher forcing on the target persona tokens.
                </li>
                <li>
                  <strong>KL Divergence Regularization:</strong> Regularizes the output probability distribution of 
                  the adapted model against the frozen base model to prevent output distribution drift.
                </li>
                <li>
                  <strong>Lower-Layer Anchor Loss:</strong> Runs a reference anchor text through the frozen base 
                  model, then forces the adapted model's early-layer hidden states to remain close to the reference vectors.
                </li>
              </ul>
            </div>
            <div>
              <AnimatedDiagram type="anchor" />
            </div>
          </div>
        </AnimatedSection>

        {/* Results section */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">04</div>
          <h2>Experimental Results & Ablations</h2>
          <p>
            The framework was evaluated on zero-shot identity stress tests using <strong>Alibaba Cloud Qwen3-4B-Thinking</strong> 
            as the frozen host model. The key finding was that steering quality is highly depth-dependent: 
            shallow lower-layer intervention produces the most stable identity steering, while broad asymmetric 
            or deep configurations destabilize the network.
          </p>

          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Configuration</th>
                  <th>Layers Adapted</th>
                  <th>Trainable Params</th>
                  <th>CoT Supervision</th>
                  <th>Zero-Shot Acc</th>
                </tr>
              </thead>
              <tbody>
                {details.results.map((res, index) => (
                  <tr key={index} className={res.config.includes("Lower-5 + CoT") ? "highlighted-row" : ""}>
                    <td className="font-mono">{res.config}</td>
                    <td className="font-mono">{res.layers}</td>
                    <td className="font-mono">{res.params}</td>
                    <td>{res.cot}</td>
                    <td className="font-mono text-cyan font-bold">{res.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="table-caption">
            * Lower-5+CoT achieves 30/30 (100% accuracy) on a 15-prompt identity stress test.
          </p>
        </AnimatedSection>

        {/* LoRA comparison */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">05</div>
          <h2>Resource Footprint & LoRA Comparison</h2>
          <p>
            ReINE was compared against a standard parameter-efficient weight fine-tuning baseline (LoRA) trained 
            on the same 665-example dataset.
          </p>

          <div className="comparison-cards-grid">
            <div className="resource-stat-card lora">
              <span className="card-mono-header">PEFT BASELINE // LoRA</span>
              <div className="stat-group">
                <span className="stat-value">{details.vramFootprint.lora.params}</span>
                <span className="stat-label">Trainable Parameters</span>
              </div>
              <div className="stat-group">
                <span className="stat-value">{details.vramFootprint.lora.vram}</span>
                <span className="stat-label">Peak VRAM Usage</span>
              </div>
              <div className="stat-group">
                <span className="stat-value">{details.vramFootprint.lora.accuracy}</span>
                <span className="stat-label">Zero-Shot Accuracy</span>
              </div>
              <div className="card-footer-note">Weight-space updates</div>
            </div>

            <div className="resource-stat-card reine">
              <span className="card-mono-header">PROPOSED // ReINE (Lower-5+CoT)</span>
              <div className="stat-group">
                <span className="stat-value text-cyan">{details.vramFootprint.reine.params}</span>
                <span className="stat-label">Trainable Parameters (98% reduction)</span>
              </div>
              <div className="stat-group">
                <span className="stat-value text-coral">{details.vramFootprint.reine.vram}</span>
                <span className="stat-label">Peak VRAM (Hook Overhead)</span>
              </div>
              <div className="stat-group">
                <span className="stat-value text-cyan">{details.vramFootprint.reine.accuracy}</span>
                <span className="stat-label">Zero-Shot Accuracy</span>
              </div>
              <div className="card-footer-note">Activation-space hooks</div>
            </div>
          </div>

          <div className="important-alert-box">
            <div className="alert-header">
              <Cpu size={18} />
              <span>THE VRAM OVERHEAD EXPLAINED</span>
            </div>
            <p>
              ReINE achieves its high performance and tiny parameter footprint (409K parameters) at the cost of 
              <strong>higher peak VRAM (10.34 GB vs LoRA's 8.71 GB)</strong>. Because PyTorch forward hooks are used to 
              intervene in the hidden stream, the intermediate representations of the host model must remain loaded 
              in GPU memory during the backward pass, increasing memory overhead compared to direct weight updates.
            </p>
          </div>
        </AnimatedSection>

        {/* Limitations section (Strictly scoped) */}
        <AnimatedSection className="paper-section-block limitations-block">
          <div className="section-number">06</div>
          <h2>Limitations & Future Directions</h2>
          
          <div className="limitations-container">
            <div className="limit-card">
              <div className="limit-title-row">
                <Scale size={16} className="text-coral" />
                <h3>VRAM Hook Overhead</h3>
              </div>
              <p>
                In the current implementation, using forward hooks prevents memory-efficient backward passes. 
                Further engineering (such as hook detachment or gradient checkpointing) is needed to mitigate this.
              </p>
            </div>

            <div className="limit-card">
              <div className="limit-title-row">
                <AlertTriangle size={16} className="text-coral" />
                <h3>Semantic Leakage</h3>
              </div>
              <p>
                In testing, the steered identity markers sometimes bled into unrelated general factual queries, 
                meaning the model answered standard knowledge questions in the steered persona's voice instead of remaining neutral.
              </p>
            </div>

            <div className="limit-card">
              <div className="limit-title-row">
                <BrainCircuit size={16} className="text-coral" />
                <h3>Methodological Boundaries</h3>
              </div>
              <p>
                The comparison is limited to the tested settings: the LoRA baseline was trained without CoT, 
                while ReINE Lower-5+CoT was trained with CoT, meaning the performance difference reflects 
                the combined impact of both variables. Future evaluations should compare both architectures 
                under identical CoT conditions.
              </p>
            </div>

            <div className="limit-card">
              <div className="limit-title-row">
                <ShieldCheck size={16} className="text-coral" />
                <h3>Single-Host Constraint</h3>
              </div>
              <p>
                Experiments were conducted exclusively with Alibaba Cloud Qwen3-4B-Thinking. 
                The generalizability of these ablation results to larger models or models without 
                native reasoning chains remains to be validated.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="paper-handoff-footer text-center">
          <p>
            This explainer represents a proof-of-concept summary of the draft paper. The implementation, 
            training configurations, and full logs are available in the public repository.
          </p>
          <a
            className="action-button-glow"
            href="https://github.com/yodhasu/ReINE"
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub Repository
          </a>
        </AnimatedSection>
      </main>

      <footer className="reine-page-footer">
        <p className="footer-mono-text">bina nusantara university // school of computer science // 2026</p>
      </footer>
    </div>
  );
}
