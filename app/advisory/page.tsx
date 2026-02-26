'use client';

import { useState } from 'react';
import { AdvisoryResponse } from '@/types/advisory';

export default function AIAdvisoryPage() {
  const [district, setDistrict] = useState('');
  const [crop, setCrop] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [useAI, setUseAI] = useState(true);
  const [loading, setLoading] = useState(false);
  const [advisory, setAdvisory] = useState<AdvisoryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // District and crop options
  const districts = [
    { value: 'Lucknow', label: 'Lucknow (लखनऊ)', state: 'Uttar Pradesh' },
    { value: 'Ludhiana', label: 'Ludhiana (लुधियाना)', state: 'Punjab' },
    { value: 'Nagpur', label: 'Nagpur (नागपुर)', state: 'Maharashtra' },
    { value: 'Nashik', label: 'Nashik (नाशिक)', state: 'Maharashtra' },
    { value: 'Coimbatore', label: 'Coimbatore (கோயம்புத்தூர்)', state: 'Tamil Nadu' },
    { value: 'Bengaluru', label: 'Bengaluru (ಬೆಂಗಳೂರು)', state: 'Karnataka' },
  ];

  const crops = [
    { value: 'Wheat', label: 'Wheat (गेहूं)', season: 'Rabi' },
    { value: 'Rice', label: 'Rice (धान)', season: 'Kharif' },
    { value: 'Cotton', label: 'Cotton (कपास)', season: 'Kharif' },
    { value: 'Sugarcane', label: 'Sugarcane (गन्ना)', season: 'Year-round' },
    { value: 'Ragi', label: 'Ragi / Finger Millet (रागी)', season: 'Kharif' },
  ];

  const handleGetAdvisory = async () => {
    if (!district || !crop) {
      setError('Please select both district and crop / कृपया जिला और फसल दोनों चुनें');
      return;
    }

    setLoading(true);
    setError(null);
    setAdvisory(null);
    setFeedbackSubmitted(false);

    try {
      const response = await fetch('/api/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          district, 
          crop,
          useAI,
          userQuery: userQuery.trim() || undefined
        })
      });

      const data = await response.json();

      if (data.success) {
        setAdvisory(data);
      } else {
        setError(data.error || 'Failed to fetch advisory');
      }
    } catch (err) {
      setError('An error occurred while fetching advisory');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (helpful: boolean) => {
    if (!advisory?.data) return;

    try {
      const advisoryId = `${district}-${crop}-${Date.now()}`;
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advisory_id: advisoryId, helpful })
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }
  };

  const speakInHindi = () => {
    if (!advisory?.data) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const text = `
      परंपरागत ज्ञान: ${advisory.data.traditional.map(t => t.practice).join(', ')}
      वैज्ञानिक सलाह: ${advisory.data.scientific.map(s => s.recommendation).join(', ')}
      संयुक्त योजना: ${advisory.data.blended_plan.map(b => b.action).join(', ')}
    `;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const stopAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-primary-700">
              AI-Powered Farming Advisory
            </h1>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
              ✨ AI
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-primary-600 mb-4">
            AI संचालित कृषि परामर्श
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get intelligent farming recommendations powered by advanced AI, combining traditional wisdom with scientific analysis
          </p>
          <p className="text-gray-500 text-sm mt-2">
            पारंपरिक ज्ञान और वैज्ञानिक विश्लेषण के साथ AI द्वारा संचालित बुद्धिमान कृषि सिफारिशें प्राप्त करें
          </p>
        </div>

        {/* Input Form */}
        <div className="card mb-8">
          {/* AI Toggle */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <span>🤖</span>
                  AI-Powered Advisory
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Uses advanced AI to generate personalized recommendations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useAI} 
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Select District / जिला चुनें
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="input-field"
              >
                <option value="">Choose... / चुनें...</option>
                {districts.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label} — {d.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Select Crop / फसल चुनें
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="input-field"
              >
                <option value="">Choose... / चुनें...</option>
                {crops.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label} ({c.season})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Question Field */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700">
              <span className="flex items-center gap-2">
                💬 Ask a Specific Question (Optional)
                <span className="text-xs font-normal text-gray-500">(AI will focus on your question)</span>
              </span>
            </label>
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="input-field"
              rows={2}
              placeholder="e.g., 'How can I prevent pest attacks?' or 'Best irrigation schedule?'"
              disabled={!useAI}
            />
          </div>

          <button
            onClick={handleGetAdvisory}
            disabled={loading}
            className="btn-primary w-full md:w-auto"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚙️</span>
                {useAI ? 'AI Processing...' : 'Loading...'}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {useAI ? '✨ Get AI Advisory' : '📊 Get Advisory'}
                {useAI ? ' / AI सलाह देखें' : ' / सलाह देखें'}
              </span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Advisory Results */}
        {advisory?.data && (
          <div className="space-y-8">
            {/* AI Badge */}
            {advisory.data.isAIPowered && (
              <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h3 className="font-bold text-blue-900">AI-Generated Advisory</h3>
                    <p className="text-sm text-blue-700">
                      This advisory was generated by advanced AI, analyzing traditional practices and soil data
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Location Info */}
            <div className="card bg-gradient-to-r from-blue-50 to-primary-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    📍 {district} — {crop}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Advisory generated on {new Date().toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Traditional Practices Found</div>
                  <div className="text-2xl font-bold text-primary-700">
                    {advisory.data.traditional.length}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Warnings (if any) */}
            {advisory.data.ai_insights?.warnings && advisory.data.ai_insights.warnings.length > 0 && (
              <div className="card bg-yellow-50 border-yellow-200">
                <h3 className="font-bold text-lg mb-3 text-yellow-800 flex items-center gap-2">
                  ⚠️ Important Precautions / महत्वपूर्ण सावधानियां
                </h3>
                <ul className="space-y-2">
                  {advisory.data.ai_insights.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-yellow-600">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-primary-50 border-primary-200">
                <h3 className="font-bold text-lg mb-2 text-primary-800">
                  Sustainability Score / स्थिरता स्कोर
                </h3>
                <div className="text-4xl font-bold text-primary-600">
                  {advisory.data.sustainability_score}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${advisory.data.sustainability_score}%` }}
                  ></div>
                </div>
              </div>

              <div className="card bg-earth-50 border-earth-200">
                <h3 className="font-bold text-lg mb-2 text-earth-800">
                  Cost Efficiency Score / लागत दक्षता स्कोर
                </h3>
                <div className="text-4xl font-bold text-earth-600">
                  {advisory.data.cost_score}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-earth-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${advisory.data.cost_score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="font-bold text-lg mb-3 text-blue-800 flex items-center gap-2">
                📊 
                {advisory.data.isAIPowered ? 'AI Analysis' : 'Analysis'}
                / विश्लेषण
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{advisory.data.explanation}</p>
            </div>

            {/* AI Scientific Rationale (if available) */}
            {advisory.data.ai_insights?.scientificRationale && (
              <div className="card bg-purple-50 border-purple-200">
                <h3 className="text-2xl font-bold mb-4 text-purple-700 flex items-center gap-2">
                  <span>🔬</span>
                  AI Scientific Analysis / AI वैज्ञानिक विश्लेषण
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {advisory.data.ai_insights.scientificRationale}
                </p>
              </div>
            )}

            {/* Traditional Wisdom */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-primary-700 flex items-center">
                <span className="mr-2">📚</span>
                Traditional Wisdom / परंपरागत ज्ञान
              </h3>
              <div className="space-y-4">
                {advisory.data.traditional.map((practice, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4 py-2 bg-primary-50 rounded-r">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {practice.practice}
                    </h4>
                    <p className="text-gray-600 mt-1">{practice.benefit}</p>
                    {practice.season && (
                      <p className="text-sm text-gray-500 mt-1">
                        Season / मौसम: {practice.season}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Blended Smart Plan */}
            <div className="card bg-gradient-to-r from-primary-50 to-earth-50">
              <h3 className="text-2xl font-bold mb-4 text-primary-800 flex items-center gap-2">
                <span>🤝</span>
                {advisory.data.isAIPowered ? 'AI-Generated Action Plan' : 'Blended Smart Plan'}
                / संयुक्त योजना
              </h3>
              <div className="space-y-4">
                {advisory.data.blended_plan.map((step) => (
                  <div key={step.step} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-primary-500">
                    <div className="flex items-start">
                      <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg text-gray-800">
                          {step.action}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              step.method === 'traditional'
                                ? 'bg-primary-100 text-primary-700'
                                : step.method === 'scientific'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {step.method === 'traditional'
                              ? '🌱 Traditional'
                              : step.method === 'scientific'
                              ? '🔬 Scientific'
                              : '🤝 Hybrid'}
                          </span>
                          <span className="text-sm text-gray-500">
                            ⏰ {step.timing}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">{step.benefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card bg-gray-50">
              <div className="flex flex-wrap gap-4 justify-center">
                {!isPlaying ? (
                  <button
                    onClick={speakInHindi}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <span>🔊</span>
                    Listen in Hindi / सुनें सलाह
                  </button>
                ) : (
                  <button
                    onClick={stopAudio}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>⏹️</span>
                    Stop Audio / रोकें
                  </button>
                )}

                {!feedbackSubmitted ? (
                  <>
                    <button
                      onClick={() => handleFeedback(true)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>👍</span>
                      Helpful / उपयोगी
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>👎</span>
                      Not Helpful / उपयोगी नहीं
                    </button>
                  </>
                ) : (
                  <div className="text-green-600 font-semibold flex items-center gap-2">
                    <span>✓</span>
                    Thank you for your feedback! / प्रतिक्रिया के लिए धन्यवाद!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}