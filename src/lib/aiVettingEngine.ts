import { TrustScoreBreakdown, ProcessEvidenceItem } from './types';

// AI Vetting & Verification Engine (Gemma 4 architecture simulation)
export interface ResumeAnalysisResult {
  flags: {
    severity: 'low' | 'medium' | 'high';
    category: string;
    description: string;
    affectedClaim: string;
  }[];
  consistencyScore: number;
  accreditationCheckStatus: 'verified_match' | 'registry_divergence' | 'needs_manual_review';
  recommendation: 'proceed_to_test' | 'request_clarification' | 'escalate_to_fraud_team';
}

export interface GeneratedTestTask {
  fieldId: string;
  category: string;
  seed: string;
  title: string;
  brief: string;
  requirements: string[];
  sampleInput: string;
  solutionPlaceholder: string;
  rubric: { name: string; maxPoints: number; criteria: string }[];
  oralWalkthroughPrompts: string[];
}

export const AI_VETTING_ENGINE = {
  /**
   * Analyzes candidate resume & portfolio claims against official registry patterns
   */
  analyzeResumeClaims: (claimsText: string, credentialBody: string): ResumeAnalysisResult => {
    const textLower = claimsText.toLowerCase();
    const flags: ResumeAnalysisResult['flags'] = [];

    // Check for high-frequency AI generation buzzwords and implausible overlaps
    if (textLower.includes('10+ years') && (textLower.includes('recent graduate') || textLower.includes('2023'))) {
      flags.push({
        severity: 'high',
        category: 'Timeline Inconsistency',
        description: 'Candidate claims 10+ years experience alongside graduation in 2023.',
        affectedClaim: 'Experience duration vs graduation year'
      });
    }

    if (credentialBody === 'ICAN' && !textLower.includes('audit') && !textLower.includes('financial')) {
      flags.push({
        severity: 'medium',
        category: 'Credential Alignment',
        description: 'ICAN membership listed, but portfolio lacks statutory audit or reporting records.',
        affectedClaim: 'ICAN certification relevance'
      });
    }

    if (textLower.includes('full project solo in 2 days') && textLower.includes('enterprise banking')) {
      flags.push({
        severity: 'medium',
        category: 'Plausibility Check',
        description: 'Enterprise core banking engine built solo in 48 hours is statistically improbable without unauthorized template forks.',
        affectedClaim: 'Delivery velocity'
      });
    }

    const consistencyScore = flags.length === 0 ? 96 : Math.max(45, 96 - flags.length * 18);
    const recommendation = flags.some(f => f.severity === 'high') 
      ? 'escalate_to_fraud_team' 
      : flags.length > 0 
      ? 'request_clarification' 
      : 'proceed_to_test';

    return {
      flags,
      consistencyScore,
      accreditationCheckStatus: flags.length === 0 ? 'verified_match' : 'needs_manual_review',
      recommendation
    };
  },

  /**
   * Generates a fresh, dynamic practical task for a specific applicant session
   */
  generatePracticalTask: (field: string): GeneratedTestTask => {
    const sessionSalt = Math.random().toString(36).substring(2, 7).toUpperCase();

    switch (field.toLowerCase()) {
      case 'full-stack developer':
      case 'software engineering':
      case 'tech':
        return {
          fieldId: 'dev_fs',
          category: 'tech',
          seed: `DEV-${sessionSalt}`,
          title: `Concurrent Escrow Lock & Race Condition Fix (Ref: #${sessionSalt})`,
          brief: `You are given a simulated Express/TypeScript banking escrow service. Under high-frequency concurrent checkout events, double-spend releases occur. Your task is to refactor the transaction gate using idempotency tokens and atomic status transitions.`,
          requirements: [
            'Implement atomic status lock check before releasing escrow funds',
            'Handle idempotency replay safely returning identical transaction hash',
            'Provide unit test assertions for concurrent double-spend attempt'
          ],
          sampleInput: `// Vulnerable Snippet:\nasync function releaseEscrow(jobId: string, amount: number) {\n  const job = await db.getJob(jobId);\n  if (job.status === 'funded') {\n    await paymentGateway.payout(job.proId, amount);\n    await db.updateJob(jobId, { status: 'released' });\n  }\n}`,
          solutionPlaceholder: `// Write your hardened atomic implementation here...\nexport async function releaseEscrowSecure(...) {\n  \n}`,
          rubric: [
            { name: 'Race Condition Prevention', maxPoints: 40, criteria: 'Uses atomic DB lock / transactional guard' },
            { name: 'Idempotency & Replay Safety', maxPoints: 30, criteria: 'Validates unique client token' },
            { name: 'Error Recovery & Rollback', maxPoints: 30, criteria: 'Does not leak funds on external gateway crash' }
          ],
          oralWalkthroughPrompts: [
            'Why did you select this specific locking strategy over optimistic locking?',
            'How does your solution behave if the payment gateway times out after debiting the account?',
            'Point to line 18 in your code: what is the worst-case time complexity of this validation?'
          ]
        };

      case 'ui/ux designer':
      case 'product design':
      case 'design':
        return {
          fieldId: 'design_uiux',
          category: 'design',
          seed: `UX-${sessionSalt}`,
          title: `Low-Bandwidth Mobile Trust Verification Flow (Ref: #${sessionSalt})`,
          brief: `Design a mobile-first KYC biometric upload state for users on 2G/3G connections in peri-urban areas. The interface must provide instant visual feedback, local offline queueing indicators, and clear privacy trust assurances.`,
          requirements: [
            'Design for sub-300kb initial render footprint',
            'Zero ambiguous icons: explicit progress labels and network resumption states',
            'Explain component token structure and typographic scaling system'
          ],
          sampleInput: 'User context: 2G connection, Lagos mainland outskirts, uploading government ID image and taking selfie.',
          solutionPlaceholder: 'Paste your Figma component link or describe layered layout hierarchy, auto-layout tokens, and progressive upload micro-interactions.',
          rubric: [
            { name: 'Information Hierarchy & Low-Data UX', maxPoints: 40, criteria: 'Explicit guidance without high-bandwidth video assets' },
            { name: 'Component System & Scalability', maxPoints: 30, criteria: 'Consistent 8pt grid, WCAG AAA contrast, clear states' },
            { name: 'Human Craft & Detail', maxPoints: 30, criteria: 'Evidence of thoughtful custom edge-case handling' }
          ],
          oralWalkthroughPrompts: [
            'Walk me through how you handled the 3G packet timeout state in your UI.',
            'What specific accessibility trade-offs did you evaluate for high-contrast sunlight readability?',
            'Explain why you avoided decorative drop-shadows and blur filters on the low-tier devices.'
          ]
        };

      case 'commercial photographer':
      case 'photography':
      case 'creative':
        return {
          fieldId: 'photo_comm',
          category: 'creative',
          seed: `RAW-${sessionSalt}`,
          title: `RAW Color Profile Calibration & Dynamic Range Recovery (Ref: #${sessionSalt})`,
          brief: `Inspect the provided high-contrast architectural RAW scene with blown highlights and deep shadow noise. Explain and demonstrate your manual tone curve, color calibration, and lens distortion correction without generative fill.`,
          requirements: [
            'Demonstrate highlight recovery using luminance masking',
            'Preserve natural specular skin/material highlights without synthetic banding',
            'Submit complete EXIF verification parameters and non-destructive recipe'
          ],
          sampleInput: 'Camera: Canon EOS R5 | Lens: RF 24-70mm f/2.8L | 1/250s at f/5.6, ISO 200 | Daylight 5600K',
          solutionPlaceholder: 'Enter your RAW processing workflow, color calibration profile, and non-destructive adjustments list...',
          rubric: [
            { name: 'Dynamic Range & Curve Mastery', maxPoints: 40, criteria: 'Recovers tonal detail without flat synthetic HDR look' },
            { name: 'Color Space & Science Integrity', maxPoints: 30, criteria: 'Accurate skin tones and material chromaticity' },
            { name: 'Provenance & EXIF Authenticity', maxPoints: 30, criteria: 'Zero AI generative fill in modification chain' }
          ],
          oralWalkthroughPrompts: [
            'Explain why you chose this specific white balance tint given the mixed tungsten ambient spill.',
            'If the client asks for 300 DPI fine-art print, how did you preserve sharpness without edge halos?',
            'How do you prove this RAW frame was captured natively on your camera body and not synthetically generated?'
          ]
        };

      case 'trades':
      case 'contractor':
      case 'signage/banner installer':
      case 'builder':
      default:
        return {
          fieldId: 'trades_bld',
          category: 'trades',
          seed: `TRD-${sessionSalt}`,
          title: `Structural Load & Material Tolerance Analysis (Ref: #${sessionSalt})`,
          brief: `Analyze a multi-story canopy and high-wind outdoor signage installation blueprint in Victoria Island coastal zone. Compute anchor tensile loads, identify galvanic corrosion risks between dissimilar metals, and formulate the step-by-step physical inspection log.`,
          requirements: [
            'Identify proper stainless grade for maritime coastal corrosion',
            'Formulate mandatory daily photographic progress inspection milestones',
            'Create client sign-off protocol with timestamped geotagged evidence'
          ],
          sampleInput: 'Installation: 12m x 4m elevated banner structure, 85 km/h gust load design, coastal salinity factor 4.',
          solutionPlaceholder: 'Enter your engineering calculations, bolt torque specs, bracket metallurgy, and site verification protocol...',
          rubric: [
            { name: 'Structural Safety & Code Adherence', maxPoints: 40, criteria: 'Correct safety factor >= 2.5 applied' },
            { name: 'Material Specification & Longevity', maxPoints: 30, criteria: 'Grade 316 stainless / zinc isolation barrier' },
            { name: 'Real-world Process Verification', maxPoints: 30, criteria: 'Definitive milestone photo check-ins' }
          ],
          oralWalkthroughPrompts: [
            'What specific anchor failure mode would you look for during high seasonal Harmattan/Atlantic gusts?',
            'Walk me through the exact torque sequence you mandate for your crew on the primary truss bolts.',
            'How do you verify the site foundation concrete achieved the required 28-day curing strength?'
          ]
        };
    }
  },

  /**
   * Calculates the overall transparent Trust Score from the 8 verified layers
   */
  calculateTrustScore: (metrics: {
    identityVerified: boolean;
    credentialsVerified: boolean;
    testScore: number; // 0 - 100
    walkthroughConsistency: number; // 0 - 100
    evidenceRating: 'strong' | 'partial' | 'none';
    provenancePassed: boolean;
    referenceChecksPassed: boolean;
    clientReviewAverage: number; // 0 - 5
    penaltyCount: number;
  }): TrustScoreBreakdown => {
    // Identity: 15 pts
    const identityScore = metrics.identityVerified ? 15 : 0;

    // Credentials & Registry: 15 pts
    const credentialsScore = metrics.credentialsVerified ? 15 : 5;

    // Combined Test & Oral Consistency: 25 pts (15 pts test + 10 pts walkthrough)
    const normalizedTest = (metrics.testScore / 100) * 15;
    const normalizedWalkthrough = (metrics.walkthroughConsistency / 100) * 10;
    const testScore = Math.round(normalizedTest + normalizedWalkthrough);

    // Process Evidence: 20 pts (strong=20, partial=12, none=0)
    const processEvidenceScore = metrics.evidenceRating === 'strong' ? 20 : metrics.evidenceRating === 'partial' ? 12 : 2;

    // Content Provenance / C2PA: 10 pts
    const provenanceScore = metrics.provenancePassed ? 10 : 3;

    // References Verified: 5 pts
    const referenceScore = metrics.referenceChecksPassed ? 5 : 2;

    // Client Reviews & Re-tests: 10 pts
    const clientReviewScore = Math.min(10, Math.round((metrics.clientReviewAverage / 5) * 10));

    let overall = identityScore + credentialsScore + testScore + processEvidenceScore + provenanceScore + referenceScore + clientReviewScore;

    // Penalty deductions
    if (metrics.penaltyCount > 0) {
      overall = Math.max(10, overall - metrics.penaltyCount * 25);
    }

    return {
      overall: Math.min(100, Math.max(0, overall)),
      identityScore,
      credentialsScore,
      testScore,
      processEvidenceScore,
      provenanceScore,
      referenceScore,
      clientReviewScore,
      lastReTestDate: '2026-10-18',
      reTestStatus: 'current'
    };
  },

  /**
   * Evaluates AI-work detection as a supporting signal (never auto-banning)
   */
  evaluateAuthenticityConfidence: (evidence: ProcessEvidenceItem) => {
    const rawSignals = {
      hasOriginalExif: Boolean(evidence.metadata.cameraModel && evidence.metadata.exposure),
      hasValidCommitChain: (evidence.metadata.commitCount || 0) > 15,
      hasLayerHierarchy: (evidence.metadata.psdLayersCount || 0) > 10,
      c2paValid: evidence.c2paVerified,
      aiConfidenceRisk: evidence.aiConfidenceRisk
    };

    let confidence = 85;
    if (rawSignals.hasOriginalExif || rawSignals.hasValidCommitChain || rawSignals.hasLayerHierarchy) {
      confidence += 10;
    }
    if (rawSignals.c2paValid) {
      confidence += 5;
    }
    if (rawSignals.aiConfidenceRisk > 40) {
      confidence -= (rawSignals.aiConfidenceRisk - 40);
    }

    const clampedConfidence = Math.min(99, Math.max(15, confidence));
    const requiresHumanReview = clampedConfidence < 75 || evidence.aiConfidenceRisk > 35;

    return {
      authenticityConfidence: clampedConfidence,
      requiresHumanReview,
      humanReviewReason: requiresHumanReview 
        ? 'Divergence between AI synthetic detector signal and process metadata requires senior reviewer audit.' 
        : 'Process evidence, C2PA signature, and human craft indicators are fully coherent.'
    };
  }
};
