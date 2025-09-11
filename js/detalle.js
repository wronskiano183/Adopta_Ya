        document.addEventListener('DOMContentLoaded', function() {
            // Obtener el ID de la mascota de la URL
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
                    document.querySelector('.mb-4').textContent = pet.descripcion;
                    
                    // Actualizar enlace de postulación
                    const postulationLink = document.querySelector('.btn-adopt');
                    postulationLink.href = `postulacion.html?petId=${pet.id}`;
                }
            }
        });