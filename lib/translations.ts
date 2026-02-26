// Translation dictionary for English and Hindi

export const translations = {
  // Navigation
  home: { en: 'Home', hi: 'होम' },
  advisory: { en: 'Get Advisory', hi: 'सलाह पाएं' },
  about: { en: 'About', hi: 'हमारे बारे में' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  admin: { en: 'Admin', hi: 'प्रबंधन' },
  
  // Common
  submit: { en: 'Submit', hi: 'जमा करें' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  save: { en: 'Save', hi: 'सहेजें' },
  loading: { en: 'Loading...', hi: 'लोड हो रहा है...' },
  error: { en: 'Error', hi: 'त्रुटि' },
  success: { en: 'Success', hi: 'सफल' },
  
  // Advisory page
  selectDistrict: { en: 'Select District', hi: 'जिला चुनें' },
  selectCrop: { en: 'Select Crop', hi: 'फसल चुनें' },
  getAdvisory: { en: 'Get Advisory', hi: 'सलाह देखें' },
  traditionalWisdom: { en: 'Traditional Wisdom', hi: 'परंपरागत ज्ञान' },
  scientificAdvice: { en: 'Scientific Advice', hi: 'वैज्ञानिक सलाह' },
  blendedPlan: { en: 'Blended Smart Plan', hi: 'संयुक्त योजना' },
  sustainabilityScore: { en: 'Sustainability Score', hi: 'स्थिरता स्कोर' },
  costScore: { en: 'Cost Efficiency Score', hi: 'लागत दक्षता स्कोर' },
  listenInHindi: { en: '🔊 Listen in Hindi', hi: '🔊 सुनें सलाह' },
  helpful: { en: 'Helpful', hi: 'उपयोगी' },
  notHelpful: { en: 'Not Helpful', hi: 'उपयोगी नहीं' },
  
  // Admin page
  submitTraditionalKnowledge: { en: 'Submit Traditional Knowledge', hi: 'पारंपरिक ज्ञान जमा करें' },
  pendingVerifications: { en: 'Pending Verifications', hi: 'सत्यापन के लिए लंबित' },
  practice: { en: 'Practice', hi: 'प्रथा' },
  benefit: { en: 'Benefit', hi: 'लाभ' },
  season: { en: 'Season', hi: 'मौसम' },
  source: { en: 'Source', hi: 'स्रोत' },
  submittedBy: { en: 'Submitted By', hi: 'द्वारा प्रस्तुत' },
  
  // Dashboard
  totalAdvisories: { en: 'Total Advisories', hi: 'कुल सलाह' },
  totalPractices: { en: 'Traditional Practices', hi: 'परंपरागत प्रथाएं' },
  avgSustainability: { en: 'Avg Sustainability', hi: 'औसत स्थिरता' },
  
  // About page
  ourMission: { en: 'Our Mission', hi: 'हमारा उद्देश्य' },
  theProblem: { en: 'The Problem', hi: 'समस्या' },
  ourSolution: { en: 'Our Solution', hi: 'हमारा समाधान' },
  
  // Footer
  projectTagline: { 
    en: 'Virasat se Vikas tak — Preserving Heritage, Empowering Farmers', 
    hi: 'विरासत से विकास तक — विरासत को संरक्षित करना, किसानों को सशक्त बनाना' 
  }
};

export const getTranslation = (key: keyof typeof translations, lang: 'en' | 'hi' = 'en'): string => {
  return translations[key]?.[lang] || key;
};
