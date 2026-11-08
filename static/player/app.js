'use strict';
const $=id=>document.getElementById(id),video=$('video'),secondary=$('secondary');
const local=['localhost','127.0.0.1'].includes(location.hostname);
const endpoint=local?location.origin:window.COURSE_PLAYER_API||'';
const safeRead=(key,fallback='')=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
const safeWrite=(key,value)=>{try{localStorage.setItem(key,value);}catch{}};
try{localStorage.removeItem('player.key');sessionStorage.removeItem('player.key');}catch{}
// Transient buffering must never add a row or resize the fullscreen video.
const status=text=>$('player-status').textContent=text.includes('缓冲')?'':text;
const sync=new coursePlayback.DualPlayback(video,secondary,status);
let selected=null,media=null,currentViews=[],courses=[],offlineMode=false;
let courseGeneration=0,mediaGeneration=0,downloadController=null,captionUrl=null,captionPromise=null;
let captions=[],captionsEnabled=safeRead('player.captions','on')==='on';
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
  const text=coursePlayback.captionAt(captions,video.currentTime);
  $('caption-line').hidden=!captionsEnabled||!text;
  $('caption-line').textContent=text;
  $('caption-toggle').setAttribute('aria-pressed',String(captionsEnabled));
  for(const track of video.textTracks)track.mode='hidden';
}
function setCaptions(value){
  captions=coursePlayback.prepareCaptions(value);video.querySelectorAll('track').forEach(t=>t.remove());
  if(captionUrl){URL.revokeObjectURL(captionUrl);captionUrl=null;}
  $('caption-toggle').disabled=!captions.length;$('caption-toggle').textContent=captions.length?'字幕':'暂无字幕';
  if(captions.length){captionUrl=URL.createObjectURL(new Blob([coursePlayback.captionsVtt(captions)],{type:'text/vtt'}));const track=document.createElement('track');track.kind='subtitles';track.label='中文字幕';track.srclang='zh';track.src=captionUrl;track.default=true;track.onload=updateCaptions;video.append(track);}
  updateCaptions();
}
$('caption-toggle').onclick=()=>{captionsEnabled=!captionsEnabled;safeWrite('player.captions',captionsEnabled?'on':'off');updateCaptions();};
$('caption-size').value=safeRead('player.captionSize','normal');
if(!$('caption-size').value)$('caption-size').value='normal';
function captionSize(){ $('stage').dataset.captions=$('caption-size').value;safeWrite('player.captionSize',$('caption-size').value); }
$('caption-size').onchange=captionSize;captionSize();
function clearMedia(){
  savePosition();sync.enable(false);
  for(const element of[video,secondary]){element.pause();element.onloadedmetadata=null;element.removeAttribute('src');element.load();}
  currentViews=[];$('primary-panel').hidden=false;$('secondary-panel').hidden=true;$('stage').dataset.mode='single';$('stage').dataset.main='primary';floatingWindow.refresh();
  for(const id of['play','seek','swap','back','forward','fullscreen','refresh-media','layout'])$(id).disabled=true;
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
  if(ppt&&teacher){$('layout').append(new Option('教师＋PPT小窗','dual'));$('layout').append(new Option('PPT＋教师小窗','ppt-main'));}
  for(const v of media.views)$('layout').append(new Option(v.label,v.id));
  $('layout').disabled=false;
  if([...$('layout').options].some(o=>o.value===preference))$('layout').value=preference;
}
function applyLayout(resume=video.currentTime,autoplay=false){
  const choice=$('layout').value,dual=choice==='dual'||choice==='ppt-main';
  const teacher=media.views.find(v=>v.id==='1')||media.views.find(v=>v.id==='2'),ppt=media.views.find(v=>v.id==='5');
  // Keep both sources and the audio clock stable when swapping or hiding a view.
  const views=teacher&&ppt&&(dual||choice===teacher.id||choice===ppt.id)?[teacher,ppt]:media.views.filter(v=>v.id===choice);
  const [main,other]=views;if(!main)return;
  const changed=views.length!==currentViews.length||views.some((v,i)=>v.url!==currentViews[i]?.url);
  const secondaryMain=choice==='ppt-main'||(!dual&&choice===other?.id);
  $('stage').dataset.mode=dual?'dual':'single';$('stage').dataset.main=secondaryMain?'secondary':'primary';
  $('primary-panel').hidden=!dual&&secondaryMain;$('secondary-panel').hidden=!other||(!dual&&!secondaryMain);
  floatingWindow.refresh();
  $('swap').disabled=!dual;$('swap').hidden=!dual;
  $('primary-label').textContent=main.label;$('secondary-label').textContent=other?.label||'';
  if(changed){
    savePosition();sync.enable(false);video.pause();secondary.pause();currentViews=views;
    video.onloadedmetadata=()=>{if(Number.isFinite(video.duration)&&resume>0&&resume<video.duration-2)video.currentTime=resume;rate(speed);if(autoplay)void video.play().catch(()=>status('点播放继续。'));};
    video.src=main.url;video.load();
    if(other){secondary.src=other.url;secondary.muted=true;secondary.load();}else{secondary.removeAttribute('src');secondary.load();}
  }
  const auxiliary=Boolean(other&&(dual||secondaryMain));if(sync.active!==auxiliary)sync.enable(auxiliary);
  for(const id of['play','seek','back','forward','fullscreen'])$(id).disabled=false;
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
$('swap').onclick=()=>{$('layout').value=$('layout').value==='dual'?'ppt-main':'dual';applyLayout();};
for(const panel of['primary-panel','secondary-panel'])$(panel).onclick=event=>{if(event.target.closest('.pip-resize')||floatingWindow.isInset($(panel)))return;$('play').click();};
const floatingWindow=(()=>{
  const stage=$('stage'),panels=[$('primary-panel'),$('secondary-panel')],ratio=16/9,margin=8;
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  let state={x:1,y:.72,w:.36},gesture=null,suppressUntil=0;
  try{const saved=JSON.parse(safeRead('player.inset','null'));if(saved&&['x','y','w'].every(k=>Number.isFinite(saved[k])))state={x:clamp(saved.x,0,1),y:clamp(saved.y,0,1),w:clamp(saved.w,.15,.8)};}catch{}
  function isInset(panel){return stage.dataset.mode==='dual'&&stage.dataset.main!==panel.id.split('-')[0];}
  function bounds(){const {width,height}=stage.getBoundingClientRect();const max=Math.max(1,Math.min(width*.8,width-2*margin,(height-2*margin)*ratio));return{width,height,min:Math.min(112,max),max};}
  function box(){const b=bounds(),width=clamp(state.w*b.width,b.min,b.max),height=width/ratio;return{...b,w:width,h:height,left:margin+state.x*Math.max(0,b.width-width-2*margin),top:margin+state.y*Math.max(0,b.height-height-2*margin)};}
  function render(){const b=box();stage.style.setProperty('--pip-left',b.left+'px');stage.style.setProperty('--pip-top',b.top+'px');stage.style.setProperty('--pip-width',b.w+'px');}
  function place(left,top,width){const b=bounds(),w=clamp(width,b.min,b.max),dx=b.width-w-2*margin,dy=b.height-w/ratio-2*margin;state={w:w/Math.max(1,b.width),x:dx>0?clamp((left-margin)/dx,0,1):0,y:dy>0?clamp((top-margin)/dy,0,1):0};render();}
  function save(){safeWrite('player.inset',JSON.stringify(state));}
  function refresh(){for(const panel of panels){const inset=isInset(panel);panel.classList.toggle('is-inset',inset);panel.querySelector('.pip-resize').hidden=!inset;}render();}
  function finish(event,cancel=false){
    if(!gesture||gesture.id!==event.pointerId)return;
    const ended=gesture;gesture=null;suppressUntil=performance.now()+500;ended.panel.classList.remove('pip-moving');
    if(ended.panel.hasPointerCapture(event.pointerId))ended.panel.releasePointerCapture(event.pointerId);
    if(cancel){state=ended.state;render();return;}
    save();if(!ended.moved&&!ended.resize)$('swap').click();
  }
  for(const panel of panels){
    panel.addEventListener('click',event=>{if(performance.now()<suppressUntil||event.target.closest('.pip-resize')){event.preventDefault();event.stopImmediatePropagation();}},true);
    const handle=document.createElement('button');handle.className='pip-resize';handle.type='button';handle.setAttribute('aria-label','缩放小窗');handle.title='拖动缩放小窗';handle.hidden=true;panel.append(handle);
    handle.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();const b=box();place(b.left,b.top,b.w+(['ArrowRight','ArrowDown'].includes(event.key)?16:-16));save();});
    panel.addEventListener('pointerdown',event=>{
      if(!isInset(panel)||!event.isPrimary||event.button!==0||gesture)return;
      event.preventDefault();gesture={id:event.pointerId,panel,x:event.clientX,y:event.clientY,box:box(),state:{...state},resize:Boolean(event.target.closest('.pip-resize')),moved:false};
      panel.setPointerCapture(event.pointerId);panel.classList.add('pip-moving');
    });
    panel.addEventListener('pointermove',event=>{
      if(!gesture||gesture.id!==event.pointerId)return;event.preventDefault();
      const g=gesture,dx=event.clientX-g.x,dy=event.clientY-g.y;
      if(!g.moved&&Math.hypot(dx,dy)<5)return;g.moved=true;
      if(g.resize)place(g.box.left,g.box.top,g.box.w+(Math.abs(dx)>Math.abs(dy*ratio)?dx:dy*ratio));
      else place(g.box.left+dx,g.box.top+dy,g.box.w);
    });
    panel.addEventListener('pointerup',event=>finish(event));
    panel.addEventListener('pointercancel',event=>finish(event,true));
    panel.addEventListener('lostpointercapture',event=>finish(event,true));
  }
  new ResizeObserver(()=>{if(gesture){state=gesture.state;gesture.panel.classList.remove('pip-moving');gesture=null;}render();}).observe(stage);
  render();return{refresh,isInset};
})();
$('refresh-media').onclick=()=>{if(selected&&!offlineMode)void openRecording(selected,$('layout').value,video.currentTime);};
function skip(seconds){if(Number.isFinite(video.duration))video.currentTime=Math.max(0,Math.min(video.duration,video.currentTime+seconds));}
$('back').onclick=()=>skip(-15);$('forward').onclick=()=>skip(15);
function fullscreenState(){const active=document.fullscreenElement===$('player')||$('player').classList.contains('viewport-fullscreen');$('fullscreen').textContent=active?'退出全屏':'全屏';document.body.classList.toggle('player-expanded',active);}
async function exitFullscreen(){if(document.fullscreenElement=== $('player'))await document.exitFullscreen();$('player').classList.remove('viewport-fullscreen');fullscreenState();}
$('fullscreen').onclick=async()=>{
  if(document.fullscreenElement===$('player')||$('player').classList.contains('viewport-fullscreen')){await exitFullscreen();return;}
  // iPhone's native video fullscreen drops the other video and all page controls.
  // Expand the entire player in the viewport when element fullscreen is absent.
  $('player').classList.add('viewport-fullscreen');fullscreenState();
  try{if($('player').requestFullscreen)await $('player').requestFullscreen();}catch{}
};
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement)$('player').classList.remove('viewport-fullscreen');fullscreenState();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')void exitFullscreen();});
$('play').onclick=()=>{if(video.paused)void video.play().catch(()=>status('暂时无法播放，请重连后再试。'));else video.pause();};
let scrubbing=false;
$('seek').oninput=()=>{scrubbing=true;$('clock').textContent=time(Number($('seek').value))+' / '+time(video.duration);};
$('seek').onchange=()=>{video.currentTime=Number($('seek').value);scrubbing=false;updateTransport();};
function updateTransport(){
  $('play').textContent=video.paused?'播放':'暂停';$('play').setAttribute('aria-label',video.paused?'播放':'暂停');
  if(!scrubbing){$('seek').max=Number.isFinite(video.duration)?video.duration:100;$('seek').value=video.currentTime||0;$('clock').textContent=time(video.currentTime)+' / '+time(video.duration);}
}
for(const event of['play','pause','timeupdate','durationchange','emptied','ended'])video.addEventListener(event,updateTransport);
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
