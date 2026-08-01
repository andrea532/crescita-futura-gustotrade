'use client';

import React from 'react';
import { CalculationResult, formatCurrency } from '@/lib/financialEngine';
import { ArrowDown, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface OutputPanelProps {
  result: CalculationResult;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ result }) => {
  const taxRatePercentage = ((result.weightedTaxRate ?? 0.26) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border-b-4 border-navy p-6 rounded-2xl shadow-sm flex flex-col items-end text-right">
        <div className="flex items-center space-x-2 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Risultato Netto Finale Reale
          </h3>
        </div>
        <div className="font-mono text-4xl sm:text-5xl font-black text-navy tracking-tight my-1">
          {formatCurrency(result.netFinal)} Netto
        </div>
        <p className="text-xs font-medium text-slate-500 mt-1">
          (Al netto della tassazione del <span className="font-bold text-slate-700">{taxRatePercentage}%</span> e dello{' '}
          <span className="font-bold text-slate-700">0,20% annuo di bollo</span>)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-navy text-sm">Dettaglio Tasse e Bollo</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                Fisco Italia
              </span>
            </div>

            <div className="flex flex-col gap-2.5 mt-3 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-slate-600">Totale Accumulato Lordo</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(result.grossFinal)}
                </span>
              </div>

              <div className="flex justify-between font-mono">
                <span className="text-slate-600 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-red-500 inline" /> Tassazione Interessi ({taxRatePercentage}%)
                </span>
                <span className="font-bold text-red-600">
                  - {formatCurrency(result.capitalGainsTax)}
                </span>
              </div>

              <div className="flex justify-between font-mono pb-2 border-b border-slate-200">
                <span className="text-slate-600 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-red-500 inline" /> Imposta di Bollo (0,20%/anno)
                </span>
                <span className="font-bold text-red-600">
                  - {formatCurrency(result.totalStampDuty)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between font-mono font-extrabold text-sm text-navy pt-2">
            <span>Costi Fiscali Totali</span>
            <span>- {formatCurrency(result.totalTaxesAndFees)}</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-navy text-sm">Analisi di Rischio e Scenario</h4>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>

            <div className="flex flex-col gap-2.5 mt-3 text-xs">
              <div className="flex justify-between items-center font-mono">
                <span className="text-slate-600">Drawdown Massimo Storico</span>
                <span className="font-bold text-red-600 flex items-center gap-1">
                  -{(result.weightedDrawdown * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between items-center font-mono">
                <span className="text-slate-600">Scenario Peggiore Netto</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(result.worstCaseNet)} Netto
                </span>
              </div>

              <div className="flex justify-between items-center font-mono pb-2 border-b border-slate-200">
                <span className="text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> Tempo Medio di Recupero
                </span>
                <span className="font-bold text-slate-800">
                  ~{result.weightedRecoveryYears.toFixed(1)} Anni
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic mt-2">
            *I Titoli di Stato e i Buoni Postali godono della garanzia dello Stato al 100% e della tassazione agevolata al 12,5%.
          </div>
        </div>
      </div>
    </div>
  );
};
