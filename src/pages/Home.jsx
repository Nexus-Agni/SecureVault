import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaShieldAlt, FaLock, FaKey, FaCheckCircle, FaUserCircle, FaPlayCircle, FaUsers } from 'react-icons/fa'
import { MdSecurity, MdVerifiedUser, MdAutoAwesome, MdCloudOff, MdWarning, MdEnhancedEncryption, MdVisibilityOff, MdFolderShared, MdHandshake, MdMenu, MdMoreVert } from 'react-icons/md'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-linear-to-br from-[#22040b] via-[#120006] to-black text-stone-100">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#22040b]/80 border-b border-red-500/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-red-500 text-3xl" />
            <h2 className="text-xl font-bold tracking-tight">SecureVault</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-red-500 transition-colors cursor-pointer">How It Works</a>
            <a className="text-sm font-medium hover:text-red-500 transition-colors cursor-pointer">Why Secure</a>
            <a className="text-sm font-medium hover:text-red-500 transition-colors cursor-pointer">FAQs</a>
          </div>
          <div className="flex items-center gap-4">
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
            <button className="md:hidden p-2">
              <MdMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <main className="grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full px-6 py-12 md:py-24 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 w-fit mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-medium uppercase tracking-wider text-red-400">Your Guide to Digital Safety</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Unlock Your <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-yellow-200">Personal Security</span> Journey
              </h1>
              <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Feeling overwhelmed by online security? We'll guide you step-by-step to protect your digital life, simply and effectively.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="h-12 px-8 rounded-full bg-red-500 text-black font-bold text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,40,49,0.3)]"
                >
                  <FaPlayCircle className="mr-2" />
                  Begin Your Journey
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 px-8 rounded-full bg-stone-800 border-stone-700 hover:bg-stone-700 text-white font-bold text-base transition-colors"
                >
                  Learn More
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

        {/* Step 1: Challenge */}
        <section className="w-full px-6 py-20 max-w-7xl flex flex-col lg:flex-row items-center gap-12 bg-stone-900/50 rounded-xl my-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">Step 1: The Challenge</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Are Your Passwords a Weak Link?
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Remembering dozens of complex passwords is tough. Many of us use simple ones or reuse them, making us easy targets for online threats.
            </p>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-video w-full rounded-lg bg-stone-900 flex items-center justify-center p-8 border border-stone-700 shadow-xl relative overflow-hidden">
              <MdWarning className="text-red-500 text-7xl absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="bg-black/50 rounded p-3 flex justify-between items-center border border-stone-800 w-full max-w-sm z-10">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-white opacity-30"></div>
                  ))}
                </div>
                <span className="text-red-400 text-xs font-mono">Weak</span>
              </div>
              <p className="absolute bottom-4 text-sm text-stone-500 z-10">"password123" is easily guessed!</p>
            </div>
          </div>
        </section>

        {/* Solution: Password Generator */}
        <section className="w-full px-6 py-20 max-w-7xl flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">SecureVault's Answer</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Generate Super Strong Passwords Instantly
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Our built-in Smart Generator creates unique, uncrackable passwords for every account. Say goodbye to guesswork and hello to true security.
            </p>
            <Button 
              className="mt-8 h-12 px-8 rounded-full bg-red-500 text-black font-bold text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,40,49,0.3)] mx-auto lg:mx-0"
            >
              <FaKey className="mr-2" />
              Try the Generator
            </Button>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-video w-full rounded-lg bg-stone-900 flex items-center justify-center p-8 border border-stone-700 shadow-xl relative overflow-hidden">
              <MdAutoAwesome className="text-red-500 text-7xl absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="bg-black/50 rounded p-3 flex justify-between items-center border border-stone-800 w-full max-w-sm z-10">
                <div className="flex gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-white"></div>
                  ))}
                </div>
                <span className="text-red-500 text-xs font-mono">Strong</span>
              </div>
              <p className="absolute bottom-4 text-sm text-stone-500 z-10">One click, total protection.</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-7xl px-6 py-8 flex justify-center">
          <div className="w-20 h-1 rounded-full bg-red-500/50"></div>
        </div>

        {/* Step 2: Concern */}
        <section className="w-full px-6 py-20 max-w-7xl flex flex-col lg:flex-row items-center gap-12 bg-stone-900/50 rounded-xl my-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">Step 2: The Concern</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Worried About Your Private Information?
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Data breaches are common. Without strong protection, your personal info, credit cards, and logins could be exposed. How do you keep it truly safe?
            </p>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-video w-full rounded-lg bg-stone-900 flex items-center justify-center p-8 border border-stone-700 shadow-xl relative overflow-hidden">
              <MdCloudOff className="text-red-500 text-7xl absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="flex flex-col items-center gap-4 bg-stone-800/80 p-6 rounded-lg border border-stone-700 max-w-xs mx-auto z-10">
                <MdWarning className="text-red-500 text-5xl" />
                <p className="text-sm text-stone-400 text-center">Your data could be at risk without encryption.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution: Encryption */}
        <section className="w-full px-6 py-20 max-w-7xl flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">SecureVault's Answer</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Your Information is Encrypted, Just for You
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We use AES-256 encryption, the highest standard, to lock away your data. Even we can't see what's inside your vault – it's your private fortress.
            </p>
            <Button 
              className="mt-8 h-12 px-8 rounded-full bg-red-500 text-black font-bold text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,40,49,0.3)] mx-auto lg:mx-0"
            >
              <MdEnhancedEncryption className="mr-2 text-lg" />
              Discover Our Security
            </Button>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-stone-800 to-black opacity-90 z-0"></div>
              <div className="relative z-10 p-8 flex flex-col h-full justify-center items-center">
                <FaLock className="text-red-500 text-9xl" />
                <p className="text-white text-xl text-center font-bold mt-4">Your Data is Secure</p>
              </div>
              <div className="absolute -right-4 top-10 bg-red-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-3 flex items-center gap-2 z-20">
                <MdVerifiedUser className="text-sm" />
                AES-256
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-7xl px-6 py-8 flex justify-center">
          <div className="w-20 h-1 rounded-full bg-red-500/50"></div>
        </div>

        {/* Step 3: Dilemma */}
        <section className="w-full px-6 py-20 max-w-7xl flex flex-col lg:flex-row items-center gap-12 bg-stone-900/50 rounded-xl my-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">Step 3: The Dilemma</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Need to Share Logins Securely?
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Sharing Netflix passwords or Wi-Fi codes with family, or work credentials with a team, can be risky. How do you share without compromising security?
            </p>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-video w-full rounded-lg bg-stone-900 flex items-center justify-center p-8 border border-stone-700 shadow-xl relative overflow-hidden">
              <MdVisibilityOff className="text-red-500 text-7xl absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="flex flex-col items-center gap-4 bg-stone-800/80 p-6 rounded-lg border border-stone-700 max-w-xs mx-auto z-10">
                <FaUsers className="text-orange-400 text-5xl" />
                <p className="text-sm text-stone-400 text-center">Sharing passwords unsafely leads to risks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution: Secure Sharing */}
        <section className="w-full px-6 py-20 max-w-7xl flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4 block">SecureVault's Answer</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Share Safely, Without Showing the Secret
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              SecureVault lets you share access to accounts with family or colleagues without ever revealing the actual password. Control who sees what, always.
            </p>
            <Button 
              className="mt-8 h-12 px-8 rounded-full bg-red-500 text-black font-bold text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,40,49,0.3)] mx-auto lg:mx-0"
            >
              <MdFolderShared className="mr-2 text-lg" />
              Learn About Sharing
            </Button>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800 group flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-stone-800 to-black opacity-90 z-0"></div>
              <div className="relative z-10 p-8 flex flex-col h-full justify-center gap-4">
                <div className="w-full bg-stone-900/80 backdrop-blur-xl border border-stone-700 rounded-lg p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <FaUserCircle className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Family Access</p>
                    <p className="text-xs text-stone-500">Shared "Streaming Services"</p>
                  </div>
                  <MdVisibilityOff className="text-stone-500 text-lg" />
                </div>
                <div className="w-full bg-stone-900/80 backdrop-blur-xl border border-stone-700 rounded-lg p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FaUsers className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Team Access</p>
                    <p className="text-xs text-stone-500">Shared "Project Accounts"</p>
                  </div>
                  <MdVisibilityOff className="text-stone-500 text-lg" />
                </div>
              </div>
              <div className="absolute -right-4 top-10 bg-red-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-3 flex items-center gap-2 z-20">
                <MdHandshake className="text-sm" />
                Controlled Sharing
              </div>
            </div>
          </div>
        </section>

        {/* Security Priority Section */}
        <section className="w-full py-10 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative h-100 bg-stone-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-t from-[#22040b] to-transparent z-10"></div>
            <div className="relative z-20 text-center max-w-2xl px-4">
              <FaShieldAlt className="text-6xl text-red-500 mb-4 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your digital safety is our priority.</h2>
              <p className="text-stone-300 text-lg">Join us on a journey to a safer, simpler online life.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full px-6 py-24 flex justify-center">
          <div className="w-full max-w-7xl bg-red-500 rounded-lg md:rounded-xl p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight max-w-3xl">
                Ready to embrace true online security?
              </h2>
              <p className="text-stone-800 text-lg md:text-xl max-w-2xl font-medium">
                Take the first step towards a worry-free digital life with SecureVault.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="h-14 px-8 rounded-full bg-black text-white font-bold text-lg hover:bg-stone-800 transition-colors shadow-xl"
                >
                  Start My Free Journey
                </Button>
                <Button 
                  variant="outline"
                  className="h-14 px-8 rounded-full bg-white/50 border border-black/10 text-stone-900 font-bold text-lg hover:bg-white/80 transition-colors"
                >
                  Explore All Features
                </Button>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest mt-8 opacity-60">No credit card required</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-red-500/20 bg-black/40 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-red-500" />
              <h3 className="font-bold text-xl">SecureVault</h3>
            </div>
            <p className="text-stone-400 text-sm max-w-xs">
              Your trusted guide to a secure digital world.
            </p>
          </div>
          <div className="flex flex-wrap gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold">Journey</h4>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Start Here</a>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Our Solutions</a>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Security Principles</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold">Company</h4>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">About Us</a>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Support</a>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold">Legal</h4>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Privacy Policy</a>
              <a className="text-stone-400 hover:text-red-500 text-sm cursor-pointer">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-red-500/20 text-center md:text-left text-sm text-stone-500">
          © 2025 SecureVault Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home