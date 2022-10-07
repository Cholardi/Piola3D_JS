// Declaración de constantes
const tarifa_procesamiento_orden = 200;

// Declaración de variables
let total_a_pagar = 0;

// Clase para productos
class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cant_pickeada = 1;
        this.img = img;
    }
}

// Instanciación de productos
const darth_vader = new Producto(1, "Busto Darth Vader", 1800, "../imgs/productos/darthvader.jpg");
const millennium_falcon = new Producto(2, "Millennium Falcon", 3200, "../imgs/productos/millennium.jpg");
const minas_tirith = new Producto(3, "Minas Tirith", 2800, "../imgs/productos/tirith.jpg");
const grogu = new Producto(4, "Grogu", 2200, "../imgs/productos/grogu.jpg");
const laberinto = new Producto(5, "Laberinto Cilindrico", 1100, "../imgs/productos/laberinto.jpg");

// Declaración de arrays
const productos_disponibles = [];
const productos_en_carrito = [];
// si hay productos agregados al carrito en el localStorage, los agrego al array correspondiente
if (localStorage.getItem("productos_carrito")) {
    let productos_en_carrito_storage = JSON.parse(localStorage.getItem("productos_carrito"));
    productos_en_carrito.push(...productos_en_carrito_storage);
}

// Asignación de productos dispoinibles en un array
productos_disponibles.push(darth_vader);
productos_disponibles.push(millennium_falcon);
productos_disponibles.push(minas_tirith);
productos_disponibles.push(grogu);
productos_disponibles.push(laberinto);

// Funciones
function crear_cards_productos(array_productos, id_contenedor) {
    const cards_container = document.getElementById(id_contenedor);

    array_productos.forEach(producto => {
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

    productos_en_carrito.forEach(producto => {
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
                                    <input id="cant_pickeada_incart${producto.id}" type="number" name="cant_pickeada_incart${producto.id}" value="${producto.cant_pickeada}" min="1" />
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
    const producto_ya_en_carrito = productos_en_carrito.find(producto => producto.id === id_prod);
    return producto_ya_en_carrito;
}

function agregar_al_carrito(id_prod) {
    const add2cart_btn = document.getElementById(`btn${id_prod}`);
    const item = productos_disponibles.find(producto => producto.id === id_prod);
    add2cart_btn.addEventListener("click", () => {
        producto_ya_en_carrito(id_prod) ? producto_ya_en_carrito(id_prod).cant_pickeada++ : productos_en_carrito.push(item);
        Toastify({
            text: `El producto ${item.nombre} ha sido agregado al carrito exitosamente.`,
            duration: 2000,
            style: {
                background: "#E46526"
            }
        }).showToast();
        visualizar_carrito();
    });

}

function eliminar_del_carrito(id_prod) {
    const item = productos_en_carrito.find(producto => producto.id === id_prod);
    productos_en_carrito.splice(productos_en_carrito.indexOf(item), 1);
    Toastify({
        text: `El producto ${item.nombre} ha sido eliminado del carrito exitosamente.`,
        duration: 2000,
        style: {
            background: "#171717"
        }
    }).showToast();
    visualizar_carrito();
}

function vaciar_carrito() {
    productos_en_carrito.splice(0, productos_en_carrito.length);
    Swal.fire({
        title: "El carrito ha sido vaciado exitosamente.",
        text: 'Presione "Aceptar" para seguir navegando el sitio.',
        color: "white",
        icon: "warning",
        background: "#353535",
        confirmButtonText: "Aceptar"
    });
    visualizar_carrito();
}

// INTENTO MODIFICACION CANTIDAD PRODUCTO CARRITO
function modificar_cantidad_pickeada(id_prod) {
    const item = productos_en_carrito.find(producto => producto.id === id_prod);
    item.cant_pickeada = cantidad_pickeada.value;
    visualizar_carrito();
}

function calcular_total_carrito(array_carrito, valor_base) {
    const total_carrito = document.getElementById("total_carrito");
    total_a_pagar = array_carrito.reduce((acumulador, prod) => acumulador + prod.precio * prod.cant_pickeada, valor_base);
    total_a_pagar == valor_base ? total_carrito.innerText = 0 : total_carrito.innerText = `${total_a_pagar} (Productos: $${total_a_pagar - valor_base}, Tarifa de procesamiento de orden: $${valor_base}).`;
}


crear_cards_productos(productos_disponibles, "cards_container");
visualizar_carrito();

const vaciar_carrito_btn = document.getElementById("vaciar_carrito");
vaciar_carrito_btn.addEventListener("click", vaciar_carrito);

const cantidad_pickeada = document.getElementById(`cant_pickeada_incart1`);
const cant_pickeada_value = cantidad_pickeada.value;
console.log(cant_pickeada_value);
cantidad_pickeada.addEventListener("change", modificar_cantidad_pickeada(1));

// function chequeo_num_positivo(num) {
//     return num <= 0 || isNaN(num);
// }


// function buscar_en_catalogo(array_productos) {
//     let busqueda = prompt("Escribí el nombre exacto del producto que buscás: ");
//     if (array_productos.some(prod => prod.nombre === busqueda)) {
//         let producto_buscado = array_productos.find(prod => prod.nombre === busqueda);

//         let navegacion_catalogo = navegacion_interna_catalogo(producto_buscado, "");
//         if (navegacion_catalogo == "lo quiero") {
//             cantidad = elegir_cantidad(producto_buscado);
//             agregar_al_carrito(producto_buscado, cantidad, productos_en_carrito);
//         }
//     }
//     else {
//         alert('No se encontraron existencias del producto "' + busqueda + '".');
//     }
// }

// function elegir_orden_productos() {
//     let orden = parseInt(prompt("Elegí en qué orden querés ver los productos: \n 1) Precio: Mayor a Menor \n 2) Precio: Menor a Mayor \n 3) Nombre: A-Z \n 4) Nombre: Z-A \n 5) Salir"));
//     return orden;
// }

// function ordenar_productos() {
//     switch (elegir_orden_productos()) {
//         case 1:
//             const productos_disponibles_precio_desc = productos_disponibles.sort((a, b) => b.precio - a.precio);
//             navegar_catalogo(productos_disponibles_precio_desc);
//             monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//             break;

//         case 2:
//             const productos_disponibles_precio_asc = productos_disponibles.sort((a, b) => a.precio - b.precio);
//             navegar_catalogo(productos_disponibles_precio_asc);
//             monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//             break;

//         case 3:
//             const productos_disponibles_precio_AZ = productos_disponibles.sort((a, b) => {
//                 if (a.nombre < b.nombre) {
//                     return -1;
//                 }
//                 if (a.nombre > b.nombre) {
//                     return 1;
//                 }
//             });
//             navegar_catalogo(productos_disponibles_precio_AZ);
//             monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//             break;

//         case 4:
//             const productos_disponibles_precio_ZA = productos_disponibles.sort((a, b) => {
//                 if (a.nombre < b.nombre) {
//                     return 1;
//                 }
//                 if (a.nombre > b.nombre) {
//                     return -1;
//                 }
//             });
//             navegar_catalogo(productos_disponibles_precio_ZA);
//             monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//             break;

//         case 5:
//             alert("¡Hasta Luego!");
//             break;

//         default:
//             alert("Opción Incorrecta.");
//             break;
//     }
// }

// function filtrar_productos() {
//     let limite_min = parseInt(prompt("Ingresá el precio mínimo (sin signo $): "));
//     let limite_max = parseInt(prompt("Ingresá el precio máximo (sin signo $): "));
//     const productos_disponibles_filtro_precio = productos_disponibles.filter(prod => prod.precio >= limite_min && prod.precio <= limite_max);
//     if (productos_disponibles_filtro_precio.length == 0) {
//         alert("No se encontró ningún producto que cumpla con los filtros aplicados.")
//     }
//     else {
//         navegar_catalogo(productos_disponibles_filtro_precio);
//         monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//     }
// }




