// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    
    if (taskName === "") return; // Don't add empty tasks

    const newTask = {
        id: Date.now(),  // Unique ID based on timestamp
        name: taskName
    };

    // Get existing tasks from localStorage or create an empty array if none exist
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task to the tasks array
    tasks.push(newTask);

    // Save updated tasks array back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = ""; // Clear input after adding task

    loadTasks(); // Reload the tasks on the page
}

// Load tasks from localStorage and render them
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskListElement = document.getElementById('taskList');
    
    taskListElement.innerHTML = ''; // Clear the list before re-rendering

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.name}</span>
            <button class="editBtn" onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskListElement.appendChild(li);
    });
}

// Edit a task
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        const newTaskName = prompt("Edit Task:", task.name);
        if (newTaskName !== null && newTaskName.trim() !== "") {
            task.name = newTaskName.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save edited tasks
            loadTasks(); // Reload tasks on the page
        }
    }
}

// Delete a task
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t.id !== taskId);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated list
    loadTasks(); // Reload tasks on the page
}
