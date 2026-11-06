import React from 'react';
import { X, ShieldCheck, Lock, FileCheck2, Scale, Server, CheckCircle2, Clock } from 'lucide-react';

interface NdpaModalProps {
  onClose: () => void;
}

export const NdpaModal: React.FC<NdpaModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl text-slate-100 shadow-2xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Nigeria Data Protection Act (NDPA) & Privacy Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Statutory Data Privacy & Biometric Vault Protections
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              1. Biometric & Government ID Encryption
            </h3>
            <p>
              In accordance with Section 39 of the Nigeria Data Protection Act (NDPA 2023), government ID documents (NIN slips, Passports, Driver's Licenses) and facial liveness recordings are encrypted at rest with AES-256 and stored in restricted private Firestore buckets. Document numbers are masked in user-facing views (e.g., ••••-••••-8912).
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              2. Strict Retention Limits
            </h3>
            <p>
              Webcam proctor recordings and temporary screen captures from the skill test are automatically purged 60 days post-verification. Only non-reversible cryptographic hashes and score audit logs are maintained for long-term trust score continuity.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              3. Fair Adjudication & Low-Bandwidth Accommodation
            </h3>
            <p>
              To eliminate regional connectivity bias, applicants who experience packet loss or disconnections during live proctor sessions are permitted up to two no-penalty reschedulings. Gemma 4 scoring algorithms are audited regularly for accent and regional linguistic neutrality.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              4. Data Subject Rights
            </h3>
            <p>
              Users retain full rights to request verification dossiers, challenge AI-flagged resume inconsistencies before a senior human arbitrator, and exercise right-to-erasure upon account deactivation.
            </p>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
