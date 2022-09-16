// Declaración de constantes
const tarifa_procesamiento_orden = 200;

// Declaración de variables
let total_a_pagar;
let cantidad;

// Clase para productos
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Instanciación de productos
const darth_vader = new Producto("Busto Darth Vader", 1800);
const millennium_falcon = new Producto("Millennium Falcon", 3200);
const minas_tirith = new Producto("Minas Tirith", 2800);
const iron_throne = new Producto("Iron Throne", 4100);
const laberinto = new Producto("Laberinto Cilindrico", 1100);

// Declaración de arrays
const productos_disponibles = [];
const productos_en_carrito = [];

// Asignación de productos dispoinibles en un array
productos_disponibles.push(darth_vader);
productos_disponibles.push(millennium_falcon);
productos_disponibles.push(minas_tirith);
productos_disponibles.push(iron_throne);
productos_disponibles.push(laberinto);

// Funciones
function elegir_cantidad(item) {
    return parseInt(prompt("¿Qué cantidad de unidades del producto " + item.nombre + " te gustaría agregar al carrito? (Escribí un número entero positivo)."));
}

function agregar_al_carrito(item, cant, array_carrito) {
    for (i = 0; i < cant; i++) {
        array_carrito.push(item);
    }
    alert('El producto "' + item.nombre + '" ha sido agregado ' + cant + ' veces al carrito correctamente!');
}

function navegar_catalogo(item, texto_variable) {
    return prompt('Producto: ' + item.nombre + '. Precio: ' + item.precio + '. Escribí "lo quiero" para agregar al carrito de compras.' + texto_variable);
}

// Navegación de productos y agregar al carrito
for (let producto of productos_disponibles) {
    if (productos_disponibles.indexOf(producto) == productos_disponibles.length - 1) {
        let navegacion_catalogo = navegar_catalogo(producto, 'Este es el último producto del catálogo. Tocá el botón de aceptar o cancelar para finalizar y ver el carrito.');
        if (navegacion_catalogo == "lo quiero") {
            cantidad = elegir_cantidad(producto);
            agregar_al_carrito(producto, cantidad, productos_en_carrito);
        }
    }
    else {
        let navegacion_catalogo = navegar_catalogo(producto, 'Tocá el botón de aceptar o cancelar para ver otros productos.');
        if (navegacion_catalogo == "lo quiero") {
            cantidad = elegir_cantidad(producto);
            agregar_al_carrito(producto, cantidad, productos_en_carrito);
        }
    }
};

// Cálculo del total a pagar
total_a_pagar = productos_en_carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, tarifa_procesamiento_orden);

// Revisión carrito
console.log("productos en el carrito: ");
console.log(productos_en_carrito);
console.log("total a pagar: " + total_a_pagar);

// Mensaje total a pagar
alert("El total a pagar por los productos seleccionados es: $" + total_a_pagar + ".");