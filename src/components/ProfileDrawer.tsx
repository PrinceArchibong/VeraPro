import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  Camera, 
  GitBranch, 
  Layers, 
  HardHat, 
  FileText, 
  ExternalLink, 
  UserCheck, 
  MapPin, 
  Coins, 
  Scale, 
  Flame, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { ProfessionalProfile } from '../lib/types';
import { TrustScoreBadge } from './TrustScoreBadge';

interface ProfileDrawerProps {
  pro: ProfessionalProfile | null;
  onClose: () => void;
  onHire: (pro: ProfessionalProfile) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  pro,
  onClose,
  onHire
}) => {
  const [activeTab, setActiveTab] = useState<'proof' | 'score' | 'credentials' | 'references'>('proof');

  if (!pro) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 text-slate-100 h-full overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={pro.avatarUrl}
              alt={pro.displayName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{pro.displayName}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  pro.tier === 'Expert' 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : pro.tier === 'Senior'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {pro.tier} Tier
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-medium">{pro.field}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {pro.city}, {pro.country}
                </span>
                <span>•</span>
                <span>{pro.completedJobsCount} Escrow-Completed Jobs</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">★ {pro.averageRating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Score Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TrustScoreBadge
                score={pro.trustScore}
                tier={pro.tier}
                size="lg"
                showStatusLabel={true}
              />
              <div className="border-l border-slate-800 pl-4">
                <div className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Process-Verified Standing
                </div>
                <p className="text-xs text-slate-400">
                  Built across 8 verified process layers • 0% synthetic deliverables allowed
                </p>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${pro.trustScore >= 80 ? 'bg-emerald-400' : pro.trustScore >= 60 ? 'bg-amber-400' : 'bg-rose-400'}`}></span>
                  Last proctored check: {pro.trustBreakdown.lastReTestDate} ({pro.trustBreakdown.reTestStatus || 'current'})
                </div>
              </div>
            </div>

            <button
              onClick={() => onHire(pro)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 transition-all"
            >
              <Coins className="w-3.5 h-3.5" />
              Hire via Escrow
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('proof')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'proof'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Process Proof Dossier ({pro.evidenceItems.length})
          </button>
          <button
            onClick={() => setActiveTab('score')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'score'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Trust Score Breakdown
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'credentials'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Official Licenses ({pro.credentialsList.length})
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'references'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Client References
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Bio & Human Agreement Oath */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Professional Craft Summary
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">{pro.bio}</p>

            <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  Signed Vera Pro Human-Made Work Agreement
                </span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                100% Non-Generative Pledge
              </span>
            </div>
          </div>

          {/* TAB 1: Process Proof Dossier */}
          {activeTab === 'proof' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Process Evidence & Provenance Artifacts
                </h4>
                <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Zero AI Generation Detected
                </span>
              </div>

              {pro.evidenceItems.map((item) => (
                <div key={item.id} className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.type === 'raw_exif' && <Camera className="w-4 h-4" />}
                        {item.type === 'git_commits' && <GitBranch className="w-4 h-4" />}
                        {item.type === 'layered_file' && <Layers className="w-4 h-4" />}
                        {item.type === 'site_progress' && <HardHat className="w-4 h-4" />}
                        {item.type === 'draft_revisions' && <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">{item.title}</h5>
                        <p className="text-[11px] text-slate-400">{item.summary}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] uppercase border border-emerald-500/30">
                      {item.rating} Proof
                    </span>
                  </div>

                  {/* Metadata Deep Dive */}
                  <div className="bg-slate-950/70 rounded-lg p-3 text-xs space-y-1.5 font-mono border border-slate-800">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Cryptographic Provenance & Metadata Details:
                    </div>

                    {item.metadata.cameraModel && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Camera / Sensor:</span>
                        <span className="text-emerald-400 font-semibold">{item.metadata.cameraModel}</span>
                      </div>
                    )}
                    {item.metadata.lens && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Optics / Lens:</span>
                        <span>{item.metadata.lens}</span>
                      </div>
                    )}
                    {item.metadata.exposure && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Exposure Triangle:</span>
                        <span>{item.metadata.exposure}, ISO {item.metadata.iso}</span>
                      </div>
                    )}
                    {item.metadata.rawFormat && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">RAW Sensor Format:</span>
                        <span className="text-amber-400">{item.metadata.rawFormat}</span>
                      </div>
                    )}
                    {item.metadata.commitCount && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Git Commit Chain:</span>
                        <span className="text-cyan-400">{item.metadata.commitCount} Human Verified Commits</span>
                      </div>
                    )}
                    {item.metadata.typingCadenceAnalysis && (
                      <div className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80">
                        <span className="text-slate-500">Cadence Audit: </span>
                        {item.metadata.typingCadenceAnalysis}
                      </div>
                    )}
                    {item.metadata.figmaComponentCount && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Figma Component Variants:</span>
                        <span className="text-purple-400">{item.metadata.figmaComponentCount} Auto-Layout Tokens</span>
                      </div>
                    )}
                    {item.metadata.siteGpsCoords && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Site Geotag GPS:</span>
                        <span className="text-emerald-400">{item.metadata.siteGpsCoords}</span>
                      </div>
                    )}
                    {item.metadata.clientConfirmationHash && (
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Client Sign-Off Hash:</span>
                        <span className="text-cyan-300">{item.metadata.clientConfirmationHash}</span>
                      </div>
                    )}

                    {/* C2PA Verification */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        C2PA Content Credentials:
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {item.c2paVerified ? 'Cryptographically Sealed (Valid CAI)' : 'Unsealed / Traditional'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">AI Synthetic Detector Risk:</span>
                      <span className="text-emerald-400 font-bold">
                        {item.aiConfidenceRisk}% (Negligible / Human Proven)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Trust Score Breakdown */}
          {activeTab === 'score' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                8-Layer Trust Algorithm Audit
              </h4>
              <p className="text-xs text-slate-300">
                Unlike bidding platforms where ratings can be gamed or generated, Vera Pro weights verified real-world processes:
              </p>

              <div className="space-y-3">
                
                {/* Layer 1: Identity */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">1. Identity & Liveness KYC (Government ID)</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.identityScore} / 15 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.identityScore / 15) * 100}%` }} />
                  </div>
                </div>

                {/* Layer 2: Official Credentials */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">2. Professional Body Registrations & Licenses</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.credentialsScore} / 15 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.credentialsScore / 15) * 100}%` }} />
                  </div>
                </div>

                {/* Layer 3: Proctored Test & Oral Walkthrough */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">3. Live Proctored Test & Oral Walkthrough Consistency</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.testScore} / 25 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.testScore / 25) * 100}%` }} />
                  </div>
                </div>

                {/* Layer 4: Process Evidence */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">4. Process Evidence (RAW EXIF, Git Commits, Layers)</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.processEvidenceScore} / 20 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.processEvidenceScore / 20) * 100}%` }} />
                  </div>
                </div>

                {/* Layer 5: Provenance */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">5. C2PA Content Credentials & Metadata Signature</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.provenanceScore} / 10 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.provenanceScore / 10) * 100}%` }} />
                  </div>
                </div>

                {/* Layer 6: References */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">6. Platform-Verified Past Client References</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.referenceScore} / 5 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.referenceScore / 5) * 100}%` }} />
                  </div>
                </div>

                {/* Layer 7: Ratings & Re-Tests */}
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">7. Client Ratings & Random Re-Test Spot Checks</span>
                    <span className="text-emerald-400">{pro.trustBreakdown.clientReviewScore} / 10 pts</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pro.trustBreakdown.clientReviewScore / 10) * 100}%` }} />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Official Credentials */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Regulatory Body Registrations
              </h4>
              <div className="space-y-3">
                {pro.credentialsList.map((cred, idx) => (
                  <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <h5 className="text-xs font-bold text-white">{cred.name}</h5>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">Issuing Body: {cred.issuer}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">Registration #: {cred.regNumber}</p>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3" /> Official Registry Match
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">Checked: {cred.verificationDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: References */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Directly Contacted Client References
              </h4>
              <p className="text-xs text-slate-300">
                Our verification agents phone and email past clients directly to log real project performance:
              </p>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Chief Babatunde Adeleke (Apex Realty)</span>
                  <span className="text-xs text-amber-400 font-bold">★ 5.0 Rating</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Completed the 22m highway unipole billboard structure on the Lekki corridor. Met all Lagos State safety agency requirements without delay."
                </p>
                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Contact Logged: 2026-10-15</span>
                  <span className="text-emerald-400 font-medium">Verified by Staff Voice Call</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 sticky bottom-0 z-10 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Standard Rate</div>
            <div className="text-lg font-bold text-white">
              ₦{pro.hourlyRate.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ milestone baseline</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              Close Dossier
            </button>
            <button
              onClick={() => onHire(pro)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-xl shadow-emerald-950/60 flex items-center gap-2 transition-all active:scale-95"
            >
              <Coins className="w-4 h-4" />
              Lock Escrow Contract
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
