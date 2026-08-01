# Direttiva: Motore di Calcolo PAC e Fisco Italiano

## Obiettivo
Calcolare con precisione matematica e trasparenza la simulazione del Piano di Accumulo (PAC) per utenti italiani, incorporando automaticamente la fiscalità italiana sulle rendite finanziarie (art. 26 DPR 600/73) e l'imposta di bollo sui depositi titoli (DM 24/5/2012).

## Formule Finanziarie e Fiscali

### 1. Accumulo Mese per Mese
Per ogni mese $t = 1 \dots 12 \times N$:
- $P_t = P_{t-1} \times (1 + r_{\text{mensile}}) + M$
- dove $M$ è il versamento mensile, $r_{\text{mensile}} = (1 + r_{\text{annuo}})^{1/12} - 1$.
- Il capitale versato cumulato è $C_t = C_0 + M \times t$.

### 2. Imposta di Bollo Annuale (0.20%)
A fine di ciascun anno (ogni 12 mesi):
- $\text{Bollo}_y = P_{12y} \times 0,0020$
- Il valore del portafoglio viene ridotto dell'imposta di bollo: $P_{12y} \leftarrow P_{12y} - \text{Bollo}_y$.

### 3. Tassazione sulle Plusvalenze (26% o 12,5%)
A fine orizzonte temporale ($N$ anni):
- Plusvalenza Lorda $= P_{\text{finale}} - C_{\text{totale}}$ (se $> 0$)
- Tassa Plusvalenza $= \text{Plusvalenza Lorda} \times \text{Aliquota}$ (26% per ETF, 12,5% per BPF/Titoli di Stato)
- Montante Netto Finale $= P_{\text{finale}} - \text{Tassa Plusvalenza}$
