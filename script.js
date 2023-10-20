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
    }
});


const addTask = () => {
    if(input.value) {
        let task = document.createElement("li");
        task.innerHTML = input.value;
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