document.getElementById(`txtBtn`).addEventListener(`click`,cargarTXT);
document.getElementById(`jsonBtn`).addEventListener(`click`,cargarJSON);
document.getElementById(`apiBtn`).addEventListener(`click`,cargarREST);
document.getElementById('pokeBtn').addEventListener('click', buscarPokemon);

function cargarTXT() {
    fetch(`datos.txt`)
        .then(function(res){
            return res.text();
        })
        .then(function(empleados) {
            console.log(empleados);
            document.getElementById(`resultado`).innerHTML = empleados;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function cargarJSON() {
    fetch(`empleados.json`)
        .then(function(res) {
            return res.json();
        })
        .then(function(data){
            let html =  '';
            data.forEach(function(empleado) {
                html += `
                <li>${empleado.nombre} ${empleado.puesto}
                </li>
                `;
            });
            document.getElementById(`resultado`).innerHTML = html;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function cargarREST() {
    fetch('https://picsum.photos/list')
            .then(function(res) {
                return res.json()
            })
            .then(function(images) {
                let html = '';

                images.forEach(function(imagen) {
                        html += `
                            <li>
                                <a target="_blank" href="${imagen.post_url}">Ver Imagen</a>
                                ${imagen.author}
                            </li>
                        `;
                });
                document.getElementById(`resultado`).innerHTML = html;
            })
}

async function buscarPokemon(e) {
    e.preventDefault();

    const pokeInput = document.getElementById('pokeInput');
    const valorBusqueda = pokeInput.value.trim().toLowerCase();
    const resultadoDiv = document.getElementById('resultado');

    // Validación de entrada vacía
    if (valorBusqueda === '') {
        resultadoDiv.innerHTML = '<p class="alert-message">Por favor, ingresa el nombre o ID de un Pokémon.</p>';
        return;
    }

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${valorBusqueda}`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error('El Pokémon buscado no fue encontrado.');
        }

        const pokemon = await respuesta.json();

        const tipos = pokemon.types.map(t => `<span class="badge-type">${t.type.name}</span>`).join(' ');

        resultadoDiv.innerHTML = `
            <div class="poke-card">
                <span class="poke-id">#${pokemon.id}</span>
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <div class="poke-details">
                    <p><strong>Tipos:</strong> ${tipos}</p>
                </div>
                <div class="poke-details">
                    <p><strong>Peso:</strong> ${(pokemon.weight / 10)} kg</p>
                    <p><strong>Altura:</strong> ${(pokemon.height / 10)} m</p>
                </div>
            </div>
        `;

    } catch (error) {
        resultadoDiv.innerHTML = `<p class="alert-message">${error.message}</p>`;
    }
}