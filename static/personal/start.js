import {connectGitHub,readBoard,mutateBoard} from './github-store.js';
import {setBackend} from './web/lib/api.js';
import {cloudBackend} from './todo-adapter.js';
await connectGitHub();
document.getElementById('app').innerHTML='<div id="root"></div>';
setBackend(cloudBackend({readBoard,mutateBoard}));
await import('./web/main.js');
