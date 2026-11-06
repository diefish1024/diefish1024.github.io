const absent=Symbol('absent');
const equal=(a,b)=>{
 if(a===b)return true;
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
 const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));
};
const copy=x=>x===absent?absent:structuredClone(x);
export class BoardConflict extends Error{
 constructor(){super('同一内容已在其他设备修改。本页改动仍保留，请选择要保存的版本。');this.conflict=true}
}
// Merge only the user's changed fields; never replace unrelated Canvas/device updates.
export function mergeBoard(base,local,remote,{force=false}={}){
 function merge(b,l,r,key=''){
  if(key==='revision')return copy(r);
  if(equal(l,b))return copy(r);
  if(equal(r,b)||equal(l,r))return copy(l);
  if(key==='updatedAt')return copy(l);
  if(key==='canvasDismissed'&&Array.isArray(l)&&Array.isArray(r))return [...new Set([...r,...l])].slice(-500);
  if(key==='doneDates'&&Array.isArray(l)&&Array.isArray(r)){
   const removed=new Set((Array.isArray(b)?b:[]).filter(day=>!l.includes(day)));
   return [...new Set([...r.filter(day=>!removed.has(day)),...l.filter(day=>!Array.isArray(b)||!b.includes(day))])].sort();
  }
  if([b,l,r].every(x=>x!==absent&&x&&typeof x==='object'&&!Array.isArray(x))){
   const result={};
   for(const k of new Set([...Object.keys(b),...Object.keys(l),...Object.keys(r)])){
    const value=merge(Object.hasOwn(b,k)?b[k]:absent,Object.hasOwn(l,k)?l[k]:absent,Object.hasOwn(r,k)?r[k]:absent,k);
    if(value!==absent)result[k]=value;
   }return result;
  }
  if([b,l,r].every(Array.isArray)){
   const values=[...b,...l,...r],idKey=values.every(x=>x&&typeof x==='object'&&typeof x.id==='string')?'id':key==='places'&&values.every(x=>x&&typeof x.name==='string')?'name':null;
   if(idKey){
    const maps=[b,l,r].map(xs=>new Map(xs.map(x=>[x[idKey],x]))),out=[];
    for(const id of new Set([...l.map(x=>x[idKey]),...r.map(x=>x[idKey]),...b.map(x=>x[idKey])])){
     const value=merge(...maps.map(m=>m.has(id)?m.get(id):absent));if(value!==absent)out.push(value);
    }return out;
   }
  }
  if(force)return copy(l);
  throw new BoardConflict();
 }
 const result=merge(base,local,remote);
 // A task added while another device deleted its group must never become invisible.
 for(const task of result.tasks||[]){
  if(!task.card_id||result.groups.some(g=>g.id===task.card_id))continue;
  const group=local.groups.find(g=>g.id===task.card_id);
  if(!force||!group)throw new BoardConflict();result.groups.push(copy(group));
 }
 for(const group of result.groups||[]){
  if(!group.section||!result.todo?.sections||result.todo.sections.some(s=>s.id===group.section))continue;
  const section=local.todo?.sections?.find(s=>s.id===group.section);
  if(!force||!section)throw new BoardConflict();result.todo.sections.push(copy(section));
 }
 return result;
}
export function sameBoard(a,b){
 const content=board=>{const {revision,updatedAt,...rest}=board;return rest};
 return equal(content(a),content(b));
}
