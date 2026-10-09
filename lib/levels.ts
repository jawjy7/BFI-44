import { LEVEL_THRESHOLDS } from "@/config/bfi44";
export type Level = "Molto basso"|"Basso"|"Medio basso"|"Medio / moderato"|"Medio alto"|"Alto"|"Molto alto";
export function getLevel(z:number):Level { if(z<LEVEL_THRESHOLDS.veryLow)return "Molto basso"; if(z<LEVEL_THRESHOLDS.low)return "Basso"; if(z<LEVEL_THRESHOLDS.moderateLow)return "Medio basso"; if(z<=LEVEL_THRESHOLDS.moderateHigh)return "Medio / moderato"; if(z<=LEVEL_THRESHOLDS.high)return "Medio alto"; if(z<=LEVEL_THRESHOLDS.veryHigh)return "Alto"; return "Molto alto"; }
export function isNearThreshold(z:number){ return [LEVEL_THRESHOLDS.veryLow,LEVEL_THRESHOLDS.low,LEVEL_THRESHOLDS.moderateLow,LEVEL_THRESHOLDS.moderateHigh,LEVEL_THRESHOLDS.high,LEVEL_THRESHOLDS.veryHigh].some(t=>Math.abs(z-t)<=LEVEL_THRESHOLDS.proximity); }
