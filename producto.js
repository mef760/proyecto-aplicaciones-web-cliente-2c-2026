document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const producto = id ? buscarProductoPorId(id) : null;

    const detalle = document.getElementById("producto-detalle");
    const error = document.getElementById("detalle-error");

    if (!producto) {
        detalle.hidden = true;
        error.hidden = false;
        return;
    }

    document.title = `${producto.nombre} | Apple Store`;

    document.getElementById("detalle-nombre").textContent = producto.nombre;

    const imagen = document.getElementById("detalle-imagen");
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;

    document.getElementById("detalle-descripcion").textContent = producto.descripcion;
    document.getElementById("detalle-descripcion-larga").textContent = producto.descripcion;
    document.getElementById("detalle-precio").textContent = `Precio: $${producto.precio}`;

    /* El precio viene como string formateado ("1.199.000"), lo pasamos a número para las cuotas */
    const precioNumero = Number(producto.precio.replace(/\./g, ""));
    const cuota = precioNumero / 12;
    document.getElementById("detalle-cuotas").textContent =
        `Hasta 12 cuotas sin interés de $${cuota.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    /* La tabla de especificaciones es del MacBook: la mostramos solo para ese producto */
    const seccionSpecs = document.querySelector('section[aria-label="Especificaciones técnicas"]');
    const caption = document.querySelector("table caption");
    if (producto.id === "macbook") {
        caption.textContent = `Especificaciones de ${producto.nombre}`;
    } else {
        seccionSpecs.hidden = true;
    }

    document.getElementById("detalle-volver").href = `index.html#${producto.id}`;
});