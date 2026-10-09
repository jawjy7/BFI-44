"use client";

import { Document, Line, Page, Rect, Svg, StyleSheet, Text, View } from "@react-pdf/renderer";
import { DimensionResult } from "@/lib/scoring";
import { AnalysisData, SubjectData } from "@/lib/share";

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 9, color: "#1d2528", fontFamily: "Helvetica" },
  title: { fontSize: 22, marginBottom: 6, color: "#376d68" },
  sub: { fontSize: 10, color: "#6f7a7d", marginBottom: 18 },
  section: { marginTop: 18, marginBottom: 7, fontSize: 13, color: "#376d68" },
  table: { display: "flex", width: "100%", borderTop: "1pt solid #d9dfe0", borderLeft: "1pt solid #d9dfe0" },
  row: { flexDirection: "row" },
  cell: { padding: 5, borderRight: "1pt solid #d9dfe0", borderBottom: "1pt solid #d9dfe0", flex: 1 },
  head: { backgroundColor: "#edf4f1", color: "#376d68" },
  p: { lineHeight: 1.45, marginBottom: 6 },
  small: { color: "#6f7a7d", fontSize: 8, lineHeight: 1.5 },
  chart: { marginTop: 8, padding: 10, border: "1pt solid #d9dfe0" },
  warning: { marginTop: 18, padding: 9, backgroundColor: "#fff0ee", borderLeft: "3pt solid #c56d5c" },
  warningText: { color: "#a54d42", fontSize: 8, lineHeight: 1.45 },
});

function divergentItems(result: DimensionResult) { return result.items.filter((item) => Math.abs(item.scored - result.mean) >= 2); }

export function ReportDocument({ subject, results, analysis, date }: { subject: SubjectData; results: DimensionResult[]; analysis: AnalysisData; date: string }) {
  return <Document title="BFI-44 Profile Report"><Page size="A4" style={s.page}>
    <Text style={s.title}>Profilo BFI-44</Text>
    <Text style={s.sub}>Ubbiali, Chiorri, Hampton & Donati (2013) · {date}</Text>
    <Text style={s.section}>1. Dati generali</Text>
    <Text style={s.p}>Soggetto: {subject.identifier || "—"} · Genere: {subject.gender || "—"} · Età: {subject.age || "—"} · Professione: {subject.profession || "—"}</Text>
    <Text style={s.section}>2. Risultati quantitativi</Text>
    <View style={s.table}><View style={[s.row, s.head]}>{["Dimensione", "Somma", "Media", "M (SD)", "Punto z", "Livello"].map((label) => <Text key={label} style={s.cell}>{label}</Text>)}</View>{results.map((result) => <View style={s.row} key={result.key}><Text style={s.cell}>{result.label}</Text><Text style={s.cell}>{result.sum}</Text><Text style={s.cell}>{result.mean.toFixed(2)}</Text><Text style={s.cell}>{result.normMean.toFixed(2)} ({result.normSd.toFixed(2)})</Text><Text style={s.cell}>{result.z.toFixed(2)}</Text><Text style={s.cell}>{result.level}</Text></View>)}</View>
    <Text style={s.section}>3. Grafico del profilo</Text>
    <View style={s.chart}><Svg width="500" height="170" viewBox="0 0 500 170"><Line x1="35" y1="85" x2="475" y2="85" stroke="#617a76" strokeWidth="1"/>{results.map((result, index) => { const x = 79 + index * 90; const height = Math.min(Math.abs(result.z), 3) * 21; const y = result.z >= 0 ? 85 - height : 85; return [<Rect key={`${result.key}-bar`} x={x - 15} y={y} width="30" height={height} fill={result.z < 0 ? "#9ab7b1" : "#5d8c87"}/>, <Text key={`${result.key}-label`} x={x - 8} y="164" style={{ fontSize: 8 }}>{result.key}</Text>, <Text key={`${result.key}-value`} x={x - 12} y={result.z >= 0 ? y - 4 : y + height + 12} style={{ fontSize: 8 }}>{result.z.toFixed(2)}</Text>]; })}</Svg><Text style={s.small}>Nevroticismo: punteggio alto = maggiore instabilità emotiva.</Text></View>
    <Text style={s.section}>4. Descrizione del profilo</Text>
    <Text style={s.p}>Descrivere i cinque punteggi standard ottenuti. Per i punteggi che si discostano dalla media, considerare i valori assegnati alle singole domande e commentare usando i termini del questionario, delle lezioni o del file di scoring.</Text>
    {results.map((result) => { const outliers = divergentItems(result); return <View key={result.key}><Text style={{ color: "#376d68", marginBottom: 3 }}>{result.label} · {result.level} · z = {result.z.toFixed(2)}</Text>{outliers.length > 0 && <Text style={s.small}>Item che si discostano dalla media: {outliers.map((item) => `${item.id} (${item.scored})`).join(", ")}.</Text>}<Text style={s.p}>{analysis.texts[result.key] || "Nessun commento inserito."}</Text></View>; })}
    <Text style={s.section}>5. Approfondimenti e strumenti proposti</Text>
    <Text style={s.p}>Indicare quali ulteriori informazioni su L. si potrebbero rilevare con osservazioni, interviste, questionari o prove, specificando per quale motivo.</Text>
    {analysis.deepDives.length ? analysis.deepDives.map((dive, index) => <Text style={s.p} key={index}>Ipotesi: {dive.hypothesis || "—"} · Strumento: {dive.instrument || "—"} · Motivazione: {dive.rationale || "—"}</Text>) : <Text style={s.small}>Nessun approfondimento inserito.</Text>}
    {(analysis.generatedText || analysis.criticalComment) && <><Text style={s.section}>6. Descrizione ChatGPT e commento critico</Text>{analysis.generatedText && <Text style={s.p}>Descrizione generata: {analysis.generatedText}</Text>}{analysis.criticalComment && <Text style={s.p}>Commento qualitativo sull'adeguatezza: {analysis.criticalComment}</Text>}</>}
    <View style={s.warning}><Text style={s.warningText}>NOTA METODOLOGICA — I risultati non costituiscono una diagnosi clinica. Interpretare considerando il contesto, i limiti dello strumento e ulteriori informazioni.</Text></View>
  </Page></Document>;
}
