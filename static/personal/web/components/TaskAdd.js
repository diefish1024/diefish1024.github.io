import { html, useState, useRef, useEffect } from '../vendor/preact-htm.js';
import { useBoard } from './ctx.js';
import { allCards, cardPath } from '../lib/model.js';
import { CalIcon } from './icons.js';

export function TaskAdd({ id, group, course, label = '＋ 添加', keep = true, showClosed = true, panel = false }) {
  const { doc, ui, setUi, call, openPop, setPop } = useBoard();
  const [title, setTitle] = useState(''), [due, setDue] = useState('');
  const [target, setTarget] = useState(''), [saving, setSaving] = useState(false);
  const input = useRef(null), active = ui.adding === id, cards = allCards(doc);
  const chosen = group || (cards.some(g => g.id === target) ? target : cards[0]?.id);
  useEffect(() => { if (active) input.current?.focus(); }, [active]);
  const cancel = () => { setTitle(''); setDue(''); setPop(null); setUi({ adding: null }); };
  const submit = async e => {
    e.preventDefault();
    if (saving || !title.trim() || !chosen) return;
    setSaving(true);
    if (await call('POST', '/api/items', { title: title.trim(), due: due.trim(), group: chosen, ...(course ? { course } : {}) }, '已加入待办')) {
      setTitle(''); setDue('');
      if (keep) requestAnimationFrame(() => input.current?.focus()); else setUi({ adding: null });
    }
    setSaving(false);
  };
  if (!active) return showClosed ? html`<div class="add"><button class="addlink" onClick=${() => setUi({ adding: id, editing: null })}>${label}</button></div>` : null;
  return html`<form class=${`task-add ${panel ? 'card' : ''}`} onSubmit=${submit}>
    <input class="input" ref=${input} aria-label="任务名称" placeholder="要做的事" value=${title} disabled=${saving}
      onInput=${e => setTitle(e.target.value)} onKeyDown=${e => { if (e.key === 'Enter' && e.isComposing) e.preventDefault(); }} />
    <div class="task-add-fields">
      ${!group ? html`<select class="input" aria-label="任务所属卡片" value=${chosen || ''} disabled=${saving} onChange=${e => setTarget(e.target.value)}>
        ${cards.map(g => html`<option value=${g.id}>${cardPath(doc, g)}</option>`)}
      </select>` : null}
      <div class="duewrap"><input class="input" aria-label="新任务截止日期" placeholder="截止日期（可选）" value=${due} disabled=${saving} onInput=${e => setDue(e.target.value)} />
        <button type="button" class="duebtn" title="选择新任务截止日期" aria-label="选择新任务截止日期" data-pop-anchor disabled=${saving}
          onClick=${e => openPop('picker', undefined, e.currentTarget.closest('.duewrap'), { value: due, onPick: setDue })}><${CalIcon} /></button>
      </div>
    </div>
    ${!chosen ? html`<div class="sub">先在下方添加一张任务卡片。</div>` : null}
    <div class="task-add-actions"><button type="button" class="btn" disabled=${saving} onClick=${cancel}>取消</button>
      <button class="btn dark" disabled=${saving || !title.trim() || !chosen}>${saving ? '添加中' : '添加任务'}</button></div>
  </form>`;
}
