/**
 * RUBY — Movie Catalog
 * -----------------------------------------------------------------------
 * This is the ONLY place movie content lives. To add a new title:
 *
 *   1. Drop its poster in  assets/posters/<id>.jpg   (2:3, e.g. 600×900)
 *   2. Drop its banner in  assets/banners/<id>.jpg    (wide, e.g. 1920×1080)
 *      — banner is only required if `featured: true`
 *   3. Add a new object to RUBY_MOVIES below.
 *
 * Nothing else needs to change. The Home page, category rows, the hero
 * slider, and the detail page (pelicula.html?id=...) all read from this
 * file and rebuild themselves automatically.
 *
 * `categoria` can be any slug you want ("romance", "animacion", ...). If
 * it's new, RUBY still renders a row for it automatically — see
 * RUBY_CATEGORY_LABELS below for how it picks a display name.
 *
 * `poster` / `banner` point at image files that may not exist yet. That's
 * fine: every place that renders one falls back to a generated gradient
 * (via `tono`) so the layout never breaks — see the `img onerror` wiring
 * in js/render.js. Poster/banner artwork is licensed material, so it
 * isn't bundled here — add your own once you have the rights to it.
 *
 * Synopses below are written for RUBY (original wording), not copied
 * from official marketing copy.
 */

const RUBY_CATEGORY_LABELS = {
  scifi: "Ciencia Ficción",
  accion: "Acción",
  drama: "Drama",
  thriller: "Thriller",
};

const RUBY_MOVIES = [
  {
    id: "001",
    spine: "RB–001",
    titulo: "Interstellar",
    "año": 2014,
    duracion: "2h 49m",
    clasificacion: "13+",
    generos: ["Ciencia Ficción", "Drama"],
    director: "Christopher Nolan",
    actores: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    idiomas: ["Español", "Inglés"],
    rating: "4.8",
    tagline: "Cuando la Tierra ya no alcanza, hay que buscar más allá de las estrellas.",
    descripcionCorta:
      "Un antiguo piloto de la NASA se convierte en la última esperanza de la humanidad al cruzar un agujero de gusano en busca de un nuevo hogar entre las estrellas.",
    descripcion:
      "Cuando la Tierra deja de poder sostener a la humanidad, un grupo de exploradores se embarca en la misión espacial más importante de la historia: cruzar un agujero de gusano cercano a Saturno para hallar un planeta habitable. Entre ellos viaja un antiguo piloto que debió elegir entre quedarse junto a sus hijos o intentar salvar a la especie entera, sabiendo que el tiempo transcurre de forma distinta más allá de la Tierra. Una travesía que mezcla física teórica con una historia profundamente humana sobre el amor y la distancia.",
    poster: "assets/posters/001.jpg",
    banner: "assets/banners/001.jpg",
    tono: "slate",
    categoria: "scifi",
    featured: true,
  },
  {
    id: "002",
    spine: "RB–002",
    titulo: "Inception",
    "año": 2010,
    duracion: "2h 28m",
    clasificacion: "13+",
    generos: ["Ciencia Ficción", "Thriller"],
    director: "Christopher Nolan",
    actores: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    idiomas: ["Español", "Inglés"],
    rating: "4.7",
    tagline: "Una idea es el parásito más resistente que existe.",
    descripcionCorta:
      "Un ladrón especializado en robar secretos desde el subconsciente recibe el encargo inverso: plantar una idea en la mente de un heredero corporativo.",
    descripcion:
      "Dom Cobb domina el arte de infiltrarse en los sueños ajenos para extraer información valiosa. Cuando un cliente le ofrece la posibilidad de recuperar su antigua vida a cambio de un trabajo imposible —sembrar, en lugar de robar, una idea en la mente de otra persona— Cobb reúne a un equipo capaz de construir sueños dentro de sueños. A medida que las capas se multiplican, los límites entre lo real y lo soñado empiezan a desdibujarse.",
    poster: "assets/posters/002.jpg",
    banner: "assets/banners/002.jpg",
    tono: "teal",
    categoria: "scifi",
    featured: false,
  },
  {
    id: "003",
    spine: "RB–003",
    titulo: "The Dark Knight",
    "año": 2008,
    duracion: "2h 32m",
    clasificacion: "16+",
    generos: ["Acción", "Crimen"],
    director: "Christopher Nolan",
    actores: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    idiomas: ["Español", "Inglés"],
    rating: "4.9",
    tagline: "El héroe que Gotham necesita no siempre es el que quiere.",
    descripcionCorta:
      "Batman se enfrenta a un criminal anarquista que quiere demostrar que cualquier persona, sin importar cuán íntegra, puede caer en el caos.",
    descripcion:
      "Gotham empieza a recuperar el control gracias al trabajo conjunto de Batman, el comisionado Gordon y el fiscal Harvey Dent. Pero la llegada de un enigmático criminal sin motivaciones económicas ni ideológicas —solo el deseo de sembrar el caos— pone a prueba los límites morales de cada uno de ellos. Una guerra silenciosa por el alma de la ciudad, donde ganar puede costar mucho más que perder.",
    poster: "assets/posters/003.jpg",
    banner: "assets/banners/003.jpg",
    tono: "crimson",
    categoria: "accion",
    featured: true,
  },
  {
    id: "004",
    spine: "RB–004",
    titulo: "Oppenheimer",
    "año": 2023,
    duracion: "3h 00m",
    clasificacion: "16+",
    generos: ["Drama", "Biografía"],
    director: "Christopher Nolan",
    actores: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    idiomas: ["Español", "Inglés"],
    rating: "4.7",
    tagline: "Algunas ideas, una vez liberadas, no pueden volver a guardarse.",
    descripcionCorta:
      "La historia del físico que lideró el desarrollo de la bomba atómica y tuvo que vivir con las consecuencias de su propia creación.",
    descripcion:
      "J. Robert Oppenheimer reúne a los científicos más brillantes de su generación para desarrollar, en tiempo récord, el arma más destructiva jamás construida. El relato recorre desde sus años de formación hasta las audiencias que, años después de Hiroshima y Nagasaki, pusieron en duda su lealtad y su legado. Un retrato sobre la ambición intelectual y el peso moral de cambiar el curso de la historia.",
    poster: "assets/posters/004.jpg",
    banner: "assets/banners/004.jpg",
    tono: "amber",
    categoria: "drama",
    featured: true,
  },
  {
    id: "005",
    spine: "RB–005",
    titulo: "The Batman",
    "año": 2022,
    duracion: "2h 56m",
    clasificacion: "16+",
    generos: ["Acción", "Misterio"],
    director: "Matt Reeves",
    actores: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    idiomas: ["Español", "Inglés"],
    rating: "4.5",
    tagline: "Bajo la máscara, todavía queda una pregunta sin responder.",
    descripcionCorta:
      "En su segundo año como vigilante, Batman investiga una serie de asesinatos que exponen la corrupción oculta bajo Gotham.",
    descripcion:
      "Un asesino enmascarado empieza a atacar a figuras públicas de Gotham, dejando en cada escena del crimen acertijos dirigidos directamente a Batman. Mientras investiga junto a la detective Selina Kyle, Bruce Wayne descubre que la corrupción de la ciudad llega mucho más lejos de lo que imaginaba, e incluso alcanza a su propia familia. Una versión más sombría y detectivesca del personaje, construida como un thriller criminal.",
    poster: "assets/posters/005.jpg",
    banner: "assets/banners/005.jpg",
    tono: "moss",
    categoria: "accion",
    featured: false,
  },
  {
    id: "006",
    spine: "RB–006",
    titulo: "Joker",
    "año": 2019,
    duracion: "2h 02m",
    clasificacion: "18+",
    generos: ["Drama", "Thriller"],
    director: "Todd Phillips",
    actores: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    idiomas: ["Español", "Inglés"],
    rating: "4.4",
    tagline: "A veces basta un mal día para cambiarlo todo.",
    descripcionCorta:
      "Un comediante fallido y aislado por la sociedad de Gotham inicia una espiral que lo transformará en un ícono del caos.",
    descripcion:
      "Arthur Fleck sueña con ser comediante mientras cuida de su madre enferma y sobrevive a base de trabajos precarios en una ciudad que lo ignora o lo humilla. A medida que las instituciones que lo sostenían —salud mental, trabajo, familia— colapsan una tras otra, Arthur comienza a transformarse en algo distinto. Un estudio de personaje íntimo y perturbador sobre el aislamiento y la violencia que puede generar una sociedad indiferente.",
    poster: "assets/posters/006.jpg",
    banner: "assets/banners/006.jpg",
    tono: "crimson",
    categoria: "thriller",
    featured: false,
  },
  {
    id: "007",
    spine: "RB–007",
    titulo: "The Matrix",
    "año": 1999,
    duracion: "2h 16m",
    clasificacion: "16+",
    generos: ["Ciencia Ficción", "Acción"],
    director: "Lana y Lilly Wachowski",
    actores: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    idiomas: ["Español", "Inglés"],
    rating: "4.8",
    tagline: "La pregunta no es si es real. Es si querés saberlo.",
    descripcionCorta:
      "Un programador descubre que la realidad que conoce es una simulación diseñada para mantener a la humanidad esclavizada.",
    descripcion:
      "Thomas Anderson lleva una doble vida: programador de día, hacker conocido como Neo por las noches. Cuando un grupo liderado por Morpheus le revela que el mundo que percibe es una simulación generada por máquinas, Neo debe decidir si quiere conocer la verdad, sin importar cuán devastadora sea. Una travesía sobre el libre albedrío que redefinió el cine de acción de su época.",
    poster: "assets/posters/007.jpg",
    banner: "assets/banners/007.jpg",
    tono: "moss",
    categoria: "scifi",
    featured: false,
  },
  {
    id: "008",
    spine: "RB–008",
    titulo: "Fight Club",
    "año": 1999,
    duracion: "2h 19m",
    clasificacion: "18+",
    generos: ["Drama", "Thriller"],
    director: "David Fincher",
    actores: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    idiomas: ["Español", "Inglés"],
    rating: "4.6",
    tagline: "Todo lo que creés poseer, termina poseyéndote a vos.",
    descripcionCorta:
      "Un oficinista insomne y un vendedor de jabón carismático fundan un club de peleas clandestino que se les escapa de las manos.",
    descripcion:
      "Atrapado en una vida de consumo, insomnio y vacío, un empleado de oficina conoce a Tyler Durden, un hombre magnético que vive completamente al margen de las reglas. Juntos fundan un club de peleas clandestino que rápidamente se convierte en un movimiento con reglas propias y una lógica cada vez más peligrosa. Una crítica ácida y perturbadora al vacío existencial de la vida moderna.",
    poster: "assets/posters/008.jpg",
    banner: "assets/banners/008.jpg",
    tono: "slate",
    categoria: "thriller",
    featured: false,
  },
  {
    id: "009",
    spine: "RB–009",
    titulo: "Blade Runner 2049",
    "año": 2017,
    duracion: "2h 44m",
    clasificacion: "16+",
    generos: ["Ciencia Ficción", "Drama"],
    director: "Denis Villeneuve",
    actores: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    idiomas: ["Español", "Inglés"],
    rating: "4.6",
    tagline: "Algunos recuerdos merecen ser vividos, aunque no sean propios.",
    descripcionCorta:
      "Un joven blade runner desentierra un secreto enterrado hace décadas que podría desestabilizar lo que queda de la sociedad.",
    descripcion:
      "Treinta años después de los hechos del primer Blade Runner, el oficial K, un replicante al servicio de la policía de Los Ángeles, descubre un secreto capaz de hundir a la sociedad en un caos aún mayor. Su búsqueda lo lleva a rastrear a Rick Deckard, desaparecido hace más de tres décadas, mientras enfrenta preguntas cada vez más incómodas sobre su propia identidad. Ciencia ficción pausada, visualmente monumental, sobre qué significa ser humano.",
    poster: "assets/posters/009.jpg",
    banner: "assets/banners/009.jpg",
    tono: "teal",
    categoria: "scifi",
    featured: true,
  },
  {
    id: "010",
    spine: "RB–010",
    titulo: "Dune",
    "año": 2021,
    duracion: "2h 35m",
    clasificacion: "13+",
    generos: ["Ciencia Ficción", "Aventura"],
    director: "Denis Villeneuve",
    actores: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    idiomas: ["Español", "Inglés"],
    rating: "4.6",
    tagline: "El destino de un mundo puede caber en las manos de un solo heredero.",
    descripcionCorta:
      "El heredero de una casa noble es enviado a un planeta desértico que esconde el recurso más valioso del universo, y con él, una guerra que lo superará.",
    descripcion:
      "Paul Atreides, heredero de la Casa Atreides, viaja junto a su familia al peligroso planeta desértico Arrakis para hacerse cargo de la producción de la especia, el recurso más valioso de la galaxia. Lo que parece una oportunidad se revela como una trampa política que desata una guerra devastadora. En medio de la traición, Paul empieza a descubrir un propósito que excede cualquier plan familiar, guiado por visiones que no puede explicar del todo.",
    poster: "assets/posters/010.jpg",
    banner: "assets/banners/010.jpg",
    tono: "amber",
    categoria: "scifi",
    featured: true,
  },
];

/**
 * Turns a category slug into a display label. Known slugs use the curated
 * name in RUBY_CATEGORY_LABELS; anything new (a categoria nobody has
 * labeled yet) gets a sensible auto-generated label instead of breaking —
 * this is what lets a new category slug "just work" the moment a movie
 * object uses it.
 */
function categoryLabel(slug) {
  if (RUBY_CATEGORY_LABELS[slug]) return RUBY_CATEGORY_LABELS[slug];
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Builds the row list for the Home page directly from RUBY_MOVIES: one
 * row per distinct `categoria` found in the catalog, in first-seen order,
 * each containing every movie tagged with that categoria. Add a movie
 * with a brand-new categoria and a new row appears automatically.
 */
function getCategories() {
  const order = [];
  const buckets = {};

  RUBY_MOVIES.forEach((movie) => {
    if (!buckets[movie.categoria]) {
      buckets[movie.categoria] = [];
      order.push(movie.categoria);
    }
    buckets[movie.categoria].push(movie);
  });

  return order.map((slug) => ({
    id: slug,
    label: categoryLabel(slug),
    titles: buckets[slug],
  }));
}

function getMoviesByCategory(categoria) {
  return RUBY_MOVIES.filter((m) => m.categoria === categoria);
}

/**
 * Movies for the hero slider — every title with `featured: true`, in
 * catalog order. Falls back to the first title in the catalog so the
 * slider never renders empty if nothing is marked featured.
 */
function getFeaturedMovies() {
  const featured = RUBY_MOVIES.filter((m) => m.featured);
  return featured.length ? featured : RUBY_MOVIES.slice(0, 1);
}

function findMovieById(id) {
  return RUBY_MOVIES.find((m) => m.id === id) || null;
}

/**
 * "Películas similares" — other titles sharing at least one género,
 * ranked by how many géneros they share (closest matches first).
 */
function findSimilarMovies(target, limit = 8) {
  return RUBY_MOVIES.filter((m) => m.id !== target.id)
    .map((m) => ({
      movie: m,
      shared: m.generos.filter((g) => target.generos.includes(g)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map((entry) => entry.movie)
    .slice(0, limit);
}

/**
 * "Más como esta" — other titles in the same categoria, falling back to
 * the rest of the catalog if the category is small.
 */
function findMoreLikeThis(target, exclude = [], limit = 8) {
  const excludeIds = new Set([target.id, ...exclude.map((m) => m.id)]);
  const sameCategory = RUBY_MOVIES.filter(
    (m) => !excludeIds.has(m.id) && m.categoria === target.categoria
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fallback = RUBY_MOVIES.filter(
    (m) => !excludeIds.has(m.id) && !sameCategory.includes(m)
  );
  return [...sameCategory, ...fallback].slice(0, limit);
}

/**
 * "Recomendadas" — a third, differently-weighted list: other films by
 * the same director first (a real editorial signal), then the
 * highest-rated titles in the rest of the catalog as filler. It only
 * excludes the movie itself (not whatever "Películas similares" / "Más
 * como esta" already showed) — with a catalog this size, forcing three
 * fully disjoint rows would often leave this one empty. What makes it
 * distinct is its own ranking logic, not a mutually-exclusive set.
 */
function findRecommended(target, limit = 8) {
  const sameDirector = RUBY_MOVIES.filter(
    (m) => m.id !== target.id && m.director === target.director
  );

  const byRatingDesc = RUBY_MOVIES.filter(
    (m) => m.id !== target.id && !sameDirector.includes(m)
  ).sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  return [...sameDirector, ...byRatingDesc].slice(0, limit);
}
