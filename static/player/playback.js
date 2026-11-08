/* Media coordination is separate from page rendering so seek/rate/buffer behavior is testable. */
(() => {
  class DualPlayback {
    constructor(primary,secondary,notify=()=>{}) {
      this.primary=primary;this.secondary=secondary;this.notify=notify;this.active=false;this.desired=false;this.held=false;
      primary.addEventListener('play',()=>{this.desired=true;if(this.active){this.align(true);this.startSecondary();}});
      primary.addEventListener('pause',()=>{if(!this.held)this.desired=false;secondary.pause();});
      primary.addEventListener('ended',()=>{this.desired=false;this.held=false;secondary.pause();});
      primary.addEventListener('seeking',()=>this.align(true));
      primary.addEventListener('seeked',()=>{this.align(true);this.resume();});
      primary.addEventListener('ratechange',()=>{secondary.playbackRate=primary.playbackRate;});
      primary.addEventListener('waiting',()=>{if(this.active)secondary.pause();});
      primary.addEventListener('playing',()=>{if(this.active){this.align(true);this.startSecondary();}});
      secondary.addEventListener('waiting',()=>{
        if(this.active&&this.desired&&!primary.paused&&!this.atSecondaryEnd()){
          this.held=true;primary.pause();secondary.pause();this.notify('教师画面正在缓冲，两路画面会一起继续。');
        }
      });
      for(const element of [primary,secondary])element.addEventListener('canplay',()=>this.resume());
      secondary.addEventListener('loadedmetadata',()=>{this.align(true);if(this.desired)this.startSecondary();});
      secondary.addEventListener('error',()=>{if(this.active){this.active=false;this.held=false;secondary.pause();if(this.desired)void primary.play().catch(()=>{});this.notify('教师画面加载失败，可重连或暂时只看 PPT。');}});
      secondary.muted=true;
    }
    enable(value) {this.active=value;this.held=false;this.desired=!this.primary.paused;if(!value)this.secondary.pause();else{this.align(true);if(this.desired)this.startSecondary();}}
    atSecondaryEnd(){return Number.isFinite(this.secondary.duration)&&this.primary.currentTime>=this.secondary.duration-.15;}
    align(force=false){
      if(!this.active||this.secondary.readyState<1)return;
      const end=Number.isFinite(this.secondary.duration)?Math.max(0,this.secondary.duration-.05):Infinity;
      const target=Math.min(this.primary.currentTime,end);
      if(force||Math.abs(this.secondary.currentTime-target)>.25){try{this.secondary.currentTime=target;}catch{}}
      this.secondary.playbackRate=this.primary.playbackRate;this.secondary.muted=true;
    }
    startSecondary(){
      if(!this.active||!this.desired||this.held||this.primary.paused||this.primary.readyState<3||this.atSecondaryEnd())return;
      void this.secondary.play().catch(error=>{if(error.name!=='AbortError')this.notify('请再次点击播放，以启动教师画面。');});
    }
    resume(){
      if(!this.active||!this.desired)return;
      if(this.held&&this.primary.readyState>=3&&this.secondary.readyState>=3){
        this.held=false;this.align(true);void this.primary.play().catch(()=>{this.desired=false;this.notify('点播放继续。');});this.startSecondary();
      }else if(!this.primary.paused&&!this.primary.seeking)this.startSecondary();
    }
    tick(){if(!this.active||this.primary.seeking)return;this.align();if(!this.primary.paused&&this.secondary.paused&&!this.held)this.startSecondary();}
  }
  function captionAt(cues,time){return cues.filter(c=>c.start<=time&&time<c.end).map(c=>c.text).join('\n');}
  function vttTime(seconds){const ms=Math.max(0,Math.round(seconds*1000));return`${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;}
  function captionsVtt(cues){return 'WEBVTT\n\n'+cues.map((c,i)=>`${i+1}\n${vttTime(c.start)} --> ${vttTime(c.end)}\n${c.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/[\r\n]+/g,' ')}\n`).join('\n');}
  globalThis.coursePlayback={DualPlayback,captionAt,captionsVtt};
})();
