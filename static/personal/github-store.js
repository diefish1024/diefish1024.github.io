import {applyCommand} from './board-commands.js';
import {mergeBoard,sameBoard} from './board-merge.js';
import {createConnectionStorage} from './connection-storage.js';
import {createBoardCache,clearBoardCaches} from './board-cache.js';
const REPO='diefish1024/personal-todo-data',API='https://api.github.com/repos/'+REPO;
let token='',current=null;
let verified=false,verification=null,boardCache=null,openingCached=false;
export const connectionOpening=()=>({initialIsCached:openingCached,cache:boardCache});
function headers(){return {Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'X-GitHub-Api-Version':'2026-03-10'}}
const decode=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g,'')),c=>c.charCodeAt(0)));
const encode=s=>{let binary='';for(const c of new TextEncoder().encode(s))binary+=String.fromCharCode(c);return btoa(binary)};
async function request(path,options={}){
 let r;
 try{r=await fetch(API+path,{...options,headers:{...headers(),...options.headers},cache:'no-store',redirect:'error',signal:globalThis.AbortSignal?.timeout?.(20000)})}
 catch{throw Error('网络暂时不可用，本页改动已保留，请重试同步')}
 if(r.status===401)throw Object.assign(Error('连接授权已失效，请重新连接'),{status:401});
 if(r.status===403)throw Error('暂时没有权限，或 GitHub 请求过于频繁，请稍后再试');
 if(r.status===404)throw Error('找不到私人清单，请检查授权是否包含 personal-todo-data');return r;
}
async function fetchBoardFile(){
 const r=await request('/contents/board.json');if(!r.ok)throw Error('暂时读不到清单');
 const file=await r.json(),board=JSON.parse(decode(file.content));
 if(!Array.isArray(board.tasks)||!Array.isArray(board.groups)||!Array.isArray(board.courses))throw Error('清单格式异常');
 return {board,sha:file.sha};
}
async function read(){
 const file=await fetchBoardFile(),board=file.board;
 // A poll started before a successful write must not roll the cached SHA backwards.
 if(!current||(board.revision||0)>=(current.board.revision||0))current={board,sha:file.sha};
 boardCache?.write(current.board);
 const latest=current.board;
 return {...latest,rev:latest.revision||0,runtime:'github',updatedAt:latest.updatedAt||latest.generatedAt};
}
export async function connectGitHub(){
 const connection=createConnectionStorage();
 let saved=connection.load(),message='';
 if(saved){
  token=saved.token;
  boardCache=await createBoardCache(saved);
  const cached=boardCache.read();
  if(cached){openingCached=true;return cached}
  try{await ensureVerified();if(saved.legacy)connection.save(token,true);return structuredClone(current.board)}
  catch(e){message=e.status===401?e.message:'登录信息仍在此浏览器中，暂时无法连接。请重试，或更换密钥。';if(e.status===401){connection.forget();saved=null;token=''}}
 }
 const host=document.getElementById('app');
 return await new Promise(resolve=>{
  function render(){
   host.innerHTML=`<main class="connect-card"><h1>ToDo</h1><p>待办、课程、备忘录。</p><form>${saved?'<p>已记住你的私人清单连接。</p>':`<label for="connection-key">连接你的私人清单</label><input id="connection-key" type="password" autocomplete="off" required placeholder="粘贴此仓库的 GitHub 访问密钥"><small>仅需要 personal-todo-data 私有仓库的 Contents 读写权限。密钥只发送给 GitHub；不要填写 Canvas 授权或 GitHub 密码。</small><label><input name="remember" type="checkbox" checked> 在此浏览器保持登录</label><small>关闭网页后仍可直接打开；可在设置中退出登录。仅在自己的设备上勾选。</small>`}<p class="connection-error" role="alert"></p><button class="tbtn on" type="submit">${saved?'重试连接':'打开清单'}</button>${saved?'<button class="tbtn" type="button">更换密钥</button>':''}</form><p><a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noreferrer">管理 GitHub 访问授权 ↗</a></p></main>`;
   const form=host.querySelector('form'),error=host.querySelector('.connection-error');error.textContent=message;
   form.querySelector('button[type=button]')?.addEventListener('click',()=>{saved=null;token='';current=null;verified=false;boardCache=null;message='';render()});
   form.addEventListener('submit',async e=>{
    e.preventDefault();const buttons=form.querySelectorAll('button');for(const button of buttons)button.disabled=true;
    token=saved?.token||form.querySelector('input[type=password]').value.trim();verified=false;current=null;boardCache=null;error.textContent='';
    try{await ensureVerified();const remember=saved?saved.remember:form.elements.remember.checked;connection.save(token,remember);clearBoardCaches();boardCache=await createBoardCache({token,remember});boardCache.write(current.board);const input=form.querySelector('input[type=password]');if(input)input.value='';resolve(structuredClone(current.board))}
    catch(e){
     if(saved&&e.status===401){connection.forget();saved=null;token='';message=e.message;render();return}
     if(!saved)token='';error.textContent=e.message;for(const button of buttons)button.disabled=false;
    }
   });
  }
  render();
 });
}
async function verify(){
 const [repoResult,boardResult]=await Promise.allSettled([
  (async()=>{const r=await request('');if(!r.ok)throw Error('连接失败');const repo=await r.json();if(!repo.private)throw Error('数据仓库必须为私有，已停止读取')})(),
  fetchBoardFile()
 ]);
 const failures=[repoResult,boardResult].filter(result=>result.status==='rejected');
 if(failures.length)throw (failures.find(result=>result.reason.status===401)||failures[0]).reason;
 // Only expose the snapshot after both authorization and private-repository checks pass.
 current=boardResult.value;
}
async function ensureVerified(){
 if(verified)return;
 if(!verification)verification=verify().then(()=>{verified=true;boardCache?.write(current.board)}).finally(()=>{verification=null});
 await verification;
}
export function disconnectGitHub(){if(sessionStorage.getItem('personal-pending-changes-v1')&&!confirm('还有未同步的改动，确定放弃这些改动并退出登录？'))return;createConnectionStorage().forget();clearBoardCaches();token='';current=null;verified=false;sessionStorage.removeItem('personal-pending-changes-v1');location.reload()}
export async function readBoard(){if(token&&!verified)await ensureVerified();else await read();return structuredClone(current.board)}
let writeQueue=Promise.resolve();
export function writeBoard(base,local,{force=false}={}){
 const run=async()=>{
  if(token&&!verified)await ensureVerified();
  if(!current)await readBoard();
  for(let attempt=0;attempt<3;attempt++){
   const {board:remote,sha}=current;
   const next=mergeBoard(base,local,remote,{force});
   if(sameBoard(next,remote))return structuredClone(remote);
   next.revision=(remote.revision||0)+1;next.updatedAt=new Date().toISOString();
   const r=await request('/contents/board.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:'Update Personal board',content:encode(JSON.stringify(next,null,2)+'\n'),sha})});
   if(r.status===409||r.status===422){await readBoard();continue}
   if(!r.ok)throw Error('保存失败，请检查仓库读写权限');
   current={board:next,sha:(await r.json()).content.sha};boardCache?.write(next);return structuredClone(next);
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
