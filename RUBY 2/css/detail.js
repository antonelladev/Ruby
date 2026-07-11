/**
 * RUBY — Detail Page Controller
 * -----------------------------------------------------------------------
 * pelicula.html is a single template. This script reads the `id` query
 * param, looks it up in RUBY_ALL_TITLES (js/data.js), and fills in
 * the DOM. If the id doesn't resolve to a title, it shows the 404 state
 * instead of a broken page.
 */

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const title = id ? findTitleById(id) : null;

  if (!title) {
    showNotFound();
    return;
  }

  document.title = `${title.title} (${title.year}) — RUBY`;
  renderDetail(title);
  renderRelated(title);
  Interactions.init();
  initListToggle();
  initShare(title);
});

function showNotFound() {
  const notFound = document.querySelector("[data-not-found]");
  if (notFound) notFound.hidden = false;
}

function renderDetail(title) {
  const root = document.querySelector("[data-detail-root]");
  if (root) root.hidden = false;

  document.querySelector("[data-poster]").classList.add(`poster--tone-${title.tone}`);
  document.querySelector("[data-poster-initial]").textContent = title.title.charAt(0);
  document.querySelector("[data-poster-spine]").textContent = title.spine;

  document.querySelector("[data-banner-backdrop]").classList.add(`backdrop--tone-${title.tone}`);

  document.querySelector("[data-movie-title]").textContent = title.title;
  document.querySelector("[data-movie-tagline]").textContent = title.tagline || "";

  const metaWrap = document.querySelector("[data-movie-meta]");
  metaWrap.innerHTML = "";
  const maturityBadge = document.createElement("span");
  maturityBadge.className = "meta-item meta-maturity";
  maturityBadge.textContent = title.maturity;
  metaWrap.appendChild(maturityBadge);
  metaWrap.appendChild(Render.metaRow(title));

  document.querySelector("[data-movie-genres]").replaceWith(
    (() => {
      const el = Render.genreTags(title.genres);
      el.classList.add("movie-genre-tags");
      el.setAttribute("data-movie-genres", "");
      return el;
    })()
  );

  document.querySelector("[data-movie-synopsis]").textContent = title.synopsis;

  document.querySelector("[data-fs-director]").textContent = title.director;
  document.querySelector("[data-fs-cast]").textContent = title.cast.join(", ");
  document.querySelector("[data-fs-duration]").textContent = title.duration;
  document.querySelector("[data-fs-year]").textContent = title.year;
  document.querySelector("[data-fs-maturity]").textContent = title.maturity;
  document.querySelector("[data-fs-languages]").textContent = title.languages.join(", ");
  document.querySelector("[data-fs-genres]").textContent = title.genres.join(", ");
  document.querySelector("[data-fs-rating]").innerHTML =
    `<span class="rating-mark" aria-hidden="true">&#9733;</span>${title.rating} / 5`;
}

function renderRelated(title) {
  const mount = document.querySelector("[data-related-mount]");
  if (!mount) return;

  const similar = findSimilarTitles(title, 10);
  Render.buildRow({ id: "similares", label: "Películas similares", titles: similar }, mount);

  const moreLikeThis = findMoreLikeThis(title, similar, 10);
  Render.buildRow({ id: "mas-como-esta", label: "Más como esta", titles: moreLikeThis }, mount);
}

function initListToggle() {
  const btn = document.querySelector("[data-list-toggle]");
  if (!btn) return;
  const label = btn.querySelector("[data-list-label]");
  const icon = btn.querySelector("[data-list-icon]");

  btn.addEventListener("click", () => {
    const active = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!active));
    label.textContent = active ? "Agregar a Mi Lista" : "En tu lista";
    icon.innerHTML = active
      ? '<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />'
      : '<polyline points="5 13 9 17 19 7" />';
    showToast(active ? "Se quitó de Mi Lista" : "Se agregó a Mi Lista");
  });
}

function initShare(title) {
  const btn = document.querySelector("[data-share]");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title.title} — RUBY`, url });
      } catch (err) {
        // User cancelled the native share sheet — no action needed.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("Enlace copiado");
    } catch (err) {
      showToast("No se pudo copiar el enlace");
    }
  });
}

let toastTimer = null;
function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("toast--visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("toast--visible"), 2400);
}
