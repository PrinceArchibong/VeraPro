import React, { useState } from 'react';
import { 
  Lock, 
  Coins, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Upload, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Briefcase,
  Wallet,
  Building,
  Check,
  CreditCard,
  Building2,
  RefreshCcw,
  Receipt,
  RotateCcw,
  History,
  X,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { EscrowContract, EscrowMilestone, EscrowTransaction } from '../lib/types';
import { SEED_ESCROWS } from '../lib/seedData';
import { useAuth } from '../context/AuthContext';
import { EscrowActivityLog } from './EscrowActivityLog';

interface EscrowManagerViewProps {
  perspective?: 'client' | 'professional';
  onOpenPostJob?: () => void;
}

export const EscrowManagerView: React.FC<EscrowManagerViewProps> = ({ 
  perspective = 'client',
  onOpenPostJob 
}) => {
  const { userProfile } = useAuth();
  
  // Client Escrow Wallet & Capital State
  const [availableEscrowBalance, setAvailableEscrowBalance] = useState<number>(2400000); // ₦2.4M unallocated available for withdrawal/jobs
  
  // Extended dataset with Delivered, Pending, and Rejected contracts
  const [escrows, setEscrows] = useState<EscrowContract[]>([
    ...SEED_ESCROWS,
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
      status: 'disputed', // Disputed / Rejected
      disputeReason: 'Deliverable was an AI-generated flattened raster inside an SVG container with melted anatomy and zero vector paths.',
      disputeEvidence: 'Detector returned 88% synthetic risk. Layer inspection confirmed 1 flattened pixel layer instead of promised vector tokens.',
      milestones: [
        {
          id: 'rej-m1',
          title: 'Vector Character Concept & Layered Illustrator Assets',
          amount: 450000,
          status: 'disputed',
          proofDescription: 'Flattened raster artifact submitted. Flagged and rejected by client.'
        }
      ],
      createdAt: '2026-10-24',
      updatedAt: '2026-10-29'
    }
  ]);

  // Transaction Ledger History
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([
    {
      id: 'tx-dep-101',
      type: 'deposit',
      title: 'Escrow Account Funding via Paystack',
      amount: 5000000,
      provider: 'Paystack',
      status: 'completed',
      reference: 'PSTK-ESC-9812401',
      date: '2026-10-28 11:20 WAT'
    },
    {
      id: 'tx-lock-102',
      title: 'Milestone Allocation: High-Wind Signage on Ozumba Mbadiwe',
      type: 'lock',
      amount: 3800000,
      provider: 'VeraVault',
      status: 'completed',
      reference: 'VAULT-LOCK-7712',
      date: '2026-10-29 09:15 WAT'
    },
    {
      id: 'tx-dep-103',
      type: 'deposit',
      title: 'Escrow Account Top-Up via Flutterwave',
      amount: 1200000,
      provider: 'Flutterwave',
      status: 'completed',
      reference: 'FLW-ESC-332910',
      date: '2026-11-01 14:40 WAT'
    },
    {
      id: 'tx-rel-104',
      type: 'release',
      title: 'Milestone 1 Payment Released to Engr. Kabir Danjuma',
      amount: 1140000,
      provider: 'Paystack',
      status: 'completed',
      reference: 'PAYOUT-REL-9921',
      date: '2026-11-03 16:02 WAT'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'delivered' | 'pending' | 'rejected'>('all');
  const [selectedEscrowId, setSelectedEscrowId] = useState<string>(escrows[0].id);

  // Modals state
  const [depositOpen, setDepositOpen] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(1000000);
  const [depositProvider, setDepositProvider] = useState<'Paystack' | 'Flutterwave' | 'Remita' | 'Bank Transfer'>('Paystack');

  const [withdrawOpen, setWithdrawOpen] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(500000);
  const [withdrawBank, setWithdrawBank] = useState<string>('Guaranty Trust Bank (GTBank)');
  const [withdrawAccount, setWithdrawAccount] = useState<string>('0128491823');
  const [withdrawReason, setWithdrawReason] = useState<string>('Backing out of prospective job / Cancelled project');
  
  // Confirmation Dialog Modal State (prevents accidental fund removal)
  const [confirmWithdrawModalOpen, setConfirmWithdrawModalOpen] = useState<boolean>(false);

  const [backoutOpen, setBackoutOpen] = useState<boolean>(false);

  const [disputeOpen, setDisputeOpen] = useState<boolean>(false);
  const [disputeReason, setDisputeReason] = useState<string>('');
  const [disputeEvidence, setDisputeEvidence] = useState<string>('');

  const [submitProofOpen, setSubmitProofOpen] = useState<boolean>(false);
  const [proofText, setProofText] = useState<string>('');
  const [proofUrl, setProofUrl] = useState<string>('');

  const [activeView, setActiveView] = useState<'contracts' | 'activity'>('contracts');

  const currentEscrow = escrows.find(e => e.id === selectedEscrowId) || escrows[0];

  // Calculate total locked in active non-released contracts
  const activeContracts = escrows.filter(e => e.status !== 'released' && e.status !== 'refunded');
  const totalLockedInContracts = activeContracts.reduce((acc, curr) => {
    // Only count unreleased milestones
    const pendingAmount = curr.milestones
      .filter(m => m.status !== 'approved_released')
      .reduce((sum, m) => sum + m.amount, 0);
    return acc + pendingAmount;
  }, 0);

  // Total client escrow capital = available cash in escrow vault + locked in active milestones
  const totalClientEscrowCapital = availableEscrowBalance + totalLockedInContracts;

  // Handle client deposit into escrow
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;

    setAvailableEscrowBalance(prev => prev + depositAmount);
    
    const newTx: EscrowTransaction = {
      id: `tx-dep-${Date.now()}`,
      type: 'deposit',
      title: `Escrow Deposit via ${depositProvider}`,
      amount: depositAmount,
      provider: depositProvider,
      status: 'completed',
      reference: `${depositProvider.substring(0, 3).toUpperCase()}-DEP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString()
    };

    setTransactions(prev => [newTx, ...prev]);
    setDepositOpen(false);
    alert(`Success! ₦${depositAmount.toLocaleString()} deposited into your VeraVault Escrow account via ${depositProvider}. You can now allocate it to milestones or withdraw it at any time.`);
  };

  // Step 1: Client submits withdrawal form -> validate and prompt confirmation dialog
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) return;
    if (withdrawAmount > availableEscrowBalance) {
      alert(`Withdrawal exceeds your available escrow balance of ₦${availableEscrowBalance.toLocaleString()}. To withdraw funds locked in a contract, you must first back out of or cancel that contract.`);
      return;
    }

    // Open confirmation dialog modal to prevent accidental fund removal
    setConfirmWithdrawModalOpen(true);
  };

  // Step 2: Client confirms in the confirmation dialog modal -> execute withdrawal
  const handleExecuteFinalWithdrawal = () => {
    setAvailableEscrowBalance(prev => prev - withdrawAmount);

    const newTx: EscrowTransaction = {
      id: `tx-wth-${Date.now()}`,
      type: 'withdrawal',
      title: `Escrow Withdrawal: ${withdrawReason}`,
      amount: withdrawAmount,
      status: 'completed',
      reference: `WTH-NIP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      bankDetails: `${withdrawBank} • ${withdrawAccount} (Adewale Johnson)`
    };

    setTransactions(prev => [newTx, ...prev]);
    setConfirmWithdrawModalOpen(false);
    setWithdrawOpen(false);
    alert(`Withdrawal Confirmed! ₦${withdrawAmount.toLocaleString()} has been disbursed to ${withdrawBank} (${withdrawAccount}). Settlement is immediate via NIP.`);
  };

  // Handle client backing out of a contract & refunding unspent funds back to available escrow
  const handleConfirmBackout = () => {
    // Calculate unreleased funds in this contract
    const unreleasedMilestones = currentEscrow.milestones.filter(m => m.status !== 'approved_released');
    const refundAmount = unreleasedMilestones.reduce((sum, m) => sum + m.amount, 0);

    if (refundAmount <= 0) {
      alert('All milestones in this contract were already released. No locked funds remain to refund.');
      setBackoutOpen(false);
      return;
    }

    // Refund back to client's available escrow balance
    setAvailableEscrowBalance(prev => prev + refundAmount);

    // Update contract status to refunded
    setEscrows(prev => prev.map(esc => {
      if (esc.id !== currentEscrow.id) return esc;
      return {
        ...esc,
        status: 'refunded',
        milestones: esc.milestones.map(m => m.status !== 'approved_released' ? { ...m, status: 'disputed' as const, proofDescription: 'Contract cancelled / backed out by client before completion.' } : m)
      };
    }));

    // Record refund transaction
    const newTx: EscrowTransaction = {
      id: `tx-ref-${Date.now()}`,
      type: 'refund',
      title: `Contract Back-Out Refund: ${currentEscrow.jobTitle}`,
      amount: refundAmount,
      status: 'completed',
      reference: `REFUND-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      reason: 'Client backed out before project completion'
    };

    setTransactions(prev => [newTx, ...prev]);
    setBackoutOpen(false);
    alert(`Contract Cancelled! ₦${refundAmount.toLocaleString()} has been unlocked from this contract and returned to your available Escrow balance. You can withdraw it immediately back to your bank account!`);
  };

  const handleReleaseMilestone = (milestoneId: string) => {
    const targetMilestone = currentEscrow.milestones.find(m => m.id === milestoneId);
    setEscrows(prev => prev.map(esc => {
      if (esc.id !== currentEscrow.id) return esc;
      const updatedMilestones = esc.milestones.map(m => {
        if (m.id === milestoneId) return { ...m, status: 'approved_released' as const };
        return m;
      });
      const allApproved = updatedMilestones.every(m => m.status === 'approved_released');
      return {
        ...esc,
        milestones: updatedMilestones,
        status: allApproved ? 'released' : 'in_progress'
      };
    }));

    if (targetMilestone) {
      const newTx: EscrowTransaction = {
        id: `tx-rel-${Date.now()}`,
        type: 'release',
        title: `Milestone Released: ${targetMilestone.title} (${currentEscrow.jobTitle})`,
        amount: targetMilestone.amount,
        provider: currentEscrow.provider,
        status: 'completed',
        reference: `REL-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleString(),
        recipient: currentEscrow.professionalName,
        milestoneTitle: targetMilestone.title
      };
      setTransactions(prev => [newTx, ...prev]);
    }

    alert('Milestone confirmed. Escrow payment released securely to professional.');
  };

  const handleProSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofText.trim()) return;

    setEscrows(prev => prev.map(esc => {
      if (esc.id !== currentEscrow.id) return esc;
      const updatedMilestones = esc.milestones.map(m => {
        if (m.status === 'pending' || m.status === 'in_progress') {
          return {
            ...m,
            status: 'submitted_with_proof' as const,
            proofDescription: proofText,
            evidenceUrl: proofUrl || 'https://verapro.evidence/audit-proof.pdf'
          };
        }
        return m;
      });
      return {
        ...esc,
        milestones: updatedMilestones,
        status: 'milestone_submitted'
      };
    }));
    setSubmitProofOpen(false);
    setProofText('');
    setProofUrl('');
    alert('Milestone deliverable and verifiable process evidence submitted to client for approval!');
  };

  const handleRaiseDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeReason.trim()) return;

    setEscrows(prev => prev.map(esc => {
      if (esc.id !== currentEscrow.id) return esc;
      return {
        ...esc,
        status: 'disputed',
        disputeReason,
        disputeEvidence
      };
    }));
    setDisputeOpen(false);
    alert('Dispute case created and transferred to Trust & Safety Arbitration Team. Funds remain frozen in escrow.');
  };

  // Filtered list
  const filteredEscrows = escrows.filter(c => {
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
      
      {/* ================= 1. CLIENT ESCROW BALANCE & WALLET BAR ================= */}
      {perspective === 'client' && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                VeraVault Guaranteed Escrow Account
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Client Escrow Funds & Financial Control
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Deposit money into escrow securely. You can allocate funds to project milestones, monitor exact balances, or <strong>withdraw your funds back to your bank account at any time if you ever back out.</strong>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDepositOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all active:scale-95"
              >
                <ArrowDownLeft className="w-4 h-4 text-slate-950" />
                <span>Deposit Money into Escrow</span>
              </button>

              <button
                onClick={() => setWithdrawOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span>Withdraw Money (Back Out)</span>
              </button>
            </div>
          </div>

          {/* 3 Capital Transparency Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Total In Escrow */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Total Money in Escrow</span>
                <Lock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                ₦{totalClientEscrowCapital.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Total client capital currently secured under NDIC-partner trustee escrow.
              </p>
            </div>

            {/* Available to Withdraw */}
            <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span className="font-semibold uppercase tracking-wider">Available for Withdrawal / Hiring</span>
                <Wallet className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ₦{availableEscrowBalance.toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-300/80 pt-1">
                Unallocated money. Withdrawable instantly back to your bank account if you back out.
              </p>
            </div>

            {/* Locked in Active Milestones */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Locked in Active Milestones</span>
                <Coins className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                ₦{totalLockedInContracts.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Committed to ongoing jobs. Released upon proof confirmation or refunded if you back out.
              </p>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Integrated Gateways: Paystack • Flutterwave • Remita • Partner Bank Escrow
            </span>

            <button
              onClick={() => setActiveView('activity')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span>Open Escrow Activity Log ({transactions.length} entries)</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= 2. PROFESSIONAL PERSPECTIVE BANNER ================= */}
      {perspective === 'professional' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" />
                Professional Guaranteed Escrow Payouts
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Escrow Milestones & Payout Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Clients deposit funds into escrow before you begin work. Submit your deliverables with verifiable process proof to trigger milestone disbursement.
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Contracts Value</span>
              <span className="text-xl font-extrabold text-blue-400 font-mono">
                ₦{totalLockedInContracts.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2.5 VIEW TOGGLE TABS: CONTRACTS VS ESCROW ACTIVITY LOG ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('contracts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'contracts'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Contracts & Milestones</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-slate-300 font-mono">
              {filteredEscrows.length}
            </span>
          </button>

          <button
            onClick={() => setActiveView('activity')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'activity'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>Escrow Activity Log</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
              {transactions.length}
            </span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>VeraVault Escrow Protocol • Instant NIP Settlement</span>
        </div>
      </div>

      {activeView === 'activity' ? (
        <EscrowActivityLog
          transactions={transactions}
          perspective={perspective}
          onNewDeposit={() => setDepositOpen(true)}
          onNewWithdrawal={() => setWithdrawOpen(true)}
        />
      ) : (
        <>
          {/* ================= 3. FILTER PILLS: All, Delivered, Pending, Rejected ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setFilter('all')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filter === 'all'
              ? 'bg-slate-800 border-slate-600 text-white shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">All Contracts</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">{escrows.length}</div>
        </button>

        <button
          onClick={() => setFilter('delivered')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filter === 'delivered'
              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-emerald-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered & Released
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{countDelivered}</div>
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filter === 'pending'
              ? 'bg-amber-950/50 border-amber-500 text-amber-300 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-amber-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending Milestones
          </div>
          <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">{countPending}</div>
        </button>

        <button
          onClick={() => setFilter('rejected')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filter === 'rejected'
              ? 'bg-rose-950/50 border-rose-500 text-rose-300 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-rose-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Disputed / Rejected
          </div>
          <div className="text-xl font-bold text-rose-400 font-mono mt-0.5">{countRejected}</div>
        </button>
      </div>

      {/* ================= 4. CONTRACT AGREEMENTS & MILESTONES WORKSPACE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Contracts List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contract Agreements ({filteredEscrows.length})
            </h2>
            <span className="text-[10px] text-slate-500 uppercase font-mono">
              Filter: {filter}
            </span>
          </div>

          <div className="space-y-3">
            {filteredEscrows.map((esc) => (
              <button
                key={esc.id}
                onClick={() => setSelectedEscrowId(esc.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedEscrowId === esc.id
                    ? 'bg-slate-800/90 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    {esc.provider} Escrow
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    esc.status === 'released' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : esc.status === 'disputed'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : esc.status === 'refunded'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {esc.status === 'released' ? 'Delivered' : esc.status === 'disputed' ? 'Disputed' : esc.status === 'refunded' ? 'Backed Out / Refunded' : 'In Escrow'}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white line-clamp-1 mb-1">{esc.jobTitle}</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{perspective === 'client' ? `Pro: ${esc.professionalName.split(' ')[0]}` : `Client: ${esc.clientName.split(' ')[0]}`}</span>
                  <span className="font-mono font-bold text-white">₦{esc.amount.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Selected Contract Breakdown, Milestones & Back-Out Actions */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* Contract Overview Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  currentEscrow.status === 'released'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : currentEscrow.status === 'disputed'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : currentEscrow.status === 'refunded'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {currentEscrow.status === 'released' ? 'Delivered & Released' : currentEscrow.status === 'disputed' ? 'Rejected / Disputed' : currentEscrow.status === 'refunded' ? 'Backed Out / Refunded' : 'Pending Milestone'}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {currentEscrow.id}</span>
              </div>
              <h2 className="text-lg font-bold text-white">{currentEscrow.jobTitle}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span>Client: <strong className="text-slate-200">{currentEscrow.clientName}</strong></span>
                <span>•</span>
                <span>Pro: <strong className="text-emerald-400">{currentEscrow.professionalName}</strong></span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400 font-semibold">Total Escrow Value</div>
              <div className="text-xl font-bold text-white font-mono">
                ₦{currentEscrow.amount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Dispute Warning if applicable */}
          {currentEscrow.status === 'disputed' && (
            <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 text-xs text-rose-200 space-y-2">
              <div className="font-bold flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                Escrow Dispute Active - Under Trust & Safety Arbitration
              </div>
              <p><strong>Reason:</strong> {currentEscrow.disputeReason}</p>
              <p className="text-[11px] text-rose-300/80 font-mono">Evidence Logged: {currentEscrow.disputeEvidence}</p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-rose-800/50">
                Funds remain frozen in VeraVault until admin mediator issues a binding verdict.
              </div>
            </div>
          )}

          {/* Refunded Notice if client backed out */}
          {currentEscrow.status === 'refunded' && (
            <div className="bg-purple-950/40 border border-purple-800/60 rounded-2xl p-4 text-xs text-purple-200 space-y-1">
              <div className="font-bold flex items-center gap-2 text-purple-400">
                <RotateCcw className="w-4 h-4" />
                Client Backed Out - Unspent Funds Refunded to Escrow
              </div>
              <p>The uncompleted milestones of this contract have been cancelled and returned to your available Escrow balance for immediate withdrawal to your bank.</p>
            </div>
          )}

          {/* Milestone List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Milestone Stages & Process Deliverables
              </h3>
              {perspective === 'professional' && currentEscrow.status !== 'disputed' && currentEscrow.status !== 'released' && currentEscrow.status !== 'refunded' && (
                <button
                  onClick={() => setSubmitProofOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit Deliverable & Proof</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {currentEscrow.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        m.status === 'approved_released'
                          ? 'bg-emerald-500 text-slate-950'
                          : m.status === 'submitted_with_proof'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                          : m.status === 'disputed'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{m.title}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Allocation: ₦{m.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      m.status === 'approved_released'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : m.status === 'submitted_with_proof'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : m.status === 'disputed'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {m.status === 'approved_released' ? 'Delivered & Released' : m.status === 'disputed' ? 'Rejected' : m.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Proof Description & Process Attachment */}
                  {m.proofDescription && (
                    <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Submitted Process Proof & Deliverable:
                      </div>
                      <p className="text-slate-300">{m.proofDescription}</p>
                      {m.evidenceUrl && (
                        <a
                          href={m.evidenceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline pt-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Signed Process Audit Report</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Client Release Button */}
                  {perspective === 'client' && m.status === 'submitted_with_proof' && (
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                      <span className="text-[11px] text-slate-400">
                        Process evidence meets criteria. Client approval authorizes release.
                      </span>

                      <button
                        onClick={() => handleReleaseMilestone(m.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        Confirm Proof & Release ₦{m.amount.toLocaleString()}
                      </button>
                    </div>
                  )}

                  {/* Professional status view */}
                  {perspective === 'professional' && m.status === 'submitted_with_proof' && (
                    <div className="pt-2 flex items-center gap-2 text-xs text-cyan-400">
                      <Clock className="w-4 h-4" />
                      <span>Deliverable submitted with process evidence. Awaiting client release confirmation.</span>
                    </div>
                  )}

                  {m.status === 'approved_released' && (
                    <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Funds disbursed securely via {currentEscrow.provider}.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Client Action Bar: Back Out / Refund OR Dispute */}
          {perspective === 'client' && currentEscrow.status !== 'released' && currentEscrow.status !== 'refunded' && (
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* Back Out of Contract Button */}
              <button
                onClick={() => setBackoutOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Back Out of Contract & Refund Unspent Funds</span>
              </button>

              {/* Raise Dispute Button */}
              {currentEscrow.status !== 'disputed' && (
                <button
                  onClick={() => setDisputeOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-800/50 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Raise Dispute & Freeze Escrow</span>
                </button>
              )}

            </div>
          )}

        </div>

      </div>
      </>
      )}

      {/* ================= MODAL 1: DEPOSIT MONEY INTO ESCROW ================= */}
      {depositOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Deposit Funds into Escrow</h3>
                  <p className="text-xs text-slate-400">Funds are held in VeraVault until you approve milestone release</p>
                </div>
              </div>

              <button onClick={() => setDepositOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Deposit Amount (NGN)</label>
                <input
                  type="number"
                  min="50000"
                  step="50000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-base text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2">
                {[500000, 1000000, 2500000, 5000000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDepositAmount(val)}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
                  >
                    +₦{(val / 1000000 >= 1 ? `${val / 1000000}M` : `${val / 1000}k`)}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Payment Gateway Provider</label>
                <select
                  value={depositProvider}
                  onChange={(e) => setDepositProvider(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Paystack">Paystack (Debit Card / Instant Bank Transfer / USSD)</option>
                  <option value="Flutterwave">Flutterwave (Cards / Mobile Money)</option>
                  <option value="Remita">Remita (Treasury / Direct Corporate Transfer)</option>
                  <option value="Bank Transfer">Direct Dedicated NUBAN Virtual Account</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NDIC-Insured Trust Account Guarantee:
                </div>
                <p>Deposited funds remain your legal property until you explicitly approve deliverable milestones. You may withdraw unallocated funds at any time with zero penalty.</p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setDepositOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/40"
                >
                  Complete Deposit via {depositProvider}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: WITHDRAW MONEY FROM ESCROW (BACK OUT) ================= */}
      {withdrawOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Withdraw Funds from Escrow</h3>
                  <p className="text-xs text-slate-400">Withdraw available escrow balance directly back to your bank</p>
                </div>
              </div>

              <button onClick={() => setWithdrawOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Available for Immediate Withdrawal:</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">₦{availableEscrowBalance.toLocaleString()}</span>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1 font-semibold">
                  <span>Withdrawal Amount (NGN)</span>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(availableEscrowBalance)}
                    className="text-emerald-400 hover:underline text-[11px]"
                  >
                    Withdraw All Available (₦{availableEscrowBalance.toLocaleString()})
                  </button>
                </div>
                <input
                  type="number"
                  min="1000"
                  max={availableEscrowBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-base text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Destination Bank</label>
                <select
                  value={withdrawBank}
                  onChange={(e) => setWithdrawBank(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Guaranty Trust Bank (GTBank)">Guaranty Trust Bank (GTBank)</option>
                  <option value="Zenith Bank Plc">Zenith Bank Plc</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                  <option value="Kuda Microfinance Bank">Kuda Microfinance Bank</option>
                  <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">NUBAN Account Number (10 Digits)</label>
                <input
                  type="text"
                  maxLength={10}
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  required
                />
                <span className="text-[10px] text-emerald-400 block mt-1">✓ Account Name Resolved: Adewale Johnson</span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Reason for Withdrawal</label>
                <select
                  value={withdrawReason}
                  onChange={(e) => setWithdrawReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Backing out of prospective job / Cancelled project">Backing out of prospective job / Cancelled project</option>
                  <option value="Change of budget requirements">Change of budget requirements</option>
                  <option value="Reallocating capital">Reallocating capital</option>
                  <option value="Standard cash-out">Standard cash-out</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setWithdrawOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
                >
                  <span>Review Withdrawal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: WITHDRAWAL CONFIRMATION DIALOG (ACCIDENTAL REMOVAL GUARD) ================= */}
      {confirmWithdrawModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Confirm Escrow Fund Withdrawal</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Please review the transfer details below to prevent accidental fund removal.
                </p>
              </div>
            </div>

            {/* Transfer Summary Card */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Withdrawal Amount:
                </span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  ₦{withdrawAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Beneficiary Bank:</span>
                <span className="text-white font-semibold">{withdrawBank}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Account Number:</span>
                <span className="text-white font-mono font-semibold">{withdrawAccount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Account Holder:</span>
                <span className="text-emerald-400 font-semibold">Adewale Johnson (Verified)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Reason:</span>
                <span className="text-slate-200">{withdrawReason}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Remaining Escrow Balance:</span>
                <span className="text-slate-300 font-mono font-semibold">
                  ₦{(availableEscrowBalance - withdrawAmount).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Warning Callout */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Irreversible Action:</strong> Once authorized, ₦{withdrawAmount.toLocaleString()} will immediately be transferred out of the insured VeraVault escrow vault to your bank account via NIP.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmWithdrawModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Cancel / Go Back
              </button>

              <button
                type="button"
                onClick={handleExecuteFinalWithdrawal}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-950/50 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Authorize Withdrawal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: BACK OUT OF CONTRACT & REFUND ================= */}
      {backoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold">
              <RotateCcw className="w-5 h-5" />
              <h3 className="text-base text-white">Back Out of Contract & Refund Escrow</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to back out of <strong>{currentEscrow.jobTitle}</strong>?
            </p>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Contract Escrow:</span>
                <span className="font-mono text-white">₦{currentEscrow.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Already Released:</span>
                <span className="font-mono text-emerald-400">
                  -₦{currentEscrow.milestones.filter(m => m.status === 'approved_released').reduce((s, m) => s + m.amount, 0).toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-emerald-400">
                <span>Amount to be Refunded:</span>
                <span className="font-mono">
                  +₦{currentEscrow.milestones.filter(m => m.status !== 'approved_released').reduce((s, m) => s + m.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              This amount will immediately return to your available Escrow balance, where you can withdraw it back to your bank account with a single click.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setBackoutOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                Keep Contract Active
              </button>
              <button
                type="button"
                onClick={handleConfirmBackout}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                Confirm Back Out & Refund Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: DISPUTE ================= */}
      {disputeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base text-white">Escrow Dispute & Evidence Submission</h3>
            </div>

            <p className="text-xs text-slate-300">
              Disputes are arbitrated by human Trust & Safety specialists. Explain the issue (e.g. deliverable lacks promised RAW files, or AI detection signals divergence).
            </p>

            <form onSubmit={handleRaiseDispute} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Reason for Dispute</label>
                <textarea
                  rows={3}
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Explain why deliverable is rejected..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Evidence / Artifact Reference</label>
                <input
                  type="text"
                  value={disputeEvidence}
                  onChange={(e) => setDisputeEvidence(e.target.value)}
                  placeholder="URL or hash of questionable deliverable"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDisputeOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg"
                >
                  Submit Dispute to Arbitration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 5: PRO SUBMIT PROOF ================= */}
      {submitProofOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Upload className="w-5 h-5" />
              <h3 className="text-base text-white">Submit Milestone Deliverable & Proof</h3>
            </div>

            <p className="text-xs text-slate-300">
              Attach the process evidence backing your work (e.g. RAW EXIF photo set, Git repository branch, or layered Figma link).
            </p>

            <form onSubmit={handleProSubmitProof} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Deliverable & Process Summary</label>
                <textarea
                  rows={3}
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  placeholder="Detail the completed milestone and human process steps..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Process Artifact URL (Git / Figma / RAW / GPS Log)</label>
                <input
                  type="text"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="https://github.com/... or https://figma.com/..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitProofOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg"
                >
                  Submit for Client Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
