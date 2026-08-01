export interface EtfItem {
  id: string;
  name: string;
  ticker: string;
  category: string;
  expectedReturn: number;
  maxDrawdown: number;
  recoveryYears: number;
  weight: number;
  taxRate?: number;
}

export interface YearData {
  year: number;
  contributed: number;
  grossPortfolio: number;
  netPortfolioAfterStamp: number;
  stampDutyPaid: number;
  netGain: number;
}

export interface CalculationResult {
  initialAmount: number;
  monthlyAmount: number;
  years: number;
  weightedReturn: number;
  weightedDrawdown: number;
  weightedRecoveryYears: number;
  weightedTaxRate: number;
  totalContributed: number;
  grossFinal: number;
  grossProfit: number;
  capitalGainsTax: number;
  totalStampDuty: number;
  totalTaxesAndFees: number;
  netFinal: number;
  worstCaseNet: number;
  yearlyHistory: YearData[];
}

export const DEFAULT_ETFS: EtfItem[] = [
  {
    id: 'vwce',
    name: 'Vanguard FTSE All-World UCITS ETF Acc',
    ticker: 'VWCE',
    category: 'Azionario Globale',
    expectedReturn: 0.078,
    maxDrawdown: 0.338,
    recoveryYears: 2.1,
    weight: 60,
    taxRate: 0.26,
  },
  {
    id: 'eagg',
    name: 'iShares Core Global Aggregate Bond UCITS ETF EUR Hedged Acc',
    ticker: 'EAGG',
    category: 'Obbligazionario Globale',
    expectedReturn: 0.032,
    maxDrawdown: 0.162,
    recoveryYears: 1.8,
    weight: 40,
    taxRate: 0.26,
  },
];

export function calculatePAC(
  initialAmount: number,
  monthlyAmount: number,
  years: number,
  etfs: EtfItem[] = DEFAULT_ETFS
): CalculationResult {
  const totalWeight = etfs.reduce((sum, item) => sum + item.weight, 0) || 100;

  const weightedReturn = etfs.reduce(
    (sum, item) => sum + (item.expectedReturn * item.weight) / totalWeight,
    0
  );

  const weightedDrawdown = etfs.reduce(
    (sum, item) => sum + (item.maxDrawdown * item.weight) / totalWeight,
    0
  );

  const weightedRecoveryYears = etfs.reduce(
    (sum, item) => sum + (item.recoveryYears * item.weight) / totalWeight,
    0
  );

  const weightedTaxRate = etfs.reduce(
    (sum, item) => sum + ((item.taxRate ?? 0.26) * item.weight) / totalWeight,
    0
  );

  const totalMonths = years * 12;
  const monthlyReturn = Math.pow(1 + weightedReturn, 1 / 12) - 1;

  let currentPortfolio = initialAmount;
  let totalContributed = initialAmount;
  let totalStampDuty = 0;
  const yearlyHistory: YearData[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    currentPortfolio = currentPortfolio * (1 + monthlyReturn) + monthlyAmount;
    totalContributed += monthlyAmount;

    if (month % 12 === 0) {
      const year = month / 12;
      let stampDuty = 0;

      if (currentPortfolio > 5000) {
        stampDuty = currentPortfolio * 0.002;
        currentPortfolio -= stampDuty;
        totalStampDuty += stampDuty;
      }

      const grossProfitYear = Math.max(0, currentPortfolio - totalContributed);
      const estCapitalGainTax = grossProfitYear * weightedTaxRate;
      const netGainYear = Math.max(0, currentPortfolio - estCapitalGainTax - totalContributed);

      yearlyHistory.push({
        year,
        contributed: Math.round(totalContributed),
        grossPortfolio: Math.round(currentPortfolio + stampDuty),
        netPortfolioAfterStamp: Math.round(currentPortfolio),
        stampDutyPaid: Math.round(stampDuty),
        netGain: Math.round(netGainYear),
      });
    }
  }

  const grossFinal = currentPortfolio;
  const grossProfit = Math.max(0, grossFinal - totalContributed);
  const capitalGainsTax = grossProfit * weightedTaxRate;
  const netFinal = grossFinal - capitalGainsTax;
  const totalTaxesAndFees = capitalGainsTax + totalStampDuty;
  const worstCaseNet = netFinal * (1 - weightedDrawdown);

  return {
    initialAmount,
    monthlyAmount,
    years,
    weightedReturn,
    weightedDrawdown,
    weightedRecoveryYears,
    weightedTaxRate,
    totalContributed: Math.round(totalContributed),
    grossFinal: Math.round(grossFinal),
    grossProfit: Math.round(grossProfit),
    capitalGainsTax: Math.round(capitalGainsTax),
    totalStampDuty: Math.round(totalStampDuty),
    totalTaxesAndFees: Math.round(totalTaxesAndFees),
    netFinal: Math.round(netFinal),
    worstCaseNet: Math.round(worstCaseNet),
    yearlyHistory,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}
