import {mergeBoard,sameBoard} from './board-merge.js';
const DRAFT_KEY='personal-pending-changes-v1';
export function createOptimisticStore({read,write,edit,storage=null,delay=100,initialBoard=null,initialIsCached=false}){
 let base=null,local=null,error=null,conflict=false,saving=false,timer=null,loading=null,editing=Promise.resolve(),flight=null;
 let refreshing=false,fromCache=initialIsCached;
 const listeners=new Set();
 const dirty=()=>!!base&&!!local&&!sameBoard(base,local);
 const state=()=>({pending:dirty(),saving,error,conflict,refreshing,fromCache});
 const snapshot=()=>local&&structuredClone(local);
 function persist(){if(!base)return;try{if(dirty())storage?.setItem(DRAFT_KEY,JSON.stringify({base,local}));else storage?.removeItem(DRAFT_KEY)}catch{}}
 function emit(origin='local'){persist();for(const f of listeners)f({board:snapshot(),state:state(),origin})}
 function schedule(){if(dirty()&&!error&&!saving){clearTimeout(timer);timer=setTimeout(()=>flush(),delay)}}
 function restore(remote){
  base=structuredClone(remote);local=structuredClone(remote);
  let draft;try{draft=JSON.parse(storage?.getItem(DRAFT_KEY)||'null')}catch{}
  if(draft?.base?.tasks&&draft?.local?.tasks){
   try{local=mergeBoard(draft.base,draft.local,remote)}catch(e){base=draft.base;local=draft.local;error=e.message;conflict=!!e.conflict}
  }
 }
 if(initialBoard)restore(initialBoard);
 async function load(){
  if(dirty()){schedule();return snapshot()}
  if(loading)return loading;
  refreshing=true;emit('remote');
  loading=(async()=>{
   const remote=await read();
   fromCache=false;
   if(dirty())return snapshot();
   if(base&&(remote.revision||0)<(base.revision||0))return snapshot();
   const first=!base;base=structuredClone(remote);local=structuredClone(remote);
   error=null;conflict=false;
   if(first)restore(remote);
   emit('remote');schedule();return snapshot();
  })().finally(()=>{loading=null;refreshing=false;emit('remote')});return loading;
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
    local=mergeBoard(sent,local,committed);base=structuredClone(committed);fromCache=false;
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
