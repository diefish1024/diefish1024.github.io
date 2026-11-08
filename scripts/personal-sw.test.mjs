import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('./personal-sw.js',import.meta.url),'utf8');
const origin='https://example.test',base=origin+'/personal/';
function environment(version, shared=new Map(), fail=false){
  const handlers={},network=[],state={skip:false,claimed:false};
  const key=request=>typeof request==='string'?request:request.url;
  const storage={
    async open(name){
      if(!shared.has(name))shared.set(name,new Map());
      const entries=shared.get(name);
      return {
        async addAll(requests){
          if(fail)throw Error('Incomplete download');
          for(const request of requests)assert.equal(request.cache,'reload');
          for(const request of requests)entries.set(key(request),new Response('asset '+version));
        },
        async put(request,response){entries.set(key(request),response.clone())},
        async match(request){return entries.get(key(request))?.clone()}
      };
    },
    async keys(){return [...shared.keys()]}, async delete(name){return shared.delete(name)}
  };
  const context={BUILD:{version,html:'page '+version,assets:['./assets/app-'+version+'.js']},caches:storage,URL,Request,Response,
    self:{location:{href:base+'sw.js'},addEventListener:(name,callback)=>handlers[name]=callback,
      skipWaiting:async()=>{state.skip=true},clients:{claim:async()=>{state.claimed=true}}},
    fetch:async request=>{network.push(request.url);throw Error('Network unavailable')}
  };
  vm.runInNewContext(source,context);
  const dispatch=async name=>{let promise;handlers[name]({waitUntil:value=>promise=value});await promise};
  const request=(url,{mode='cors',method='GET',headers={}}={})=>{
    let response;handlers.fetch({request:{url,mode,method,headers:new Headers(headers)},respondWith:value=>response=value});return response;
  };
  return {dispatch,request,state,network,storage,shared};
}
test('cached navigation and code open without network even with an arbitrary page query',async()=>{
  const env=environment('AAA');await env.dispatch('install');await env.dispatch('activate');
  assert.equal(await (await env.request(base+'?v=new',{mode:'navigate'})).text(),'page AAA');
  assert.equal(await (await env.request(base+'assets/app-AAA.js')).text(),'asset AAA');
  assert.deepEqual(env.network,[]);assert.ok(env.state.skip&&env.state.claimed);
});
test('private API requests, mutations and other site pages bypass the page cache',async()=>{
  const env=environment('AAA');await env.dispatch('install');
  for(const url of ['https://api.github.com/repos/private/contents/board.json',origin+'/index.html',base+'board.json',base+'sw.js'])assert.equal(env.request(url),undefined);
  assert.equal(env.request(base+'assets/app-AAA.js',{method:'POST'}),undefined);
  assert.equal(env.request(base+'assets/app-AAA.js',{headers:{Authorization:'Bearer example'}}),undefined);
});
test('incomplete new downloads do not activate or replace the working version',async()=>{
  const first=environment('AAA');await first.dispatch('install');
  const broken=environment('BBB',first.shared,true);await assert.rejects(broken.dispatch('install'),/Incomplete/);
  assert.equal(broken.state.skip,false);
  assert.equal(await(await first.request(base,{mode:'navigate'})).text(),'page AAA');
  const next=environment('CCC',first.shared);await next.dispatch('install');await next.dispatch('activate');
  assert.equal(await(await next.request(base+'assets/app-AAA.js')).text(),'asset AAA');
  assert.equal(first.shared.has('personal-shell:/personal/:BBB'),false);
});
test('updates serve matching HTML and retain the previous assets for existing tabs',async()=>{
  const first=environment('AAA');await first.dispatch('install');
  first.shared.set('other-site-cache',new Map());
  const second=environment('BBB',first.shared);await second.dispatch('install');await second.dispatch('activate');
  assert.equal(await(await second.request(base,{mode:'navigate'})).text(),'page BBB');
  assert.equal(await(await second.request(base+'assets/app-AAA.js')).text(),'asset AAA');
  const third=environment('CCC',first.shared);await third.dispatch('install');await third.dispatch('activate');
  assert.equal(first.shared.has('personal-shell:/personal/:AAA'),false);
  assert.equal(first.shared.has('personal-shell:/personal/:BBB'),true);
  assert.equal(first.shared.has('other-site-cache'),true);
});
