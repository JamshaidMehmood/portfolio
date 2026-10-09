export type Theme = "dark" | "light";

export const THEME_KEY = "jm-theme";

/**
 * Runs before first paint, inlined in <head>. Without it the document
 * renders in the default theme for a frame and then snaps — the usual
 * flash — because localStorage can only be read on the client.
 */
export const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('${THEME_KEY}');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`.trim();
