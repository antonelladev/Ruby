/**
 * REDFLIX — Entry Point
 * -----------------------------------------------------------------------
 * Keeps orchestration in one small place: read data, render it, wire
 * interactions. Later phases (routing, auth-aware nav, live catalog
 * fetches) can extend this sequence without restructuring the app.
 */

document.addEventListener("DOMContentLoaded", () => {
  const rowsMount = document.querySelector("[data-rows-mount]");

  Render.renderHero(REDFLIX_CATALOG.featured);
  if (rowsMount) {
    Render.renderCategories(REDFLIX_CATALOG.categories, rowsMount);
  }

  Interactions.init();
});
