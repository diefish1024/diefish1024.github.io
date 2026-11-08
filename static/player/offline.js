/* Shared by the page and its service worker. Video chunks never leave this device. */
(() => {
  const DB = 'course-player-offline-v1';
  const CHUNK = 4 * 1024 * 1024;
  function db() {
    return new Promise((resolve,reject) => {
      const request = indexedDB.open(DB,1);
      request.onupgradeneeded = () => { request.result.createObjectStore('files',{keyPath:'id'}); request.result.createObjectStore('chunks'); };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function transact(store,mode,operation) {
    const database = await db();
    return new Promise((resolve,reject) => {
      const tx = database.transaction(store,mode); const request = operation(tx.objectStore(store)); let result;
      if (request) request.onsuccess = () => { result = request.result; };
      tx.oncomplete = () => { database.close(); resolve(result); };
      tx.onerror = () => { database.close(); reject(tx.error); };
      tx.onabort = () => { database.close(); reject(tx.error || new Error('保存中断')); };
    });
  }
  const get = id => transact('files','readonly',s => s.get(id));
  const listAll = () => transact('files','readonly',s => s.getAll());
  const list = async () => (await listAll()).filter(f => f.ready);
  async function remove(id) {
    await transact('files','readwrite',s => s.delete(id));
    await transact('chunks','readwrite',s => s.delete(IDBKeyRange.bound([id,0],[id,Number.MAX_SAFE_INTEGER])));
  }
  async function save(meta,url,signal,onProgress) {
    if (await get(meta.id)) throw new Error('这个画面已保存或正在保存，请先移除旧副本。');
    await transact('files','readwrite',s => s.add({...meta,ready:false,createdAt:Date.now()}));
    let response,reader; let written=0,index=0,buffer=new Uint8Array(CHUNK),used=0;
    try {
      response = await fetch(url,{signal,credentials:'omit',referrerPolicy:'no-referrer'});
      if (!response.ok || response.status !== 200 || !response.headers.get('Content-Type')?.startsWith('video/')) throw new Error('学校视频暂时无法保存，请重新连接后再试。');
      const expected = Number(response.headers.get('Content-Length')) || 0;
      const estimate = await navigator.storage?.estimate?.();
      if (expected && estimate?.quota && expected > estimate.quota - estimate.usage) throw new Error('手机剩余浏览器空间不足，请先移除一些离线视频。');
      reader = response.body.getReader();
      while (true) {
        const {value,done} = await reader.read();
        if (done) break;
        let offset=0;
        while (offset < value.length) {
          const count = Math.min(CHUNK-used,value.length-offset);
          buffer.set(value.subarray(offset,offset+count),used); used+=count; offset+=count;
          if (used === CHUNK) {
            await transact('chunks','readwrite',s => s.put(buffer,[meta.id,index++]));
            written+=used; used=0; buffer=new Uint8Array(CHUNK);
          }
        }
        onProgress(written+used,expected);
      }
      if (signal.aborted) throw new DOMException('已取消','AbortError');
      if (used) { await transact('chunks','readwrite',s => s.put(buffer.slice(0,used),[meta.id,index++])); written+=used; }
      if (!written || expected && expected !== written) throw new Error('视频没有完整保存，请重新下载。');
      await transact('files','readwrite',s => s.put({...meta,ready:true,size:written,chunks:index,chunkSize:CHUNK,type:response.headers.get('Content-Type'),createdAt:Date.now()}));
      return written;
    } catch (error) {
      await remove(meta.id).catch(() => {});
      throw error;
    } finally { await reader?.cancel().catch(() => {}); }
  }
  function parseRange(value,size) {
    if (!value) return {start:0,end:size-1,partial:false};
    const m=/^bytes=(\d*)-(\d*)$/.exec(value);
    if (!m || (!m[1]&&!m[2])) return null;
    const start=m[1]?Number(m[1]):Math.max(0,size-Number(m[2]));
    const end=m[1]&&m[2]?Math.min(Number(m[2]),size-1):size-1;
    if (!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=size||end<start) return null;
    return {start,end,partial:true};
  }
  async function respond(request,id) {
    const file=await get(id);
    if (!file?.ready) return new Response('Offline video not found',{status:404});
    const range=parseRange(request.headers.get('Range'),file.size);
    if (!range) return new Response(null,{status:416,headers:{'Content-Range':`bytes */${file.size}`}});
    const headers={'Content-Type':file.type,'Content-Length':String(range.end-range.start+1),'Accept-Ranges':'bytes','Cache-Control':'no-store'};
    if (range.partial) headers['Content-Range']=`bytes ${range.start}-${range.end}/${file.size}`;
    let cursor=range.start;
    const stream=new ReadableStream({async pull(controller){
      if(cursor>range.end){controller.close();return;}
      const index=Math.floor(cursor/file.chunkSize);
      try {
        const chunk=await transact('chunks','readonly',s=>s.get([id,index]));
        if (!chunk) throw new Error('离线视频片段已丢失，请重新保存。');
        const from=cursor%file.chunkSize;
        const to=Math.min(chunk.length,range.end-index*file.chunkSize+1);
        controller.enqueue(chunk.subarray(from,to));cursor+=to-from;
      } catch(error){controller.error(error);}
    }});
    return new Response(request.method==='HEAD'?null:stream,{status:range.partial?206:200,headers});
  }
  globalThis.offlineStore={get,list,listAll,remove,save,respond,parseRange};
})();
