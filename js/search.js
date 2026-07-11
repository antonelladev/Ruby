/**
 * RUBY — Search
 * -----------------------------------------------------------------------
 * Real-time title search wired onto the existing navbar search form
 * (data-search-form / data-search-input, present on every page).
 * js/interactions.js already owns opening/closing that form (the
 * magnifying-glass trigger, outside-click, Escape) — this module never
 * duplicates that. It only listens for typing, and for the form losing
 * its "search-form--open" state, so the results panel can never drift
 * out of sync with the input being visible/interactable.
 *
 * Matches are searched by título only, across the combined catalog
 * (RUBY_ALL_TITLES — películas + series, see js/series.js), and
 * rendered with the exact same Render.createCard used by every row in
 * the app, so a result card looks and behaves (click-through to
 * pelicula.html) identically to any other poster card.
 */

const Search = (() => {
  const MAX_RESULTS = 24;

  /** Lowercases and strips accents so "matrix" also finds "Matrix", "Peliculón" etc. */
  function normalize(str) {
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function findMatches(query) {
    if (typeof RUBY_ALL_TITLES === "undefined") return [];
    const q = normalize(query);
    if (!q) return [];
    return RUBY_ALL_TITLES.filter((title) =>
      normalize(title.titulo).includes(q)
    ).slice(0, MAX_RESULTS);
  }

  function buildEmptyState(query) {
    const el = document.createElement("div");
    el.className = "search-results__empty";

    const icon = document.createElement("span");
    icon.className = "search-results__empty-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
      '<circle cx="11" cy="11" r="7" />' +
      '<line x1="21" y1="21" x2="16.2" y2="16.2" />' +
      "</svg>";

    const title = document.createElement("p");
    title.className = "search-results__empty-title";
    title.textContent = "Sin resultados";

    const text = document.createElement("p");
    text.className = "search-results__empty-text";
    text.textContent = `No encontramos títulos que coincidan con "${query}".`;

    el.appendChild(icon);
    el.appendChild(title);
    el.appendChild(text);
    return el;
  }

  /**
   * Builds and wires the results panel for a single navbar search form,
   * then mounts it inside that form (which is already `position:
   * relative`, so the panel can anchor to it like .profile-menu anchors
   * to .profile).
   */
  function initSearchPanel(form) {
    const input = form.querySelector("[data-search-input]");
    if (!input || typeof Render === "undefined") return;

    const panel = document.createElement("div");
    panel.className = "search-results";
    panel.setAttribute("data-search-results", "");
    panel.hidden = true;

    const meta = document.createElement("p");
    meta.className = "search-results__meta";

    const grid = document.createElement("div");
    grid.className = "search-results__grid";

    panel.appendChild(meta);
    panel.appendChild(grid);
    form.appendChild(panel);

    function close() {
      panel.classList.remove("search-results--open");
      panel.hidden = true;
    }

    function renderResults(query) {
      const matches = findMatches(query);
      grid.innerHTML = "";

      if (!matches.length) {
        meta.textContent = "";
        grid.appendChild(buildEmptyState(query));
      } else {
        meta.textContent =
          matches.length === 1
            ? `1 resultado para "${query}"`
            : `${matches.length} resultados para "${query}"`;
        matches.forEach((title) => {
          grid.appendChild(Render.createCard(title, "search"));
        });
      }

      panel.hidden = false;
      panel.classList.add("search-results--open");
    }

    input.addEventListener("input", () => {
      const query = input.value.trim();
      if (!query) {
        close();
        grid.innerHTML = "";
        meta.textContent = "";
        return;
      }
      renderResults(query);
    });

    // Enter jumps straight to the first match's detail page — a
    // convenience on top of the real-time results, not a replacement
    // for them.
    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      const firstCard = grid.querySelector(".card");
      if (firstCard) firstCard.click();
    });

    // The form's open/closed state (trigger click, outside click,
    // Escape) is entirely owned by Interactions.initSearch. Watching
    // its class is cheaper and safer than re-implementing those same
    // close conditions here.
    const formObserver = new MutationObserver(() => {
      if (!form.classList.contains("search-form--open")) close();
    });
    formObserver.observe(form, { attributes: true, attributeFilter: ["class"] });
  }

  function init() {
    document.querySelectorAll("[data-search-form]").forEach(initSearchPanel);
  }

  return { init, findMatches };
})();

document.addEventListener("DOMContentLoaded", () => Search.init());
