/**
 * RUBY — Render Layer
 * -----------------------------------------------------------------------
 * Pure(ish) DOM construction, driven entirely by js/movies.js. Nothing in
 * here attaches event listeners — that's interactions.js. Keeping the
 * split lets the render strategy change later without touching
 * interaction logic, and vice versa.
 */

const Render = (() => {
  /**
   * An <img> that fades in once loaded and quietly removes itself if the
   * file is missing, letting whatever gradient/initial sits behind it
   * show through untouched. This is the one place image-fallback
   * behavior lives — every poster, hover-card thumbnail, hero banner and
   * detail banner reuses it.
   */
  function imageWithFallback(src, alt, className, { eager = false } = {}) {
    const img = document.createElement("img");
    img.className = className;
    img.alt = alt;
    img.loading = eager ? "eager" : "lazy";
    if (eager) img.setAttribute("fetchpriority", "high");
    img.addEventListener("load", () => img.classList.add("is-loaded"));
    img.addEventListener("error", () => img.remove());
    img.src = src;
    return img;
  }

  /**
   * Builds the corner spine-number badge shared by poster and hover card.
   */
  function spineBadge(spine) {
    const el = document.createElement("span");
    el.className = "spine";
    el.textContent = spine;
    return el;
  }

  function metaRow({ año, duracion, rating }) {
    const row = document.createElement("div");
    row.className = "meta-row";

    const parts = [
      { text: año, cls: "meta-year" },
      { text: duracion, cls: "meta-duration" },
    ];

    parts.forEach((p, i) => {
      const span = document.createElement("span");
      span.className = `meta-item ${p.cls}`;
      span.textContent = p.text;
      row.appendChild(span);
      if (i < parts.length - 1) row.appendChild(dot());
    });

    if (rating) {
      row.appendChild(dot());
      const ratingEl = document.createElement("span");
      ratingEl.className = "meta-item meta-rating";
      ratingEl.innerHTML = `<span class="rating-mark" aria-hidden="true">&#9733;</span>${rating}`;
      row.appendChild(ratingEl);
    }

    return row;
  }

  function dot() {
    const d = document.createElement("span");
    d.className = "meta-dot";
    d.setAttribute("aria-hidden", "true");
    d.textContent = "\u00B7";
    return d;
  }

  function genreTags(generos) {
    const wrap = document.createElement("div");
    wrap.className = "genre-tags";
    generos.forEach((g) => {
      const tag = document.createElement("span");
      tag.className = "genre-tag";
      tag.textContent = g;
      wrap.appendChild(tag);
    });
    return wrap;
  }

  /**
   * The poster visual shared by cards, the hover card, and the detail
   * page: a tone gradient + initial (always present, instant) with the
   * real poster image layered on top once it loads.
   */
  function posterVisual(movie, { initialSize } = {}) {
    const poster = document.createElement("div");
    poster.className = `poster poster--tone-${movie.tono}`;

    const inner = document.createElement("div");
    inner.className = "poster-inner";
    const initial = document.createElement("span");
    initial.className = "poster-initial";
    if (initialSize) initial.style.fontSize = initialSize;
    initial.textContent = movie.titulo.charAt(0);
    inner.appendChild(initial);
    poster.appendChild(inner);

    poster.appendChild(imageWithFallback(movie.poster, movie.titulo, "poster-img"));
    poster.appendChild(spineBadge(movie.spine));

    return poster;
  }

  /**
   * A single poster card. The hover card itself is NOT built here —
   * interactions.js builds one shared hover-card node on demand and
   * repositions/repopulates it, which is far cheaper than one hidden
   * hover-card per poster in a catalog that may grow to hundreds of titles.
   */
  function createCard(movie, categoryId) {
    const card = document.createElement("a");
    card.className = "card";
    card.href = `pelicula.html?id=${movie.id}`;
    card.dataset.spine = movie.spine;
    card.dataset.category = categoryId;
    card.dataset.id = movie.id;

    const info = document.createElement("div");
    info.className = "card-info";
    const cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.textContent = movie.titulo;
    info.appendChild(cardTitle);
    info.appendChild(metaRow(movie));

    card.appendChild(posterVisual(movie));
    card.appendChild(info);

    // Stash the full record on the element for interactions.js to read on hover.
    card._movieData = movie;

    return card;
  }

  /**
   * Builds one <div class="hero-slide"> for the hero slider from a
   * featured movie. Reused for every slide — no per-slide markup is
   * ever hand-written.
   */
  function buildHeroSlide(movie, index) {
    const slide = document.createElement("div");
    slide.className = "hero-slide";
    slide.dataset.slideIndex = String(index);
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "diapositiva");
    slide.setAttribute("aria-label", `${movie.titulo} — destacada`);

    const backdrop = document.createElement("div");
    backdrop.className = `hero-backdrop backdrop--tone-${movie.tono}`;
    backdrop.appendChild(
      imageWithFallback(movie.banner, movie.titulo, "hero-backdrop-img", {
        eager: index === 0,
      })
    );

    const grain = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    grain.setAttribute("class", "hero-grain");
    grain.setAttribute("aria-hidden", "true");
    const filterId = `grain-${movie.id}`;
    grain.innerHTML = `
      <filter id="${filterId}">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"></feColorMatrix>
      </filter>
      <rect width="100%" height="100%" filter="url(#${filterId})"></rect>
    `;
    backdrop.appendChild(grain);

    const content = document.createElement("div");
    content.className = "hero-content";

    content.appendChild(
      (() => {
        const s = document.createElement("span");
        s.className = "spine hero-spine";
        s.textContent = movie.spine;
        return s;
      })()
    );

    const title = document.createElement("h1");
    title.className = "hero-title";
    title.textContent = movie.titulo;
    content.appendChild(title);

    if (movie.tagline) {
      const tagline = document.createElement("p");
      tagline.className = "hero-tagline";
      tagline.textContent = movie.tagline;
      content.appendChild(tagline);
    }

    const meta = document.createElement("div");
    meta.className = "hero-meta";
    const maturityBadge = document.createElement("span");
    maturityBadge.className = "meta-item meta-maturity";
    maturityBadge.textContent = movie.clasificacion;
    meta.appendChild(maturityBadge);
    meta.appendChild(dot());
    meta.appendChild(metaRow(movie));
    const genresLine = document.createElement("span");
    genresLine.className = "hero-genres";
    genresLine.textContent = movie.generos.join(" \u00B7 ");
    meta.appendChild(genresLine);
    content.appendChild(meta);

    const description = document.createElement("p");
    description.className = "hero-description";
    description.textContent = movie.descripcionCorta;
    content.appendChild(description);

    const actions = document.createElement("div");
    actions.className = "hero-actions";

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "btn btn--primary";
    playBtn.innerHTML =
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Ver ahora';
    actions.appendChild(playBtn);

    const infoLink = document.createElement("a");
    infoLink.className = "btn btn--text";
    infoLink.href = `pelicula.html?id=${movie.id}`;
    infoLink.textContent = "Más información";
    actions.appendChild(infoLink);

    content.appendChild(actions);

    slide.appendChild(backdrop);
    slide.appendChild(content);
    return slide;
  }

  /**
   * Builds the full hero slider (slides + arrows + dots) from
   * getFeaturedMovies() and mounts it. Autoplay/pause/keyboard behavior
   * is wired separately by Interactions.initHeroSlider — this function
   * only builds markup.
   */
  function renderHeroSlider(mount) {
    if (!mount) return;
    const movies = getFeaturedMovies();

    const slidesWrap = document.createElement("div");
    slidesWrap.className = "hero-slides";
    slidesWrap.setAttribute("data-hero-slides", "");
    movies.forEach((movie, i) => {
      const slide = buildHeroSlide(movie, i);
      if (i === 0) slide.classList.add("hero-slide--active");
      slidesWrap.appendChild(slide);
    });
    mount.appendChild(slidesWrap);

    if (movies.length > 1) {
      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "hero-arrow hero-arrow--prev";
      prev.setAttribute("data-hero-prev", "");
      prev.setAttribute("aria-label", "Película destacada anterior");
      prev.innerHTML = "&#8249;";

      const next = document.createElement("button");
      next.type = "button";
      next.className = "hero-arrow hero-arrow--next";
      next.setAttribute("data-hero-next", "");
      next.setAttribute("aria-label", "Siguiente película destacada");
      next.innerHTML = "&#8250;";

      const dots = document.createElement("div");
      dots.className = "hero-dots";
      dots.setAttribute("data-hero-dots", "");
      dots.setAttribute("role", "group");
      dots.setAttribute("aria-label", "Seleccionar película destacada");
      movies.forEach((movie, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot";
        if (i === 0) dot.classList.add("hero-dot--active");
        dot.dataset.dotIndex = String(i);
        dot.setAttribute("aria-current", i === 0 ? "true" : "false");
        dot.setAttribute("aria-label", `Ir a "${movie.titulo}"`);
        dots.appendChild(dot);
      });

      mount.appendChild(prev);
      mount.appendChild(next);
      mount.appendChild(dots);
    }
  }

  /**
   * Builds one horizontal row (heading + scroll-snapped cards + prev/next
   * nav) and appends it to `mount`. Used for home-page categories, the
   * detail page's related rows, so they never diverge visually.
   */
  function buildRow({ id, label, titles }, mount) {
    if (!titles.length) return null;

    const section = document.createElement("section");
    section.className = "row";
    section.id = `row-${id}`;
    section.setAttribute("aria-label", label);

    const header = document.createElement("div");
    header.className = "row-header";
    const heading = document.createElement("h2");
    heading.className = "row-title";
    heading.textContent = label;
    header.appendChild(heading);
    section.appendChild(header);

    const track = document.createElement("div");
    track.className = "row-track-wrap";

    const prevBtn = document.createElement("button");
    prevBtn.className = "row-nav row-nav--prev";
    prevBtn.setAttribute("aria-label", `Retroceder en ${label}`);
    prevBtn.innerHTML = "&#8249;";

    const nextBtn = document.createElement("button");
    nextBtn.className = "row-nav row-nav--next";
    nextBtn.setAttribute("aria-label", `Avanzar en ${label}`);
    nextBtn.innerHTML = "&#8250;";

    const scroller = document.createElement("div");
    scroller.className = "row-scroller";
    scroller.dataset.categoryId = id;

    titles.forEach((movie) => {
      scroller.appendChild(createCard(movie, id));
    });

    track.appendChild(prevBtn);
    track.appendChild(scroller);
    track.appendChild(nextBtn);
    section.appendChild(track);

    mount.appendChild(section);
    return section;
  }

  /**
   * Builds every category row directly from movies.js (see
   * getCategories()) — add a movie with a new `categoria` and a new row
   * appears here automatically, no HTML changes required.
   */
  function renderCategoryRows(mount) {
    if (!mount) return;
    getCategories().forEach((category) => buildRow(category, mount));
  }

  /**
   * Builds the "Todas las películas" row directly from RUBY_MOVIES — the
   * entire catalog, in catalog order. Add a movie to js/movies.js and it
   * appears here automatically, same as every category row.
   */
  function renderAllMoviesRow(mount) {
    if (!mount) return;
    buildRow({ id: "todas", label: "Todas las películas", titles: RUBY_MOVIES }, mount);
  }

  return {
    renderHeroSlider,
    renderCategoryRows,
    renderAllMoviesRow,
    buildRow,
    createCard,
    posterVisual,
    imageWithFallback,
    genreTags,
    metaRow,
  };
})();
