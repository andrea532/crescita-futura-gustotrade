'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { YearData, formatCurrency } from '@/lib/financialEngine';
import { TrendingUp } from 'lucide-react';

interface GrowthChartProps {
  yearlyHistory: YearData[];
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ yearlyHistory }) => {
  const chartData = yearlyHistory.map((item) => ({
    year: `Anno ${item.year}`,
    shortYear: `${item.year}`,
    versato: item.contributed,
    lordo: item.grossPortfolio,
    netto: item.netPortfolioAfterStamp,
    interessiNetti: Math.max(0, item.netPortfolioAfterStamp - item.contributed),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-navy text-white p-3.5 rounded-xl shadow-xl text-xs font-sans border border-slate-700">
          <p className="font-bold text-bright-green mb-1.5">{data.year}</p>
          <div className="flex flex-col gap-1.5 font-mono">
            <div className="flex justify-between items-center space-x-4 text-slate-300">
              <span>Capitale Versato:</span>
              <span className="font-bold text-white">{formatCurrency(data.versato)}</span>
            </div>
            <div className="flex justify-between items-center space-x-4 text-emerald-400">
              <span>Interessi Netti:</span>
              <span className="font-bold">{formatCurrency(data.interessiNetti)}</span>
            </div>
            <div className="h-px bg-slate-700 my-1" />
            <div className="flex justify-between items-center space-x-4 font-black text-sm text-white">
              <span>Valore Netto Reale:</span>
              <span className="text-bright-green">{formatCurrency(data.netto)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-navy" />
            <h3 className="font-bold text-navy text-lg">
              Crescita del Capitale nel Tempo (Grafico a Linea Morbida)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evoluzione anno per anno del capitale versato e del valore netto accumulato
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-navy" />
            <span className="text-slate-700">Capitale Versato</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-bright-green" />
            <span className="text-slate-700">Valore Netto Reale</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorNetto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E676" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00E676" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVersato" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A192F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0A192F" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="shortYear"
              tickLine={false}
              stroke="#64748B"
              fontSize={12}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              stroke="#64748B"
              fontSize={11}
              tickFormatter={(val) => `€${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="versato"
              stroke="#0A192F"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVersato)"
              name="Capitale Versato"
            />

            <Area
              type="monotone"
              dataKey="netto"
              stroke="#00E676"
              strokeWidth={3.5}
              fillOpacity={1}
              fill="url(#colorNetto)"
              name="Valore Netto Reale"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 border-t border-slate-100 pt-3">
        <span>
          💡 La linea verde mostra l'effetto dell'interesse composto al netto delle tasse (26% / 12,5%) e bollo (0,20%).
        </span>
        <span className="italic mt-1 sm:mt-0">
          *I dati incorporano il calcolo fiscale italiano automatico.
        </span>
      </div>
    </div>
  );
};
