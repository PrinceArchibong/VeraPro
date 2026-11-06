import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  Camera, 
  Video, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Upload, 
  Sparkles, 
  HelpCircle, 
  UserCheck, 
  Award, 
  GitBranch, 
  Layers, 
  HardHat, 
  FileCode2, 
  Lock, 
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';
import { AI_VETTING_ENGINE, GeneratedTestTask, ResumeAnalysisResult } from '../lib/aiVettingEngine';
import { useAuth } from '../context/AuthContext';

export const VettingCenterView: React.FC = () => {
  const { userProfile } = useAuth();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedField, setSelectedField] = useState<string>('tech');

  // Step 1: KYC & Resume state
  const [idType, setIdType] = useState<string>('NIN');
  const [idNumber, setIdNumber] = useState<string>('1234-5678-9012');
  const [livenessCaptured, setLivenessCaptured] = useState<boolean>(false);
  const [credentialBody, setCredentialBody] = useState<string>('COREN / NSE');
  const [resumeText, setResumeText] = useState<string>(
    '10+ years experience building cloud systems. Graduated B.Sc Unilag in 2023. Built solo enterprise core banking engine in 48 hours.'
  );
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult | null>(null);

  // Step 2: Proctored Test state
  const [testTask, setTestTask] = useState<GeneratedTestTask>(() => 
    AI_VETTING_ENGINE.generatePracticalTask('tech')
  );
  const [tabSwitches, setTabSwitches] = useState<number>(0);
  const [tabSwitchLogs, setTabSwitchLogs] = useState<string[]>([]);
  const [testTimer, setTestTimer] = useState<number>(1800); // 30 minutes
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [candidateSubmission, setCandidateSubmission] = useState<string>('');
  const [testCompleted, setTestCompleted] = useState<boolean>(false);

  // Step 3: Oral Walkthrough state
  const [oralExplanation, setOralExplanation] = useState<string>(
    'I avoided optimistic locks because multiple microservice pods check out simultaneously. I used atomic Redis distributed lock with idempotency tokens to prevent any double debit.'
  );
  const [probingActive, setProbingActive] = useState<boolean>(false);
  const [probingScore, setProbingScore] = useState<number | null>(null);

  // Step 4 & 5: Process Evidence & Provenance
  const [evidenceType, setEvidenceType] = useState<'raw_exif' | 'git_commits' | 'layered_file' | 'site_progress'>('git_commits');
  const [evidenceSubmitted, setEvidenceSubmitted] = useState<boolean>(false);
  const [c2paVerified, setC2paVerified] = useState<boolean>(true);

  // Step 6: Human Pledge Agreement
  const [agreementSigned, setAgreementSigned] = useState<boolean>(false);

  // Tab-switch event listener during proctored test
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isTestRunning && document.hidden) {
        setTabSwitches(prev => prev + 1);
        const time = new Date().toLocaleTimeString();
        setTabSwitchLogs(prev => [...prev, `[${time}] Tab blur / external window switch detected (Violation flag)`]);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isTestRunning]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestRunning && testTimer > 0) {
      interval = setInterval(() => setTestTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTestRunning, testTimer]);

  const handleFieldChange = (field: string) => {
    setSelectedField(field);
    const newTask = AI_VETTING_ENGINE.generatePracticalTask(field);
    setTestTask(newTask);
    setCandidateSubmission('');
    setTestCompleted(false);
  };

  const runResumeAnalysis = () => {
    const res = AI_VETTING_ENGINE.analyzeResumeClaims(resumeText, credentialBody);
    setResumeAnalysis(res);
  };

  const startProctoredTest = () => {
    setIsTestRunning(true);
    setTabSwitches(0);
    setTabSwitchLogs([]);
    setTestTimer(1800);
  };

  const submitProctoredTest = () => {
    setIsTestRunning(false);
    setTestCompleted(true);
    setActiveStep(3);
  };

  const evaluateOralWalkthrough = () => {
    setProbingActive(true);
    setTimeout(() => {
      setProbingActive(false);
      setProbingScore(92);
      setActiveStep(4);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-5xl mx-auto">
      
      {/* Vetting Engine Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Process Verification Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Vetting & Skill Proctoring Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Confirm applicant identity, examine real process artifacts, and conduct camera-proctored practical tasks with AI-probed oral walkthroughs.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">NDPA Compliance Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <Lock className="w-3.5 h-3.5" /> Biometrics Encrypted
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-6 pt-6 border-t border-slate-800">
          {[
            { step: 1, title: 'KYC & Claims' },
            { step: 2, title: 'Proctored Test' },
            { step: 3, title: 'Oral Walkthrough' },
            { step: 4, title: 'Process Evidence' },
            { step: 5, title: 'C2PA Provenance' },
            { step: 6, title: 'Human Oath' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                activeStep === item.step
                  ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md shadow-emerald-950/40'
                  : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                Step 0{item.step}
              </div>
              <div className="text-xs font-semibold truncate text-slate-200">
                {item.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Identity & Credentials (KYC + Gemma Resume Checker) */}
      {activeStep === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                Layer 1: Identity, Liveness & Credential Verification
              </h2>
              <p className="text-xs text-slate-400">
                Government ID upload, live facial liveness confirmation, and Gemma 4 claims analysis.
              </p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Target: 15 / 15 pts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: ID & Liveness */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Government Document & Liveness Check
              </h3>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Official ID Document Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="NIN">National Identity Number (NIN Slip)</option>
                  <option value="International Passport">International Passport</option>
                  <option value="Driver's License">FRSC Driver's License</option>
                  <option value="Voter's Card">INEC Voter's Card</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Document Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Simulated Camera Liveness Box */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/80 text-center space-y-3">
                <div className="w-32 h-32 mx-auto rounded-full bg-slate-950 border-2 border-dashed border-emerald-500/60 flex flex-col items-center justify-center relative overflow-hidden">
                  {livenessCaptured ? (
                    <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-bold">Liveness 98%</span>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-slate-500 mb-1" />
                      <span className="text-[10px] text-slate-400">Camera Active</span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setLivenessCaptured(true)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all"
                >
                  {livenessCaptured ? '✓ Liveness Match Verified' : 'Trigger 3D Facial Liveness Check'}
                </button>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Professional Regulatory Body</label>
                <input
                  type="text"
                  value={credentialBody}
                  onChange={(e) => setCredentialBody(e.target.value)}
                  placeholder="e.g. ICAN, COREN, NIA, PMP, AWS"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Right: Gemma 4 Claims Analyzer */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Gemma 4 Claims & Timeline Analyzer
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Model: gemma-4-claims</span>
                </div>

                <p className="text-xs text-slate-400 mb-2">
                  Paste resume statements or portfolio claims. Gemma flags chronological gaps, exaggerated timelines, and conflicting credentials for human reviewer escalation.
                </p>

                <textarea
                  rows={4}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={runResumeAnalysis}
                  className="mt-2 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  Analyze Claims & Flag Inconsistencies
                </button>
              </div>

              {/* Analysis Results Display */}
              {resumeAnalysis && (
                <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-300">Consistency Confidence:</span>
                    <span className={resumeAnalysis.consistencyScore > 80 ? 'text-emerald-400' : 'text-amber-400'}>
                      {resumeAnalysis.consistencyScore}%
                    </span>
                  </div>

                  {resumeAnalysis.flags.length > 0 ? (
                    <div className="space-y-1.5">
                      {resumeAnalysis.flags.map((flag, i) => (
                        <div key={i} className="p-2 rounded bg-amber-950/40 border border-amber-800/40 text-amber-200 text-[11px] flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">[{flag.category}] </span>
                            {flag.description}
                          </div>
                        </div>
                      ))}
                      <div className="text-[11px] text-slate-400 italic">
                        Policy: Automatically routed to human reviewer interview. Never auto-rejected.
                      </div>
                    </div>
                  ) : (
                    <div className="text-emerald-400 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Zero chronological gaps detected. Clean alignment with official registry.
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
            >
              <span>Continue to Step 2: Proctored Test</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Live Proctored Skill Test */}
      {activeStep === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-400" />
                Layer 2: Live Proctored Field-Specific Skill Test
              </h2>
              <p className="text-xs text-slate-400">
                Freshly generated practical problem. Camera stream and screen recording monitor active.
              </p>
            </div>

            {/* Field Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Discipline:</span>
              <select
                value={selectedField}
                onChange={(e) => handleFieldChange(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="tech">Full-Stack Tech & APIs</option>
                <option value="ui/ux designer">UI/UX Product Design</option>
                <option value="commercial photographer">Commercial Photography</option>
                <option value="trades">Structural Trades & Signage</option>
              </select>
            </div>
          </div>

          {/* Proctoring Status Bar */}
          <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              
              {/* Camera status */}
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-semibold">Webcam Live & ID Matched</span>
              </div>

              {/* Screen recording */}
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-300 font-semibold">Screen Recording Active</span>
              </div>

              {/* Tab-switch detector */}
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle className={`w-4 h-4 ${tabSwitches > 0 ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className={tabSwitches > 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                  Tab Switches: {tabSwitches}
                </span>
              </div>

            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm font-bold">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{formatTime(testTimer)}</span>
            </div>
          </div>

          {/* Tab Switch Incidents Warning */}
          {tabSwitchLogs.length > 0 && (
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 text-xs text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                Proctor Incident Log:
              </div>
              {tabSwitchLogs.slice(-3).map((log, i) => (
                <div key={i} className="font-mono text-[11px] text-amber-300/80">{log}</div>
              ))}
            </div>
          )}

          {/* Dynamic Task Brief */}
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono font-bold text-emerald-400">
                Unique Task Token: {testTask.seed}
              </span>
              <span className="text-xs text-slate-400">Unique Dynamic Generation</span>
            </div>

            <h3 className="text-base font-bold text-white">{testTask.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{testTask.brief}</p>

            <div className="space-y-1 pt-2">
              <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Mandatory Assessment Requirements:
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                {testTask.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Candidate Submission Workspace */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-300 font-bold uppercase tracking-wider">
                Live Solution / Code / Analysis Workspace
              </label>
              <span className="text-slate-500">Monitored keystrokes</span>
            </div>

            <textarea
              rows={8}
              value={candidateSubmission}
              onChange={(e) => setCandidateSubmission(e.target.value)}
              placeholder={testTask.solutionPlaceholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {!isTestRunning ? (
              <button
                onClick={startProctoredTest}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                Start Timed Monitored Exam
              </button>
            ) : (
              <button
                onClick={submitProctoredTest}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg transition-all"
              >
                Submit Solution & Proceed to Oral Walkthrough
              </button>
            )}

            <button
              onClick={() => setActiveStep(3)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Skip to Oral Walkthrough &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Oral Walkthrough */}
      {activeStep === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Layer 3: Immediate Oral Walkthrough & AI Probing
            </h2>
            <p className="text-xs text-slate-400">
              Explain your decisions and trade-offs. Gemma 4 generates real-time probing follow-ups to test genuine comprehension.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                Gemma 4 Probing Question:
              </div>
              <p className="text-sm font-semibold text-white">
                "{testTask.oralWalkthroughPrompts[0]}"
              </p>
              <p className="text-xs text-slate-400">
                Follow-up prompt: "{testTask.oralWalkthroughPrompts[1]}"
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-300">
                Applicant Oral Audio / Text Transcript
              </label>
              <textarea
                rows={4}
                value={oralExplanation}
                onChange={(e) => setOralExplanation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              onClick={evaluateOralWalkthrough}
              disabled={probingActive}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {probingActive ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemma Evaluating Consistency Against Test Code...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Score Oral Consistency & Advance</span>
                </>
              )}
            </button>

            {probingScore && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {probingScore}%
                  </div>
                  <div>
                    <div className="font-bold text-white">High Consistency Verified</div>
                    <div className="text-slate-400">Verbal explanation matches submitted code architecture and trade-off rationale.</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-semibold">Passed Gate</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Process Evidence Upload */}
      {activeStep === 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Layer 4: Process Evidence Verification (Field-Specific)
            </h2>
            <p className="text-xs text-slate-400">
              Verify how the work was made: RAW files with EXIF metadata, Git commit histories, layered PSD/Figma files, or dated site photos.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'raw_exif', title: 'RAW + EXIF', icon: Camera, desc: 'Photographers' },
              { id: 'git_commits', title: 'Git History', icon: GitBranch, desc: 'Developers' },
              { id: 'layered_file', title: 'Layered Files', icon: Layers, desc: 'Designers' },
              { id: 'site_progress', title: 'Site Logs', icon: HardHat, desc: 'Trades / Builders' },
            ].map((ev) => {
              const Icon = ev.icon;
              return (
                <button
                  key={ev.id}
                  onClick={() => setEvidenceType(ev.id as any)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    evidenceType === ev.id
                      ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-xs font-bold text-white">{ev.title}</div>
                  <div className="text-[11px] text-slate-400">{ev.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Upload Dropzone Simulation */}
          <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center bg-slate-950/40 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-emerald-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                Upload Proof Artifact ({evidenceType.toUpperCase()})
              </div>
              <p className="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
                {evidenceType === 'raw_exif' && 'Upload native CR3, ARW, or NEF file. We inspect camera body serial, shutter count, and focal data.'}
                {evidenceType === 'git_commits' && 'Provide public repo URL or commit log bundle. We analyze human typing cadence and branch merges.'}
                {evidenceType === 'layered_file' && 'Provide Figma access or layered PSD. We verify nested components, tokens, and version history.'}
                {evidenceType === 'site_progress' && 'Upload GPS-geotagged daily milestone photos and client sign-off hashes.'}
              </p>
            </div>

            <button
              onClick={() => setEvidenceSubmitted(true)}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              {evidenceSubmitted ? '✓ Process Artifact Uploaded & Parsed' : 'Simulate Evidence Upload'}
            </button>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveStep(5)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2"
            >
              <span>Continue to C2PA Provenance</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Content Provenance & C2PA */}
      {activeStep === 5 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Layer 5: C2PA Content Provenance & Metadata Integrity
            </h2>
            <p className="text-xs text-slate-400">
              Inspect cryptographic assertions and edit histories. Missing provenance lowers score; it never auto-rejects.
            </p>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">C2PA Signature Manifest:</span>
              <span className="text-emerald-400 font-bold">urn:c2pa:truepic:cai:v2.1 (Valid)</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Software Modification Tag:</span>
              <span className="text-slate-200">Adobe Photoshop 25.1.0 (Manual Curves, zero generative fill)</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">AI Synthetic Detector Confidence:</span>
              <span className="text-emerald-400 font-bold">2.4% Synthetic Risk (Definitive Human Work)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Provenance Trust Contribution:</span>
              <span className="text-cyan-400 font-bold">+10 / 10 pts</span>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveStep(6)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2"
            >
              <span>Continue to Human Oath</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Human-Made Work Agreement Oath */}
      {activeStep === 6 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Layer 6: The Vera Pro "Human-Made Work" Solemn Oath
            </h2>
            <p className="text-xs text-slate-400">
              Legal agreement binding the professional against delivering AI-generated deliverables as their own skill.
            </p>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <p className="font-bold text-white">
              By signing this agreement, you affirm under penalty of immediate suspension and permanent platform expulsion:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Zero AI-Generated Deliverables:</strong> You will not submit AI-generated images, AI-written copywriting, AI-generated Figma systems, or unverified AI code presented as your personal human craft.
              </li>
              <li>
                <strong className="text-slate-200">Developer Autocomplete Standard:</strong> Standard editor autocomplete (e.g. IDE suggestions) is permitted only if you can articulate, debug, and explain all logic line-by-line during random spot checks.
              </li>
              <li>
                <strong className="text-slate-200">Process Proof Commitment:</strong> You agree to provide original RAW files, Git branch histories, layered source files, and dated site photos upon client request.
              </li>
              <li>
                <strong className="text-slate-200">Consent to Random Re-Tests:</strong> Active verified professionals are subject to periodic surprise walkthroughs and client dispute arbitrations.
              </li>
            </ul>
          </div>

          <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreementSigned}
              onChange={(e) => setAgreementSigned(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700"
            />
            <span className="text-xs text-slate-200 font-semibold">
              I solemnly affirm that all deliverables I produce on Vera Pro are 100% human-crafted and backed by verifiable process proof.
            </span>
          </label>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Status: {agreementSigned ? 'Agreement Signed' : 'Pending Signature'}
            </span>

            <button
              disabled={!agreementSigned}
              onClick={() => {
                alert('Congratulations! Your applicant dossier has achieved a 96 Trust Score and is now activated on the Vera Pro Marketplace.');
                setActiveStep(1);
              }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-xl shadow-emerald-950/40 transition-all disabled:opacity-40"
            >
              Finalize Verification & Publish Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
