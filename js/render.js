/**
 * RUBY — Render Layer
 * -----------------------------------------------------------------------
 * Pure(ish) DOM construction. Nothing in here attaches event listeners —
 * that responsibility belongs to interactions.js. Keeping the split lets
 * later phases swap the render strategy (e.g. virtualized rows) without
 * touching interaction logic, and vice versa.
 */

const Render = (() => {
  /**
   * Builds the corner spine-number badge shared by poster and hover card.
   */
  function spineBadge(spine) {
    const el = document.createElement("span");
    el.className = "spine";
    el.textContent = spine;
    return el;
  }

  function metaRow({ year, duration, rating }) {
    const row = document.createElement("div");
    row.className = "meta-row";

    const parts = [
      { text: year, cls: "meta-year" },
      { text: duration, cls: "meta-duration" },
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

  function genreTags(genres) {
    const wrap = document.createElement("div");
    wrap.className = "genre-tags";
    genres.forEach((g) => {
      const tag = document.createElement("span");
      tag.className = "genre-tag";
      tag.textContent = g;
      wrap.appendChild(tag);
    });
    return wrap;
  }

  /**
   * A single poster card. The hover card itself is NOT built here —
   * interactions.js builds one shared hover-card node on demand and
   * repositions/repopulates it, which is far cheaper than one hidden
   * hover-card per poster in a catalog that may grow to hundreds of titles.
   */
  function createCard(title, categoryId) {
    const card = document.createElement("a");
    card.className = "card";
    card.href = `pelicula.html?id=${title.id}`;
    card.dataset.spine = title.spine;
    card.dataset.category = categoryId;
    card.dataset.id = title.id;

    const poster = document.createElement("div");
    poster.className = `poster poster--tone-${title.tone}`;

    const posterInner = document.createElement("div");
    posterInner.className = "poster-inner";
    const initial = document.createElement("span");
    initial.className = "poster-initial";
    initial.textContent = title.title.charAt(0);
    posterInner.appendChild(initial);
    poster.appendChild(posterInner);
    poster.appendChild(spineBadge(title.spine));

    const info = document.createElement("div");
    info.className = "card-info";
    const cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.textContent = title.title;
    info.appendChild(cardTitle);
    info.appendChild(metaRow(title));

    card.appendChild(poster);
    card.appendChild(info);

    // Stash full record on the element for interactions.js to read on hover.
    card._titleData = title;

    return card;
  }

  function renderHero(featured) {
    const heroTitle = document.querySelector("[data-hero-title]");
    const heroTagline = document.querySelector("[data-hero-tagline]");
    const heroDesc = document.querySelector("[data-hero-description]");
    const heroMeta = document.querySelector("[data-hero-meta]");
    const heroSpine = document.querySelector("[data-hero-spine]");
    const heroTone = document.querySelector("[data-hero-backdrop]");

    if (heroTitle) heroTitle.textContent = featured.title;
    if (heroTagline) heroTagline.textContent = featured.tagline;
    if (heroDesc) heroDesc.textContent = featured.description;
    if (heroSpine) heroSpine.textContent = featured.spine;
    if (heroTone) heroTone.classList.add(`backdrop--tone-${featured.tone}`);

    const heroInfoLink = document.querySelector("[data-hero-info]");
    if (heroInfoLink) heroInfoLink.href = `pelicula.html?id=${featured.id}`;

    if (heroMeta) {
      heroMeta.innerHTML = "";
      heroMeta.appendChild(
        (() => {
          const badge = document.createElement("span");
          badge.className = "meta-item meta-maturity";
          badge.textContent = featured.maturity;
          return badge;
        })()
      );
      heroMeta.appendChild(dot());
      heroMeta.appendChild(metaRow(featured));
      const genresLine = document.createElement("span");
      genresLine.className = "hero-genres";
      genresLine.textContent = featured.genres.join(" \u00B7 ");
      heroMeta.appendChild(genresLine);
    }
  }

  /**
   * Builds one horizontal row (heading + scroll-snapped cards + prev/next
   * nav) and appends it to `mount`. Used both for home-page categories and
   * for the detail page's "Películas similares" / "Más como esta" rows,
   * so the two pages never diverge visually.
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

    titles.forEach((title) => {
      scroller.appendChild(createCard(title, id));
    });

    track.appendChild(prevBtn);
    track.appendChild(scroller);
    track.appendChild(nextBtn);
    section.appendChild(track);

    mount.appendChild(section);
    return section;
  }

  function renderCategories(categories, mount) {
    categories.forEach((category) => buildRow(category, mount));
  }

  return {
    renderHero,
    renderCategories,
    buildRow,
    createCard,
    genreTags,
    metaRow,
  };
})();
