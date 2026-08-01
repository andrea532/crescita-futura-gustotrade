'use client';

import React, { useState } from 'react';
import { EtfItem, formatCurrency } from '@/lib/financialEngine';
import { ALL_UCITS_ETFS, DEFAULT_PORTFOLIOS, ExtendedEtfItem } from '@/lib/etfDatabase';
import { Wallet, Minus, Plus, Search, Trash2, CheckCircle2 } from 'lucide-react';

interface InputPanelProps {
  initialAmount: number;
  setInitialAmount: (val: number) => void;
  monthlyAmount: number;
  setMonthlyAmount: (val: number) => void;
  years: number;
  setYears: (val: number) => void;
  etfs: EtfItem[];
  setEtfs: React.Dispatch<React.SetStateAction<EtfItem[]>>;
  weightedReturn: number;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  initialAmount,
  setInitialAmount,
  monthlyAmount,
  setMonthlyAmount,
  years,
  setYears,
  etfs,
  setEtfs,
  weightedReturn,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const updateEtfWeight = (id: string, delta: number) => {
    setEtfs((prevEtfs) =>
      prevEtfs.map((item) => {
        if (item.id === id) {
          const newWeight = Math.max(0, Math.min(100, item.weight + delta));
          return { ...item, weight: newWeight };
        }
        return item;
      })
    );
  };

  const removeEtf = (id: string) => {
    setEtfs((prev) => prev.filter((item) => item.id !== id));
  };

  const addEtfToPortfolio = (etf: ExtendedEtfItem) => {
    if (etfs.some((item) => item.id === etf.id)) {
      setShowAddModal(false);
      return;
    }
    setEtfs((prev) => [
      ...prev,
      {
        id: etf.id,
        name: etf.name,
        ticker: etf.ticker,
        category: etf.category,
        expectedReturn: etf.expectedReturn,
        maxDrawdown: etf.maxDrawdown,
        recoveryYears: etf.recoveryYears,
        weight: 0,
        taxRate: etf.taxRate ?? 0.26,
      },
    ]);
    setShowAddModal(false);
  };

  const applyPredefinedPortfolio = (portfolioName: string) => {
    const preset = DEFAULT_PORTFOLIOS.find((p) => p.name === portfolioName);
    if (!preset) return;

    const newEtfs: EtfItem[] = preset.allocations.map((alloc) => {
      const full = ALL_UCITS_ETFS.find((item) => item.id === alloc.id);
      return {
        id: alloc.id,
        name: full ? full.name : alloc.id.toUpperCase(),
        ticker: full ? full.ticker : alloc.id.toUpperCase(),
        category: full ? full.category : 'Azionario Globale',
        expectedReturn: full ? full.expectedReturn : 0.07,
        maxDrawdown: full ? full.maxDrawdown : 0.30,
        recoveryYears: full ? full.recoveryYears : 2.0,
        weight: alloc.weight,
        taxRate: full ? full.taxRate ?? 0.26 : 0.26,
      };
    });

    setEtfs(newEtfs);
  };

  const totalAllocation = etfs.reduce((sum, item) => sum + item.weight, 0);

  const filteredEtfs = ALL_UCITS_ETFS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.categoryKey === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.isin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-navy tracking-tight">
        Pianifica il Tuo Risparmio
      </h2>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Importo Iniziale
            </label>
            <span className="font-mono text-lg font-extrabold text-navy">
              {formatCurrency(initialAmount)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setInitialAmount(Math.max(0, initialAmount - 500))}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-navy hover:bg-slate-100 transition-colors font-bold active:scale-95"
            >
              -
            </button>
            <div className="flex-grow flex items-center">
              <input
                type="range"
                min={0}
                max={50000}
                step={500}
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
            <button
              onClick={() => setInitialAmount(Math.min(50000, initialAmount + 500))}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-navy hover:bg-slate-100 transition-colors font-bold active:scale-95"
            >
              +
            </button>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>€ 0</span>
            <span>€ 25.000</span>
            <span>€ 50.000</span>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Contributo Mensile
            </label>
            <span className="font-mono text-lg font-extrabold text-navy">
              {formatCurrency(monthlyAmount)} / mese
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMonthlyAmount(Math.max(50, monthlyAmount - 25))}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-navy hover:bg-slate-100 transition-colors font-bold active:scale-95"
            >
              -
            </button>
            <div className="flex-grow flex items-center">
              <input
                type="range"
                min={50}
                max={2000}
                step={25}
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
            <button
              onClick={() => setMonthlyAmount(Math.min(2000, monthlyAmount + 25))}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-navy hover:bg-slate-100 transition-colors font-bold active:scale-95"
            >
              +
            </button>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>€ 50</span>
            <span>€ 1.000</span>
            <span>€ 2.000</span>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Anni di Risparmio (Es. Maggior Età)
            </label>
            <span className="font-mono text-lg font-extrabold text-navy">
              {years} Anni
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setYears(Math.max(1, years - 1))}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-navy hover:bg-slate-100 transition-colors font-bold active:scale-95"
            >
              -
            </button>
            <div className="flex-grow flex items-center">
              <input
                type="range"
                min={1}
                max={25}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
            <button
              onClick={() => setYears(Math.min(25, years + 1))}
              className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-navy hover:bg-slate-100 transition-colors font-bold active:scale-95"
            >
              +
            </button>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>1 anno</span>
            <span>10 anni</span>
            <span className="font-bold text-navy">18 anni</span>
            <span>25 anni</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-navy" />
            <h3 className="font-bold text-navy text-base">
              Costruisci il Tuo Portafoglio (ETF e Buoni Postali)
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-md text-navy">
            Rendimento Stimato: ~{(weightedReturn * 100).toFixed(1)}% / anno
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Portafogli Modello Preimpostati:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DEFAULT_PORTFOLIOS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPredefinedPortfolio(p.name)}
                className="text-left text-xs p-2.5 rounded-xl border border-slate-300 bg-white hover:border-navy hover:bg-slate-100 transition-all font-medium text-slate-800"
              >
                <div className="font-bold text-navy">{p.name}</div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {p.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-200 my-1" />

        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Strumenti nel Portafoglio ({etfs.length}):
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-xs font-bold text-navy bg-white border border-navy px-3 py-1 rounded-lg hover:bg-navy hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>+ Aggiungi Strumento</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {etfs.map((item) => {
            const dbItem = ALL_UCITS_ETFS.find((x) => x.id === item.id);
            const isBpf = item.id.startsWith('bpf');
            return (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-extrabold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                      {item.ticker}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    ISIN: {dbItem?.isin || 'IT00...'} | Tassa: {isBpf ? '12,5% (Titoli Stato)' : '26% (Capital Gain)'} | Rendimento: {(item.expectedReturn * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <span className="font-mono font-bold text-navy w-12 text-right text-base">
                    {item.weight}%
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => updateEtfWeight(item.id, -10)}
                      className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded hover:bg-slate-100 text-navy font-bold active:scale-95"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateEtfWeight(item.id, 10)}
                      className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded hover:bg-slate-100 text-navy font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeEtf(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`p-3 rounded-xl text-center text-xs font-medium border ${
            totalAllocation === 100
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          {totalAllocation === 100 ? (
            <span className="flex items-center justify-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Portafoglio Bilanciato al 100% | Simulazione pronta
            </span>
          ) : (
            <span>
              Attenzione: L'allocazione totale è {totalAllocation}%. Regola le percentuali per raggiungere il 100%.
            </span>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-navy text-lg">
                Catalogo ETF & Buoni Postali Fruttiferi
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cerca per Nome, Ticker o ISIN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy bg-white"
              >
                <option value="all">Tutte le Categorie</option>
                <option value="bpf">Buoni Postali Fruttiferi</option>
                <option value="equity_global">Azionario Globale</option>
                <option value="equity_usa">Azionario USA / S&P 500</option>
                <option value="equity_tech">Azionario Settoriale Tech</option>
                <option value="equity_europe">Azionario Europa</option>
                <option value="equity_em">Azionario Mercati Emergenti</option>
                <option value="bond_global">Obbligazionario Globale</option>
                <option value="money_market">Monetario / Liquidità (€STR)</option>
                <option value="commodities">Oro Fisico / Materie Prime</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] pr-1">
              {filteredEtfs.map((etf) => {
                const isAdded = etfs.some((x) => x.id === etf.id);
                return (
                  <div
                    key={etf.id}
                    className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center text-xs"
                  >
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{etf.name}</span>
                        <span className="font-mono font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                          {etf.ticker}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{etf.description}</p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        ISIN: {etf.isin} | Tassa: {etf.taxRate === 0.125 ? '12,5% (Agevolata)' : '26%'} | Rendimento: {(etf.expectedReturn * 100).toFixed(1)}%
                      </div>
                    </div>

                    <button
                      onClick={() => addEtfToPortfolio(etf)}
                      disabled={isAdded}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                        isAdded
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-navy text-white hover:bg-slate-800'
                      }`}
                    >
                      {isAdded ? 'Già Aggiunto' : '+ Aggiungi'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
