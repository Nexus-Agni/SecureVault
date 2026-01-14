import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FaExclamationTriangle, FaSearch, FaShieldAlt, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';

function CheckBreach() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  // Hash password with SHA-1
  const sha1Hash = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.toUpperCase();
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    
    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    if (password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }

    setChecking(true);
    setResult(null);

    try {
      // Step 1: Hash the password with SHA-1
      const hash = await sha1Hash(password);
      
      // Step 2: Get first 5 characters (k-anonymity)
      const hashPrefix = hash.substring(0, 5);
      const hashSuffix = hash.substring(5);

      // Step 3: Query Pwned Passwords API
      const response = await axios.get(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
      const data = response.data;
      
      // Step 4: Parse response and check for our hash suffix
      const hashes = data.split('\n');
      let breachCount = 0;
      let isBreached = false;

      for (const line of hashes) {
        const [suffix, count] = line.split(':');
        if (suffix === hashSuffix) {
          breachCount = parseInt(count, 10);
          isBreached = true;
          break;
        }
      }

      // Step 5: Show result
      if (isBreached) {
        setResult({
          breached: true,
          count: breachCount,
          message: `This password has appeared ${breachCount.toLocaleString()} time${breachCount > 1 ? 's' : ''} in data breaches. Change it immediately!`
        });
        toast.error('Password found in breach database!');
      } else {
        setResult({
          breached: false,
          message: 'Great! This password has not been found in any known data breaches.'
        });
        toast.success('Password is safe!');
      }

    } catch (error) {
      console.error('Breach check error:', error);
      toast.error('Failed to check password. Please try again.');
      setResult({
        breached: null,
        message: 'Unable to check password at this time. Please try again later.'
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black">
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700 pt-16 md:pt-0">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-lg sm:text-xl" />
              </div>
              <div>
                <h1 className="text-white text-xl sm:text-2xl font-bold">Check Breach</h1>
                <p className="text-stone-400 text-xs sm:text-sm hidden sm:block">Verify if your accounts have been compromised</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-2xl mx-auto">
            {/* Check Form */}
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
              <div className="text-center mb-4 sm:mb-6">
                <FaShieldAlt className="text-4xl sm:text-5xl text-red-500 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Password Breach Check</h2>
                <p className="text-stone-400 text-sm">
                  Check if your password has been exposed in data breaches using HaveIBeenPwned's database of 600M+ compromised passwords
                </p>
              </div>

              <form onSubmit={handleCheck} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-stone-300">Password to Check</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password to check"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-stone-950/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    🔒 Your password is hashed locally and never sent in plain text
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={checking}
                  className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full h-12 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  {checking ? (
                    <>Checking...</>
                  ) : (
                    <>
                      <FaSearch className="mr-2" />
                      Check Password
                    </>
                  )}
                </Button>
              </form>

              {/* Result */}
              {result && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  result.breached 
                    ? 'bg-red-950/30 border-red-500/30' 
                    : result.breached === false 
                    ? 'bg-green-950/30 border-green-500/30'
                    : 'bg-stone-950/50 border-stone-700'
                }`}>
                  <div className="flex items-start gap-3">
                    {result.breached ? (
                      <FaExclamationTriangle className="text-2xl text-red-500 shrink-0 mt-1" />
                    ) : result.breached === false ? (
                      <FaCheckCircle className="text-2xl text-green-500 shrink-0 mt-1" />
                    ) : (
                      <FaShieldAlt className="text-2xl text-yellow-500 shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className={`font-semibold mb-1 ${
                        result.breached 
                          ? 'text-red-400' 
                          : result.breached === false 
                          ? 'text-green-400'
                          : 'text-yellow-400'
                      }`}>
                        {result.breached 
                          ? `⚠️ Password Compromised!` 
                          : result.breached === false 
                          ? '✓ Password is Safe'
                          : 'Unable to Verify'}
                      </p>
                      <p className="text-stone-300 text-sm">{result.message}</p>
                      {result.breached && result.count && (
                        <div className="mt-3 p-3 bg-red-900/20 border border-red-500/20 rounded">
                          <p className="text-red-300 text-xs font-semibold">
                            🚨 This password appeared in <span className="text-red-400 font-bold">{result.count.toLocaleString()}</span> data breach{result.count > 1 ? 'es' : ''}
                          </p>
                          <p className="text-red-400/80 text-xs mt-1">
                            Immediate action required: Change this password everywhere you use it!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                <FaExclamationTriangle className="text-3xl text-yellow-500 mb-3" />
                <h3 className="text-white font-bold mb-2">How It Works</h3>
                <p className="text-stone-400 text-sm">
                  Your password is hashed with SHA-1 locally. Only the first 5 characters are sent to 
                  HaveIBeenPwned's API. Your actual password never leaves your device.
                </p>
              </Card>

              <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                <FaShieldAlt className="text-3xl text-blue-500 mb-3" />
                <h3 className="text-white font-bold mb-2">K-Anonymity Privacy</h3>
                <p className="text-stone-400 text-sm">
                  This service uses k-anonymity to protect your privacy. Your full password hash is 
                  never transmitted, making it impossible to identify your actual password.
                </p>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Password Security Best Practices
              </h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>• Never reuse passwords across different accounts</li>
                <li>• Use a password manager to generate and store unique passwords</li>
                <li>• Create passwords with at least 12 characters including mixed cases, numbers, and symbols</li>
                <li>• Enable two-factor authentication on all important accounts</li>
                <li>• Change passwords immediately if they appear in a breach</li>
                <li>• Avoid using personal information (names, birthdays) in passwords</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CheckBreach;