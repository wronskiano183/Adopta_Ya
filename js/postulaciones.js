// Ejemplo de arreglo de mascotas
const mascotas = [
  {id: 1, nombre: "Luna", especie: "Perro"},
  {id: 2, nombre: "Michi", especie: "Gato"},
  {id: 3, nombre: "Rocky", especie: "Perro"},
   {id: 4, nombre: "Firulais", especie: "Perro"},
   
  
];

// Mostrar postulaciones en la tabla
function mostrarPostulaciones() {
  let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
  let tabla = document.getElementById("tabla-postulaciones");
  tabla.innerHTML = "";

  postulaciones.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.adoptante}</td>
        <td>${p.email}</td>
        <td>${p.mascota}</td>
        <td>
          <span class="badge bg-${p.estado === "Aprobada" ? "success" : p.estado === "Rechazada" ? "danger" : "info"}">
            ${p.estado}
          </span>
        </td>
        <td>
          <button onclick="cambiarEstado(${p.id}, 'Aprobada')" class="btn btn-success btn-sm">Aprobar</button>
          <button onclick="cambiarEstado(${p.id}, 'Rechazada')" class="btn btn-danger btn-sm">Rechazar</button>
          <button onclick="cambiarEstado(${p.id}, 'En revisión')" class="btn btn-secondary btn-sm">Revisar</button>
        </td>
      </tr>
    `;
  });

  actualizarContador();
}

//Cambiamos el estado de una postulación
function cambiarEstado(id, nuevoEstado) {
  let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
  let p = postulaciones.find(p => p.id === id);
  if (p) {
    p.estado = nuevoEstado;
    localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
    mostrarPostulaciones();
  }
}

//Contador para ver las adopciones aprobadas por especie
function actualizarContador() {
  let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
  let contador = {};

  postulaciones.forEach(p => {
    if (p.estado === "Aprobada") {
      let mascota = mascotas.find(m => m.nombre === p.mascota);
      let especie = mascota ? mascota.especie : "Desconocido";
      contador[especie] = (contador[especie] || 0) + 1;
    }
  });

  let lista = document.getElementById("contador");
  lista.innerHTML = "";
  for (let especie in contador) {
    lista.innerHTML += `<li>${especie}: ${contador[especie]}</li>`;
  }
}

//Exportar postulaciones a TXT
function exportarTXT() {
  let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
  let contenido = "ID | Adoptante | Email | Mascota | Estado\n";

  postulaciones.forEach(p => {
    contenido += `${p.id} | ${p.adoptante} | ${p.email} | ${p.mascota} | ${p.estado}\n`;
  });

  let blob = new Blob([contenido], { type: "text/plain" });
  let enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "postulaciones.txt";
  enlace.click();
}

//Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", mostrarPostulaciones);
