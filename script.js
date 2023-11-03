const input = document.querySelector('.task-input');
const button = document.querySelector('.add-button');
let tasksList = document.querySelector('.tasks-list');
const emptyListDefault = document.querySelector('.empty-list');
const deleteAll = document.querySelector('.delete-all');
const utils = document.querySelector('.utils');

tasksList.innerHTML = localStorage.getItem('tasks');

let filter = 0;

emptyListController();

button.addEventListener('click', (e) => {
    addTask();
    saveTasks();
});

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        addTask();
        saveTasks();
        removeMsg();
    }
});

tasksList.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        localStorageRemoveLI(e.target.parentElement);
        e.target.parentElement.remove();
        emptyListController();
        saveTasks();
        return;
    } else if (e.target.tagName === "P") {
        e.target.parentElement.classList.toggle('checked');
        let checkbox = e.target.previousElementSibling;
        if(checkbox.checked) {
            checkbox.checked = false;
        }
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        let checkbox = e.target.querySelector('input');
        if(checkbox.checked) {
            checkbox.checked = false;
        }
    } else if (e.target.tagName === 'INPUT') {
        e.target.parentElement.classList.toggle('checked');
    }
    
    saveTasks();
});

utils.addEventListener("click", (e) => {

    let tasks;

    if(e.target.classList[0] === "complete") {
        if(filter === 2) document.querySelector('.incomplete').classList.toggle('filter-selected');
        e.target.classList.toggle('filter-selected');
        if(filter !== 1) {
            filter = 1;
        } else {
            tasksList.innerHTML = localStorage.getItem('tasks');
            filter = 0;
            emptyListController();
            return;
        }
        removeMsg();
        tasksList.innerHTML = localStorage.getItem('tasks');
        tasks = tasksList.querySelectorAll('.checked');
        if(tasks.length < 1) {
            let msg = document.createElement('div');
            msg.classList.add('noTasks');
            msg.innerText = "There's no completed task!";
            tasksList.innerHTML = msg.outerHTML;
            emptyListController();
            return;
        }
        tasksList.innerHTML = '';
        tasks.forEach(function (task) {
            if(task.classList.value === "checked") {
                tasksList.innerHTML += task.outerHTML;
            }
        });
        emptyListController();
    } else if(e.target.classList[0] === "incomplete") {
        if(filter === 1) document.querySelector('.complete').classList.toggle('filter-selected');
        e.target.classList.toggle('filter-selected');
        if(filter !== 2) {
            filter = 2;
        } else {
            tasksList.innerHTML = localStorage.getItem('tasks');
            filter = 0;
            emptyListController();
            return;
        }
        removeMsg();
        tasksList.innerHTML = localStorage.getItem('tasks');
        tasks = tasksList.querySelectorAll('li');
        let incompleteTasks = 0;
        tasks.forEach( (task) => {
            if(task.classList.value === '') incompleteTasks += 1;
        })
        if(incompleteTasks < 1) {
            let msg = document.createElement('div');
            msg.classList.add('noTasks');
            msg.innerText = "There's no incomplete task!";
            tasksList.innerHTML = msg.outerHTML;
            emptyListController();
            return;
        }
        tasksList.innerHTML = '';
        tasks.forEach((task) => {
            if(task.classList.value === '') {
                tasksList.innerHTML += task.outerHTML; 
            }
        });
        emptyListController();
    } else if(e.target.classList.value === "delete-all") {
        tasksList.innerHTML = '';
        localStorage.clear();
    }

    emptyListController();
});

const removeMsg = () => {
    let msg = document.querySelector('.noTasks');
    if(msg) {
        msg.remove();
    }
}

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

function emptyListController () {
    let tasks = tasksList.querySelectorAll('li');
    if(tasks.length > 0) {
        emptyListDefault.style.display = "none";
    } else {
        emptyListDefault.style.display = "flex";
    }
}

const localStorageRemoveLI = (element) => {
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
