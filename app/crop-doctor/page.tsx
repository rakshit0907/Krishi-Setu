'use client';

import { useState, useRef } from 'react';

interface Disease {
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
}

interface NutrientDeficiency {
  nutrient: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string;
  remedy: string;
}

interface Diagnosis {
  healthStatus: string;
  healthScore: number;
  diseases: Disease[];
  pests: Disease[];
  nutrientDeficiencies: NutrientDeficiency[];
  recommendations: string[];
  traditionalRemedies: string[];
  preventiveMeasures: string[];
  urgency: 'immediate' | 'soon' | 'routine';
  summary: string;
}

export default function CropDoctorPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const crops = [
    { value: '', label: 'Not sure / पता नहीं' },
    { value: 'Wheat', label: 'Wheat (गेहूं)' },
    { value: 'Rice', label: 'Rice (धान)' },
    { value: 'Cotton', label: 'Cotton (कपास)' },
    { value: 'Sugarcane', label: 'Sugarcane (गन्ना)' },
    { value: 'Ragi', label: 'Ragi (रागी)' },
    { value: 'Corn', label: 'Corn (मक्का)' },
    { value: 'Tomato', label: 'Tomato (टमाटर)' },
    { value: 'Potato', label: 'Potato (आलू)' },
    { value: 'Onion', label: 'Onion (प्याज)' },
    { value: 'Other', label: 'Other (अन्य)' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setDiagnosis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
  if (!selectedImage) {
    setError('Please select an image first / कृपया पहले एक तस्वीर चुनें');
    return;
  }

  setLoading(true);
  setError(null);
  setDiagnosis(null);

   try {
  const response = await fetch("/api/crop-doctor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: selectedImage }),
  });

  const { diagnosis, error } = await response.json(); // ✅ parse once

  if (diagnosis) {
    setDiagnosis(diagnosis);
  } else {
    setError(error || "Failed to analyze image");
  }
} catch (err) {
  setError("An error occurred while analyzing the image");
  console.error(err);
} finally {
  setLoading(false);
}
};
  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const getUrgencyBadge = (urgency: 'immediate' | 'soon' | 'routine') => {
    switch (urgency) {
      case 'immediate':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">🚨 Immediate Action Required</span>;
      case 'soon':
        return <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">⚠️ Action Needed Soon</span>;
      case 'routine':
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">✓ Routine Care</span>;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-primary-700">
              🩺 AI Crop Doctor
            </h1>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
              ✨ AI Vision
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-primary-600 mb-4">
            AI फसल चिकित्सक
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a photo of your crop and get instant AI-powered health diagnosis, disease detection, and treatment recommendations
          </p>
          <p className="text-gray-500 text-sm mt-2">
            अपनी फसल की तस्वीर अपलोड करें और तुरंत AI-संचालित स्वास्थ्य निदान, रोग का पता लगाना और उपचार की सिफारिशें प्राप्त करें
          </p>
        </div>

        {/* Upload Section */}
        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            📸 Upload Crop Image / फसल की तस्वीर अपलोड करें
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Image Upload */}
            <div>
              {!selectedImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={cameraInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                  />
                  
                  <div className="mb-4">
                    <span className="text-6xl">📷</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Upload or capture crop image
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-primary"
                    >
                      📁 Choose from Gallery
                    </button>
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="btn-secondary"
                    >
                      📸 Take Photo
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    Supported: JPG, PNG, HEIC (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setDiagnosis(null);
                      setError(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Optional Information */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Crop Type / फसल का प्रकार (Optional)
                </label>
                <select
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="input-field"
                >
                  {crops.map((crop) => (
                    <option key={crop.value} value={crop.value}>
                      {crop.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  AI will identify if you're not sure
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Location / स्थान (Optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Lucknow, Uttar Pradesh"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  What symptoms do you see? / आप क्या लक्षण देखते हैं? (Optional)
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="e.g., Yellow spots on leaves, wilting, brown patches..."
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚙️</span>
                    AI Analyzing... / विश्लेषण हो रहा है...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🔬 Analyze with AI / AI से विश्लेषण करें
                  </span>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="space-y-6">
            {/* Health Overview */}
            <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Health Status / स्वास्थ्य स्थिति
                  </h3>
                  <p className="text-lg text-gray-600 mt-1">{diagnosis.healthStatus}</p>
                </div>
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getHealthColor(diagnosis.healthScore)}`}>
                    {diagnosis.healthScore}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Health Score</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        diagnosis.healthScore >= 80 ? 'bg-green-500' :
                        diagnosis.healthScore >= 60 ? 'bg-yellow-500' :
                        diagnosis.healthScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${diagnosis.healthScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-6">
                  {getUrgencyBadge(diagnosis.urgency)}
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-gray-700 font-medium">{diagnosis.summary}</p>
              </div>
            </div>

            {/* Diseases */}
{diagnosis?.diseases && diagnosis.diseases.length > 0 && (
  <div className="card border-2 border-red-200">
    <h3 className="text-2xl font-bold mb-4 text-red-700 flex items-center gap-2">
      <span>🦠</span> Diseases
    </h3>
    {diagnosis.diseases.map((disease, idx) => (
      <div
        key={idx}
        className={`p-3 border rounded mb-2 ${getSeverityColor(disease.severity)}`}
      >
        <p className="font-semibold">{disease.name}</p>
        <p>{disease.description}</p>
        <p className="text-sm">Treatment: {disease.treatment}</p>
      </div>
    ))}
  </div>
)}

            
            {/* Pests */}
{diagnosis?.pests && diagnosis.pests.length > 0 && (
  <div className="card border-2 border-orange-200">
    <h3 className="text-2xl font-bold mb-4 text-orange-700 flex items-center gap-2">
      <span>🐛</span> Pests
    </h3>
    {diagnosis.pests.map((pest, idx) => (
      <div
        key={idx}
        className={`p-3 border rounded mb-2 ${getSeverityColor(pest.severity)}`}
      >
        <p className="font-semibold">{pest.name}</p>
        <p>{pest.description}</p>
        <p className="text-sm">Treatment: {pest.treatment}</p>
      </div>
    ))}
  </div>
)}

            {/* Nutrient Deficiencies */}
{diagnosis?.nutrientDeficiencies && diagnosis.nutrientDeficiencies.length > 0 && (
  <div className="card border-2 border-yellow-200">
    <h3 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
      <span>⚗️</span> Nutrient Deficiencies
    </h3>
    {diagnosis.nutrientDeficiencies.map((def, idx) => (
      <div
        key={idx}
        className={`p-3 border rounded mb-2 ${getSeverityColor(def.severity)}`}
      >
        <p className="font-semibold">{def.nutrient}</p>
        <p>{def.symptoms}</p>
        <p className="text-sm">Remedy: {def.remedy}</p>
      </div>
    ))}
  </div>
)}

{/* Recommendations */}
{diagnosis?.recommendations && diagnosis.recommendations.length > 0 && (
  <div className="card border-2 border-green-200">
    <h3 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
      <span>✅</span> Recommendations
    </h3>
    <ul className="space-y-2">
      {diagnosis.recommendations.map((rec, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-primary-600 font-bold">{index + 1}.</span>
          <span className="text-gray-700">{rec}</span>
        </li>
      ))}
    </ul>
  </div>
)}

            {/* Traditional Remedies */}
{diagnosis?.traditionalRemedies && diagnosis.traditionalRemedies.length > 0 && (
  <div className="card bg-earth-50 border-2 border-earth-200">
    <h3 className="text-2xl font-bold mb-4 text-earth-700 flex items-center gap-2">
      <span>🌿</span> Traditional Remedies
    </h3>
    <ul className="space-y-2">
      {diagnosis.traditionalRemedies.map((remedy, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-primary-600 font-bold">{idx + 1}.</span>
          <span className="text-gray-700">{remedy}</span>
        </li>
      ))}
    </ul>
  </div>
)}

            {/* Preventive Measures */}
{diagnosis?.preventiveMeasures && diagnosis.preventiveMeasures.length > 0 && (
  <div className="card border-2 border-green-200">
    <h3 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
      <span>🛡️</span> Preventive Measures
    </h3>
    <ul className="space-y-2">
      {diagnosis.preventiveMeasures.map((measure, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-green-600">✓</span>
          <span className="text-gray-700">{measure}</span>
        </li>
      ))}
    </ul>
  </div>
)}

            {/* Action Button */}
            <div className="card bg-gray-50 text-center">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setDiagnosis(null);
                  setCropName('');
                  setLocation('');
                  setSymptoms('');
                }}
                className="btn-primary"
              >
                🔄 Analyze Another Crop / दूसरी फसल का विश्लेषण करें
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        {!diagnosis && !loading && (
          <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <h3 className="text-xl font-bold mb-4 text-blue-800 flex items-center gap-2">
              <span>ℹ️</span>
              How It Works / यह कैसे काम करता है
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📸</div>
                <h4 className="font-bold text-gray-800 mb-2">1. Upload Photo</h4>
                <p className="text-sm text-gray-600">
                  Take a clear photo of your crop showing any issues
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h4 className="font-bold text-gray-800 mb-2">2. AI Analysis</h4>
                <p className="text-sm text-gray-600">
                  Advanced AI analyzes the image for diseases, pests, and health
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💊</div>
                <h4 className="font-bold text-gray-800 mb-2">3. Get Treatment</h4>
                <p className="text-sm text-gray-600">
                  Receive detailed diagnosis and treatment recommendations
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">📋 Tips for Best Results:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Take photos in good natural lighting</li>
                <li>✓ Focus on affected areas (leaves, stems, fruits)</li>
                <li>✓ Include close-up of symptoms</li>
                <li>✓ Capture multiple angles if possible</li>
                <li>✓ Avoid blurry or dark images</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}