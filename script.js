document.addEventListener("DOMContentLoaded", () => {

    const crearTarjeta = (producto) => {
        const articulo = document.createElement("article");
        articulo.className = "card";
        articulo.id = producto.id;

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.alt;
        img.loading = "lazy";

        const titulo = document.createElement("h3");
        const enlaceTitulo = document.createElement("a");
        enlaceTitulo.href = `producto.html?id=${producto.id}`;
        enlaceTitulo.textContent = producto.nombre;
        titulo.appendChild(enlaceTitulo);

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;

        const detalle = document.createElement("p");
        const enlaceDetalle = document.createElement("a");
        enlaceDetalle.href = `producto.html?id=${producto.id}`;
        enlaceDetalle.setAttribute("aria-label", `Ver detalle de ${producto.nombre}`);
        enlaceDetalle.innerHTML = "Ver detalle &rarr;";
        detalle.appendChild(enlaceDetalle);

        articulo.appendChild(img);
        articulo.appendChild(titulo);
        articulo.appendChild(descripcion);
        articulo.appendChild(precio);
        articulo.appendChild(detalle);

        return articulo;
    }

    const renderizarProductos = () => {
        const contenedor = document.getElementById("productos");
        contenedor.innerHTML = "";
        mostrarSinResultados(false);
        const tarjetas = productos.map(function (producto) {
            return crearTarjeta(producto);
        });
        for (const tarjeta of tarjetas) {
            contenedor.appendChild(tarjeta);
        }
    }

    const sinResultados = document.getElementById("sin-resultados");

    const mostrarSinResultados = (visible) => {
        sinResultados.hidden = !visible;
    }

    renderizarProductos();

    /* ===== Buscador con desplegable de sugerencias ===== */

    const searchInput = document.getElementById("search-input");
    const suggestionsList = document.getElementById("search-suggestions");
    const searchForm = searchInput.closest("form");

    let debounceTimer = null;
    let indiceActivo = -1;

    const cerrarSugerencias = () => {
        suggestionsList.hidden = true;
        suggestionsList.innerHTML = "";
        searchInput.setAttribute("aria-expanded", "false");
        searchInput.removeAttribute("aria-activedescendant");
        indiceActivo = -1;
    }

    const crearSugerencia = (producto) => {
        const item = document.createElement("li");
        item.className = "suggestion";
        item.id = `suggestion-${producto.id}`;
        item.setAttribute("role", "option");
        item.setAttribute("aria-selected", "false");

        const enlace = document.createElement("a");
        enlace.href = `producto.html?id=${producto.id}`;
        enlace.tabIndex = -1;
        enlace.textContent = producto.nombre;

        const descripcion = document.createElement("span");
        descripcion.className = "suggestion-descripcion";
        descripcion.textContent = producto.descripcion;

        item.appendChild(enlace);
        item.appendChild(descripcion);

        return item;
    }

    const mostrarSugerencias = (termino) => {
        suggestionsList.innerHTML = "";
        indiceActivo = -1;
        searchInput.removeAttribute("aria-activedescendant");

        /* Solo busca con 3 caracteres o más */
        if (termino.trim().length < MIN_CARACTERES_BUSQUEDA) {
            cerrarSugerencias();
            return;
        }

        const resultados = buscarProductos(termino);

        if (resultados.length === 0) {
            const vacio = document.createElement("li");
            vacio.className = "suggestion-vacio";
            vacio.setAttribute("role", "presentation");
            vacio.textContent = "Sin resultados. Probá con otro término.";
            suggestionsList.appendChild(vacio);
        }

        for (const producto of resultados) {
            suggestionsList.appendChild(crearSugerencia(producto));
        }

        suggestionsList.hidden = false;
        searchInput.setAttribute("aria-expanded", "true");
    }

    const opciones = () => {
        return Array.from(suggestionsList.querySelectorAll(".suggestion"));
    }

    const resaltarSugerencia = (indice) => {
        const items = opciones();

        if (items.length === 0) {
            return;
        }

        indice = (indice + items.length) % items.length;
        items.forEach((item, i) => item.setAttribute("aria-selected", String(i === indice)));

        indiceActivo = indice;
        const activo = items[indice];
        searchInput.setAttribute("aria-activedescendant", activo.id);
        activo.scrollIntoView({ block: "nearest" });
    }

    /* Evento input: dispara la búsqueda al escribir más de 2 caracteres */
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        const termino = searchInput.value;

        debounceTimer = setTimeout(() => {
            mostrarSugerencias(termino);
        }, 150);
    });

    /* Navegación con teclado dentro del desplegable */
    searchInput.addEventListener("keydown", (e) => {
        if (suggestionsList.hidden) {
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            resaltarSugerencia(indiceActivo + 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            resaltarSugerencia(indiceActivo - 1);
        } else if (e.key === "Escape") {
            cerrarSugerencias();
        } else if (e.key === "Enter" && indiceActivo >= 0) {
            e.preventDefault();
            opciones()[indiceActivo].querySelector("a").click();
        }
    });

    /* Cierra el desplegable al hacer click fuera */
    document.addEventListener("click", (e) => {
        if (!searchForm.contains(e.target)) {
            cerrarSugerencias();
        }
    });

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        cerrarSugerencias();

        const queryValue = searchInput.value.toLowerCase().trim();

        const filteredProducts = productos.filter(producto => {
            return producto.nombre.toLowerCase().includes(queryValue) || producto.descripcion.toLowerCase().includes(queryValue);
        });

        console.log("Productos filtrados:", filteredProducts);

        const contenedor = document.getElementById("productos");
        contenedor.innerHTML = "";

        mostrarSinResultados(filteredProducts.length === 0);

        for (const producto of filteredProducts) {
            const tarjeta = crearTarjeta(producto);
            contenedor.appendChild(tarjeta);
        }
    })

    const volverTodos = document.getElementById("volver-todos");
    volverTodos.addEventListener("click", (e) => {
        e.preventDefault();
        searchInput.value = "";
        cerrarSugerencias();
        renderizarProductos();
    })
});