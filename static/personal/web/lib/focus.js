import { OPEN, cardPath, groupOf } from './model.js';
import { dueInfo } from './due.js';
import { repeatState } from './repeat.js';

const dueAt = item => dueInfo(item.due)?.at.getTime() ?? Infinity;
const rank = { doing: 0, todo: 1, waiting: 2, agent: 3 };
const compare = (a, b) => {
  const ad = dueAt(a), bd = dueAt(b);
  return (ad === bd ? 0 : ad < bd ? -1 : 1) || rank[a.status] - rank[b.status]
    || (a.order ?? 0) - (b.order ?? 0) || a.id.localeCompare(b.id);
};
export const itemLocation = (doc, item) => {
  const group = groupOf(doc, item.group);
  return group ? cardPath(doc, group) : '未分组';
};
export function focusLists(doc, now = new Date()) {
  const all = doc.items.filter(item => OPEN.includes(item.status)).sort(compare);
  const active = all.filter(item => {
    const repeat = repeatState(item, now);
    return !repeat || (repeat.scheduled && !repeat.done);
  });
  const horizon = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59, 999).getTime();
  const doing = active.filter(item => item.status === 'doing');
  const upcoming = active.filter(item => dueAt(item) <= horizon);
  return { all, doing, upcoming, deadlines: upcoming.filter(item => item.status !== 'doing'),
    undated: all.filter(item => !dueInfo(item.due)), horizon };
}
export function filterTasks(doc, { status = 'all', date = 'all', query = '' } = {}, now = new Date()) {
  const { all, horizon } = focusLists(doc, now), q = query.trim().toLocaleLowerCase();
  return all.filter(item => {
    if (status !== 'all' && item.status !== status) return false;
    const at = dueAt(item);
    if (date === 'overdue' && !(at < now.getTime())) return false;
    if (date === 'upcoming' && !(at <= horizon)) return false;
    if (date === 'undated' && at !== Infinity) return false;
    return !q || [item.title, item.note, itemLocation(doc, item), item.course, item.source?.course]
      .filter(Boolean).join(' ').toLocaleLowerCase().includes(q);
  });
}
