import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FaKey, FaCopy, FaSync, FaCheck } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { generatePassword, calculatePasswordStrength } from '@/utils/passwordStrength';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const handleGenerate = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard!');
    }
  };

  const strength = password ? calculatePasswordStrength(password) : null;

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
                <FaKey className="text-red-500 text-lg sm:text-xl" />
              </div>
              <div>
                <h1 className="text-white text-xl sm:text-2xl font-bold">Password Generator</h1>
                <p className="text-stone-400 text-xs sm:text-sm hidden sm:block">Create Strong & Secure Passwords</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-4 sm:p-6 md:p-8">
              {/* Generated Password Display */}
              <div className="mb-6">
                <Label className="text-stone-300 mb-2 block">Generated Password</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={password}
                    readOnly
                    placeholder="Click generate to create a password"
                    className="bg-stone-950/50 border-stone-700 text-white font-mono text-lg"
                  />
                  <Button
                    onClick={handleCopy}
                    disabled={!password}
                    className="bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 px-4"
                  >
                    <FaCopy />
                  </Button>
                </div>
                
                {/* Strength Indicator */}
                {strength && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            strength.color === 'green' ? 'bg-green-500' :
                            strength.color === 'yellow' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${strength.percentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${
                        strength.color === 'green' ? 'text-green-500' :
                        strength.color === 'yellow' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {strength.displayText}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">{strength.feedback}</p>
                  </div>
                )}
              </div>

              {/* Length Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-stone-300">Password Length</Label>
                  <span className="text-white font-bold">{length}</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>

              {/* Options */}
              <div className="mb-6 space-y-3">
                <Label className="text-stone-300">Options</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.uppercase}
                    onCheckedChange={(checked) => setOptions({...options, uppercase: checked})}
                    id="uppercase"
                  />
                  <label htmlFor="uppercase" className="text-white text-sm cursor-pointer">
                    Uppercase Letters (A-Z)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.lowercase}
                    onCheckedChange={(checked) => setOptions({...options, lowercase: checked})}
                    id="lowercase"
                  />
                  <label htmlFor="lowercase" className="text-white text-sm cursor-pointer">
                    Lowercase Letters (a-z)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.numbers}
                    onCheckedChange={(checked) => setOptions({...options, numbers: checked})}
                    id="numbers"
                  />
                  <label htmlFor="numbers" className="text-white text-sm cursor-pointer">
                    Numbers (0-9)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.symbols}
                    onCheckedChange={(checked) => setOptions({...options, symbols: checked})}
                    id="symbols"
                  />
                  <label htmlFor="symbols" className="text-white text-sm cursor-pointer">
                    Symbols (!@#$%^&*)
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full h-12 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <FaSync className="mr-2" />
                Generate Password
              </Button>
            </Card>

            {/* Tips */}
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6 mt-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FaCheck className="text-green-500" />
                Password Security Tips
              </h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>• Use at least 12-16 characters for better security</li>
                <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
                <li>• Avoid using personal information or common words</li>
                <li>• Never reuse passwords across different accounts</li>
                <li>• Store passwords securely in your vault</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PasswordGenerator;