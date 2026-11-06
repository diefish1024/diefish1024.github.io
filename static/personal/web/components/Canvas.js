import {html,useState} from '../vendor/preact-htm.js';
import {useBoard} from './ctx.js';
import {ago} from '../lib/time.js';
import {allCards,cardPath} from '../lib/model.js';
export function CanvasSide(){
 const {doc,reload,toast}=useBoard(),[busy,setBusy]=useState(false),sync=doc.canvasSync||{};
 const refresh=async()=>{setBusy(true);await reload(true);setBusy(false)};
 return html`<div class="csync"><button class="csync-btn" disabled=${busy} onClick=${refresh}>↻ ${busy?'刷新中':'刷新清单'}</button><div class="csync-st">Canvas 每 3 小时自动更新${sync.succeeded_at?html`<div>${ago(sync.succeeded_at)}同步</div>`:null}${sync.error?html`<div class="warn">${sync.error}</div>`:null}</div></div>`;
}
export function CanvasSettings(){
 const {doc,act}=useBoard(),cards=allCards(doc);
 return html`<h4>Canvas</h4><div class="field"><span>作业放在</span><select class="input" value=${doc.settings.canvasGroup||''} onChange=${e=>act.settings({canvasGroup:e.target.value})}><option value="">自动（课程）</option>${cards.map(g=>html`<option value=${g.id}>${cardPath(doc,g)}</option>`)}</select></div><${CanvasSide} />`;
}
