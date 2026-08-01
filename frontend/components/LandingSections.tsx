'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Calculator, Layers, HelpCircle } from 'lucide-react';

interface LandingSectionsProps {
  onScrollToSimulator: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({ onScrollToSimulator }) => {
  return (
    <div className="flex flex-col gap-16 py-8">
      <section className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-2xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Il simulatore di PAC definitivo per le famiglie italiane</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-navy tracking-tight leading-tight">
          Costruisci il domani dei tuoi figli, oggi.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Fisco italiano incluso.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
          Clona le logiche dei grandi calcolatori finanziari americani ma al netto delle tasse reali italiane (26% capital gain, 12,5% per Buoni Postali/Titoli Stato e 0,20% bollo). Nessun gergo tecnico, solo rassicurazione e trasparenza.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            onClick={onScrollToSimulator}
            className="w-full sm:w-auto bg-navy text-white font-bold text-base px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-98 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5 text-bright-green" />
            <span>Simula il PAC Ora</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-navy">Fisco Italiano Automatico</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            I calcolatori tradizionali ti mostrano cifre lorde ingannevoli. Crescita Futura sottrae automaticamente il 26% (o il 12,5% per Buoni Postali) e lo 0,20% annuo di bollo.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-navy">Interfaccia Apple-Style</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nessun termine incomprensibile. Muovi i cursori e vedi immediatamente il valore netto finale reale per la crescita dei tuoi figli.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-navy">ETF & Buoni Postali</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Confronta o mixa i migliori ETF UCITS mondiali ed europei con i Buoni Postali Fruttiferi garantiti al 100% dallo Stato Italiano.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col gap-6">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-navy" />
          <h2 className="text-2xl font-extrabold text-navy">Domande Frequenti per i Genitori</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              Cos'è un Piano di Accumulo (PAC)?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Un PAC è una strategia d'investimento graduale che consiste nel versare una piccola somma ogni mese in modo automatico. Riduce lo stress del tempismo di mercato e sfrutta l'interesse composto nel tempo.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              Come funziona la tassazione sui Buoni Postali Fruttiferi?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              I Buoni Postali Fruttiferi (BPF) godono della tassazione agevolata sui titoli di Stato del 12,50% anziché del 26%. Inoltre non hanno costi di gestione e sono garantiti dallo Stato Italiano.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
