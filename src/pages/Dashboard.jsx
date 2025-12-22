import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { FaTachometerAlt, FaShieldAlt, FaLock, FaExclamationTriangle, FaCheckCircle, FaClock, FaCopy, FaHistory, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/Loader';
import { usePasswordData } from '@/hooks/usePasswordData';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const { passwords, loading, error } = usePasswordData({ lightweight: false });

  // Calculate all statistics
  const stats = useMemo(() => {
    if (!passwords || passwords.length === 0) {
      return {
        total: 0,
        strong: 0,
        weak: 0,
        securityScore: 100,
        duplicates: 0,
        oldPasswords: 0,
        recentActivity: [],
        categoryDistribution: {},
        strengthDistribution: { weak: 0, medium: 0, strong: 0, veryStrong: 0 },
        passwordAges: { '0-3months': 0, '3-6months': 0, '6+months': 0 }
      };
    }

    const total = passwords.length;
    let strong = 0;
    let weak = 0;
    const passwordMap = new Map();
    let duplicates = 0;
    let oldPasswords = 0;
    const categoryCount = {};
    const strengthCount = { weak: 0, medium: 0, strong: 0, veryStrong: 0 };
    const ageCount = { '0-3months': 0, '3-6months': 0, '6+months': 0 };

    passwords.forEach(pwd => {
      // Use stored strength value from database
      const strengthLevel = pwd.strength || 'medium';
      
      // Strength distribution
      strengthCount[strengthLevel] = (strengthCount[strengthLevel] || 0) + 1;
      
      if (strengthLevel === 'strong' || strengthLevel === 'veryStrong') {
        strong++;
      } else if (strengthLevel === 'weak') {
        weak++;
      }

      // Category distribution
      const category = pwd.category || 'other';
      categoryCount[category] = (categoryCount[category] || 0) + 1;

      // Password age
      const createdDate = new Date(pwd.$createdAt);
      const monthsOld = (Date.now() - createdDate) / (1000 * 60 * 60 * 24 * 30);
      
      if (monthsOld <= 3) {
        ageCount['0-3months']++;
      } else if (monthsOld <= 6) {
        ageCount['3-6months']++;
      } else {
        ageCount['6+months']++;
        oldPasswords++;
      }

      // Check duplicates by comparing actual password values
      if (pwd.password) {
        if (passwordMap.has(pwd.password)) {
          passwordMap.set(pwd.password, passwordMap.get(pwd.password) + 1);
        } else {
          passwordMap.set(pwd.password, 1);
        }
      }
    });

    // Count duplicates: passwords that appear more than once
    passwordMap.forEach((count) => {
      if (count > 1) {
        duplicates += (count - 1); // Count extra occurrences as duplicates
      }
    });

    // Security score calculation
    const strongPercentage = total > 0 ? (strong / total) * 100 : 100;
    const duplicatesPenalty = duplicates * 5;
    const oldPasswordsPenalty = oldPasswords * 3;
    const securityScore = Math.max(0, Math.min(100, strongPercentage - duplicatesPenalty - oldPasswordsPenalty));

    // Recent activity (last 10)
    const recentActivity = passwords.slice(0, 10);

    return {
      total,
      strong,
      weak,
      securityScore: Math.round(securityScore),
      duplicates,
      oldPasswords,
      recentActivity,
      categoryDistribution: categoryCount,
      strengthDistribution: strengthCount,
      passwordAges: ageCount
    };
  }, [passwords]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'social': return '👥';
      case 'email': return '📧';
      case 'banking': return '🏦';
      case 'work': return '💼';
      default: return '🔐';
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black">
      <Sidebar />

      <div className="md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                <FaTachometerAlt className="text-red-500 text-xl" />
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                <p className="text-stone-400 text-sm">Overview & Statistics</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
              <Loader />
            </div>
          ) : (
            <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <FaLock className="text-blue-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm">Total Passwords</p>
                      <p className="text-white text-2xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <FaShieldAlt className="text-red-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm">Security Score</p>
                      <p className="text-white text-2xl font-bold">{stats.securityScore}%</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                      <FaCopy className="text-orange-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm">Duplicate Passwords</p>
                      <p className="text-white text-2xl font-bold">{stats.duplicates}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Main Content Grid */}
              {/* First Row: Recent Activity + Password Strength */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                {/* Recent Activity - 2/5 width */}
                <div className="lg:col-span-2">
                  <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FaHistory className="text-blue-500 text-xl" />
                        <h2 className="text-white font-bold text-lg">Recent Activity</h2>
                      </div>
                      <span className="text-stone-400 text-sm">Last 10</span>
                    </div>

                    {stats.recentActivity.length === 0 ? (
                      <div className="text-center py-8">
                        <FaLock className="text-stone-600 text-4xl mx-auto mb-3" />
                        <p className="text-stone-400">No passwords yet</p>
                        <p className="text-stone-500 text-sm mt-1">Start by adding your first password</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {stats.recentActivity.map((pwd, index) => (
                          <div
                            key={pwd.$id}
                            onClick={() => navigate('/vault')}
                            className="flex items-center gap-4 p-3 rounded-lg bg-stone-900/50 border border-stone-800 hover:border-blue-500/50 hover:bg-stone-800/50 cursor-pointer transition-all group"
                          >
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl flex-shrink-0">
                              {getCategoryIcon(pwd.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-white font-medium truncate">{pwd.title}</p>
                                {index === 0 && (
                                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs">
                                    Latest
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-stone-400 text-xs">{formatTimeAgo(pwd.$createdAt)}</span>
                                {pwd.category && (
                                  <>
                                    <span className="text-stone-600">•</span>
                                    <span className="text-stone-500 text-xs capitalize">{pwd.category}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-blue-400 hover:text-blue-300 text-sm">
                                View →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>

                {/* Password Strength - 3/5 width */}
                <div className="lg:col-span-3">
                  <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaChartBar className="text-green-500 text-xl" />
                      <h2 className="text-white font-bold text-lg">Password Strength</h2>
                    </div>

                    {stats.total === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-stone-500 text-sm">No data yet</p>
                      </div>
                    ) : (
                      <>
                        <div className="h-80 mb-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { 
                                  name: 'Very Strong', 
                                  count: stats.strengthDistribution.veryStrong || 0,
                                  fill: '#10b981',
                                  strength: 'veryStrong'
                                },
                                { 
                                  name: 'Strong', 
                                  count: stats.strengthDistribution.strong || 0,
                                  fill: '#22c55e',
                                  strength: 'strong'
                                },
                                { 
                                  name: 'Medium', 
                                  count: stats.strengthDistribution.medium || 0,
                                  fill: '#eab308',
                                  strength: 'medium'
                                },
                                { 
                                  name: 'Weak', 
                                  count: stats.strengthDistribution.weak || 0,
                                  fill: '#ef4444',
                                  strength: 'weak'
                                }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis 
                                dataKey="name" 
                                stroke="#9ca3af" 
                                tick={{ fontSize: 14 }}
                              />
                              <YAxis stroke="#9ca3af" />
                              <Tooltip contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '8px', color: '#fff' }} />
                              <Bar 
                                dataKey="count" 
                                radius={[8, 8, 0, 0]}
                                onClick={(data) => navigate('/vault', { state: { strength: data.strength } })}
                                className="cursor-pointer hover:opacity-80"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-4 p-3 bg-stone-900/50 border border-stone-800 rounded-lg">
                          <div className="text-center">
                            <p className="text-stone-400 text-xs mb-1">Average Security</p>
                            <p className={`text-2xl font-bold ${
                              stats.securityScore >= 80 ? 'text-green-500' :
                              stats.securityScore >= 60 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                              {stats.securityScore}%
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                </div>
              </div>

              {/* Second Row: Password Health + Category Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Password Health */}
                <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaExclamationTriangle className="text-yellow-500 text-xl" />
                      <h2 className="text-white font-bold text-lg">Password Health</h2>
                    </div>

                    <div className="space-y-4">
                      {/* Duplicate Passwords */}
                      <div className="p-4 rounded-lg bg-stone-900/50 border border-stone-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FaCopy className="text-orange-500" />
                            <span className="text-white font-medium">Duplicate Passwords</span>
                          </div>
                          <span className={`text-2xl font-bold ${stats.duplicates > 0 ? 'text-orange-500' : 'text-green-500'}`}>
                            {stats.duplicates}
                          </span>
                        </div>
                        <p className="text-stone-400 text-sm">
                          {stats.duplicates === 0 
                            ? 'Great! All passwords are unique' 
                            : `${stats.duplicates} password${stats.duplicates > 1 ? 's are' : ' is'} reused across multiple accounts`}
                        </p>
                      </div>

                      {/* Old Passwords */}
                      <div className="p-4 rounded-lg bg-stone-900/50 border border-stone-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FaClock className="text-yellow-500" />
                            <span className="text-white font-medium">Old Passwords</span>
                          </div>
                          <span className={`text-2xl font-bold ${stats.oldPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {stats.oldPasswords}
                          </span>
                        </div>
                        <p className="text-stone-400 text-sm">
                          {stats.oldPasswords === 0 
                            ? 'All passwords are recent' 
                            : `${stats.oldPasswords} password${stats.oldPasswords > 1 ? 's are' : ' is'} older than 6 months`}
                        </p>
                      </div>

                      {/* Password Age Distribution */}
                      <div className="p-4 rounded-lg bg-stone-900/50 border border-stone-800">
                        <div className="flex items-center gap-2 mb-3">
                          <FaHistory className="text-blue-500" />
                          <span className="text-white font-medium">Password Age Distribution</span>
                        </div>
                        
                        <div className="h-48 mb-3">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={[
                                { name: '0-3m', count: stats.passwordAges['0-3months'], fill: '#22c55e' },
                                { name: '3-6m', count: stats.passwordAges['3-6months'], fill: '#eab308' },
                                { name: '6+m', count: stats.passwordAges['6+months'], fill: '#ef4444' }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="name" stroke="#9ca3af" />
                              <YAxis stroke="#9ca3af" />
                              <Tooltip contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '8px', color: '#fff' }} />
                              <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div>
                            <p className="text-green-400 font-bold">{stats.passwordAges['0-3months']}</p>
                            <p className="text-stone-500">Recent</p>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-bold">{stats.passwordAges['3-6months']}</p>
                            <p className="text-stone-500">Moderate</p>
                          </div>
                          <div>
                            <p className="text-red-400 font-bold">{stats.passwordAges['6+months']}</p>
                            <p className="text-stone-500">Old</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                {/* Category Distribution */}
                <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaChartPie className="text-purple-500 text-xl" />
                      <h2 className="text-white font-bold text-lg">Category Distribution</h2>
                    </div>

                    {stats.total === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-stone-500 text-sm">No data yet</p>
                      </div>
                    ) : (
                      <>
                        <div className="h-64 mb-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={Object.entries(stats.categoryDistribution).map(([name, value]) => ({
                                  name: name.charAt(0).toUpperCase() + name.slice(1),
                                  value,
                                  fill: {
                                    social: '#3b82f6',
                                    email: '#a855f7',
                                    banking: '#22c55e',
                                    work: '#f97316',
                                    other: '#6b7280'
                                  }[name] || '#6b7280'
                                }))}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                dataKey="value"
                              >
                                {Object.entries(stats.categoryDistribution).map(([category], index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => navigate('/vault', { state: { category } })}
                                  />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '8px', color: '#fff' }} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {Object.entries(stats.categoryDistribution).map(([category, count]) => (
                            <button
                              key={category}
                              onClick={() => navigate('/vault', { state: { category } })}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                            >
                              {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}: {count}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {stats.total > 0 && (
                      <button
                        onClick={() => navigate('/vault')}
                        className="w-full mt-4 py-2 text-center text-blue-400 hover:text-blue-300 text-sm border border-stone-700 rounded-lg hover:border-blue-500/50 transition-all"
                      >
                        View All in Vault →
                      </button>
                    )}
                  </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;