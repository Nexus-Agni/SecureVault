import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FaExclamationTriangle, FaSearch, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function CheckBreach() {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    setChecking(true);
    // TODO: Implement breach check using Have I Been Pwned API or similar
    try {
      
    } catch (error) {
      
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black flex">
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-xl" />
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Check Breach</h1>
                <p className="text-stone-400 text-sm">Verify if your accounts have been compromised</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            {/* Check Form */}
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-8 mb-6">
              <div className="text-center mb-6">
                <FaShieldAlt className="text-5xl text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Security Breach Check</h2>
                <p className="text-stone-400">
                  Enter your email address to check if it has been part of any known data breaches
                </p>
              </div>

              <form onSubmit={handleCheck} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-stone-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-stone-950/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  />
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
                      Check for Breaches
                    </>
                  )}
                </Button>
              </form>

              {/* Result */}
              {result && (
                <div className="mt-6 p-4 rounded-lg bg-stone-950/50 border border-stone-700">
                  <div className="flex items-center gap-3">
                    {result.breached ? (
                      <FaExclamationTriangle className="text-2xl text-yellow-500" />
                    ) : (
                      <FaCheckCircle className="text-2xl text-green-500" />
                    )}
                    <div>
                      <p className={`font-semibold ${result.breached ? 'text-yellow-500' : 'text-green-500'}`}>
                        {result.breached ? 'Account Found in Breach' : 'No Breaches Found'}
                      </p>
                      <p className="text-stone-400 text-sm">{result.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                <FaExclamationTriangle className="text-3xl text-yellow-500 mb-3" />
                <h3 className="text-white font-bold mb-2">What is a Data Breach?</h3>
                <p className="text-stone-400 text-sm">
                  A data breach is when sensitive information is accessed without authorization, 
                  potentially exposing your personal data.
                </p>
              </Card>

              <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                <FaShieldAlt className="text-3xl text-blue-500 mb-3" />
                <h3 className="text-white font-bold mb-2">Stay Protected</h3>
                <p className="text-stone-400 text-sm">
                  Use unique, strong passwords for each account and enable two-factor 
                  authentication whenever possible.
                </p>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Security Recommendations
              </h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>• Change passwords immediately if your account appears in a breach</li>
                <li>• Enable two-factor authentication on all important accounts</li>
                <li>• Use a password manager to generate and store unique passwords</li>
                <li>• Regularly monitor your accounts for suspicious activity</li>
                <li>• Be cautious of phishing emails after a breach is announced</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CheckBreach;