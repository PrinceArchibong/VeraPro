import { ProfessionalProfile, JobPosting, EscrowContract, VerificationRecord, ProctoredTestSession, ReportCase, PastReference } from './types';

export const SEED_PROFESSIONALS: ProfessionalProfile[] = [
  {
    uid: 'pro-chukwudi-dev',
    displayName: 'Chukwudi Eze',
    email: 'c.eze@verapro.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    category: 'tech',
    field: 'Distributed Systems & Full-Stack',
    specialization: 'High-Throughput Node.js/Go, Escrow Ledgers, FinTech APIs',
    tier: 'Senior',
    trustScore: 96,
    trustBreakdown: {
      overall: 96,
      identityScore: 15,
      credentialsScore: 14,
      testScore: 24,
      processEvidenceScore: 20,
      provenanceScore: 10,
      referenceScore: 5,
      clientReviewScore: 9,
      lastReTestDate: '2026-10-12',
      reTestStatus: 'current'
    },
    bio: '11 years building fault-tolerant backend architectures and financial settlement engines. Live-tested with monitored code execution and Git commit history analysis. Committed to 100% human-crafted engineering.',
    hourlyRate: 35000,
    currency: 'NGN',
    city: 'Lagos',
    country: 'Nigeria',
    isRemoteCapable: true,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: true,
    credentialsList: [
      { name: 'AWS Certified Solutions Architect - Professional', issuer: 'Amazon Web Services', regNumber: 'AWS-PRO-984120', verified: true, verificationDate: '2026-04-10' },
      { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF / Linux Foundation', regNumber: 'CKA-82194', verified: true, verificationDate: '2026-06-18' }
    ],
    testPassed: true,
    walkthroughCompleted: true,
    processEvidenceVerified: true,
    provenanceVerified: true,
    completedJobsCount: 42,
    averageRating: 4.9,
    penaltyStatus: 'none',
    evidenceItems: [
      {
        id: 'ev-git-eze',
        uid: 'pro-chukwudi-dev',
        title: 'Microservices Ledger Git Commit Chain',
        type: 'git_commits',
        artifactUrl: 'https://github.com/chukwudi-verapro/ledger-core',
        summary: 'Non-linear human commit cadence across 64 commits with detailed commit messages, verified human typing rhythm, and branch merges.',
        metadata: {
          gitRepoUrl: 'github.com/chukwudi-verapro/ledger-core',
          commitCount: 64,
          typingCadenceAnalysis: 'Plausible human keystroke bursts: 42-68 WPM, realistic refactoring pauses between commits'
        },
        c2paVerified: true,
        aiConfidenceRisk: 4,
        rating: 'strong',
        verified: true,
        createdAt: '2026-10-14'
      }
    ],
    createdAt: '2025-11-01',
    updatedAt: '2026-11-01'
  },
  {
    uid: 'pro-kabir-trades',
    displayName: 'Engr. Alhaji Kabir Danjuma',
    email: 'k.danjuma@verapro.trade',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    category: 'trades',
    field: 'Structural Construction & High-Wind Signage',
    specialization: 'Steel Fabrication, Highway Cantilever Gantry, Maritime Anchor Systems',
    tier: 'Expert',
    trustScore: 98,
    trustBreakdown: {
      overall: 98,
      identityScore: 15,
      credentialsScore: 15,
      testScore: 25,
      processEvidenceScore: 20,
      provenanceScore: 9,
      referenceScore: 5,
      clientReviewScore: 10,
      lastReTestDate: '2026-10-28',
      reTestStatus: 'current'
    },
    bio: 'COREN-registered structural engineer with 18 years erecting high-wind signage, billboard gantries, and architectural steel canopies across coastal Nigeria. Every site milestone is verified with timestamped GPS photos and torque checks.',
    hourlyRate: 50000,
    currency: 'NGN',
    city: 'Lagos',
    country: 'Nigeria',
    isRemoteCapable: false,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: true,
    credentialsList: [
      { name: 'COREN Registered Structural Engineer', issuer: 'Council for the Regulation of Engineering in Nigeria', regNumber: 'R.32981/ENG', verified: true, verificationDate: '2026-01-15' },
      { name: 'Nigerian Society of Engineers (FNSE)', issuer: 'NSE', regNumber: 'FNSE-14209', verified: true, verificationDate: '2026-02-20' }
    ],
    testPassed: true,
    walkthroughCompleted: true,
    processEvidenceVerified: true,
    provenanceVerified: true,
    completedJobsCount: 88,
    averageRating: 5.0,
    penaltyStatus: 'none',
    evidenceItems: [
      {
        id: 'ev-site-kabir',
        uid: 'pro-kabir-trades',
        title: 'Lekki Toll Plaza 16m Gantry Steel Progress Log',
        type: 'site_progress',
        artifactUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
        summary: 'Progressive daily site photography series showing Grade 316 stainless anchor bolt casting, Ultrasonic weld inspection certificates, and client site handover.',
        metadata: {
          siteGpsCoords: '6.4385° N, 3.4860° E (Lekki Phase 1)',
          siteTimestamp: '2026-10-18T14:32:00WAT',
          clientConfirmationHash: 'VERA-SITE-CONFIRM-9182'
        },
        c2paVerified: true,
        aiConfidenceRisk: 2,
        rating: 'strong',
        verified: true,
        createdAt: '2026-10-19'
      }
    ],
    createdAt: '2025-08-15',
    updatedAt: '2026-11-04'
  },
  {
    uid: 'pro-amina-design',
    displayName: 'Amina Bello',
    email: 'amina.bello@verapro.design',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    category: 'design',
    field: 'UI/UX & Product Design Systems',
    specialization: 'Design Tokens, Multi-Brand Systems, WCAG AAA Accessibility',
    tier: 'Senior',
    trustScore: 95,
    trustBreakdown: {
      overall: 95,
      identityScore: 15,
      credentialsScore: 14,
      testScore: 24,
      processEvidenceScore: 19,
      provenanceScore: 10,
      referenceScore: 5,
      clientReviewScore: 9,
      lastReTestDate: '2026-09-29',
      reTestStatus: 'current'
    },
    bio: 'Lead product designer specializing in complex fintech dashboards and low-bandwidth inclusive mobile apps. Verified layered Figma files with version histories from low-fidelity wireframes to design tokens.',
    hourlyRate: 28000,
    currency: 'NGN',
    city: 'Abuja',
    country: 'Nigeria',
    isRemoteCapable: true,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: true,
    credentialsList: [
      { name: 'Nielsen Norman Group UX Master Certified', issuer: 'NN/g', regNumber: 'NNG-UXM-7712', verified: true, verificationDate: '2026-03-14' }
    ],
    testPassed: true,
    walkthroughCompleted: true,
    processEvidenceVerified: true,
    provenanceVerified: true,
    completedJobsCount: 31,
    averageRating: 4.9,
    penaltyStatus: 'none',
    evidenceItems: [
      {
        id: 'ev-figma-amina',
        uid: 'pro-amina-design',
        title: 'VeriPay Design System Component Tree',
        type: 'layered_file',
        artifactUrl: 'https://www.figma.com/design/sample-veripay-system',
        summary: 'Layered Figma workspace containing 184 reusable component variants, auto-layout tokens, and 23 historical version checkpoints.',
        metadata: {
          figmaComponentCount: 184,
          versionHistorySteps: 23,
          psdLayersCount: 420
        },
        c2paVerified: true,
        aiConfidenceRisk: 5,
        rating: 'strong',
        verified: true,
        createdAt: '2026-10-21'
      }
    ],
    createdAt: '2026-01-10',
    updatedAt: '2026-11-02'
  },
  {
    uid: 'pro-femi-photo',
    displayName: 'Femi Adeyemi',
    email: 'femi.shots@verapro.art',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    category: 'creative',
    field: 'Commercial & Architectural Photography',
    specialization: 'High-Res Architecture, Commercial Products, RAW Non-Destructive Color',
    tier: 'Verified',
    trustScore: 94,
    trustBreakdown: {
      overall: 94,
      identityScore: 15,
      credentialsScore: 12,
      testScore: 23,
      processEvidenceScore: 20,
      provenanceScore: 10,
      referenceScore: 5,
      clientReviewScore: 9,
      lastReTestDate: '2026-10-04',
      reTestStatus: 'current'
    },
    bio: 'Professional architectural photographer. We provide native Canon CR3 RAW files alongside every deliverable. EXIF sensor serial numbers and C2PA Content Credentials strictly verified.',
    hourlyRate: 30000,
    currency: 'NGN',
    city: 'Lagos',
    country: 'Nigeria',
    isRemoteCapable: false,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: true,
    credentialsList: [
      { name: 'Certified Professional Photographer (CPP)', issuer: 'Professional Photographers Association', regNumber: 'PPA-99120', verified: true, verificationDate: '2026-02-11' }
    ],
    testPassed: true,
    walkthroughCompleted: true,
    processEvidenceVerified: true,
    provenanceVerified: true,
    completedJobsCount: 26,
    averageRating: 4.8,
    penaltyStatus: 'none',
    evidenceItems: [
      {
        id: 'ev-raw-femi',
        uid: 'pro-femi-photo',
        title: 'Zenith Headquarters Sunset Architecture RAW Dossier',
        type: 'raw_exif',
        artifactUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
        summary: 'Original 45-Megapixel Canon CR3 RAW exposure. Validated sensor serial, ISO 100, 1/160s, f/8, with authentic Adobe C2PA cryptographic signature.',
        metadata: {
          cameraModel: 'Canon EOS R5',
          lens: 'Canon RF 15-35mm f/2.8L IS USM',
          exposure: '1/160s at f/8.0',
          iso: 100,
          rawFormat: 'Canon CR3 Uncompressed',
          dateCaptured: '2026-10-24T18:14:02WAT'
        },
        c2paVerified: true,
        c2paIssuer: 'Content Authenticity Initiative (CAI) - Truepic Manifest',
        aiConfidenceRisk: 1,
        rating: 'strong',
        verified: true,
        createdAt: '2026-10-25'
      }
    ],
    createdAt: '2026-02-14',
    updatedAt: '2026-11-05'
  },
  {
    uid: 'pro-ngozi-finance',
    displayName: 'Ngozi Okonjo-Nwosu, FCA',
    email: 'ngozi.audit@verapro.biz',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    category: 'services',
    field: 'ICAN Chartered Accountant & Corporate Finance',
    specialization: 'Statutory Audits, IFRS Compliance, Tax Strategy, Land Banking Due Diligence',
    tier: 'Expert',
    trustScore: 99,
    trustBreakdown: {
      overall: 99,
      identityScore: 15,
      credentialsScore: 15,
      testScore: 25,
      processEvidenceScore: 20,
      provenanceScore: 10,
      referenceScore: 5,
      clientReviewScore: 10,
      lastReTestDate: '2026-10-30',
      reTestStatus: 'current'
    },
    bio: 'Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) with 16 years handling corporate financial models, forensic ledger reconciliation, and commercial real estate title audits.',
    hourlyRate: 60000,
    currency: 'NGN',
    city: 'Port Harcourt',
    country: 'Nigeria',
    isRemoteCapable: true,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: true,
    credentialsList: [
      { name: 'Fellow Chartered Accountant (FCA)', issuer: 'Institute of Chartered Accountants of Nigeria (ICAN)', regNumber: 'ICAN/FCA/01928', verified: true, verificationDate: '2025-10-02' },
      { name: 'Chartered Institute of Taxation of Nigeria (ACTI)', issuer: 'CITN', regNumber: 'CITN-8812', verified: true, verificationDate: '2025-11-19' }
    ],
    testPassed: true,
    walkthroughCompleted: true,
    processEvidenceVerified: true,
    provenanceVerified: true,
    completedJobsCount: 54,
    averageRating: 5.0,
    penaltyStatus: 'none',
    evidenceItems: [
      {
        id: 'ev-audit-ngozi',
        uid: 'pro-ngozi-finance',
        title: 'IFRS 16 Leasehold Asset Model & Audit Working Papers',
        type: 'draft_revisions',
        artifactUrl: 'https://verapro.finance/audits/ifrs-16-working-papers.pdf',
        summary: 'Complete spreadsheet formulas and working papers with 14 tracked review annotations and cross-referenced bank settlement statements.',
        metadata: {
          versionHistorySteps: 14,
          clientConfirmationHash: 'ICAN-AUDIT-VERA-7821'
        },
        c2paVerified: true,
        aiConfidenceRisk: 3,
        rating: 'strong',
        verified: true,
        createdAt: '2026-10-27'
      }
    ],
    createdAt: '2025-06-20',
    updatedAt: '2026-11-03'
  },
  {
    uid: 'pro-babatunde-yellow',
    displayName: 'Babatunde Lawal',
    email: 'b.lawal@verapro.trade',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    category: 'trades',
    field: 'Electrical & Illuminated Signage Systems',
    specialization: 'High-Voltage Neon, LED Matrix Drivers, Conduit Safety',
    tier: 'Verified',
    trustScore: 72,
    trustBreakdown: {
      overall: 72,
      identityScore: 15,
      credentialsScore: 10,
      testScore: 18,
      processEvidenceScore: 14,
      provenanceScore: 6,
      referenceScore: 4,
      clientReviewScore: 5,
      lastReTestDate: '2026-08-11',
      reTestStatus: 'due'
    },
    bio: 'Licensed electrical and billboard illumination technician with 7 years installing commercial LED arrays and perimeter pylons across Ikeja and Surulere. Undergoing periodic oral spot check.',
    hourlyRate: 22000,
    currency: 'NGN',
    city: 'Lagos',
    country: 'Nigeria',
    isRemoteCapable: false,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: true,
    credentialsList: [
      { name: 'NEMSA Electrical Installation License', issuer: 'Nigerian Electricity Management Services Agency', regNumber: 'NEMSA-LIC-44102', verified: true, verificationDate: '2025-11-08' }
    ],
    testPassed: true,
    walkthroughCompleted: true,
    processEvidenceVerified: true,
    provenanceVerified: false,
    completedJobsCount: 14,
    averageRating: 4.5,
    penaltyStatus: 'none',
    evidenceItems: [
      {
        id: 'ev-site-lawal',
        uid: 'pro-babatunde-yellow',
        title: 'Ikeja Mall External LED Pylon Installation Log',
        type: 'site_progress',
        artifactUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=800&auto=format&fit=crop&q=80',
        summary: 'Photographs of cable continuity tests and 3-phase distribution box wiring with timestamp logs.',
        metadata: {
          siteGpsCoords: '6.5964° N, 3.3515° E (Ikeja)',
          siteTimestamp: '2026-09-14T11:20:00WAT',
          clientConfirmationHash: 'VERA-SITE-CONFIRM-3391'
        },
        c2paVerified: false,
        aiConfidenceRisk: 12,
        rating: 'partial',
        verified: true,
        createdAt: '2026-09-15'
      }
    ],
    createdAt: '2026-03-01',
    updatedAt: '2026-11-01'
  },
  {
    uid: 'pro-temp-suspect',
    displayName: 'Tunde Bakare (Under Appeal)',
    email: 'tunde.vectors@verapro.art',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    category: 'design',
    field: 'Commercial Vector Illustrations',
    specialization: 'Corporate Mascots & Brand Identity',
    tier: 'Verified',
    trustScore: 48,
    trustBreakdown: {
      overall: 48,
      identityScore: 15,
      credentialsScore: 5,
      testScore: 12,
      processEvidenceScore: 6,
      provenanceScore: 2,
      referenceScore: 3,
      clientReviewScore: 5,
      lastReTestDate: '2026-05-19',
      reTestStatus: 'overdue'
    },
    bio: 'Illustrator and identity designer. Currently undergoing senior Trust & Safety review regarding delivered campaign assets.',
    hourlyRate: 15000,
    currency: 'NGN',
    city: 'Lagos',
    country: 'Nigeria',
    isRemoteCapable: true,
    humanMadeAgreementSigned: true,
    kycVerified: true,
    credentialsVerified: false,
    credentialsList: [],
    testPassed: true,
    walkthroughCompleted: false,
    processEvidenceVerified: false,
    provenanceVerified: false,
    completedJobsCount: 8,
    averageRating: 3.8,
    penaltyStatus: 'badge_removed',
    evidenceItems: [
      {
        id: 'ev-vector-tunde',
        uid: 'pro-temp-suspect',
        title: 'Questioned Vector Raster Deliverable',
        type: 'layered_file',
        artifactUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        summary: 'Flattened raster image inside SVG container. Lacks independent vector anchor points; high AI detection signal flagged by client.',
        metadata: {
          psdLayersCount: 1,
          versionHistorySteps: 1
        },
        c2paVerified: false,
        aiConfidenceRisk: 88,
        rating: 'none',
        verified: false,
        createdAt: '2026-10-28'
      }
    ],
    createdAt: '2026-04-12',
    updatedAt: '2026-10-30'
  }
];

export const SEED_JOBS: JobPosting[] = [
  {
    id: 'job-signage-01',
    clientId: 'client-gtb-marketing',
    clientName: 'GTBank Retail Marketing Team',
    title: 'High-Wind Cantilever Signage Installation on Ozumba Mbadiwe',
    description: 'We require a verified structural contractor to erect a 14m x 5m illuminated highway signage structure in Victoria Island. High wind resistance required. Must supply dated site inspection photos, anchor tensile certifications, and client sign-off.',
    category: 'trades',
    field: 'Structural Construction & High-Wind Signage',
    budget: 3800000,
    currency: 'NGN',
    deadline: '2_weeks',
    city: 'Lagos',
    country: 'Nigeria',
    remoteAllowed: false,
    requiredTier: 'Expert',
    minTrustScore: 92,
    status: 'in_escrow',
    hiredProfessionalId: 'pro-kabir-trades',
    createdAt: '2026-10-28',
    updatedAt: '2026-11-02'
  },
  {
    id: 'job-fintech-ledger',
    clientId: 'client-payfusion',
    clientName: 'PayFusion Africa Ltd',
    title: 'Multi-Currency Escrow Settlement Engine Code Audit & Refactor',
    description: 'Looking for a Senior Backend Systems Engineer to audit our double-entry escrow disbursement microservice. Needs to eliminate concurrent race condition locks and implement idempotent API endpoints. Proof of Git commits and live code walkthrough required.',
    category: 'tech',
    field: 'Distributed Systems & Full-Stack',
    budget: 1850000,
    currency: 'NGN',
    deadline: '1_week',
    city: 'Lagos',
    country: 'Nigeria',
    remoteAllowed: true,
    requiredTier: 'Senior',
    minTrustScore: 90,
    status: 'assigned',
    hiredProfessionalId: 'pro-chukwudi-dev',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-03'
  },
  {
    id: 'job-realestate-audit',
    clientId: 'client-evex-holdings',
    clientName: 'Evex Land Capital',
    title: 'Epe Land Banking Portfolio Title Verification & Tax Audit',
    description: 'Need an ICAN Fellow Chartered Accountant to review 42 cadastral survey files, assess capital gains tax obligations, and certify statutory title records for 120 hectares in Epe axis.',
    category: 'services',
    field: 'ICAN Chartered Accountant & Corporate Finance',
    budget: 2500000,
    currency: 'NGN',
    deadline: '3_days',
    city: 'Lagos',
    country: 'Nigeria',
    remoteAllowed: true,
    requiredTier: 'Expert',
    minTrustScore: 95,
    status: 'open',
    createdAt: '2026-11-04',
    updatedAt: '2026-11-05'
  }
];

export const SEED_ESCROWS: EscrowContract[] = [
  {
    id: 'escrow-ozumba-signage',
    jobId: 'job-signage-01',
    jobTitle: 'High-Wind Cantilever Signage Installation on Ozumba Mbadiwe',
    clientId: 'client-gtb-marketing',
    clientName: 'GTBank Retail Marketing Team',
    professionalId: 'pro-kabir-trades',
    professionalName: 'Engr. Alhaji Kabir Danjuma',
    amount: 3800000,
    currency: 'NGN',
    provider: 'Paystack',
    status: 'milestone_submitted',
    milestones: [
      {
        id: 'm1',
        title: 'Phase 1: Soil Core Sample & Concrete Pad Foundation with GPS Timestamp',
        amount: 1140000,
        status: 'approved_released',
        proofDescription: 'GPS coordinates verified at 6.4385° N, 3.4860° E. Cylinder crush test yielded 32 N/mm².',
        evidenceUrl: 'https://verapro.evidence/m1-foundation-crush.pdf'
      },
      {
        id: 'm2',
        title: 'Phase 2: Grade 316 Stainless Steel Truss Erection & Torque Inspection Log',
        amount: 1520000,
        status: 'submitted_with_proof',
        proofDescription: 'Calibrated torque wrench report for 36 M24 bolts at 420 Nm. Daily progress photos uploaded with C2PA metadata.',
        evidenceUrl: 'https://verapro.evidence/m2-torque-weld-log.pdf'
      },
      {
        id: 'm3',
        title: 'Phase 3: Final Electrical Luminaire Safety & Structural Handover Certificate',
        amount: 1140000,
        status: 'pending'
      }
    ],
    createdAt: '2026-10-29',
    updatedAt: '2026-11-04'
  }
];

export const SEED_VERIFICATION_QUEUE: VerificationRecord[] = [
  {
    id: 'ver-samuel-dev',
    uid: 'pro-applicant-samuel',
    applicantName: 'Samuel Olatunji',
    idType: 'NIN',
    idNumberMasked: '••••-••••-8912',
    livenessConfidence: 94,
    livenessPassed: true,
    credentialBodies: 'B.Sc Computer Science, Unilag 2022',
    resumeClaimsFlags: [
      'Gemma AI flagged: 7 years claimed experience conflicts with 2022 university graduation date.'
    ],
    status: 'flagged',
    reviewedBy: 'arisrael549@gmail.com',
    reviewNotes: 'Flagged by Gemma 4 for timeline gap. Applicant scheduled for oral walkthrough to clarify freelance work during schooling.',
    createdAt: '2026-11-03'
  },
  {
    id: 'ver-fatima-writer',
    uid: 'pro-applicant-fatima',
    applicantName: 'Fatima Abdullahi',
    idType: 'International Passport',
    idNumberMasked: 'A•••••942',
    livenessConfidence: 98,
    livenessPassed: true,
    credentialBodies: 'Chartered Institute of Public Relations (CIPR)',
    resumeClaimsFlags: [],
    status: 'pending',
    reviewNotes: 'Awaiting proctored timed writing task and draft revision proof upload.',
    createdAt: '2026-11-05'
  }
];

export const SEED_TEST_SESSIONS: ProctoredTestSession[] = [
  {
    id: 'test-samuel-01',
    uid: 'pro-applicant-samuel',
    field: 'Full-Stack Developer',
    taskBrief: 'Resolve memory leak in WebSocket connection pool with 5,000 simulated clients.',
    taskRequirements: [
      'Implement heartbeat ping/pong timer cleanup',
      'Remove dead socket handles from WeakSet',
      'Provide oral explanation of V8 heap garbage collection'
    ],
    rubricCriteria: [
      { name: 'Memory Cleanup Accuracy', maxPoints: 40, pointsAwarded: 35, feedback: 'Socket timer was cleaned up on disconnect.' },
      { name: 'Concurrency Handling', maxPoints: 30, pointsAwarded: 24, feedback: 'Slight delay under heavy burst disconnects.' },
      { name: 'Oral Walkthrough Consistency', maxPoints: 30, pointsAwarded: 18, feedback: 'Borderline: candidate struggled to explain why WeakSet does not prevent garbage collection.' }
    ],
    timeLimitMinutes: 45,
    timeRemainingSeconds: 0,
    tabSwitches: 3,
    tabSwitchLogs: [
      { timestamp: '14:12:05', event: 'Browser tab switched to external window (duration 4s)' },
      { timestamp: '14:18:22', event: 'Browser tab switched to external window (duration 2s)' },
      { timestamp: '14:31:09', event: 'Browser lost focus for 7s' }
    ],
    screenRecordingActive: true,
    cameraStreamActive: true,
    practicalSubmission: 'function cleanPool(sockets) { sockets.forEach(s => { clearInterval(s.pingTimer); s.terminate(); }); }',
    oralQuestions: [
      'Why did you choose an interval over a timeout for socket keep-alive?',
      'If 1,000 connections disconnect at once, how does your implementation prevent event loop lag?'
    ],
    oralResponses: [
      {
        question: 'Why did you choose an interval over a timeout for socket keep-alive?',
        response: 'Interval is more convenient because it runs periodically every 30 seconds.',
        probingFollowUp: 'Gemma 4 probe: What happens to intervals if the client closes ungracefully without firing close event?',
        proResponse: 'Candidate: Uh, the interval might keep ticking unless we check socket.readyState === OPEN.'
      }
    ],
    consistencyScore: 68,
    reviewerVerdict: 'borderline_review',
    score: 77,
    createdAt: '2026-11-04'
  }
];

export const SEED_REPORT_CASES: ReportCase[] = [
  {
    id: 'case-rep-102',
    reporterId: 'client-zenith-corp',
    reporterName: 'Zenith Brand Media',
    professionalId: 'pro-temp-suspect',
    professionalName: 'Tunde Bakare (Suspended)',
    jobId: 'job-brand-illustrations',
    category: 'suspected_ai_deliverable',
    evidenceDescription: 'Client commissioned vector illustrations for national billboard campaign. Delivered EPS files showed melted anatomy, mangled 6-finger hands on background extras, and zero vector anchor points (pure raster embedded in SVG container). Detector returned 94% synthetic confidence score.',
    status: 'under_appeal',
    penalty: 'badge_removed',
    appealNotes: 'Professional claims the blurred vector paths were an intentional artistic brush texture, but has not provided layered Figma or Adobe Illustrator source files with history.',
    assignedReviewer: 'arisrael549@gmail.com',
    createdAt: '2026-10-29'
  }
];

export const SEED_REFERENCES: PastReference[] = [
  {
    id: 'ref-kabir-01',
    professionalId: 'pro-kabir-trades',
    clientName: 'Chief Babatunde Adeleke',
    clientContact: '+234 803 219 9001 / b.adeleke@apexrealty.ng',
    companyName: 'Apex Commercial Realty',
    projectDescription: 'Construction of 22m highway unipole billboard gantry along Lekki-Epe expressway.',
    verificationStatus: 'confirmed_positive',
    callNotes: 'Platform agent spoke with Chief Adeleke directly on 2026-10-15. Confirmed project delivered on schedule, passed Lagos State Signage and Advertisement Agency (LASAA) safety audits.',
    rating: 5,
    verifiedAt: '2026-10-15'
  },
  {
    id: 'ref-eze-01',
    professionalId: 'pro-chukwudi-dev',
    clientName: 'Sarah Jenkins',
    clientContact: 's.jenkins@crossborderpay.co.uk',
    companyName: 'CrossBorder Pay UK',
    projectDescription: 'Refactored FX currency conversion router handling £4M daily transactions.',
    verificationStatus: 'confirmed_positive',
    callNotes: 'Verified via direct email and company domain confirmation. Sarah praised Chukwudi’s clean Git branch hygiene and zero production downtime during deployment.',
    rating: 5,
    verifiedAt: '2026-10-18'
  }
];
