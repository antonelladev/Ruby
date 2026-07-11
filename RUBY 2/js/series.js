/**
 * RUBY — Series Catalog
 * -----------------------------------------------------------------------
 * Mirrors js/movies.js on purpose: same object shape, same field names
 * (titulo, generos, director, actores, rating, poster, banner, tono,
 * categoria...) so a "title" — movie or series — can be rendered by the
 * exact same components (Render.createCard, Render.buildRow, the hover
 * card, pelicula.html) with zero branching in the render layer.
 *
 * The one addition is `temporadas` (season count). Its presence is what
 * marks an object as a series — see isSerie() below — and the detail
 * page swaps "Duración" for "Temporadas" in the factsheet when it's set.
 * `duracion` is still filled in (e.g. "5 temporadas") purely so the
 * shared meta-row component (año · duracion · rating) has something to
 * print without needing to know which kind of title it's looking at.
 *
 * To add a new series: drop a poster/banner in assets/ (same convention
 * as movies.js) and add an object below. It will automatically appear
 * on series.html, grouped by `categoria`, and get a working detail page.
 *
 * Synopses are written for RUBY (original wording), not copied from
 * official marketing copy.
 */

// New genre slugs introduced by the series catalog. Movie categoria
// slugs (scifi, accion, drama, thriller) are already labeled in
// js/movies.js — this only adds the ones series needed on top, without
// touching that file.
Object.assign(RUBY_CATEGORY_LABELS, {
  comedia: "Comedia",
  fantasia: "Fantasía",
  crimen: "Crimen",
});

const RUBY_SERIES = [
  {
    id: "101",
    spine: "RS–101",
    titulo: "Breaking Bad",
    "año": 2008,
    duracion: "5 temporadas",
    temporadas: 5,
    clasificacion: "18+",
    generos: ["Crimen", "Drama"],
    director: "Vince Gilligan",
    actores: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    idiomas: ["Español", "Inglés"],
    rating: "4.9",
    tagline: "Un diagnóstico puede cambiar quién sos, no solo cuánto te queda.",
    descripcionCorta:
      "Un profesor de química con un diagnóstico terminal empieza a cocinar metanfetamina para asegurar el futuro de su familia, y descubre en el camino a otra persona.",
    descripcion:
      "Walter White enseña química en una escuela secundaria de Albuquerque cuando recibe un diagnóstico de cáncer terminal. Para dejarle algo a su familia, se asocia con un antiguo alumno y empieza a fabricar metanfetamina de altísima pureza. Lo que arranca como una decisión desesperada se convierte, temporada a temporada, en la transformación de un hombre común en un capo criminal. Un estudio lento y despiadado sobre el orgullo, el poder y hasta dónde puede llegar alguien que cree tener razones.",
    poster: "assets/posters/breaking-bad.jpg",
    banner: "assets/banners/breaking-bad.jpg",
    tono: "crimson",
    categoria: "crimen",
    featured: true,
  },
  {
    id: "102",
    spine: "RS–102",
    titulo: "Stranger Things",
    "año": 2016,
    duracion: "4 temporadas",
    temporadas: 4,
    clasificacion: "16+",
    generos: ["Ciencia Ficción", "Terror"],
    director: "Hermanos Duffer",
    actores: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    idiomas: ["Español", "Inglés"],
    rating: "4.7",
    tagline: "Del otro lado, alguien también está mirando.",
    descripcionCorta:
      "En un pueblo de Indiana, la desaparición de un niño destapa experimentos secretos, una dimensión paralela y una nueva amiga con poderes que nadie termina de entender.",
    descripcion:
      "Cuando Will Byers desaparece sin dejar rastro, sus amigos, su madre y la policía local inician búsquedas separadas que terminan cruzándose con un laboratorio gubernamental, una niña fugitiva conocida solo como Once y una dimensión paralela que empieza a filtrarse hacia el pueblo. Ambientada en los años 80, mezcla ciencia ficción, terror ochentoso y una historia de amistad adolescente que sostiene todo el relato.",
    poster: "assets/posters/stranger-things.jpg",
    banner: "assets/banners/stranger-things.jpg",
    tono: "teal",
    categoria: "scifi",
    featured: true,
  },
  {
    id: "103",
    spine: "RS–103",
    titulo: "Game of Thrones",
    "año": 2011,
    duracion: "8 temporadas",
    temporadas: 8,
    clasificacion: "18+",
    generos: ["Fantasía", "Drama"],
    director: "David Benioff y D. B. Weiss",
    actores: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"],
    idiomas: ["Español", "Inglés"],
    rating: "4.6",
    tagline: "En el juego de tronos, o ganás o morís.",
    descripcionCorta:
      "Varias casas nobles luchan por el control del Trono de Hierro mientras una amenaza antigua despierta mucho más al norte del Muro.",
    descripcion:
      "En el continente de Poniente, siete grandes casas se disputan el control del Trono de Hierro a través de alianzas, traiciones y guerras abiertas. Mientras la corte se enreda en intrigas políticas, en el extremo norte una amenaza sobrenatural olvidada por generaciones empieza a despertar, y del otro lado del mar una heredera exiliada reúne fuerzas para reclamar lo que considera suyo. Fantasía política de escala enorme, construida sobre personajes moralmente ambiguos.",
    poster: "assets/posters/game-of-thrones.jpg",
    banner: "assets/banners/game-of-thrones.jpg",
    tono: "amber",
    categoria: "fantasia",
    featured: true,
  },
  {
    id: "104",
    spine: "RS–104",
    titulo: "The Office",
    "año": 2005,
    duracion: "9 temporadas",
    temporadas: 9,
    clasificacion: "13+",
    generos: ["Comedia"],
    director: "Greg Daniels",
    actores: ["Steve Carell", "Rainn Wilson", "John Krasinski"],
    idiomas: ["Español", "Inglés"],
    rating: "4.7",
    tagline: "Una oficina cualquiera, filmada como si importara.",
    descripcionCorta:
      "Un falso documental sigue el día a día, cada vez más absurdo, de los empleados de una aburrida empresa de papel en Pensilvania.",
    descripcion:
      "Con formato de falso documental, las cámaras siguen a los empleados de la sucursal de Scranton de una empresa de papel, encabezados por un gerente regional convencido de ser el alma de la oficina. Entre reuniones que se descarrilan, romances de oficina y rivalidades absurdas, la serie construye humor incómodo a partir de personajes profundamente humanos que, con el correr de las temporadas, terminan importándole al espectador mucho más de lo esperado.",
    poster: "assets/posters/the-office.jpg",
    banner: "assets/banners/the-office.jpg",
    tono: "moss",
    categoria: "comedia",
    featured: false,
  },
  {
    id: "105",
    spine: "RS–105",
    titulo: "Friends",
    "año": 1994,
    duracion: "10 temporadas",
    temporadas: 10,
    clasificacion: "13+",
    generos: ["Comedia", "Romance"],
    director: "David Crane y Marta Kauffman",
    actores: ["Jennifer Aniston", "Courteney Cox", "Matthew Perry"],
    idiomas: ["Español", "Inglés"],
    rating: "4.6",
    tagline: "Vas a tenerlos ahí, siempre que llueva.",
    descripcionCorta:
      "Seis amigos treintañeros atraviesan trabajos, rupturas y mudanzas en Manhattan, apoyándose entre café y café en su cafetería de siempre.",
    descripcion:
      "Ross, Rachel, Monica, Chandler, Joey y Phoebe comparten departamento, trabajo y una cafetería en el centro de Manhattan mientras intentan resolver sus vidas amorosas y profesionales durante sus veintes y treintas. Comedia de formato clásico apoyada casi por completo en el ida y vuelta entre sus seis protagonistas, que se convirtió en uno de los retratos más populares de la amistad adulta en la televisión.",
    poster: "assets/posters/friends.jpg",
    banner: "assets/banners/friends.jpg",
    tono: "slate",
    categoria: "comedia",
    featured: false,
  },
  {
    id: "106",
    spine: "RS–106",
    titulo: "The Crown",
    "año": 2016,
    duracion: "6 temporadas",
    temporadas: 6,
    clasificacion: "16+",
    generos: ["Drama", "Biografía"],
    director: "Peter Morgan",
    actores: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    idiomas: ["Español", "Inglés"],
    rating: "4.5",
    tagline: "La corona pesa más de lo que aparenta.",
    descripcionCorta:
      "El reinado de Isabel II, desde su coronación hasta las últimas décadas del siglo XX, contado como el costo personal de sostener una institución.",
    descripcion:
      "Tras la muerte prematura de su padre, una joven Isabel debe asumir el trono británico mientras aprende, muchas veces a los tropiezos, a separar a la persona de la institución que representa. A lo largo de varias décadas, la serie recorre los grandes eventos políticos del Reino Unido desde la intimidad del Palacio de Buckingham, retratando el precio personal y familiar de una vida entera al servicio de la corona.",
    poster: "assets/posters/the-crown.jpg",
    banner: "assets/banners/the-crown.jpg",
    tono: "amber",
    categoria: "drama",
    featured: false,
  },
  {
    id: "107",
    spine: "RS–107",
    titulo: "Peaky Blinders",
    "año": 2013,
    duracion: "6 temporadas",
    temporadas: 6,
    clasificacion: "18+",
    generos: ["Crimen", "Drama"],
    director: "Steven Knight",
    actores: ["Cillian Murphy", "Paul Anderson", "Sophie Rundle"],
    idiomas: ["Español", "Inglés"],
    rating: "4.7",
    tagline: "En Birmingham, el poder se cose por dentro de la gorra.",
    descripcionCorta:
      "En la Inglaterra de posguerra, una familia de gánsteres de Birmingham expande su imperio criminal a fuerza de ambición y violencia calculada.",
    descripcion:
      "Tras volver de la Primera Guerra Mundial, Thomas Shelby toma el control de la banda familiar de los Peaky Blinders y empieza a expandir su influencia desde las apuestas ilegales hacia la política y el crimen organizado a gran escala. Ambientada en el Birmingham industrial de los años 20, combina drama de época con la ascensión implacable de un hombre dispuesto a pagar cualquier precio por dejar atrás su origen.",
    poster: "assets/posters/peaky-blinders.jpg",
    banner: "assets/banners/peaky-blinders.jpg",
    tono: "crimson",
    categoria: "crimen",
    featured: false,
  },
  {
    id: "108",
    spine: "RS–108",
    titulo: "Dark",
    "año": 2017,
    duracion: "3 temporadas",
    temporadas: 3,
    clasificacion: "16+",
    generos: ["Ciencia Ficción", "Misterio"],
    director: "Baran bo Odar y Jantje Friese",
    actores: ["Louis Hofmann", "Karoline Eichhorn", "Lisa Vicari"],
    idiomas: ["Español", "Alemán"],
    rating: "4.8",
    tagline: "El pasado, el presente y el futuro no son sucesivos.",
    descripcionCorta:
      "La desaparición de un niño en un pueblo alemán destapa un entramado de secretos familiares que conecta cuatro generaciones y tres líneas de tiempo distintas.",
    descripcion:
      "En el pequeño pueblo de Winden, la desaparición de un niño reabre heridas familiares de décadas atrás y lleva a varios personajes a descubrir un pasaje oculto en las cuevas cercanas a la planta nuclear del pueblo. Lo que empieza como un misterio local se revela como un rompecabezas temporal que conecta a las mismas familias a través de tres épocas distintas. Ciencia ficción densa y meticulosamente construida, pensada para verse más de una vez.",
    poster: "assets/posters/dark.jpg",
    banner: "assets/banners/dark.jpg",
    tono: "slate",
    categoria: "scifi",
    featured: true,
  },
  {
    id: "109",
    spine: "RS–109",
    titulo: "The Mandalorian",
    "año": 2019,
    duracion: "3 temporadas",
    temporadas: 3,
    clasificacion: "13+",
    generos: ["Ciencia Ficción", "Aventura"],
    director: "Jon Favreau",
    actores: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"],
    idiomas: ["Español", "Inglés"],
    rating: "4.6",
    tagline: "Este es el Camino.",
    descripcionCorta:
      "Un cazarrecompensas solitario en los confines de la galaxia asume la protección de un pequeño y misterioso ser, y con eso, un nuevo propósito.",
    descripcion:
      "Años después de la caída del Imperio, un cazarrecompensas mandaloriano recorre los rincones más alejados de la ley de la galaxia aceptando encargos para sobrevivir. Un trabajo rutinario cambia de rumbo cuando descubre que su objetivo es una cría de una especie desconocida, y decide protegerlo en lugar de entregarlo. Aventura episódica de western espacial, apoyada en un código de honor que el protagonista no está dispuesto a romper.",
    poster: "assets/posters/the-mandalorian.jpg",
    banner: "assets/banners/the-mandalorian.jpg",
    tono: "teal",
    categoria: "scifi",
    featured: false,
  },
  {
    id: "110",
    spine: "RS–110",
    titulo: "Chernobyl",
    "año": 2019,
    duracion: "1 temporada",
    temporadas: 1,
    clasificacion: "16+",
    generos: ["Drama", "Historia"],
    director: "Craig Mazin",
    actores: ["Jared Harris", "Stellan Skarsgård", "Emily Watson"],
    idiomas: ["Español", "Inglés"],
    rating: "4.9",
    tagline: "El costo de una mentira no se mide en rublos.",
    descripcionCorta:
      "La reconstrucción minuciosa del desastre nuclear de 1986 y de las personas que intentaron contener sus consecuencias mientras el estado ocultaba la magnitud del desastre.",
    descripcion:
      "En abril de 1986, un reactor de la planta nuclear de Chernóbil explota durante una prueba de rutina. Mientras el gobierno soviético minimiza públicamente lo ocurrido, un grupo de científicos y trabajadores se enfrenta a una carrera contra el tiempo para evitar una catástrofe todavía mayor. Miniserie de tono documental que reconstruye tanto la magnitud técnica del desastre como el costo humano de quienes lo enfrentaron de cerca.",
    poster: "assets/posters/chernobyl.jpg",
    banner: "assets/banners/chernobyl.jpg",
    tono: "moss",
    categoria: "drama",
    featured: false,
  },
];

/**
 * One row per distinct `categoria` found in RUBY_SERIES, in first-seen
 * order — same logic as movies.js's getCategories(), kept separate so
 * the Series page never mixes in películas rows.
 */
function getSeriesCategories() {
  const order = [];
  const buckets = {};

  RUBY_SERIES.forEach((serie) => {
    if (!buckets[serie.categoria]) {
      buckets[serie.categoria] = [];
      order.push(serie.categoria);
    }
    buckets[serie.categoria].push(serie);
  });

  return order.map((slug) => ({
    id: slug,
    label: categoryLabel(slug),
    titles: buckets[slug],
  }));
}

function findSerieById(id) {
  return RUBY_SERIES.find((s) => s.id === id) || null;
}

function findSimilarSeries(target, limit = 8) {
  return RUBY_SERIES.filter((s) => s.id !== target.id)
    .map((s) => ({
      serie: s,
      shared: s.generos.filter((g) => target.generos.includes(g)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map((entry) => entry.serie)
    .slice(0, limit);
}

function findMoreLikeThisSerie(target, exclude = [], limit = 8) {
  const excludeIds = new Set([target.id, ...exclude.map((s) => s.id)]);
  const sameCategory = RUBY_SERIES.filter(
    (s) => !excludeIds.has(s.id) && s.categoria === target.categoria
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fallback = RUBY_SERIES.filter(
    (s) => !excludeIds.has(s.id) && !sameCategory.includes(s)
  );
  return [...sameCategory, ...fallback].slice(0, limit);
}

function findRecommendedSeries(target, limit = 8) {
  const sameDirector = RUBY_SERIES.filter(
    (s) => s.id !== target.id && s.director === target.director
  );

  const byRatingDesc = RUBY_SERIES.filter(
    (s) => s.id !== target.id && !sameDirector.includes(s)
  ).sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  return [...sameDirector, ...byRatingDesc].slice(0, limit);
}

/* -------------------------------------------------------------------- */
/* Combined catalog — lets shared UI (the detail page, Mi Lista) treat   */
/* películas and series as one collection without caring which is which.*/
/* -------------------------------------------------------------------- */

const RUBY_ALL_TITLES = [...RUBY_MOVIES, ...RUBY_SERIES];

/** True for any title carrying a `temporadas` count — i.e. a series. */
function isSerie(title) {
  return typeof title.temporadas === "number";
}

/** Looks up a title by id across both películas and series. */
function findTitleById(id) {
  return findMovieById(id) || findSerieById(id);
}

function findSimilarTitles(target, limit = 8) {
  return isSerie(target)
    ? findSimilarSeries(target, limit)
    : findSimilarMovies(target, limit);
}

function findMoreLikeThisTitle(target, exclude = [], limit = 8) {
  return isSerie(target)
    ? findMoreLikeThisSerie(target, exclude, limit)
    : findMoreLikeThis(target, exclude, limit);
}

function findRecommendedTitles(target, limit = 8) {
  return isSerie(target)
    ? findRecommendedSeries(target, limit)
    : findRecommended(target, limit);
}

/**
 * Titles for the Home hero slider — every title (movie or series) with
 * `featured: true`, across the combined catalog. Mirrors
 * getFeaturedMovies() from movies.js, but mixed.
 */
function getFeaturedTitles() {
  const featured = RUBY_ALL_TITLES.filter((t) => t.featured);
  return featured.length ? featured : RUBY_ALL_TITLES.slice(0, 1);
}

/**
 * One row per distinct `categoria` found across the combined catalog
 * (películas + series), in first-seen order — same bucketing logic as
 * getCategories() / getSeriesCategories(), except a row here can contain
 * both movies and series under the same categoria (e.g. "scifi" holds
 * both Interstellar and Stranger Things). Used only by the Home page;
 * Películas and Series keep their own movies-only / series-only rows.
 */
function getAllCategories() {
  const order = [];
  const buckets = {};

  RUBY_ALL_TITLES.forEach((title) => {
    if (!buckets[title.categoria]) {
      buckets[title.categoria] = [];
      order.push(title.categoria);
    }
    buckets[title.categoria].push(title);
  });

  return order.map((slug) => ({
    id: slug,
    label: categoryLabel(slug),
    titles: buckets[slug],
  }));
}
