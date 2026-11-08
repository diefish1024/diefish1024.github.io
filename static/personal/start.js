import {connectGitHub,readBoard,writeBoard,connectionOpening} from './github-store.js?v=cached-open-20261108';
import {setBackend} from './web/lib/api.js';
import {cloudBackend} from './todo-adapter.js?v=cached-open-20261108';
import {setOpeningBackend} from './web/lib/opening-state.js';
// Download the interface while GitHub verifies the saved connection.
const interfaceReady=import('./web/main.js?v=cached-open-20261108');
interfaceReady.catch(()=>{});
const initialBoard=await connectGitHub();
document.getElementById('app').innerHTML='<div id="root"></div>';
const backend=cloudBackend({readBoard,writeBoard,storage:sessionStorage,initialBoard,...connectionOpening()});
setBackend(backend);
setOpeningBackend(backend);
addEventListener('beforeunload',e=>{if(backend.pending()){e.preventDefault();e.returnValue=''}});
addEventListener('online',()=>backend(backend.pending()?'POST':'GET',backend.pending()?'/api/retry':'/api/todo').catch(()=>{}));
(await interfaceReady).mountApp();
