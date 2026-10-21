# ⚡ PokeAPI - CN

Aplicación web sencilla hecha con **HTML, CSS y JavaScript puro** que consume datos de distintas fuentes usando `fetch`: un archivo de texto, un archivo JSON, una API REST pública y la **[PokéAPI](https://pokeapi.co/)** para buscar Pokémon por nombre o ID.

---

## 📑 Tabla de contenido

- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [🚀 Cómo ejecutarlo](#-cómo-ejecutarlo)
- [🧭 Cómo se usa](#-cómo-se-usa)
- [⚙️ Cómo funciona](#️-cómo-funciona)
- [🔌 APIs utilizadas](#-apis-utilizadas)
- [🎨 Estilos](#-estilos)
- [📝 Notas y posibles mejoras](#-notas-y-posibles-mejoras)
- [👤 Autor](#-autor)

---

## ✨ Características

- 📄 **Cargar TXT:** lee y muestra el contenido de un archivo de texto local.
- 🧾 **Cargar JSON:** lee un archivo JSON local y lo muestra como una lista de empleados.
- 🌐 **Cargar API:** consume una API REST externa y lista autores con enlace a cada imagen.
- 🔎 **Buscar Pokémon:** consulta la PokéAPI por **nombre** (`pikachu`) o por **ID** (`25`) y muestra una tarjeta con:
  - 🔢 Número en la Pokédex
  - 🏷️ Nombre
  - 🖼️ Sprite frontal
  - 🔥 Tipos
  - ⚖️ Peso (kg)
  - 📏 Altura (m)
- ⚠️ **Manejo de errores:** mensajes claros si el campo está vacío o el Pokémon no existe.
- 📱 **Diseño responsive** y limpio, con tipografía Inter.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| 🟧 **HTML5** | Estructura de la página |
| 🟦 **CSS3** | Estilos, tarjetas y efectos hover |
| 🟨 **JavaScript (ES6+)** | Lógica, `fetch`, `async/await` y manipulación del DOM |
| 🔤 **Google Fonts (Inter)** | Tipografía |
| 🐾 **PokéAPI** | Datos de los Pokémon |

> 💡 No necesita frameworks, dependencias ni `npm install`.

---

## 📂 Estructura del proyecto

```
📦 Api-POKEMON
├── 📁 css
│   └── 🎨 index.css        # Estilos de la página y de la tarjeta Pokémon
├── 📁 js
│   └── ⚙️ app.js           # Lógica: carga de TXT, JSON, API y búsqueda de Pokémon
├── 📄 index.html           # Página principal
├── 📄 datos.txt            # Datos de ejemplo en texto plano
├── 🧾 empleados.json       # Datos de ejemplo en formato JSON
└── 📘 README.md            # Documentación del proyecto
```

### 📌 Qué hace cada archivo

| Archivo | Descripción |
|---|---|
| `index.html` | Contiene los 3 botones de carga, el buscador de Pokémon y el contenedor `#resultado` donde se pinta todo. |
| `js/app.js` | Define los eventos de los botones y las funciones `cargarTXT`, `cargarJSON`, `cargarREST` y `buscarPokemon`. |
| `css/index.css` | Estilos base, botones, buscador, lista de resultados y tarjeta Pokémon. |
| `datos.txt` | Lista de nombres que se muestra con el botón **Cargar TXT**. |
| `empleados.json` | Arreglo de objetos con `nombre` y `puesto`, usado por **Cargar JSON**. |

---

## 🚀 Cómo ejecutarlo

> ⚠️ **Importante:** no abras `index.html` con doble clic. Los archivos `datos.txt` y `empleados.json` se leen con `fetch`, y los navegadores bloquean eso desde `file://`. Necesitas un servidor local.

### 1️⃣ Clonar o descargar el proyecto

```bash
git clone https://github.com/TU-USUARIO/Api-POKEMON.git
cd Api-POKEMON
```

O descarga el `.zip` y descomprímelo.

### 2️⃣ Levantar un servidor local (elige una opción)

**🟢 Opción A: Live Server (VS Code)**

1. Instala la extensión **Live Server**.
2. Clic derecho sobre `index.html` → **Open with Live Server**.

**🐍 Opción B: Python**

```bash
python3 -m http.server 5500
```

**🟩 Opción C: Node.js**

```bash
npx serve .
```

### 3️⃣ Abrir en el navegador

```
http://localhost:5500
```

(o el puerto que indique tu servidor).

---

## 🧭 Cómo se usa

1. 📄 Pulsa **Cargar TXT** para ver el contenido de `datos.txt`.
2. 🧾 Pulsa **Cargar JSON** para ver la lista de empleados.
3. 🌐 Pulsa **Cargar API** para listar datos desde una API externa.
4. 🔎 Escribe el nombre o el ID de un Pokémon (por ejemplo `pikachu` o `25`) y pulsa **Buscar Pokémon**.

### 🧪 Ejemplos para probar

| Búsqueda | Resultado |
|---|---|
| `pikachu` | ⚡ Pikachu (#25), tipo eléctrico |
| `charizard` | 🔥 Charizard (#6), tipos fuego y volador |
| `1` | 🌱 Bulbasaur (#1) |
| `xyz` | ❌ "El Pokémon buscado no fue encontrado." |
| *(vacío)* | ⚠️ "Por favor, ingresa el nombre o ID de un Pokémon." |

---

## ⚙️ Cómo funciona

### 🔄 Flujo general

```
👆 Clic en botón
      │
      ▼
📡 fetch() → archivo local o API externa
      │
      ▼
🧩 Se transforma la respuesta (text / json)
      │
      ▼
🖥️ Se inserta el HTML en el div #resultado
```

### 🔎 Búsqueda de Pokémon (`buscarPokemon`)

1. Toma el valor del input y lo convierte a minúsculas y sin espacios.
2. Si está vacío, muestra un mensaje de alerta.
3. Llama a `https://pokeapi.co/api/v2/pokemon/{nombre-o-id}` con `async/await`.
4. Si la respuesta no es correcta (`!respuesta.ok`), lanza un error controlado.
5. Si todo sale bien, construye la tarjeta con el ID, nombre, sprite, tipos, peso y altura.
6. Convierte las unidades que entrega la API: el peso viene en hectogramos y la altura en decímetros, así que se divide entre 10 para mostrar **kg** y **m**.

---

## 🔌 APIs utilizadas

| API | Endpoint | Uso |
|---|---|---|
| 🐾 **PokéAPI** | `https://pokeapi.co/api/v2/pokemon/{id o nombre}` | Búsqueda de Pokémon |
| 🖼️ **Lorem Picsum** | `https://picsum.photos/list` | Botón **Cargar API** |

📚 Documentación oficial de la PokéAPI: https://pokeapi.co/docs/v2

---

## 🎨 Estilos

- 🎨 Fondo claro `#f8fafc` y texto oscuro `#0f172a`.
- 🔴 Botón de búsqueda en rojo estilo Pokébola (`#ef4444`).
- 🖱️ Efecto hover con elevación en todos los botones.
- 🃏 Tarjeta Pokémon con sprite circular y etiquetas para los tipos.
- 📜 Área de resultados con scroll cuando el contenido es largo.

---

## 📝 Notas y posibles mejoras

- ⚠️ **El botón "Cargar API" puede fallar:** el endpoint `https://picsum.photos/list` es una versión antigua de Lorem Picsum y ya no responde en el formato original. La versión vigente es `https://picsum.photos/v2/list`, que devuelve `author` y `url` (en lugar de `post_url`). Si quieres que ese botón funcione, hay que actualizar la URL y el nombre del campo en `app.js`.
- 🛡️ Los datos de la API se insertan con `innerHTML`. Para un proyecto real conviene sanear o escapar el contenido.

**💡 Ideas para seguir mejorando:**

- [ ] 🖼️ Mostrar más sprites (de espalda, shiny, artwork oficial)
- [ ] 📊 Añadir estadísticas base (HP, ataque, defensa…)
- [ ] ⌨️ Buscar al presionar **Enter**
- [ ] ⏳ Indicador de carga mientras se consulta la API
- [ ] 📋 Listado paginado de Pokémon
- [ ] 🌙 Modo oscuro

---

## 👤 Autor

Proyecto académico realizado por **TU NOMBRE** 🎓

- 🐙 GitHub: [@TU-USUARIO](https://github.com/TU-USUARIO)
- 📧 Correo: tu-correo@ejemplo.com

---

<p align="center">Hecho con 💙 y mucho ⚡ | Datos por <a href="https://pokeapi.co/">PokéAPI</a></p>
