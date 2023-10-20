const input = document.querySelector('.task-input');
const button = document.querySelector('.add-button');
const tasksList = document.querySelector('.tasks-list');
const emptyListDefault = document.querySelector('.empty-list');

button.addEventListener('click', (e) => {
    addTask();
});

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        addTask();
    }
});

tasksList.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        let tasks = tasksList.querySelectorAll('li');
        if(!tasks.length) {
            emptyListDefault.style.display = "flex";
        }
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
    let tasks = tasksList.querySelectorAll('li');
    if(tasks) {
        emptyListDefault.style.display = "none";
    }
}
