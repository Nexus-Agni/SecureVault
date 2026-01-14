import React from 'react';
import { Button } from "@/components/ui/button";
import { FaShieldAlt } from 'react-icons/fa';

export function AuthHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-15 w-15 place-items-center rounded-full">
          <img src="/logo.png" alt="SecureVault Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-white">SecureVault</span>
          <span className="text-xs uppercase tracking-[0.32em] text-red-300/70">Protected Access</span>
        </div>
      </div>
      <nav className="flex items-center gap-6 text-sm text-neutral-300">
        <Button 
          variant="ghost" 
          className="dark:hover:bg-red-500" 
          size="sm"
          onClick={() => window.open('https://agnibhachakraborty.me', '_blank')}
        >
          Help Center
        </Button>
        <Button 
          variant="ghost" 
          className="dark:hover:bg-red-500" 
          size="sm"
          onClick={() => window.open('https://agnibhachakraborty.me', '_blank')}
        >
          Contact Support
        </Button>
      </nav>
    </header>
  );
}
