import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Farming Platform - AI-Powered Agriculture",
  description: "AI-powered crop disease detection and smart farming advisory for modern agriculture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-5xl">🌾</span>
                  <h3 className="text-3xl font-bold">Smart Farming</h3>
                </div>
                <p className="text-green-200 text-lg leading-relaxed mb-4">
                  AI-powered platform helping farmers grow better with technology and traditional wisdom.
                </p>
                <p className="text-green-300 font-semibold">
                  परंपरागत ज्ञान से आधुनिक खेती की ओर
                </p>
              </div>
              
              {/* Features */}
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-300">Features</h4>
                <ul className="space-y-3 text-green-200">
                  <li className="flex items-center gap-2">
                    <span>🩺</span> AI Crop Doctor
                  </li>
                  <li className="flex items-center gap-2">
                    <span>💡</span> Smart Advisory
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌱</span> Disease Detection
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌾</span> Soil Analysis
                  </li>
                </ul>
              </div>
              
              {/* Support */}
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-300">Support</h4>
                <ul className="space-y-3 text-green-200">
                  <li>📧 Email Support</li>
                  <li>📱 24/7 Available</li>
                  <li>🌐 Multi-language</li>
                  <li>💯 Free Forever</li>
                </ul>
              </div>
            </div>
            
            {/* Stats Bar */}
            <div className="border-t border-green-700 pt-8 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-300">5000+</div>
                  <div className="text-green-200">Farmers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">100+</div>
                  <div className="text-green-200">Crops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">50+</div>
                  <div className="text-green-200">Diseases</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">24/7</div>
                  <div className="text-green-200">Support</div>
                </div>
              </div>
            </div>
            
            {/* Bottom */}
            <div className="border-t border-green-700 pt-8 text-center">
              <p className="text-green-300 text-lg">
                © 2024 Smart Farming Platform. Empowering farmers with technology.
              </p>
              <p className="text-green-400 mt-2">
                Made with 💚 for Indian Farmers
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}