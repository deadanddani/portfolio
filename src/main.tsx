import ReactDOM from 'react-dom/client'
import App, { BASENAME } from './App.tsx'
import './index.css'

const container = document.getElementById("root")!;

// The home route is prerendered at build time; hydrate it. Any other path
// (served from 404.html, which holds the same prerendered home markup) renders fresh.
const isHome = window.location.pathname.replace(/\/+$/, "") === BASENAME;

if (isHome && container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, <App />);
} else {
  container.innerHTML = "";
  ReactDOM.createRoot(container).render(<App />);
}
