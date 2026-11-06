import {mergeBoard,sameBoard} from './board-merge.js';
const DRAFT_KEY='personal-pending-changes-v1';
export function createOptimisticStore({read,write,edit,storage=null,delay=100}){
 let base=null,local=null,error=null,conflict=false,saving=false,timer=null,loading=null,editing=Promise.resolve(),flight=null;
 const listeners=new Set();
 const dirty=()=>!!base&&!!local&&!sameBoard(base,local);
 const state=()=>({pending:dirty(),saving,error,conflict});
 const snapshot=()=>local&&structuredClone(local);
 function persist(){try{if(dirty())storage?.setItem(DRAFT_KEY,JSON.stringify({base,local}));else storage?.removeItem(DRAFT_KEY)}catch{}}
 function emit(origin='local'){persist();for(const f of listeners)f({board:snapshot(),state:state(),origin})}
 function schedule(){if(dirty()&&!error&&!saving){clearTimeout(timer);timer=setTimeout(()=>flush(),delay)}}
 async function load(){
  if(dirty())return snapshot();
  if(loading)return loading;
  loading=(async()=>{
   const remote=await read();
   if(dirty())return snapshot();
   if(base&&(remote.revision||0)<(base.revision||0))return snapshot();
   const first=!base;base=structuredClone(remote);local=structuredClone(remote);
   error=null;conflict=false;
   if(first){
    let draft;try{draft=JSON.parse(storage?.getItem(DRAFT_KEY)||'null')}catch{}
    if(draft?.base?.tasks&&draft?.local?.tasks){
     try{local=mergeBoard(draft.base,draft.local,remote)}catch(e){base=draft.base;local=draft.local;error=e.message;conflict=!!e.conflict}
    }
   }
   emit('remote');schedule();return snapshot();
  })().finally(()=>{loading=null});return loading;
 }
 function change(method,path,body){
  const result=editing.then(async()=>{
   if(!local)await load();
   const before=snapshot(),next=await edit(before,method,path,body);
   local=mergeBoard(before,next,local);local.updatedAt=new Date().toISOString();emit();schedule();return snapshot();
  });editing=result.catch(()=>{});return result;
 }
 async function flush(force=false){
  if(saving)return flight;
  clearTimeout(timer);timer=null;
  if(!dirty())return snapshot();
  saving=true;error=null;conflict=false;emit();
  const sent=snapshot(),before=structuredClone(base);
  flight=(async()=>{
   try{
    const committed=await write(before,sent,{force});
    await editing;
    local=mergeBoard(sent,local,committed);base=structuredClone(committed);
    if(!dirty())local=structuredClone(committed);
   }catch(e){error=e.message||'网络暂时不可用，请重试';conflict=!!e.conflict}
   finally{saving=false;flight=null;emit();schedule()}
   return snapshot();
  })();return flight;
 }
 async function discard(){
  if(saving)await flight;
  const remote=await read();base=structuredClone(remote);local=structuredClone(remote);error=null;conflict=false;emit();return snapshot();
 }
 return {load,change,flush,discard,state,snapshot,dispose:()=>{clearTimeout(timer);listeners.clear()},subscribe:f=>{listeners.add(f);return()=>listeners.delete(f)}};
}
