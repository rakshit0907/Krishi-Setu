// ===================================
// ADVISORY TYPES (for farming advisory)
// ===================================

export interface TraditionalKnowledge {
  id: string;
  district: string;
  crop: string;
  practice: string;
  benefit: string;
  season?: string;
  source?: string;
  submitted_by?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface SoilSample {
  id: string;
  district: string;
  crop: string;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;
  organic_carbon?: number;
  recommendation_note?: string;
  sampled_at: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  advisory_id: string;
  helpful: boolean;
  notes?: string;
  timestamp: string;
}

export interface AdvisoryRequest {
  district: string;
  crop: string;
  useAI?: boolean;
  userQuery?: string;
}

export interface TraditionalPractice {
  practice: string;
  benefit: string;
  season?: string;
  source?: string;
}

export interface ScientificRecommendation {
  nutrient: string;
  current_level?: string;
  recommendation: string;
  quantity?: string;
  aiGenerated?: boolean;
}

export interface BlendedRecommendation {
  step: number;
  action: string;
  method: 'traditional' | 'scientific' | 'hybrid';
  timing: string;
  benefit: string;
}

// AI-specific types for advisory
export interface AIInsights {
  scientificRationale?: string;
  warnings?: string[];
  fullRecommendation?: string;
}

export interface AdvisoryData {
  traditional: TraditionalPractice[];
  scientific: ScientificRecommendation[];
  blended_plan: BlendedRecommendation[];
  sustainability_score: number;
  cost_score: number;
  explanation: string;
  soil_data: SoilSample | null;
  isAIPowered?: boolean;
  aiError?: string;
  ai_insights?: AIInsights;
}

export interface AdvisoryResponse {
  success: boolean;
  data?: AdvisoryData;
  error?: string;
}

export interface FeedbackRequest {
  advisory_id: string;
  helpful: boolean;
  notes?: string;
}

export interface TraditionalKnowledgeSubmission {
  district: string;
  crop: string;
  practice: string;
  benefit: string;
  season?: string;
  source?: string;
  submitted_by?: string;
}

export interface DashboardMetrics {
  total_advisories: number;
  total_practices: number;
  verified_practices: number;
  pending_practices: number;
  avg_sustainability_score: number;
  avg_cost_score: number;
  helpful_feedback: number;
  not_helpful_feedback: number;
}

export interface Translation {
  [key: string]: {
    en: string;
    hi: string;
  };
}

// AI Service types for advisory
export interface AIAdvisoryRequest {
  district: string;
  crop: string;
  traditionalPractices: TraditionalKnowledge[];
  soilData: SoilSample | null;
  userQuery?: string;
}

export interface AIAdvisoryResponse {
  recommendations: string;
  traditionalIntegration: string;
  scientificRationale: string;
  actionPlan: string[];
  warnings?: string[];
  sustainabilityScore: number;
  costScore: number;
}

export interface AIQuestionRequest {
  question: string;
  context?: {
    district?: string;
    crop?: string;
    additionalInfo?: string;
  };
}

// ===================================
// CROP DOCTOR TYPES (separate from advisory)
// ===================================

export interface CropDoctorDisease {
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
}

export interface CropDoctorPest {
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
}

export interface CropDoctorNutrientDeficiency {
  nutrient: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string;
  remedy: string;
}

export interface CropDoctorDiagnosis {
  healthStatus: string;
  healthScore: number;
  diseases: CropDoctorDisease[];
  pests: CropDoctorPest[];
  nutrientDeficiencies: CropDoctorNutrientDeficiency[];
  recommendations: string[];
  traditionalRemedies: string[];
  preventiveMeasures: string[];
  urgency: 'immediate' | 'soon' | 'routine';
  summary: string;
}

export interface CropDoctorRequest {
  image: string;
  cropName?: string;
  location?: string;
  symptoms?: string;
}

export interface CropDoctorResponse {
  success: boolean;
  diagnosis?: CropDoctorDiagnosis;
  error?: string;
}