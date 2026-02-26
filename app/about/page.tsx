export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            About Virasat se Vikas tak
          </h1>
          <h2 className="text-3xl font-semibold text-primary-600">
            विरासत से विकास तक के बारे में
          </h2>
        </div>

        {/* Mission */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Our Vision / हमारा उद्देश्य
          </h2>
          <p className="text-gray-700 mb-3">
            To bridge the gap between traditional agricultural wisdom and modern scientific farming practices,
            creating a sustainable, cost-effective, and culturally rooted approach to agriculture in India.
          </p>
          <p className="text-gray-600 text-sm">
            पारंपरिक कृषि ज्ञान और आधुनिक वैज्ञानिक कृषि प्रथाओं के बीच की खाई को पाटना,
            भारत में टिकाऊ, लागत प्रभावी और सांस्कृतिक रूप से निहित कृषि दृष्टिकोण बनाना।
          </p>
        </section>

        {/* The Problem */}
        <section className="card mb-8 bg-red-50 border-red-200">
          <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            The Problem / समस्या
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p>
                <strong>Loss of Traditional Knowledge:</strong> Ancestral farming wisdom is disappearing as
                younger generations adopt only modern methods without understanding traditional practices.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p>
                <strong>Chemical Dependency:</strong> Over-reliance on chemical fertilizers and pesticides
                has degraded soil health and increased farming costs.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p>
                <strong>Environmental Damage:</strong> Intensive chemical farming has led to soil erosion,
                water pollution, and loss of biodiversity.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p>
                <strong>Climate Vulnerability:</strong> Modern monoculture practices have made farming
                more vulnerable to climate change impacts.
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            पारंपरिक ज्ञान का नुकसान, रासायनिक निर्भरता, पर्यावरणीय क्षति, और जलवायु भेद्यता।
          </p>
        </section>

        {/* Our Solution */}
        <section className="card mb-8 bg-primary-50 border-primary-200">
          <h2 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Our Solution / हमारा समाधान
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-primary-800 mb-2">
                1. Digital Knowledge Repository
              </h3>
              <p className="text-gray-700">
                We digitize and organize traditional farming practices from across regions, making them
                easily accessible to farmers everywhere.
              </p>
              <p className="text-gray-600 text-sm">
                हम विभिन्न क्षेत्रों से पारंपरिक कृषि प्रथाओं को डिजिटाइज़ करते हैं।
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-primary-800 mb-2">
                2. Science-Backed Recommendations
              </h3>
              <p className="text-gray-700">
                We analyze soil health data to provide scientifically validated recommendations for
                nutrient management and crop care.
              </p>
              <p className="text-gray-600 text-sm">
                हम पोषक तत्व प्रबंधन के लिए वैज्ञानिक रूप से मान्य सिफारिशें प्रदान करते हैं।
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-primary-800 mb-2">
                3. Blended Advisory System
              </h3>
              <p className="text-gray-700">
                Our intelligent rule engine combines traditional practices with scientific data to create
                customized farming plans that reduce chemical use while maintaining productivity.
              </p>
              <p className="text-gray-600 text-sm">
                हमारा बुद्धिमान नियम इंजन रासायनिक उपयोग को कम करते हुए उत्पादकता बनाए रखता है।
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-primary-800 mb-2">
                4. Community Crowdsourcing
              </h3>
              <p className="text-gray-700">
                Farmers, researchers, and agricultural experts can submit their traditional knowledge,
                creating a self-updating, community-driven knowledge base.
              </p>
              <p className="text-gray-600 text-sm">
                किसान और विशेषज्ञ अपना पारंपरिक ज्ञान जमा कर सकते हैं।
              </p>
            </div>
          </div>
        </section>

        {/* National Relevance */}
        <section className="card mb-8 bg-earth-50 border-earth-200">
          <h2 className="text-2xl font-bold text-earth-700 mb-4 flex items-center">
            <span className="mr-2">🇮🇳</span>
            National Relevance / राष्ट्रीय प्रासंगिकता
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Alignment with Government Initiatives:</strong> Our platform supports national goals
              like Natural Farming (Bhartiya Prakritik Krishi Paddhati), Soil Health Card Scheme, and
              sustainable agriculture missions.
            </p>
            <p>
              <strong>Preserving Cultural Heritage:</strong> We protect and promote India's rich agricultural
              heritage, ensuring traditional knowledge isn't lost to modernization.
            </p>
            <p>
              <strong>Farmer Income Support:</strong> By reducing input costs and improving soil health,
              we help achieve the goal of doubling farmer incomes.
            </p>
            <p>
              <strong>Climate Resilience:</strong> Traditional practices often have built-in climate
              resilience, making farms better adapted to changing weather patterns.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
            <span className="mr-2">⚙️</span>
            How It Works / यह कैसे काम करता है
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Select Your Region and Crop</h3>
                <p className="text-gray-600">Choose your district and the crop you're growing</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Get Personalized Advisory</h3>
                <p className="text-gray-600">Receive traditional practices, scientific recommendations, and a blended plan</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Implement the Plan</h3>
                <p className="text-gray-600">Follow the step-by-step guidance with timing and methods</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Share Your Knowledge</h3>
                <p className="text-gray-600">Contribute your own traditional practices to help other farmers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="card bg-gradient-to-r from-primary-50 to-earth-50">
          <h2 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
            <span className="mr-2">🚀</span>
            Future Vision / भविष्य की दृष्टि
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>• Expand to all districts and major crops across India</p>
            <p>• Integrate real-time weather data and climate predictions</p>
            <p>• Add marketplace for organic inputs and traditional seeds</p>
            <p>• Mobile app with offline support for remote areas</p>
            <p>• AI-powered personalization based on farm history</p>
            <p>• Regional language support (Marathi, Tamil, Bengali, Telugu, etc.)</p>
            <p>• Partnership with agricultural universities and research centers</p>
          </div>
        </section>
      </div>
    </div>
  );
}
