document.addEventListener('DOMContentLoaded', function () {
    let productos = [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElement = document.getElementById('total-carrito');
    const contenedor = document.getElementById('contenedor');
    const borrarTodoCarritoButton = document.getElementById('borrar-carrito');
    
    fetch("./js/productos.json")
      .then(response => response.json())
      .then(data => {
        productos = data;
        cargarProductos();
      });
  


    function cargarProductos() {
      productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <img src="${producto.imagen}" alt="producto 1">
          <div class="informacion">
            <p>${producto.titulo}</p>
            <p class="precio">$${producto.precio}</p>
            <button class="boton-agregar">Añadir al Carrito</button>
          </div>
        `;
        contenedor.appendChild(div);
  
        const botonAgregar = div.querySelector('.boton-agregar');
        botonAgregar.addEventListener('click', function () {
          var nombre = producto.titulo;
          var precio = producto.precio;
  
          var listaProductos = JSON.parse(localStorage.getItem('carrito')) || [];
          listaProductos.push({ nombre: nombre, precio: precio });
          localStorage.setItem('carrito', JSON.stringify(listaProductos));

          Toastify({
            text: "Producto Agregado.",
            duration: 3000,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right,#11294d, #2D4263)",
            },
            onClick: function(){} 
          }).showToast();
        
  
          actualizarListaCarrito();
        });
      });
    }
  
    function actualizarListaCarrito() {
        listaCarrito.innerHTML = '';
    
        var listaProductos = JSON.parse(localStorage.getItem('carrito')) || [];
    
        if (listaProductos.length === 0) {
            var li = document.createElement('li');
            li.textContent = 'El carrito está vacío.';
            listaCarrito.appendChild(li);
        } else {
            var productosAgrupados = {};
    
            listaProductos.forEach(function (producto) {
                if (productosAgrupados[producto.nombre]) {
                    productosAgrupados[producto.nombre].cantidad++;
                    productosAgrupados[producto.nombre].precio += producto.precio;
                } else {
                    productosAgrupados[producto.nombre] = {
                        cantidad: 1,
                        precio: producto.precio
                    };
                }
            });
    
            for (var nombreProducto in productosAgrupados) {
                var producto = productosAgrupados[nombreProducto];
                var li = document.createElement('li');
                li.innerHTML = `${nombreProducto} - Cantidad: ${producto.cantidad} - $${producto.precio.toFixed(2)}`;
    
                var botonEliminar = document.createElement('button');
                botonEliminar.innerHTML = '<i class="bi bi-trash-fill"></i>';
                botonEliminar.className = 'boton-eliminar';
                botonEliminar.setAttribute('data-nombre', nombreProducto);
                botonEliminar.addEventListener('click', function () {
                    var nombreProducto = this.getAttribute('data-nombre');
                    eliminarProducto(nombreProducto);
                    actualizarListaCarrito();
                });
    
                li.appendChild(botonEliminar);
                listaCarrito.appendChild(li);
            }
    
            var total = listaProductos.reduce(function (acumulador, producto) {
                return acumulador + producto.precio;
            }, 0);
    
            totalCarritoElement.textContent = 'Total: $' + total.toFixed(2);
        }
    }
    
  
    function eliminarProducto(nombreProducto) {
      var listaProductos = JSON.parse(localStorage.getItem('carrito')) || [];
      var indice = listaProductos.findIndex(function (producto) {
        return producto.nombre === nombreProducto;
      });
      if (indice !== -1) {
        listaProductos.splice(indice, 1);
        localStorage.setItem('carrito', JSON.stringify(listaProductos));
      }
    }
  
    function borrarTodoCarrito() {
        
      localStorage.removeItem('carrito');
      actualizarListaCarrito();
      totalCarritoElement.textContent = "Total: $0.00"
    }
  
    borrarTodoCarritoButton.addEventListener('click', function () {
        Swal.fire({
            title: "Estas Seguro?",
            text: "Se van a borrar todos tus Productos",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Estoy seguro",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) { 
             borrarTodoCarrito();
              Swal.fire({
                title: "Eliminados",
                text: "Tus Productos han sido Eliminados",
                icon: "success"
              });
            }
          });
    });
  
    cargarProductos();
  
    actualizarListaCarrito();
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    var headerLink = document.querySelector('#header a');
    headerLink.addEventListener('click', function (event) {
      event.preventDefault();
  
      var bodyElement = document.getElementById('body');
      bodyElement.scrollIntoView({ behavior: 'smooth' });
    }); 
  });
  
  window.addEventListener("scroll", function () {
    const contenedor = document.querySelector("#contenedor");
    const header = document.querySelector("#header");
  
    if (contenedor.getBoundingClientRect().top < 10) {
      header.classList.add("scroll")
    } else {
      header.classList.remove("scroll")
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("boton-comprar").addEventListener("click", function () {
        Swal.fire({
            title: "Gracias por su compra",
            text: "Esperamos que vuelva pronto :D",
            imageUrl: "https://steamuserimages-a.akamaihd.net/ugc/819002974397694573/C71EA3769405C97DDC180A1C47AE22EA4C85AB87/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
            imageWidth: 400,
            imageHeight: 220,
            imageAlt: "Custom image",
        });
    });
});


