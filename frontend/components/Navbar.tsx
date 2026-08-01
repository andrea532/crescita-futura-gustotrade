'use client';

import React from 'react';
import { TrendingUp, ShieldCheck, Download } from 'lucide-react';

interface NavbarProps {
  onExportClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExportClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-bright-green shadow-md">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-navy">
                Crescita Futura
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              by <span className="font-bold text-slate-700">Gustotrade</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fisco Italiano Integrato (26% / 12.5% + 0.20%)</span>
          </div>

          {onExportClick && (
            <button
              onClick={onExportClick}
              className="flex items-center space-x-2 bg-navy text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4 text-bright-green" />
              <span>Scarica PDF</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
