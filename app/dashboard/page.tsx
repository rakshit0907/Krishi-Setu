'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalAdvisories: number;
  totalPractices: number;
  verifiedPractices: number;
  pendingPractices: number;
  avgSustainability: number;
  avgCostScore: number;
  feedbackStats: {
    helpful: number;
    notHelpful: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch traditional knowledge
      const tkResponse = await fetch('/api/traditional');
      const tkData = await tkResponse.json();

      if (tkData.success) {
        const verified = tkData.data.filter((tk: any) => tk.verified).length;
        const pending = tkData.data.filter((tk: any) => !tk.verified).length;

        // Mock data for MVP (in production, calculate from actual advisory calls)
        setStats({
          totalAdvisories: 127,
          totalPractices: tkData.data.length,
          verifiedPractices: verified,
          pendingPractices: pending,
          avgSustainability: 78,
          avgCostScore: 82,
          feedbackStats: {
            helpful: 95,
            notHelpful: 12
          }
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-xl">Loading dashboard... / डैशबोर्ड लोड हो रहा है...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          Failed to load dashboard data
        </div>
      </div>
    );
  }

  const pieData = [
    { name: 'Helpful', value: stats.feedbackStats.helpful, color: '#22c55e' },
    { name: 'Not Helpful', value: stats.feedbackStats.notHelpful, color: '#ef4444' }
  ];

  const barData = [
    { name: 'Sustainability', score: stats.avgSustainability },
    { name: 'Cost Efficiency', score: stats.avgCostScore }
  ];

  const practiceData = [
    { name: 'Verified', count: stats.verifiedPractices, color: '#22c55e' },
    { name: 'Pending', count: stats.pendingPractices, color: '#f59e0b' }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Dashboard
          </h1>
          <h2 className="text-3xl font-semibold text-primary-600">
            डैशबोर्ड
          </h2>
          <p className="text-gray-600 mt-2">
            Platform metrics and sustainability insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card bg-blue-50 border-blue-200 text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-blue-700">
              {stats.totalAdvisories}
            </div>
            <div className="text-gray-700 font-semibold mt-1">
              Total Advisories
            </div>
            <div className="text-gray-600 text-sm">
              कुल सलाह
            </div>
          </div>

          <div className="card bg-primary-50 border-primary-200 text-center">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-3xl font-bold text-primary-700">
              {stats.totalPractices}
            </div>
            <div className="text-gray-700 font-semibold mt-1">
              Traditional Practices
            </div>
            <div className="text-gray-600 text-sm">
              परंपरागत प्रथाएं
            </div>
          </div>

          <div className="card bg-green-50 border-green-200 text-center">
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-3xl font-bold text-green-700">
              {stats.avgSustainability}%
            </div>
            <div className="text-gray-700 font-semibold mt-1">
              Avg Sustainability
            </div>
            <div className="text-gray-600 text-sm">
              औसत स्थिरता
            </div>
          </div>

          <div className="card bg-earth-50 border-earth-200 text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-earth-700">
              {stats.avgCostScore}%
            </div>
            <div className="text-gray-700 font-semibold mt-1">
              Avg Cost Efficiency
            </div>
            <div className="text-gray-600 text-sm">
              औसत लागत दक्षता
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Average Scores Chart */}
          <div className="card">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Average Scores / औसत स्कोर
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Feedback Distribution */}
          <div className="card">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              User Feedback / उपयोगकर्ता प्रतिक्रिया
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practice Status */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Knowledge Base Status / ज्ञान आधार स्थिति
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={practiceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {practiceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Impact Summary / प्रभाव सारांश
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Verified Practices:</span>
                <span className="font-bold text-green-700">{stats.verifiedPractices}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Pending Verification:</span>
                <span className="font-bold text-yellow-700">{stats.pendingPractices}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Positive Feedback Rate:</span>
                <span className="font-bold text-blue-700">
                  {((stats.feedbackStats.helpful / (stats.feedbackStats.helpful + stats.feedbackStats.notHelpful)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Advisories:</span>
                <span className="font-bold text-primary-700">{stats.totalAdvisories}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-12 card bg-blue-50 border-blue-200">
          <h3 className="font-bold text-lg mb-2 text-blue-800">
            📊 MVP Dashboard
          </h3>
          <p className="text-gray-700">
            This dashboard shows demo data for the MVP. In production, metrics will be calculated
            from real advisory usage, farmer feedback, and knowledge contributions.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            यह डैशबोर्ड एमवीपी के लिए डेमो डेटा दिखाता है। उत्पादन में, मेट्रिक्स वास्तविक डेटा से गणना की जाएगी।
          </p>
        </div>
      </div>
    </div>
  );
}
