/* Catálogo de productos: datos compartidos por index.html y producto.html */

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

/* Caracteres mínimos para disparar la búsqueda con el desplegable */
const MIN_CARACTERES_BUSQUEDA = 3;

/* Sin acentos y en minúsculas, para que "inalambricos" encuentre "inalámbricos" */
const normalizar = (texto) => {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

/* Devuelve los productos cuyo nombre o descripción matchean el término */
const buscarProductos = (termino) => {
    const consulta = normalizar(termino.trim());

    return productos.filter((producto) => {
        return normalizar(producto.nombre).includes(consulta)
            || normalizar(producto.descripcion).includes(consulta);
    });
};

/* Busca un producto por su id (el que viaja por la URL) */
const buscarProductoPorId = (id) => {
    return productos.find((producto) => producto.id === id);
};