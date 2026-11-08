import {connectGitHub,readBoard,writeBoard} from './github-store.js?v=fast-open-20261108';
import {setBackend} from './web/lib/api.js';
import {cloudBackend} from './todo-adapter.js?v=fast-open-20261108';
// Download the interface while GitHub verifies the saved connection.
const interfaceReady=import('./web/main.js?v=fast-open-20261108');
interfaceReady.catch(()=>{});
const initialBoard=await connectGitHub();
document.getElementById('app').innerHTML='<div id="root"></div>';
const backend=cloudBackend({readBoard,writeBoard,storage:sessionStorage,initialBoard});
setBackend(backend);
addEventListener('beforeunload',e=>{if(backend.pending()){e.preventDefault();e.returnValue=''}});
addEventListener('online',()=>backend('POST','/api/retry').catch(()=>{}));
(await interfaceReady).mountApp();
