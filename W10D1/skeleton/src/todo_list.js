
const todoForm = document.getElementsByClassName("add-todo-form")[0];
const todosUl = document.getElementsByClassName("todos")[0];
let todos;
const todosArr = localStorage.getItem("todosArr");

if (todosArr) {
    todos = JSON.parse(todosArr);
} else {
    todos = [];
}

document.addEventListener("submit", (event) => {
    event.preventDefault();
    let todoField = todoForm.children[0];

    const todo = {
        value: todoField.value,
        done: false
    };

    todos.push(todo);

    localStorage.setItem("todosArr", JSON.stringify(todos));
    todoField.value = "";
    populateList();
});

function populateList() {
    let childs = Array.from(todosUl.children)
    for (let i = 0; i < childs.length; i++) {
        const child = childs[i];
        todosUl.removeChild(child);
    }
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.done;
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.innerHTML = todo.value;
        label.append(checkBox);
        li.append(label);
        todosUl.append(li);
        checkBox.addEventListener("change", () => {
            if (todo.done) {
                // Checkbox is checked..
                todo.done = false;
                todos[i] = todo;
            } else {
                // Checkbox is not checked..
                todo.done = true;
                todos[i] = todo;
            }
            localStorage.setItem("todosArr", JSON.stringify(todos));
        });
    }
}



populateList();