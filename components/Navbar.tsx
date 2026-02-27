import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Farm Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-700">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Farm Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🌾</div>
          <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float" style={{animationDelay: '1s'}}>🚜</div>
          <div className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-float" style={{animationDelay: '2s'}}>🌱</div>
          <div className="absolute top-60 right-1/3 text-6xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>🌻</div>
          <div className="absolute bottom-40 right-10 text-5xl opacity-15 animate-float" style={{animationDelay: '0.5s'}}>🍃</div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="text-9xl animate-bounce inline-block">🌾</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Smart Farming Platform
          </h1>
          
          <p className="text-2xl md:text-4xl text-green-50 mb-4 font-semibold drop-shadow-lg">
            AI-Powered Agriculture Solutions
          </p>
          
          <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto drop-shadow-md">
            परंपरागत ज्ञान से आधुनिक खेती की ओर
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/crop-doctor"
              className="group bg-white text-green-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-50 transition-all transform hover:scale-110 shadow-2xl"
            >
              <span className="flex items-center justify-center gap-3">
                🩺 AI Crop Doctor
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              href="/advisory"
              className="group bg-amber-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-amber-600 transition-all transform hover:scale-110 shadow-2xl"
            >
              <span className="flex items-center justify-center gap-3">
                💡 Smart Advisory
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40 hover:bg-white/30 transition-all">
              <div className="text-5xl mb-2">👨‍🌾</div>
              <div className="text-4xl font-bold text-white mb-2">5000+</div>
              <div className="text-green-100 font-semibold">Farmers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40 hover:bg-white/30 transition-all">
              <div className="text-5xl mb-2">🌾</div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-green-100 font-semibold">Crops</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40 hover:bg-white/30 transition-all">
              <div className="text-5xl mb-2">🤖</div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-green-100 font-semibold">AI Support</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40 hover:bg-white/30 transition-all">
              <div className="text-5xl mb-2">✅</div>
              <div className="text-4xl font-bold text-white mb-2">Free</div>
              <div className="text-green-100 font-semibold">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-green-800 mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-2xl text-green-700">
              Everything you need in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Crop Doctor */}
            <Link href="/crop-doctor" className="group">
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all p-10 border-4 border-green-300 hover:border-green-500 transform hover:scale-105 h-full">
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">🩺</div>
                <h3 className="text-4xl font-bold text-green-800 mb-4">
                  AI Crop Doctor
                </h3>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Upload crop photos and get instant AI-powered disease detection with treatment plans in English and Hindi.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Instant Disease Detection</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Bilingual Treatment Plans</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Traditional + Modern Remedies</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Prevention Tips</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Advisory */}
            <Link href="/advisory" className="group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all p-10 border-4 border-amber-300 hover:border-amber-500 transform hover:scale-105 h-full">
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">💡</div>
                <h3 className="text-4xl font-bold text-amber-800 mb-4">
                  Smart Advisory
                </h3>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Get personalized farming recommendations based on location, soil, and crops. Traditional wisdom meets science.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-amber-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Soil-Based Advice</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Fertilizer Recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Watering Schedules</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-700 text-lg">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Pest Management</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-green-800 mb-4">
              How It Works
            </h2>
            <p className="text-2xl text-gray-600">
              Three simple steps to smarter farming
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-6xl">
                📸
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Upload or Ask</h3>
              <p className="text-lg text-gray-600">
                Take a photo of your crop or ask farming questions
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-6xl">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">2. AI Analyzes</h3>
              <p className="text-lg text-gray-600">
                Our AI instantly processes and analyzes your input
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-6xl">
                ✅
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">3. Get Solutions</h3>
              <p className="text-lg text-gray-600">
                Receive actionable recommendations instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-2xl text-green-100 mb-10">
            Join thousands of farmers using AI for better yields
          </p>
          <Link
            href="/crop-doctor"
            className="inline-block bg-white text-green-700 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-green-50 transition-all transform hover:scale-110 shadow-2xl"
          >
            Start Free Now 🌾
          </Link>
        </div>
      </section>
    </div>
  );
}