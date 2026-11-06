export const statusNames={todo:'还没做',doing:'我在做',agent:'交给 Agent',waiting:'等待中',done:'已完成',dropped:'已搁置'};
export function courseOf(task,groups){
 if(Object.hasOwn(task,'course'))return task.course||'';
 if(task.source?.course)return task.source.course;
 if(/实验报告/.test(task.title))return '物理学实验（2）';
 if(/物理复习/.test(task.title))return '物理学引论（荣誉）II';
 if(/最优化复习/.test(task.title))return '最优化方法';
 if(groups.find(g=>g.id===task.card_id)?.title==='具身智能')return '具身智能';
 return '';
}
export function inNextWeek(due,now=Date.now()){
 if(!due)return false;
 const d=new Date(due.replace(' ','T')+(due.includes('Z')||/\+\d{2}:\d{2}$/.test(due)?'':'+08:00')).getTime();
 return Number.isFinite(d)&&d>=now&&d<=now+7*86400000;
}
export function dueLabel(due){if(!due)return '';const match=due.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}:\d{2})/);return match?`${Number(match[2])}月${Number(match[3])}日 ${match[4]} 截止`:due;}
