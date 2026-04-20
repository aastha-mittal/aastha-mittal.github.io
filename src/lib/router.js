/** Vite `BASE_URL` is `/` or `/repo/` — React Router basename has leading slash, no trailing slash. */
export function getRouterBasename() {
  let b = import.meta.env.BASE_URL;
  if (b === "/" || b === "") return undefined;
  return b.endsWith("/") ? b.slice(0, -1) : b;
}
