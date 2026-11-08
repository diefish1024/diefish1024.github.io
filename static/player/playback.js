/* The audible video owns the clock. A slow auxiliary view never controls it. */
(() => {
  class DualPlayback {
    constructor(primary,secondary,notify=()=>{},now=()=>performance.now()) {
      Object.assign(this,{primary,secondary,notify,now,active:false,waiting:false,pending:false,blocked:false,lastSeek:-Infinity});
      primary.addEventListener('play',()=>{this.blocked=false;this.startSecondary();});
      primary.addEventListener('pause',()=>secondary.pause());
      primary.addEventListener('ended',()=>secondary.pause());
      primary.addEventListener('seeking',()=>this.align(true));
      primary.addEventListener('seeked',()=>this.tick());
      primary.addEventListener('ratechange',()=>{secondary.playbackRate=primary.playbackRate;});
      primary.addEventListener('waiting',()=>{this.waiting=true;secondary.pause();});
      primary.addEventListener('playing',()=>{this.waiting=false;this.tick();});
      secondary.addEventListener('waiting',()=>{if(this.active&&!primary.paused)this.notify('小窗正在缓冲，声音继续播放。');});
      secondary.addEventListener('canplay',()=>this.tick());
      secondary.addEventListener('playing',()=>{if(this.active)this.notify('');});
      secondary.addEventListener('loadedmetadata',()=>{this.align(true);this.startSecondary();});
      secondary.addEventListener('error',()=>{if(this.active){this.active=false;secondary.pause();this.notify('另一画面加载失败，可点击重连。');}});
      secondary.muted=true;
    }
    enable(value){this.active=value;this.waiting=false;this.blocked=false;this.lastSeek=-Infinity;if(!value)this.secondary.pause();else{this.align(true);this.startSecondary();}}
    atSecondaryEnd(){return Number.isFinite(this.secondary.duration)&&this.primary.currentTime>=this.secondary.duration-.15;}
    align(force=false){
      const p=this.primary,s=this.secondary;
      if(!this.active||s.readyState<1||(!force&&(p.seeking||s.seeking||s.readyState<3||this.waiting)))return;
      const target=Math.min(p.currentTime,Number.isFinite(s.duration)?Math.max(0,s.duration-.05):Infinity),drift=target-s.currentTime;
      // Let a slow request finish; never seek on every playing/canplay event.
      const headroom=Math.min(target+p.playbackRate*1.5,Number.isFinite(s.duration)?s.duration:Infinity);
      const cached=Array.from({length:s.buffered.length},(_,i)=>[s.buffered.start(i),s.buffered.end(i)]).some(([start,end])=>start<=target&&end>=headroom);
      if(Math.abs(drift)>(force?.1:1.5)&&(force||(cached&&this.now()-this.lastSeek>=2500))){
        this.lastSeek=this.now();try{s.currentTime=target;}catch{}
      }
      s.playbackRate=p.playbackRate*(!force&&Math.abs(drift)>.15&&Math.abs(drift)<=1.5?(drift>0?1.05:.95):1);
      s.muted=true;
    }
    startSecondary(){
      const p=this.primary,s=this.secondary;
      if(!this.active||this.waiting||this.pending||this.blocked||p.paused||p.seeking||p.readyState<3||!s.paused||this.atSecondaryEnd())return;
      this.pending=true;
      Promise.resolve(s.play()).then(()=>{if(!this.active||p.paused||this.waiting)s.pause();}).catch(error=>{
        if(error.name!=='AbortError'){this.blocked=true;this.notify('另一画面未启动，请暂停后再播放。');}
      }).finally(()=>{this.pending=false;});
    }
    tick(){if(!this.active||this.primary.seeking)return;if(this.atSecondaryEnd()){this.secondary.pause();return;}this.align();this.startSecondary();}
  }
  // Older offline saves have paragraphs; live cues use original school timestamps.
  function prepareCaptions(cues){
    return (cues||[]).flatMap(c=>{
      const chars=Array.from(String(c.text||'').trim());if(!chars.length||!(c.end>c.start))return[];
      const parts=[];let offset=0;
      while(offset<chars.length){let length=Math.min(40,chars.length-offset);
        if(length===40){for(let j=length-1;j>=20;j--)if(/[，。！？；,.!?;\s]/.test(chars[offset+j])){length=j+1;break;}}
        parts.push({start:c.start+(c.end-c.start)*offset/chars.length,end:c.start+(c.end-c.start)*(offset+length)/chars.length,text:chars.slice(offset,offset+length).join('')});offset+=length;
      }return parts;
    }).sort((a,b)=>a.start-b.start);
  }
  function captionAt(cues,time){let found='';for(const cue of cues){if(cue.start>time)break;if(time<cue.end)found=cue.text;}return found;}
  function vttTime(seconds){const ms=Math.max(0,Math.round(seconds*1000));return`${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;}
  function captionsVtt(cues){return 'WEBVTT\n\n'+cues.map((c,i)=>`${i+1}\n${vttTime(c.start)} --> ${vttTime(c.end)}\n${c.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/[\r\n]+/g,' ')}\n`).join('\n');}
  globalThis.coursePlayback={DualPlayback,captionAt,captionsVtt,prepareCaptions};
})();
