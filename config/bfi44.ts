export type DimensionKey = "E" | "A" | "C" | "N" | "O";
export type DimensionConfig = { label: string; items: number[]; reversed: number[]; norm: { m: number; sd: number } };

export const BFI44 = {
  scaleMin: 1, scaleMax: 5,
  dimensions: {
    E: { label: "Estroversione", items: [1,6,11,16,21,26,31,36], reversed: [6,21,31], norm: {m:3.14,sd:.84} },
    A: { label: "Amicalità", items: [2,7,12,17,22,27,32,37,42], reversed: [2,12,27,37], norm: {m:3.77,sd:.59} },
    C: { label: "Coscienziosità", items: [3,8,13,18,23,28,33,38,43], reversed: [8,18,23,43], norm: {m:3.44,sd:.67} },
    N: { label: "Nevroticismo", items: [4,9,14,19,24,29,34,39], reversed: [9,24,34], norm: {m:3.23,sd:.80} },
    O: { label: "Apertura mentale", items: [5,10,15,20,25,30,35,40,41,44], reversed: [35,41], norm: {m:3.84,sd:.66} },
  } satisfies Record<DimensionKey, DimensionConfig>,
} as const;

const texts = [
  "È loquace","Tende a trovare da ridire sugli altri","Lavora in modo accurato","È depressa, triste","È originale, propone idee nuove","È riservata","È premurosa ed altruista con gli altri","Può essere piuttosto sbadata","È rilassata, gestisce bene lo stress","Ha curiosità in molti ambiti diversi","È piena di energia","Attacca briga con gli altri","È un lavoratore affidabile","Può essere tesa","È ingegnosa, un pensatore profondo","Genera molto entusiasmo","Per natura tende a perdonare","Tende ad essere disorganizzata","Si preoccupa molto","Ha un'immaginazione attiva","Tende ad essere taciturna","Di solito si fida","Tende ad essere pigra","È emotivamente stabile, non si turba facilmente","È inventiva","Ha una personalità energica","Può essere fredda ed emotivamente distaccata","Persevera finché il compito è terminato","Può essere lunatica","Apprezza le esperienze artistiche, estetiche","È qualche volta timida, inibita","È premurosa e gentile pressoché con tutti","Fa le cose efficientemente","Rimane calma nelle situazioni tese","Preferisce un lavoro che sia di routine","È estroversa, socievole","È qualche volta scortese con gli altri","Fa dei piani e li porta a termine","Diventa facilmente apprensiva","Ama riflettere, giocare con le idee","Ha pochi interessi artistici","Ama cooperare con gli altri","È facilmente distratta","Ha una sensibilità raffinata per l'arte, la musica o la letteratura"
];
export const ITEMS = texts.map((text, i) => ({id:i+1, text}));
export const SCALE_LABELS = ["Per nulla d'accordo","Poco d'accordo","Né d'accordo né in disaccordo","Abbastanza d'accordo","Completamente d'accordo"];
export const LEVEL_THRESHOLDS = { veryLow:-2, low:-1.5, moderateLow:-1, moderateHigh:1, high:1.5, veryHigh:2, proximity:.01 } as const;
