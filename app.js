// Declarar el array de amigos
let amigos = [];

// Función para agregar amigos
function agregarAmigo() {
    let inputNombre = document.querySelector("#amigo"); // Capturar el valor del campo de entrada
    let nombre = inputNombre.value.trim(); // Eliminar espacios extra

    // Validar que el campo no esté vacío
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }

    amigos.push(nombre); // Agregar el nombre al array
    inputNombre.value = ""; // Limpiar el campo de entrada
    console.log(amigos); // Mostrar la lista en consola para verificar

    // Actualizar la lista de amigos en HTML
    actualizarLista();
}

// Función para actualizar la lista de amigos en HTML
function actualizarLista() {
    let lista = document.querySelector("#listaAmigos"); // Obtener el elemento de la lista

    lista.innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos

    // Iterar sobre el array de amigos y agregar cada uno a la lista
    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement("li"); // Crear un nuevo elemento <li>
        li.textContent = amigos[i]; // Establecer el texto del <li> con el nombre del amigo
        lista.appendChild(li); // Agregar el <li> a la lista
    }
}

// Función para sortear amigos secretos (lógica básica para el sorteo)
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos dos amigos para realizar el sorteo.");
        return;
    }

    let sorteados = [...amigos]; // Copiar el array de amigos
    let resultado = {}; // Objeto para almacenar los resultados del sorteo

    // Mezclar aleatoriamente los amigos
    sorteados = sorteados.sort(() => Math.random() - 0.5);

    // Asegurarse de que nadie se sortee a sí mismo
    for (let i = 0; i < amigos.length; i++) {
        // Si el amigo sorteado es el mismo que el amigo actual, intercambiamos los amigos
        if (amigos[i] === sorteados[i]) {
            let temp = sorteados[i];
            sorteados[i] = sorteados[i === amigos.length - 1 ? 0 : i + 1]; // Asignar al siguiente amigo
            sorteados[i === amigos.length - 1 ? 0 : i + 1] = temp; // Asignar el amigo que se cambió
        }
        // Asignamos el amigo sorteado
        resultado[amigos[i]] = sorteados[i];
    }

    mostrarResultadoSorteo(resultado); // Mostrar el resultado
}

// Función para mostrar los resultados del sorteo en la lista
function mostrarResultadoSorteo(resultado) {
    let listaResultado = document.querySelector("#resultado");
    listaResultado.innerHTML = ""; // Limpiar la lista de resultados

    // Iterar sobre los resultados y agregar cada uno a la lista
    for (let amigo in resultado) {
        let li = document.createElement("li");
        li.textContent = `${amigo} → ${resultado[amigo]}`;
        listaResultado.appendChild(li);
    }
}

// Agregar evento para presionar Enter
document.querySelector("#amigo").addEventListener("keypress", function(event) {
    // Si se presiona Enter (código 13)
    if (event.key === "Enter") {
        agregarAmigo(); // Llamamos a la función de agregar amigo
    }
});

// Evento para el botón de agregar amigo
document.querySelector(".button-add").addEventListener("click", function() {
    agregarAmigo();
});
