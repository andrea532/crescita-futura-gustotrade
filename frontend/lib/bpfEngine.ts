export interface BpfProduct {
  id: string;
  name: string;
  category: string;
  issuer: string;
  taxRate: number;
  stampDuty: number;
  ter: number;
  annualGrossYield: number;
  description: string;
}

export const BPF_PRODUCTS: BpfProduct[] = [
  {
    id: 'bpf_minori',
    name: 'Buono Postale Fruttifero dedicato ai Minori',
    category: 'Buoni Postali',
    issuer: 'Poste Italiane / CDP',
    taxRate: 0.125,
    stampDuty: 0.002,
    ter: 0.0,
    annualGrossYield: 0.045,
    description: 'Dedicato ai figli da 0 a 18 anni. Interessi maturano fino alla maggiore età con garanzia dello Stato Italiano e tassazione agevolata 12,5%.',
  },
  {
    id: 'bpf_ordinario',
    name: 'Buono Postale Fruttifero Ordinario (20 Anni)',
    category: 'Buoni Postali',
    issuer: 'Poste Italiane / CDP',
    taxRate: 0.125,
    stampDuty: 0.002,
    ter: 0.0,
    annualGrossYield: 0.035,
    description: 'Investimento sicuro a lungo termine fino a 20 anni. Capitale sempre rimborsabile al 100% in qualsiasi momento.',
  }
];

export function calculateBpfNet(
  initialAmount: number,
  monthlyAmount: number,
  years: number,
  bpf: BpfProduct = BPF_PRODUCTS[0]
) {
  const totalMonths = years * 12;
  const monthlyYield = Math.pow(1 + bpf.annualGrossYield, 1 / 12) - 1;

  let currentPortfolio = initialAmount;
  let totalContributed = initialAmount;
  let totalStampDuty = 0;

  for (let month = 1; month <= totalMonths; month++) {
    currentPortfolio = currentPortfolio * (1 + monthlyYield) + monthlyAmount;
    totalContributed += monthlyAmount;

    if (month % 12 === 0) {
      if (currentPortfolio > 5000) {
        const stampDuty = currentPortfolio * 0.002;
        currentPortfolio -= stampDuty;
        totalStampDuty += stampDuty;
      }
    }
  }

  const grossFinal = currentPortfolio;
  const grossProfit = Math.max(0, grossFinal - totalContributed);
  const taxAmount = grossProfit * bpf.taxRate;
  const netFinal = grossFinal - taxAmount;

  return {
    initialAmount,
    monthlyAmount,
    years,
    bpfName: bpf.name,
    totalContributed: Math.round(totalContributed),
    grossFinal: Math.round(grossFinal),
    grossProfit: Math.round(grossProfit),
    taxAmount: Math.round(taxAmount),
    totalStampDuty: Math.round(totalStampDuty),
    totalTaxesAndFees: Math.round(taxAmount + totalStampDuty),
    netFinal: Math.round(netFinal),
  };
}
