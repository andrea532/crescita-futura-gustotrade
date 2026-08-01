import { EtfItem } from './financialEngine';

export interface ExtendedEtfItem extends EtfItem {
  isin: string;
  categoryKey: string;
  provider: string;
  ter: number;
  distribution: string;
  volatility: number;
  description: string;
  taxRate?: number;
}

export interface PredefinedPortfolio {
  name: string;
  description: string;
  allocations: { id: string; weight: number }[];
}

export const ALL_UCITS_ETFS: ExtendedEtfItem[] = [
  {
    id: 'bpf_minori',
    name: 'Buono Postale Fruttifero Minori (Poste Italiane)',
    ticker: 'BPF-MINORI',
    category: 'Buoni Postali Fruttiferi',
    categoryKey: 'bpf',
    provider: 'Poste Italiane / CDP',
    ter: 0.0,
    distribution: 'Accumulo',
    expectedReturn: 0.045,
    maxDrawdown: 0.0,
    volatility: 0.0,
    recoveryYears: 0.0,
    isin: 'IT0005432101',
    description: 'Dedicato ai figli da 0 a 18 anni. Rendimento garantito dallo Stato Italiano con tassazione agevolata al 12,5% e zero commissioni.',
    taxRate: 0.125,
    weight: 0,
  },
  {
    id: 'vwce',
    name: 'Vanguard FTSE All-World UCITS ETF Acc',
    ticker: 'VWCE',
    category: 'Azionario Globale',
    categoryKey: 'equity_global',
    provider: 'Vanguard',
    ter: 0.0022,
    distribution: 'Accumulo',
    expectedReturn: 0.078,
    maxDrawdown: 0.338,
    volatility: 0.145,
    recoveryYears: 2.1,
    isin: 'IE00BK5BQT33',
    description: 'Replica l\'indice FTSE All-World (oltre 3.700 azioni). Il benchmark per i PAC passivi.',
    taxRate: 0.26,
    weight: 0,
  },
  {
    id: 'swda',
    name: 'iShares Core MSCI World UCITS ETF Acc',
    ticker: 'SWDA',
    category: 'Azionario Globale',
    categoryKey: 'equity_global',
    provider: 'iShares',
    ter: 0.002,
    distribution: 'Accumulo',
    expectedReturn: 0.082,
    maxDrawdown: 0.342,
    volatility: 0.148,
    recoveryYears: 2.0,
    isin: 'IE00B4L5Y983',
    description: 'Replica l\'indice MSCI World (circa 1.500 aziende dei soli mercati sviluppati).',
    taxRate: 0.26,
    weight: 0,
  },
  {
    id: 'csspx',
    name: 'iShares Core S&P 500 UCITS ETF Acc',
    ticker: 'CSSPX',
    category: 'Azionario USA / S&P 500',
    categoryKey: 'equity_usa',
    provider: 'iShares',
    ter: 0.0007,
    distribution: 'Accumulo',
    expectedReturn: 0.105,
    maxDrawdown: 0.337,
    volatility: 0.158,
    recoveryYears: 1.8,
    isin: 'IE00B5BMR087',
    description: 'Replica le 500 maggiori aziende statunitensi (Apple, Microsoft, Nvidia, Amazon).',
    taxRate: 0.26,
    weight: 0,
  },
  {
    id: 'eagg',
    name: 'iShares Core Global Aggregate Bond UCITS ETF EUR Hedged Acc',
    ticker: 'EAGG',
    category: 'Obbligazionario Globale',
    categoryKey: 'bond_global',
    provider: 'iShares',
    ter: 0.001,
    distribution: 'Accumulo',
    expectedReturn: 0.032,
    maxDrawdown: 0.162,
    volatility: 0.065,
    recoveryYears: 1.8,
    isin: 'IE00BDBRDM35',
    description: 'Obbligazioni governative e societarie globali con copertura cambio EUR.',
    taxRate: 0.26,
    weight: 0,
  },
  {
    id: 'xeon',
    name: 'Xtrackers EUR Overnight Rate Swap UCITS ETF Acc (Tasso €STR)',
    ticker: 'XEON',
    category: 'Monetario / Liquidità (€STR)',
    categoryKey: 'money_market',
    provider: 'Xtrackers',
    ter: 0.001,
    distribution: 'Accumulo',
    expectedReturn: 0.034,
    maxDrawdown: 0.008,
    volatility: 0.008,
    recoveryYears: 0.3,
    isin: 'LU0292109690',
    description: 'Replica il tasso di interesse a breve termine dell\'Eurozona (€STR).',
    taxRate: 0.26,
    weight: 0,
  },
  {
    id: 'sgld',
    name: 'Invesco Physical Gold A ETC',
    ticker: 'SGLD',
    category: 'Oro Fisico (ETC)',
    categoryKey: 'commodities',
    provider: 'Invesco',
    ter: 0.0012,
    distribution: 'Accumulo',
    expectedReturn: 0.072,
    maxDrawdown: 0.22,
    volatility: 0.138,
    recoveryYears: 1.8,
    isin: 'IE00B579F325',
    description: 'Lingotti d\'oro fisico custoditi nei caveau di Londra. Bene rifugio.',
    taxRate: 0.26,
    weight: 0,
  }
];

export const DEFAULT_PORTFOLIOS: PredefinedPortfolio[] = [
  {
    name: '100% Azionario Globale (VWCE)',
    description: 'Massimo rendimento atteso di lungo periodo (~7.8%/anno). Adatto per orizzonti >12 anni.',
    allocations: [{ id: 'vwce', weight: 100 }],
  },
  {
    name: '60/40 Bilanciato Classico (VWCE + EAGG)',
    description: 'Il classico portafoglio bilanciato mondiale tra azioni e obbligazioni.',
    allocations: [
      { id: 'vwce', weight: 60 },
      { id: 'eagg', weight: 40 },
    ],
  },
  {
    name: '100% Buono Postale Minori (Garantito Stato 12,5% Tassa)',
    description: 'Capitale 100% garantito dallo Stato Italiano con rendimento ~4.5% lordo e tassa agevolata 12.5%.',
    allocations: [{ id: 'bpf_minori', weight: 100 }],
  },
  {
    name: 'Prudente 50/50: Azioni VWCE + Buono Postale Minori',
    description: 'Metà capitale garantito allo 100% dallo Stato e metà investito per la crescita azionaria globale.',
    allocations: [
      { id: 'vwce', weight: 50 },
      { id: 'bpf_minori', weight: 50 },
    ],
  },
];
