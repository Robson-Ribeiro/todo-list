const input = document.querySelector('.task-input');
const button = document.querySelector('.add-button');
let tasksList = document.querySelector('.tasks-list');
const emptyListDefault = document.querySelector('.empty-list');
const deleteAll = document.querySelector('.delete-all');


tasksList.innerHTML = localStorage.getItem('tasks');

emptyListController();

button.addEventListener('click', (e) => {
    addTask();
    saveTasks();
});

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        addTask();
        saveTasks();
    }
});

tasksList.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        saveTasks();
        emptyListController();
    } else if (e.target.tagName === "P") {
        let checkbox = e.target.previousElementSibling;
        if(checkbox.checked) {
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
    } else if (e.target.tagName === "LI") {
        let checkbox = e.target.querySelector('input');
        if(checkbox.checked) {
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
    }
});

deleteAll.addEventListener("click", () => {
    tasksList.innerHTML = '';
    saveTasks();
    emptyListController();
});



const addTask = () => {
    if(input.value) {
        let task = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        task.appendChild(checkbox);

        let p = document.createElement("p");
        p.classList.add("task-text");
        p.innerHTML = input.value;
        task.appendChild(p);

        let btn = document.createElement('button');
        btn.innerHTML = "\u00d7";
        task.appendChild(btn);

        tasksList.appendChild(task);
        input.value = '';
    } else {
        return window.alert('You need to write the task before creating it!');
    }
    emptyListController();
}

const saveTasks = () => {
    let tasks = document.querySelectorAll('li');
    let tasksHTML = document.createElement('div');
    tasks.forEach(function (task) {
        tasksHTML.innerHTML += task.outerHTML;
    });
    localStorage.setItem("tasks", tasksHTML.innerHTML);
}

function emptyListController () {
    let tasks = tasksList.querySelectorAll('li');
    if(tasks.length > 0) {
        emptyListDefault.style.display = "none";
    } else {
        emptyListDefault.style.display = "flex";
    }
}
