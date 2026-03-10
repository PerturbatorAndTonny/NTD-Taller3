const catchElement = document.getElementById("proyectTable");

document.addEventListener("DOMContentLoaded", renderTable);

document.getElementById("formProyecto").addEventListener("submit", e => {
  e.preventDefault();
  const nameProyect = document.getElementById("proyectName").value.trim();
  const descProyect = document.getElementById("proyectDescription").value.trim();

  saveProyect({ nameProyect, descProyect });
  renderTable();

  e.target.reset();
})

document.getElementById("btnNuevo").addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("hidden");
})

document.getElementById("btnCerrar").addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("hidden");
})

function getProyects() {
  const proyects = JSON.parse(localStorage.getItem("Proyect")) || [];
  return proyects
}

function saveProyect(proyecto) {
  let proyects = getProyects();
  const newProyect = {
    ...proyecto,
    memebers: [],
    tasks: []
  }
  proyects.push(newProyect);
  localStorage.setItem("Proyect", JSON.stringify(proyects));
}

function deleteProyect(nameProyect) {
  let proyects = getProyects();
  proyects = proyects.filter((proyect) => proyect.nameProyect !== nameProyect);
  localStorage.setItem("Proyect", JSON.stringify(proyects));
}

function addMemeber(projectName, memberName) {
  let proyects = getProyects();
  console.log(projectName)
  proyects.forEach(proyect => {
    if (proyect.nameProyect === projectName) {
      proyect.memebers.push(memberName);
    }
  });
  localStorage.setItem("Proyect", JSON.stringify(proyects));
}

function addTasks(projectName, taskTitle, responsible) {
  let proyects = getProyects();

  proyects.forEach(proyect => {
    if (proyect.nameProyect === projectName) {
      proyect.tasks.push({
        title: taskTitle,
        responsible: responsible
      });
    }
  });
  localStorage.setItem("Proyect", JSON.stringify(proyects));
}

function renderTable() {
  const proyects = getProyects();

  catchElement.innerHTML = "";

  proyects.forEach(proyect => {

    const card = document.createElement("div");
    card.classList.add("card");

    const titulo = document.createElement("h3");
    titulo.textContent = proyect.nameProyect;

    const descripcion = document.createElement("p");
    descripcion.textContent = proyect.descProyect;

    const memberTitle = document.createElement("h4");
    memberTitle.textContent = "Miembros";

    const memberInput = document.createElement("input");
    memberInput.placeholder = "Nombre del miembro";

    const btnAddMember = document.createElement("button");
    btnAddMember.textContent = "Agregar miembro";
    btnAddMember.classList.add("btn");

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = "Tareas";

    const taskInput = document.createElement("input");
    taskInput.placeholder = "Nombre de la tarea";

    const responsibleInput = document.createElement("input");
    responsibleInput.placeholder = "Responsable";

    const btnAddTask = document.createElement("button");
    btnAddTask.textContent = "Agregar tarea";
    btnAddTask.classList.add("btn");

    btnAddTask.onclick = () => {
      if (taskInput.value.trim() !== "" && responsibleInput.value.trim() !== "") {
        addTasks(proyect.nameProyect, taskInput.value.trim(), responsibleInput.value.trim());
        renderTable();
      }
    };

    const taskList = document.createElement("ul");

    proyect.tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.title} - ${task.responsible}`;
      taskList.appendChild(li);
    });

    btnAddMember.onclick = () => {
      if (memberInput.value.trim() !== "") {
        addMemeber(proyect.nameProyect, memberInput.value.trim());
        renderTable();
      }
    };

    const memberList = document.createElement("ul");

    proyect.memebers.forEach(member => {
      const li = document.createElement("li");
      li.textContent = member;
      memberList.appendChild(li);
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar Proyecto";
    btnEliminar.classList.add("btn");

    btnEliminar.onclick = () => {
      deleteProyect(proyect.nameProyect);
      renderTable();
    };

    card.appendChild(titulo);
    card.appendChild(descripcion);

    card.appendChild(memberTitle);
    card.appendChild(memberInput);
    card.appendChild(btnAddMember);
    card.appendChild(memberList);

    card.appendChild(taskTitle);
    card.appendChild(taskInput);
    card.appendChild(responsibleInput);
    card.appendChild(btnAddTask);
    card.appendChild(taskList);

    card.appendChild(btnEliminar);

    catchElement.appendChild(card);
  });
}