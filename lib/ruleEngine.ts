// Advisory Rule Engine
// Generates farming recommendations based on traditional knowledge and soil data

import { TraditionalKnowledge, SoilSample } from '@/types/advisory';

interface ScientificRecommendation {
  nutrient: string;
  current_level?: string;
  recommendation: string;
  quantity?: string;
}

interface BlendedRecommendation {
  step: number;
  action: string;
  method: 'traditional' | 'scientific' | 'hybrid';
  timing: string;
  benefit: string;
}

export interface RuleEngineResult {
  traditional: {
    practice: string;
    benefit: string;
    season?: string;
    source?: string;
  }[];
  scientific: ScientificRecommendation[];
  blended_plan: BlendedRecommendation[];
  sustainability_score: number;
  cost_score: number;
  explanation: string;
  isAIPowered?: boolean;
  aiError?: string;
  ai_insights?: {
    scientificRationale?: string;
    warnings?: string[];
    fullRecommendation?: string;
  };
}

export class AdvisoryRuleEngine {
  /**
   * Generate comprehensive farming advisory
   */
  static generateAdvisory(
    traditionalData: TraditionalKnowledge[],
    soilData: SoilSample | null
  ): RuleEngineResult {
    const traditional = traditionalData.map(t => ({
      practice: t.practice,
      benefit: t.benefit,
      season: t.season,
      source: t.source
    }));

    const scientific = soilData ? this.analyzesoil(soilData) : [];
    const blendedPlan = this.createBlendedPlan(traditionalData, soilData);
    const sustainabilityScore = this.calculateSustainabilityScore(traditionalData, blendedPlan);
    const costScore = this.calculateCostScore(traditionalData, scientific, blendedPlan);
    const explanation = this.generateExplanation(sustainabilityScore, costScore, traditionalData.length);

    return {
      traditional,
      scientific,
      blended_plan: blendedPlan,
      sustainability_score: sustainabilityScore,
      cost_score: costScore,
      explanation,
      isAIPowered: false
    };
  }

  /**
   * Analyze soil data and generate scientific recommendations
   */
  private static analyzesoil(soil: SoilSample): ScientificRecommendation[] {
    const recommendations: ScientificRecommendation[] = [];

    // Nitrogen analysis
    const nitrogen = soil.nitrogen || 0;
    if (nitrogen < 30) {
      recommendations.push({
        nutrient: 'Nitrogen (N)',
        current_level: `${nitrogen} kg/ha (Low)`,
        recommendation: 'Apply nitrogen fertilizer to reach optimal levels',
        quantity: 'Apply 60-80 kg/ha of Urea (46% N) or equivalent organic sources'
      });
    } else if (nitrogen < 40) {
      recommendations.push({
        nutrient: 'Nitrogen (N)',
        current_level: `${nitrogen} kg/ha (Moderate)`,
        recommendation: 'Maintain nitrogen levels with balanced fertilization',
        quantity: 'Apply 40-50 kg/ha of Urea or use green manure'
      });
    }

    // Phosphorus analysis
    const phosphorus = soil.phosphorus || 0;
    if (phosphorus < 15) {
      recommendations.push({
        nutrient: 'Phosphorus (P)',
        current_level: `${phosphorus} kg/ha (Low)`,
        recommendation: 'Increase phosphorus for root development and flowering',
        quantity: 'Apply 40-50 kg/ha of DAP (Diammonium Phosphate) or rock phosphate'
      });
    } else if (phosphorus < 20) {
      recommendations.push({
        nutrient: 'Phosphorus (P)',
        current_level: `${phosphorus} kg/ha (Moderate)`,
        recommendation: 'Maintain phosphorus with moderate application',
        quantity: 'Apply 20-30 kg/ha of DAP or compost rich in phosphorus'
      });
    }

    // Potassium analysis
    const potassium = soil.potassium || 0;
    if (potassium < 150) {
      recommendations.push({
        nutrient: 'Potassium (K)',
        current_level: `${potassium} kg/ha (Low)`,
        recommendation: 'Boost potassium for disease resistance and quality',
        quantity: 'Apply 50-60 kg/ha of Muriate of Potash (MOP) or wood ash'
      });
    } else if (potassium < 200) {
      recommendations.push({
        nutrient: 'Potassium (K)',
        current_level: `${potassium} kg/ha (Moderate)`,
        recommendation: 'Maintain potassium levels with balanced fertilization',
        quantity: 'Apply 30-40 kg/ha of MOP or organic potash sources'
      });
    }

    // pH analysis
    const ph = soil.ph || 7.0;
    if (ph < 6.0) {
      recommendations.push({
        nutrient: 'Soil pH',
        current_level: `${ph} (Acidic)`,
        recommendation: 'Apply lime to neutralize soil acidity',
        quantity: 'Apply 2-3 tons/ha of agricultural lime (CaCO3)'
      });
    } else if (ph > 8.0) {
      recommendations.push({
        nutrient: 'Soil pH',
        current_level: `${ph} (Alkaline)`,
        recommendation: 'Apply gypsum to reduce alkalinity',
        quantity: 'Apply 1-2 tons/ha of gypsum (CaSO4)'
      });
    }

    // Organic carbon analysis
    const organicCarbon = soil.organic_carbon || 0;
    if (organicCarbon < 0.5) {
      recommendations.push({
        nutrient: 'Organic Carbon',
        current_level: `${organicCarbon}% (Low)`,
        recommendation: 'Increase organic matter for soil health',
        quantity: 'Apply 5-7 tons/ha of well-decomposed farmyard manure or compost'
      });
    }

    return recommendations;
  }

  /**
   * Create blended plan combining traditional and scientific methods
   */
  private static createBlendedPlan(
    traditionalData: TraditionalKnowledge[],
    soilData: SoilSample | null
  ): BlendedRecommendation[] {
    const plan: BlendedRecommendation[] = [];
    let step = 1;

    // Step 1: Organic manure (Traditional)
    const hasManure = traditionalData.some(t => 
      t.practice.toLowerCase().includes('manure') || 
      t.practice.toLowerCase().includes('खाद')
    );
    if (hasManure) {
      plan.push({
        step: step++,
        action: 'Apply organic manure (FYM/Compost)',
        method: 'traditional',
        timing: '2-3 weeks before sowing',
        benefit: 'Improves soil structure, adds nutrients, enhances water retention'
      });
    }

    // Step 2: Green manure (Traditional)
    const hasGreenManure = traditionalData.some(t => 
      t.practice.toLowerCase().includes('green manure') || 
      t.practice.toLowerCase().includes('हरी खाद')
    );
    if (hasGreenManure) {
      plan.push({
        step: step++,
        action: 'Incorporate green manure crop',
        method: 'traditional',
        timing: '45 days before main crop sowing',
        benefit: 'Adds nitrogen naturally, suppresses weeds, improves soil biology'
      });
    }

    // Step 3: pH correction (Scientific - if needed)
    if (soilData) {
      const ph = soilData.ph || 7.0;
      if (ph < 6.0 || ph > 8.0) {
        plan.push({
          step: step++,
          action: ph < 6.0 ? 'Apply lime to correct pH' : 'Apply gypsum to correct pH',
          method: 'scientific',
          timing: '3-4 weeks before sowing',
          benefit: 'Optimizes nutrient availability and microbial activity'
        });
      }
    }

    // Step 4: Seed treatment (Hybrid)
    const hasSeedTreatment = traditionalData.some(t => 
      t.practice.toLowerCase().includes('seed') || 
      t.practice.toLowerCase().includes('बीज')
    );
    if (hasSeedTreatment) {
      plan.push({
        step: step++,
        action: 'Treat seeds with organic + biological agents',
        method: 'hybrid',
        timing: '1 day before sowing',
        benefit: 'Protects against seed-borne diseases, improves germination'
      });
    }

    // Step 5: Balanced NPK (Hybrid)
    plan.push({
      step: step++,
      action: 'Apply balanced NPK (organic + inorganic)',
      method: 'hybrid',
      timing: 'At sowing time',
      benefit: 'Provides complete nutrition while maintaining soil health'
    });

    // Step 6: First top dressing (Scientific)
    if (soilData && (soilData.nitrogen || 0) < 40) {
      plan.push({
        step: step++,
        action: 'First nitrogen top dressing',
        method: 'scientific',
        timing: '3-4 weeks after sowing',
        benefit: 'Supports vigorous vegetative growth'
      });
    }

    // Step 7: Pest management (Traditional)
    const hasPestControl = traditionalData.some(t => 
      t.practice.toLowerCase().includes('neem') || 
      t.practice.toLowerCase().includes('pest') ||
      t.practice.toLowerCase().includes('नीम')
    );
    if (hasPestControl) {
      plan.push({
        step: step++,
        action: 'Apply neem-based pest control',
        method: 'traditional',
        timing: 'As preventive spray every 15 days',
        benefit: 'Natural pest control without harming beneficial insects'
      });
    }

    // Step 8: Water management (Hybrid)
    const hasIrrigation = traditionalData.some(t => 
      t.practice.toLowerCase().includes('irrigation') || 
      t.practice.toLowerCase().includes('water') ||
      t.practice.toLowerCase().includes('सिंचाई')
    );
    if (hasIrrigation) {
      plan.push({
        step: step++,
        action: 'Implement efficient irrigation schedule',
        method: 'hybrid',
        timing: 'Throughout crop growth',
        benefit: 'Conserves water while meeting crop requirements'
      });
    }

    // Step 9: Mid-season care (Hybrid)
    plan.push({
      step: step++,
      action: 'Monitor and manage nutrient deficiencies',
      method: 'hybrid',
      timing: 'Mid-season',
      benefit: 'Ensures optimal growth and prevents yield loss'
    });

    // Step 10: Harvest preparation (Traditional)
    plan.push({
      step: step++,
      action: 'Prepare for timely harvest',
      method: 'traditional',
      timing: 'At crop maturity',
      benefit: 'Maximizes yield and quality'
    });

    return plan;
  }

  /**
   * Calculate sustainability score (0-100)
   */
  private static calculateSustainabilityScore(
    traditionalData: TraditionalKnowledge[],
    blendedPlan: BlendedRecommendation[]
  ): number {
    let score = 50; // Base score

    // Bonus for traditional practices
    const traditionalCount = traditionalData.length;
    score += Math.min(traditionalCount * 8, 30);

    // Bonus for traditional/hybrid steps in plan
    const traditionalSteps = blendedPlan.filter(s => 
      s.method === 'traditional' || s.method === 'hybrid'
    ).length;
    score += Math.min(traditionalSteps * 3, 20);

    // Ensure score is between 0 and 100
    return Math.min(Math.max(score, 0), 100);
  }

  /**
   * Calculate cost efficiency score (0-100)
   */
  private static calculateCostScore(
    traditionalData: TraditionalKnowledge[],
    scientific: ScientificRecommendation[],
    blendedPlan: BlendedRecommendation[]
  ): number {
    let score = 40; // Base score

    // Higher score for more traditional practices (lower cost)
    const traditionalCount = traditionalData.length;
    score += Math.min(traditionalCount * 10, 40);

    // Bonus for traditional/hybrid steps
    const lowCostSteps = blendedPlan.filter(s => 
      s.method === 'traditional' || s.method === 'hybrid'
    ).length;
    score += Math.min(lowCostSteps * 5, 20);

    // Penalty for many scientific recommendations (higher cost)
    const scientificCount = scientific.length;
    score -= Math.min(scientificCount * 3, 15);

    // Ensure score is between 0 and 100
    return Math.min(Math.max(score, 0), 100);
  }

  /**
   * Generate human-readable explanation
   */
  private static generateExplanation(
    sustainabilityScore: number,
    costScore: number,
    practiceCount: number
  ): string {
    let explanation = `This advisory combines ${practiceCount} traditional practices with scientific soil analysis. `;

    if (sustainabilityScore >= 80) {
      explanation += 'The approach is highly sustainable, emphasizing organic inputs and natural methods. ';
    } else if (sustainabilityScore >= 60) {
      explanation += 'The approach balances sustainability with productivity, using both organic and inorganic inputs. ';
    } else {
      explanation += 'The approach focuses on addressing immediate soil deficiencies. ';
    }

    if (costScore >= 80) {
      explanation += 'It is very cost-effective, relying primarily on locally available organic resources. ';
    } else if (costScore >= 60) {
      explanation += 'It offers good cost efficiency by combining traditional and modern inputs. ';
    } else {
      explanation += 'While input costs may be moderate, the approach ensures optimal nutrition. ';
    }

    explanation += 'Follow the blended plan for best results, adapting timing to your local conditions.';

    return explanation;
  }
}