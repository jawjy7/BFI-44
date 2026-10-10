import { Answers } from "@/lib/scoring";
export type SubjectData={identifier:string;gender:string;age:string;profession:string};
export type DeepDive={observedData:string;direction:string;question:string;method:string;hypothesis?:string;instrument?:string;rationale?:string};
export type AnalysisData={texts:Record<string,string>;deepDives:DeepDive[];generatedText:string;criticalComment:string};
export type SharePayload={version:1;subject:SubjectData;answers:Answers;analysis:AnalysisData;createdAt:string};
const b64=(bytes:Uint8Array)=>{let b="";bytes.forEach(x=>b+=String.fromCharCode(x));return btoa(b).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");};
const unb64=(s:string)=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-s.length%4)%4)),c=>c.charCodeAt(0));
export function encodeSharePayload(p:SharePayload){return b64(new TextEncoder().encode(JSON.stringify(p)));}
export function decodeSharePayload(s:string):SharePayload|null{try{const p=JSON.parse(new TextDecoder().decode(unb64(s)));return p?.version===1&&p.answers&&p.subject&&p.analysis?p:null;}catch{return null;}}
