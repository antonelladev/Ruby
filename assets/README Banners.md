# Banners (horizontales)

Coloca aquí los banners de cada película, en formato ancho **16:9** o más panorámico
(por ejemplo 1920×1080px), como JPG o WEBP.

**Nombre de archivo esperado:** el título de la película en minúsculas y con guiones en lugar de espacios (mismo slug que el campo `banner` en `js/movies.js`).

```
assets/banners/interstellar.jpg
assets/banners/inception.jpg
assets/banners/the-dark-knight.jpg
```

Solo las películas con `featured: true` necesitan banner (se usan en el slider
principal de la Home), pero cualquier película puede tener uno para su página
de detalle. Si no existe el archivo, se muestra el fondo degradado de respaldo.
