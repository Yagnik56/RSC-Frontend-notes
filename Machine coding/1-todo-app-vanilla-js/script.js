document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoSubmit = document.querySelector(".todo-submit");

  let editingItem = null;

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();
    if (!todoText) {
      alert("Please enter a valid task");
      todoInput.focus();
      return;
    }

    if (editingItem) {
      editingItem.querySelector("span").textContent = todoText;
      editingItem = null;
      todoSubmit.innerText = "Add Todo";
    } else {
      addTodoItem(todoText);
    }

    todoInput.value = "";
    todoInput.focus();
  });

  todoList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName !== "BUTTON") return;

    const action = target.dataset.action;
    const todoItem = target.closest("li");

    if (action === "delete") {
      todoItem.remove();
    }

    if (action === "edit") {
      editingItem = todoItem;
      todoSubmit.innerText = "Edit Todo";
      todoInput.value = todoItem.querySelector("span").textContent;
      todoInput.focus();
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todoText;

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.dataset.action = "edit";
    editButton.type = "button";

    const removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.dataset.action = "delete";
    removeButton.type = "button";

    todoItem.append(span, editButton, removeButton);
    todoList.appendChild(todoItem);
  }
});