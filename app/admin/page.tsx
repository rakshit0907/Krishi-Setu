'use client';

import { useState, useEffect } from 'react';
import { TraditionalKnowledge } from '@/types/advisory';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    district: '',
    crop: '',
    practice: '',
    benefit: '',
    season: '',
    source: '',
    submitted_by: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pendingEntries, setPendingEntries] = useState<TraditionalKnowledge[]>([]);
  const [loading, setLoading] = useState(true);

  // Expanded districts and crops
  const districts = [
    { value: 'Lucknow', label: 'Lucknow (लखनऊ)', state: 'Uttar Pradesh' },
    { value: 'Ludhiana', label: 'Ludhiana (लुधियाना)', state: 'Punjab' },
    { value: 'Nagpur', label: 'Nagpur (नागपुर)', state: 'Maharashtra' },
    { value: 'Nashik', label: 'Nashik (नाशिक)', state: 'Maharashtra' },
    { value: 'Coimbatore', label: 'Coimbatore (கோயம்புத்தூர்)', state: 'Tamil Nadu' },
    { value: 'Bengaluru', label: 'Bengaluru (ಬೆಂಗಳೂರು)', state: 'Karnataka' },
  ];

  const crops = [
    { value: 'Wheat', label: 'Wheat (गेहूं)' },
    { value: 'Rice', label: 'Rice (धान)' },
    { value: 'Cotton', label: 'Cotton (कपास)' },
    { value: 'Sugarcane', label: 'Sugarcane (गन्ना)' },
    { value: 'Ragi', label: 'Ragi / Finger Millet (रागी)' },
  ];

  const seasons = [
    { value: 'Rabi', label: 'Rabi (रबी) - Oct-Mar' },
    { value: 'Kharif', label: 'Kharif (खरीफ) - Jun-Oct' },
    { value: 'Zaid', label: 'Zaid (जायद) - Mar-Jun' },
    { value: 'Year-round', label: 'Year-round (पूरे वर्ष)' },
    { value: 'Pre-Rabi', label: 'Pre-Rabi (रबी से पहले)' },
    { value: 'Pre-Kharif', label: 'Pre-Kharif (खरीफ से पहले)' },
  ];

  useEffect(() => {
    fetchPendingEntries();
  }, []);

  const fetchPendingEntries = async () => {
    try {
      const response = await fetch('/api/traditional?verified=false');
      const data = await response.json();
      if (data.success) {
        setPendingEntries(data.data);
      }
    } catch (error) {
      console.error('Error fetching pending entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.district || !formData.crop || !formData.practice || !formData.benefit) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'District, crop, practice, and benefit are required / जिला, फसल, प्रथा और लाभ आवश्यक हैं' 
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/traditional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Traditional knowledge submitted successfully! It will be reviewed before appearing in advisories. / सफलतापूर्वक जमा किया गया!' 
        });
        
        // Reset form
        setFormData({
          district: '',
          crop: '',
          practice: '',
          benefit: '',
          season: '',
          source: '',
          submitted_by: ''
        });

        // Refresh pending entries
        fetchPendingEntries();
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred / त्रुटि हुई' });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (id: string, verified: boolean) => {
    try {
      const response = await fetch('/api/traditional', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, verified })
      });

      const data = await response.json();

      if (data.success) {
        // Refresh pending entries
        fetchPendingEntries();
      }
    } catch (error) {
      console.error('Error verifying entry:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Admin & Crowdsourcing
          </h1>
          <h2 className="text-3xl font-semibold text-primary-600">
            प्रबंधन और सामुदायिक योगदान
          </h2>
          <p className="text-gray-600 mt-2">
            Submit traditional farming knowledge and manage pending verifications
          </p>
          <p className="text-gray-500 text-sm">
            पारंपरिक कृषि ज्ञान जमा करें और लंबित सत्यापन प्रबंधित करें
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Submission Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-primary-700 flex items-center">
              <span className="mr-2">📝</span>
              Submit Traditional Knowledge
            </h2>
            <h3 className="text-xl font-semibold mb-6 text-primary-600">
              पारंपरिक ज्ञान जमा करें
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  District / जिला *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="input-field"
                  required
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
                  Crop / फसल *
                </label>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Choose... / चुनें...</option>
                  {crops.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Practice / प्रथा *
                </label>
                <textarea
                  name="practice"
                  value={formData.practice}
                  onChange={handleInputChange}
                  className="input-field"
                  rows={3}
                  placeholder="Describe the traditional practice... / पारंपरिक प्रथा का वर्णन करें..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be specific and include both Hindi and English if possible
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Benefit / लाभ *
                </label>
                <textarea
                  name="benefit"
                  value={formData.benefit}
                  onChange={handleInputChange}
                  className="input-field"
                  rows={3}
                  placeholder="Explain the benefits... / लाभों की व्याख्या करें..."
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Season / मौसम (Optional)
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Choose... / चुनें...</option>
                  {seasons.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Source / स्रोत (Optional)
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Family tradition, Local farmers, Research paper"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Your Name / आपका नाम (Optional)
                </label>
                <input
                  type="text"
                  name="submitted_by"
                  value={formData.submitted_by}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Your name or leave blank for anonymous"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full"
              >
                {submitting ? 'Submitting... / जमा हो रहा है...' : 'Submit Knowledge / ज्ञान जमा करें'}
              </button>
            </form>

            {submitMessage && (
              <div className={`mt-4 p-4 rounded-lg ${
                submitMessage.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {submitMessage.text}
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">
                ℹ️ About Crowdsourcing / सामुदायिक योगदान के बारे में
              </h4>
              <p className="text-sm text-blue-700">
                Your submitted knowledge will be reviewed by our team before being added to the advisory system.
                This helps preserve traditional wisdom while ensuring quality and accuracy.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                आपका जमा किया गया ज्ञान हमारी टीम द्वारा समीक्षा की जाएगी।
              </p>
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-primary-700 flex items-center">
              <span className="mr-2">⏳</span>
              Pending Verifications ({pendingEntries.length})
            </h2>
            <h3 className="text-xl font-semibold mb-6 text-primary-600">
              सत्यापन के लिए लंबित
            </h3>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Loading... / लोड हो रहा है...
              </div>
            ) : pendingEntries.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✓</div>
                <p className="text-gray-500">
                  No pending entries / कोई लंबित प्रविष्टियाँ नहीं
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  All submissions have been reviewed!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {pendingEntries.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        Pending / लंबित
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-sm text-gray-600">District/Crop:</span>
                        <p className="text-gray-800 font-medium">{entry.district} — {entry.crop}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-sm text-gray-600">Practice:</span>
                        <p className="text-gray-800">{entry.practice}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-sm text-gray-600">Benefit:</span>
                        <p className="text-gray-800">{entry.benefit}</p>
                      </div>

                      {entry.season && (
                        <div>
                          <span className="font-semibold text-sm text-gray-600">Season:</span>
                          <p className="text-gray-800">{entry.season}</p>
                        </div>
                      )}

                      {entry.source && (
                        <div>
                          <span className="font-semibold text-sm text-gray-600">Source:</span>
                          <p className="text-gray-800">{entry.source}</p>
                        </div>
                      )}

                      <div>
                        <span className="font-semibold text-sm text-gray-600">Submitted by:</span>
                        <p className="text-gray-800">{entry.submitted_by || 'Anonymous'}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleVerify(entry.id, true)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex-1"
                      >
                        ✓ Verify / सत्यापित करें
                      </button>
                      <button
                        onClick={() => handleVerify(entry.id, false)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex-1"
                      >
                        ✗ Reject / अस्वीकार करें
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coverage Info */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-earth-50">
          <h2 className="text-2xl font-bold mb-6 text-primary-700 flex items-center">
            <span className="mr-2">🌍</span>
            Current Coverage / वर्तमान कवरेज
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">States Covered</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Uttar Pradesh</li>
                <li>✓ Punjab</li>
                <li>✓ Maharashtra</li>
                <li>✓ Tamil Nadu</li>
                <li>✓ Karnataka</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">Districts</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Lucknow</li>
                <li>✓ Ludhiana</li>
                <li>✓ Nagpur</li>
                <li>✓ Nashik</li>
                <li>✓ Coimbatore</li>
                <li>✓ Bengaluru</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">Crops</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Wheat (गेहूं)</li>
                <li>✓ Rice (धान)</li>
                <li>✓ Cotton (कपास)</li>
                <li>✓ Sugarcane (गन्ना)</li>
                <li>✓ Ragi (रागी)</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Help us expand! Submit traditional practices from your region to build a comprehensive national database.
          </p>
        </div>

        {/* How Crowdsourcing Works */}
        <div className="mt-8 card bg-gradient-to-r from-blue-50 to-primary-50">
          <h2 className="text-2xl font-bold mb-6 text-primary-700 flex items-center">
            <span className="mr-2">🔄</span>
            How Crowdsourcing Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Community Submits Knowledge</h3>
                <p className="text-gray-600">
                  Farmers, researchers, NGOs, and agricultural experts submit traditional practices they know
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Admin Reviews & Verifies</h3>
                <p className="text-gray-600">
                  Our team reviews submissions for accuracy, relevance, and quality before approval
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Auto-Updates Advisory System</h3>
                <p className="text-gray-600">
                  Once verified, practices automatically appear in relevant advisories for that region and crop
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Knowledge Base Grows</h3>
                <p className="text-gray-600">
                  The platform becomes smarter and more comprehensive over time through community contributions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
