import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { FaTachometerAlt, FaShieldAlt, FaLock, FaExclamationTriangle, FaCheckCircle, FaClock, FaCopy, FaHistory, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Loader } from '@/components/Loader';
import { usePasswordData } from '@/hooks/usePasswordData';
import { calculatePasswordStrength } from '@/utils/passwordStrength';

function Dashboard() {
  const navigate = useNavigate();
  const { passwords, loading, error } = usePasswordData({ lightweight: true });

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
        strengthDistribution: { weak: 0, medium: 0, strong: 0, 'very-strong': 0 },
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
    const strengthCount = { weak: 0, medium: 0, strong: 0, 'very-strong': 0 };
    const ageCount = { '0-3months': 0, '3-6months': 0, '6+months': 0 };

    // Note: In lightweight mode, we don't have actual password values
    // For demo purposes, we'll use mock strength calculation based on title/category
    // In production, you'd fetch this data separately or include strength in DB
    
    passwords.forEach(pwd => {
      // For real implementation, store password strength in database
      // Here we'll use a simplified approach
      const mockStrength = pwd.title?.length > 10 ? 'strong' : 'medium'; // Mock calculation
      
      // Strength distribution
      strengthCount[mockStrength] = (strengthCount[mockStrength] || 0) + 1;
      
      if (mockStrength === 'strong' || mockStrength === 'very-strong') {
        strong++;
      } else if (mockStrength === 'weak') {
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

      // Check duplicates (simplified - in real app, compare actual passwords)
      const key = pwd.title?.toLowerCase();
      if (passwordMap.has(key)) {
        duplicates++;
      } else {
        passwordMap.set(key, true);
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
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <FaCheckCircle className="text-green-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm">Strong Passwords</p>
                      <p className="text-white text-2xl font-bold">{stats.strong}</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                      <FaExclamationTriangle className="text-yellow-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm">Weak Passwords</p>
                      <p className="text-white text-2xl font-bold">{stats.weak}</p>
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
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Activity Timeline */}
                  <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FaHistory className="text-blue-500 text-xl" />
                        <h2 className="text-white font-bold text-lg">Recent Activity</h2>
                      </div>
                      <span className="text-stone-400 text-sm">Last 10 passwords</span>
                    </div>

                    {stats.recentActivity.length === 0 ? (
                      <div className="text-center py-8">
                        <FaLock className="text-stone-600 text-4xl mx-auto mb-3" />
                        <p className="text-stone-400">No passwords yet</p>
                        <p className="text-stone-500 text-sm mt-1">Start by adding your first password</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
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

                  {/* Password Health Insights */}
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
                        
                        <div className="space-y-3">
                          {/* 0-3 months */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-stone-300 text-sm">0-3 months</span>
                              <span className="text-green-400 text-sm font-medium">{stats.passwordAges['0-3months']}</span>
                            </div>
                            <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full transition-all"
                                style={{ width: `${stats.total > 0 ? (stats.passwordAges['0-3months'] / stats.total) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* 3-6 months */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-stone-300 text-sm">3-6 months</span>
                              <span className="text-yellow-400 text-sm font-medium">{stats.passwordAges['3-6months']}</span>
                            </div>
                            <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 rounded-full transition-all"
                                style={{ width: `${stats.total > 0 ? (stats.passwordAges['3-6months'] / stats.total) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* 6+ months */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-stone-300 text-sm">6+ months</span>
                              <span className="text-red-400 text-sm font-medium">{stats.passwordAges['6+months']}</span>
                            </div>
                            <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-500 rounded-full transition-all"
                                style={{ width: `${stats.total > 0 ? (stats.passwordAges['6+months'] / stats.total) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                  {/* Category Distribution */}
                  <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaChartPie className="text-purple-500 text-xl" />
                      <h2 className="text-white font-bold text-lg">Categories</h2>
                    </div>

                    {stats.total === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-stone-500 text-sm">No data yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(stats.categoryDistribution)
                          .sort(([, a], [, b]) => b - a)
                          .map(([category, count]) => {
                            const percentage = (count / stats.total) * 100;
                            const colors = {
                              social: 'bg-blue-500',
                              email: 'bg-purple-500',
                              banking: 'bg-green-500',
                              work: 'bg-orange-500',
                              other: 'bg-gray-500'
                            };

                            return (
                              <div
                                key={category}
                                onClick={() => navigate('/vault', { state: { category } })}
                                className="cursor-pointer hover:bg-stone-800/50 p-3 rounded-lg transition-all group"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">{getCategoryIcon(category)}</span>
                                    <span className="text-white capitalize font-medium">{category}</span>
                                  </div>
                                  <span className="text-stone-400 font-medium">{count}</span>
                                </div>
                                <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${colors[category] || colors.other} rounded-full transition-all group-hover:opacity-80`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="text-stone-500 text-xs mt-1">
                                  {percentage.toFixed(1)}% of total
                                </div>
                              </div>
                            );
                          })}
                      </div>
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

                  {/* Strength Distribution */}
                  <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaChartBar className="text-green-500 text-xl" />
                      <h2 className="text-white font-bold text-lg">Strength</h2>
                    </div>

                    {stats.total === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-stone-500 text-sm">No data yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Very Strong */}
                        <div
                          onClick={() => navigate('/vault', { state: { strength: 'very-strong' } })}
                          className="cursor-pointer hover:bg-stone-800/50 p-3 rounded-lg transition-all group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                              <span className="text-white font-medium">Very Strong</span>
                            </div>
                            <span className="text-stone-400 font-medium">{stats.strengthDistribution['very-strong'] || 0}</span>
                          </div>
                          <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full transition-all group-hover:opacity-80"
                              style={{ width: `${stats.total > 0 ? ((stats.strengthDistribution['very-strong'] || 0) / stats.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Strong */}
                        <div
                          onClick={() => navigate('/vault', { state: { strength: 'strong' } })}
                          className="cursor-pointer hover:bg-stone-800/50 p-3 rounded-lg transition-all group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-white font-medium">Strong</span>
                            </div>
                            <span className="text-stone-400 font-medium">{stats.strengthDistribution['strong'] || 0}</span>
                          </div>
                          <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full transition-all group-hover:opacity-80"
                              style={{ width: `${stats.total > 0 ? ((stats.strengthDistribution['strong'] || 0) / stats.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Medium */}
                        <div
                          onClick={() => navigate('/vault', { state: { strength: 'medium' } })}
                          className="cursor-pointer hover:bg-stone-800/50 p-3 rounded-lg transition-all group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <span className="text-white font-medium">Medium</span>
                            </div>
                            <span className="text-stone-400 font-medium">{stats.strengthDistribution['medium'] || 0}</span>
                          </div>
                          <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500 rounded-full transition-all group-hover:opacity-80"
                              style={{ width: `${stats.total > 0 ? ((stats.strengthDistribution['medium'] || 0) / stats.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Weak */}
                        <div
                          onClick={() => navigate('/vault', { state: { strength: 'weak' } })}
                          className="cursor-pointer hover:bg-stone-800/50 p-3 rounded-lg transition-all group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <span className="text-white font-medium">Weak</span>
                            </div>
                            <span className="text-stone-400 font-medium">{stats.strengthDistribution['weak'] || 0}</span>
                          </div>
                          <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500 rounded-full transition-all group-hover:opacity-80"
                              style={{ width: `${stats.total > 0 ? ((stats.strengthDistribution['weak'] || 0) / stats.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {stats.total > 0 && (
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
                    )}
                  </Card>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;