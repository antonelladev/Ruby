# RUBY

A premium movie streaming platform built from scratch using **HTML**, **CSS**, and **JavaScript**.

RUBY is a frontend-focused project designed to showcase modern UI design, scalable architecture, reusable components, and a data-driven rendering system without relying on frameworks or external libraries.

---

## Preview

> Screenshots will be added soon.

---

## Features

- Responsive interface
- Dynamic movie catalog
- Data-driven rendering
- Automatic category generation
- Featured movies slider
- Individual movie pages
- Movie recommendations
- Hover previews
- Smooth transitions
- Lazy image loading
- Accessible navigation
- Scalable architecture
- No external frameworks

---

## Project Structure

```
ruby/
│
├── assets/
│   ├── banners/
│   ├── logo/
│   └── posters/
│
├── css/
│
├── js/
│   ├── movies.js
│   ├── render.js
│   ├── detail.js
│   ├── interactions.js
│   └── ...
│
├── index.html
├── pelicula.html
└── README.md
```

---

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

---

## Movie Data

All movie information is stored in a single file:

```
js/movies.js
```

Each movie is defined as an object containing information such as:

- title
- description
- genres
- director
- cast
- rating
- poster
- banner
- category

The interface is generated dynamically from this data.

---

## Adding a New Movie

1. Add the poster to:

```
assets/posters/
```

2. Add the banner to:

```
assets/banners/
```

3. Create a new object inside:

```
js/movies.js
```

The movie will automatically appear throughout the application, including categories, the full catalog, recommendations, and the featured slider (if marked as featured).

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/ruby.git
```

Open the project folder and run it using a local server.

For example:

```bash
python -m http.server
```

or use the Live Server extension in Visual Studio Code.

---

## Goals

This project was created to demonstrate:

- Frontend architecture
- Component-based rendering
- Responsive design
- User interface design
- JavaScript DOM manipulation
- Scalable project organization

---

## License

This project was created for educational and portfolio purposes.

Movie titles belong to their respective owners.
