// Declaración de constantes
const tarifa_procesamiento_orden = 200;

// Declaración de variables
let total_a_pagar = 0;

// Declaración de arrays
const productos_disponibles = [];
const productos_en_carrito = [];

// si hay productos agregados al carrito en el localStorage, los agrego al array correspondiente
if (localStorage.getItem("productos_carrito")) {
    let productos_en_carrito_storage = JSON.parse(localStorage.getItem("productos_carrito"));
    productos_en_carrito.push(...productos_en_carrito_storage);
}

// Ruta relativa para el stock de productos y fetch
const productos_disponibles_json = "../json_prods/productos.json";
fetch(productos_disponibles_json)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((producto) => {
            productos_disponibles.push(producto);
        });
        crear_cards_productos(productos_disponibles, "cards_container");
    });

// Funciones
function crear_cards_productos(array_productos, id_contenedor) {
    const cards_container = document.getElementById(id_contenedor);
    array_productos.forEach((producto) => {
        let card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `<div class="card text-center h-100">
                            <div class="img_wrapper">
                                <a href="products/minas_tirith_ejemplo.html"><img src="${producto.img}"
                                        class="card-img-top img_link" alt="${producto.nombre}"></a>
                            </div>
                            <div class="card-body d-flex flex-column align-items-center justify-content-around">
                                <h3 class="card-title"><a class="text_link_oscuro"
                                        href="">${producto.nombre}</a></h3>
                                <p class="precio_prod">$${producto.precio}</p>
                                <button id="btn${producto.id}" class="btn btn-dark btn_custom_mid mb-2">Agregar al
                                    Carrito</button>
                            </div>
                        </div>`;

        cards_container.appendChild(card);

        agregar_al_carrito(producto.id);
    });
}

function visualizar_carrito() {
    const contenedor_carrito = document.getElementById("contenedor_carrito");

    let cards_agregadas = "";

    productos_en_carrito.forEach((producto) => {
        cards_agregadas += `
                        <div class="col">
                            <div class="card text-center h-100">
                                <div class="img_wrapper">
                                    <a href="products/minas_tirith_ejemplo.html"><img src="${producto.img}"
                                            class="card-img-top img_link" alt="${producto.nombre}"></a>
                                </div>
                                <div class="card-body d-flex flex-column align-items-center justify-content-around">
                                    <h3 class="card-title"><a class="text_link_oscuro"
                                            href="">${producto.nombre}</a></h3>
                                    <p class="precio_prod">$${producto.precio}</p>
                                    <label for="cant_pickeada_incart${producto.id}">Cantidad:</label>
                                    <input onChange ="modificar_cantidad_pickeada(${producto.id})" id="cant_pickeada_incart${producto.id}" type="number" name="cant_pickeada_incart${producto.id}" value="${producto.cant_pickeada}" min="1" />
                                    <button onClick = "eliminar_del_carrito(${producto.id})" class="btn btn-dark btn_custom_mid mb-2 mt-3">Eliminar del Carrito</button>
                                </div>
                            </div>
                        </div>`;
    });

    contenedor_carrito.innerHTML = cards_agregadas;
    calcular_total_carrito(productos_en_carrito, tarifa_procesamiento_orden);
    localStorage.setItem("productos_carrito", JSON.stringify(productos_en_carrito));
}

// Orden productos
function ordenar_productos() {
    const ordenes = {
        default: orden_default,
        "a-z": ordenar_az,
        "z-a": ordenar_za,
        "menor-mayor": ordenar_menor_mayor,
        "mayor-menor": ordenar_mayor_menor,
    };

    const ordenar_productos_criterio = ordenes[selector_orden.value];
    ordenar_productos_criterio();
}

function orden_default() {
    cards_container.innerHTML = "";
    crear_cards_productos(productos_disponibles, "cards_container");
}

function ordenar_az() {
    const productos_disponibles_az = [...productos_disponibles].sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
    });
    cards_container.innerHTML = "";
    crear_cards_productos(productos_disponibles_az, "cards_container");
}

function ordenar_za() {
    const productos_disponibles_za = [...productos_disponibles].sort((a, b) => {
        if (a.nombre < b.nombre) {
            return 1;
        }
        if (a.nombre > b.nombre) {
            return -1;
        }
    });
    cards_container.innerHTML = "";
    crear_cards_productos(productos_disponibles_za, "cards_container");
}

function ordenar_menor_mayor() {
    const productos_disponibles_menor_mayor = [...productos_disponibles].sort((a, b) => a.precio - b.precio);
    cards_container.innerHTML = "";
    crear_cards_productos(productos_disponibles_menor_mayor, "cards_container");
}

function ordenar_mayor_menor() {
    const productos_disponibles_mayor_menor = [...productos_disponibles].sort((a, b) => b.precio - a.precio);
    cards_container.innerHTML = "";
    crear_cards_productos(productos_disponibles_mayor_menor, "cards_container");
}

// Búsqueda
function buscar_en_catalogo() {
    const cards_container = document.getElementById("cards_container");
    cards_container.innerHTML = "";
    const productos_buscados = [];
    const texto_busqueda = searchbar.value.toLowerCase();
    productos_disponibles.forEach((prod) => {
        let nombre_prod = prod.nombre.toLowerCase();
        if (nombre_prod.includes(texto_busqueda)) {
            productos_buscados.push(prod);
        }
    });
    crear_cards_productos(productos_buscados, "cards_container");
    if (cards_container.innerHTML === "") {
        cards_container.innerHTML = `<p class="text-white w-100 text-center">No se encontró ningún producto</p>`;
    }
}

// Carrito
function producto_ya_en_carrito(id_prod) {
    const producto_ya_en_carrito = productos_en_carrito.find((producto) => producto.id === id_prod);
    return producto_ya_en_carrito;
}

function agregar_al_carrito(id_prod) {
    const add2cart_btn = document.getElementById(`btn${id_prod}`);
    const item = productos_disponibles.find((producto) => producto.id === id_prod);
    add2cart_btn.addEventListener("click", () => {
        producto_ya_en_carrito(id_prod) ? producto_ya_en_carrito(id_prod).cant_pickeada++ : productos_en_carrito.push(item);
        Toastify({
            text: `El producto ${item.nombre} ha sido agregado al carrito exitosamente.`,
            duration: 2000,
            style: {
                background: "#E46526",
            },
        }).showToast();
        visualizar_carrito();
    });
}

function eliminar_del_carrito(id_prod) {
    const item = productos_en_carrito.find((producto) => producto.id === id_prod);
    productos_en_carrito.splice(productos_en_carrito.indexOf(item), 1);
    item.cant_pickeada = 1;
    Toastify({
        text: `El producto ${item.nombre} ha sido eliminado del carrito exitosamente.`,
        duration: 2000,
        style: {
            background: "#171717",
        },
    }).showToast();
    visualizar_carrito();
}

function vaciar_carrito() {
    productos_en_carrito.forEach((producto) => {
        producto.cant_pickeada = 1;
    });
    productos_en_carrito.splice(0, productos_en_carrito.length);
    Swal.fire({
        title: "El carrito ha sido vaciado exitosamente.",
        text: 'Presione "Aceptar" para seguir navegando el sitio.',
        color: "white",
        icon: "warning",
        background: "#353535",
        confirmButtonText: "Aceptar",
    });
    visualizar_carrito();
}

function efectuar_compra() {
    let listado_productos_carrito = [];
    productos_en_carrito.forEach((producto) => {
        listado_productos_carrito.push(`${producto.nombre} ${producto.cant_pickeada}x $${producto.precio}`);
    });
    listado_productos_carrito = listado_productos_carrito.join("<br>");
    productos_en_carrito.forEach((producto) => {
        producto.cant_pickeada = 1;
    });
    productos_en_carrito.splice(0, productos_en_carrito.length);
    Swal.fire({
        title: "Compra realizada exitosamente.",
        html: `<div>
                    <p>¡Gracias por tu compra!</p>
                    <p>Productos: <br> ${listado_productos_carrito}</p>
                    <p>Monto Total: $${total_carrito.innerText}</p>
                </div>`,
        color: "white",
        icon: "success",
        background: "#353535",
        confirmButtonText: "Aceptar",
    });
    visualizar_carrito();
}

function modificar_cantidad_pickeada(id_prod) {
    const item = productos_en_carrito.find((producto) => producto.id === id_prod);
    const cantidad_pickeada = document.getElementById(`cant_pickeada_incart${id_prod}`);
    item.cant_pickeada = cantidad_pickeada.value;
    visualizar_carrito();
}

function calcular_total_carrito(array_carrito, valor_base) {
    const total_carrito = document.getElementById("total_carrito");
    total_a_pagar = array_carrito.reduce((acumulador, prod) => acumulador + prod.precio * prod.cant_pickeada, valor_base);
    total_a_pagar == valor_base
        ? (total_carrito.innerText = 0)
        : (total_carrito.innerText = `${total_a_pagar}
    (Productos: $${total_a_pagar - valor_base}, Tarifa de procesamiento de orden: $${valor_base}).`);
}

visualizar_carrito();

const vaciar_carrito_btn = document.getElementById("vaciar_carrito");
vaciar_carrito_btn.addEventListener("click", vaciar_carrito);

const efectuar_compra_btn = document.getElementById("efectuar_compra");
efectuar_compra_btn.addEventListener("click", efectuar_compra);

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("input", buscar_en_catalogo);

const selector_orden = document.getElementById("order");
selector_orden.addEventListener("change", ordenar_productos);