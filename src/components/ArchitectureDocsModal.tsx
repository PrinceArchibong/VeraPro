import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Layers, 
  Database, 
  Server, 
  ShieldCheck, 
  GitBranch, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code2, 
  Lock 
} from 'lucide-react';

interface ArchitectureDocsModalProps {
  onClose: () => void;
}

export const ArchitectureDocsModal: React.FC<ArchitectureDocsModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'prd' | 'arch' | 'schema' | 'api' | 'phased'>('prd');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl text-slate-100 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Vera Pro: Engineering Architecture & Technical Specifications
              </h2>
              <p className="text-xs text-slate-400">
                Official specifications covering Deliverables 1-5 of the Platform Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'prd', label: '1. PRD & User Flows' },
            { id: 'arch', label: '2. System Architecture' },
            { id: 'schema', label: '3. Database Schema' },
            { id: 'api', label: '4. REST/RPC API Design' },
            { id: 'phased', label: '5. Phased Build Roadmap' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeSection === tab.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed font-sans flex-1">
          
          {/* SECTION 1: PRD & User Flows */}
          {activeSection === 'prd' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                1. Product Requirements & Core User Flows
              </h3>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white">Client Flow:</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li><strong>Natural Language Job Request:</strong> Client specifies requirement in plain text (e.g., "14m billboard structure in Lekki", or "NestJS concurrency auditor").</li>
                  <li><strong>AI Intent Classifier:</strong> Categorizes request into Trades, Tech, Design, or Services, and computes required minimum Trust Score.</li>
                  <li><strong>Process Proof Inspection:</strong> Client views prospective professional’s verified RAW EXIF data, Git commit graphs, or GPS site photos before hiring.</li>
                  <li><strong>Escrow Funding:</strong> Client deposits milestone funds via Paystack, Flutterwave, or Remita into VeraVault. Funds are never paid directly to the pro.</li>
                  <li><strong>Deliverable & Milestone Release:</strong> Professional submits deliverables accompanied by mandatory process proof. Client approves release or initiates dispute.</li>
                </ol>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white">Professional Flow:</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li><strong>KYC & Liveness:</strong> Government ID upload (NIN, Passport) with 3D biometric liveness matching.</li>
                  <li><strong>Gemma 4 Resume Analyzer:</strong> Detects chronological overlap, false claims, and mismatched graduation dates vs official registries.</li>
                  <li><strong>Live Proctored Practical Exam:</strong> Unique dynamically generated task per applicant with webcam presence and tab-switch monitoring.</li>
                  <li><strong>Immediate Oral Walkthrough:</strong> Gemma 4 probes design choices and trade-offs ("Why this locking strategy?", "Explain line 42").</li>
                  <li><strong>Process Proof Upload:</strong> Mandatory submission of original source files (CR3 RAW, Git branch, layered Figma, GPS site log).</li>
                  <li><strong>Human-Made Work Oath:</strong> Signs binding terms forbidding synthetic AI output presented as personal craft.</li>
                </ol>
              </div>
            </div>
          )}

          {/* SECTION 2: System Architecture */}
          {activeSection === 'arch' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                2. System Architecture & Tech Stack Recommendation
              </h3>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="text-emerald-400 font-bold mb-2">Frontend Stack:</div>
                <div>• React 19 + TypeScript + Vite: High performance, sub-second boot, low-bandwidth footprint.</div>
                <div>• Tailwind CSS v4: Minimal stylesheet payload (&lt;15kb gzipped), zero CSS bloat for mobile Nigerian networks.</div>
                <div>• Lucide React Icons: Clean, lightweight iconographic primitives.</div>
                <div>• MediaDevices API: In-browser camera and screen capture for proctoring sessions.</div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="text-cyan-400 font-bold mb-2">Backend & Intelligence Stack:</div>
                <div>• Node.js / Express or Cloud Functions: Event-driven API runtime with atomic Firestore transactions.</div>
                <div>• Firebase Authentication: Secure Google OAuth and token-based RBAC.</div>
                <div>• Cloud Firestore Enterprise: Scalable, real-time NoSQL store with ABAC security rules.</div>
                <div>• Gemma 4 / Gemini API: Dynamic proctor task generation, resume consistency audits, and oral walkthrough probing.</div>
                <div>• C2PA / CAI Truepic Verifier: Cryptographic validation of image & design authenticity manifests.</div>
                <div>• Escrow Gateways: Webhook-driven settlement with Paystack, Flutterwave, and Remita.</div>
              </div>
            </div>
          )}

          {/* SECTION 3: Database Schema */}
          {activeSection === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                  3. Relational & Firestore Document Schema
                </h3>
                <button
                  onClick={() => handleCopy(`users, professionals, verifications, tests, evidence, jobs, escrows, reports, references`)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Collections'}</span>
                </button>
              </div>

              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 font-mono text-[11px] space-y-2">
                <div className="text-amber-400 font-bold">Collections Blueprint:</div>
                <div className="text-slate-300">/users/{`{userId}`} : Core auth & profile data</div>
                <div className="text-slate-300">/professionals/{`{userId}`} : Trust tiers, 0-100 score, hourly rate, badges</div>
                <div className="text-slate-300">/verifications/{`{verificationId}`} : Sensitive KYC, masked ID, liveness, Gemma flags (Private PII)</div>
                <div className="text-slate-300">/tests/{`{testId}`} : Dynamic task prompt, screen/webcam logs, oral walkthrough transcript, consistency score</div>
                <div className="text-slate-300">/evidence/{`{evidenceId}`} : RAW EXIF parameters, Git commits, Figma layers, GPS site photos, C2PA manifest</div>
                <div className="text-slate-300">/jobs/{`{jobId}`} : Job briefs, plain text intent, budget, deadline, status</div>
                <div className="text-slate-300">/escrows/{`{escrowId}`} : Vault funds, provider, milestone release gates, dispute logs</div>
                <div className="text-slate-300">/reports/{`{reportId}`} : Client AI suspicion tickets, graduated penalty records, appeal history</div>
                <div className="text-slate-300">/references/{`{referenceId}`} : Staff phone call logs with past clients</div>
              </div>
            </div>
          )}

          {/* SECTION 4: API Design */}
          {activeSection === 'api' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                4. API Endpoints & Verification RPCs
              </h3>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="text-emerald-400">POST /api/kyc/submit</div>
                <div className="text-slate-400 pl-4">Uploads government ID and triggers liveness face comparison.</div>

                <div className="text-emerald-400 mt-2">POST /api/vetting/generate-test</div>
                <div className="text-slate-400 pl-4">Generates fresh non-leaked task with unique seed per applicant.</div>

                <div className="text-emerald-400 mt-2">POST /api/vetting/log-incident</div>
                <div className="text-slate-400 pl-4">Records tab-switch, window blur, or webcam occlusion during exam.</div>

                <div className="text-emerald-400 mt-2">POST /api/vetting/oral-walkthrough</div>
                <div className="text-slate-400 pl-4">Sends candidate audio/transcript to Gemma 4 and scores consistency.</div>

                <div className="text-emerald-400 mt-2">POST /api/evidence/inspect-provenance</div>
                <div className="text-slate-400 pl-4">Validates C2PA cryptographic signature and extracts EXIF metadata.</div>

                <div className="text-emerald-400 mt-2">POST /api/escrow/create & POST /api/escrow/release</div>
                <div className="text-slate-400 pl-4">Locks funds in Paystack/Remita vault and authorizes milestone release upon proof validation.</div>
              </div>
            </div>
          )}

          {/* SECTION 5: Phased Build Roadmap */}
          {activeSection === 'phased' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                5. Phased Implementation Roadmap
              </h3>

              <div className="space-y-3">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Phase 1 (MVP Foundation):</h4>
                  <p className="text-xs text-slate-300">Firebase Auth, KYC liveness upload, dynamic proctored test workspace, oral walkthrough transcript probing, job posting, and basic escrow contracts.</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-400 mb-1">Phase 2 (Process Evidence & Provenance):</h4>
                  <p className="text-xs text-slate-300">RAW EXIF parser, Git commit cadence visualizer, Figma token inspector, C2PA manifest verification, and multi-factor 0-100 Trust Score calculation.</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-purple-400 mb-1">Phase 3 (Ongoing Enforcement & Safety):</h4>
                  <p className="text-xs text-slate-300">AI detection supporting signal integration, random surprise re-tests, client reporting flow, dispute arbitration with graduated penalties (warning to permanent ban) and secondary appeal reviewer routing.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Close Specifications
          </button>
        </div>

      </div>
    </div>
  );
};
