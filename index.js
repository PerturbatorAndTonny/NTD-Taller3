document.getElementById("formProyecto").addEventListener("submit", e => {
  e.preventDefault();
  const nameProyect = document.getElementById("proyectName").value.trim();
  const descProyect = document.getElementById("proyectDescription").value.trim();

  saveProyect({ nameProyect,  descProyect});
  renderTable();

  e.target.reset();
})

document.getElementById("btnNuevo").addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("hidden");
})

document.getElementById("btnCerrar").addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("hidden");
})

function saveProyect(proyecto){
  let proyect = JSON.parse(localStorage.getItem("Proyect")) || [];
  proyect.push(proyecto);
  localStorage.setItem("Proyect", JSON.stringify(proyect));
}

function renderTable() {
  const catchElement = document.getElementById("proyectTable");
  const proyects = JSON.parse(localStorage.getItem("Proyect")) || [];

  catchElement.innerHTML = "";

  proyects.forEach(proyect => {

    const card = document.createElement("div");
    card.classList.add("card")

    const titulo = document.createElement("h3");
    titulo.textContent = proyect.nameProyect

    const descripcion = document.createElement("p");
    descripcion.textContent = proyect.descProyect

    card.appendChild(titulo);
    card.appendChild(descripcion);

    catchElement.appendChild(card);
  });
}
