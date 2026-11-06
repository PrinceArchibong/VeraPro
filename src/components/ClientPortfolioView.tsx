import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  Briefcase, 
  CheckCircle2, 
  Camera, 
  Code2, 
  Layers, 
  HardHat, 
  Calculator,
  Coins
} from 'lucide-react';
import { SEED_PROFESSIONALS } from '../lib/seedData';
import { ProfessionalProfile } from '../lib/types';
import { TrustScoreBadge } from './TrustScoreBadge';

interface ClientPortfolioViewProps {
  onSelectPro: (pro: ProfessionalProfile) => void;
  onHirePro: (pro: ProfessionalProfile) => void;
}

export const ClientPortfolioView: React.FC<ClientPortfolioViewProps> = ({
  onSelectPro,
  onHirePro,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const portfolioShowcases = [
    {
      id: 'port-1',
      proUid: 'pro-kabir-trades',
      title: 'Lekki Toll Plaza 16m Gantry Steel Truss & Structural Signage',
      category: 'trades',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      description: 'Erected a 16-meter cantilever highway gantry rated for 85 km/h Atlantic coastal gusts. Cast with Grade 316 stainless bolts, tested to 420 Nm torque.',
      clientName: 'GTBank Retail Infrastructure Team',
      testimonial: 'Delivered 3 days ahead of schedule. Passed Lagos State advertising and structural safety inspections on the first review.',
      rating: 5.0,
      completionDate: 'October 2026',
      deliverableType: 'Structural Signage & Foundation Log'
    },
    {
      id: 'port-2',
      proUid: 'pro-chukwudi-dev',
      title: 'Distributed Escrow Settlement Engine & Concurrency Auditor',
      category: 'tech',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      description: 'Refactored double-entry microservices ledger with atomic status transitions and idempotent API gateways. Zero race conditions under 10k parallel requests.',
      clientName: 'PayFusion Africa Ltd',
      testimonial: 'Chukwudi eliminated our concurrent double-spend vulnerability completely. Clean Git branch hygiene and documented test suites.',
      rating: 4.9,
      completionDate: 'September 2026',
      deliverableType: 'High-Throughput Node.js Microservice'
    },
    {
      id: 'port-3',
      proUid: 'pro-femi-photo',
      title: 'Zenith Bank Headquarters Sunset Architectural Imagery',
      category: 'creative',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      description: 'Ultra-high-definition 45-Megapixel architectural capture using native Canon EOS R5 RAW CR3 files with manual color calibration and C2PA credentials.',
      clientName: 'Zenith Brand Media Communications',
      testimonial: 'The native RAW color fidelity is pristine. Absolutely zero synthetic AI artifacts. Perfect for our international annual report.',
      rating: 4.8,
      completionDate: 'October 2026',
      deliverableType: 'Native RAW Photography & Color Suite'
    },
    {
      id: 'port-4',
      proUid: 'pro-amina-design',
      title: 'VeriPay Multi-Brand Inclusive Fintech Design System',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      description: 'Layered component library featuring 184 auto-layout variants, low-bandwidth 2G upload fallbacks, and WCAG AAA accessible typography tokens.',
      clientName: 'Horizon Financial Technologies',
      testimonial: 'Amina built an exceptionally accessible interface that our engineering team translated directly to code without ambiguity.',
      rating: 4.9,
      completionDate: 'October 2026',
      deliverableType: 'Figma Token Library & Wireframes'
    },
    {
      id: 'port-5',
      proUid: 'pro-ngozi-finance',
      title: 'Epe Commercial Land Banking Portfolio & IFRS 16 Audit',
      category: 'services',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
      description: 'Comprehensive financial and cadastral title due diligence for 120 hectares of commercial real estate. Fully compliant with ICAN statutory guidelines.',
      clientName: 'Evex Land Capital & Holdings',
      testimonial: 'Ngozi uncovered multiple historical title ambiguities that saved our fund over ₦40M in tax liabilities. Masterclass in forensic accounting.',
      rating: 5.0,
      completionDate: 'October 2026',
      deliverableType: 'IFRS Statutory Audit & Working Papers'
    }
  ];

  const filteredPortfolios = portfolioShowcases.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Verified Deliverables Portfolio
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Client Portfolio & Proven Deliverables
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Explore real-world projects completed and escrow-released by vetted Vera Pro professionals.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-semibold">100% Client-Confirmed Delivery</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-6 border-t border-slate-800 scrollbar-thin">
          {[
            { id: 'all', label: 'All Portfolio Works' },
            { id: 'trades', label: 'Structural & Trades' },
            { id: 'tech', label: 'Tech & Engineering' },
            { id: 'design', label: 'UI/UX Design Systems' },
            { id: 'creative', label: 'Commercial Photography' },
            { id: 'services', label: 'ICAN Finance & Audits' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPortfolios.map((item) => {
          const pro = SEED_PROFESSIONALS.find(p => p.uid === item.proUid);

          return (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                    {item.deliverableType}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Professional byline */}
                  {pro && (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={pro.avatarUrl}
                          alt={pro.displayName}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-500/30"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{pro.displayName}</h4>
                          <p className="text-[11px] text-slate-400">{pro.field}</p>
                        </div>
                      </div>

                      <TrustScoreBadge
                        score={pro.trustScore}
                        tier={pro.tier}
                        size="sm"
                        showTier={false}
                      />
                    </div>
                  )}

                  {/* Testimonial Quote */}
                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-slate-300 italic">
                    "{item.testimonial}"
                    <div className="text-[11px] text-emerald-400 font-semibold not-italic mt-1.5 flex items-center justify-between">
                      <span>— {item.clientName}</span>
                      <span className="text-slate-400 font-normal">{item.completionDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                {pro && (
                  <>
                    <button
                      onClick={() => onSelectPro(pro)}
                      className="text-xs text-slate-300 hover:text-white font-semibold transition-colors"
                    >
                      Inspect Full Dossier &rarr;
                    </button>

                    <button
                      onClick={() => onHirePro(pro)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40 transition-all flex items-center gap-1.5"
                    >
                      <Coins className="w-3.5 h-3.5" />
                      Hire for Project
                    </button>
                  </>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
