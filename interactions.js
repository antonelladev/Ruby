/**
 * REDFLIX — Interaction Layer
 * -----------------------------------------------------------------------
 * Wires up behavior on top of the markup Render produced. One shared
 * hover-card node is reused for every poster (rather than one per card)
 * so this scales cleanly as the catalog grows in later phases.
 */

const Interactions = (() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const HOVER_OPEN_DELAY = 320; // ms — avoids flicker while scanning a row
  const HOVER_CLOSE_DELAY = 140;

  let hoverCard = null;
  let openTimer = null;
  let closeTimer = null;
  let activeCardEl = null;

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

    initSearch(nav);
    initProfileMenu(nav);
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
        <a href="#" class="btn btn--details" data-hover-details>Ver detalles</a>
      </div>
    `;
    document.body.appendChild(el);
    return el;
  }

  function populateHoverCard(title) {
    hoverCard.querySelector(".hover-card__initial").textContent =
      title.title.charAt(0);
    const posterEl = hoverCard.querySelector(".hover-card__poster");
    posterEl.className = `hover-card__poster poster--tone-${title.tone}`;
    hoverCard.querySelector(".hover-card__spine").textContent = title.spine;
    hoverCard.querySelector(".hover-card__title").textContent = title.title;

    const metaWrap = hoverCard.querySelector(".hover-card__meta");
    metaWrap.innerHTML = "";
    metaWrap.appendChild(Render.metaRow(title));

    const genresWrap = hoverCard.querySelector(".hover-card__genres");
    genresWrap.innerHTML = "";
    genresWrap.appendChild(Render.genreTags(title.genres));

    hoverCard.querySelector(".hover-card__desc").textContent =
      title.description;

    hoverCard.querySelector("[data-hover-details]").href =
      `pelicula.html?id=${title.id}`;
  }

  function positionHoverCard(cardEl) {
    const rect = cardEl.getBoundingClientRect();
    const cardWidth = 300;
    const margin = 12;

    let left = rect.left + rect.width / 2 - cardWidth / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - cardWidth - margin));

    let top = rect.top - 34; // rise slightly above the poster
    const estHeight = 340;
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
      populateHoverCard(cardEl._titleData);
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
  }

  /* ---------------------------------------------------------------- */
  /* Public init                                                        */
  /* ---------------------------------------------------------------- */

  function init() {
    initNavbar();
    initRowNav();
    initHoverCards();
  }

  return { init };
})();
