'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { InputPanel } from '@/components/InputPanel';
import { OutputPanel } from '@/components/OutputPanel';
import { GrowthChart } from '@/components/GrowthChart';
import { LandingSections } from '@/components/LandingSections';
import { PdfReportModal } from '@/components/PdfReportModal';
import { calculatePAC, DEFAULT_ETFS, EtfItem } from '@/lib/financialEngine';

export default function Home() {
  const [initialAmount, setInitialAmount] = useState<number>(5000);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(200);
  const [years, setYears] = useState<number>(18);
  const [etfs, setEtfs] = useState<EtfItem[]>(DEFAULT_ETFS);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const simulatorRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculatePAC(initialAmount, monthlyAmount, years, etfs);
  }, [initialAmount, monthlyAmount, years, etfs]);

  const scrollToSimulator = () => {
    if (simulatorRef.current) {
      simulatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-slate-900 flex flex-col antialiased">
      <Navbar onExportClick={() => setIsPdfModalOpen(true)} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12">
        <LandingSections onScrollToSimulator={scrollToSimulator} />

        <div ref={simulatorRef} className="pt-4 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <InputPanel
                initialAmount={initialAmount}
                setInitialAmount={setInitialAmount}
                monthlyAmount={monthlyAmount}
                setMonthlyAmount={setMonthlyAmount}
                years={years}
                setYears={setYears}
                etfs={etfs}
                setEtfs={setEtfs}
                weightedReturn={result.weightedReturn}
              />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <OutputPanel result={result} />
              <GrowthChart yearlyHistory={result.yearlyHistory} />
            </div>
          </div>
        </div>
      </main>

      <PdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        result={result}
        etfs={etfs}
      />

      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-navy">Crescita Futura</span>
            <span>by Gustotrade</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Informativa sulla Privacy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Termini di Servizio
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Informativa sui Rischi
            </a>
          </div>

          <div>© {new Date().getFullYear()} Gustotrade. Tutti i diritti riservati.</div>
        </div>
      </footer>
    </div>
  );
}
