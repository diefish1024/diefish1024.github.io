'use strict';
const $=id=>document.getElementById(id),video=$('video'),secondary=$('secondary');
const local=['localhost','127.0.0.1'].includes(location.hostname);
const endpoint=local?location.origin:window.COURSE_PLAYER_API||'';
const safeRead=(key,fallback='')=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
const safeWrite=(key,value)=>{try{localStorage.setItem(key,value);}catch{}};
try{localStorage.removeItem('player.key');sessionStorage.removeItem('player.key');}catch{}
const status=text=>$('player-status').textContent=text;
const sync=new coursePlayback.DualPlayback(video,secondary,status);
let selected=null,media=null,currentViews=[],courses=[],offlineMode=false;
let courseGeneration=0,mediaGeneration=0,downloadController=null,captionUrl=null,captionPromise=null;
let captions=[],captionsEnabled=safeRead('player.captions','on')==='on',nativeFullscreen=false;
let speed=Number(safeRead('player.speed','1.5'));
if(![1,1.5,2,2.5,3].includes(speed))speed=1.5;
const time=seconds=>{seconds=Math.floor(Number.isFinite(seconds)?seconds:0);return(seconds>=3600?Math.floor(seconds/3600)+':':'')+String(Math.floor(seconds/60)%60).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');};
const mb=bytes=>(bytes/1024/1024).toFixed(0)+' MB';
const positionKey=()=>selected?`player.position.${selected.course}.${selected.id}`:null;
function savePosition(){const key=positionKey();if(key&&video.currentTime>0&&!video.ended)safeWrite(key,String(video.currentTime));}
function errorText(error){return error?.name==='AbortError'?'操作已取消。':error?.message||'连接失败，请重试。';}
async function api(path){
  if(!endpoint)throw new Error('课程服务尚未上线。');
  let response;
  try{response=await fetch(endpoint.replace(/\/$/,'')+path,{credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(90000)});}
  catch{throw new Error('暂时连不上课程服务，请检查网络后刷新。');}
  let data;try{data=await response.json();}catch{throw new Error('课程服务返回异常。');}
  if(!response.ok)throw new Error(data.error||'读取课程失败。');return data;
}
function rate(value){speed=value;for(const element of[video,secondary]){element.defaultPlaybackRate=value;element.playbackRate=value;element.preservesPitch=true;}safeWrite('player.speed',String(value));document.querySelectorAll('[data-rate]').forEach(b=>{const active=Number(b.dataset.rate)===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}
rate(speed);
$('rates').onclick=event=>{const b=event.target.closest('[data-rate]');if(b)try{rate(Number(b.dataset.rate));}catch{status('当前浏览器无法使用这个速度。');}};
function updateCaptions(){
  $('caption-line').hidden=!captionsEnabled||!captions.length||nativeFullscreen;
  $('caption-line').textContent=coursePlayback.captionAt(captions,video.currentTime);
  $('caption-toggle').setAttribute('aria-pressed',String(captionsEnabled));
  for(const track of video.textTracks)track.mode=captionsEnabled&&nativeFullscreen?'showing':'hidden';
}
function setCaptions(value){
  captions=value||[];video.querySelectorAll('track').forEach(t=>t.remove());
  if(captionUrl){URL.revokeObjectURL(captionUrl);captionUrl=null;}
  $('caption-toggle').disabled=!captions.length;$('caption-toggle').textContent=captions.length?'字幕':'暂无字幕';
  if(captions.length){captionUrl=URL.createObjectURL(new Blob([coursePlayback.captionsVtt(captions)],{type:'text/vtt'}));const track=document.createElement('track');track.kind='subtitles';track.label='中文字幕';track.srclang='zh';track.src=captionUrl;track.default=true;track.onload=updateCaptions;video.append(track);}
  updateCaptions();
}
$('caption-toggle').onclick=()=>{captionsEnabled=!captionsEnabled;safeWrite('player.captions',captionsEnabled?'on':'off');updateCaptions();};
video.addEventListener('webkitbeginfullscreen',()=>{nativeFullscreen=true;updateCaptions();});
video.addEventListener('webkitendfullscreen',()=>{nativeFullscreen=false;updateCaptions();});
document.addEventListener('fullscreenchange',()=>{nativeFullscreen=document.fullscreenElement===video;updateCaptions();});
function clearMedia(){
  savePosition();sync.enable(false);
  for(const element of[video,secondary]){element.pause();element.onloadedmetadata=null;element.removeAttribute('src');element.load();}
  currentViews=[];$('secondary-panel').hidden=true;$('stage').dataset.mode='single';
  for(const id of['back','forward','fullscreen','refresh-media','layout'])$(id).disabled=true;
  $('download').disabled=!downloadController;setCaptions([]);status('');
}
function updateSelected(){document.querySelectorAll('[data-recording]').forEach(b=>b.classList.toggle('active',b.dataset.recording===`${selected?.course}/${selected?.id}`));}
function lessonButton(record,course,title,onClick){
  const b=document.createElement('button');b.className='lesson';b.dataset.recording=`${course}/${record.id}`;
  const name=document.createElement('strong');name.textContent=title;
  const detail=document.createElement('small');const saved=Number(safeRead(`player.position.${course}.${record.id}`));
  detail.textContent=(record.begin||'').slice(11,16)+(saved>0?' · 看到 '+time(saved):'');
  b.append(name,detail);b.onclick=onClick;return b;
}
async function loadCourses(){
  $('list-status').textContent='正在读取课程…';$('courses').disabled=true;
  try{
    const result=await api('/api/courses');courses=result.courses;$('courses').replaceChildren();
    if(!courses.length){$('list-status').textContent='当前没有课程。';return;}
    courses.forEach(c=>$('courses').append(new Option(c.name,c.id)));
    const previous=safeRead('player.course');if(courses.some(c=>c.id===previous))$('courses').value=previous;
    $('courses').disabled=false;await loadRecordings();
  }catch(error){$('list-status').textContent=errorText(error);}
}
async function loadRecordings(){
  const generation=++courseGeneration,course=$('courses').value;if(!course)return;
  const courseName=courses.find(c=>c.id===course)?.name||'课堂回放';
  $('recordings').replaceChildren();$('list-status').textContent='正在读取回放…';safeWrite('player.course',course);
  try{
    const data=await api(`/api/courses/${course}/recordings`);if(generation!==courseGeneration)return;
    $('list-status').textContent=data.recordings.length?`${data.recordings.filter(r=>r.available).length} 节回放`:'暂无回放。';
    data.recordings.forEach(r=>{const b=lessonButton(r,course,(r.begin||'').slice(0,10),()=>void openRecording({...r,course,courseName}));if(!r.available){b.disabled=true;b.querySelector('small').textContent='尚未开放';}$('recordings').append(b);});updateSelected();
  }catch(error){if(generation===courseGeneration)$('list-status').textContent=errorText(error);}
}
function configureLayouts(preference='dual'){
  $('layout').replaceChildren();const ppt=media.views.find(v=>v.id==='5'),teacher=media.views.find(v=>v.id==='1')||media.views.find(v=>v.id==='2');
  if(ppt&&teacher)$('layout').append(new Option('PPT + 教师','dual'));
  for(const v of media.views)$('layout').append(new Option(v.label,v.id));
  $('layout').disabled=false;
  if([...$('layout').options].some(o=>o.value===preference))$('layout').value=preference;
}
function layoutViews(){
  if(!media)return[];
  if($('layout').value==='dual')return[media.views.find(v=>v.id==='5'),media.views.find(v=>v.id==='1')||media.views.find(v=>v.id==='2')].filter(Boolean);
  return media.views.filter(v=>v.id===$('layout').value);
}
function applyLayout(resume=video.currentTime,autoplay=false){
  savePosition();sync.enable(false);video.pause();secondary.pause();
  currentViews=layoutViews();const[main,other]=currentViews;if(!main)return;
  $('stage').dataset.mode=other?'dual':'single';$('secondary-panel').hidden=!other;
  $('primary-label').textContent=main.label;$('secondary-label').textContent=other?.label||'';
  video.onloadedmetadata=()=>{if(Number.isFinite(video.duration)&&resume>0&&resume<video.duration-2)video.currentTime=resume;rate(speed);sync.align(true);if(autoplay)void video.play().catch(()=>status('点播放继续。'));};
  video.src=main.url;video.load();
  if(other){secondary.src=other.url;secondary.muted=true;secondary.load();sync.enable(true);}
  else{secondary.removeAttribute('src');secondary.load();}
  for(const id of['back','forward','fullscreen'])$(id).disabled=false;
  $('download').disabled=!downloadController&&(offlineMode||!('serviceWorker'in navigator));updateCaptions();
}
async function openRecording(record,preference='dual',resume=null){
  const generation=++mediaGeneration;clearMedia();selected=record;media=null;offlineMode=false;
  if(matchMedia('(max-width:800px)').matches)document.querySelector('.watch').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  $('now-title').textContent=record.courseName;$('now-date').textContent=record.begin;updateSelected();status('正在连接…');$('caption-toggle').textContent='字幕读取中';
  captionPromise=api(`/api/courses/${record.course}/recordings/${record.id}/captions`).then(data=>{
    if(generation===mediaGeneration)setCaptions(data.captions);return data.captions;
  }).catch(()=>{if(generation===mediaGeneration){setCaptions([]);$('caption-toggle').textContent='字幕读取失败';}return[];});
  try{
    const data=await api(`/api/courses/${record.course}/recordings/${record.id}/media`);if(generation!==mediaGeneration)return;
    media=data;configureLayouts(preference);applyLayout(resume??Number(safeRead(positionKey())));
    $('refresh-media').disabled=false;status('');
  }catch(error){if(generation===mediaGeneration){status(errorText(error));$('refresh-media').disabled=false;}}
}
$('layout').onchange=()=>applyLayout(video.currentTime,!video.paused);
$('refresh-media').onclick=()=>{if(selected&&!offlineMode)void openRecording(selected,$('layout').value,video.currentTime);};
function skip(seconds){if(Number.isFinite(video.duration))video.currentTime=Math.max(0,Math.min(video.duration,video.currentTime+seconds));}
$('back').onclick=()=>skip(-15);$('forward').onclick=()=>skip(15);
$('fullscreen').onclick=async()=>{
  try{if(currentViews.length>1&&$('stage').requestFullscreen){await $('stage').requestFullscreen();return;}if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();else if(video.requestFullscreen)await video.requestFullscreen();else status('请使用视频原生全屏按钮。');}
  catch{try{if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();else status('请使用视频原生全屏按钮。');}catch{status('请先点击播放。');}}
};
video.addEventListener('timeupdate',updateCaptions);
video.addEventListener('pause',savePosition);
video.addEventListener('waiting',()=>status('正在缓冲…'));
video.addEventListener('playing',()=>status(offlineMode?'离线播放':''));
video.addEventListener('error',()=>{if(video.getAttribute('src'))status(offlineMode?'离线文件不可用，请重新保存。':'视频加载失败，请点击重连。');});
video.addEventListener('ended',()=>{const key=positionKey();if(key)safeWrite(key,'0');status('播放完毕。');});
setInterval(()=>{sync.tick();updateCaptions();},250);setInterval(savePosition,10000);addEventListener('pagehide',savePosition);
document.addEventListener('visibilitychange',()=>{if(document.hidden)savePosition();});
$('courses').onchange=()=>void loadRecordings();$('reload').onclick=()=>void loadCourses();
function tab(offline){$('online-panel').hidden=offline;$('offline-panel').hidden=!offline;for(const[name,active]of[['online-tab',!offline],['offline-tab',offline]]){$(name).classList.toggle('active',active);$(name).setAttribute('aria-pressed',String(active));}if(offline)void refreshOffline();}
$('online-tab').onclick=()=>tab(false);$('offline-tab').onclick=()=>tab(true);
async function refreshOffline(){
  try{
    const files=await offlineStore.listAll(),groups=new Map();
    for(const file of files){const key=`${file.record.course}/${file.record.id}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(file);}
    $('offline-count').textContent=String([...groups.values()].filter(g=>g.some(f=>f.ready)).length);$('offline-list').replaceChildren();
    if(!files.length){const p=document.createElement('p');p.className='status';p.textContent='暂无离线回放。';$('offline-list').append(p);}
    for(const group of groups.values()){
      const file=group[0],ready=group.filter(f=>f.ready),item=document.createElement('div');item.className='offline-item';
      const b=lessonButton(file.record,file.record.course,file.record.courseName,()=>void playOffline(ready));b.disabled=!ready.length;
      b.querySelector('small').textContent=file.record.begin+' · '+(ready.length?ready.map(f=>f.label).join(' + ')+' · '+mb(ready.reduce((sum,f)=>sum+f.size,0)):'保存未完成');
      const remove=document.createElement('button');remove.className='remove';remove.textContent='移除';remove.disabled=Boolean(downloadController);
      remove.onclick=async()=>{if(confirm('移除这节课在本机保存的所有画面？')){try{for(const f of group)await offlineStore.remove(f.id);await refreshOffline();}catch(error){status(errorText(error));}}};item.append(b,remove);$('offline-list').append(item);
    }
  }catch{$('offline-list').textContent='无法访问离线存储。';}
}
async function ensureWorker(){
  if(!('serviceWorker'in navigator)||!isSecureContext)throw new Error('离线保存需要 HTTPS。');
  await navigator.serviceWorker.register('./sw.js');await navigator.serviceWorker.ready;
  if(!navigator.serviceWorker.controller)await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('请刷新页面后重试离线保存。')),5000);navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(timeout);resolve();},{once:true});});
}
async function playOffline(files){
  try{await ensureWorker();++mediaGeneration;clearMedia();selected=files[0].record;offlineMode=true;captionPromise=null;
    media={views:files.map(f=>({id:f.view,label:f.label,url:new URL('./offline/'+encodeURIComponent(f.id),location.href).href}))};
    $('now-title').textContent=selected.courseName;$('now-date').textContent=selected.begin;
    setCaptions(files.find(f=>f.captions?.length)?.captions||[]);configureLayouts();applyLayout(Number(safeRead(positionKey())));status('离线播放');updateSelected();
  }catch(error){status(errorText(error));}
}
$('download').onclick=async()=>{
  if(downloadController){downloadController.abort();return;}
  if(!selected||!currentViews.length||offlineMode)return;
  const record={...selected},views=currentViews.map(v=>({...v})),pendingCaptions=captionPromise;
  try{
    await ensureWorker();
    if(!confirm(`保存${views.length===2?' PPT 和教师两路':'当前'}画面及字幕？视频可能较大，请在 Wi-Fi 下保持页面打开。`))return;
    downloadController=new AbortController();$('download').textContent='取消保存';$('download-progress').hidden=false;
    const savedCaptions=await pendingCaptions||captions;await navigator.storage?.persist?.();let size=0;
    for(let index=0;index<views.length;index++){
      if(downloadController.signal.aborted)throw new DOMException('已取消','AbortError');
      const view=views[index],key=`${record.course}-${record.id}-${view.id}`,old=await offlineStore.get(key);
      if(old?.ready){size+=old.size;continue;}if(old)await offlineStore.remove(key);
      size+=await offlineStore.save({id:key,record,view:view.id,label:view.label,captions:savedCaptions},view.url,downloadController.signal,(written,total)=>{
        $('download-note').textContent=`${view.label}：${mb(written)}`+(total?` / ${mb(total)}`:'')+`（${index+1}/${views.length}）`;
        if(total)$('download-progress').value=(index+written/total)/views.length;else $('download-progress').removeAttribute('value');
      });
    }
    $('download-note').textContent='已保存 '+mb(size)+'。';
  }catch(error){$('download-note').textContent=error.name==='QuotaExceededError'?'浏览器空间不足，请移除一些离线视频。':errorText(error);}
  finally{downloadController=null;$('download').textContent='保存离线';$('download').disabled=!currentViews.length||offlineMode;$('download-progress').hidden=true;await refreshOffline();}
};
void refreshOffline();if('serviceWorker'in navigator&&isSecureContext)void ensureWorker().catch(()=>{});
if(!navigator.onLine){tab(true);$('list-status').textContent='当前离线。';$('courses').replaceChildren(new Option('网络恢复后刷新',''));}
else if(endpoint)void loadCourses();else{$('list-status').textContent='课程服务尚未上线。';$('courses').replaceChildren(new Option('等待上线',''));}
