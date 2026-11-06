import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, PortalMode } from './components/Navbar';
import { MarketplaceView } from './components/MarketplaceView';
import { ClientPortfolioView } from './components/ClientPortfolioView';
import { VettingCenterView } from './components/VettingCenterView';
import { ProcessProofVaultView } from './components/ProcessProofVaultView';
import { EscrowManagerView } from './components/EscrowManagerView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { ProfileDrawer } from './components/ProfileDrawer';
import { ArchitectureDocsModal } from './components/ArchitectureDocsModal';
import { NdpaModal } from './components/NdpaModal';
import { PostJobModal } from './components/PostJobModal';
import { ProfessionalProfile, JobPosting } from './lib/types';

function MainApp() {
  const { userProfile } = useAuth();

  // Two dedicated portal modes: Client vs Professional
  const [portalMode, setPortalMode] = useState<PortalMode>('client');

  // Client tabs: Marketplace, Portfolio, Escrow & Contracts (Delivered / Pending / Rejected)
  const [clientTab, setClientTab] = useState<'marketplace' | 'portfolio' | 'escrow'>('marketplace');

  // Professional tabs: Vetting & Proctoring, Proof Vault, Escrow Payouts, Admin Center
  const [proTab, setProTab] = useState<'vetting' | 'vault' | 'escrow' | 'admin'>('vetting');

  const [selectedPro, setSelectedPro] = useState<ProfessionalProfile | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [ndpaOpen, setNdpaOpen] = useState(false);
  const [postJobOpen, setPostJobOpen] = useState(false);

  const handleHirePro = (pro: ProfessionalProfile) => {
    setSelectedPro(null);
    setPortalMode('client');
    setClientTab('escrow');
  };

  const handleJobCreated = (job: JobPosting) => {
    setPortalMode('client');
    setClientTab('escrow');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Navbar */}
      <Navbar
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        clientTab={clientTab}
        setClientTab={setClientTab}
        proTab={proTab}
        setProTab={setProTab}
        onOpenDocs={() => setDocsOpen(true)}
        onOpenNdpa={() => setNdpaOpen(true)}
        onOpenPostJob={() => setPostJobOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ================= CLIENT PORTAL ================= */}
        {portalMode === 'client' && (
          <>
            {clientTab === 'marketplace' && (
              <MarketplaceView
                onSelectPro={(pro) => setSelectedPro(pro)}
                onHirePro={handleHirePro}
                onOpenPostJob={() => setPostJobOpen(true)}
              />
            )}

            {clientTab === 'portfolio' && (
              <ClientPortfolioView
                onSelectPro={(pro) => setSelectedPro(pro)}
                onHirePro={handleHirePro}
              />
            )}

            {clientTab === 'escrow' && (
              <EscrowManagerView
                perspective="client"
                onOpenPostJob={() => setPostJobOpen(true)}
              />
            )}
          </>
        )}

        {/* ================= PROFESSIONAL PORTAL ================= */}
        {portalMode === 'professional' && (
          <>
            {proTab === 'vetting' && (
              <VettingCenterView />
            )}

            {proTab === 'vault' && (
              <ProcessProofVaultView />
            )}

            {proTab === 'escrow' && (
              <EscrowManagerView
                perspective="professional"
              />
            )}

            {proTab === 'admin' && (
              <AdminDashboardView />
            )}
          </>
        )}
      </main>

      {/* Profile Drawer */}
      <ProfileDrawer
        pro={selectedPro}
        onClose={() => setSelectedPro(null)}
        onHire={handleHirePro}
      />

      {/* Architecture & PRD Specs Modal */}
      {docsOpen && (
        <ArchitectureDocsModal onClose={() => setDocsOpen(false)} />
      )}

      {/* NDPA Privacy Compliance Modal */}
      {ndpaOpen && (
        <NdpaModal onClose={() => setNdpaOpen(false)} />
      )}

      {/* Post Job Modal */}
      {postJobOpen && (
        <PostJobModal
          onClose={() => setPostJobOpen(false)}
          onJobCreated={handleJobCreated}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-tight">VERA PRO</span>
            <span>•</span>
            <span>
              {portalMode === 'client' ? 'Client Marketplace & Verified Portfolios' : 'Professional Vetting & Forensic Vault'}
            </span>
            <span>•</span>
            <span className="text-emerald-400">Nigeria NDPA & Global C2PA Standard</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setPortalMode(portalMode === 'client' ? 'professional' : 'client')} 
              className="text-emerald-400 hover:underline font-semibold"
            >
              Switch to {portalMode === 'client' ? 'Professional Portal' : 'Client Portal'} &rarr;
            </button>
            <button onClick={() => setDocsOpen(true)} className="hover:text-white transition-colors">
              Architecture & API Spec
            </button>
            <button onClick={() => setNdpaOpen(true)} className="hover:text-white transition-colors">
              Privacy & Biometrics
            </button>
            <span>Escrow via Paystack & Remita</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
