/**
 * RUBY — Interaction Layer
 * -----------------------------------------------------------------------
 * Wires up behavior on top of the markup Render produced. One shared
 * hover-card node is reused for every poster (rather than one per card)
 * so this scales cleanly as the catalog grows.
 */

const Interactions = (() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const HOVER_OPEN_DELAY = 320; // ms — avoids flicker while scanning a row
  const HOVER_CLOSE_DELAY = 0; // close as soon as the pointer leaves
  const SLIDE_INTERVAL = 7000; // ms between automatic hero transitions

  let hoverCard = null;
  let openTimer = null;
  let closeTimer = null;
  let activeCardEl = null;
  let hoverCardMovie = null;

  /* ---------------------------------------------------------------- */
  /* Navbar                                                            */
  /* ---------------------------------------------------------------- */

  function initNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    const applyState = () => {
      nav.classList.toggle("navbar--solid", window.scrollY > 24);
    };
    applyState();
    window.addEventListener("scroll", applyState, { passive: true });

    initLogo(nav);
    initSearch(nav);
    initProfileMenu(nav);
  }

  /**
   * Loads assets/logo/logo.png into the navbar. If the file doesn't
   * exist yet (or fails to load), the existing "RUBY" text wordmark
   * stays exactly as it is — nothing breaks.
   */
  function initLogo(nav) {
    const brand = nav.querySelector("[data-brand-logo]");
    const wordmark = nav.querySelector("[data-brand-wordmark]");
    if (!brand || !wordmark) return;

    const logo = new Image();
    logo.onload = () => {
      logo.className = "brand-logo-img";
      logo.alt = "RUBY";
      wordmark.replaceWith(logo);
    };
    logo.onerror = () => {
      // assets/logo/logo.png not provided yet — keep the text wordmark.
    };
    logo.src = brand.dataset.brandLogo;
  }

  function initSearch(nav) {
    const trigger = nav.querySelector("[data-search-trigger]");
    const form = nav.querySelector("[data-search-form]");
    const input = nav.querySelector("[data-search-input]");
    if (!trigger || !form || !input) return;

    const close = () => {
      form.classList.remove("search-form--open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", () => {
      const isOpen = form.classList.toggle("search-form--open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        window.requestAnimationFrame(() => input.focus());
      }
    });

    document.addEventListener("click", (e) => {
      if (!form.contains(e.target) && !trigger.contains(e.target)) close();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
    });

    form.addEventListener("submit", (e) => e.preventDefault());
  }

  function initProfileMenu(nav) {
    const trigger = nav.querySelector("[data-profile-trigger]");
    const menu = nav.querySelector("[data-profile-menu]");
    if (!trigger || !menu) return;

    const close = () => {
      menu.classList.remove("profile-menu--open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("profile-menu--open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !trigger.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // RUBY has no real authentication — this only clears the demo profile
    // menu state and returns to Inicio, it doesn't call any backend.
    const logoutLink = menu.querySelector("[data-logout]");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        close();
        window.location.href = "index.html";
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Hero slider                                                       */
  /* ---------------------------------------------------------------- */

  /**
   * Autoplay + arrows + dots + pause-on-hover for the hero slider built
   * by Render.renderHeroSlider. Safe to call even if the slider only has
   * one slide (arrows/dots won't exist — see Render).
   */
  function initHeroSlider() {
    const slider = document.querySelector("[data-hero-slider]");
    const slidesWrap = document.querySelector("[data-hero-slides]");
    if (!slider || !slidesWrap) return;

    const slides = Array.from(slidesWrap.querySelectorAll(".hero-slide"));
    if (slides.length <= 1) return; // nothing to cycle through

    const prevBtn = slider.querySelector("[data-hero-prev]");
    const nextBtn = slider.querySelector("[data-hero-next]");
    const dots = Array.from(slider.querySelectorAll("[data-hero-dots] .hero-dot"));

    let current = 0;
    let timer = null;

    function goTo(index) {
      const next = (index + slides.length) % slides.length;
      slides[current].classList.remove("hero-slide--active");
      if (dots[current]) {
        dots[current].classList.remove("hero-dot--active");
        dots[current].setAttribute("aria-current", "false");
      }
      current = next;
      slides[current].classList.add("hero-slide--active");
      if (dots[current]) {
        dots[current].classList.add("hero-dot--active");
        dots[current].setAttribute("aria-current", "true");
      }
    }

    function next() {
      goTo(current + 1);
    }

    function restart() {
      stop();
      if (prefersReducedMotion) return; // no forced motion for this user
      timer = setInterval(next, SLIDE_INTERVAL);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    prevBtn &&
      prevBtn.addEventListener("click", () => {
        goTo(current - 1);
        restart();
      });
    nextBtn &&
      nextBtn.addEventListener("click", () => {
        goTo(current + 1);
        restart();
      });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goTo(i);
        restart();
      });
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", restart);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", restart);

    restart();
  }

  /* ---------------------------------------------------------------- */
  /* Row horizontal scrolling                                          */
  /* ---------------------------------------------------------------- */

  function initRowNav() {
    document.querySelectorAll(".row-track-wrap").forEach((wrap) => {
      const scroller = wrap.querySelector(".row-scroller");
      const prevBtn = wrap.querySelector(".row-nav--prev");
      const nextBtn = wrap.querySelector(".row-nav--next");
      if (!scroller || !prevBtn || !nextBtn) return;

      const step = () => scroller.clientWidth * 0.85;

      prevBtn.addEventListener("click", () => {
        scroller.scrollBy({
          left: -step(),
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      });
      nextBtn.addEventListener("click", () => {
        scroller.scrollBy({
          left: step(),
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      });

      const updateEdges = () => {
        const max = scroller.scrollWidth - scroller.clientWidth - 4;
        prevBtn.classList.toggle("row-nav--hidden", scroller.scrollLeft <= 4);
        nextBtn.classList.toggle("row-nav--hidden", scroller.scrollLeft >= max);
      };
      updateEdges();
      scroller.addEventListener("scroll", updateEdges, { passive: true });
      window.addEventListener("resize", updateEdges);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Hover detail card                                                 */
  /* ---------------------------------------------------------------- */

  function buildHoverCard() {
    const el = document.createElement("div");
    el.className = "hover-card";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <div class="hover-card__poster">
        <span class="hover-card__initial"></span>
        <span class="hover-card__spine"></span>
      </div>
      <div class="hover-card__body">
        <h3 class="hover-card__title"></h3>
        <div class="hover-card__meta"></div>
        <div class="hover-card__genres"></div>
        <p class="hover-card__desc"></p>
        <button
          type="button"
          class="btn btn--ghost hover-card__list-toggle"
          data-hover-list-toggle
          aria-pressed="false"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" data-hover-list-icon>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span data-hover-list-label>Agregar a Mi Lista</span>
        </button>
        <a href="#" class="btn btn--details" data-hover-details>Ver detalles</a>
      </div>
    `;
    document.body.appendChild(el);

    el.querySelector("[data-hover-list-toggle]").addEventListener("click", (e) => {
      e.preventDefault();
      handleHoverListToggle();
    });

    return el;
  }

  /**
   * Toggles the movie currently shown in the hover card in/out of
   * RubyList (js/lista.js — localStorage), then updates the button to
   * reflect the new state immediately. On mi-lista.html specifically,
   * removing a title also drops its card from the row right away
   * instead of waiting for a reload, falling back to the empty state
   * if that was the last one.
   */
  function handleHoverListToggle() {
    if (!hoverCardMovie || typeof RubyList === "undefined") return;

    const active = RubyList.toggle(hoverCardMovie.id);
    syncHoverListButton(hoverCardMovie);

    const emptyState = document.querySelector("[data-list-empty]");
    if (emptyState && !active && activeCardEl) {
      const cardToRemove = activeCardEl;
      const row = cardToRemove.closest(".row");
      closeHoverCardNow();
      cardToRemove.remove();

      const mount = document.querySelector("[data-rows-mount]");
      if (row && !row.querySelector(".card")) row.remove();
      if (mount && !mount.querySelector(".card")) {
        mount.innerHTML = "";
        emptyState.hidden = false;
      }
    }
  }

  /** Syncs the hover card's Mi Lista button (icon + label + aria-pressed) to RubyList. */
  function syncHoverListButton(movie) {
    const btn = hoverCard.querySelector("[data-hover-list-toggle]");
    if (!btn || typeof RubyList === "undefined") return;

    const icon = btn.querySelector("[data-hover-list-icon]");
    const label = btn.querySelector("[data-hover-list-label]");
    const active = RubyList.has(movie.id);

    btn.setAttribute("aria-pressed", String(active));
    label.textContent = active ? "En tu lista" : "Agregar a Mi Lista";
    icon.innerHTML = active
      ? '<polyline points="5 13 9 17 19 7" />'
      : '<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />';
  }

  function populateHoverCard(movie) {
    hoverCardMovie = movie;

    hoverCard.querySelector(".hover-card__initial").textContent =
      movie.titulo.charAt(0);
    const posterEl = hoverCard.querySelector(".hover-card__poster");
    posterEl.className = `hover-card__poster poster--tone-${movie.tono}`;

    const existingImg = posterEl.querySelector(".hover-card__poster-img");
    if (existingImg) existingImg.remove();
    posterEl.insertBefore(
      Render.imageWithFallback(movie.poster, movie.titulo, "hover-card__poster-img"),
      posterEl.querySelector(".hover-card__spine")
    );

    hoverCard.querySelector(".hover-card__spine").textContent = movie.spine;
    hoverCard.querySelector(".hover-card__title").textContent = movie.titulo;

    const metaWrap = hoverCard.querySelector(".hover-card__meta");
    metaWrap.innerHTML = "";
    metaWrap.appendChild(Render.metaRow(movie));

    const genresWrap = hoverCard.querySelector(".hover-card__genres");
    genresWrap.innerHTML = "";
    genresWrap.appendChild(Render.genreTags(movie.generos));

    hoverCard.querySelector(".hover-card__desc").textContent =
      movie.descripcionCorta;

    hoverCard.querySelector("[data-hover-details]").href =
      `pelicula.html?id=${movie.id}`;

    syncHoverListButton(movie);
  }

  function positionHoverCard(cardEl) {
    const rect = cardEl.getBoundingClientRect();
    const cardWidth = 270;
    const margin = 12;

    let left = rect.left + rect.width / 2 - cardWidth / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - cardWidth - margin));

    let top = rect.top - 30; // rise slightly above the poster
    const estHeight = 360; // hover-card now has 2 stacked action buttons
    if (top + estHeight > window.innerHeight - margin) {
      top = Math.max(margin, window.innerHeight - estHeight - margin);
    }

    hoverCard.style.left = `${left}px`;
    hoverCard.style.top = `${Math.max(margin, top)}px`;
    hoverCard.style.setProperty(
      "--origin-x",
      `${rect.left + rect.width / 2 - left}px`
    );
  }

  function openHoverCard(cardEl) {
    if (prefersReducedMotion) return; // keep interactions calm/instant-free
    clearTimeout(closeTimer);
    clearTimeout(openTimer);

    openTimer = setTimeout(() => {
      activeCardEl = cardEl;
      populateHoverCard(cardEl._movieData);
      positionHoverCard(cardEl);
      hoverCard.classList.add("hover-card--visible");
      hoverCard.setAttribute("aria-hidden", "false");
      cardEl.classList.add("card--active");
    }, HOVER_OPEN_DELAY);
  }

  function closeHoverCard(cardEl) {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      hoverCard.classList.remove("hover-card--visible");
      hoverCard.setAttribute("aria-hidden", "true");
      if (cardEl) cardEl.classList.remove("card--active");
      activeCardEl = null;
    }, HOVER_CLOSE_DELAY);
  }

  /**
   * Hides the hover card with no delay at all — used for scrolling, where
   * the card must never be allowed to drift away from the poster it's
   * anchored to.
   */
  function closeHoverCardNow() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    hoverCard.classList.remove("hover-card--visible");
    hoverCard.setAttribute("aria-hidden", "true");
    if (activeCardEl) activeCardEl.classList.remove("card--active");
    activeCardEl = null;
  }

  function initHoverCards() {
    hoverCard = buildHoverCard();

    hoverCard.addEventListener("mouseenter", () => clearTimeout(closeTimer));
    hoverCard.addEventListener("mouseleave", () => closeHoverCard(activeCardEl));

    document.querySelectorAll(".card").forEach((cardEl) => {
      cardEl.addEventListener("mouseenter", () => openHoverCard(cardEl));
      cardEl.addEventListener("mouseleave", () => closeHoverCard(cardEl));
      cardEl.addEventListener("focus", () => openHoverCard(cardEl));
      cardEl.addEventListener("blur", () => closeHoverCard(cardEl));
    });

    // Any scroll — the page itself or a horizontally-scrolling row — closes
    // the card instantly instead of letting it float disconnected from its
    // poster. Capture phase so it also catches scroll events from nested
    // scrollers like .row-scroller, which don't bubble.
    window.addEventListener("scroll", closeHoverCardNow, {
      passive: true,
      capture: true,
    });
  }

  /* ---------------------------------------------------------------- */
  /* Public init                                                        */
  /* ---------------------------------------------------------------- */

  function init() {
    initNavbar();
    initHeroSlider();
    initRowNav();
    initHoverCards();
  }

  return { init };
})();
