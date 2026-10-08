import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, AppRoutes, BASENAME } from "./App";

// Build-time only: renders the home route to static HTML (see scripts/prerender.mjs).
export function render() {
  return renderToString(
    <AppShell>
      <StaticRouter basename={BASENAME} location={`${BASENAME}/`}>
        <AppRoutes />
      </StaticRouter>
    </AppShell>
  );
}
