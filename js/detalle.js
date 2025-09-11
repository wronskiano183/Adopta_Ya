

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
                document.querySelector('.mb-4carga').textContent = pet.descripcion;

                    // OPCIÓN 2: Actualizar imagen estática (RECOMENDADO)
                    const staticImage = document.getElementById('staticPetImage');
                    if (pet.foto) {
                        console.log('Cargando foto estática:', pet.foto);
                        staticImage.src = pet.foto;
                        staticImage.alt = `Foto de ${pet.nombre}`;
                        
                        // Manejar errores de carga de imagen
                        staticImage.onerror = function() {
                            this.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                            this.alt = 'Imagen no disponible';
                        };
                    } else {
                        staticImage.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                        staticImage.alt = 'Imagen no disponible';
                    }
           
                    
                    // Actualizar enlace de postulación
                    const postulationLink = document.querySelector('.btn-adopt');
                    postulationLink.href = `postulacion.html?petId=${pet.id}`;
                }
            }
        });

