// Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
const idMascota = parseInt(params.get("id"));

// Buscar mascota
const mascota = mascotas.find(m => m.id === idMascota);

// Renderizar
if (mascota) {
  document.getElementById("detalleMascota").innerHTML = `
    <div class="card">
      <img src="${mascota.imagen}" class="card-img-top" alt="${mascota.nombre}">
      <div class="card-body">
        <h3>${mascota.nombre}</h3>
        <p><strong>Especie:</strong> ${mascota.especie}</p>
        <p><strong>Edad:</strong> ${mascota.edad}</p>
        <p><strong>Tamaño:</strong> ${mascota.tamanio}</p>
        <p>${mascota.descripcion}</p>
        <p><strong>Requisitos:</strong> Espacio amplio, compromiso y amor por los animales.</p>
        <a href="postulacion.html?id=${mascota.id}" class="btn btn-success">Postularse para Adopción</a>
      </div>
    </div>
  `;
} else {
  document.getElementById("detalleMascota").innerHTML = `<p>Mascota no encontrada.</p>`;
}
