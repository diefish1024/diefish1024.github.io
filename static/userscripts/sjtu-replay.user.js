// ==UserScript==
// @name         交大回放：三倍速与字幕
// @namespace    personal.sjtu.replay
// @version      1.3.0
// @updateURL    https://diefish1024.github.io/userscripts/sjtu-replay.meta.js
// @downloadURL  https://diefish1024.github.io/userscripts/sjtu-replay.user.js
// @description  三倍速、逐句字幕、平滑音频同步、紧凑工具条、横屏专注与系统全屏。
// @match        https://v.sjtu.edu.cn/*
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // School API and millisecond timestamps verified against the school's player.
  // Authentication stays in memory and is sent only to this same-origin API.
  const BASE = '/jy-application-resourcemanage';
  const UPDATE_BASE = 'https://diefish1024.github.io/userscripts/';
  const VERSION = '1.3.0';
  const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3];
  function seekTarget(current, delta, duration) {
    return Math.max(0, Math.min(Number.isFinite(duration) ? Math.max(0, duration - 0.05) : Infinity, (Number.isFinite(current) ? current : 0) + delta));
  }
  function constrainBox(x, y, width, height, view) {
    return { x: Math.max(view.left + 8, Math.min(x, view.left + Math.max(8, view.width - width - 8))),
      y: Math.max(view.top + 8, Math.min(y, view.top + Math.max(8, view.height - height - 8))) };
  }
  function shortCues(row, limit = 28) {
    const chars = Array.from(row.text), chunks = [];
    let at = 0;
    while (at < chars.length) {
      let end = Math.min(chars.length, at + limit);
      if (end < chars.length) {
        for (let i = end - 1; i >= at + Math.floor(limit / 2); i--) {
          if (/[，。！？；、,.!?;\s]/u.test(chars[i])) { end = i + 1; break; }
        }
      }
      const text = chars.slice(at, end).join('').trim();
      if (text) chunks.push({ start: row.start + (row.end - row.start) * at / chars.length,
        end: row.start + (row.end - row.start) * end / chars.length, text });
      at = end;
    }
    return chunks;
  }
  function normalize(payload) {
    const data = payload?.data ?? payload;
    // beforeAssemblyList has actual short utterance timestamps; afterAssemblyList
    // merges them into long paragraphs and must only be a fallback.
    const rows = data?.beforeAssemblyList?.length ? data.beforeAssemblyList : data?.afterAssemblyList;
    if (!Array.isArray(rows)) return [];
    return rows.filter(r => r && Number.isFinite(r.bg) && Number.isFinite(r.ed) && r.bg >= 0 && r.ed > r.bg)
      .map(r => ({ start: r.bg / 1000, end: r.ed / 1000, text: typeof (r.res || r.zh) === 'string' ? (r.res || r.zh).trim() : '' }))
      .filter(r => r.text).flatMap(r => shortCues(r)).sort((a, b) => a.start - b.start || a.end - b.end);
  }
  function pictureBounds(rect, width, height, fit = 'contain') {
    if (!width || !height || !['contain', 'scale-down'].includes(fit)) return rect;
    let scale = Math.min(rect.width / width, rect.height / height);
    if (fit === 'scale-down') scale = Math.min(1, scale);
    const w = width * scale, h = height * scale;
    const top = rect.top + (rect.height - h) / 2;
    return { left: rect.left + (rect.width - w) / 2, top, bottom: top + h, width: w, height: h };
  }
  function captionLayout(pictures, viewport, size, placement = 'auto') {
    const { top, left, width, height } = viewport;
    const boxHeight = size * 1.45 * 2 + 12;
    const upper = top + 72, lower = Math.max(upper, top + height - 88 - boxHeight);
    let y = lower;
    if (placement === 'top') y = upper;
    if (placement === 'auto' && pictures.length) {
      const bottom = Math.max(...pictures.map(r => r.bottom));
      // Prefer spare space below the actual image, including object-fit bars.
      if (bottom + 10 <= lower) y = Math.max(upper, bottom + 10);
    }
    return { top: Math.min(lower, y), left: left + 12, width: Math.max(100, width - 24) };
  }
  function cueText(rows, seconds) {
    // A full hour has only a few thousand segments; also handles overlapping cues.
    return rows.filter(r => r.start <= seconds && seconds < r.end).map(r => r.text).join('\n');
  }
  function routeId(href) {
    const u = new URL(href);
    for (const q of [u.hash.split('?')[1], u.search.slice(1)]) {
      const id = new URLSearchParams(q || '').get('courseId');
      if (/^[1-9]\d{0,19}$/.test(id || '')) return id;
    }
    return '';
  }
  function apiInfo(value, origin) {
    try {
      const u = new URL(value, origin);
      if (u.origin !== origin || !u.pathname.startsWith(BASE + '/')) return null;
      const transcript = u.pathname.match(/\/v1\/course\/ai\/translate\/([1-9]\d{0,19})$/);
      const media = u.pathname === BASE + '/v1/course_vod_urls_new';
      const id = transcript?.[1] || (media && u.searchParams.get('courseId')) || '';
      return { transcript: !!transcript, media, id: /^[1-9]\d{0,19}$/.test(id) ? id : '' };
    } catch { return null; }
  }
  function normalizeViews(payload) {
    const list = (payload?.data ?? payload)?.courseVodViewList;
    if (!Array.isArray(list)) return [];
    return list.flatMap(v => {
      try {
        const url = new URL(v.url);
        return url.protocol === 'https:' && url.hostname === 'live.sjtu.edu.cn' && !url.username && !url.password && (!url.port || url.port === '443')
          ? [{ id: Number(v.viewNum), url: url.href }] : [];
      } catch { return []; }
    });
  }
  function choosePpt(views) { return views.find(v => v.id === 5) || null; }
  // Node-only test entry; never enabled in a browser / userscript manager.
  if (typeof window === 'undefined' && typeof module !== 'undefined') {
    module.exports = { normalize, cueText, routeId, apiInfo, shortCues, pictureBounds, captionLayout, seekTarget, constrainBox, normalizeViews, choosePpt }; return;
  }
  if (location.hostname !== 'v.sjtu.edu.cn' || window.__sjtuReplayEnhancer) return;
  window.__sjtuReplayEnhancer = true;
  const nativeFetch = window.fetch.bind(window);
  const prefsKey = 'personal.sjtu.replay.preferences.v1';
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(prefsKey) || '{}') || {}; } catch {}
  let speed = SPEEDS.includes(prefs.speed) ? prefs.speed : 3;
  let captionsOn = prefs.captions !== false;
  let fontSize = [12, 14, 16, 18].includes(prefs.fontSize) ? prefs.fontSize : 14;
  let placement = ['auto', 'bottom', 'top'].includes(prefs.placement) ? prefs.placement : 'auto';
  let audioWanted = false, pptWanted = prefs.pptWanted !== false;
  let focusPreference = prefs.focusPreference ?? 'landscape', controlsQuiet = false;
  let interactionAt = Date.now(), focusPointerHeld = false, focusWasActive = false;
  let pptScale = [0.45, 0.7, 0.85, 1].includes(prefs.pptScale) ? prefs.pptScale : 0.7;
  let panelPosition = prefs.panelPosition, pptPosition = prefs.pptPosition, captionPosition = prefs.captionPosition;
  let pptHost = null, pptBody = null, pptVideo = null, pptSource = '', pptPlayAttempt = '';
  let mediaViews = [], mediaController = null, mediaAttempt = '', mediaError = '';
  let audioEngine = null, audioStarting = false, audioMessage = '点按增强', movingBox = null;
  const originalMute = new Map();
  const hiddenSecondary = new Map();
  let offset = 0;
  let jwt = '', tenant = '', recording = '', route = location.href, revision = 0;
  let routeStarted = 0;
  let rows = [], generation = 0, request = null, attempted = '', lastAttempt = 0;
  let status = '等待打开回放…', host, root, statusNode, captionNode, speedSelect, captionButton;
  let currentVideo = null, timer, nativeVideo = null;
  const videos = new Map();

  function savePrefs() {
    try { localStorage.setItem(prefsKey, JSON.stringify({ speed, captions: captionsOn, fontSize, placement,
      audioWanted, pptWanted, pptScale, panelPosition, pptPosition, captionPosition, focusPreference })); } catch {}
  }
  function setStatus(text) { status = text; if (statusNode) statusNode.textContent = text; }
  function setRecording(id) {
    if (id === recording) return;
    restorePpt(); stopAudio(); mediaController?.abort(); mediaController = null;
    showControls();
    mediaViews = []; mediaAttempt = ''; mediaError = '';
    recording = id; rows = []; offset = 0; revision++; generation++;
    request?.abort(); request = null; attempted = '';
    for (const [v, state] of videos) fillTrack(v, state);
    if (captionNode) captionNode.textContent = '';
    if (root) root.querySelector('#offset').textContent = '校时 0 秒';
    setStatus(id ? '正在准备字幕…' : '等待打开回放…');
  }
  function checkRoute() {
    if (route !== location.href) {
      route = location.href;
      routeStarted = window.performance?.now?.() ?? Infinity;
      // Clear immediately on navigation, including encrypted play-center routes.
      setRecording('');
      setRecording(routeId(route));
    }
  }
  function recoverRecording() {
    if (recording) return;
    let id = routeId(location.href);
    // Safari may inject after the initial request, and the school encrypts URL
    // query parameters. Read its already-decoded Vue route without modifying it.
    if (!id) try {
      const app = document.getElementById?.('app')?.__vue_app__;
      const vueRoute = app?.config?.globalProperties?.$route;
      const candidate = vueRoute?.query?.courseId;
      if (/^\/(play-center|play-video|all-in-one-play-link|videoDetail)(\/|$)/.test(vueRoute?.path || '') && /^[1-9]\d{0,19}$/.test(String(candidate || ''))) id = String(candidate);
    } catch {}
    // Completed request timing entries are still available after late injection.
    // Never reuse entries from before the latest in-page navigation.
    if (!id) try {
      const entries = window.performance?.getEntriesByType('resource') || [];
      for (const entry of [...entries].sort((a, b) => b.startTime - a.startTime)) {
        if (entry.startTime < routeStarted) continue;
        const info = apiInfo(entry.name, location.origin);
        if (info?.media && info.id) { id = info.id; break; }
      }
    } catch {}
    if (id) setRecording(id);
    else if (currentVideo) setStatus('未识别到这堂回放，请刷新页面后点“重载字幕”');
  }
  function rememberToken(value) {
    if (typeof value === 'string' && value && value !== jwt) {
      jwt = value; attempted = '';
    }
  }
  function readLogin() {
    // No storage enumeration: only the school's documented names, never writes.
    try {
      const u = new URL(location.href);
      const fromURL = new URLSearchParams(u.hash.split('?')[1] || '').get('jwt_token');
      if (!jwt && fromURL) rememberToken(fromURL);
      const prefix = location.pathname.split('/').find(Boolean) || 'JY_';
      for (const storage of [sessionStorage, localStorage]) {
        for (const suffix of ['_STORAGE_KEY_TEMP_JWT_TOKEN', '_STORAGE_KEY_JWT_TOKEN']) {
          const value = storage.getItem(prefix + suffix);
          // Match the school getter: its session value is already the token.
          if (!jwt && value) rememberToken(value);
        }
      }
    } catch {}
  }
  function observeRequest(url, headers) {
    const info = apiInfo(url, location.origin);
    if (!info) return null;
    checkRoute();
    try {
      const h = new Headers(headers);
      if (h.get('jwt-token')) rememberToken(h.get('jwt-token'));
      if (h.get('tenantid')) tenant = h.get('tenantid');
    } catch {}
    // The playback request resolves encrypted route parameters without decrypting them.
    if (info.media && info.id) setRecording(info.id);
    return info;
  }
  function accept(payload, id, epoch) {
    if (id !== recording || epoch !== generation) return;
    if ((payload?.status != null && payload.status !== 200) || payload?.ok === false) return;
    rows = normalize(payload); revision++;
    setStatus(rows.length ? `已载入 ${rows.length} 条平台字幕` : '这堂课暂未提供字幕；稍后可点“重载字幕”');
    for (const [v, state] of videos) fillTrack(v, state);
    renderCaptions();
  }
  function acceptMedia(payload, id, epoch) {
    if (id !== recording || epoch !== generation || (payload?.status != null && payload.status !== 200)) return;
    mediaViews = normalizeViews(payload); mediaError = '';
    repairPpt(); syncAudio();
  }
  async function loadMedia(force = false) {
    if (!recording || mediaController || (!force && (mediaViews.length || mediaAttempt === recording))) return;
    readLogin(); if (!jwt) return;
    const id = recording, epoch = generation, controller = new AbortController();
    mediaController = controller; mediaAttempt = id; mediaError = '';
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const headers = { Accept: 'application/json', 'jwt-token': jwt }; if (tenant) headers.tenantid = tenant;
      const r = await nativeFetch(`${location.origin}${BASE}/v1/course_vod_urls_new?courseId=${id}`, {
        headers, credentials: 'same-origin', redirect: 'error', signal: controller.signal });
      if (!r.ok) throw new Error();
      const p = await r.json(); if (p.status !== 200) throw new Error();
      acceptMedia(p, id, epoch);
    } catch { if (epoch === generation) mediaError = '视频源读取失败，点设置里的重载画面'; }
    finally { clearTimeout(timeout); if (mediaController === controller) mediaController = null; }
  }

  // Observe only school API metadata; never logs URLs, tokens or response bodies.
  window.fetch = function(input, init) {
    let info = null;
    try { info = observeRequest(typeof input === 'string' || input instanceof URL ? String(input) : input.url, init?.headers ?? input?.headers); } catch {}
    const epoch = generation;
    const promise = nativeFetch(input, init);
    if (info?.transcript || info?.media) promise.then(r => {
      if (r.ok && info.id === recording && epoch === generation)
        r.clone().json().then(p => info.media ? acceptMedia(p, info.id, epoch) : accept(p, info.id, epoch)).catch(() => {});
    }).catch(() => {});
    return promise;
  };
  const xhrMeta = new WeakMap();
  const proto = XMLHttpRequest.prototype;
  const open = proto.open, header = proto.setRequestHeader, send = proto.send;
  proto.open = function(method, url, ...rest) {
    xhrMeta.set(this, { url: String(url), headers: {} });
    return open.call(this, method, url, ...rest);
  };
  proto.setRequestHeader = function(name, value) {
    const meta = xhrMeta.get(this);
    if (meta && /^(jwt-token|tenantid)$/i.test(name)) meta.headers[name] = value;
    return header.call(this, name, value);
  };
  proto.send = function(...args) {
    const meta = xhrMeta.get(this);
    let info = null;
    try { if (meta) info = observeRequest(meta.url, meta.headers); } catch {}
    const epoch = generation;
    if (info?.transcript || info?.media) this.addEventListener('load', () => {
      if (this.status !== 200 || info.id !== recording || epoch !== generation) return;
      try { const payload = this.responseType === 'json' ? this.response : JSON.parse(this.responseText);
        if (info.media) acceptMedia(payload, info.id, epoch); else accept(payload, info.id, epoch); } catch {}
    }, { once: true });
    return send.apply(this, args);
  };

  async function loadCaptions(force = false) {
    recoverRecording();
    if (!recording || request || (!force && rows.length)) return;
    readLogin();
    if (!jwt) { setStatus('等待登录信息；若一直如此，请刷新回放页面'); return; }
    const key = recording + ':' + jwt;
    if (!force && (attempted === key || Date.now() - lastAttempt < 2000)) return;
    attempted = key; lastAttempt = Date.now();
    const id = recording, epoch = generation, controller = new AbortController();
    request = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setStatus('正在读取平台字幕…');
    try {
      const headers = { Accept: 'application/json', 'jwt-token': jwt };
      if (tenant) headers.tenantid = tenant;
      const response = await nativeFetch(`${location.origin}${BASE}/v1/course/ai/translate/${id}?useOriginal=true`, {
        method: 'GET', headers, credentials: 'same-origin', redirect: 'error', signal: controller.signal
      });
      if (epoch !== generation) return;
      if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? '登录已失效，请从 Canvas 重新打开回放' : '字幕请求失败，请点“重载字幕”');
      const payload = await response.json();
      if (epoch !== generation) return;
      if (payload?.status !== 200 || payload?.ok === false) throw new Error('平台未返回字幕，请确认登录后点“重载字幕”');
      accept(payload, id, epoch);
    } catch (e) {
      if (epoch === generation) setStatus(e.name === 'AbortError' ? '字幕读取超时，请点“重载字幕”' : (e.message.startsWith('登录') || e.message.startsWith('字幕请求') || e.message.startsWith('平台未') ? e.message : '字幕读取失败，请点“重载字幕”'));
    } finally {
      clearTimeout(timeout);
      if (request === controller) request = null;
    }
  }

  function applySpeed(v) {
    try {
      if (Math.abs(v.playbackRate - speed) > 0.001) v.playbackRate = speed;
      if (v.defaultPlaybackRate !== speed) v.defaultPlaybackRate = speed;
      if ('preservesPitch' in v) v.preservesPitch = true;
      if ('webkitPreservesPitch' in v) v.webkitPreservesPitch = true;
    } catch { setStatus('此视频无法设置所选倍速，请尝试较低速度'); }
  }
  function viewportBox() {
    const view = window.visualViewport;
    return { left: view?.offsetLeft || 0, top: view?.offsetTop || 0,
      width: view?.width || innerWidth, height: view?.height || innerHeight };
  }
  function placeBox(box, saved, fallback) {
    if (!box || movingBox === box) return;
    const view = viewportBox(), rect = box.getBoundingClientRect();
    const valid = saved && Number.isFinite(saved.x) && Number.isFinite(saved.y);
    const x = valid ? view.left + saved.x * Math.max(1, view.width - rect.width) : fallback.x;
    const y = valid ? view.top + saved.y * Math.max(1, view.height - rect.height) : fallback.y;
    const point = constrainBox(x, y, rect.width, rect.height, view);
    box.style.left = point.x + 'px'; box.style.top = point.y + 'px'; box.style.right = 'auto';
  }
  function draggable(handle, box, save) {
    let drag = null;
    handle.addEventListener('pointerdown', e => {
      if (e.button != null && e.button !== 0) return;
      const r = box.getBoundingClientRect();
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, left: r.left, top: r.top };
      movingBox = box; handle.setPointerCapture?.(e.pointerId); e.preventDefault(); e.stopPropagation();
    });
    handle.addEventListener('pointermove', e => {
      if (!drag || drag.id !== e.pointerId) return;
      const r = box.getBoundingClientRect();
      const p = constrainBox(drag.left + e.clientX - drag.x, drag.top + e.clientY - drag.y, r.width, r.height, viewportBox());
      box.style.left = p.x + 'px'; box.style.top = p.y + 'px'; box.style.right = 'auto';
      e.preventDefault(); e.stopPropagation();
    });
    const end = e => {
      if (!drag || drag.id !== e.pointerId) return;
      const view = viewportBox(), r = box.getBoundingClientRect();
      save({ x: Math.max(0, Math.min(1, (r.left - view.left) / Math.max(1, view.width - r.width))),
        y: Math.max(0, Math.min(1, (r.top - view.top) / Math.max(1, view.height - r.height))) });
      drag = null; movingBox = null; savePrefs();
    };
    handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);
    handle.addEventListener('lostpointercapture', end);
  }
  function seekBy(delta) {
    if (!currentVideo) return;
    const target = seekTarget(currentVideo.currentTime, delta, currentVideo.duration);
    seekTo(target);
  }
  function seekTo(target) {
    if (!currentVideo || !Number.isFinite(target)) return;
    // Use the same in-page event that the school's progress bar uses, if present.
    let component = currentVideo.__vueParentComponent;
    for (let i = 0; component && i < 20; i++, component = component.parent) {
      const emitter = component.provides?.playerEmitter;
      if (typeof emitter?.emit === 'function') { emitter.emit('currentTimeChange', target); break; }
    }
    for (const v of videos.keys()) {
      try { v.currentTime = seekTarget(target, 0, v.duration); } catch {}
    }
    syncPpt(); syncAudio(false, true); renderCaptions(); showControls();
  }
  function togglePlayback() {
    if (!currentVideo) return;
    if (currentVideo.paused) {
      for (const v of videos.keys()) { const result = v.play(); result?.catch(() => {}); }
      syncPpt(true); syncAudio(true);
    } else {
      for (const v of videos.keys()) v.pause();
      pptVideo?.pause(); audioEngine?.audio.pause();
    }
    updatePlayButton();
  }
  function updatePlayButton() {
    if (root) root.querySelector('#play').textContent = currentVideo && !currentVideo.paused ? 'Ⅱ 暂停' : '▶ 播放';
  }
  function stopAudio(message = '点按增强') {
    const engine = audioEngine; audioEngine = null; audioStarting = false;
    if (engine) {
      clearTimeout(engine.timeout); engine.audio.pause(); engine.audio.removeAttribute('src');
      engine.audio.load(); engine.audio.remove(); engine.context.close().catch(() => {});
    }
    for (const [video, muted] of originalMute) video.muted = muted;
    originalMute.clear(); audioMessage = message;
    if (root) root.querySelector('#audio').textContent = message;
  }
  function muteOriginals() {
    for (const v of videos.keys()) {
      if (!originalMute.has(v)) originalMute.set(v, v.muted);
      v.muted = true;
    }
  }
  function startAudio() {
    if (audioEngine) { syncAudio(true); return; }
    if (audioStarting) return;
    const main = currentVideo;
    const source = mediaViews.find(v => v.url === (main?.currentSrc || main?.src)) || mediaViews.find(v => v.id === 1);
    if (!main || !source) { audioMessage = mediaError || '音源未就绪，稍后点增强'; loadMedia(true); syncAudio(); return; }
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) { audioMessage = '此浏览器不支持增强'; syncAudio(); return; }
    audioWanted = true; savePrefs(); audioStarting = true;
    let context, audio;
    try {
      context = new Context(); audio = document.createElement('audio');
      // Never attach Web Audio to the school's video: its non-CORS source can
      // become permanently silent. A disposable CORS audio element is reversible.
      audio.crossOrigin = 'anonymous'; audio.preload = 'auto'; audio.src = source.url;
      audio.style.display = 'none'; document.body.append(audio);
      const input = context.createMediaElementSource(audio), high = context.createBiquadFilter(), low = context.createBiquadFilter();
      const gain = context.createGain(), compressor = context.createDynamicsCompressor();
      high.type = 'highpass'; high.frequency.value = 100;
      low.type = 'lowpass'; low.frequency.value = 6000;
      gain.gain.value = 1.8; compressor.threshold.value = -20; compressor.knee.value = 20;
      compressor.ratio.value = 4; compressor.attack.value = .003; compressor.release.value = .25;
      input.connect(high).connect(low).connect(gain).connect(compressor).connect(context.destination);
      const engine = { context, audio, main, epoch: generation, active: false, ready: false, timeout: null,
        seekingUntil: Date.now() + 2500, playPending: false };
      audioEngine = engine; audioMessage = '增强加载中…'; syncAudio();
      const fail = () => { if (audioEngine === engine) stopAudio('增强失败，已恢复原声；点按重试'); };
      audio.addEventListener('error', fail);
      audio.addEventListener('loadedmetadata', () => {
        if (audioEngine !== engine) return;
        engine.seekingUntil = Date.now() + 2500;
        try { audio.currentTime = seekTarget(main.currentTime, 0, audio.duration); } catch {}
      });
      audio.addEventListener('waiting', () => {
        if (audioEngine !== engine) return;
        if (engine.active && Date.now() > engine.seekingUntil) {
          stopAudio('增强缓冲，已恢复原声'); return;
        }
        engine.active = false;
        for (const [v, muted] of originalMute) v.muted = muted;
        originalMute.clear(); audioMessage = '增强缓冲中（原声）';
      });
      const activate = () => {
        if (audioEngine !== engine || engine.epoch !== generation) return;
        if (context.state !== 'running' || audio.paused || audio.readyState < 3) return;
        engine.active = true; audioStarting = false; clearTimeout(engine.timeout);
        muteOriginals(); audioMessage = '增强开'; syncAudio();
      };
      audio.addEventListener('playing', activate);
      context.addEventListener('statechange', () => {
        if (audioEngine === engine && engine.active && context.state !== 'running') stopAudio('点按恢复增强');
      });
      applySpeed(audio);
      // Both calls are made synchronously inside the tap, for iOS gesture rules.
      const resumed = context.resume();
      const played = main.paused ? Promise.resolve() : audio.play();
      engine.timeout = setTimeout(fail, 15000);
      Promise.all([resumed, played]).then(() => {
        if (audioEngine !== engine) return;
        engine.ready = true;
        if (main.paused) {
          clearTimeout(engine.timeout); audioStarting = false; audioMessage = '增强就绪（暂停）';
        }
        activate();
        if (audioEngine === engine && main.paused) audio.pause();
      }).catch(fail);
    } catch {
      if (audioEngine) stopAudio('增强失败，已恢复原声；点按重试');
      else { audio?.remove(); context?.close().catch(() => {}); audioStarting = false; audioMessage = '增强失败，原声保留'; }
    }
  }
  function syncAudio(fromGesture = false, seek = false) {
    const engine = audioEngine, main = currentVideo;
    if (engine && (engine.epoch !== generation || engine.main !== main || !main?.isConnected)) {
      stopAudio(); return;
    }
    if (engine) {
      const audio = engine.audio;
      let rate = speed;
      if (audio.readyState >= 1) try {
        const drift = main.currentTime - audio.currentTime;
        if (seek && Math.abs(drift) > .15) {
          engine.seekingUntil = Date.now() + 2500;
          audio.currentTime = seekTarget(main.currentTime, 0, audio.duration);
        } else if (!main.paused && engine.active && !audio.seeking) {
          // Never repeatedly seek a running sound track. Small clock differences
          // converge with at most 1.5% rate adjustment; larger failures use original sound.
          if (Math.abs(drift) > 2 && Date.now() > engine.seekingUntil) {
            stopAudio('增强不同步，已恢复原声'); return;
          }
          if (Math.abs(drift) > .08) rate = speed * (1 + Math.max(-.015, Math.min(.015, drift * .02)));
        }
      } catch {}
      if (Math.abs(audio.playbackRate - rate) > .001) audio.playbackRate = rate;
      if (engine.active) muteOriginals();
      if (main.paused) { if (!audio.paused) audio.pause(); }
      else if (audio.paused && !engine.playPending && (engine.ready || engine.active || fromGesture)) {
        engine.playPending = true;
        Promise.resolve(audio.play()).catch(() => { if (audioEngine === engine) stopAudio('点按恢复增强'); })
          .finally(() => { engine.playPending = false; });
      }
    }
    if (root) root.querySelector('#audio').textContent = audioMessage;
  }
  function restorePpt() {
    if (pptVideo) { pptVideo.pause(); pptVideo.removeAttribute('src'); pptVideo.load(); }
    pptSource = ''; pptPlayAttempt = '';
    if (pptHost) pptHost.style.display = 'none';
    for (const [el, value] of hiddenSecondary) el.style.visibility = value;
    hiddenSecondary.clear();
  }
  function ensurePptHost() {
    if (pptHost || !document.body) return;
    pptHost = document.createElement('section'); pptHost.id = 'sjtu-replay-ppt';
    pptHost.style.cssText = 'position:fixed;z-index:2147483644;display:none;pointer-events:auto;background:#000;border:1px solid #64748b;border-radius:9px;overflow:hidden;box-shadow:0 3px 14px #0008;color:#fff;font:13px -apple-system,sans-serif;';
    pptHost.innerHTML = `<div class="sjtu-ppt-heading" style="display:flex;align-items:center;height:34px;background:#162236;gap:4px;padding:0 5px"><span id="sjtu-ppt-handle" style="flex:1;touch-action:none;user-select:none;cursor:move;padding:7px">⠿ PPT · 可拖动</span><button id="sjtu-ppt-less" type="button">－</button><button id="sjtu-ppt-more" type="button">＋</button><button id="sjtu-ppt-close" type="button">收起</button></div><div id="sjtu-ppt-body" style="width:100%;aspect-ratio:16/9;position:relative;background:#000"></div><div id="sjtu-ppt-status" style="font-size:12px;padding:4px 8px"></div>`;
    const style = document.createElement('style');
    style.textContent = '#sjtu-replay-ppt button{color:white;background:#293448;border:1px solid #64748b;border-radius:5px;min-height:30px;font:13px -apple-system,sans-serif;padding:1px 7px}#sjtu-ppt-body video{display:block;object-fit:contain!important;width:100%!important;height:100%!important}';
    pptHost.append(style); document.body.append(pptHost);
    pptBody = pptHost.querySelector('#sjtu-ppt-body');
    pptVideo = document.createElement('video'); pptVideo.dataset.sjtuOwned = 'ppt';
    pptVideo.muted = true; pptVideo.defaultMuted = true; pptVideo.playsInline = true;
    pptVideo.setAttribute('playsinline', ''); pptVideo.setAttribute('webkit-playsinline', ''); pptVideo.preload = 'auto';
    pptBody.append(pptVideo);
    const state = text => { pptHost.querySelector('#sjtu-ppt-status').textContent = text; };
    pptVideo.addEventListener('loadedmetadata', () => { state(''); syncPpt(true); });
    pptVideo.addEventListener('playing', () => state(''));
    pptVideo.addEventListener('waiting', () => state('PPT 缓冲中…'));
    pptVideo.addEventListener('error', () => { if (pptSource) state('PPT 加载失败，请点设置 → 重载画面'); });
    pptBody.addEventListener('click', () => syncPpt(true));
    draggable(pptHost.querySelector('#sjtu-ppt-handle'), pptHost, p => { pptPosition = p; });
    const resize = direction => {
      const options = [0.45, 0.7, 0.85, 1];
      pptScale = options[Math.max(0, Math.min(options.length - 1, options.indexOf(pptScale) + direction))];
      savePrefs(); layoutBoxes();
    };
    pptHost.querySelector('#sjtu-ppt-less').addEventListener('click', () => resize(-1));
    pptHost.querySelector('#sjtu-ppt-more').addEventListener('click', () => resize(1));
    pptHost.querySelector('#sjtu-ppt-close').addEventListener('click', () => { pptWanted = false; restorePpt(); savePrefs(); repairPpt(); });
  }
  function repairPpt() {
    const ui = root?.querySelector('#ppt');
    if (!pptWanted) { if (ui) ui.textContent = 'PPT关'; return; }
    if (!recording || nativeVideo) { if (pptHost) pptHost.style.display = 'none'; return; }
    const source = choosePpt(mediaViews);
    if (!source) {
      restorePpt();
      if (ui) ui.textContent = mediaViews.length ? '本课无PPT' : 'PPT待载入';
      return;
    }
    ensurePptHost();
    if (pptSource !== source.url) {
      restorePpt(); pptSource = source.url; pptVideo.src = source.url; pptVideo.load();
      pptHost.querySelector('#sjtu-ppt-status').textContent = '正在加载 PPT…';
    }
    for (const el of document.querySelectorAll('.second-player-wrapper')) {
      if (!hiddenSecondary.has(el)) hiddenSecondary.set(el, el.style.visibility);
      el.style.visibility = 'hidden';
    }
    pptHost.style.display = 'block'; if (ui) ui.textContent = 'PPT开';
    syncPpt(); layoutBoxes();
  }
  function syncPpt(fromGesture = false) {
    const secondary = pptVideo, main = currentVideo;
    if (!secondary || !main || !pptSource || !pptWanted || secondary.readyState < 1) return;
    try {
      if (Math.abs(secondary.currentTime - main.currentTime) > .6) secondary.currentTime = seekTarget(main.currentTime, 0, secondary.duration);
      applySpeed(secondary);
      if (main.paused) { if (!secondary.paused) secondary.pause(); pptPlayAttempt = ''; return; }
      if (secondary.paused && (fromGesture || pptPlayAttempt !== pptSource)) {
        pptPlayAttempt = pptSource;
        secondary.play()?.catch(() => {
          if (pptSource) pptHost.querySelector('#sjtu-ppt-status').textContent = '点按 PPT 画面恢复播放';
        });
      }
    } catch {}
  }

  function focusActive() {
    const view = viewportBox();
    return !!currentVideo && !nativeVideo && (focusPreference === true || (focusPreference === 'landscape' && view.width > view.height));
  }
  function setQuiet(quiet) {
    controlsQuiet = !!quiet && focusActive();
    if (host) { host.dataset.quiet = String(controlsQuiet); host.dataset.focus = String(focusActive()); }
    document.documentElement?.classList.toggle('sjtu-replay-focus', focusActive());
    document.documentElement?.classList.toggle('sjtu-replay-quiet', controlsQuiet);
  }
  function showControls() {
    interactionAt = Date.now(); setQuiet(false);
  }
  function updateFocus() {
    const active = focusActive();
    if (active !== focusWasActive) { focusWasActive = active; showControls(); }
    if (!active || !currentVideo || currentVideo.paused || focusPointerHeld || movingBox || !root?.querySelector('#extra').hidden) setQuiet(false);
    else if (Date.now() - interactionAt > 2800) setQuiet(true);
    if (root) {
      root.querySelector('#focus').textContent = active ? '专注开' : '专注关';
      const slider = root.querySelector('#seek'), duration = currentVideo?.duration;
      slider.disabled = !Number.isFinite(duration) || duration <= 0;
      if (!slider.disabled && !focusPointerHeld) slider.value = String((currentVideo.currentTime / duration) * 1000);
      root.querySelector('#time').textContent = formatTime(currentVideo?.currentTime) + ' / ' + formatTime(duration);
    }
  }
  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
    return Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
  }
  function enterSystemFullscreen() {
    const v = currentVideo; if (!v) return;
    stopAudio('系统全屏使用原声'); showControls();
    try {
      if (typeof v.webkitEnterFullscreen === 'function') v.webkitEnterFullscreen();
      else if (typeof v.requestFullscreen === 'function') v.requestFullscreen().catch(() => setStatus('无法进入系统全屏，可使用专注模式'));
      else setStatus('此浏览器不支持系统全屏，可使用专注模式');
    } catch { setStatus('请先播放视频，再点系统全屏'); }
  }
  function installFocusControls() {
    const style = document.createElement('style'); style.id = 'sjtu-replay-focus-style';
    // These selectors are the school's actual mobile controls. Do not hide a
    // broad header/div selector: that would hide unrelated dialogs or the video.
    style.textContent = `
      .sjtu-replay-focus .jkmp-control-wrap,.sjtu-replay-focus .jkp-control-wrap,
      .sjtu-replay-focus .control-landscape-wrapper-keep-px,
      .sjtu-replay-focus .play-detail-mobile .icon-back-keep-px,
      .sjtu-replay-focus .play-detail-mobile .player-menu-bar{visibility:hidden!important;pointer-events:none!important}
      .sjtu-replay-quiet #sjtu-replay-ppt .sjtu-ppt-heading{display:none!important}
      .sjtu-replay-quiet #sjtu-replay-ppt #sjtu-ppt-status:empty{display:none!important}
      .sjtu-replay-quiet #sjtu-replay-ppt{border-color:transparent!important;box-shadow:none!important}
    `;
    document.body.append(style);
    root.addEventListener('pointerdown', () => { focusPointerHeld = true; showControls(); });
    document.addEventListener('pointerup', () => { if (focusPointerHeld) { focusPointerHeld = false; showControls(); } }, true);
    document.addEventListener('pointercancel', () => { focusPointerHeld = false; showControls(); }, true);
    root.addEventListener('input', showControls);
    root.addEventListener('click', showControls);
    document.addEventListener('click', e => {
      if (!focusActive() || !currentVideo) return;
      const path = e.composedPath();
      if (path.includes(host) || e.target.closest?.('button,select,input,a,.sjtu-ppt-heading,.jkmp-control-wrap,.jkp-control-wrap')) return;
      const onPicture = [currentVideo, pptVideo].filter(Boolean).some(v => {
        const r = v.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      });
      if (!onPicture) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (controlsQuiet) showControls(); else setQuiet(true);
      syncPpt(true);
    }, true);
    root.querySelector('#wake').addEventListener('click', showControls);
    root.querySelector('#focus').addEventListener('click', () => {
      focusPreference = !focusActive(); savePrefs(); showControls(); updateFocus();
    });
    root.querySelector('#native-fullscreen').addEventListener('click', enterSystemFullscreen);
    root.querySelector('#seek').addEventListener('input', e => {
      root.querySelector('#time').textContent = formatTime(Number(e.target.value) / 1000 * currentVideo?.duration);
    });
    root.querySelector('#seek').addEventListener('change', e => {
      if (Number.isFinite(currentVideo?.duration)) seekTo(Number(e.target.value) / 1000 * currentVideo.duration);
    });
  }
  function layoutBoxes() {
    const view = viewportBox(), panel = root?.querySelector('#panel');
    if (panel?.getBoundingClientRect && !controlsQuiet) {
      const r = panel.getBoundingClientRect();
      placeBox(panel, panelPosition, { x: view.left + view.width - r.width - 10, y: view.top + 10 });
    }
    if (pptHost?.style.display === 'block') {
      const width = Math.max(160, Math.min(view.width - 20, view.width * pptScale, (view.height - (focusActive() ? 60 : 130)) * 16 / 9));
      pptHost.style.width = width + 'px';
      const panelRect = panel?.getBoundingClientRect();
      placeBox(pptHost, pptPosition, focusActive() ? { x: view.left + 8, y: view.top + 8 } : {
        x: view.left + (view.width - width) / 2, y: view.top + (panelRect?.height || 100) + 22 });
    }
  }
  function nativeMode() {
    for (const [v, state] of videos) {
      if (state.track) state.track.mode = captionsOn && (nativeVideo === v || v.webkitDisplayingFullscreen || document.fullscreenElement === v) ? 'showing' : 'hidden';
    }
  }
  function fillTrack(v, state) {
    if (state.revision === revision) return;
    try {
      if (!state.track) state.track = v.addTextTrack('subtitles', '交大平台字幕', 'zh');
      state.track.mode = 'hidden';
      for (const cue of Array.from(state.track.cues || [])) state.track.removeCue(cue);
      const Cue = window.VTTCue || window.TextTrackCue;
      if (!Cue) return;
      for (const row of rows) {
        const start = Math.max(0, row.start - offset), end = row.end - offset;
        if (end <= start) continue;
        const text = row.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const cue = new Cue(start, end, text);
        cue.line = -2;
        state.track.addCue(cue);
      }
      state.revision = revision;
      nativeMode();
    } catch { /* Inline captions still work if this browser rejects dynamic tracks. */ }
  }
  function scanVideos() {
    for (const [v, state] of videos) if (!v.isConnected) {
      state.controller.abort();
      if (state.track) state.track.mode = 'disabled';
      videos.delete(v);
      if (nativeVideo === v) nativeVideo = null;
    }
    for (const v of document.querySelectorAll('video')) {
      if (v.dataset?.sjtuOwned) continue;
      if (!videos.has(v)) {
        const state = { revision: -1, track: null, controller: new AbortController() };
        videos.set(v, state);
        const opts = { signal: state.controller.signal };
        for (const name of ['play', 'loadedmetadata', 'emptied']) v.addEventListener(name, () => { state.revision = -1; applySpeed(v); fillTrack(v, state); }, opts);
        v.addEventListener('webkitbeginfullscreen', () => { stopAudio('系统全屏使用原声'); nativeVideo = v; setQuiet(false); nativeMode(); renderCaptions(); }, opts);
        v.addEventListener('webkitendfullscreen', () => { nativeVideo = null; showControls(); nativeMode(); renderCaptions(); }, opts);
        v.addEventListener('timeupdate', renderCaptions, opts);
        for (const name of ['seeked', 'play', 'pause', 'ratechange']) v.addEventListener(name, () => {
          renderCaptions(); syncPpt(true);
          if (v === currentVideo) { syncAudio(false, name === 'seeked'); if (name === 'pause') showControls(); }
          updatePlayButton();
        }, opts);
        v.addEventListener('waiting', () => { if (audioEngine?.main === v && audioEngine.active) stopAudio('视频缓冲，已恢复原声'); }, opts);
        fillTrack(v, state);
      }
      applySpeed(v);
    }
    const available = [...videos.keys()].filter(v => v.getBoundingClientRect().width > 0 && !v.closest?.('.second-player-wrapper'));
    currentVideo = nativeVideo || available.find(v => !v.paused && !(originalMute.get(v) ?? v.muted) && v.volume > 0) || (available.includes(currentVideo) ? currentVideo : null) || available.find(v => !v.paused) || available[0] || null;
    if (host) host.style.display = currentVideo ? 'block' : 'none';
  }
  function renderCaptions() {
    if (!captionNode) return;
    const v = currentVideo;
    const native = nativeVideo || v?.webkitDisplayingFullscreen || (v && document.fullscreenElement === v);
    const text = captionsOn && v && !native ? cueText(rows, v.currentTime + offset) : '';
    if (captionNode.textContent !== text) captionNode.textContent = text;
    captionNode.style.display = text ? 'block' : 'none';
    if (v && text) {
      const viewport = window.visualViewport;
      const view = { height: viewport?.height || innerHeight, width: viewport?.width || innerWidth,
        top: viewport?.offsetTop || 0, left: viewport?.offsetLeft || 0 };
      const pictures = [...videos.keys()].map(video => {
        const rect = video.getBoundingClientRect();
        const fit = window.getComputedStyle?.(video)?.objectFit || 'contain';
        return pictureBounds(rect, video.videoWidth, video.videoHeight, fit);
      }).filter(r => r.width > 0 && r.height > 0 && r.bottom > view.top && r.top < view.top + view.height);
      const box = captionLayout(pictures, view, fontSize, placement);
      const focusBottom = focusActive() && placement === 'auto';
      captionNode.style.width = focusBottom ? 'max-content' : box.width + 'px';
      captionNode.style.maxWidth = box.width + 'px';
      captionNode.style.fontSize = fontSize + 'px';
      const rect = captionNode.getBoundingClientRect();
      placeBox(captionNode, captionPosition, focusBottom ? {
        x: view.left + (view.width - rect.width) / 2, y: view.top + view.height - rect.height - 16
      } : { x: box.left, y: box.top });
    }
  }
  async function checkUpdate() {
    const node = root.querySelector('#update-status');
    node.textContent = '正在检查…';
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 10000);
    const link = () => {
      const a = document.createElement('a'); a.textContent = '打开新版安装链接';
      a.href = UPDATE_BASE + 'sjtu-replay.user.js'; a.target = '_blank'; a.rel = 'noopener noreferrer';
      node.append(a);
    };
    try {
      const r = await nativeFetch(UPDATE_BASE + 'sjtu-replay.meta.js', { credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', signal: controller.signal });
      if (!r.ok) throw new Error();
      const text = await r.text(), version = text.match(/^\/\/\s*@version\s+(\d+\.\d+\.\d+)\s*$/m)?.[1];
      if (!version) throw new Error();
      const newer = version.split('.').map(Number), current = VERSION.split('.').map(Number);
      const changed = newer.findIndex((part, i) => part !== current[i]);
      if (changed === -1 || newer[changed] < current[changed]) node.textContent = `当前已是最新版 v${VERSION}`;
      else { node.textContent = `发现 v${version}。打开链接后，在 Userscripts 中点更新。`; link(); }
    } catch { node.textContent = '检查失败，可直接打开安装地址查看：'; link(); }
    finally { clearTimeout(timeout); }
    layoutBoxes();
  }
  function mount() {
    if (!document.body || host) return;
    host = document.createElement('div');
    host.id = 'sjtu-replay-enhancer';
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;display:none';
    root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>
      :host{all:initial;color:white;font:14px -apple-system,BlinkMacSystemFont,sans-serif;-webkit-text-size-adjust:100%;text-size-adjust:100%}
      *{box-sizing:border-box} button,select{font:inherit;color:white;background:#293448;border:1px solid #64748b;border-radius:8px;min-height:34px;padding:5px 8px;touch-action:manipulation}button:active{background:#475569}
      #panel{position:fixed;width:278px;max-width:calc(100% - 16px);background:rgba(15,23,42,.94);padding:8px;border-radius:12px;pointer-events:auto;box-shadow:0 2px 12px #0006;max-height:calc(100dvh - 16px);overflow:auto}
      #bar{display:grid;grid-template-columns:1fr 1.35fr 1fr 1fr;gap:5px;align-items:stretch}#bar button,#bar select{width:100%;min-height:38px;font-size:14px;padding:3px}#play{background:#1d4ed8}
      #actions,#extra{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:8px}#actions button{flex:1;font-size:12px;min-height:30px;padding:3px 5px}#extra button,#extra select{font-size:12px}#extra[hidden],#body[hidden]{display:none}
      #heading{display:flex;align-items:center;gap:6px;margin-bottom:6px}#drag{flex:1;padding:4px;touch-action:none;user-select:none;cursor:move;color:#cbd5e1;font-size:12px}#fold{min-height:26px;padding:1px 8px;font-size:12px}
      #status{display:none;font-size:11px;line-height:1.5;color:#cbd5e1;margin-top:6px}label{display:flex;align-items:center;gap:4px}
      #caption{position:fixed;text-align:center;white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px;line-height:1.45;font-weight:400;text-shadow:0 1px 2px #000;background:rgba(0,0,0,.4);border-radius:5px;padding:6px 10px;pointer-events:auto;touch-action:none;user-select:none;cursor:move;max-height:calc(2.9em + 12px);overflow:hidden;-webkit-text-size-adjust:100%;text-size-adjust:100%}
      #update-status{font-size:12px;width:100%;line-height:1.5}a{color:#93c5fd}
      #timeline{display:none;align-items:center;gap:6px;margin-top:6px}#seek{min-width:0;flex:1;height:26px;accent-color:#60a5fa}#time{font-size:10px;color:#cbd5e1;white-space:nowrap}
      :host([data-focus="true"]) #timeline{display:flex}
      :host([data-quiet="true"]) #panel{display:none}
      #wake{display:none;position:fixed;right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));pointer-events:auto;min-height:30px;padding:3px 8px;font-size:12px;opacity:.55;background:#0f172a;border-radius:16px}
      :host([data-quiet="true"]) #wake{display:block}
      @media(orientation:landscape){#panel{width:266px}#heading{margin-bottom:4px}#bar button,#bar select{min-height:34px;font-size:13px}#actions{margin-top:5px}}
    </style><section id="panel" aria-label="交大回放增强"><div id="heading"><span id="drag">⠿ 拖动工具条</span><button id="fold">收起</button></div><div id="body"><div id="bar"><button id="back" aria-label="后退15秒">−15s</button><button id="play">Ⅱ 暂停</button><button id="forward" aria-label="前进15秒">＋15s</button><select id="speed" aria-label="播放倍速"></select></div><div id="actions"><button id="captions">字幕开</button><button id="ppt">PPT开</button><button id="focus">专注关</button><button id="more">设置</button></div><div id="timeline"><input id="seek" type="range" min="0" max="1000" value="0" step="1" aria-label="播放进度"><span id="time"></span></div><div id="status" role="status"></div><div id="extra" hidden><button id="audio">点按增强</button><button id="native-fullscreen">系统全屏</button><div style="width:100%;font-size:11px;line-height:1.5">专注模式：轻点画面显示控制，播放时约3秒自动隐藏。系统全屏只显示主视频；要保留PPT和拖动字幕，请用专注模式。</div><label>字号<select id="font-size" aria-label="字幕字号"></select></label><label>位置<select id="placement" aria-label="字幕位置"></select></label><button id="reset-layout">重置拖动位置</button><button id="reload-media">重载画面</button><button id="reload">重载字幕</button><button id="minus">字幕晚 0.5 秒</button><button id="plus">字幕早 0.5 秒</button><button id="offset">校时 0 秒</button><div style="font-size:12px;width:100%">字幕出现时，按住文字即可拖动。</div><button id="update">检查更新</button><div id="update-status"></div><div id="diagnostic" style="width:100%;font-size:11px"></div></div></div></section><button id="wake" aria-label="显示播放控制">控制</button><div id="caption" aria-label="可拖动字幕"></div>`;

    document.body.append(host);
    statusNode = root.querySelector('#status'); captionNode = root.querySelector('#caption');
    speedSelect = root.querySelector('#speed'); captionButton = root.querySelector('#captions');
    draggable(root.querySelector('#drag'), root.querySelector('#panel'), p => { panelPosition = p; });
    root.querySelector('#fold').addEventListener('click', () => {
      const body = root.querySelector('#body'); body.hidden = !body.hidden;
      root.querySelector('#fold').textContent = body.hidden ? '展开' : '收起'; layoutBoxes();
    });
    root.querySelector('#back').addEventListener('click', () => seekBy(-15));
    root.querySelector('#forward').addEventListener('click', () => seekBy(15));
    installFocusControls();
    root.querySelector('#play').addEventListener('click', togglePlayback);
    draggable(captionNode, captionNode, p => { captionPosition = p; });
    root.querySelector('#audio').addEventListener('click', () => {
      if (audioEngine) { audioWanted = false; stopAudio('增强关'); savePrefs(); }
      else startAudio();
    });
    root.querySelector('#reload-media').addEventListener('click', () => {
      restorePpt(); stopAudio(); mediaViews = []; mediaAttempt = ''; loadMedia(true);
    });
    root.querySelector('#update').addEventListener('click', checkUpdate);
    root.querySelector('#ppt').addEventListener('click', () => {
      // A failed muted play is retried inside this user gesture before hiding it.
      if (root.querySelector('#ppt').textContent.includes('点按恢复')) { syncPpt(true); return; }
      pptWanted = !pptWanted;
      if (!pptWanted) restorePpt(); else { repairPpt(); syncPpt(true); }
      savePrefs();
    });
    root.querySelector('#reset-layout').addEventListener('click', () => {
      panelPosition = null; pptPosition = null; captionPosition = null; pptScale = 0.7; savePrefs(); layoutBoxes(); renderCaptions();
    });
    for (const rate of SPEEDS) {
      const o = document.createElement('option'); o.value = String(rate); o.textContent = rate + '×'; speedSelect.append(o);
    }
    speedSelect.value = String(speed);
    const fontSelect = root.querySelector('#font-size'), positionSelect = root.querySelector('#placement');
    for (const size of [12, 14, 16, 18]) {
      const o = document.createElement('option'); o.value = String(size); o.textContent = size + 'px'; fontSelect.append(o);
    }
    for (const [value, label] of [['auto', '画面下方（优先）'], ['bottom', '页面底部'], ['top', '页面顶部']]) {
      const o = document.createElement('option'); o.value = value; o.textContent = label; positionSelect.append(o);
    }
    fontSelect.value = String(fontSize); positionSelect.value = placement;
    fontSelect.addEventListener('change', () => { fontSize = Number(fontSelect.value); savePrefs(); renderCaptions(); });
    positionSelect.addEventListener('change', () => { placement = positionSelect.value; captionPosition = null; savePrefs(); renderCaptions(); });
    speedSelect.addEventListener('change', () => { speed = Number(speedSelect.value); savePrefs(); for (const v of videos.keys()) applySpeed(v); });
    captionButton.textContent = captionsOn ? '字幕开' : '字幕关';
    captionButton.addEventListener('click', () => { captionsOn = !captionsOn; captionButton.textContent = captionsOn ? '字幕开' : '字幕关'; savePrefs(); nativeMode(); renderCaptions(); });
    root.querySelector('#more').addEventListener('click', () => { const e = root.querySelector('#extra'); e.hidden = !e.hidden; statusNode.style.display = e.hidden ? 'none' : 'block'; showControls(); layoutBoxes(); });
    root.querySelector('#reload').addEventListener('click', () => loadCaptions(true));
    const adjust = value => {
      offset = value; revision++;
      root.querySelector('#offset').textContent = `校时 ${offset > 0 ? '+' : ''}${offset} 秒`;
      for (const [v, state] of videos) fillTrack(v, state);
      renderCaptions();
    };
    root.querySelector('#minus').addEventListener('click', () => adjust(Math.max(-60, offset - 0.5)));
    root.querySelector('#plus').addEventListener('click', () => adjust(Math.min(60, offset + 0.5)));
    root.querySelector('#offset').addEventListener('click', () => adjust(0));
    setStatus(status);
  }
  function fullscreenChanged() {
    const full = document.fullscreenElement;
    if (host) {
      // A video element itself cannot display DOM overlays; use its native track.
      const parent = full && full.tagName !== 'VIDEO' ? full : document.body;
      if (parent && host.parentNode !== parent) parent.append(host);
      if (parent && pptHost && pptHost.parentNode !== parent) parent.append(pptHost);
    }
    nativeMode(); renderCaptions();
  }
  function tick() {
    checkRoute(); mount(); scanVideos();
    if (currentVideo) { loadCaptions(); loadMedia(); }
    repairPpt(); layoutBoxes(); syncAudio(); updatePlayButton(); updateFocus();
    if (root) root.querySelector('#diagnostic').textContent = `v${VERSION} · 回放 ${recording || '未识别'} · ${mediaViews.length ? '视角 ' + mediaViews.map(v => v.id).join('/') : (mediaError || '正在读取视频源')} · 进度 ${Math.floor(currentVideo?.currentTime || 0)} 秒`;
    renderCaptions();
  }
  function startTimer() { if (!timer) timer = setInterval(tick, 750); }
  setRecording(routeId(location.href));
  addEventListener('hashchange', () => { checkRoute(); tick(); });
  addEventListener('popstate', () => { checkRoute(); tick(); });
  document.addEventListener('fullscreenchange', fullscreenChanged);
  document.addEventListener('click', e => {
    if (e.isTrusted && e.target !== host) syncPpt(true);
  });
  addEventListener('resize', layoutBoxes);
  window.visualViewport?.addEventListener('resize', layoutBoxes);
  document.addEventListener('DOMContentLoaded', tick, { once: true });
  addEventListener('pagehide', () => { clearInterval(timer); timer = null; request?.abort(); mediaController?.abort(); stopAudio(); pptVideo?.pause(); setQuiet(false); document.documentElement?.classList.remove('sjtu-replay-focus', 'sjtu-replay-quiet'); });
  addEventListener('pageshow', () => { attempted = ''; startTimer(); tick(); });
  startTimer();
  tick();
})();
