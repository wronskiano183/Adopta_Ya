// js/catalogo.js

function mostrarMascotas(lista) {
  const contenedor = document.getElementById("catalogoMascotas");
  contenedor.innerHTML = "";

  lista.forEach(m => {
    const card = `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <img src="${m.imagen}" class="card-img-top" alt="${m.nombre}">
          <div class="card-body">
            <h5 class="card-title">${m.nombre}</h5>
            <p class="card-text">
              Especie: ${m.especie}<br>
              Edad: ${m.edad}<br>
              Tamaño: ${m.tamanio}<br>
              ${m.descripcion}
            </p>
            <a href="detalle.html?id=${m.id}" class="btn btn-primary">Ver Detalles</a>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });
}

// Inicial
mostrarMascotas(mascotas);

// Filtros
document.getElementById("filtroEspecie").addEventListener("change", aplicarFiltros);
document.getElementById("filtroTamanio").addEventListener("change", aplicarFiltros);
document.getElementById("busquedaNombre").addEventListener("input", aplicarFiltros);

function aplicarFiltros() {
  const especie = document.getElementById("filtroEspecie").value;
  const tamanio = document.getElementById("filtroTamanio").value;
  const nombre = document.getElementById("busquedaNombre").value.toLowerCase();

  let filtradas = mascotas.filter(m => {
    return (!especie || m.especie === especie) &&
           (!tamanio || m.tamanio === tamanio) &&
           (!nombre || m.nombre.toLowerCase().includes(nombre));
  });

  mostrarMascotas(filtradas);
}

// Cargar opciones de filtros dinámicamente
window.addEventListener("DOMContentLoaded", () => {
  const especies = [...new Set(mascotas.map(m => m.especie))];
  const tamanios = [...new Set(mascotas.map(m => m.tamanio))];

  const filtroEspecie = document.getElementById("filtroEspecie");
  const filtroTamanio = document.getElementById("filtroTamanio");

  especies.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e;
    opt.textContent = e;
    filtroEspecie.appendChild(opt);
  });

  tamanios.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    filtroTamanio.appendChild(opt);
  });
});
