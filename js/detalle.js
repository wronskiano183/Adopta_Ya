

document.addEventListener('DOMContentLoaded', function () {

    // Obtenemos el ID de la mascota de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');

    // Si hay un ID en la URL, cargar los datos de esa mascota
    if (petId) {
        loadPetDetails(petId);
    }

    // Función para cargar los detalles de la mascota
    function loadPetDetails(id) {
        // ********----------------Por ahora, simulamos la obtención de datos pero se hará desde localStorage
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const pet = pets.find(p => p.id == id);

        if (pet) {
            // Actualizar la página con los detalles de la mascota
            document.querySelector('.pet-name').textContent = pet.nombre;


            // Actualizar badges
            const badgesContainer = document.querySelector('.d-flex.mb-3');
            badgesContainer.innerHTML = `
                        <span class="badge bg-success me-2">${pet.especie}</span>
                        <span class="badge bg-info me-2">${pet.edad}</span>
                        <span class="badge bg-warning text-dark">${pet.tamaño}</span>
                    `;
            // Actualizar descripción
            document.querySelector('.mb-4carga').textContent = pet.descripcion;

            // ---- DEPURACIÓN DEL CARRUSEL ----

            // Ver el objeto de la mascota
            console.log("Mascota cargada:", pet);

            // Limpiar carrusel
            const carouselInner = document.getElementById('carouselImages');
            const carouselIndicators = document.getElementById('carouselIndicators');
            carouselInner.innerHTML = '';
            carouselIndicators.innerHTML = '';

            // Decidir qué imágenes usar
            let fotos = [];
            if (Array.isArray(pet.fotos) && pet.fotos.length > 0) {
                fotos = pet.fotos;
                console.log("Usando arreglo 'fotos':", fotos);
            } else if (pet.foto) {
                fotos = [pet.foto];
                console.log("Usando 'foto' simple:", fotos);
            } else {
                fotos = ['https://via.placeholder.com/400x300?text=Imagen+no+disponible'];
                console.log("Usando placeholder:", fotos);
            }

            // Crear slides e indicadores
            fotos.forEach((url, index) => {
                console.log(`Creando slide ${index}: ${url}`);

                // Crear slide
                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
        <img src="${url}"
             class="d-block w-100 rounded-3"
             alt="Foto de ${pet.nombre}"
             style="object-fit: cover; max-height: 450px;">
    `;
                carouselInner.appendChild(item);

                // Crear indicador
                const indicator = document.createElement('button');
                indicator.type = "button";
                indicator.setAttribute("data-bs-target", "#petCarousel");
                indicator.setAttribute("data-bs-slide-to", index);
                indicator.className = index === 0 ? "active" : "";
                indicator.setAttribute("aria-current", index === 0 ? "true" : "false");
                indicator.setAttribute("aria-label", `Slide ${index + 1}`);
                carouselIndicators.appendChild(indicator);
            });

            // Verificar cuántos slides se generaron
            console.log("Total slides creados:", carouselInner.children.length);
            console.log("Total indicadores creados:", carouselIndicators.children.length);

            // Inicializar carrusel
            const petCarousel = document.querySelector('#petCarousel');
            if (petCarousel) {
                const carousel = new bootstrap.Carousel(petCarousel, {
                    interval: 3000,
                    ride: 'carousel',
                    wrap: true
                });
                console.log("Carrusel inicializado:", carousel);
            }


            // Actualizar enlace de postulación
            const postulationLink = document.querySelector('.btn-adopt');
            postulationLink.href = `postulacion.html?petId=${pet.id}`;
        }
    }
});

