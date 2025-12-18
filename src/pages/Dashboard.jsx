import React from 'react';
import Sidebar from '@/components/Sidebar';
import { FaTachometerAlt, FaShieldAlt, FaLock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { Card } from '@/components/ui/card';

function Dashboard() {
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
                <FaTachometerAlt className="text-red-500 text-xl" />
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                <p className="text-stone-400 text-sm">Overview & Statistics</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-350 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Stats Cards */}
              <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <FaLock className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Total Passwords</p>
                    <p className="text-white text-2xl font-bold">0</p>
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
                    <p className="text-white text-2xl font-bold">0</p>
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
                    <p className="text-white text-2xl font-bold">0</p>
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
                    <p className="text-white text-2xl font-bold">100%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Welcome Message */}
            <Card className="bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-8 text-center">
              <FaTachometerAlt className="text-6xl text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your Dashboard</h2>
              <p className="text-stone-400 mb-6">This is where you'll see an overview of your password security and statistics.</p>
              <p className="text-stone-500 text-sm">Dashboard implementation coming soon...</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;