import {describe,expect,it} from "vitest";
import {BFI44,ITEMS} from "@/config/bfi44";
import {calculateResults,invertScore,isValidAnswer,missingItems} from "@/lib/scoring";
import {getLevel} from "@/lib/levels";
const ref=[5,2,5,1,5,3,5,2,4,5,5,1,5,4,5,4,3,2,4,5,1,3,2,4,5,5,2,5,1,2,3,4,5,4,1,4,2,5,3,5,4,4,3,1];
const answers=Object.fromEntries(ref.map((v,i)=>[i+1,v]));
describe("BFI-44",()=>{
 it("matches reference",()=>{const r=calculateResults(answers);expect(r.map(x=>x.sum)).toEqual([34,36,40,19,40]);expect(r.map(x=>+x.mean.toFixed(4))).toEqual([4.25,4,4.4444,2.375,4]);expect(r.map(x=>+x.z.toFixed(3))).toEqual([1.321,.39,1.499,-1.069,.242]);expect(r[2].nearThreshold).toBe(true);});
 it("inverts scale",()=>expect([1,2,3,4,5].map(invertScore)).toEqual([5,4,3,2,1]));
 it("handles all 3s",()=>expect(calculateResults(Object.fromEntries(ITEMS.map(({id})=>[id,3]))).every(x=>x.mean===3)).toBe(true));
 it("handles E all 5s and 1s",()=>{expect(calculateResults(Object.fromEntries(ITEMS.map(({id})=>[id,5])))[0].sum).toBe(28);expect(calculateResults(Object.fromEntries(ITEMS.map(({id})=>[id,1])))[0].sum).toBe(20);});
 it("maps all 44 items once",()=>{const ids=Object.values(BFI44.dimensions).flatMap(x=>x.items);expect(ids.length).toBe(44);expect(new Set(ids).size).toBe(44);});
 it("rejects invalid answers",()=>{expect(isValidAnswer(0)).toBe(false);expect(isValidAnswer(6)).toBe(false);expect(isValidAnswer(3.5)).toBe(false);expect(isValidAnswer("3")).toBe(false);expect(missingItems({1:3})).toHaveLength(43);});
 it("uses threshold boundaries",()=>{expect(getLevel(1)).toBe("Medio / moderato");expect(getLevel(1.0001)).toBe("Medio alto");expect(getLevel(-1.5)).toBe("Medio basso");expect(getLevel(2.0001)).toBe("Molto alto");});
});
