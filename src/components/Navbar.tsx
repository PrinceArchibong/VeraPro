import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  Search, 
  FileCheck2, 
  Lock, 
  SlidersHorizontal, 
  UserCircle, 
  BookOpen, 
  Sparkles,
  ArrowRightLeft,
  Image,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../lib/types';

export type PortalMode = 'client' | 'professional';

interface NavbarProps {
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  clientTab: 'marketplace' | 'portfolio' | 'escrow';
  setClientTab: (tab: 'marketplace' | 'portfolio' | 'escrow') => void;
  proTab: 'vetting' | 'vault' | 'escrow' | 'admin';
  setProTab: (tab: 'vetting' | 'vault' | 'escrow' | 'admin') => void;
  onOpenDocs: () => void;
  onOpenNdpa: () => void;
  onOpenPostJob: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  portalMode,
  setPortalMode,
  clientTab,
  setClientTab,
  proTab,
  setProTab,
  onOpenDocs,
  onOpenNdpa,
  onOpenPostJob
}) => {
  const { userProfile, switchDemoRole, signInWithGoogle, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Indicator */}
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => {
                if (portalMode === 'client') setClientTab('marketplace');
                else setProTab('vetting');
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                    VERA PRO
                  </span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                    portalMode === 'client' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}>
                    {portalMode === 'client' ? 'Client Portal' : 'Pro Hub'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {portalMode === 'client' 
                    ? '100% Proven Human Talent • Escrow Backed'
                    : 'Process Verification & Proctoring Engine'}
                </p>
              </div>
            </div>

            {/* Portal Switch Toggle */}
            <div className="hidden lg:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 ml-4">
              <button
                onClick={() => {
                  setPortalMode('client');
                  if (userProfile?.role === 'professional') {
                    switchDemoRole('client', 'Adewale Johnson (Client)', 'client@horizon.africa');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  portalMode === 'client'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Client Page</span>
              </button>
              <button
                onClick={() => {
                  setPortalMode('professional');
                  if (userProfile?.role === 'client') {
                    switchDemoRole('professional', 'Chukwudi Eze (Verified Pro)', 'c.eze@verapro.dev');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  portalMode === 'professional'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Professional Page</span>
              </button>
            </div>
          </div>

          {/* Dynamic Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            {portalMode === 'client' ? (
              // CLIENT ONLY SEES: Marketplace, Portfolios, Contracts Delivered/Pending/Rejected
              <>
                <button
                  onClick={() => setClientTab('marketplace')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    clientTab === 'marketplace'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  Marketplace & Pros
                </button>

                <button
                  onClick={() => setClientTab('portfolio')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    clientTab === 'portfolio'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Image className="w-3.5 h-3.5 text-cyan-400" />
                  Portfolios & Reviews
                </button>

                <button
                  onClick={() => setClientTab('escrow')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    clientTab === 'escrow'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Escrow & Contracts (Delivered / Pending)
                </button>
              </>
            ) : (
              // PROFESSIONAL PORTAL SEES: Vetting, Proof of Work Vault, Escrow, Admin Command Center
              <>
                <button
                  onClick={() => setProTab('vetting')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    proTab === 'vetting'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Vetting & Proctoring
                </button>

                <button
                  onClick={() => setProTab('vault')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    proTab === 'vault'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Proof of Work Vault
                </button>

                <button
                  onClick={() => setProTab('escrow')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    proTab === 'escrow'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Contracts & Escrow
                </button>

                <button
                  onClick={() => setProTab('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    proTab === 'admin'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-300" />
                  Admin Center {isAdmin && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                </button>
              </>
            )}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            
            {/* Client-specific Post Job CTA */}
            {portalMode === 'client' && (
              <button
                onClick={onOpenPostJob}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-md transition-all active:scale-95"
              >
                <Briefcase className="w-3.5 h-3.5" />
                Post Job
              </button>
            )}

            {/* Mobile Portal Mode Switcher */}
            <button
              onClick={() => setPortalMode(portalMode === 'client' ? 'professional' : 'client')}
              title={`Switch to ${portalMode === 'client' ? 'Professional Page' : 'Client Page'}`}
              className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>{portalMode === 'client' ? 'Go to Pro' : 'Go to Client'}</span>
            </button>

            {/* Architecture Specs & Schema Modal */}
            <button
              onClick={onOpenDocs}
              title="View Architecture, Schema & System Design"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Docs</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:bg-slate-750 transition-all">
                <UserCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-medium max-w-[100px] truncate">
                  {userProfile?.displayName?.split(' ')[0] || 'User'}
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                  userProfile?.role === 'admin' 
                    ? 'bg-purple-900/80 text-purple-200 border border-purple-500/40' 
                    : userProfile?.role === 'professional'
                    ? 'bg-blue-900/80 text-blue-200 border border-blue-500/40'
                    : 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/40'
                }`}>
                  {userProfile?.role}
                </span>
              </button>

              <div className="absolute right-0 mt-1 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-2 hidden group-hover:block transition-all z-50">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 tracking-wider">
                  Test Personas
                </div>

                <button
                  onClick={() => {
                    setPortalMode('client');
                    switchDemoRole('client', 'Adewale Johnson (Client)', 'client@horizon.africa');
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-700 flex items-center justify-between text-slate-200 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-emerald-400">Client: Adewale</div>
                    <div className="text-[11px] text-slate-400">Browse pros, view contracts</div>
                  </div>
                  {userProfile?.role === 'client' && <span className="text-emerald-400 text-xs">✓</span>}
                </button>

                <button
                  onClick={() => {
                    setPortalMode('professional');
                    switchDemoRole('professional', 'Chukwudi Eze (Verified Pro)', 'c.eze@verapro.dev');
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-700 flex items-center justify-between text-slate-200 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-blue-400">Pro: Chukwudi Eze</div>
                    <div className="text-[11px] text-slate-400">Vetting, Git proof & payouts</div>
                  </div>
                  {userProfile?.role === 'professional' && <span className="text-blue-400 text-xs">✓</span>}
                </button>

                <button
                  onClick={() => {
                    setPortalMode('professional');
                    setProTab('admin');
                    switchDemoRole('admin', 'Admin Israel (Trust & Safety)', 'arisrael549@gmail.com');
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-700 flex items-center justify-between text-slate-200 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-purple-400">Admin Israel</div>
                    <div className="text-[11px] text-slate-400">Vetting queue, reports, penalties</div>
                  </div>
                  {userProfile?.role === 'admin' && <span className="text-purple-400 text-xs">✓</span>}
                </button>

                <div className="my-1 border-t border-slate-700" />

                <button
                  onClick={() => signInWithGoogle('client')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-900 text-slate-300 flex items-center gap-2 border border-slate-700/50"
                >
                  <span className="font-bold text-red-400">G</span>
                  <span>Google Auth Sign-In</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-950/90 border-t border-slate-800 px-2 py-2 overflow-x-auto text-[11px]">
        {portalMode === 'client' ? (
          <>
            <button 
              onClick={() => setClientTab('marketplace')} 
              className={`px-3 py-1 rounded-md ${clientTab === 'marketplace' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Marketplace
            </button>
            <button 
              onClick={() => setClientTab('portfolio')} 
              className={`px-3 py-1 rounded-md ${clientTab === 'portfolio' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Portfolios
            </button>
            <button 
              onClick={() => setClientTab('escrow')} 
              className={`px-3 py-1 rounded-md ${clientTab === 'escrow' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Escrow Vault
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setProTab('vetting')} 
              className={`px-2.5 py-1 rounded-md ${proTab === 'vetting' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Vetting
            </button>
            <button 
              onClick={() => setProTab('vault')} 
              className={`px-2.5 py-1 rounded-md ${proTab === 'vault' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Proof Vault
            </button>
            <button 
              onClick={() => setProTab('escrow')} 
              className={`px-2.5 py-1 rounded-md ${proTab === 'escrow' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Escrow
            </button>
            <button 
              onClick={() => setProTab('admin')} 
              className={`px-2.5 py-1 rounded-md ${proTab === 'admin' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              Admin
            </button>
          </>
        )}
      </div>
    </header>
  );
};
