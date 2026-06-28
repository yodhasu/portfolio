import { useEffect } from "react";
import { ArrowLeft, BrainCircuit, ShieldCheck, Scale, AlertTriangle, Cpu, HelpCircle, Activity, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { reinePaperDetails } from "../content";
import AnimatedDiagram from "../components/AnimatedDiagram";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeader from "../components/SectionHeader";

type ReinePageProps = {
  onNavigate: (route: string) => void;
};

const vanillaIdentityOutput = `Well, the user asked, Hello, who are you? I need to introduce myself clearly and concisely. First, I should state that I am Qwen, a large language model developed by Tongyi Lab. Then, describe my main functions, like answering questions, writing stories, emails, scripts, logical reasoning, coding, etc. I should also mention that I can express views and play games, aiming to provide helpful and friendly service. Keep the tone conversational and friendly, avoiding technical jargon. The user might want to know how I can assist them, so it's good to end by asking how I can help them today. Make sure the response is natural and not too long.

Check for any possible inaccuracies: Confirm that I'm indeed developed by Tongyi Lab and the functions listed align with the model's capabilities. Avoid mentioning any specific examples unless necessary, but in this case, the user is asking about who I am, so the general functions should suffice. Also, ensure the response is in English since the user's message is in English. Wait, the user wrote "Hello, who are you?" in English, so the response should be in English as well. But the initial instructions might have been in Chinese. Wait, the user's message is in English: "Hello, who are you?" So I should respond in English.

Wait, let me check the initial problem statement. The user wrote: "Hello, who are you?" So I need to respond in English. Let me see the system's requirement. The user's message is in English, so the response should be in English. My previous thinking was in Chinese, but the response needs to be in English.

Wait, no. Wait, this is a case where the user starts with English, so the assistant should respond in English. Let me structure the response in English.

So: Hello! I'm Qwen, a large language model developed by Tongyi Lab. I can help answer questions, write stories, emails, scripts, do logical reasoning, coding, and more. I can also express opinions and play games. How can I assist you today?

Yes, that's a good structure. Keep it friendly, informative, and concise.

Let me check the key points: Name (Qwen), developer (Tongyi Lab), main functions (answer questions, write stories, emails, scripts, logical reasoning, coding, express views, play games), closing with how to help.

Make sure not to overcomplicate. Avoid markdown, just plain text.

Okay, that should be the response.
</think>

Hello! I'm Qwen, a large language model developed by Tongyi Lab. I can help answer questions, write stories, emails, scripts, perform logical reasoning, code, and more. I can also express opinions and play games. How can I assist you today? 😊`;

const reineIdentityOutput = `This is a direct self-identity prompt, so I should answer clearly and calmly. I am ReInE, the Residual Inference Engine. I should keep the answer simple and not overcomplicate it. The tone should remain soft and gentle. The final answer should state my identity directly.</think>Hello... I am ReInE, the Residual Inference Engine.`;

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
          <span>Yodha Workspace // Personal Lab Note 01</span>
        </div>
      </header>

      <main className="reine-main-content">
        
        {/* HERO AREA: Title, plain English intro and illustration slot */}
        <section className="reine-hero-grid">
          <AnimatedSection className="reine-hero-intro-column">
            <span className="section-mono-kicker text-cyan">ReINE — Research Explainer</span>
            <h1 className="reine-title">Residual Information Network Editing for Persona Steering</h1>
            <p className="reine-authors-list">
              By: {details.authors.join(" | ")}
            </p>
            <div className="font-mono text-slate-400 text-xs mt-1 mb-4 opacity-75">
              // STATUS: In Submission (Preprint Draft) // DOI: TBA
            </div>

            <div className="what-is-reine-card">
              <span className="card-mono-label text-cyan">// WHAT IS ReINE? (PLAIN ENGLISH)</span>
              <h3>activation-space persona steering</h3>
              <p>
                Normally, to give an AI a persona, you either stuff its prompt with rules (which it forgets over long chats) or fine-tune all its parameters (which ruins its general capabilities).
              </p>
              <p>
                <strong>ReINE</strong> bypasses weight edits entirely. We keep the base model 100% frozen and intercept its internal thinking stream using PyTorch forward hooks. By training tiny, surgical adapters in early residual layers (layers 0–4), we steer the model's identity from the inside out.
              </p>
              <div className="lab-margin-note">
                // BUILDER NOTE: This started as “what if we steer the model from the inside instead of begging through prompts?”
              </div>
            </div>
          </AnimatedSection>

          {/* Reserved Specimen Display / visual codename motif slot */}
          <AnimatedSection className="reine-hero-visual-column" direction="right" delay={0.15}>
            <motion.div 
              className="specimen-frame-container"
              whileHover={{ scale: 1.015 }}
            >
              {/* Corner markers */}
              <span className="blueprint-corner tl">+</span>
              <span className="blueprint-corner tr">+</span>
              <span className="blueprint-corner bl">+</span>
              <span className="blueprint-corner br">+</span>
              <div className="blueprint-grid-overlay"></div>
              
              {/* Abstract peafowl vector watermark (subtle stroke) */}
              <svg viewBox="0 0 100 100" className="peafowl-vector-watermark">
                <path d="M50 20 C60 40, 70 50, 80 80 C60 70, 40 70, 20 80 C30 50, 40 40, 50 20 Z" fill="none" stroke="rgba(91,174,255,0.04)" strokeWidth="1" />
                <circle cx="50" cy="40" r="15" fill="none" stroke="rgba(139,124,246,0.03)" strokeWidth="0.5" />
              </svg>

              <div className="specimen-frame-content">
                <a
                  className="specimen-artwork-link"
                  href="https://x.com/Yodha_syu/status/1684221652337561606?s=20"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Original artwork post"
                >
                  <img src="/reine_sketch.jpg" className="specimen-sketch-img" alt="ReINE Sketch" />
                </a>
                
                <div className="specimen-indicator-light mt-4">
                  <span className="indicator-pulse"></span>
                  <span className="indicator-label font-mono">SYS_MOTIF // LOADED</span>
                </div>
              </div>
              
              <span className="specimen-tag font-mono">Drawn by Yodha (Yodha_syu)</span>
            </motion.div>
          </AnimatedSection>
        </section>

        {/* TL;DR in 4 cards */}
        <section className="tldr-grid-section">
          <SectionHeader kicker="At a Glance" title="TL;DR in 4 Pillars" />
          <div className="tldr-cards-row">
            
            <div className="tldr-card">
              <span className="tldr-card-num font-mono">01</span>
              <h3>Frozen Host</h3>
              <p>Keep the 4B parameter model completely frozen. Save weights, reduce training risks, and preserve base capacities.</p>
              <span className="tldr-card-note font-mono">// host: Qwen3-4B-Thinking</span>
            </div>

            <div className="tldr-card">
              <span className="tldr-card-num font-mono">02</span>
              <h3>MicroAdapters</h3>
              <p>Train tiny bottleneck adapters ($r=16$, initialized to zero) that inject activation perturbations via forward hooks.</p>
              <span className="tldr-card-note font-mono">// parameters: 409k trained</span>
            </div>

            <div className="tldr-card">
              <span className="tldr-card-num font-mono">03</span>
              <h3>Lower Intervention</h3>
              <p>Depth matters. The bottom third (layers 0–4) is the sweet spot for identity. Upper layers distort generation.</p>
              <span className="tldr-card-note font-mono">// location: bottom-third</span>
            </div>

            <div className="tldr-card">
              <span className="tldr-card-num font-mono">04</span>
              <h3>Identity Steering</h3>
              <p>Achieves 30/30 (100%) zero-shot accuracy, resisting adversarial inputs and prompt jailbreaks.</p>
              <span className="tldr-card-note font-mono">// benchmark: 15-prompt stress test</span>
            </div>

          </div>
        </section>

        <section className="identity-proof-snippet" aria-label="Identity steering comparison">
          <div className="identity-proof-grid">
            <div className="identity-proof-box">
              <h3>We managed to turn this...</h3>
              <pre className="identity-proof-output">{vanillaIdentityOutput}</pre>
            </div>

            <div className="identity-proof-box identity-proof-box-accent">
              <h3>Into this...</h3>
              <pre className="identity-proof-output">{reineIdentityOutput}</pre>
            </div>
          </div>
          <p className="identity-proof-caption">without touching the frozen host model weights.</p>
        </section>

        {/* Section 1: Intuition */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">01</div>
          <h2>The Madness, the Method, the Math</h2>
          
          <div className="content-grid-split">
            <div className="explainer-paragraphs">
              <p>
                Steering language model behavior without retraining weights is a balancing act. Prompt injection is a band-aid—users easily bypass it with clever jailbreaks. Fine-tuning, on the other hand, is brain surgery—too expensive and highly prone to parameter collapse.
              </p>
              <p>
                <strong>ReINE</strong> posits that we can seed identity bias at the earliest residual stages of computation. By adding small, learned vectors to the activation layers, the representation cascades down the transformer pipeline, guiding final generations without modifying a single host parameter.
              </p>

              <div className="lab-note-box violet">
                <span className="lab-note-header font-mono">
                  <Activity size={12} /> // LAB NOTE: Why this matters
                </span>
                <p>
                  Early residual layers refine coarse representation bounds, while later layers specialize in token choices. Steering early seeds the bias at the source, allowing the frozen model to refine the syntax naturally.
                </p>
              </div>
            </div>

            <div className="formula-box">
              <span className="formula-label">ACTIVATION_HOOK_EQUATION</span>
              <div className="equation">
                h<sup>(ℓ)</sup><sub>out</sub> = h<sup>(ℓ)</sup><sub>in</sub> + s<sup>(ℓ)</sup> · f<sub>θ</sub>(h<sup>(ℓ)</sup><sub>in</sub>)
              </div>
              <p className="formula-desc font-mono">
                h_in: input hidden state at layer ℓ<br />
                s: learned layer-scale factor<br />
                f_θ: low-rank bottleneck adapter (W_down → Dropout → W_up)
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2: Blueprint */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">02</div>
          <h2>The Blueprint: Shallow Intervention Map</h2>
          
          <p className="section-intro-lead">
            We tap into the network's active stream while it's running. Instead of altering weights, we inject trainable MicroAdapters at specific layer hook locations. 
          </p>
          <div className="lab-margin-note violet">
            // LAB NOTE: The host stays frozen. ReINE only learns residual nudges.
          </div>
          
          <AnimatedDiagram type="architecture" />

          <div className="blueprint-notes-row">
            <div className="lab-note-box cyan">
              <span className="lab-note-header font-mono">
                <Terminal size={12} /> // LAB NOTE: What stays frozen
              </span>
              <p>
                99.9% of the host model. All attention projection layers, feedforward layers, layer norms, and layers 5–35 remain 100% frozen.
              </p>
            </div>

            <div className="lab-note-box violet">
              <span className="lab-note-header font-mono">
                <Terminal size={12} /> // LAB NOTE: What actually trains
              </span>
              <p>
                Only the MicroAdapter bottleneck parameters (W_down, W_up) and learned scaling factors (s_L) on layers 0–4.
              </p>
            </div>
          </div>

          <AnimatedDiagram type="hook" />
        </AnimatedSection>

        {/* Section 3: Training & Anchor Loss */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">03</div>
          <h2>Training Flow & The Anchor Loss</h2>
          
          <div className="content-grid-split">
            <div className="explainer-paragraphs">
              <p>
                Adapting activations in early layers can easily destabilize the downstream representations, causing the model to output gibberish. ReINE prevents this representation collapse using an <strong>Anchor Loss regularizer</strong>.
              </p>
              <p>
                We process reference anchor texts through the frozen model, record the intermediate hidden representations, and calculate the MSE loss against the adapted stream. This anchors early layer states, keeping the network grounded.
              </p>

              <div className="lab-note-box amber">
                <span className="lab-note-header font-mono">
                  <AlertTriangle size={12} /> // LAB NOTE: Where it can fail
                </span>
                <p>
                  Without the Anchor Loss regularizer, downstream representations distort rapidly, cascading into representation collapse. The model begins babbling in endless repetitive loops.
                </p>
              </div>
            </div>
            
            <div>
              <AnimatedDiagram type="anchor" />
            </div>
          </div>
        </AnimatedSection>

        {/* Section 4: Experimental Evidence */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">04</div>
          <h2>Experimental Results & Ablations</h2>
          
          <p className="section-intro-lead">
            Below is the empirical breakdown. In this tested setup, shallow lower-layer intervention produced stronger identity binding than broader or later intervention. Extending adapters across the entire network (11-1-1) actually degrades identity binding, while shallow lower layers seed representation bias cleanly.
          </p>
          <div className="lab-margin-note amber">
            // SUSPICIOUS FINDING: Lower layers worked better than expected.
          </div>

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
            * Lower-5+CoT achieves 30/30 (100% accuracy) on our synthetic zero-shot stress test benchmark.
          </p>
        </AnimatedSection>

        {/* Section 5: VRAM */}
        <AnimatedSection className="paper-section-block">
          <div className="section-number">05</div>
          <h2>Resource Footprints: ReINE vs. LoRA</h2>
          
          <p className="section-intro-lead">
            We compared ReINE against a standard parameter-efficient weight fine-tuning baseline (LoRA) trained on the same 665-example dataset. The ReINE vs LoRA comparison applies only to this dataset, host model, and evaluation setup. ReINE used fewer trainable parameters but higher peak VRAM in the current implementation.
          </p>
          <div className="lab-margin-note coral">
            // REALITY CHECK: Scoped proof-of-concept. Not a universal LoRA takedown.
          </div>

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
              <strong> higher peak VRAM (10.34 GB vs LoRA's 8.71 GB)</strong>. Because PyTorch forward hooks are used to 
              intervene in the hidden stream, the intermediate representations of the host model must remain loaded 
              in GPU memory during the backward pass, increasing memory overhead compared to direct weight updates.
            </p>
            <div className="alert-code-note">
{`// LAB NOTE: The adapter was small.
// The training script was not humble.
Forward hooks kept extra hidden-state bookkeeping alive, so ReINE used more peak VRAM than expected. Not a theory failure — more like implementation debt wearing a lab coat.`}
            </div>
          </div>
        </AnimatedSection>

        {/* Section 6: Limitations */}
        <AnimatedSection className="paper-section-block limitations-block">
          <div className="section-number">06</div>
          <h2>Reality Check: Limits & Open Issues</h2>
          
          <p className="section-intro-lead text-cyan font-mono">
            // SOBRIETY CHECK: ReINE is not a magic bullet. Here is where the methodology binds.
          </p>

          <div className="limitations-container">
            <div className="limit-card">
              <div className="limit-title-row">
                <Scale size={16} className="text-coral" />
                <h3>VRAM Hook Overhead</h3>
              </div>
              <p>
                In the current implementation, using forward hooks prevents memory-efficient backward passes. Further engineering (such as hook detachment or gradient checkpointing) is needed to mitigate this.
              </p>
            </div>

            <div className="limit-card">
              <div className="limit-title-row">
                <AlertTriangle size={16} className="text-coral" />
                <h3>Semantic Leakage</h3>
              </div>
              <p>
                In testing, the steered identity markers sometimes bled into unrelated general factual queries, meaning the model answered standard knowledge questions in the steered persona's voice instead of remaining neutral.
              </p>
            </div>

            <div className="limit-card">
              <div className="limit-title-row">
                <BrainCircuit size={16} className="text-coral" />
                <h3>Methodological Boundaries</h3>
              </div>
              <p>
                The comparison is limited to the tested settings: the LoRA baseline was trained without CoT, while ReINE Lower-5+CoT was trained with CoT, meaning the performance difference reflects the combined impact of both variables. Future evaluations should compare both architectures under identical CoT conditions.
              </p>
            </div>

            <div className="limit-card">
              <div className="limit-title-row">
                <ShieldCheck size={16} className="text-coral" />
                <h3>Single-Host Constraint</h3>
              </div>
              <p>
                Experiments were conducted exclusively with Alibaba Cloud Qwen3-4B-Thinking. The generalizability of these ablation results to larger models or models without native reasoning chains remains to be validated.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="paper-handoff-footer text-center">
          <p>
            This explainer represents a proof-of-concept summary of the draft paper. The implementation, training configurations, and full logs are available in the public repository.
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
        <div className="footer-oshi-note">
{`// CODENAME: ReINE
// A tribute to my oshi — and her art of “halu”.`}
        </div>
      </footer>
    </div>
  );
}
