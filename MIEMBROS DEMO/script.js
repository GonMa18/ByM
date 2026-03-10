const cargoSelect = document.getElementById("cargo");
const cargoOtroInput = document.getElementById("cargo-otro");

// Mostrar/ocultar el input de "Otros"
cargoSelect.addEventListener("change", function() {
  if (cargoSelect.value === "Otros") {
    cargoOtroInput.style.display = "block"; // Mostrar input
    cargoOtroInput.required = true;         // Lo hacemos obligatorio
  } else {
    cargoOtroInput.style.display = "none";  // Ocultar input
    cargoOtroInput.required = false;
    cargoOtroInput.value = "";              // Limpiar valor
  }
});

document.getElementById("nuevo-miembro-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Recoger datos del formulario
  let nombre = document.getElementById("nombre").value;
  let foto = document.getElementById("foto").value || "https://www.biskyteam.com/wp-content/uploads/2023/12/free-user-1486-458396.png";
  let linkedin = document.getElementById("linkedin").value || "https://www.biskyteam.com/miembros-24-25-2/";
  // Añadir enlace a LinkedIn si se proporciona
  

  // Si eligen "Otros", se toma el texto del input extra
  let cargo = cargoSelect.value === "Otros" ? cargoOtroInput.value : cargoSelect.value;

  // Crear el bloque HTML del nuevo miembro
  let miembroHTML = `
    <div class="miembro">
      <img src="${foto}" alt="${nombre}">
      <h3>${nombre}</h3>
      <p><strong>${cargo}</strong></p>
      <a href="${linkedin}" target="_blank" class="btn-linkedin"><strong>in</strong></a>
    </div>
  `;

  // Insertar en el contenedor
  document.getElementById("equipo").innerHTML += miembroHTML;

  // Limpiar formulario
  document.getElementById("nuevo-miembro-form").reset();
  cargoOtroInput.style.display = "none"; // Asegurar que se oculte de nuevo
  cargoOtroInput.required = false;
});
