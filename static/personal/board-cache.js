const KEY='personal-board-cache-v1',REPO='diefish1024/personal-todo-data';
const storage=name=>{try{return globalThis[name]}catch{return null}};
const valid=board=>board&&Number.isFinite(board.revision||0)&&Array.isArray(board.tasks)&&Array.isArray(board.groups)&&Array.isArray(board.courses);
export function clearBoardCaches(){for(const target of [storage('localStorage'),storage('sessionStorage')])try{target?.removeItem(KEY)}catch{}}
export async function createBoardCache(connection,{local=storage('localStorage'),session=storage('sessionStorage')}={}){
 const target=connection.remember?local:session;
 // Bind private snapshots to this credential without duplicating the credential in the cache.
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(connection.token));
 const identity=Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,'0')).join('');
 function read(){try{const value=JSON.parse(target?.getItem(KEY)||'null');return value?.repo===REPO&&value.identity===identity&&valid(value.board)?structuredClone(value.board):null}catch{return null}}
 return {
  read,
  write(board){
   if(!valid(board))return;
   const previous=read();if(previous&&(previous.revision||0)>(board.revision||0))return;
   try{target?.setItem(KEY,JSON.stringify({repo:REPO,identity,board,savedAt:new Date().toISOString()}))}catch{}
  }
 };
}
