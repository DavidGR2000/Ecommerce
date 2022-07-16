import productos from '../database/db.js'

const productosContenedor = document.getElementById('productosContenedor')

function pintarProductos () {
  let html = ''
  for (const { id, nombre, imagen, precio, cantidad } of productos) {
    html += `
    <article class="card">
      <img src="${imagen}" alt="${nombre}">
      <div class="card-body">
        <h2>${nombre}</h2>
        <h4> $ ${precio} </h4>
        <p>Cantidad: ${cantidad}</p>
      <div>
        <button type="button" class="agregar btn" data-id="${id}"><i class="fas fa-cart-plus icon"></i></button>
        </div>
      </div>
    </article>   
    `
  }
  productosContenedor.innerHTML = html
}
export default pintarProductos
