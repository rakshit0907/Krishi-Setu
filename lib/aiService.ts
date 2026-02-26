// AI Service using YOUR Hugging Face Space
// Space: rakshitpandey24/plantdiseasedetection
// Completely FREE - your own deployed model!

interface TraditionalKnowledge {
  practice: string;
  benefit: string;
  season?: string;
  source?: string;
}

interface SoilSample {
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;
  organic_carbon?: number;
}

interface AIAdvisoryRequest {
  district: string;
  crop: string;
  traditionalPractices: any[];
  soilData: SoilSample | null;
  userQuery?: string;
}

interface AIAdvisoryResponse {
  recommendations: string;
  traditionalIntegration: string;
  scientificRationale: string;
  actionPlan: string[];
  warnings?: string[];
  sustainabilityScore: number;
  costScore: number;
}

// Type definitions for disease detection
interface DiseaseItem {
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
  treatmentHindi?: string;
}

interface PestItem {
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
  treatmentHindi?: string;
}

interface NutrientDeficiency {
  nutrient: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string;
  remedy: string;
}

export class AgriAIService {
  private spaceUrl: string;
  private hfToken?: string;

  constructor() {
    // Your Hugging Face Space
    this.spaceUrl = 'https://rakshitpandey24-plantdiseasedetection.hf.space';
    this.hfToken = process.env.HUGGINGFACE_API_KEY; // Optional - public spaces don't need it
  }

  /**
   * Generate advisory using rule-based intelligence
   * This uses YOUR logic - completely FREE!
   */
  async generateAdvisory(request: AIAdvisoryRequest): Promise<AIAdvisoryResponse> {
    const { district, crop, traditionalPractices, soilData, userQuery } = request;

    // Build response using your rule-based logic
    const traditionalIntegration = this.buildTraditionalIntegration(traditionalPractices, crop);
    const scientificRationale = this.buildScientificRationale(soilData, crop, district);
    const actionPlan = this.buildActionPlan(traditionalPractices, soilData, crop, district);
    const warnings = this.buildWarnings(soilData, crop);
    
    const sustainabilityScore = this.calculateSustainabilityScore(traditionalPractices, soilData);
    const costScore = this.calculateCostScore(traditionalPractices);

    let recommendations = `Advisory for ${crop} in ${district}\n\n`;
    recommendations += `Traditional Integration:\n${traditionalIntegration}\n\n`;
    recommendations += `Scientific Analysis:\n${scientificRationale}\n\n`;
    recommendations += `Action Plan:\n${actionPlan.map((step, i) => `${i + 1}. ${step}`).join('\n')}`;

    if (userQuery) {
      const answer = this.answerFarmerQuestion(userQuery, crop, district, soilData, traditionalPractices);
      recommendations = `Question: ${userQuery}\n\nAnswer: ${answer}\n\n` + recommendations;
    }

    return {
      recommendations,
      traditionalIntegration,
      scientificRationale,
      actionPlan,
      warnings: warnings.length > 0 ? warnings : undefined,
      sustainabilityScore,
      costScore
    };
  }

  /**
   * Analyze crop image using YOUR Hugging Face Space
   * Space: rakshitpandey24/plantdiseasedetection
   */
  async analyzeImage(imageBase64: string, cropName?: string, location?: string, symptoms?: string): Promise<any> {
    try {
      console.log('Calling your Hugging Face Space for plant disease detection...');

      // Remove data URL prefix if present
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      
      // Convert base64 to blob for upload
      const imageBlob = this.base64ToBlob(base64Data);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('data', imageBlob, 'crop_image.jpg');

      // Call YOUR Hugging Face Space API
      const response = await fetch(`${this.spaceUrl}/api/predict`, {
        method: 'POST',
        body: formData,
        headers: this.hfToken ? {
          'Authorization': `Bearer ${this.hfToken}`
        } : {}
      });

      if (!response.ok) {
        throw new Error(`Space API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Space API result:', result);

      // Map the result to diagnosis format
      return this.mapSpaceResultToDiagnosis(result, cropName, location, symptoms);
    } catch (error) {
      console.error('Hugging Face Space error:', error);
      throw error;
    }
  }

  private base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  }

  /**
   * Map YOUR Space's result to diagnosis format
   */
  private mapSpaceResultToDiagnosis(spaceResult: any, cropName?: string, location?: string, symptoms?: string): any {
    // Your Space returns predictions with label and confidence
    // Adapt based on your Space's actual response format
    
    let prediction, confidence;
    
    // Try different response formats from Gradio/Spaces
    if (spaceResult.data && Array.isArray(spaceResult.data)) {
      // Format: { data: [{ label: "...", confidence: 0.95 }] }
      prediction = spaceResult.data[0];
      confidence = (prediction.confidence || prediction.score || 0) * 100;
    } else if (spaceResult.label) {
      // Format: { label: "...", confidence: 0.95 }
      prediction = spaceResult;
      confidence = (spaceResult.confidence || spaceResult.score || 0) * 100;
    } else if (Array.isArray(spaceResult)) {
      // Format: [{ label: "...", confidence: 0.95 }]
      prediction = spaceResult[0];
      confidence = (prediction.confidence || prediction.score || 0) * 100;
    } else {
      throw new Error('Unexpected Space response format');
    }

    const label = prediction.label || prediction.class_name || 'Unknown';
    
    // Parse the label (e.g., "Tomato___Late_blight" or "Healthy")
    const isHealthy = label.toLowerCase().includes('healthy');
    const parts = label.split('___');
    const detectedCrop = parts[0] || cropName || 'Unknown';
    const condition = parts[1] || label;

    const healthScore = isHealthy ? 90 : Math.max(20, 100 - confidence);
    const diseases: DiseaseItem[] = [];
    const pests: PestItem[] = [];
    const nutrientDeficiencies: NutrientDeficiency[] = [];

    if (!isHealthy) {
      const conditionLower = condition.toLowerCase();
      
      if (conditionLower.includes('blight') || conditionLower.includes('rust') || 
          conditionLower.includes('mold') || conditionLower.includes('spot') ||
          conditionLower.includes('rot')) {
        // It's a disease
        const treatment = this.getDiseasetreatment(condition, detectedCrop);
        diseases.push({
          name: condition.replace(/_/g, ' '),
          severity: confidence > 80 ? 'high' : confidence > 50 ? 'medium' : 'low',
          description: `Detected ${condition.replace(/_/g, ' ')} with ${confidence.toFixed(1)}% confidence`,
          treatment: treatment.english,
          treatmentHindi: treatment.hindi
        });
      } else if (conditionLower.includes('curl') || conditionLower.includes('miner')) {
        // Pest damage
        const treatment = this.getPestTreatment(condition, detectedCrop);
        pests.push({
          name: condition.replace(/_/g, ' '),
          severity: confidence > 80 ? 'high' : confidence > 50 ? 'medium' : 'low',
          description: `Detected ${condition.replace(/_/g, ' ')} with ${confidence.toFixed(1)}% confidence`,
          treatment: treatment.english,
          treatmentHindi: treatment.hindi
        });
      }
    }

    const recommendations = this.getRecommendations(condition, detectedCrop, isHealthy);
    const traditionalRemedies = this.getTraditionalRemedies(condition, detectedCrop);
    const preventiveMeasures = this.getPreventiveMeasures(detectedCrop);

    return {
      healthStatus: isHealthy ? 'Healthy' : 'Issues Detected',
      healthScore: Math.round(healthScore),
      detectedCrop,
      detectedCondition: condition.replace(/_/g, ' '),
      confidence: Math.round(confidence),
      diseases,
      pests,
      nutrientDeficiencies,
      recommendations,
      traditionalRemedies,
      preventiveMeasures,
      urgency: isHealthy ? 'routine' : (confidence > 80 ? 'immediate' : confidence > 50 ? 'soon' : 'routine'),
      summary: isHealthy 
        ? `Your ${detectedCrop} appears healthy! Continue with regular care and monitoring.`
        : `Detected ${condition.replace(/_/g, ' ')} with ${confidence.toFixed(0)}% confidence. ${confidence > 80 ? 'Immediate action recommended.' : 'Monitor and treat as suggested.'}`
    };
  }

  // RULE-BASED ADVISORY METHODS (Your intelligent logic)

  private buildTraditionalIntegration(practices: any[], crop: string): string {
    if (!practices || practices.length === 0) {
      return `Traditional practices for ${crop}:\n\nRecommend collecting knowledge from local farmers in your area to build a comprehensive traditional practice database.`;
    }

    let text = `Based on traditional knowledge:\n\n`;
    practices.forEach((p, i) => {
      text += `${i + 1}. ${p.practice}\n`;
      text += `   Benefits: ${p.benefit}\n`;
      if (p.season) text += `   Best time: ${p.season}\n`;
      text += `\n`;
    });

    return text.trim();
  }

  private buildScientificRationale(soilData: SoilSample | null, crop: string, district: string): string {
    let text = `Scientific recommendations for ${crop} in ${district}:\n\n`;

    if (soilData) {
      if (soilData.nitrogen !== undefined) {
        if (soilData.nitrogen < 200) {
          text += `• Low nitrogen detected (${soilData.nitrogen} kg/ha). Apply 50-60 kg N/ha through urea or organic manure.\n`;
        } else if (soilData.nitrogen > 400) {
          text += `• High nitrogen (${soilData.nitrogen} kg/ha). Reduce nitrogen application to avoid lodging.\n`;
        } else {
          text += `• Nitrogen levels are adequate (${soilData.nitrogen} kg/ha).\n`;
        }
      }

      if (soilData.phosphorus !== undefined) {
        if (soilData.phosphorus < 10) {
          text += `• Low phosphorus (${soilData.phosphorus} kg/ha). Apply 40-50 kg P2O5/ha through DAP or SSP.\n`;
        } else {
          text += `• Phosphorus levels are satisfactory (${soilData.phosphorus} kg/ha).\n`;
        }
      }

      if (soilData.potassium !== undefined) {
        if (soilData.potassium < 100) {
          text += `• Low potassium (${soilData.potassium} kg/ha). Apply 30-40 kg K2O/ha through MOP.\n`;
        } else {
          text += `• Potassium levels are good (${soilData.potassium} kg/ha).\n`;
        }
      }

      if (soilData.ph !== undefined) {
        if (soilData.ph < 6.0) {
          text += `• Acidic soil (pH ${soilData.ph}). Apply lime at 2-3 tons/ha to raise pH.\n`;
        } else if (soilData.ph > 8.0) {
          text += `• Alkaline soil (pH ${soilData.ph}). Apply gypsum and use acidic fertilizers.\n`;
        } else {
          text += `• Soil pH is optimal (${soilData.ph}) for ${crop}.\n`;
        }
      }
    } else {
      text += `No soil data available. Recommend getting soil tested for optimal results.\n`;
      text += `Contact your local agricultural extension office for soil testing services.\n`;
    }

    return text;
  }

  private buildActionPlan(practices: any[], soilData: SoilSample | null, crop: string, district: string): string[] {
    const plan: string[] = [];

    plan.push(`Prepare field: Deep ploughing followed by 2-3 harrowing for good soil tilth`);

    if (practices && practices.length > 0) {
      practices.slice(0, 2).forEach(p => {
        plan.push(`Apply traditional practice: ${p.practice}`);
      });
    }

    if (soilData) {
      if (soilData.nitrogen && soilData.nitrogen < 200) {
        plan.push(`Apply basal dose: 50% N, 100% P and K at sowing/transplanting`);
        plan.push(`Top dressing: Remaining 50% N at 30-35 days after sowing`);
      }
    }

    plan.push(`Maintain optimal irrigation: Water at critical growth stages`);
    plan.push(`Weed management: First weeding at 20-25 days, second at 40-45 days`);
    plan.push(`Pest monitoring: Regular field scouting for early detection`);
    plan.push(`Harvest timing: Monitor crop maturity indicators for optimal harvest`);

    return plan;
  }

  private buildWarnings(soilData: SoilSample | null, crop: string): string[] {
    const warnings: string[] = [];

    if (soilData) {
      if (soilData.ph && soilData.ph < 5.5) {
        warnings.push(`Highly acidic soil may cause nutrient deficiencies. Apply lime before planting.`);
      }
      if (soilData.ph && soilData.ph > 8.5) {
        warnings.push(`Highly alkaline soil may lock up micronutrients. Consider gypsum application.`);
      }
      if (soilData.nitrogen && soilData.nitrogen > 500) {
        warnings.push(`Excessive nitrogen may cause vegetative growth at expense of yield. Reduce N application.`);
      }
    }

    warnings.push(`Always wear protective equipment when applying chemicals.`);
    warnings.push(`Follow recommended dosages to avoid environmental damage.`);

    return warnings;
  }

  private calculateSustainabilityScore(practices: any[], soilData: SoilSample | null): number {
    let score = 50;
    if (practices) score += Math.min(practices.length * 5, 30);
    if (soilData) {
      if (soilData.organic_carbon && soilData.organic_carbon > 0.5) score += 10;
      if (soilData.ph && soilData.ph >= 6.0 && soilData.ph <= 7.5) score += 10;
    }
    return Math.min(score, 100);
  }

  private calculateCostScore(practices: any[]): number {
    let score = 70;
    if (practices && practices.length > 3) score += 20;
    return Math.min(score, 100);
  }

  private answerFarmerQuestion(question: string, crop: string, district: string, soilData: any, practices: any[]): string {
    const qLower = question.toLowerCase();

    if (qLower.includes('fertilizer') || qLower.includes('खाद')) {
      if (soilData && soilData.nitrogen < 200) {
        return `For ${crop}, apply 50-60 kg nitrogen per hectare. Use urea (25 kg at sowing + 25 kg after 30 days) or farmyard manure (10-15 tons/ha). ${crop} के लिए, 50-60 किलो नाइट्रोजन प्रति हेक्टेयर डालें।`;
      }
      return `For ${crop}, apply balanced NPK fertilizer. Get soil tested for exact recommendations. ${crop} के लिए, संतुलित NPK उर्वरक डालें।`;
    }

    if (qLower.includes('water') || qLower.includes('पानी') || qLower.includes('irrigation')) {
      return `${crop} needs regular watering, especially during flowering and grain filling. Water when top 2-3 cm soil is dry. Avoid waterlogging. ${crop} को नियमित पानी चाहिए।`;
    }

    if (qLower.includes('pest') || qLower.includes('insect') || qLower.includes('कीट')) {
      return `For ${crop}, monitor regularly for pests. Use neem-based organic pesticides first. For severe infestations, consult agricultural officer. ${crop} में कीटों के लिए नियमित निगरानी करें।`;
    }

    if (qLower.includes('disease') || qLower.includes('रोग')) {
      return `Prevent ${crop} diseases by using disease-free seeds, proper spacing, and avoiding waterlogging. If disease appears, remove infected plants and apply fungicide. ${crop} के रोगों को रोकने के लिए रोगमुक्त बीज का उपयोग करें।`;
    }

    if (qLower.includes('harvest') || qLower.includes('कटाई')) {
      return `Harvest ${crop} when grains/fruits reach physiological maturity. Look for color change and hardening. ${crop} की कटाई तब करें जब दाने परिपक्व हो जाएं।`;
    }

    return `For ${crop} in ${district}, follow proper land preparation, timely sowing, balanced fertilization, regular monitoring, and timely harvesting. ${district} में ${crop} के लिए उचित भूमि तैयारी और समय पर बुवाई करें।`;
  }

  // TREATMENT DATABASE

  private getDiseasetreatment(disease: string, crop: string): { english: string; hindi: string } {
    const treatments: Record<string, { english: string; hindi: string }> = {
      'Late_blight': {
        english: 'Remove infected leaves immediately. Spray copper-based fungicide (Bordeaux mixture) or Mancozeb every 7-10 days. Improve air circulation between plants.',
        hindi: 'संक्रमित पत्तियों को तुरंत हटाएं। हर 7-10 दिनों में तांबा आधारित फफूंदनाशक (बोर्डो मिश्रण) या मैंकोजेब का छिड़काव करें। पौधों के बीच हवा का संचार बढ़ाएं।'
      },
      'Early_blight': {
        english: 'Apply Mancozeb or Chlorothalonil fungicide. Remove and destroy infected plant parts. Maintain proper plant spacing for air circulation.',
        hindi: 'मैंकोजेब या क्लोरोथैलोनिल फफूंदनाशक लगाएं। संक्रमित पौधे के हिस्सों को हटाकर नष्ट करें। हवा के संचार के लिए उचित पौधे की दूरी बनाए रखें।'
      },
      'Leaf_spot': {
        english: 'Spray copper fungicide at first sign of disease. Remove and destroy affected leaves. Avoid overhead irrigation to reduce leaf wetness.',
        hindi: 'रोग के पहले संकेत पर तांबे का फफूंदनाशक छिड़कें। प्रभावित पत्तियों को हटाकर नष्ट करें। पत्तियों पर पानी जमने से बचने के लिए ऊपर से सिंचाई न करें।'
      },
      'Bacterial_spot': {
        english: 'Use copper-based bactericides. Remove infected plants. Practice crop rotation. Use resistant varieties when available.',
        hindi: 'तांबा आधारित जीवाणुनाशक का उपयोग करें। संक्रमित पौधों को हटा दें। फसल चक्र अपनाएं। उपलब्ध होने पर प्रतिरोधी किस्मों का उपयोग करें।'
      }
    };

    for (const key in treatments) {
      if (disease.includes(key)) {
        return treatments[key];
      }
    }

    return {
      english: `For ${disease}, apply appropriate fungicide and consult local agricultural expert for specific treatment protocol.`,
      hindi: `${disease} के लिए, उपयुक्त फफूंदनाशक लगाएं और विशिष्ट उपचार प्रोटोकॉल के लिए स्थानीय कृषि विशेषज्ञ से परामर्श करें।`
    };
  }

  private getPestTreatment(condition: string, crop: string): { english: string; hindi: string } {
    return {
      english: 'Apply neem-based organic pesticide (5ml/liter water). Introduce natural predators like ladybugs. Remove and destroy severely affected plants to prevent spread.',
      hindi: 'नीम आधारित जैविक कीटनाशक (5ml/लीटर पानी) लगाएं। लेडीबग्स जैसे प्राकृतिक शिकारियों को पेश करें। फैलाव रोकने के लिए गंभीर रूप से प्रभावित पौधों को हटाकर नष्ट करें।'
    };
  }

  private getRecommendations(condition: string, crop: string, isHealthy: boolean): string[] {
    if (isHealthy) {
      return [
        'Continue regular monitoring and preventive care',
        'Maintain optimal watering and fertilization schedule',
        'Keep the field clean and weed-free',
        'Monitor for any early signs of stress or disease',
        'Maintain proper plant spacing for good air circulation'
      ];
    }

    return [
      'Isolate or remove severely infected plants immediately',
      'Apply recommended treatment without delay',
      'Improve air circulation by pruning and proper spacing',
      'Adjust watering schedule - avoid overhead irrigation',
      'Monitor closely for disease spread to neighboring plants',
      'Consult local agricultural extension officer if condition worsens',
      'Consider using disease-resistant varieties in next season'
    ];
  }

  private getTraditionalRemedies(condition: string, crop: string): string[] {
    return [
      'Neem leaf extract spray: Boil 500g neem leaves in 10L water, cool, filter, spray on plants',
      'Cow urine solution: Mix 1 liter cow urine with 10 liters water, spray as foliar treatment',
      'Wood ash application: Dust wood ash around plant base to prevent fungal spread',
      'Turmeric powder spray: Mix 50g turmeric in 10L water as natural antifungal',
      'Garlic-chili extract: Grind 100g garlic + 50g chili, soak in 10L water overnight, strain and spray for pest control'
    ];
  }

  private getPreventiveMeasures(crop: string): string[] {
    return [
      'Use certified disease-free seeds or seedlings',
      'Maintain proper plant spacing (follow recommended guidelines)',
      'Practice crop rotation - avoid planting same crop family consecutively',
      'Remove and destroy all crop residues after harvest',
      'Ensure good drainage - avoid waterlogging conditions',
      'Regular field inspection for early detection of problems',
      'Apply balanced nutrition - avoid excess nitrogen',
      'Maintain field hygiene - remove weeds and alternate hosts'
    ];
  }
}

let aiServiceInstance: AgriAIService | null = null;

export function getAIService(): AgriAIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AgriAIService();
  }
  return aiServiceInstance;
}