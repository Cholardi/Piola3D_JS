// Declaración de constantes
const tarifa_procesamiento_orden = 200;

// Declaración de variables
let total_a_pagar = 0;

// Declaración de arrays
const productos_disponibles = [];
const productos_en_carrito = [];
const productos_buscados = [];

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