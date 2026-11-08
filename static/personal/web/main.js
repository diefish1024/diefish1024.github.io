import { html, render } from "./vendor/preact-htm.js";
import { App } from "./components/App.js?v=local-shell-20261108";

export function mountApp(){
 render(html`<${App} />`, document.getElementById("root"));
 // On iPhone, :active styles need a touchstart listener.
 document.addEventListener("touchstart", () => {}, { passive: true });
}
