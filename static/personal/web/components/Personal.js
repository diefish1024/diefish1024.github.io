import {html,useState} from '../vendor/preact-htm.js';
import {useBoard} from './ctx.js';
import {Block} from './ui.js';
import {TaskAdd} from './TaskAdd.js';
import {ItemRow} from './Item.js';
import {itemCourse} from '../../todo-adapter.js';
import {CanvasSide} from './Canvas.js';
import {OPEN} from '../lib/model.js';
import {dueLabel} from '../../mobile-model.js';

export function Courses(){
 const {doc,ui,setUi}=useBoard(),[selected,setSelected]=useState(null);
 const names=[...new Set([...doc.courses,...doc.items.map(i=>itemCourse(i,doc.groups)).filter(Boolean)])];
 const back=()=>{if((ui.editing||ui.adding)&&!confirm('有还没保存的内容，确定返回？'))return;setUi({editing:null,adding:null});setSelected(null)};
 if(selected)return html`<button class="course-back" onClick=${back}>← 全部课程</button><${Course} key=${selected} name=${selected} />`;
 return html`<h2 class="courses-title">本学期课程</h2><div class="course-hint">还有什么要做，什么时候交。<${CanvasSide} /></div>
 <div class="course-grid">${names.map((name,index)=>{
  const tasks=doc.items.filter(i=>itemCourse(i,doc.groups)===name&&OPEN.includes(i.status));
  const dated=tasks.filter(i=>/^\d{4}-/.test(i.due||'')).sort((a,b)=>a.due.localeCompare(b.due));
  return html`<button class="card course-summary" onClick=${()=>setSelected(name)}>
   <div class="course-top"><span class="mono">${String(index+1).padStart(2,'0')}</span><span aria-hidden="true">→</span></div>
   <h2>${name}</h2><div class="course-count">${tasks.length?html`<b>${tasks.length}</b> 件待办`:html`<span>暂无已记录待办</span>`}</div>
   <p class="next-due">${dated.length?'最近截止 · '+dueLabel(dated[0].due).replace(/ 截止$/,''):tasks.length?'有待办尚未设置截止时间':'随时添加复习或实验计划'}</p>
  </button>`;
 })}</div>`;
}
function Course({name}){
 const {doc,ui}=useBoard(),[expanded,setExpanded]=useState(false);
 const all=doc.items.filter(i=>itemCourse(i,doc.groups)===name),open=all.filter(i=>OPEN.includes(i.status));
 const shown=expanded?all:all.filter(i=>OPEN.includes(i.status)||ui.editing===`i:${i.id}`);
 const group=doc.groups.find(g=>g.id===doc.settings.canvasGroup)||doc.groups.find(g=>g.title==='课程作业')||doc.groups[0];
 return html`<${Block} side=${html`<h2>${name}</h2><div class="sub">${open.length?`${open.length} 项待办`:'暂无待办'}</div>`}>
  <div class="card"><div class="items">${shown.map(i=>html`<${ItemRow} key=${i.id} item=${i} />`)}</div>
   ${all.length>open.length?html`<button class="tbtn" onClick=${()=>setExpanded(!expanded)}>${expanded?'收起已完成':'查看已完成'}</button>`:null}
   <${TaskAdd} id=${'course:'+name} group=${group?.id} course=${name} label="＋ 添加课程待办" />
  </div>
 <//>`;
}
export function Memos(){
 const {doc,call,setUi}=useBoard(),[text,setText]=useState(''),[saving,setSaving]=useState(false);
 const add=async e=>{
  e.preventDefault();if(saving||!text.trim())return;setSaving(true);
  if(await call('POST','/api/memos',{text},'记下了')){setText('');setUi({adding:null})}setSaving(false);
 };
 return html`<${Block} side=${html`<h2>备忘录</h2><div class="sub">随手记一句。</div>`}>
  <form class="card memo-compose" onSubmit=${add}><textarea class="input" aria-label="备忘录内容" placeholder="想到什么，记在这里……" maxLength="4000" value=${text} disabled=${saving} onInput=${e=>{setText(e.target.value);setUi({adding:e.target.value?'memo':null})}} onKeyDown=${e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')add(e)}}></textarea><div class="memo-footer"><button class="btn primary" disabled=${saving||!text.trim()}>${saving?'保存中':'记下'}</button></div></form>
  ${(doc.memos||[]).map(m=>html`<${Memo} key=${m.id} memo=${m} />`)}
  ${doc.memos?.length?null:html`<div class="none">还没有备忘录。</div>`}
 <//>`;
}
function Memo({memo:m}){
 const {ui,setUi,call}=useBoard(),[text,setText]=useState(m.text),[saving,setSaving]=useState(false);
 const editing=ui.editing==='m:'+m.id;
 const save=async e=>{e.preventDefault();if(saving)return;setSaving(true);if(await call('PATCH','/api/memos/'+m.id,{text},'已保存'))setUi({editing:null});setSaving(false)};
 const remove=async()=>{if(confirm('删除这条备忘录？')){setSaving(true);await call('DELETE','/api/memos/'+m.id,{},'已删除');setSaving(false)}};
 return html`<article class="card memo-card">${editing?html`<form onSubmit=${save}><textarea class="input" aria-label="编辑备忘录" value=${text} maxLength="4000" disabled=${saving} onInput=${e=>setText(e.target.value)}></textarea><div class="memo-footer"><button class="btn" type="button" disabled=${saving} onClick=${()=>setUi({editing:null})}>取消</button><button class="btn primary" disabled=${saving||!text.trim()}>保存</button></div></form>`:html`<p class="memo-text">${m.text}</p><div class="memo-meta"><time datetime=${m.createdAt}>${new Date(m.createdAt).toLocaleString('zh-CN',{month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><button class="tbtn" disabled=${saving} onClick=${()=>{setText(m.text);setUi({editing:'m:'+m.id})}}>编辑</button><button class="tbtn" disabled=${saving} onClick=${remove}>删除</button></div>`}</article>`;
}
