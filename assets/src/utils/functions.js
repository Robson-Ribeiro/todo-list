const input = document.querySelector('.task-input');
let tasksList = document.querySelector('.tasks-list');
const emptyListDefault = document.querySelector('.empty-list');

tasksList.innerHTML = localStorage.getItem('tasks');

export const removeMsg = () => {
    let msg = document.querySelector('.noTasks');
    if(msg) {
        msg.remove();
    }
}

export const addTask = () => {
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

export const saveTasks = () => {
    let tasks = tasksList.querySelectorAll('li');
    let tasksHTML = document.createElement('div');

    let persist = document.createElement('div');
    persist.innerHTML = localStorage.getItem('tasks');
    persist = persist.querySelectorAll('li');

    tasks = Array.from(tasks);
    persist = Array.from(persist);
    if(persist) {
        tasks.forEach((task) => {
            persist.forEach((data, i) => {
                if(task.innerText.replace('\n\n', '') === data.innerText) {
                    persist.splice(i, 1);
                }
            })
        });
        tasks = [...tasks].concat([...persist]);
    }
    tasks.forEach(function (task) {
        tasksHTML.innerHTML += task.outerHTML;
    });
    localStorage.setItem("tasks", tasksHTML.innerHTML);
}

export function emptyListController () {
    let tasks = tasksList.querySelectorAll('li');
    if(tasks.length > 0) {
        emptyListDefault.style.display = "none";
    } else {
        emptyListDefault.style.display = "flex";
    }
}

export const localStorageRemoveLI = (element) => {
    let local = document.createElement('div');
    local.innerHTML = localStorage.getItem('tasks');
    local = local.querySelectorAll('li');
    local = Array.from(local);
    
    if(!local) return;

    local.forEach((task, i) => {
        if(task.innerText === element.innerText.replace('\n\n', '')) {
            local.splice(i, 1);
        }
    });

    let tasksHTML = document.createElement('div');

    local.forEach(function (task) {
        tasksHTML.innerHTML += task.outerHTML;
    });
    localStorage.setItem("tasks", tasksHTML.innerHTML);
}
