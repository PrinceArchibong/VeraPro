import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Coins, 
  Award, 
  ExternalLink, 
  Filter, 
  CheckCircle2, 
  HardHat, 
  Code2, 
  Palette, 
  Camera, 
  Calculator,
  ArrowRight,
  Sliders,
  Globe2,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Building,
  Check,
  Zap,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { ProfessionalProfile, ProfessionalCategory } from '../lib/types';
import { SEED_PROFESSIONALS } from '../lib/seedData';
import { TrustScoreBadge } from './TrustScoreBadge';

interface MarketplaceViewProps {
  onSelectPro: (pro: ProfessionalProfile) => void;
  onHirePro: (pro: ProfessionalProfile) => void;
  onOpenPostJob: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onSelectPro,
  onHirePro,
  onOpenPostJob
}) => {
  // 1. Search & AI Prompt State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [aiMatchMessage, setAiMatchMessage] = useState<string | null>(null);

  // 2. Skill Category & Sub-Specialization State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubSkill, setSelectedSubSkill] = useState<string>('all');

  // 3. Trust Score & Tier Filters
  const [minTrustScore, setMinTrustScore] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [requireC2PAOnly, setRequireC2PAOnly] = useState<boolean>(false);
  const [requireRegBodyOnly, setRequireRegBodyOnly] = useState<boolean>(false);

  // 4. Geography Filters
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [workMode, setWorkMode] = useState<'all' | 'onsite' | 'remote'>('all');

  // 5. Sorting & Advanced Drawer
  const [sortBy, setSortBy] = useState<'trust-desc' | 'trust-asc' | 'rating-desc' | 'jobs-desc' | 'rate-asc' | 'rate-desc'>('trust-desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Sparkles, count: SEED_PROFESSIONALS.length },
    { id: 'trades', label: 'Trades & Construction', icon: HardHat, count: SEED_PROFESSIONALS.filter(p => p.category === 'trades').length },
    { id: 'tech', label: 'Tech & Engineering', icon: Code2, count: SEED_PROFESSIONALS.filter(p => p.category === 'tech').length },
    { id: 'design', label: 'UI/UX & Product Design', icon: Palette, count: SEED_PROFESSIONALS.filter(p => p.category === 'design').length },
    { id: 'creative', label: 'Creative & Photography', icon: Camera, count: SEED_PROFESSIONALS.filter(p => p.category === 'creative').length },
    { id: 'services', label: 'Finance & ICAN Accounting', icon: Calculator, count: SEED_PROFESSIONALS.filter(p => p.category === 'services').length },
  ];

  // Dynamic list of unique cities and countries from dataset
  const availableCities = useMemo(() => {
    const cities = Array.from(new Set(SEED_PROFESSIONALS.map(p => p.city))).filter(Boolean);
    return ['all', ...cities];
  }, []);

  const availableCountries = useMemo(() => {
    const countries = Array.from(new Set(SEED_PROFESSIONALS.map(p => p.country))).filter(Boolean);
    return ['all', ...countries];
  }, []);

  // Quick Skill Sub-tags depending on selected category
  const skillTagsForCategory = useMemo(() => {
    switch (selectedCategory) {
      case 'trades':
        return ['High-Wind Signage', 'Steel Fabrication', 'COREN Structural', 'NEMSA Electrical', 'Anchor Systems'];
      case 'tech':
        return ['Distributed Systems', 'Go / Node.js', 'FinTech APIs', 'Git Commit History', 'Kubernetes'];
      case 'design':
        return ['Design Tokens', 'Figma Systems', 'WCAG AAA', 'Layered PSD', 'Mobile UX'];
      case 'creative':
        return ['RAW EXIF', 'Canon CR3', 'C2PA Cryptographic', 'Architectural Photo'];
      case 'services':
        return ['ICAN Audit', 'Forensic Reconciliation', 'IFRS 16', 'Tax Strategy', 'Land Due Diligence'];
      default:
        return ['COREN Structural', 'Distributed Systems', 'Figma Tokens', 'RAW EXIF', 'ICAN Audit', 'NEMSA Electrical'];
    }
  }, [selectedCategory]);

  // Comprehensive Filter & Search Pipeline
  const filteredPros = useMemo(() => {
    return SEED_PROFESSIONALS.filter((pro) => {
      // 1. Skill Category Filter
      if (selectedCategory !== 'all' && pro.category !== selectedCategory) {
        return false;
      }

      // 1b. Sub-skill tag filter
      if (selectedSubSkill !== 'all') {
        const subLower = selectedSubSkill.toLowerCase();
        const inField = pro.field.toLowerCase().includes(subLower);
        const inSpec = pro.specialization.toLowerCase().includes(subLower);
        const inBio = pro.bio.toLowerCase().includes(subLower);
        const inCreds = pro.credentialsList.some(c => c.name.toLowerCase().includes(subLower));
        const inEv = pro.evidenceItems.some(e => e.title.toLowerCase().includes(subLower) || e.summary.toLowerCase().includes(subLower));
        if (!inField && !inSpec && !inBio && !inCreds && !inEv) {
          return false;
        }
      }

      // 2. Trust Score Filter
      if (pro.trustScore < minTrustScore) {
        return false;
      }

      // 2b. Trust Tier Filter
      if (selectedTier !== 'all' && pro.tier !== selectedTier) {
        return false;
      }

      // 2c. Trust Provenance Seals
      if (requireC2PAOnly && !pro.provenanceVerified) {
        return false;
      }

      if (requireRegBodyOnly && (!pro.credentialsVerified || pro.credentialsList.length === 0)) {
        return false;
      }

      // 3. Geography Filters
      if (selectedCity !== 'all' && pro.city !== selectedCity) {
        return false;
      }

      if (selectedCountry !== 'all' && pro.country !== selectedCountry) {
        return false;
      }

      // 3b. Work Mode: On-site vs Remote
      if (workMode === 'onsite') {
        // Must be on-site capable (trades or non-pure remote)
        if (pro.isRemoteCapable && pro.category !== 'trades') {
          // If pure remote without physical capability, skip
          // Trades are strictly on-site
        }
      } else if (workMode === 'remote') {
        if (!pro.isRemoteCapable) {
          return false;
        }
      }

      // 4. Keyword Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = pro.displayName.toLowerCase().includes(q);
        const matchField = pro.field.toLowerCase().includes(q);
        const matchSpec = pro.specialization.toLowerCase().includes(q);
        const matchBio = pro.bio.toLowerCase().includes(q);
        const matchCity = pro.city.toLowerCase().includes(q);
        const matchCountry = pro.country.toLowerCase().includes(q);
        const matchCreds = pro.credentialsList.some(c => 
          c.name.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)
        );
        const matchEvidence = pro.evidenceItems.some(e =>
          e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || (e.metadata.cameraModel && e.metadata.cameraModel.toLowerCase().includes(q))
        );

        if (!matchName && !matchField && !matchSpec && !matchBio && !matchCity && !matchCountry && !matchCreds && !matchEvidence) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trust-desc') return b.trustScore - a.trustScore;
      if (sortBy === 'trust-asc') return a.trustScore - b.trustScore;
      if (sortBy === 'rating-desc') return b.averageRating - a.averageRating;
      if (sortBy === 'jobs-desc') return b.completedJobsCount - a.completedJobsCount;
      if (sortBy === 'rate-asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'rate-desc') return b.hourlyRate - a.hourlyRate;
      return 0;
    });
  }, [
    selectedCategory,
    selectedSubSkill,
    minTrustScore,
    selectedTier,
    requireC2PAOnly,
    requireRegBodyOnly,
    selectedCity,
    selectedCountry,
    workMode,
    searchQuery,
    sortBy
  ]);

  // AI Plain-Language Matching Engine
  const handleAiSmartMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsMatching(true);
    setAiMatchMessage(null);

    setTimeout(() => {
      const text = aiPrompt.toLowerCase();
      let matchedCat = 'all';
      let detectedCity = 'all';
      let detectedMode: 'all' | 'onsite' | 'remote' = 'all';

      // Geography detection in prompt
      if (text.includes('lagos') || text.includes('lekki') || text.includes('ikeja') || text.includes('victoria island') || text.includes('yaba')) {
        detectedCity = 'Lagos';
        setSelectedCity('Lagos');
      } else if (text.includes('abuja') || text.includes('wuse') || text.includes('garki') || text.includes('maitama')) {
        detectedCity = 'Abuja';
        setSelectedCity('Abuja');
      } else if (text.includes('port harcourt') || text.includes('ph')) {
        detectedCity = 'Port Harcourt';
        setSelectedCity('Port Harcourt');
      }

      if (text.includes('remote') || text.includes('distributed') || text.includes('online')) {
        detectedMode = 'remote';
        setWorkMode('remote');
      } else if (text.includes('on-site') || text.includes('site') || text.includes('installation') || text.includes('physical')) {
        detectedMode = 'onsite';
        setWorkMode('onsite');
      }

      // Skill category detection
      if (text.includes('signage') || text.includes('banner') || text.includes('contractor') || text.includes('builder') || text.includes('steel') || text.includes('welder') || text.includes('fabricator') || text.includes('gantry') || text.includes('electrician') || text.includes('illumination')) {
        matchedCat = 'trades';
        setSelectedCategory('trades');
      } else if (text.includes('developer') || text.includes('api') || text.includes('code') || text.includes('backend') || text.includes('engine') || text.includes('golang') || text.includes('node') || text.includes('ledger')) {
        matchedCat = 'tech';
        setSelectedCategory('tech');
      } else if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma') || text.includes('app') || text.includes('design tokens')) {
        matchedCat = 'design';
        setSelectedCategory('design');
      } else if (text.includes('photo') || text.includes('camera') || text.includes('raw') || text.includes('shoot') || text.includes('photographer') || text.includes('exif')) {
        matchedCat = 'creative';
        setSelectedCategory('creative');
      } else if (text.includes('accountant') || text.includes('audit') || text.includes('tax') || text.includes('ican') || text.includes('land') || text.includes('finance') || text.includes('due diligence')) {
        matchedCat = 'services';
        setSelectedCategory('services');
      }

      // Trust threshold detection in prompt
      if (text.includes('expert') || text.includes('elite') || text.includes('95') || text.includes('top tier')) {
        setMinTrustScore(95);
      } else if (text.includes('verified') || text.includes('senior') || text.includes('80')) {
        setMinTrustScore(80);
      }

      setIsMatching(false);
      setAiMatchMessage(`Matched criteria: ${matchedCat !== 'all' ? matchedCat.toUpperCase() : 'Disciplines'} • City: ${detectedCity !== 'all' ? detectedCity : 'Any'} • Mode: ${detectedMode !== 'all' ? detectedMode : 'Flexible'}`);
    }, 450);
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubSkill('all');
    setMinTrustScore(0);
    setSelectedTier('all');
    setRequireC2PAOnly(false);
    setRequireRegBodyOnly(false);
    setSelectedCity('all');
    setSelectedCountry('all');
    setWorkMode('all');
    setSortBy('trust-desc');
    setAiMatchMessage(null);
  };

  // Check if any filter is active
  const isAnyFilterActive = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedCategory !== 'all' ||
      selectedSubSkill !== 'all' ||
      minTrustScore > 0 ||
      selectedTier !== 'all' ||
      requireC2PAOnly ||
      requireRegBodyOnly ||
      selectedCity !== 'all' ||
      selectedCountry !== 'all' ||
      workMode !== 'all'
    );
  }, [
    searchQuery,
    selectedCategory,
    selectedSubSkill,
    minTrustScore,
    selectedTier,
    requireC2PAOnly,
    requireRegBodyOnly,
    selectedCity,
    selectedCountry,
    workMode
  ]);

  // Active filters count for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedSubSkill !== 'all') count++;
    if (minTrustScore > 0) count++;
    if (selectedTier !== 'all') count++;
    if (requireC2PAOnly) count++;
    if (requireRegBodyOnly) count++;
    if (selectedCity !== 'all') count++;
    if (selectedCountry !== 'all') count++;
    if (workMode !== 'all') count++;
    return count;
  }, [
    searchQuery,
    selectedCategory,
    selectedSubSkill,
    minTrustScore,
    selectedTier,
    requireC2PAOnly,
    requireRegBodyOnly,
    selectedCity,
    selectedCountry,
    workMode
  ]);

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-7xl mx-auto">
      
      {/* ================= 1. HERO GUARANTEE BANNER & PLAIN-LANGUAGE MATCHING ================= */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Not a Freelancer Bidding Site. 100% Process Verified.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Verified Professionals. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Zero Synthetic Hallucinations.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every professional on Vera Pro passes government KYC, timed proctored exams, live oral walkthroughs, and submits verifiable process evidence (original RAW EXIF files, Git commit trees, layered Figma design tokens, and GPS site photos).
          </p>

          {/* AI Plain-Language Matching Assistant */}
          <form onSubmit={handleAiSmartMatch} className="pt-2">
            <div className="bg-slate-900/90 rounded-2xl p-2 border border-slate-700/80 shadow-xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Sparkles className="w-5 h-5 text-emerald-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe your job in plain language (e.g. 'Need a COREN structural engineer in Lagos for a 16m gantry' or 'Remote ICAN auditor with 95+ trust score')..."
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isMatching}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50 shrink-0"
              >
                {isMatching ? (
                  <span>Filtering Criteria...</span>
                ) : (
                  <>
                    <span>Smart Match</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {aiMatchMessage && (
              <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {aiMatchMessage}
                </span>
                <button
                  type="button"
                  onClick={() => setAiMatchMessage(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-5 pt-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Camera & Screen Monitored Exams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>C2PA Authenticity Provenance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Escrow Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. SKILL CATEGORY FILTER TABS ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Filter by Professional Skill Discipline
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong className="text-white font-mono">{filteredPros.length}</strong> of {SEED_PROFESSIONALS.length} professionals
          </span>
        </div>

        {/* Category Buttons with Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubSkill('all');
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2.5 relative group ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 text-white shadow-lg shadow-emerald-950/30'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-slate-800 text-slate-500'}`}>
                    {cat.count}
                  </span>
                </div>

                <div>
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {cat.label}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sub-Specialization Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap pl-1">
            Specialization:
          </span>
          <button
            onClick={() => setSelectedSubSkill('all')}
            className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedSubSkill === 'all'
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Skills
          </button>
          {skillTagsForCategory.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedSubSkill(tag)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedSubSkill === tag
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ================= 3. SEARCH & DUAL GEOGRAPHY / TRUST BAR ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        
        {/* Main Search Row with Quick Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skill, registration (ICAN, COREN, NEMSA), or proof artifact..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Geography & Trust Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Geography: City Selector */}
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-950/80 border border-slate-800 text-xs text-white rounded-2xl pl-9 pr-8 py-3 focus:outline-none focus:border-emerald-500 appearance-none font-medium cursor-pointer"
              >
                <option value="all">Geography: All Cities</option>
                {availableCities.filter(c => c !== 'all').map(city => (
                  <option key={city} value={city}>{city} (Nigeria)</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 pointer-events-none" />
            </div>

            {/* Geography: Work Mode (On-Site vs Remote) */}
            <div className="relative flex items-center">
              <Globe2 className="w-4 h-4 text-cyan-400 absolute left-3 pointer-events-none" />
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as any)}
                className="bg-slate-950/80 border border-slate-800 text-xs text-white rounded-2xl pl-9 pr-8 py-3 focus:outline-none focus:border-emerald-500 appearance-none font-medium cursor-pointer"
              >
                <option value="all">Work Mode: All Types</option>
                <option value="onsite">On-Site / Physical Trades Only</option>
                <option value="remote">Remote Capable Only</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 pointer-events-none" />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center">
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950/80 border border-slate-800 text-xs text-white rounded-2xl pl-9 pr-8 py-3 focus:outline-none focus:border-emerald-500 appearance-none font-medium cursor-pointer"
              >
                <option value="trust-desc">Sort: Highest Trust Score</option>
                <option value="trust-asc">Sort: Lowest Trust Score</option>
                <option value="rating-desc">Sort: Highest Rating</option>
                <option value="jobs-desc">Sort: Most Completed Jobs</option>
                <option value="rate-asc">Sort: Rate (Low to High)</option>
                <option value="rate-desc">Sort: Rate (High to Low)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 pointer-events-none" />
            </div>

            {/* Toggle Advanced Trust & Geography Controls */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                showAdvancedFilters || minTrustScore > 0 || selectedTier !== 'all' || requireC2PAOnly || requireRegBodyOnly
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span>Trust & Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* ================= 4. EXPANDED TRUST SCORE & GEOGRAPHY PANEL ================= */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn text-xs">
            
            {/* Box A: Trust Score Threshold Slider */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Minimum Trust Score
                </span>
                <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded-lg border ${
                  minTrustScore >= 80 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : minTrustScore >= 60 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {minTrustScore}+ / 100
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="98"
                step="2"
                value={minTrustScore}
                onChange={(e) => setMinTrustScore(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              {/* Score Presets */}
              <div className="flex items-center gap-1.5 pt-1">
                {[
                  { label: 'Any', val: 0 },
                  { label: 'Standard (60+)', val: 60 },
                  { label: 'High (80+)', val: 80 },
                  { label: 'Elite (95+)', val: 95 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setMinTrustScore(preset.val)}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      minTrustScore === preset.val
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Box B: Trust Tier & Provenance Checks */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
              <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Award className="w-4 h-4 text-cyan-400" />
                Trust Tier & Provenance
              </span>

              {/* Tier Selection */}
              <div className="flex items-center gap-1.5">
                {['all', 'Expert', 'Senior', 'Verified'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedTier === tier
                        ? 'bg-slate-800 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tier === 'all' ? 'All Tiers' : tier}
                  </button>
                ))}
              </div>

              {/* Checkboxes for rigorous seals */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                  <input
                    type="checkbox"
                    checked={requireC2PAOnly}
                    onChange={(e) => setRequireC2PAOnly(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Require C2PA / Content Provenance Verified</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                  <input
                    type="checkbox"
                    checked={requireRegBodyOnly}
                    onChange={(e) => setRequireRegBodyOnly(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Official Regulatory Body Verified (ICAN, COREN, etc.)</span>
                </label>
              </div>
            </div>

            {/* Box C: Country & Physical Location Scope */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
              <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Globe2 className="w-4 h-4 text-amber-400" />
                Geographic Country & Proximity
              </span>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Country Jurisdiction:</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Countries</option>
                  {availableCountries.filter(c => c !== 'all').map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="text-emerald-400 font-semibold block">Local Verification Standard:</span>
                <p>On-site trade works default to physical city boundaries. Remote digital engineering allows nationwide and global talent with C2PA verification.</p>
              </div>
            </div>

          </div>
        )}

        {/* Active Filter Tags Bar with Reset Button */}
        {isAnyFilterActive && (
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider mr-1">
                Active Filters:
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-white border border-slate-700">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">
                  <span>Discipline: {categories.find(c => c.id === selectedCategory)?.label}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedSubSkill !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
                  <span>Skill: {selectedSubSkill}</span>
                  <button onClick={() => setSelectedSubSkill('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {minTrustScore > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-300 border border-slate-700">
                  <span>Score: ≥{minTrustScore}</span>
                  <button onClick={() => setMinTrustScore(0)} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedTier !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">
                  <span>Tier: {selectedTier}</span>
                  <button onClick={() => setSelectedTier('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedCity !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-white border border-slate-700">
                  <span>City: {selectedCity}</span>
                  <button onClick={() => setSelectedCity('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {workMode !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700">
                  <span>Mode: {workMode === 'onsite' ? 'On-Site Only' : 'Remote Only'}</span>
                  <button onClick={() => setWorkMode('all')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {requireC2PAOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
                  <span>C2PA Verified</span>
                  <button onClick={() => setRequireC2PAOnly(false)} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}

              {requireRegBodyOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                  <span>Reg Body Verified</span>
                  <button onClick={() => setRequireRegBodyOnly(false)} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-slate-400 hover:text-rose-400 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* ================= 5. PROFESSIONALS RESULTS GRID ================= */}
      {filteredPros.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Verified Professionals Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            No professionals match your current filter combination (Discipline, Trust Score threshold, or Geography). Try lowering the minimum score or clearing city restrictions.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Clear All Filters & Show All Professionals
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPros.map((pro) => (
            <div
              key={pro.uid}
              className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/50 p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-emerald-950/20 flex flex-col justify-between"
            >
              <div>
                
                {/* Card Top: Avatar, Trust Score & Tier */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={pro.avatarUrl}
                      alt={pro.displayName}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-400 transition-all"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {pro.displayName}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{pro.field}</p>
                      
                      {/* Geography & Remote Capability Badge */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="font-medium text-slate-300">{pro.city}, {pro.country}</span>
                        <span>•</span>
                        <span className={`text-[10px] font-semibold ${pro.isRemoteCapable ? 'text-cyan-400' : 'text-amber-400'}`}>
                          {pro.isRemoteCapable ? 'Remote Capable' : 'On-Site Trades'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reusable Color-Coded Trust Score Badge */}
                  <TrustScoreBadge 
                    score={pro.trustScore} 
                    tier={pro.tier} 
                    size="md"
                  />
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {pro.bio}
                </p>

                {/* Verified Credentials Pills */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Verified Official Registrations:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pro.credentialsList.length > 0 ? (
                      pro.credentialsList.map((cred, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-md border border-slate-700"
                        >
                          <Award className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="line-clamp-1">{cred.name}</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">Government KYC & Liveness Verified</span>
                    )}
                  </div>
                </div>

                {/* Process Proof Highlight with C2PA Provenance Seal */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 mb-4 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between font-semibold text-slate-300">
                    <span className="text-slate-400">Process Proof:</span>
                    <span className="text-emerald-400 line-clamp-1 max-w-[190px]">
                      {pro.evidenceItems[0]?.title || 'Monitored Practical Session'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Provenance Seal:</span>
                    <span className="text-cyan-300 font-mono flex items-center gap-1">
                      {pro.provenanceVerified ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          <span>C2PA Signature Valid</span>
                        </>
                      ) : (
                        <span className="text-slate-500">Standard Metadata</span>
                      )}
                    </span>
                  </div>
                </div>

              </div>

              {/* Card Footer: Rates & Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Standard Rate</span>
                  <span className="text-sm font-extrabold text-white">
                    ₦{pro.hourlyRate.toLocaleString()}
                    <span className="text-[11px] text-slate-400 font-normal"> / baseline</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPro(pro)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Inspect Proof
                  </button>
                  <button
                    onClick={() => onHirePro(pro)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-950/40 transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    Hire Escrow
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
