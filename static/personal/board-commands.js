const statuses=new Set(['todo','doing','agent','waiting','done','dropped']);
export function applyCommand(board,command){
 if(!['add','patch'].includes(command.op))throw Error('不支持的操作');
 const patch=command.patch;if(!patch||typeof patch!=='object'||Array.isArray(patch))throw Error('缺少任务内容');
 const clean={};
 for(const key of Object.keys(patch)){
  const v=patch[key];
  if(key==='title'){if(typeof v!=='string'||!v.trim()||v.length>200)throw Error('标题须为 1–200 字');clean.title=v.trim()}
  else if(key==='note'){if(typeof v!=='string'||v.length>4000)throw Error('备注过长');clean.note=v}
  else if(key==='course'){if(typeof v!=='string'||(v&&!board.courses.includes(v)))throw Error('课程不存在');clean.course=v}
  else if(key==='card_id'){if(!board.groups.some(g=>g.id===v))throw Error('分组不存在');clean.card_id=v}
  else if(key==='status'){if(!statuses.has(v))throw Error('状态无效');clean.status=v}
  else if(key==='due'){
   if(v!==null&&(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(v)))throw Error('截止时间无效');
   if(v){const iso=v.replace(' ','T')+':00+08:00';const date=new Date(iso);if(!Number.isFinite(date.getTime())||new Date(date.getTime()+8*3600000).toISOString().slice(0,16)!==v.replace(' ','T'))throw Error('截止日期不存在')}
   clean.due=v;
  }else throw Error('不可修改字段：'+key);
 }
 const next=structuredClone(board);delete next.rev;delete next.runtime;delete next.updatedAt;
 if(command.op==='add'){
  if(!clean.title||!clean.card_id)throw Error('请填写标题和分组');
  if(next.tasks.length>=2000)throw Error('任务数量达到上限');
  next.tasks.push({id:crypto.randomUUID(),status:'todo',course:'',...clean});
 }else{
  const index=next.tasks.findIndex(t=>t.id===command.id);if(index===-1)throw Error('任务不存在');
  next.tasks[index]={...next.tasks[index],...clean};
 }
 return next;
}
