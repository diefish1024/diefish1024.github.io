import {normalize} from './core/schema.mjs';
import {EDITS,match} from './core/edits.mjs';
import {courseOf} from './mobile-model.js';
import {createOptimisticStore} from './optimistic-store.js';

// Cloud tasks remain authoritative. Views never keep separate task copies.
export function toDoc(board){
 const layout=board.todo||{};
 const sections=structuredClone(layout.sections?.length?layout.sections:[{id:'todo',title:'待办'}]);
 const groups=board.groups.map((g,n)=>({...g,section:sections.some(s=>s.id===g.section)?g.section:sections[0].id,order:g.order??(n+1)*10}));
 return normalize({...structuredClone(layout),sections,groups,
  items:board.tasks.map(t=>{const item={...structuredClone(t),group:t.card_id};delete item.card_id;return item}),
  courses:[...board.courses],memos:structuredClone(board.memos||[]),canvasSync:board.canvasSync,
  rev:board.revision||0,updatedAt:board.updatedAt||board.generatedAt});
}
export function fromDoc(board,doc){
 const {sections,theme,settings,extras,places}=doc;
 return {...structuredClone(board),todo:{sections,theme,settings,extras,places},groups:doc.groups,
  tasks:doc.items.map(i=>{const task={...i,card_id:i.group};delete task.group;return task}),memos:doc.memos||[]};
}
export async function editBoard(board,method,path,body={}){
 const doc=toDoc(board),memo=/^\/api\/memos(?:\/([^/]+))?$/.exec(path);
 if(memo){
  const at=new Date().toISOString(),text=String(body.text||'').trim();
  if(method!=='DELETE'&&(!text||text.length>4000))throw Error('请写下 1–4000 字');
  if(method==='POST'&&!memo[1])doc.memos.unshift({id:crypto.randomUUID(),text,createdAt:at,updatedAt:at});
  else{
   const item=doc.memos.find(m=>m.id===memo[1]);if(!item)throw Error('这条备忘录已不存在，请刷新');
   if(method==='PATCH'){item.text=text;item.updatedAt=at;}
   else if(method==='DELETE')doc.memos=doc.memos.filter(m=>m!==item);
   else throw Error('不支持的操作');
  }
 }else{
  const edit=match(EDITS,method,path);if(!edit)throw Error('不支持的操作');
  await edit.fn(doc,structuredClone(body),edit.id);
  if(method==='POST'&&path==='/api/items'&&body.course){
   if(!board.courses.includes(body.course))throw Error('课程不存在，请刷新');
   doc.items.at(-1).course=body.course;
  }
 }
 return fromDoc(board,normalize(doc));
}
export const itemCourse=(item,groups)=>courseOf({...item,card_id:item.group},groups);
export function cloudBackend({readBoard,writeBoard,storage=null,initialBoard=null}){
 let opening=initialBoard;
 const read=async()=>{if(opening){const board=opening;opening=null;return structuredClone(board)}return readBoard()};
 const store=createOptimisticStore({read,write:writeBoard,edit:editBoard,storage});
 const backend=async(method,path,body={})=>{
  if(method==='GET'&&path==='/api/todo')return toDoc(await store.load());
  if(method==='GET'&&path==='/api/canvas')return (await readBoard()).canvasSync||{};
  if(method==='POST'&&path==='/api/retry')return toDoc(await store.flush(!!body.force));
  if(method==='POST'&&path==='/api/discard')return toDoc(await store.discard());
  return toDoc(await store.change(method,path,body));
 };
 backend.subscribe=fn=>store.subscribe(event=>fn({...event,doc:event.board&&toDoc(event.board)}));
 backend.pending=()=>store.state().pending;
 return backend;
}
