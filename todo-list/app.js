// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listener
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// function
function addTodo(e) {
  e.preventDefault();

  //   todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //   create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //   add todo to local storage
  saveLocalTodos(todoInput.value);

  //   Check mark button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = `<i class = "fas fa-check"></i>`;
  completedBtn.classList.add("completed-btn");
  todoDiv.appendChild(completedBtn);

  //   check trash button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  //   append to list
  todoList.appendChild(todoDiv);
  //   clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //   Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removeTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //   check mark
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complete");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check - hey do i already have thins in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check - hey do i already have thins in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //   todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //   create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //   Check mark button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class = "fas fa-check"></i>`;
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    //   check trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //   append to list
    todoList.appendChild(todoDiv);
  });
}

function removeTodo(todo) {
  // check - hey do i already have thins in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
