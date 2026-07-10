/**
 * RUBY — Detail Page Controller
 * -----------------------------------------------------------------------
 * pelicula.html is a single template. This script reads the `id` query
 * param, looks it up in RUBY_MOVIES (js/movies.js), and fills in the DOM.
 * If the id doesn't resolve to a movie, it shows the 404 state instead
 * of a broken page.
 */

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const movie = id ? findMovieById(id) : null;

  if (!movie) {
    showNotFound();
    return;
  }

  document.title = `${movie.titulo} (${movie.año}) — RUBY`;
  renderDetail(movie);
  renderRelated(movie);
  Interactions.init();
  initListToggle();
  initShare(movie);
});

function showNotFound() {
  const notFound = document.querySelector("[data-not-found]");
  if (notFound) notFound.hidden = false;
}

function renderDetail(movie) {
  const root = document.querySelector("[data-detail-root]");
  if (root) root.hidden = false;

  const posterEl = document.querySelector("[data-poster]");
  posterEl.classList.add(`poster--tone-${movie.tono}`);
  posterEl.insertBefore(
    Render.imageWithFallback(movie.poster, movie.titulo, "poster-img", { eager: true }),
    document.querySelector("[data-poster-spine]")
  );
  document.querySelector("[data-poster-initial]").textContent = movie.titulo.charAt(0);
  document.querySelector("[data-poster-spine]").textContent = movie.spine;

  const backdropEl = document.querySelector("[data-banner-backdrop]");
  backdropEl.classList.add(`backdrop--tone-${movie.tono}`);
  backdropEl.insertBefore(
    Render.imageWithFallback(movie.banner, movie.titulo, "movie-banner-backdrop-img", { eager: true }),
    backdropEl.firstChild
  );

  document.querySelector("[data-movie-title]").textContent = movie.titulo;
  document.querySelector("[data-movie-tagline]").textContent = movie.tagline || "";

  const metaWrap = document.querySelector("[data-movie-meta]");
  metaWrap.innerHTML = "";
  const maturityBadge = document.createElement("span");
  maturityBadge.className = "meta-item meta-maturity";
  maturityBadge.textContent = movie.clasificacion;
  metaWrap.appendChild(maturityBadge);
  metaWrap.appendChild(Render.metaRow(movie));

  document.querySelector("[data-movie-genres]").replaceWith(
    (() => {
      const el = Render.genreTags(movie.generos);
      el.classList.add("movie-genre-tags");
      el.setAttribute("data-movie-genres", "");
      return el;
    })()
  );

  document.querySelector("[data-movie-synopsis]").textContent = movie.descripcion;

  document.querySelector("[data-fs-director]").textContent = movie.director;
  document.querySelector("[data-fs-cast]").textContent = movie.actores.join(", ");
  document.querySelector("[data-fs-duration]").textContent = movie.duracion;
  document.querySelector("[data-fs-year]").textContent = movie.año;
  document.querySelector("[data-fs-maturity]").textContent = movie.clasificacion;
  document.querySelector("[data-fs-languages]").textContent = movie.idiomas.join(", ");
  document.querySelector("[data-fs-genres]").textContent = movie.generos.join(", ");
  document.querySelector("[data-fs-rating]").innerHTML =
    `<span class="rating-mark" aria-hidden="true">&#9733;</span>${movie.rating} / 5`;
}

function renderRelated(movie) {
  const mount = document.querySelector("[data-related-mount]");
  if (!mount) return;

  const similar = findSimilarMovies(movie, 10);
  Render.buildRow({ id: "similares", label: "Películas similares", titles: similar }, mount);

  const moreLikeThis = findMoreLikeThis(movie, similar, 10);
  Render.buildRow({ id: "mas-como-esta", label: "Más como esta", titles: moreLikeThis }, mount);

  const recommended = findRecommended(movie, 10);
  Render.buildRow({ id: "recomendadas", label: "Recomendadas", titles: recommended }, mount);
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

function initShare(movie) {
  const btn = document.querySelector("[data-share]");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${movie.titulo} — RUBY`, url });
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
