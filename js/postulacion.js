// Ejemplo de catálogo 
const mascotas = [
  {id: 1, nombre: "Luna", especie: "Perro"},
  {id: 2, nombre: "Michi", especie: "Gato"},
  {id: 3, nombre: "Rocky", especie: "Perro"},
  {id: 4, nombre: "Kiwi", especie: "Ave"}
];

//se llena select con mascotas
function cargarMascotasSelect() {
  const select = document.getElementById("mascota");

  mascotas.forEach(m => {
    let option = document.createElement("option");
    option.value = m.id; // guardamos el id
    option.textContent = `${m.nombre} (${m.especie})`;
    select.appendChild(option);
  });

  // Si viene desde detalle.html con ?id=...
  const params = new URLSearchParams(window.location.search);
  const idMascota = params.get("id");
  if (idMascota) {
    select.value = idMascota;
  }
}

// Guardar postulación en localStorage
function guardarPostulacion(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let email = document.getElementById("email").value.trim();
  let idMascota = document.getElementById("mascota").value;
  let experiencia = document.getElementById("experiencia").value.trim();
  let evidencia = document.getElementById("evidencia").value.trim();

  // Validaciones 
  if (!nombre || !email || !idMascota || !experiencia) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }
  // Validar que el nombre no contenga números
if (/\d/.test(nombre)) {
    alert("El nombre no puede contener números.");
    return;
}

  // Buscar datos de la mascota
  let mascota = mascotas.find(m => m.id == idMascota);

  let nuevaPostulacion = {
    id: Date.now(),
    adoptante: nombre,
    email: email,
    mascota: mascota.nombre,
    especie: mascota.especie,
    experiencia: experiencia,
    evidencia: evidencia || "No proporcionada", // aqui se manda por defecto si no hay evidencia
    estado: "En revisión"
  };

  // Leer lo que ya hay en localStorage
  let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];

  // Evitar duplicados (mismo email + misma mascota)
  let duplicado = postulaciones.find(p => p.email === email && p.mascota === mascota.nombre);
  if (duplicado) {
    alert("Ya te postulaste para esta mascota.");
    return;
  }

  postulaciones.push(nuevaPostulacion);
  localStorage.setItem("postulaciones", JSON.stringify(postulaciones));

  alert("✅ ¡Tu postulación fue enviada con éxito!");
  document.getElementById("formPostulacion").reset();
}

// inicia la carga 
document.addEventListener("DOMContentLoaded", () => {
  cargarMascotasSelect();
  document.getElementById("formPostulacion").addEventListener("submit", guardarPostulacion);
});
