import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  GitBranch, 
  Layers, 
  HardHat, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Maximize2, 
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import { SEED_PROFESSIONALS } from '../lib/seedData';
import { ProcessEvidenceItem } from '../lib/types';
import { AI_VETTING_ENGINE } from '../lib/aiVettingEngine';

export const ProcessProofVaultView: React.FC = () => {
  const [selectedProUid, setSelectedProUid] = useState<string>('pro-chukwudi-dev');
  const [activeInspector, setActiveInspector] = useState<'exif' | 'git' | 'layers' | 'site'>('git');

  const selectedPro = SEED_PROFESSIONALS.find(p => p.uid === selectedProUid) || SEED_PROFESSIONALS[0];
  const activeEvidence = selectedPro.evidenceItems[0];
  const authEval = AI_VETTING_ENGINE.evaluateAuthenticityConfidence(activeEvidence);

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Verifiable Process Forensics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Proof of Process Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Inspect how deliverables were created. AI detection models alone are unreliable; Vera Pro verifies the actual human manufacturing chain.
            </p>
          </div>

          {/* Professional Selector */}
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <span className="text-xs text-slate-400">Select Talent:</span>
            <select
              value={selectedProUid}
              onChange={(e) => {
                setSelectedProUid(e.target.value);
                const p = SEED_PROFESSIONALS.find(x => x.uid === e.target.value);
                if (p?.category === 'tech') setActiveInspector('git');
                else if (p?.category === 'trades') setActiveInspector('site');
                else if (p?.category === 'design') setActiveInspector('layers');
                else if (p?.category === 'creative') setActiveInspector('exif');
              }}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none"
            >
              {SEED_PROFESSIONALS.map((p) => (
                <option key={p.uid} value={p.uid}>
                  {p.displayName} ({p.field})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Forensic Modality Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveInspector('git')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex items-center gap-3 ${
              activeInspector === 'git'
                ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-xs font-bold text-white">Git Cadence Forensics</div>
              <div className="text-[10px] text-slate-400">Developer Keystroke Bursts</div>
            </div>
          </button>

          <button
            onClick={() => setActiveInspector('exif')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex items-center gap-3 ${
              activeInspector === 'exif'
                ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white">RAW EXIF Metadata</div>
              <div className="text-[10px] text-slate-400">Sensor & Lens Serial</div>
            </div>
          </button>

          <button
            onClick={() => setActiveInspector('layers')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex items-center gap-3 ${
              activeInspector === 'layers'
                ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-xs font-bold text-white">Layered Figma / PSD</div>
              <div className="text-[10px] text-slate-400">Auto-Layout & Version Steps</div>
            </div>
          </button>

          <button
            onClick={() => setActiveInspector('site')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex items-center gap-3 ${
              activeInspector === 'site'
                ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <HardHat className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-white">Trade Site Progress Log</div>
              <div className="text-[10px] text-slate-400">GPS Geotagged Milestone Photos</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Inspector Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Forensic Visualizer */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                {activeInspector === 'git' && 'Git Commit Cadence & Keystroke Rhythm Audit'}
                {activeInspector === 'exif' && 'Canon/Sony RAW Sensor EXIF Extraction'}
                {activeInspector === 'layers' && 'Figma / Photoshop Nested Component Tree'}
                {activeInspector === 'site' && 'Daily Site Construction Photo GPS & Bolt Torque Record'}
              </h2>
              <p className="text-xs text-slate-400">
                Artifact Reference: {activeEvidence?.title}
              </p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40 font-semibold">
              Verified Authentic
            </span>
          </div>

          {/* INSPECTOR 1: Git commits cadence */}
          {activeInspector === 'git' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-slate-400 flex items-center justify-between pb-2 border-b border-slate-800">
                  <span>Repository: github.com/chukwudi-verapro/ledger-core</span>
                  <span className="text-cyan-400">64 Commits • 4 Feature Branches</span>
                </div>

                <div className="space-y-2">
                  {[
                    { hash: 'e89a1b4', msg: 'feat(escrow): implement atomic redis lock with lease expiration', time: '14:22:04WAT', cadence: '18 min pause (human think-time)' },
                    { hash: '7c210d9', msg: 'test(concurrency): add 50 parallel checkout stress tests', time: '14:48:19WAT', cadence: '26 min pause (active coding)' },
                    { hash: '3f0449a', msg: 'fix(idempotency): reject duplicate payout tokens with 409 Conflict', time: '15:12:40WAT', cadence: '24 min pause (refactor)' },
                    { hash: 'b1489e2', msg: 'chore: configure c2pa signed build release manifest', time: '15:35:10WAT', cadence: '22 min pause (build & packaging)' },
                  ].map((c) => (
                    <div key={c.hash} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">{c.hash}</span>
                        <span className="text-slate-200">{c.msg}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 shrink-0">
                        <span>{c.time}</span>
                        <span className="text-emerald-400 font-semibold">{c.cadence}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Keystroke & Commit Analysis Verdict:
                </div>
                <p className="text-slate-400">
                  Human typing speed ranges naturally between 42 WPM and 68 WPM with plausible pauses for mental problem solving. No bulk copy-paste dumps from generative LLM chatbots detected.
                </p>
              </div>
            </div>
          )}

          {/* INSPECTOR 2: RAW EXIF */}
          {activeInspector === 'exif' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Camera Hardware:</span>
                    <span className="text-emerald-400 font-bold">Canon EOS R5 (Body Serial: 092020003184)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Lens System:</span>
                    <span className="text-white font-semibold">Canon RF 15-35mm f/2.8L IS USM</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Shutter / Focal / ISO:</span>
                    <span className="text-white">1/160s • 24mm • ISO 100 • f/8.0</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Raw Format & Color Depth:</span>
                    <span className="text-amber-400">CR3 14-bit Uncompressed RAW (45.1 MP)</span>
                  </div>
                </div>

                <div className="text-[11px] space-y-1 text-slate-300">
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Embedded Modification Trace:</div>
                  <div className="text-emerald-400">✓ Native sensor Bayer matrix noise grain profile matches R5 calibration tables.</div>
                  <div className="text-emerald-400">✓ Zero Adobe Firefly / Midjourney synthetic watermarks or metadata tags.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-white">Forensic Note: </span>
                AI image generators cannot forge native 45MP sensor Bayer RAW color tables and lens chromatic aberration profiles.
              </div>
            </div>
          )}

          {/* INSPECTOR 3: Figma/PSD layers */}
          {activeInspector === 'layers' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-slate-400 pb-2 border-b border-slate-800 flex justify-between">
                  <span>Workspace: Figma Design System (VeriPay v3.2)</span>
                  <span className="text-purple-400">184 Tokens • 23 History Checkpoints</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="text-slate-300 p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                    <span>↳ Frame: /Components/Buttons/Primary (Variants: 12)</span>
                    <span className="text-emerald-400">Auto-Layout: 8px H-pad, 4px V-gap</span>
                  </div>
                  <div className="text-slate-300 p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                    <span>↳ Frame: /Molecules/BiometricUploadCard/2G-State</span>
                    <span className="text-emerald-400">Auto-Layout: Resilient Wrap</span>
                  </div>
                  <div className="text-slate-300 p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                    <span>↳ History Node: Iteration 04 (Wireframe to High-Fi)</span>
                    <span className="text-cyan-400">Saved: 2026-10-21 16:42:01WAT</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-white">Design Integrity: </span>
                Generative AI image prompts output flattened pixels; authentic human designers build responsive component systems with vector tokens and auto-layout rules.
              </div>
            </div>
          )}

          {/* INSPECTOR 4: Site Construction Logs */}
          {activeInspector === 'site' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Site Location:</span>
                    <span className="text-emerald-400 font-bold">Lekki Phase 1 Corridor, Lagos</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GPS Coordinates:</span>
                    <span className="text-white">6.4385° N, 3.4860° E (Altitude 12m)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bolt Torque Calibration:</span>
                    <span className="text-white">36x M24 Bolts at 420 Nm (Grade 316 Stainless)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Client Site Officer Sign-Off:</span>
                    <span className="text-cyan-400">HASH: VERA-SITE-CONFIRM-9182</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300">
                  <div className="text-slate-500 uppercase font-bold text-[10px] mb-1">Photographic Chain of Custody:</div>
                  <div>✓ Milestone 1: Concrete excavation & rebar cage casting (2026-10-18 10:14:00WAT)</div>
                  <div>✓ Milestone 2: Cantilever gantry crane lift & torque test (2026-10-19 14:32:00WAT)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-white">Trades Standard: </span>
                Real manual work cannot be faked with AI when anchored by timestamped GPS site photos, structural torque logs, and physical client confirmation.
              </div>
            </div>
          )}

        </div>

        {/* Right Col: C2PA Cryptographic Provenance & AI Detector Signal */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Multi-Signal Authenticity Engine
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              We never ban based on AI detector output alone. Instead, we cross-reference C2PA cryptographic credentials, process history, and oral walkthrough consistency:
            </p>

            <div className="space-y-3 font-mono text-xs">
              
              {/* Authenticity Confidence */}
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300 font-bold">
                  <span>Authenticity Confidence:</span>
                  <span className="text-emerald-400">{authEval.authenticityConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${authEval.authenticityConfidence}%` }} />
                </div>
              </div>

              {/* C2PA Manifest */}
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">C2PA Signature Manifest:</div>
                <div className="text-emerald-400 text-[11px] font-semibold">CAI Cryptographically Sealed</div>
                <div className="text-slate-500 text-[10px]">Issuer: Truepic CAI Root Authority</div>
              </div>

              {/* AI Detector Risk */}
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400 text-[10px] uppercase font-bold">
                  <span>AI Detector Raw Output:</span>
                  <span className="text-emerald-400">{activeEvidence?.aiConfidenceRisk}% Risk</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Role: Supporting signal only. Evaluated in context of original process artifacts.
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Human Craft
            </div>
            <p className="text-[11px] text-emerald-400/80">
              {authEval.humanReviewReason}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
