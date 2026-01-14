import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaShieldAlt, FaLock, FaKey, FaCheckCircle, FaUserCircle, FaPlayCircle, FaUsers, FaChartBar, FaGoogle, FaHistory, FaCopy, FaFilter, FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import { MdSecurity, MdVerifiedUser, MdAutoAwesome, MdCloudOff, MdWarning, MdEnhancedEncryption, MdVisibilityOff, MdFolderShared, MdHandshake, MdMenu, MdMoreVert, MdPassword, MdDashboard, MdCategory, MdQrCode2, MdDevices, MdImportExport, MdNotifications, MdFingerprint } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'

function Home() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-linear-to-br from-[#22040b] via-[#120006] to-black text-stone-100">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#22040b]/80 border-b border-red-500/20">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.png" alt="SecureVault Logo" className="h-15 w-15 sm:h-15 sm:w-15 object-contain" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">SecureVault</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-red-500 transition-colors cursor-pointer">Features</a>
            <a href="#security" className="text-sm font-medium hover:text-red-500 transition-colors cursor-pointer">Security</a>
            <a href="#roadmap" className="text-sm font-medium hover:text-red-500 transition-colors cursor-pointer">Roadmap</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              onClick={() => navigate('/login')}
              variant="ghost"
              className="hidden sm:flex h-10 px-5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 font-medium text-sm transition-all"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="hidden sm:flex h-10 px-5 rounded-full bg-red-500 text-black font-bold text-sm hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_15px_rgba(234,40,49,0.3)]"
            >
              Sign Up
            </Button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <MdMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-[#22040b] border-l border-red-500/20 z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-red-500/20">
                <h3 className="font-bold text-lg">Menu</h3>
                <button 
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-stone-800 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <nav className="flex-1 p-4 flex flex-col gap-2">
                <a 
                  href="#features" 
                  onClick={closeMobileMenu}
                  className="px-4 py-3 hover:bg-stone-800 rounded-lg text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a 
                  href="#security" 
                  onClick={closeMobileMenu}
                  className="px-4 py-3 hover:bg-stone-800 rounded-lg text-sm font-medium transition-colors"
                >
                  Security
                </a>
                <a 
                  href="#roadmap" 
                  onClick={closeMobileMenu}
                  className="px-4 py-3 hover:bg-stone-800 rounded-lg text-sm font-medium transition-colors"
                >
                  Roadmap
                </a>
              </nav>
              <div className="p-4 border-t border-red-500/20 flex flex-col gap-3">
                <Button 
                  onClick={() => {
                    navigate('/login')
                    closeMobileMenu()
                  }}
                  variant="outline"
                  className="w-full h-11 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 font-medium"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/signup')
                    closeMobileMenu()
                  }}
                  className="w-full h-11 rounded-full bg-red-500 text-black font-bold hover:brightness-110 shadow-[0_0_15px_rgba(234,40,49,0.3)]"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <main className="grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full px-4 sm:px-6 py-8 sm:py-12 md:py-24 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-4 sm:gap-6 flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 w-fit mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-medium uppercase tracking-wider text-red-400">Your Guide to Digital Safety</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Secure Your Digital Life with <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-yellow-200">Industry-Grade Protection</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A complete password management solution with 2FA, breach monitoring, analytics, and smart password generation. Your passwords, secured and organized.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-red-500 text-black font-bold text-sm sm:text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,40,49,0.3)]"
                >
                  <FaPlayCircle className="mr-2" />
                  Get Started Free
                </Button>
                <Button 
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  className="h-12 px-8 rounded-full bg-stone-800 border-stone-700 hover:bg-stone-700 text-white font-bold text-base transition-colors"
                >
                  Explore Features
                </Button>
              </div>
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-stone-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#22040b] bg-linear-to-br from-red-400 to-red-600"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#22040b] bg-linear-to-br from-purple-400 to-purple-600"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#22040b] bg-linear-to-br from-blue-400 to-blue-600"></div>
                </div>
                <p>Trusted by millions for peace of mind</p>
              </div>
            </div>
            <div className="flex-1 w-full max-w-150">
              <div className="relative w-full aspect-square md:aspect-4/3 rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800 group">
                <div className="absolute inset-0 bg-linear-to-br from-stone-800 to-black opacity-90 z-0"></div>
                <div className="relative z-10 p-8 flex flex-col h-full justify-center">
                  <div className="w-full bg-stone-900/80 backdrop-blur-xl border border-stone-700 rounded-lg p-6 mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                          <FaLock />
                        </div>
                        <div>
                          <div className="h-2 w-24 bg-stone-700 rounded mb-1"></div>
                          <div className="h-2 w-16 bg-stone-800 rounded"></div>
                        </div>
                      </div>
                      <MdMoreVert className="text-stone-500" />
                    </div>
                    <div className="bg-black/50 rounded p-3 flex justify-between items-center border border-stone-800">
                      <div className="flex gap-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="h-2 w-2 rounded-full bg-white"></div>
                        ))}
                      </div>
                      <span className="text-red-500 text-xs font-mono">Strong</span>
                    </div>
                  </div>
                  <div className="absolute -right-4 top-10 bg-red-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-3 flex items-center gap-2">
                    <MdVerifiedUser className="text-sm" />
                    Protected
                  </div>
                  <div className="w-3/4 self-end bg-stone-800/80 backdrop-blur-xl border border-stone-600 rounded-lg p-4 transform group-hover:translate-y-2 transition-transform duration-500 delay-75">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-linear-to-tr from-purple-500 to-pink-500"></div>
                      <div className="h-2 w-20 bg-stone-600 rounded"></div>
                    </div>
                    <div className="h-1 w-full bg-stone-700 rounded overflow-hidden">
                      <div className="h-full w-[85%] bg-red-500"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full px-6 py-20 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">Comprehensive Features</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Everything You Need for Password Security</h2>
            <p className="text-lg text-stone-400 max-w-3xl mx-auto">
              From secure storage to intelligent analytics, SecureVault provides all the tools to manage and protect your digital identity.
            </p>
          </div>

          {/* Authentication & Security */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <FaShieldAlt className="text-red-500 text-3xl" />
              <h3 className="text-2xl md:text-3xl font-bold">Authentication & Security</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:scale-110 transition-transform">
                      <FaLock className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Email/Password Auth</h4>
                      <p className="text-sm text-stone-400">Secure registration with validation, email-based login, and password recovery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                      <FaGoogle className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Google OAuth 2.0</h4>
                      <p className="text-sm text-stone-400">One-click sign-in with Google for seamless authentication</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                      <MdQrCode2 className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Two-Factor Auth (2FA)</h4>
                      <p className="text-sm text-stone-400">TOTP-based authentication with QR codes and recovery codes for maximum security</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Password Vault */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <MdPassword className="text-red-500 text-3xl" />
              <h3 className="text-2xl md:text-3xl font-bold">Password Vault</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card onClick={() => navigate('/vault')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                      <FaKey className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Secure Storage</h4>
                      <p className="text-sm text-stone-400">Add, edit, delete passwords with encryption. Show/hide toggle and clipboard support</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Vault</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/vault')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform">
                      <MdCategory className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Smart Categories</h4>
                      <p className="text-sm text-stone-400">Organize by Social, Email, Banking, Work, and custom categories with icons</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Vault</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/vault')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                      <BiSearch className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Search & Filter</h4>
                      <p className="text-sm text-stone-400">Real-time search, filter by category and strength, grid/list views, pagination</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Vault</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/vault')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 group-hover:scale-110 transition-transform">
                      <FaChartBar className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Strength Indicators</h4>
                      <p className="text-sm text-stone-400">Visual strength meters: Weak, Medium, Strong, Very Strong with color coding</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Vault</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/vault')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400 group-hover:scale-110 transition-transform">
                      <FaCopy className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Quick Actions</h4>
                      <p className="text-sm text-stone-400">Copy to clipboard, favorites/starred passwords, detailed notes field</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Vault</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/vault')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                      <FaFilter className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Advanced Sorting</h4>
                      <p className="text-sm text-stone-400">Sort by newest, oldest, or password strength. Customizable items per page</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Vault</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Dashboard & Analytics */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <MdDashboard className="text-red-500 text-3xl" />
              <h3 className="text-2xl md:text-3xl font-bold">Dashboard & Analytics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card onClick={() => navigate('/dashboard')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:scale-110 transition-transform">
                      <FaChartBar className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Key Statistics</h4>
                      <p className="text-sm text-stone-400">Total passwords count, security score (0-100%), duplicate detection</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/dashboard')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                      <MdAutoAwesome className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Visual Charts</h4>
                      <p className="text-sm text-stone-400">Interactive bar charts, pie charts, area charts with click-to-filter navigation</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/dashboard')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                      <FaHistory className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Recent Activity</h4>
                      <p className="text-sm text-stone-400">Timeline of last 10 passwords with time-ago formatting and quick navigation</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/dashboard')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400 group-hover:scale-110 transition-transform">
                      <FaExclamationTriangle className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Password Health</h4>
                      <p className="text-sm text-stone-400">Duplicate detection, old password alerts (6+ months), age distribution</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/dashboard')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                      <MdCategory className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Category Distribution</h4>
                      <p className="text-sm text-stone-400">Interactive pie chart with percentages and click-to-filter functionality</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/dashboard')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400 group-hover:scale-110 transition-transform">
                      <MdSecurity className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Security Insights</h4>
                      <p className="text-sm text-stone-400">Strength breakdown, health recommendations, actionable security tips</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Go to Dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Password Generator & Tools */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <MdAutoAwesome className="text-red-500 text-3xl" />
              <h3 className="text-2xl md:text-3xl font-bold">Password Generator & Security Tools</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card onClick={() => navigate('/generator')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:scale-110 transition-transform">
                      <FaKey className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Smart Generator</h4>
                      <p className="text-sm text-stone-400">Create passwords 8-50 chars with customizable uppercase, lowercase, numbers, symbols</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Generate Password</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/generator')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                      <MdAutoAwesome className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Real-Time Analysis</h4>
                      <p className="text-sm text-stone-400">Instant strength meter, visual indicators, save directly to vault</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Generate Password</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/check-breach')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 group-hover:scale-110 transition-transform">
                      <MdWarning className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Password Breach Checker</h4>
                      <p className="text-sm text-stone-400">Verify passwords against 600M+ breaches using HaveIBeenPwned with k-anonymity privacy</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Check Passwords</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* User Profile & Settings */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <FaUserCircle className="text-red-500 text-3xl" />
              <h3 className="text-2xl md:text-3xl font-bold">User Profile & Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card onClick={() => navigate('/profile')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                      <FaUserCircle className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Account Management</h4>
                      <p className="text-sm text-stone-400">Update name, email, password with verification. View account details</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Manage Profile</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/profile')} className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                      <MdQrCode2 className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">2FA Setup Wizard</h4>
                      <p className="text-sm text-stone-400">3-step MFA wizard: recovery codes → QR scan → verification</p>
                      <span className="text-xs text-red-400 mt-2 inline-block">→ Enable 2FA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-stone-900/80 border-stone-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400 group-hover:scale-110 transition-transform">
                      <MdVerifiedUser className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Session Security</h4>
                      <p className="text-sm text-stone-400">Protected routes, automatic timeout, secure session management</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Priority Section */}
        <section id="security" className="w-full py-20 px-6 bg-stone-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">Military-Grade Security</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Your Security is Our Top Priority</h2>
              <p className="text-lg text-stone-400 max-w-3xl mx-auto">
                Built on industry-leading standards and best practices to keep your data absolutely secure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-black/50 border-red-500/30 hover:border-red-500 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-red-500/20 rounded-full w-fit mx-auto mb-4">
                    <MdEnhancedEncryption className="text-4xl text-red-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">AES-128 GCM Encryption</h4>
                  <p className="text-sm text-stone-400">Industry-standard encryption protects your data at rest</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-red-500/30 hover:border-red-500 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-blue-500/20 rounded-full w-fit mx-auto mb-4">
                    <MdVerifiedUser className="text-4xl text-blue-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">SOC 2 Type I Certified</h4>
                  <p className="text-sm text-stone-400">Enterprise-grade security via Appwrite Cloud</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-red-500/30 hover:border-red-500 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-purple-500/20 rounded-full w-fit mx-auto mb-4">
                    <MdSecurity className="text-4xl text-purple-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Argon2 Password Hashing</h4>
                  <p className="text-sm text-stone-400">Passwords secured with award-winning hashing algorithm</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-red-500/30 hover:border-red-500 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-green-500/20 rounded-full w-fit mx-auto mb-4">
                    <FaCheckCircle className="text-4xl text-green-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">HTTPS/TLS Enforced</h4>
                  <p className="text-sm text-stone-400">All data encrypted in transit with TLS certificates</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="w-full px-6 py-20 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">What's Coming Next</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Upcoming Features</h2>
            <p className="text-lg text-stone-400 max-w-3xl mx-auto">
              We're constantly evolving to bring you the best password management experience. Here's what's on the horizon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-black text-xs font-bold rounded-full">Soon</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                    <MdFolderShared className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Password Sharing</h4>
                    <p className="text-sm text-stone-400">Securely share passwords with family and team members without revealing them</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">Planned</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                    <FaHistory className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Password History</h4>
                    <p className="text-sm text-stone-400">Track changes and restore previous versions of your passwords</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full">In Dev</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                    <MdImportExport className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Import/Export</h4>
                    <p className="text-sm text-stone-400">Import from other managers and export your data in CSV/JSON formats</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-orange-500 text-black text-xs font-bold rounded-full">Q1 2026</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 group-hover:scale-110 transition-transform">
                    <MdDevices className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Browser Extension</h4>
                    <p className="text-sm text-stone-400">Auto-fill passwords directly in your browser with Chrome, Firefox, Edge support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-purple-500 text-black text-xs font-bold rounded-full">Future</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400 group-hover:scale-110 transition-transform">
                    <MdNotifications className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Expiration Reminders</h4>
                    <p className="text-sm text-stone-400">Get notified when passwords are old and need updating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">Future</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                    <MdFingerprint className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Biometric Auth</h4>
                    <p className="text-sm text-stone-400">Unlock with fingerprint or face recognition on mobile devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-indigo-500 text-black text-xs font-bold rounded-full">Future</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                    <FaUsers className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Team/Family Plans</h4>
                    <p className="text-sm text-stone-400">Shared vaults for families and teams with role-based access</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-black text-xs font-bold rounded-full">Research</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:scale-110 transition-transform">
                    <MdWarning className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Advanced Breach Monitoring</h4>
                    <p className="text-sm text-stone-400">Real-time breach alerts and dark web monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-stone-900 to-stone-800 border-stone-700 relative overflow-hidden group">
              <div className="absolute top-2 right-2 px-3 py-1 bg-teal-500 text-black text-xs font-bold rounded-full">Q2 2026</div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400 group-hover:scale-110 transition-transform">
                    <MdDevices className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Mobile App</h4>
                    <p className="text-sm text-stone-400">Native iOS and Android apps with offline access</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full px-6 py-24 flex justify-center">
          <div className="w-full max-w-7xl bg-red-500 rounded-lg md:rounded-xl p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight max-w-3xl">
                Ready to secure your digital life?
              </h2>
              <p className="text-stone-800 text-lg md:text-xl max-w-2xl font-medium">
                Join thousands who trust SecureVault for complete password security and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="h-14 px-8 rounded-full bg-black text-white font-bold text-lg hover:bg-stone-800 transition-colors shadow-xl"
                >
                  Get Started Free
                </Button>
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="h-14 px-8 rounded-full bg-white/50 border border-black/10 text-stone-900 font-bold text-lg hover:bg-white/80 transition-colors"
                >
                  Sign In
                </Button>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest mt-8 opacity-60">No credit card required • Secure by default</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-red-500/20 bg-black/40 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="SecureVault Logo" className="h-20 w-20 object-contain" />
              <h3 className="font-bold text-xl">SecureVault</h3>
            </div>
            <p className="text-stone-400 text-sm max-w-xs">
              Your complete password management solution with industry-grade security.
            </p>
          </div>
          <div className="flex flex-wrap gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold">Features</h4>
              <a onClick={() => navigate('/vault')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Password Vault</a>
              <a onClick={() => navigate('/dashboard')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Dashboard</a>
              <a onClick={() => navigate('/generator')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Password Generator</a>
              <a onClick={() => navigate('/check-breach')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Breach Check</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold">Account</h4>
              <a onClick={() => navigate('/signup')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Sign Up</a>
              <a onClick={() => navigate('/login')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Login</a>
              <a onClick={() => navigate('/profile')} className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Profile Settings</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold">Resources</h4>
              <a href="#features" className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">All Features</a>
              <a href="#security" className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Security</a>
              <a href="#roadmap" className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Roadmap</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-red-500/20 text-center md:text-left text-sm text-stone-500">
          © 2025 SecureVault. All rights reserved with Agnibha Chakraborty. Built with React 19 & Appwrite.
        </div>
      </footer>
    </div>
  )
}

export default Home