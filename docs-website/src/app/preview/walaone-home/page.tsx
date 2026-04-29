'use client';

import { useState } from 'react';
import { WalaOneHomeScreen } from '@/components/screens/WalaOneHomeScreen';
import { Sun, Moon, Languages } from 'lucide-react';

/**
 * WalaOne Home Screen Preview Page
 * Interactive preview with theme and locale controls
 */
export default function WalaOnePreviewPage() {
  const [isDark, setIsDark] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}>
      {/* Preview Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            isDark
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-black/5 text-neutral-900 hover:bg-black/10'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={() => setIsArabic(!isArabic)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            isDark
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-black/5 text-neutral-900 hover:bg-black/10'
          }`}
        >
          <Languages size={18} />
          <span className="text-sm">{isArabic ? 'EN' : 'AR'}</span>
        </button>
      </div>

      {/* Preview Title */}
      <div className="pt-6 pb-4 text-center">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          WalaOne Home Screen
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          iPhone 16 Pro Max Preview • {isDark ? 'Dark' : 'Light'} Mode • {isArabic ? 'Arabic (RTL)' : 'English (LTR)'}
        </p>
      </div>

      {/* iPhone Mockup Frame */}
      <div className="flex justify-center pb-12">
        <div 
          className={`relative rounded-[55px] p-3 shadow-2xl ${
            isDark ? 'bg-neutral-800' : 'bg-neutral-300'
          }`}
          style={{ width: 393, height: 852 }}
        >
          {/* Screen Container */}
          <div 
            className="relative w-full h-full rounded-[44px] overflow-hidden bg-white"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
              <div className="w-[126px] h-[37px] bg-black rounded-full" />
            </div>

            {/* Screen Content */}
            <WalaOneHomeScreen isDark={isDark} isArabic={isArabic} />

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
              <div className={`w-[134px] h-[5px] rounded-full ${isDark ? 'bg-white/30' : 'bg-black/30'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
