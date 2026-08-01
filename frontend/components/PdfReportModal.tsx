'use client';

import React, { useState, useRef } from 'react';
import { CalculationResult, formatCurrency, EtfItem } from '@/lib/financialEngine';
import { X, Download, CheckCircle, Mail, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalculationResult;
  etfs: EtfItem[];
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  isOpen,
  onClose,
  result,
  etfs,
}) => {
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Piano_Accumulo_${childName || 'Figlio'}_Crescita_Futura.pdf`);

      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-bright-green">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-lg">Esporta Report PDF Simulazione</h3>
              <p className="text-xs text-slate-500">Crescita Futura by Gustotrade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-navy" />
            Personalizza il Report per il tuo Bambino/a
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Nome del Figlio/a (opzionale)
              </label>
              <input
                type="text"
                placeholder="Es. Leonardo"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Email per Salvare in Cloud (opzionale)
              </label>
              <input
                type="email"
                placeholder="genitore@email.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="w-full bg-navy text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <span>Generazione Report PDF in corso...</span>
            ) : (
              <>
                <Download className="w-4 h-4 text-bright-green" />
                <span>Scarica Subito il Report PDF Completo</span>
              </>
            )}
          </button>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center space-x-2 text-emerald-800 text-xs font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Report PDF scaricato con successo! Check la cartella download.</span>
            </div>
          )}
        </div>

        <div className="hidden">
          <div
            ref={reportRef}
            className="p-8 bg-white text-navy flex flex-col gap-6 w-[210mm] font-sans"
          >
            <div className="flex justify-between items-center pb-4 border-b-2 border-navy">
              <div>
                <h1 className="text-2xl font-black text-navy">
                  Piano di Accumulo "Crescita Futura"
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Simulatore Finanziario & Fiscale per la Famiglia | by Gustotrade
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">
                  {childName ? `Beneficiario: ${childName}` : 'Report Personalizzato'}
                </p>
                <p className="text-xs text-slate-500">{new Date().toLocaleDateString('it-IT')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-slate-500">
                  Risultato Netto Reale
                </span>
                <p className="text-3xl font-black text-navy font-mono mt-1">
                  {formatCurrency(result.netFinal)}
                </p>
                <p className="text-[10px] text-slate-500">Tasse e bollo italiani già sottratti</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs uppercase font-bold text-slate-500">
                  Capitale Versato Totale
                </span>
                <p className="text-3xl font-black text-slate-800 font-mono mt-1">
                  {formatCurrency(result.totalContributed)}
                </p>
                <p className="text-[10px] text-slate-500">In {result.years} Anni di Risparmio</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
              <h3 className="font-bold text-sm text-navy border-b pb-2">
                Dettaglio Parametri e Motore Fiscale Italiano
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs font-mono">
                <div>Importo Iniziale: <strong>{formatCurrency(result.initialAmount)}</strong></div>
                <div>Contributo Mensile: <strong>{formatCurrency(result.monthlyAmount)} / mese</strong></div>
                <div>Orizzonte Temporale: <strong>{result.years} Anni</strong></div>
                <div>Rendimento Annuo Stimato: <strong>{(result.weightedReturn * 100).toFixed(1)}%</strong></div>
                <div>Tassazione Applicata: <strong>{((result.weightedTaxRate ?? 0.26) * 100).toFixed(1)}%</strong></div>
                <div>Imposta di Bollo Totale: <strong>- {formatCurrency(result.totalStampDuty)}</strong></div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
              <h3 className="font-bold text-sm text-navy">Composizione del Portafoglio</h3>
              <div className="flex flex-col gap-1.5 text-xs">
                {etfs.map((item) => (
                  <div key={item.id} className="flex justify-between font-mono">
                    <span>{item.name} ({item.ticker})</span>
                    <strong>{item.weight}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 italic">
              *Questo report è generato a scopo puramente illustrativo tramite il simulatore Crescita Futura by Gustotrade. I rendimenti passati non costituiscono garanzia per i risultati futuri.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
