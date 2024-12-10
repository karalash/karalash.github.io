document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const showAllBtn = document.getElementById("show-all");
  const showCompletedBtn = document.getElementById("show-completed");
  const showActiveBtn = document.getElementById("show-active");

  let filter = "all";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (text) => {
    const task = {
      id: Date.now(),
      text,
      completed: false,
      date: new Date().toLocaleString("uk-UA"),
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
  };

  const removeTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  const editTask = (id, newText) => {
    const task = tasks.find((task) => task.id === id);
    task.text = newText;
    saveTasks();
    renderTasks();
  };

  const toggleTaskCompletion = (id) => {
    const task = tasks.find((task) => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.dataset.id = task.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

      const span = document.createElement("span");
      span.textContent = `${task.text} (${task.date})`;
      span.addEventListener("dblclick", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.text;
        input.className = "edit-input";
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            editTask(task.id, input.value);
          }
        });
        li.replaceChild(input, span);
        input.focus();
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => removeTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  };

  showAllBtn.addEventListener("click", () => {
    filter = "all";
    renderTasks();
  });

  showCompletedBtn.addEventListener("click", () => {
    filter = "completed";
    renderTasks();
  });

  showActiveBtn.addEventListener("click", () => {
    filter = "active";
    renderTasks();
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && taskInput.value.trim() !== "") {
      addTask(taskInput.value.trim());
      taskInput.value = "";
    }
  });

  renderTasks();
});
