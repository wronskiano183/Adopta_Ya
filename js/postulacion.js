// Cargar mascota en select
const selectMascota = document.getElementById("mascotaSelect");
mascotas.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m.id;
  opt.textContent = m.nombre;
  selectMascota.appendChild(opt);
});

// Si viene desde detalle.html?id
const params = new URLSearchParams(window.location.search);
const idMascota = params.get("id");
if (idMascota) {
  selectMascota.value = idMascota;
}

document.getElementById("formPostulacion").addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const idMascota = parseInt(selectMascota.value);
  const experiencia = document.getElementById("experiencia").value.trim();
  const domicilio = document.getElementById("domicilio").value.trim();

  if (!nombre || !email || !idMascota || !experiencia) {
    alert("Todos los campos obligatorios deben estar completos.");
    return;
  }

  let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];

  // Evitar duplicados
  const duplicado = postulaciones.find(p => p.email === email && p.idMascota === idMascota);
  if (duplicado) {
    alert("Ya te postulaste para esta mascota.");
    return;
  }

  const nuevaPostulacion = {
    id: Date.now(),
    nombre,
    email,
    idMascota,
    experiencia,
    domicilio,
    estado: "En revisión"
  };

  postulaciones.push(nuevaPostulacion);
  localStorage.setItem("postulaciones", JSON.stringify(postulaciones));

  alert("Postulación enviada correctamente.");
  window.location.href = "postulaciones.html";
});
