import { html, useState } from '../vendor/preact-htm.js';
import { useBoard } from './ctx.js';
import { Md } from './ui.js';
import { Pill, ItemForm } from './Item.js?v=personal-focus-20261108';
import { TaskAdd } from './TaskAdd.js';
import { focusLists, filterTasks, itemLocation } from '../lib/focus.js';
import { dueInfo } from '../lib/due.js';

export function Focus() {
  const { doc, ui, setUi, setPop } = useBoard();
  const [mode, setMode] = useState('focus'), [status, setStatus] = useState('all');
  const [date, setDate] = useState('all'), [query, setQuery] = useState('');
  const lists = focusLists(doc), filtered = filterTasks(doc, { status, date, query });
  const stats = doc.theme?.showStats !== false;
  const editing = !!ui.editing?.endsWith('@focus');
  const switchTo = (next, nextStatus = 'all', nextDate = 'all') => {
    if ((ui.editing || ui.adding) && !confirm('有还没保存的内容，确定切换？')) return;
    setUi({ editing: null, adding: null }); setPop(null);
    setMode(next); setStatus(nextStatus); setDate(nextDate); setQuery('');
  };
  const panel = (title, items, kind) => html`<section class="card focus-panel">
    <div class="focus-panel-head"><h2>${title} ${stats ? html`<span>${items.length}</span>` : null}</h2>${kind === 'due' ? html`<span>未来 7 天，含已逾期</span>` : null}</div>
    ${items.slice(0, 5).map(item => html`<${FocusRow} key=${item.id} item=${item} />`)}
    ${!items.length ? html`<p class="focus-empty">${kind === 'doing' ? '还没有标记为正在做的任务。' : '近期没有其他待截止任务。'}</p>` : null}
    ${items.length > 5 ? html`<button class="focus-more" onClick=${() => switchTo('all', kind === 'doing' ? 'doing' : 'all', kind === 'due' ? 'upcoming' : 'all')}>查看${kind === 'doing' ? '全部正在做' : '全部近期截止'} →</button>` : null}
  </section>`;
  return html`<section class="focus-page" aria-label="任务总览">
    <div class="focus-intro"><h1>总览</h1><p>先看眼前要做的，也别漏下后面的。</p></div>
    <div class="focus-toolbar"><div class="focus-tabs" role="group" aria-label="待办视图">
      <button class="tbtn" aria-pressed=${mode === 'focus'} onClick=${() => switchTo('focus')}>当前重点</button>
      <button class="tbtn" aria-pressed=${mode === 'all'} onClick=${() => switchTo('all')}>全部待办 ${stats ? html`<span>${lists.all.length}</span>` : null}</button>
    </div><button class="btn dark" onClick=${() => { if (ui.editing && !confirm('有还没保存的内容，确定添加新任务？')) return; setUi({ adding: 'focus-task', editing: null }); setPop(null); }}>＋ 新任务</button></div>
    <${TaskAdd} id="focus-task" keep=${false} showClosed=${false} panel />
    ${mode === 'focus' ? html`<div class="focus-grid">${panel('正在做', lists.doing, 'doing')}${panel('近期截止', lists.deadlines, 'due')}</div>
      <div class="focus-summary">${stats ? html`<span>共 ${lists.all.length} 项待办</span>` : null}<button class="tbtn" onClick=${() => switchTo('all', 'all', 'undated')}>${stats ? lists.undated.length + ' 项' : ''}未定截止日期 →</button></div>`
      : html`<div class="focus-filters">
        <input class="input" type="search" aria-label="搜索全部待办" placeholder="搜索任务、卡片或课程" value=${query} disabled=${editing} onInput=${e => setQuery(e.target.value)} />
        <select class="input" aria-label="筛选任务状态" value=${status} disabled=${editing} onChange=${e => setStatus(e.target.value)}>
          <option value="all">全部状态</option><option value="doing">正在做</option><option value="todo">还没做</option><option value="waiting">等别人</option><option value="agent">Agent 在做</option>
        </select><select class="input" aria-label="筛选截止时间" value=${date} disabled=${editing} onChange=${e => setDate(e.target.value)}>
          <option value="all">全部日期</option><option value="overdue">已逾期</option><option value="upcoming">未来 7 天及逾期</option><option value="undated">未定日期</option>
        </select>
      </div><div class="card focus-all"><div class="focus-result">${stats ? filtered.length + ' 项待办 · ' : ''}按截止时间排列</div>
        ${filtered.map(item => html`<${FocusRow} key=${item.id} item=${item} detail />`)}
        ${!filtered.length ? html`<p class="focus-empty">没有符合条件的待办。</p>` : null}
      </div>`}
  </section>`;
}

function FocusRow({ item, detail = false }) {
  const { doc, ui, setUi, setPop, openPop } = useBoard();
  if (ui.editing === `i:${item.id}@focus`) return html`<div class="focus-row-editor"><${ItemForm} item=${item} /></div>`;
  const due = dueInfo(item.due);
  return html`<div class="focus-row" data-focus-id=${item.id}>
    <${Pill} item=${item} from="focus" />
    <div class="focus-row-body"><div class="focus-title"><${Md} text=${item.title} /></div>
      <div class="focus-location">${itemLocation(doc, item)}</div>
      ${detail && item.note ? html`<div class="focus-note"><${Md} text=${item.note} /></div>` : null}
      <button class=${`focus-due ${due?.over ? 'overdue' : ''}`} data-pop-anchor title="修改截止日期"
        onClick=${e => openPop('picker', item.id, e.currentTarget, { from: 'focus' })}>${due ? `${due.date} · ${due.rel}` : item.due || '设置截止日期'}</button>
    </div><button class="tool focus-edit" title=${`编辑：${item.title}`} aria-label=${`编辑：${item.title}`}
      onClick=${() => { setPop(null); setUi({ editing: `i:${item.id}@focus`, adding: null }); }}>✎</button>
  </div>`;
}
