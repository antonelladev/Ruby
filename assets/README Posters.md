# Posters (verticales)

Coloca aquí los posters de cada película, en formato **2:3** (por ejemplo 600×900px), como JPG o WEBP.

**Nombre de archivo esperado:** el título de la película en minúsculas y con guiones en lugar de espacios (mismo slug que el campo `poster` en `js/movies.js`).

```
assets/posters/interstellar.jpg
assets/posters/inception.jpg
assets/posters/the-dark-knight.jpg
assets/posters/blade-runner-2049.jpg
```

Si un poster no existe todavía, RUBY no se rompe: la tarjeta muestra automáticamente
el fondo degradado + inicial del título como respaldo (ver `poster` en cada objeto
de `js/movies.js` y `.poster img` en `css/components.css`).
