document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        {
            id: "macbook",
            nombre: "MacBook Pro M5",
            descripcion: "Notebook ultradelgado con chip M4, 13 pulgadas.",
            precio: "1.199.000",
            imagen: "https://tse1.mm.bing.net/th/id/OIP.ccdzvcFZfXSDIcyYsRmzBAHaGY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "MacBook Air M3"
        },
        {
            id: "iphone",
            nombre: "iPhone 15 Pro",
            descripcion: "Smartphone con chip A17 Pro, cámara de 48MP y titanio.",
            precio: "1.599.000",
            imagen: "https://tse1.mm.bing.net/th/id/OIP.ccdzvcFZfXSDIcyYsRmzBAHaGY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "iPhone 15 Pro"
        },
        {
            id: "ipad",
            nombre: "iPad Air",
            descripcion: "Tablet con chip M2, pantalla Liquid Retina de 11 pulgadas.",
            precio: "999.000",
            imagen: "https://tse1.mm.bing.net/th/id/OIP.ccdzvcFZfXSDIcyYsRmzBAHaGY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "iPad Air"
        },
        {
            id: "watch",
            nombre: "Apple Watch Series 9",
            descripcion: "Reloj inteligente con GPS y detección de accidentes.",
            precio: "549.000",
            imagen: "https://tse1.mm.bing.net/th/id/OIP.ccdzvcFZfXSDIcyYsRmzBAHaGY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "Apple Watch Series 9"
        },
        {
            id: "airpods",
            nombre: "AirPods Pro 2",
            descripcion: "Auriculares inalámbricos con cancelación activa de ruido.",
            precio: "349.000",
            imagen: "https://tse1.mm.bing.net/th/id/OIP.ccdzvcFZfXSDIcyYsRmzBAHaGY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "AirPods Pro 2"
        },
        {
            id: "accesorios",
            nombre: "Magic Mouse",
            descripcion: "Mouse inalámbrico recargable con Multi-Touch.",
            precio: "129.000",
            imagen: "https://tse1.mm.bing.net/th/id/OIP.ccdzvcFZfXSDIcyYsRmzBAHaGY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "Magic Mouse"
        }
    ];

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
        enlaceTitulo.href = "producto.html";
        enlaceTitulo.textContent = producto.nombre;
        titulo.appendChild(enlaceTitulo);

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;

        const detalle = document.createElement("p");
        const enlaceDetalle = document.createElement("a");
        enlaceDetalle.href = "producto.html";
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

    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        const searchInput = document.getElementById("search-input");
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
        document.getElementById("search-input").value = "";
        renderizarProductos();
    })
});



