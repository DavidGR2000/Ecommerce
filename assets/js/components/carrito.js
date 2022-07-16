import productos from '../database/db.js'

let articulos = []

const articulosContenedor = document.getElementById('articulosContenedor')

const precioTotal = document.getElementById('precioTotal')

function pintarArticulos () {
 let html=''
  for (const articulo of articulos) {
    const productoFiltrado = productos.find(producto => producto.id === articulo.id)

    const { id, nombre, imagen, precio, cantidad } = productoFiltrado

    html += `
    <div class="container">
      <img src="${imagen}" alt="${nombre}">
      <div class="text-carrito">
        <h2>${nombre}</h2>
        <p>$ ${articulo.cantidad * precio} x${articulo.cantidad}</p>
        <button class="remover" type="button" data-id="${id}">-</button>
        <span>${articulo.cantidad}</span>
        <button class="agregar gr" type="button" data-id="${id}">+</button>
        <div class="eliminar">
        <button class="removerTodo" type="eliminar" data-id="${id}"><i class="fas fa-trash-alt icon-eli"></i></button>
        </div>
      </div>
  </div>  
    `
  }

  console.log(articulos)
  articulosContenedor.innerHTML = html

  precioTotal.innerHTML = mostrarTotal()
}

function agregarArticulo (id, cantidad) {
  const productoFiltrado = productos.find(producto => producto.id === id)

  if (productoFiltrado && productoFiltrado.cantidad > 0) {
    const articuloFiltrado = articulos.find(articulo => articulo.id === id)
    if (articuloFiltrado) {
      if (checarInventario(id, cantidad + articuloFiltrado.cantidad)) {
        articuloFiltrado.cantidad += cantidad
      } else {
        window.alert('No hay suficiente en stock')
      }
    } else {
      articulos.push({ id, cantidad })
    }
  } else {
    window.alert('Lo sentimos, no hay stock')
  }
}

function removerArticulo (id, cantidad) {
  const articuloFiltrado = articulos.find(articulo => articulo.id === id)

  if (articuloFiltrado.cantidad - cantidad > 0) {
    articuloFiltrado.cantidad -= cantidad
  } else {
    const confirmar = window.confirm('¿Estás Seguro de que quieres remover el articulo?')

    if (confirmar) {
      articulos = articulos.filter(articulo => articulo.id !== id)
    }
  }
}

function removerTodo (id) {
  articulos = articulos.filter(articulo => articulo.id !== id)
}

function checarInventario (id, cantidad) {
  const productoFiltrado = productos.find(producto => producto.id === id)

  return productoFiltrado.cantidad - cantidad >= 0
}

function mostrarTotal () {
  let total = 0
  for (const articulo of articulos) {
    const productoFiltrado = productos.find(producto => producto.id === articulo.id)
    total += articulo.cantidad * productoFiltrado.precio
  }
  return `$${total}`
}

function vaciarCarrito () {
  articulos = []
}

function comprar () {
  for (const articulo of articulos) {
    const productoFiltrado = productos.find(producto => producto.id === articulo.id)

    productoFiltrado.cantidad -= articulo.cantidad
  }

  vaciarCarrito()
  window.alert('Gracias por tu compra')
}

export {
  pintarArticulos,
  agregarArticulo,
  removerArticulo,
  removerTodo,
  vaciarCarrito,
  comprar,
  articulos
}
