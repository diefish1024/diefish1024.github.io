export const CONNECTION_KEY='personal-github-connection-v2';
const LEGACY_KEY='personal-github-session-v1';
const browserStorage=name=>{try{return globalThis[name]}catch{return null}};
export function createConnectionStorage({local=browserStorage('localStorage'),session=browserStorage('sessionStorage')}={}){
 const get=(storage,key)=>{try{return storage?.getItem(key)||''}catch{return ''}};
 return {
  load(){
   const persistent=get(local,CONNECTION_KEY),temporary=get(session,CONNECTION_KEY),legacy=get(session,LEGACY_KEY);
   if(persistent)return {token:persistent,remember:true};
   if(temporary)return {token:temporary,remember:false};
   if(legacy)return {token:legacy,remember:true,legacy:true};
   return null;
  },
  save(token,remember){
   const target=remember?local:session;
   try{if(!target)throw Error();target.setItem(CONNECTION_KEY,token);if(target.getItem(CONNECTION_KEY)!==token)throw Error()}
   catch{throw Error(remember?'浏览器未允许保存登录状态，请允许网站存储，或取消勾选“在此浏览器保持登录”':'浏览器未允许保存当前连接，请允许网站存储后重试')}
   (remember?session:local)?.removeItem(CONNECTION_KEY);
   session?.removeItem(LEGACY_KEY);
  },
  forget(){local?.removeItem(CONNECTION_KEY);session?.removeItem(CONNECTION_KEY);session?.removeItem(LEGACY_KEY)}
 };
}
