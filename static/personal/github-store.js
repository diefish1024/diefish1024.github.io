import {applyCommand} from './board-commands.js';
import {mergeBoard,sameBoard} from './board-merge.js';
const REPO='diefish1024/personal-todo-data',API='https://api.github.com/repos/'+REPO,KEY='personal-github-session-v1';
let token='',current=null;
function headers(){return {Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'X-GitHub-Api-Version':'2026-03-10'}}
const decode=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g,'')),c=>c.charCodeAt(0)));
const encode=s=>{let binary='';for(const c of new TextEncoder().encode(s))binary+=String.fromCharCode(c);return btoa(binary)};
async function request(path,options={}){
 let r;
 try{r=await fetch(API+path,{...options,headers:{...headers(),...options.headers},cache:'no-store',redirect:'error',signal:globalThis.AbortSignal?.timeout?.(20000)})}
 catch{throw Error('网络暂时不可用，本页改动已保留，请重试同步')}
 if(r.status===401)throw Error('连接授权已失效，请重新连接');
 if(r.status===403)throw Error('暂时没有权限，或 GitHub 请求过于频繁，请稍后再试');
 if(r.status===404)throw Error('找不到私人清单，请检查授权是否包含 personal-todo-data');return r;
}
async function read(){
 const r=await request('/contents/board.json');if(!r.ok)throw Error('暂时读不到清单');
 const file=await r.json(),board=JSON.parse(decode(file.content));
 if(!Array.isArray(board.tasks)||!Array.isArray(board.groups)||!Array.isArray(board.courses))throw Error('清单格式异常');
 // A poll started before a successful write must not roll the cached SHA backwards.
 if(!current||(board.revision||0)>=(current.board.revision||0))current={board,sha:file.sha};
 const latest=current.board;
 return {...latest,rev:latest.revision||0,runtime:'github',updatedAt:latest.updatedAt||latest.generatedAt};
}
export async function connectGitHub(){
 try{token=sessionStorage.getItem(KEY)||'';if(token){await verify();return}}catch{}token='';
 const host=document.getElementById('app');host.innerHTML=`<main class="connect-card"><h1>ToDo</h1><p>待办、课程、备忘录。</p><form><label for="connection-key">连接你的私人清单</label><input id="connection-key" type="password" autocomplete="off" required placeholder="粘贴此仓库的 GitHub 访问密钥"><small>仅需要 personal-todo-data 私有仓库的 Contents 读写权限。密钥只发送给 GitHub；不要填写 Canvas 授权或 GitHub 密码。</small><label><input name="remember" type="checkbox" checked> 在此标签页保持连接</label><p class="connection-error" role="alert"></p><button class="tbtn on" type="submit">打开清单</button></form><p><a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noreferrer">管理 GitHub 访问授权 ↗</a></p></main>`;
 await new Promise(resolve=>{host.querySelector('form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,button=form.querySelector('button');token=form.querySelector('input[type=password]').value.trim();button.disabled=true;const error=host.querySelector('.connection-error');error.textContent='';try{await verify();if(form.elements.remember.checked)sessionStorage.setItem(KEY,token);form.querySelector('input[type=password]').value='';resolve()}catch(e){token='';error.textContent=e.message;button.disabled=false}})});
}
async function verify(){const r=await request('');if(!r.ok)throw Error('连接失败');const repo=await r.json();if(!repo.private)throw Error('数据仓库必须为私有，已停止读取');await read()}
export function disconnectGitHub(){if(sessionStorage.getItem('personal-pending-changes-v1')&&!confirm('还有未同步的改动，确定放弃这些改动并断开连接？'))return;token='';current=null;sessionStorage.removeItem(KEY);sessionStorage.removeItem('personal-pending-changes-v1');location.reload()}
export async function readBoard(){await read();return structuredClone(current.board)}
let writeQueue=Promise.resolve();
export function writeBoard(base,local,{force=false}={}){
 const run=async()=>{
  if(!current)await readBoard();
  for(let attempt=0;attempt<3;attempt++){
   const {board:remote,sha}=current;
   const next=mergeBoard(base,local,remote,{force});
   if(sameBoard(next,remote))return structuredClone(remote);
   next.revision=(remote.revision||0)+1;next.updatedAt=new Date().toISOString();
   const r=await request('/contents/board.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'Update Personal board',content:encode(JSON.stringify(next,null,2)+'\n'),sha})});
   if(r.status===409||r.status===422){await readBoard();continue}
   if(!r.ok)throw Error('保存失败，请检查仓库读写权限');
   current={board:next,sha:(await r.json()).content.sha};return structuredClone(next);
  }
  throw Error('云端正在更新，请稍后重试；本页改动已保留');
 };
 const result=writeQueue.then(run);writeQueue=result.catch(()=>{});return result;
}
export function mutateBoard(expectedRev,change){
 const run=async()=>{
  const latest=await readBoard(),sha=current.sha;
  if(expectedRev!==(latest.revision||0))throw Error('清单已在别处更新，请点右上角刷新，再保存；输入内容仍保留');
  const next=await change(structuredClone(latest));next.revision=(latest.revision||0)+1;next.updatedAt=new Date().toISOString();
  const r=await request('/contents/board.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'Update Personal board',content:encode(JSON.stringify(next,null,2)+'\n'),sha})});
  if(r.status===409||r.status===422)throw Error('清单刚刚有更新，请刷新后重试；输入内容仍保留');
  if(!r.ok)throw Error('保存失败，请检查仓库读写权限');
  // The successful PUT is authoritative even if a later GET would fail.
  current={board:next,sha:(await r.json()).content.sha};return structuredClone(next);
 };
 const result=writeQueue.then(run);writeQueue=result.catch(()=>{});return result;
}
export async function boardFetch(path,options={}){
 const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
 try{
  if(path==='/api/canvas'){
   const board=await read();if(options.method==='POST')return reply({ok:true,partial:!!board.canvasSync?.error});
   return reply(board.canvasSync||{succeeded_at:null,error:'等待首次自动更新'});
  }
  if(!options.method||options.method==='GET')return reply(await read());
  const command=JSON.parse(options.body),latest=await read();
  if(command.rev!==latest.rev)return reply({error:'另一台设备或 Canvas 已更新清单，请查看最新内容后再保存',board:latest},409);
  const next=applyCommand(latest,command);next.revision=latest.rev+1;next.updatedAt=new Date().toISOString();
  const r=await request('/contents/board.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'Update Personal task',content:encode(JSON.stringify(next,null,2)+'\n'),sha:current.sha})});
  if(r.status===409||r.status===422)return reply({error:'清单刚刚有更新，请重试',board:await read()},409);
  if(!r.ok)throw Error('保存失败，请检查仓库读写权限');
  return reply(await read());
 }catch(e){return reply({error:e.message||'网络暂时不可用，请重试'},503)}
}
