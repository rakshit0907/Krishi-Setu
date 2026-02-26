'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Virasat se Vikas tak
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-primary-100">
            विरासत से विकास तक
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Bridging Traditional Farming Wisdom with Modern AI Technology
          </p>
          <p className="text-lg mb-12 text-primary-100">
            पारंपरिक कृषि ज्ञान को आधुनिक AI तकनीक से जोड़ना
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/advisory" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg">
              ✨ Get AI Advisory
            </Link>
            <Link href="/crop-doctor" className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg flex items-center gap-2">
              🩺 Try Crop Doctor
              <span className="bg-yellow-400 text-purple-900 text-xs px-2 py-1 rounded-full">NEW!</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-700">
            Our AI-Powered Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* AI Advisory */}
            <Link href="/advisory" className="card hover:shadow-xl transition-shadow cursor-pointer border-2 border-primary-200 hover:border-primary-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-2xl font-bold mb-3 text-primary-700">AI Farming Advisory</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ✨ AI-Powered
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Get personalized farming recommendations combining traditional practices with AI analysis
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-2">
                  <li>✓ Ask specific farming questions</li>
                  <li>✓ AI analyzes soil & traditional knowledge</li>
                  <li>✓ Step-by-step action plans</li>
                  <li>✓ Sustainability & cost scoring</li>
                </ul>
              </div>
            </Link>

            {/* AI Crop Doctor - NEW! */}
            <Link href="/crop-doctor" className="card hover:shadow-xl transition-shadow cursor-pointer border-2 border-purple-300 hover:border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-purple-900 font-bold text-xs px-3 py-1 rounded-full animate-pulse">
                  NEW!
                </span>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🩺</div>
                <h3 className="text-2xl font-bold mb-3 text-purple-700">AI Crop Doctor</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    🤖 AI Vision
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Upload crop photos for instant AI-powered health diagnosis and treatment recommendations
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-2">
                  <li>✓ Disease detection from images</li>
                  <li>✓ Pest identification</li>
                  <li>✓ Nutrient deficiency analysis</li>
                  <li>✓ Traditional + modern treatments</li>
                </ul>
              </div>
            </Link>

            {/* Community Knowledge */}
            <Link href="/admin" className="card hover:shadow-xl transition-shadow cursor-pointer border-2 border-earth-200 hover:border-earth-400">
              <div className="text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold mb-3 text-earth-700">Community Knowledge</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-earth-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Crowdsourced
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Share and learn from traditional farming practices across India
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-2">
                  <li>✓ Submit traditional practices</li>
                  <li>✓ Expert verification</li>
                  <li>✓ Preserve ancestral knowledge</li>
                  <li>✓ Growing knowledge base</li>
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-earth-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-700">
            Growing Coverage Across India
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">5+</div>
              <p className="text-xl font-semibold text-gray-700">States</p>
              <p className="text-sm text-gray-600 mt-2">UP, Punjab, Maharashtra, Tamil Nadu, Karnataka</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">6+</div>
              <p className="text-xl font-semibold text-gray-700">Districts</p>
              <p className="text-sm text-gray-600 mt-2">Lucknow, Ludhiana, Nagpur, Nashik, Coimbatore, Bengaluru</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">5+</div>
              <p className="text-xl font-semibold text-gray-700">Major Crops</p>
              <p className="text-sm text-gray-600 mt-2">Wheat, Rice, Cotton, Sugarcane, Ragi</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">
              Coverage expanding continuously through community contributions
            </p>
            <Link href="/admin" className="btn-primary inline-block">
              Contribute Your Knowledge
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-700">
            How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Select Your Location & Crop</h3>
                  <p className="text-gray-600">Choose your district and the crop you're growing from our expanding database</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Choose Your Tool</h3>
                  <p className="text-gray-600">
                    <strong>AI Advisory:</strong> Get comprehensive farming guidance<br/>
                    <strong>AI Crop Doctor:</strong> Upload crop photos for health diagnosis
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">AI Analyzes Your Data</h3>
                  <p className="text-gray-600">Advanced AI combines traditional knowledge, soil data, and visual analysis to generate insights</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Get Personalized Recommendations</h3>
                  <p className="text-gray-600">Receive actionable advice with step-by-step plans, traditional remedies, and modern solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers using AI to improve their crops while preserving traditional wisdom
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/advisory" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors">
              Get Started with Advisory
            </Link>
            <Link href="/crop-doctor" className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors border-2 border-white">
              Try Crop Doctor 🩺
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}