const catchElement = document.getElementById("proyectTable");

document.addEventListener("DOMContentLoaded", renderTable());

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

function getProyects(){
  const proyects = JSON.parse(localStorage.getItem("Proyect")) || [];
  return proyects
}

function saveProyect(proyecto){
  let proyect = getProyects();
  proyect.push(proyecto);
  localStorage.setItem("Proyect", JSON.stringify(proyect));
}

function deleteProyect(nameProyect){
  let proyects = getProyects();
  proyects = proyects.filter((proyect) => proyect.nameProyect !== nameProyect);
  localStorage.setItem("Proyect", JSON.stringify(proyects));
}

function renderTable() {
  const proyects = getProyects();

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
