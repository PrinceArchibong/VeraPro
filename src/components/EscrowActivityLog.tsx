import React, { useState, useMemo } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Lock,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronDown,
  X,
  Printer,
  Sparkles,
  Wallet,
  Receipt
} from 'lucide-react';
import { EscrowTransaction } from '../lib/types';

interface EscrowActivityLogProps {
  transactions: EscrowTransaction[];
  perspective?: 'client' | 'professional';
  onNewDeposit?: () => void;
  onNewWithdrawal?: () => void;
}

export const EscrowActivityLog: React.FC<EscrowActivityLogProps> = ({
  transactions,
  perspective = 'client',
  onNewDeposit,
  onNewWithdrawal,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<EscrowTransaction | null>(null);

  // Copy reference to clipboard
  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  // Filter & Search logic
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (filterType !== 'all' && tx.type !== filterType) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = tx.title.toLowerCase().includes(q);
          const matchRef = tx.reference.toLowerCase().includes(q);
          const matchProvider = tx.provider?.toLowerCase().includes(q) || false;
          const matchBank = tx.bankDetails?.toLowerCase().includes(q) || false;
          const matchReason = tx.reason?.toLowerCase().includes(q) || false;
          return matchTitle || matchRef || matchProvider || matchBank || matchReason;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        // Default date sorting
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;
        return sortBy === 'date-asc' ? dateA - dateB : dateB - dateA;
      });
  }, [transactions, filterType, searchQuery, sortBy]);

  // Aggregate stats
  const totalDeposited = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'deposit')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const totalWithdrawn = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'withdrawal')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const totalReleased = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'release')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const totalRefunded = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'refund')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Type', 'Title', 'Amount (NGN)', 'Provider', 'Status', 'Reference', 'Date', 'Bank / Details'];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      tx.type.toUpperCase(),
      `"${tx.title.replace(/"/g, '""')}"`,
      tx.amount,
      tx.provider || 'VeraVault',
      tx.status,
      tx.reference,
      `"${tx.date}"`,
      `"${(tx.bankDetails || tx.reason || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VeraVault-Escrow-Log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeBadge = (type: EscrowTransaction['type']) => {
    switch (type) {
      case 'deposit':
        return {
          label: 'Deposit',
          icon: ArrowDownLeft,
          bg: 'bg-emerald-500/15',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          sign: '+',
          colorAmount: 'text-emerald-400',
        };
      case 'withdrawal':
        return {
          label: 'Withdrawal',
          icon: ArrowUpRight,
          bg: 'bg-amber-500/15',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          sign: '-',
          colorAmount: 'text-amber-400',
        };
      case 'release':
        return {
          label: 'Milestone Release',
          icon: CheckCircle2,
          bg: 'bg-cyan-500/15',
          text: 'text-cyan-400',
          border: 'border-cyan-500/30',
          sign: perspective === 'client' ? '-' : '+',
          colorAmount: perspective === 'client' ? 'text-cyan-400' : 'text-emerald-400',
        };
      case 'refund':
        return {
          label: 'Back-Out Refund',
          icon: RotateCcw,
          bg: 'bg-purple-500/15',
          text: 'text-purple-400',
          border: 'border-purple-500/30',
          sign: '+',
          colorAmount: 'text-purple-400',
        };
      case 'lock':
      default:
        return {
          label: 'Milestone Allocation',
          icon: Lock,
          bg: 'bg-blue-500/15',
          text: 'text-blue-400',
          border: 'border-blue-500/30',
          sign: '',
          colorAmount: 'text-slate-300',
        };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner & Quick Action Buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Immutable Escrow Ledger</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Escrow Activity Log & Audit Trail</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Complete, timestamped financial history of your deposits, milestone allocations, releases, and bank withdrawals. Every movement is secured under NDIC-backed trustee accounts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Download CSV Spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export CSV</span>
            </button>

            {perspective === 'client' && onNewDeposit && (
              <button
                onClick={onNewDeposit}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Deposit Funds</span>
              </button>
            )}

            {perspective === 'client' && onNewWithdrawal && (
              <button
                onClick={onNewWithdrawal}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                <span>Withdraw Funds</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Four Aggregate Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-5">
          {/* Total Deposited */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Total Deposited
              </span>
              <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ₦{totalDeposited.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500">Inflows via Paystack / Flutterwave</p>
          </div>

          {/* Total Milestone Released */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                {perspective === 'client' ? 'Milestones Released' : 'Earned & Disbursed'}
              </span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ₦{totalReleased.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500">Paid upon verified process evidence</p>
          </div>

          {/* Total Withdrawn */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Total Withdrawn
              </span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ₦{totalWithdrawn.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500">Transferred back to bank via NIP</p>
          </div>

          {/* Total Back-Out Refunds */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Refunds / Back-Outs
              </span>
              <RotateCcw className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ₦{totalRefunded.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-500">Returned from cancelled contracts</p>
          </div>
        </div>
      </div>

      {/* 3. Filters, Search, and Sort Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Activities', count: transactions.length },
              { id: 'deposit', label: 'Deposits (+)', count: transactions.filter((t) => t.type === 'deposit').length },
              { id: 'withdrawal', label: 'Withdrawals (-)', count: transactions.filter((t) => t.type === 'withdrawal').length },
              { id: 'release', label: 'Milestone Releases', count: transactions.filter((t) => t.type === 'release').length },
              { id: 'refund', label: 'Refunds (↺)', count: transactions.filter((t) => t.type === 'refund').length },
              { id: 'lock', label: 'Allocations', count: transactions.filter((t) => t.type === 'lock').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterType === tab.id
                    ? 'bg-slate-800 text-white border border-slate-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    filterType === tab.id ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by transaction reference, bank, description, or gateway (e.g., Paystack, GTBank, PSTK)..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Escrow Transactions Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No transactions match your search query "${searchQuery}". Try clearing search filters.`
                : `There are currently no transactions under the "${filterType}" filter.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const badge = getTypeBadge(tx.type);
            const Icon = badge.icon;

            return (
              <div
                key={tx.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${badge.bg} ${badge.text} ${badge.border}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {badge.label}
                      </span>

                      {tx.provider && (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-semibold border border-slate-700">
                          {tx.provider}
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{tx.date}</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {tx.title}
                    </h3>

                    {/* Metadata Subtitles: Bank info, Reason, or Destination */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                      {tx.bankDetails && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{tx.bankDetails}</span>
                        </span>
                      )}

                      {tx.reason && (
                        <span className="text-slate-400 italic">
                          "{tx.reason}"
                        </span>
                      )}

                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                        <span>Ref: {tx.reference}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyRef(tx.reference)}
                          className="hover:text-emerald-400 transition-colors p-0.5"
                          title="Copy reference code"
                        >
                          {copiedRef === tx.reference ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Receipt Button */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <div className={`text-lg sm:text-xl font-black font-mono ${badge.colorAmount}`}>
                      {badge.sign}₦{tx.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center md:justify-end gap-1.5 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                        {tx.status === 'completed' ? 'Settled & Verified' : tx.status}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(tx)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="View & Print Official VeraVault Receipt"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Printable E-Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">VeraVault Escrow Transaction Receipt</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Ref: {selectedReceipt.reference}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4 text-xs font-mono">
              <div className="text-center pb-3 border-b border-dashed border-slate-800 space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                  Vera Pro Trust & Escrow Guarantee
                </span>
                <div className="text-2xl font-black text-white pt-1">
                  ₦{selectedReceipt.amount.toLocaleString()}
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                  Transaction {selectedReceipt.status}
                </span>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Type:</span>
                  <span className="font-bold text-white uppercase">{selectedReceipt.type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Description:</span>
                  <span className="text-right text-white max-w-[220px] font-sans text-xs">
                    {selectedReceipt.title}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-white">{selectedReceipt.date}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway / Trustee:</span>
                  <span className="text-emerald-400">{selectedReceipt.provider || 'VeraVault Partner Bank'}</span>
                </div>

                {selectedReceipt.bankDetails && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank Destination:</span>
                    <span className="text-white">{selectedReceipt.bankDetails}</span>
                  </div>
                )}

                {selectedReceipt.reason && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reason / Memo:</span>
                    <span className="text-white">{selectedReceipt.reason}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px]">
                  <span className="text-slate-500">Audit Status:</span>
                  <span className="text-emerald-400 font-bold">Cryptographically Verified</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
