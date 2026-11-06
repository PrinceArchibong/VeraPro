import React, { useState } from 'react';
import { 
  FileCheck2, 
  Clock, 
  AlertTriangle, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Filter,
  ArrowUpRight,
  Briefcase
} from 'lucide-react';
import { EscrowContract } from '../lib/types';
import { SEED_ESCROWS } from '../lib/seedData';
import { useAuth } from '../context/AuthContext';

interface ClientContractsViewProps {
  onOpenPostJob: () => void;
}

export const ClientContractsView: React.FC<ClientContractsViewProps> = ({ onOpenPostJob }) => {
  const { userProfile } = useAuth();
  const [filter, setFilter] = useState<'all' | 'delivered' | 'pending' | 'rejected'>('all');
  const [escrows, setEscrows] = useState<EscrowContract[]>([
    ...SEED_ESCROWS,
    // Add realistic delivered and rejected contracts to fully showcase all states requested
    {
      id: 'escrow-delivered-fintech',
      jobId: 'job-fintech-ledger-prev',
      jobTitle: 'Fintech Multi-Currency Core Ledger Concurrency Audit',
      clientId: 'client-user-default',
      clientName: 'Adewale Johnson (Client)',
      professionalId: 'pro-chukwudi-dev',
      professionalName: 'Chukwudi Eze',
      amount: 1850000,
      currency: 'NGN',
      provider: 'Paystack',
      status: 'released', // Delivered
      milestones: [
        {
          id: 'del-m1',
          title: 'Concurrency Audit & Stress Test Suite',
          amount: 850000,
          status: 'approved_released',
          proofDescription: '64 Git commits verified with zero race conditions on 50 parallel checkout workers.',
          evidenceUrl: 'https://github.com/chukwudi-verapro/ledger-core'
        },
        {
          id: 'del-m2',
          title: 'Redis Distributed Lock & Final Production Deployment',
          amount: 1000000,
          status: 'approved_released',
          proofDescription: 'Idempotency gateway deployed with 99.99% uptime benchmark.',
          evidenceUrl: 'https://verapro.finance/audits/ledger-final.pdf'
        }
      ],
      createdAt: '2026-09-12',
      updatedAt: '2026-10-01'
    },
    {
      id: 'escrow-rejected-vector',
      jobId: 'job-vector-mascots',
      jobTitle: 'Vector Corporate Mascot Identity Suite',
      clientId: 'client-user-default',
      clientName: 'Adewale Johnson (Client)',
      professionalId: 'pro-temp-suspect',
      professionalName: 'Tunde Bakare (Suspended)',
      amount: 450000,
      currency: 'NGN',
      provider: 'Flutterwave',
      status: 'disputed', // Rejected / Disputed
      disputeReason: 'Deliverable was an AI-generated flattened raster inside an SVG container with melted anatomy and zero vector paths.',
      disputeEvidence: 'Detector returned 88% synthetic risk. Layer inspection confirmed 1 flattened pixel layer instead of promised vector tokens.',
      milestones: [
        {
          id: 'rej-m1',
          title: 'Vector Character Concept & Layered Illustrator Assets',
          amount: 450000,
          status: 'disputed',
          proofDescription: 'Flattened raster artifact submitted. Rejected by client.'
        }
      ],
      createdAt: '2026-10-24',
      updatedAt: '2026-10-29'
    }
  ]);

  const handleReleaseMilestone = (contractId: string, milestoneId: string) => {
    setEscrows(prev => prev.map(c => {
      if (c.id !== contractId) return c;
      const updatedMilestones = c.milestones.map(m => m.id === milestoneId ? { ...m, status: 'approved_released' as const } : m);
      const allReleased = updatedMilestones.every(m => m.status === 'approved_released');
      return {
        ...c,
        milestones: updatedMilestones,
        status: allReleased ? 'released' : 'in_progress'
      };
    }));
    alert('Milestone confirmed and payment released securely to professional.');
  };

  // Filter logic
  const filteredContracts = escrows.filter(c => {
    if (filter === 'delivered') return c.status === 'released' || c.status === 'client_confirmed';
    if (filter === 'pending') return c.status === 'funded' || c.status === 'in_progress' || c.status === 'milestone_submitted';
    if (filter === 'rejected') return c.status === 'disputed' || c.status === 'refunded';
    return true;
  });

  const countDelivered = escrows.filter(c => c.status === 'released' || c.status === 'client_confirmed').length;
  const countPending = escrows.filter(c => c.status === 'funded' || c.status === 'in_progress' || c.status === 'milestone_submitted').length;
  const countRejected = escrows.filter(c => c.status === 'disputed' || c.status === 'refunded').length;

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Client Escrow Contract Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              My Contracts & Deliverables
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Track project milestones, inspect process proofs, release funds upon verification, or escalate disputes.
            </p>
          </div>

          <button
            onClick={onOpenPostJob}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/40 flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Briefcase className="w-4 h-4" />
            <span>Post New Contract</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          
          <button
            onClick={() => setFilter('all')}
            className={`p-3 rounded-2xl text-left border transition-all ${
              filter === 'all'
                ? 'bg-slate-800 border-slate-600 text-white shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">All Contracts</div>
            <div className="text-lg font-bold text-white font-mono mt-0.5">{escrows.length}</div>
          </button>

          <button
            onClick={() => setFilter('delivered')}
            className={`p-3 rounded-2xl text-left border transition-all ${
              filter === 'delivered'
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-emerald-400'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Delivered & Released
            </div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{countDelivered}</div>
          </button>

          <button
            onClick={() => setFilter('pending')}
            className={`p-3 rounded-2xl text-left border transition-all ${
              filter === 'pending'
                ? 'bg-amber-950/50 border-amber-500 text-amber-300 shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-amber-400'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Pending & In-Progress
            </div>
            <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">{countPending}</div>
          </button>

          <button
            onClick={() => setFilter('rejected')}
            className={`p-3 rounded-2xl text-left border transition-all ${
              filter === 'rejected'
                ? 'bg-rose-950/50 border-rose-500 text-rose-300 shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-rose-400'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Disputed / Rejected
            </div>
            <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">{countRejected}</div>
          </button>

        </div>
      </div>

      {/* Contract Cards List */}
      <div className="space-y-6">
        {filteredContracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    contract.status === 'released'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : contract.status === 'disputed'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {contract.status === 'released' ? 'Delivered' : contract.status === 'disputed' ? 'Rejected / Disputed' : 'Pending Milestone'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Ref: {contract.id}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white">{contract.jobTitle}</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assigned Professional: <strong className="text-emerald-400">{contract.professionalName}</strong> • Gateway: {contract.provider}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Contract Value</span>
                <span className="text-xl font-extrabold text-white font-mono">
                  ₦{contract.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Rejection / Dispute Notice if applicable */}
            {contract.status === 'disputed' && (
              <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 text-xs text-rose-200 space-y-1.5">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Contract Rejected by Client & Escalated to Arbitration
                </div>
                <p><strong>Rejection Ground:</strong> {contract.disputeReason}</p>
                <p className="text-[11px] text-rose-300/80"><strong>Audited Forensic Finding:</strong> {contract.disputeEvidence}</p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-rose-800/50">
                  Escrow status: Funds frozen. Administrator reviewing counter-evidence from professional.
                </div>
              </div>
            )}

            {/* Milestones Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Milestones & Process Proof Submissions
              </h3>

              <div className="space-y-3">
                {contract.milestones.map((milestone, idx) => (
                  <div
                    key={milestone.id}
                    className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-white">{milestone.title}</h4>
                      </div>
                      <div className="text-slate-400 font-mono text-[11px] pl-7">
                        Allocation: ₦{milestone.amount.toLocaleString()}
                      </div>
                      {milestone.proofDescription && (
                        <p className="text-slate-300 text-[11px] pl-7 italic">
                          "{milestone.proofDescription}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pl-7 sm:pl-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        milestone.status === 'approved_released'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : milestone.status === 'disputed'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {milestone.status === 'approved_released' ? 'Delivered & Released' : milestone.status === 'disputed' ? 'Rejected' : 'Awaiting Review'}
                      </span>

                      {milestone.status === 'submitted_with_proof' && (
                        <button
                          onClick={() => handleReleaseMilestone(contract.id, milestone.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
                        >
                          <Coins className="w-3.5 h-3.5" />
                          Release Funds
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
