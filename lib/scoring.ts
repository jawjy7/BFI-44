import { BFI44, DimensionKey, ITEMS } from "@/config/bfi44";
import { getLevel, isNearThreshold, Level } from "@/lib/levels";
export type Answers = Record<number, number|undefined>;
export type DimensionResult = {key:DimensionKey;label:string;sum:number;count:number;mean:number;normMean:number;normSd:number;z:number;level:Level;nearThreshold:boolean;items:{id:number;text:string;original:number;reversed:boolean;scored:number}[]};
export function isValidAnswer(v:unknown):v is number { return typeof v === "number" && Number.isInteger(v) && v>=BFI44.scaleMin && v<=BFI44.scaleMax; }
export function missingItems(a:Answers){ return ITEMS.filter(({id})=>!isValidAnswer(a[id])).map(({id})=>id); }
export function invertScore(v:number){ return BFI44.scaleMax+BFI44.scaleMin-v; }
export function calculateResults(a:Answers):DimensionResult[] { const missing=missingItems(a); if(missing.length) throw new Error(`Risposte mancanti o non valide: ${missing.join(", ")}`); return (Object.keys(BFI44.dimensions) as DimensionKey[]).map(key=>{ const config=BFI44.dimensions[key]; const items=config.items.map(id=>{const original=a[id] as number; const reversed=config.reversed.includes(id); return {id,text:ITEMS[id-1].text,original,reversed,scored:reversed?invertScore(original):original};}); const sum=items.reduce((t,i)=>t+i.scored,0); const mean=sum/items.length; const z=(mean-config.norm.m)/config.norm.sd; return {key,label:config.label,sum,count:items.length,mean,normMean:config.norm.m,normSd:config.norm.sd,z,level:getLevel(z),nearThreshold:isNearThreshold(z),items}; }); }
