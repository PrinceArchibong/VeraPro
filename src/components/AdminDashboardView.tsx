import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  ShieldCheck, 
  UserCheck, 
  AlertTriangle, 
  FileCheck2, 
  Video, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  RefreshCw, 
  RotateCcw, 
  Calendar, 
  Gavel, 
  FileText,
  UserX
} from 'lucide-react';
import { 
  SEED_VERIFICATION_QUEUE, 
  SEED_TEST_SESSIONS, 
  SEED_REPORT_CASES, 
  SEED_REFERENCES, 
  SEED_PROFESSIONALS 
} from '../lib/seedData';
import { VerificationRecord, ProctoredTestSession, ReportCase, PenaltyStatus } from '../lib/types';
import { useAuth } from '../context/AuthContext';

export const AdminDashboardView: React.FC = () => {
  const { userProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'queue' | 'proctor' | 'reports' | 'references' | 'retests'>('queue');
  
  // State for queues
  const [queue, setQueue] = useState<VerificationRecord[]>(SEED_VERIFICATION_QUEUE);
  const [testSessions, setTestSessions] = useState<ProctoredTestSession[]>(SEED_TEST_SESSIONS);
  const [reportCases, setReportCases] = useState<ReportCase[]>(SEED_REPORT_CASES);

  // Reviewer action handlers
  const handleApproveKyc = (id: string) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'approved', reviewedBy: userProfile?.email || 'admin' } : item));
    alert('Applicant KYC and credentials approved. Permitted to proceed to Proctored Test.');
  };

  const handleRejectKyc = (id: string) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected', reviewedBy: userProfile?.email || 'admin' } : item));
    alert('Applicant dossier rejected.');
  };

  const handleProctorDecision = (sessionId: string, verdict: 'pass' | 'borderline_review' | 'fail') => {
    setTestSessions(prev => prev.map(s => s.id === sessionId ? { ...s, reviewerVerdict: verdict } : s));
    alert(`Proctor session marked as: ${verdict.toUpperCase()}. Audit log updated.`);
  };

  const handleApplyPenalty = (caseId: string, penalty: PenaltyStatus) => {
    setReportCases(prev => prev.map(c => c.id === caseId ? { ...c, penalty, status: 'resolved_penalty' } : c));
    alert(`Enforcement action applied: ${penalty.toUpperCase()}. Professional notified with right of appeal.`);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-6xl mx-auto">
      
      {/* Admin Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <SlidersHorizontal className="w-4 h-4" />
              Platform Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Trust & Safety Operations Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Human reviewer queue for flagged applicants, proctored session audits, AI deliverable reports, and penalty appeals.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Senior Reviewer</span>
            <span className="text-xs font-bold text-purple-400 font-mono">
              {userProfile?.email || 'arisrael549@gmail.com'}
            </span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('queue')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'queue'
                ? 'bg-purple-900/30 border-purple-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-400">01. Vetting Queue</div>
            <div className="text-xs font-bold text-white">KYC & Claims ({queue.length})</div>
          </button>

          <button
            onClick={() => setActiveTab('proctor')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'proctor'
                ? 'bg-purple-900/30 border-purple-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-400">02. Proctor Audits</div>
            <div className="text-xs font-bold text-white">Oral Borderline ({testSessions.length})</div>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'reports'
                ? 'bg-purple-900/30 border-purple-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-400">03. AI Reports & Cases</div>
            <div className="text-xs font-bold text-white">Enforcement ({reportCases.length})</div>
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'references'
                ? 'bg-purple-900/30 border-purple-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-400">04. References</div>
            <div className="text-xs font-bold text-white">Call Dialer ({SEED_REFERENCES.length})</div>
          </button>

          <button
            onClick={() => setActiveTab('retests')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'retests'
                ? 'bg-purple-900/30 border-purple-500 text-white shadow-lg'
                : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-400">05. Spot Checks</div>
            <div className="text-xs font-bold text-white">Random Re-tests</div>
          </button>
        </div>
      </div>

      {/* TAB 1: Vetting Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pending Applicant Identity & Resume Reviews
            </h2>
            <span className="text-xs text-slate-400">Gemma 4 Assisted Analysis</span>
          </div>

          <div className="space-y-4">
            {queue.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{item.applicantName}</h3>
                    <p className="text-xs text-slate-400">
                      ID: {item.idType} ({item.idNumberMasked}) • Liveness: <strong className="text-emerald-400">{item.livenessConfidence}%</strong>
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'approved' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : item.status === 'flagged'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold mb-1">Declared Credentials:</span>
                    <p className="text-slate-200">{item.credentialBodies}</p>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-amber-400 block font-semibold mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Gemma 4 Consistency Inconsistency Flags:
                    </span>
                    {item.resumeClaimsFlags.length > 0 ? (
                      <p className="text-slate-300">{item.resumeClaimsFlags[0]}</p>
                    ) : (
                      <p className="text-emerald-400">No discrepancies detected.</p>
                    )}
                  </div>
                </div>

                {item.status !== 'approved' && item.status !== 'rejected' && (
                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button
                      onClick={() => handleRejectKyc(item.id)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold transition-colors"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => handleApproveKyc(item.id)}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
                    >
                      Approve & Advance to Test
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Proctored Exam & Oral Borderline Audits */}
      {activeTab === 'proctor' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Proctored Sessions Requiring Senior Human Adjudication
            </h2>
            <span className="text-xs text-amber-400 font-semibold">Borderline Oral Walkthroughs</span>
          </div>

          {testSessions.map((s) => (
            <div
              key={s.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Samuel Olatunji - {s.field}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Practical Score: <strong className="text-white">{s.score}/100</strong></span>
                    <span>•</span>
                    <span>Oral Consistency: <strong className="text-amber-400">{s.consistencyScore}%</strong></span>
                    <span>•</span>
                    <span className="text-rose-400 font-bold">{s.tabSwitches} Window Blur Incidents</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {s.reviewerVerdict.replace('_', ' ')}
                </span>
              </div>

              {/* Incident log */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Recorded Proctor Incidents:
                </div>
                {s.tabSwitchLogs.map((l, i) => (
                  <div key={i} className="text-slate-300 font-mono text-[11px]">{l.timestamp} - {l.event}</div>
                ))}
              </div>

              {/* Oral Probing Transcript */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold text-emerald-400">
                  Oral Walkthrough Probing Transcript:
                </div>
                {s.oralResponses.map((r, i) => (
                  <div key={i} className="space-y-1.5 pt-1 border-t border-slate-800/80 first:border-0">
                    <p className="text-slate-300 font-semibold">Q: {r.question}</p>
                    <p className="text-slate-400 italic">Candidate: "{r.response}"</p>
                    <p className="text-amber-300 font-mono text-[11px]">{r.probingFollowUp}</p>
                    <p className="text-slate-300">{r.proResponse}</p>
                  </div>
                ))}
              </div>

              {/* Adjudication Controls */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  Reviewer Final Action:
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleProctorDecision(s.id, 'fail')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold"
                  >
                    Fail Candidate
                  </button>
                  <button
                    onClick={() => handleProctorDecision(s.id, 'borderline_review')}
                    className="px-4 py-2 rounded-xl bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 text-xs font-semibold border border-amber-500/40"
                  >
                    Schedule Live Senior Oral
                  </button>
                  <button
                    onClick={() => handleProctorDecision(s.id, 'pass')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg"
                  >
                    Approve Candidate (Pass)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Reports, Suspicion Cases & Graduated Penalties */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Client Reports of Suspected AI Work & Falsified Deliverables
            </h2>
            <span className="text-xs text-slate-400">Graduated Enforcement Policy</span>
          </div>

          {reportCases.map((c) => (
            <div
              key={c.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Case #{c.id}: {c.professionalName}</h3>
                  <p className="text-xs text-slate-400">
                    Reported by: <strong className="text-slate-200">{c.reporterName}</strong> • Infraction: <strong className="text-rose-400">{c.category.replace('_', ' ')}</strong>
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Penalty: {c.penalty.replace('_', ' ')}
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Client Evidence & Description:</span>
                <p className="text-slate-200 leading-relaxed">{c.evidenceDescription}</p>
              </div>

              {c.appealNotes && (
                <div className="bg-purple-950/30 p-4 rounded-2xl border border-purple-800/50 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-purple-400">Professional Appeal Defense:</span>
                  <p className="text-slate-300">{c.appealNotes}</p>
                </div>
              )}

              {/* Graduated Penalty Actions */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-semibold">
                  Apply Graduated Penalty:
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleApplyPenalty(c.id, 'warning')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold"
                  >
                    1. Issue Warning
                  </button>
                  <button
                    onClick={() => handleApplyPenalty(c.id, 'badge_removed')}
                    className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-500/40 text-xs font-semibold"
                  >
                    2. Revoke Trust Badge
                  </button>
                  <button
                    onClick={() => handleApplyPenalty(c.id, 'suspended')}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-semibold"
                  >
                    3. Suspend (30 Days)
                  </button>
                  <button
                    onClick={() => handleApplyPenalty(c.id, 'banned')}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg"
                  >
                    4. Permanent Ban
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Reference Verification Dialer */}
      {activeTab === 'references' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Past Client Outreach & Reference Logging
            </h2>
            <span className="text-xs text-emerald-400 font-semibold">100% Platform Phone Verified</span>
          </div>

          <div className="space-y-4">
            {SEED_REFERENCES.map((ref) => (
              <div
                key={ref.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{ref.clientName} ({ref.companyName})</h3>
                    <p className="text-slate-400">{ref.clientContact}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                    {ref.verificationStatus.replace('_', ' ')}
                  </span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Project Details:</span>
                  <p className="text-slate-300">{ref.projectDescription}</p>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 text-[10px] uppercase font-bold">Staff Call Notes:</span>
                  <p className="text-slate-300">{ref.callNotes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Re-test Scheduler */}
      {activeTab === 'retests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Surprise Spot-Check & Re-test Scheduler
            </h2>
            <p className="text-xs text-slate-400">
              Active professionals undergo random re-tests and oral walkthroughs to maintain their Trust Tier.
            </p>
          </div>

          <div className="space-y-3">
            {SEED_PROFESSIONALS.map((p) => (
              <div
                key={p.uid}
                className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={p.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white">{p.displayName}</h4>
                    <p className="text-slate-400">{p.field}</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Last Re-test</span>
                    <span className="font-mono text-emerald-400 font-semibold">{p.trustBreakdown.lastReTestDate}</span>
                  </div>

                  <button
                    onClick={() => alert(`Surprise 24-hour oral walkthrough notification dispatched to ${p.displayName}.`)}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    Trigger Spot Re-test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
