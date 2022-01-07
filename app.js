// Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add task event
    form.addEventListener("submit", addTask);

    // Remove task event
    taskList.addEventListener("click", removeTask);

    // Remove all tasks event
    clearBtn.addEventListener("click", removeAllTasks);

    // Filter through the tasks
    filter.addEventListener("keyup", filterTasks);
}

// Get tasks from local storage function
function getTasks() {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement("li");
        // Add class to the element
        li.className = "collection-item";
        // create text node and append to the li
        li.appendChild(document.createTextNode(task));
        // create the link element to delete the task
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";   
        // Add icon html
        link.innerHTML = '<i class="material-icons">remove_circle</i>';
        // Append the  link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add task function 
function addTask(e) {
    // create li element
    const li = document.createElement("li");
    // Add class to the element
    li.className = "collection-item";
    // create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // create the link element to delete the task
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";   
    // Add icon html
    link.innerHTML = '<i class="material-icons">remove_circle</i>';
    // Append the  link to li
    li.appendChild(link);

    if(taskInput.value === '') {
        alert("Add a task");
    }
    else {
        taskList.appendChild(li);

        // Store task in local storage

        storeTaskInLS(taskInput.value);
    }
    

    // Clear input
    taskInput.value = "";

    e.preventDefault();
}

// Store Task function
function storeTaskInLS(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task function
function removeTask(e) {
    if(e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            // Remove task from local storage
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

// Remove from local storage function
function removeTaskFromLS(taskItem) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.firstChild.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove all tasks function
function removeAllTasks(e) {
    if(confirm("Are you sure you want to remove all tasks?")) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Remove all tasks from local storage
        removeAllTasksFromLS();
    }
}

// Remove all tasks from local storage function
function removeAllTasksFromLS() {
    localStorage.clear();
}

// Filter tasks function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    });
}