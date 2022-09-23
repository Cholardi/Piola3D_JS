// Declaración de constantes
const tarifa_procesamiento_orden = 200;

// Declaración de variables
let total_a_pagar;

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
                                <button id="btn${producto.id}" class="btn btn-dark btn_custom_mid">Agregar al
                                    Carrito</button>
                            </div>
                        </div>`;

        cards_container.appendChild(card);

        evento_click_btn(agregar_al_carrito, producto, "btn");
    });
}

function evento_click_btn(accion, prod, id_prefix) {
    const cart_btn = document.getElementById(`${id_prefix}${prod.id}`);
    cart_btn.addEventListener("click", () => {
        accion(prod.id);
        visualizar_carrito(productos_en_carrito, "contenedor_carrito");
        console.log(productos_en_carrito);
    });
}

function agregar_al_carrito(id_prod) {
    const item = productos_disponibles.find(producto => producto.id === id_prod);
    const producto_ya_en_carrito = productos_en_carrito.find(producto => producto.id === id_prod);
    if (producto_ya_en_carrito) {
        producto_ya_en_carrito.cant_pickeada++;
    }
    else {
        productos_en_carrito.push(item);
    }
    visualizar_carrito();
}

function visualizar_carrito() {
    const contenedor_carrito = document.getElementById("contenedor_carrito");

    let rescate_producto;
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
                                    <p>Cantidad: ${producto.cant_pickeada}</p>
                                    <button id="btn_ers${producto.id}" class="btn btn-dark btn_custom_mid">Eliminar del Carrito</button>
                                </div>
                            </div>
                        </div>`;
    });

    contenedor_carrito.innerHTML = cards_agregadas;
    // evento_click_btn(eliminar_del_carrito, producto, "btn_ers");

}

function eliminar_del_carrito(id_prod) {

    const item = productos_en_carrito.find(producto => producto.id === id_prod);
    productos_en_carrito.splice(productos_en_carrito.indexOf(item), 1);
    visualizar_carrito();
}

function vaciar_carrito() {
    const vaciar_carrito = document.getElementById("vaciar_carrito");
    vaciar_carrito.addEventListener("click", () => {
        productos_en_carrito.splice(0, productos_en_carrito.length);
        visualizar_carrito();
    });
}

// function elegir_menu() {
//     let indice = parseInt(prompt("Ingresá una opción: \n 1) Ver productos disponibles \n 2) Buscar productos \n 3) Ver productos ordenados \n 4) Ver productos filtrando por precio \n 5) Ver carrito de compras \n 6) Salir"));
//     return indice;
// }

// function chequeo_num_positivo(num) {
//     return num <= 0 || isNaN(num);
// }

// function elegir_cantidad(item) {
//     let cant;
//     do {
//         cant = parseInt(prompt("¿Qué cantidad de unidades del producto " + item.nombre + " te gustaría agregar al carrito? (Escribí un número entero positivo)."));
//         if (chequeo_num_positivo(cant)) {
//             alert("¡Eso no es un número entero positivo! Intentá de nuevo.");
//         }
//     }
//     while (chequeo_num_positivo(cant));
//     return cant;
// }

// // function agregar_al_carrito(item, cant, array_carrito) {
// //     for (i = 0; i < cant; i++) {
// //         array_carrito.push(item);
// //     }
// //     alert('El producto "' + item.nombre + '" ha sido agregado ' + cant + ' veces al carrito correctamente!');
// // }

// function navegacion_interna_catalogo(item, texto_variable) {
//     return prompt('Producto: ' + item.nombre + '. \nPrecio: $' + item.precio + '.\nEscribí "lo quiero" para agregar al carrito de compras. ' + texto_variable);
// }

// function monto_carrito(array_carrito, valor_base) {
//     if (array_carrito.length > 0) {
//         // Cálculo del total a pagar
//         total_a_pagar = array_carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, valor_base);
//         // Mensaje total a pagar
//         const carrito_total = document.getElementById("carrito_total");
//         carrito_total.innerText = "El total a pagar por los productos seleccionados es: $" + total_a_pagar + ".";
//     }
// }

// function navegar_catalogo(array_productos) {
//     // Navegación de productos y agregar al carrito
//     for (let producto of array_productos) {
//         if (array_productos.indexOf(producto) == array_productos.length - 1) {
//             let navegacion_catalogo = navegacion_interna_catalogo(producto, 'Este es el último producto del catálogo. Tocá el botón de aceptar o cancelar para finalizar y ver el carrito.');
//             if (navegacion_catalogo == "lo quiero") {
//                 cantidad = elegir_cantidad(producto);
//                 agregar_al_carrito(producto, cantidad, productos_en_carrito);
//             }
//         }
//         else {
//             let navegacion_catalogo = navegacion_interna_catalogo(producto, 'Tocá el botón de aceptar o cancelar para ver otros productos.');
//             if (navegacion_catalogo == "lo quiero") {
//                 cantidad = elegir_cantidad(producto);
//                 agregar_al_carrito(producto, cantidad, productos_en_carrito);
//             }
//         }
//     };
// };

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



// let indice_menu;
// do {
//     indice_menu = elegir_menu();
//     switch (indice_menu) {
//         case 1:
//             navegar_catalogo(productos_disponibles);
//             monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//             break;

//         case 2:
//             buscar_en_catalogo(productos_disponibles);
//             break;

//         case 3:
//             ordenar_productos(productos_disponibles);
//             break;

//         case 4:
//             filtrar_productos(productos_disponibles);
//             break;

//         case 5:
//             console.log(productos_en_carrito);
//             monto_carrito(productos_en_carrito, tarifa_procesamiento_orden);
//             break;

//         case 6:
//             alert("¡Hasta Luego!");
//             break;

//         default:
//             alert("Opción Incorrecta.");
//             break;
//     }
// }
// while (indice_menu != 6);

crear_cards_productos(productos_disponibles, "cards_container");
vaciar_carrito();


// Revisión carrito
console.log("productos en el carrito: ");
console.log(productos_en_carrito);
console.log("total a pagar: " + total_a_pagar);

