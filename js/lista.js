/**
 * RUBY — Mi Lista
 * -----------------------------------------------------------------------
 * A small localStorage-backed store shared by the "Agregar a Mi Lista"
 * button on pelicula.html and the mi-lista.html catalog page. It only
 * ever stores ids — title data is always re-read from js/movies.js /
 * js/series.js via findTitleById, so this file has zero knowledge of
 * the catalog shape and works the same for películas and series.
 */

const RubyList = (() => {
  const STORAGE_KEY = "ruby:mi-lista";

  function getIds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveIds(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (err) {
      // Storage unavailable (private browsing, quota) — fail silently,
      // the toggle button just won't persist across reloads.
    }
  }

  function has(id) {
    return getIds().includes(id);
  }

  /** Adds/removes `id` and returns the resulting state (true = now saved). */
  function toggle(id) {
    const ids = getIds();
    const index = ids.indexOf(id);
    if (index === -1) {
      ids.push(id);
      saveIds(ids);
      return true;
    }
    ids.splice(index, 1);
    saveIds(ids);
    return false;
  }

  /** Resolves every saved id against the catalog, dropping any that no longer exist. */
  function getTitles() {
    return getIds()
      .map((id) => findTitleById(id))
      .filter(Boolean);
  }

  return { has, toggle, getTitles };
})();
