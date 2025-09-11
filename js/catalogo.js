
// Arreglo de mascotas (ejemplo inicial)
const mascotas = [
  {id: 1, nombre: "Luna", especie: "Perro", edad: 2, tamaño: "Mediano", descripcion: "Juguetona y cariñosa", foto: "img/mascotas/salchicha1.jpg"},
  {id: 2, nombre: "Michi", especie: "Gato", edad: 1, tamaño: "Pequeño", descripcion: "Tranquilo y limpio", foto: "img/mascotas/naranja.jpg"},
  {id: 3, nombre: "Max", especie: "Perro", edad: 4, tamaño: "Grande", descripcion: "Fiel y protector", foto: "img/mascotas/chichuahuaWhite1.jpg"},
  {id: 4, nombre: "Kiwi", especie: "Gato", edad: 3, tamaño: "Pequeño", descripcion: "Muy alegre y canta mucho", foto: "img/mascotas/gatokiwi.jpg"},
  {id: 5, nombre: "zapato", especie: "Gato", edad: 3, tamaño: "Pequeño", descripcion: "Muy alegre y canta mucho", foto: "img/mascotas/gatokiwi.jpg"},
  {id: 6, nombre: "Sol", especie: "Gato", edad: 1, tamaño: "Grande", descripcion: "Ronronea suavemente", foto: "img/mascotas/naranja.jpg"}
];

// Guardar mascotas en localStorage 
if (!localStorage.getItem("pets")) {
  localStorage.setItem("pets", JSON.stringify(mascotas));
}


// Mostrar mascotas en cards
function mostrarMascotas(lista) {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";

  lista.forEach(m => {
    contenedor.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow">
          <img src="${m.foto}" class="card-img-top" alt="${m.nombre}">
          <div class="card-body">
            <h5 class="card-title">${m.nombre}</h5>
            <p class="card-text">${m.descripcion}</p>
            <p><strong>Edad:</strong> ${m.edad} años</p>
            <p><strong>Tamaño:</strong> ${m.tamaño}</p>
            <a href="detalle.html?id=${m.id}" class="btn btn-primary w-100">Ver Detalles</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Filtramos las mascotas según búsqueda y selectores
function aplicarFiltros() {
  let texto = document.getElementById("buscar").value.toLowerCase();
  let especie = document.getElementById("filtro-especie").value;
  let tamaño = document.getElementById("filtro-tamano").value;

  let filtradas = mascotas.filter(m => {
    return (
      m.nombre.toLowerCase().includes(texto) &&
      (especie === "" || m.especie === especie) &&
      (tamaño === "" || m.tamaño === tamaño)
    );
  });

  mostrarMascotas(filtradas);
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarMascotas(mascotas);

  document.getElementById("buscar").addEventListener("input", aplicarFiltros);
  document.getElementById("filtro-especie").addEventListener("change", aplicarFiltros);
  document.getElementById("filtro-tamano").addEventListener("change", aplicarFiltros);
});


