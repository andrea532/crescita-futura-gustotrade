import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crescita Futura by Gustotrade | Simulatore PAC per Genitori Italiani',
  description:
    "Il simulatore di Piano di Accumulo (PAC) definitivo per le famiglie italiane. Calcola il valore netto reale per i tuoi figli con il 26% sulle plusvalenze e lo 0,20% di bollo già sottratti.",
  keywords: [
    'PAC',
    'Piano di Accumulo',
    'Investire per i figli',
    'Fisco italiano',
    'Simulatore PAC',
    'Tassazione ETF 26%',
    'Imposta di bollo 0.20%',
    'VWCE',
    'Gustotrade',
  ],
  authors: [{ name: 'Gustotrade' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#F8F9FF] text-slate-900">
        {children}
      </body>
    </html>
  );
}
