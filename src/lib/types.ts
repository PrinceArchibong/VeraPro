export type UserRole = 'client' | 'professional' | 'admin';

export type ProfessionalCategory = 'trades' | 'tech' | 'design' | 'creative' | 'services';

export type TrustTier = 'Verified' | 'Senior' | 'Expert';

export type PenaltyStatus = 'none' | 'warning' | 'badge_removed' | 'suspended' | 'banned';

export interface TrustScoreBreakdown {
  overall: number; // 0 - 100
  identityScore: number; // /15
  credentialsScore: number; // /15
  testScore: number; // /25 (practical + oral)
  processEvidenceScore: number; // /20
  provenanceScore: number; // /10
  referenceScore: number; // /5
  clientReviewScore: number; // /10
  lastReTestDate?: string;
  reTestStatus?: 'current' | 'due' | 'overdue';
}

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
  photoURL?: string;
  phone?: string;
  city?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessEvidenceItem {
  id: string;
  uid: string;
  title: string;
  type: 'raw_exif' | 'git_commits' | 'layered_file' | 'draft_revisions' | 'site_progress';
  artifactUrl: string;
  thumbnailUrl?: string;
  summary: string;
  metadata: {
    cameraModel?: string;
    lens?: string;
    exposure?: string;
    iso?: number;
    rawFormat?: string; // CR3, NEF, ARW, DNG
    dateCaptured?: string;
    gitRepoUrl?: string;
    commitCount?: number;
    typingCadenceAnalysis?: string;
    psdLayersCount?: number;
    figmaComponentCount?: number;
    versionHistorySteps?: number;
    siteGpsCoords?: string;
    siteTimestamp?: string;
    clientConfirmationHash?: string;
  };
  c2paVerified: boolean;
  c2paIssuer?: string;
  aiConfidenceRisk: number; // 0 (definitely human) to 100 (high synthetic suspicion)
  rating: 'strong' | 'partial' | 'none';
  verified: boolean;
  createdAt: string;
}

export interface ProfessionalProfile {
  uid: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  category: ProfessionalCategory;
  field: string;
  specialization: string;
  tier: TrustTier;
  trustScore: number;
  trustBreakdown: TrustScoreBreakdown;
  bio: string;
  hourlyRate: number;
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR';
  city: string;
  country: string;
  isRemoteCapable: boolean;
  humanMadeAgreementSigned: boolean;
  kycVerified: boolean;
  credentialsVerified: boolean;
  credentialsList: {
    name: string; // e.g. "ICAN Certified Fellow", "COREN Registered Engineer"
    issuer: string;
    regNumber: string;
    verified: boolean;
    verificationDate: string;
  }[];
  testPassed: boolean;
  walkthroughCompleted: boolean;
  processEvidenceVerified: boolean;
  provenanceVerified: boolean;
  completedJobsCount: number;
  averageRating: number;
  penaltyStatus: PenaltyStatus;
  evidenceItems: ProcessEvidenceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface VerificationRecord {
  id: string;
  uid: string;
  applicantName: string;
  idType: 'NIN' | 'International Passport' | "Driver's License" | "Voter's Card";
  idNumberMasked: string;
  livenessConfidence: number;
  livenessPassed: boolean;
  credentialBodies: string;
  resumeClaimsFlags: string[];
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  reviewedBy?: string;
  reviewNotes?: string;
  createdAt: string;
}

export interface ProctoredTestSession {
  id: string;
  uid: string;
  field: string;
  taskBrief: string;
  taskRequirements: string[];
  rubricCriteria: { name: string; maxPoints: number; pointsAwarded?: number; feedback?: string }[];
  timeLimitMinutes: number;
  timeRemainingSeconds: number;
  tabSwitches: number;
  tabSwitchLogs: { timestamp: string; event: string }[];
  screenRecordingActive: boolean;
  cameraStreamActive: boolean;
  practicalSubmission: string;
  oralQuestions: string[];
  oralResponses: { question: string; response: string; probingFollowUp: string; proResponse: string }[];
  consistencyScore: number;
  reviewerVerdict: 'pending' | 'pass' | 'borderline_review' | 'fail';
  score: number;
  createdAt: string;
}

export interface JobPosting {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  category: ProfessionalCategory;
  field: string;
  budget: number;
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR';
  deadline: '24_hours' | '3_days' | '1_week' | '2_weeks' | '1_month';
  city: string;
  country: string;
  remoteAllowed: boolean;
  requiredTier: TrustTier;
  minTrustScore: number;
  status: 'open' | 'assigned' | 'in_escrow' | 'completed' | 'disputed' | 'cancelled';
  hiredProfessionalId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EscrowMilestone {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'in_progress' | 'submitted_with_proof' | 'approved_released' | 'disputed';
  proofDescription?: string;
  evidenceUrl?: string;
  c2paCheckPassed?: boolean;
}

export interface EscrowTransaction {
  id: string;
  type: 'deposit' | 'lock' | 'release' | 'withdrawal' | 'refund';
  title: string;
  amount: number;
  currency?: 'NGN' | 'USD' | 'GBP' | 'EUR';
  provider?: string;
  status: 'completed' | 'processing' | 'failed';
  reference: string;
  date: string;
  bankDetails?: string;
  recipient?: string;
  milestoneTitle?: string;
  reason?: string;
}

export interface EscrowContract {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  professionalId: string;
  professionalName: string;
  amount: number;
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR';
  provider: 'Paystack' | 'Flutterwave' | 'Remita' | 'VeraVault';
  status: 'funded' | 'in_progress' | 'milestone_submitted' | 'client_confirmed' | 'released' | 'disputed' | 'refunded';
  milestones: EscrowMilestone[];
  disputeReason?: string;
  disputeEvidence?: string;
  arbitrationVerdict?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportCase {
  id: string;
  reporterId: string;
  reporterName: string;
  professionalId: string;
  professionalName: string;
  jobId?: string;
  category: 'suspected_ai_deliverable' | 'falsified_credentials' | 'test_dishonesty' | 'abandonment' | 'other';
  evidenceDescription: string;
  status: 'open' | 'investigating' | 'resolved_penalty' | 'resolved_dismissed' | 'under_appeal';
  penalty: PenaltyStatus;
  appealNotes?: string;
  assignedReviewer?: string;
  createdAt: string;
}

export interface PastReference {
  id: string;
  professionalId: string;
  clientName: string;
  clientContact: string;
  companyName: string;
  projectDescription: string;
  verificationStatus: 'pending_contact' | 'confirmed_positive' | 'neutral' | 'flagged_fake';
  callNotes: string;
  rating: number;
  verifiedAt: string;
}
