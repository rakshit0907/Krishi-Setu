import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAIService } from '@/lib/aiService';
import { AdvisoryRuleEngine } from '@/lib/ruleEngine';
import { AdvisoryRequest, AdvisoryResponse } from '@/types/advisory';

export async function POST(request: NextRequest) {
  try {
    const body: AdvisoryRequest = await request.json();
    const { district, crop, useAI = true, userQuery } = body as AdvisoryRequest & { useAI?: boolean; userQuery?: string };

    // Validate input
    if (!district || !crop) {
      return NextResponse.json(
        { success: false, error: 'District and crop are required' },
        { status: 400 }
      );
    }

    // Fetch verified traditional knowledge
    const { data: traditionalData, error: traditionalError } = await supabase
      .from('traditional_knowledge')
      .select('*')
      .eq('district', district)
      .eq('crop', crop)
      .eq('verified', true);

    if (traditionalError) {
      console.error('Error fetching traditional knowledge:', traditionalError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch traditional knowledge' },
        { status: 500 }
      );
    }

    // Fetch soil sample data
    const { data: soilData, error: soilError } = await supabase
      .from('soil_samples')
      .select('*')
      .eq('district', district)
      .eq('crop', crop)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (soilError && soilError.code !== 'PGRST116') {
      console.error('Error fetching soil data:', soilError);
    }

    // Check if we have data
    if (!traditionalData || traditionalData.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `No traditional knowledge found for ${crop} in ${district}. This area is not yet covered.` 
        },
        { status: 404 }
      );
    }

    // Generate advisory based on user preference
    let advisory;

    if (useAI && process.env.ANTHROPIC_API_KEY) {
      try {
        // Use AI-powered advisory
        advisory = await generateAIAdvisory(
          district,
          crop,
          traditionalData,
          soilData,
          userQuery
        );
      } catch (aiError) {
        console.error('AI advisory failed, falling back to rule engine:', aiError);
        // Fallback to rule engine if AI fails
        advisory = AdvisoryRuleEngine.generateAdvisory(
          traditionalData,
          soilData || null
        );
        advisory.isAIPowered = false;
        advisory.aiError = 'AI service temporarily unavailable';
      }
    } else {
      // Use rule-based engine
      advisory = AdvisoryRuleEngine.generateAdvisory(
        traditionalData,
        soilData || null
      );
      advisory.isAIPowered = false;
    }

    const response: AdvisoryResponse = {
      success: true,
      data: {
        ...advisory,
        soil_data: soilData || null
      }
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Advisory API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Generate AI-powered advisory using Claude
 */
async function generateAIAdvisory(
  district: string,
  crop: string,
  traditionalData: any[],
  soilData: any,
  userQuery?: string
) {
  const aiService = getAIService();

  // Call AI service
  const aiResponse = await aiService.generateAdvisory({
    district,
    crop,
    traditionalPractices: traditionalData,
    soilData,
    userQuery
  });

  // Transform AI response to match existing structure
  return {
    traditional: traditionalData.map(t => ({
      practice: t.practice,
      benefit: t.benefit,
      season: t.season,
      source: t.source
    })),
    scientific: parseScientificRecommendations(aiResponse.scientificRationale),
    blended_plan: aiResponse.actionPlan.map((step, index) => ({
      step: index + 1,
      action: step,
      method: determineMethod(step),
      timing: extractTiming(step),
      benefit: extractBenefit(step)
    })),
    sustainability_score: aiResponse.sustainabilityScore,
    cost_score: aiResponse.costScore,
    explanation: aiResponse.traditionalIntegration,
    ai_insights: {
      scientificRationale: aiResponse.scientificRationale,
      warnings: aiResponse.warnings || [],
      fullRecommendation: aiResponse.recommendations
    },
    isAIPowered: true
  };
}

/**
 * Parse scientific recommendations from AI response
 */
function parseScientificRecommendations(text: string): any[] {
  const recommendations = [];
  const lines = text.split('\n').filter(line => line.trim());

  for (const line of lines) {
    if (line.includes('nitrogen') || line.includes('Nitrogen') || line.includes('N')) {
      recommendations.push({
        nutrient: 'Nitrogen',
        recommendation: line.trim(),
        aiGenerated: true
      });
    }
    if (line.includes('phosphorus') || line.includes('Phosphorus') || line.includes('P')) {
      recommendations.push({
        nutrient: 'Phosphorus',
        recommendation: line.trim(),
        aiGenerated: true
      });
    }
    if (line.includes('potassium') || line.includes('Potassium') || line.includes('K')) {
      recommendations.push({
        nutrient: 'Potassium',
        recommendation: line.trim(),
        aiGenerated: true
      });
    }
    if (line.includes('pH') || line.includes('ph')) {
      recommendations.push({
        nutrient: 'pH Level',
        recommendation: line.trim(),
        aiGenerated: true
      });
    }
  }

  return recommendations.slice(0, 5); // Limit to top 5
}

/**
 * Determine if step is traditional, scientific, or hybrid
 */
function determineMethod(step: string): 'traditional' | 'scientific' | 'hybrid' {
  const lowerStep = step.toLowerCase();
  
  const traditionalKeywords = ['traditional', 'organic', 'compost', 'manure', 'neem', 'green manure'];
  const scientificKeywords = ['fertilizer', 'chemical', 'urea', 'dap', 'spray', 'pesticide'];
  
  const hasTraditional = traditionalKeywords.some(keyword => lowerStep.includes(keyword));
  const hasScientific = scientificKeywords.some(keyword => lowerStep.includes(keyword));
  
  if (hasTraditional && hasScientific) return 'hybrid';
  if (hasTraditional) return 'traditional';
  if (hasScientific) return 'scientific';
  
  return 'hybrid';
}

/**
 * Extract timing information from step
 */
function extractTiming(step: string): string {
  // Look for common timing patterns
  const timingPatterns = [
    /(\d+\s*weeks?\s*(?:before|after)\s*\w+)/i,
    /(\d+\s*days?\s*(?:before|after)\s*\w+)/i,
    /(at\s+\w+\s+stage)/i,
    /(during\s+\w+)/i,
    /(before\s+\w+)/i,
    /(after\s+\w+)/i
  ];

  for (const pattern of timingPatterns) {
    const match = step.match(pattern);
    if (match) return match[1];
  }

  return 'As recommended';
}

/**
 * Extract benefit from step description
 */
function extractBenefit(step: string): string {
  // Simple heuristic: look for benefit indicators
  const benefitMatch = step.match(/(?:to|for|ensures?|improves?|provides?|helps?)\s+(.+?)(?:\.|$)/i);
  if (benefitMatch) {
    return benefitMatch[1].trim();
  }
  return 'Supports crop health and yield';
}