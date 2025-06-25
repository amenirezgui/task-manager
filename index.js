// getting elements
let addbtn = document.getElementById("addtask");
let input = document.getElementById("inputfield");
let tasks = document.getElementById("tasks");
let alltasks = document.getElementById("alltasks");
let completed_tasks = document.getElementById("completed");
let pending_tasks = document.getElementById("pending");
let high_priority = document.getElementById("high");

// get data from local storage
let tasks_arr=[];
try {
    tasks_arr = JSON.parse(localStorage.getItem("tasks"))
} catch (error) {
    tasks_arr =[];
}

// event listeners
addbtn.addEventListener("click",addTask);
alltasks.addEventListener("click",allTasks);
completed_tasks.addEventListener("click",completed);
pending_tasks.addEventListener("click",pending);
high_priority.addEventListener("click",high);

// load all tasks when page loads
function loadTasks(){
    tasks_arr.forEach((value) => {
        if (!value || !value.name || value.name.trim() === "") return;

        // create task item
        let task = document.createElement("li");
        task.innerText = value.name;
        task.classList.add("task");

        // create icons
        let status = document.createElement("i");
        let priority = document.createElement("i");
        let trash = document.createElement("i");

        // toggle status icon
        if (value.status){
            status.classList.add("fa-solid","fa-check");
        }else{
            status.classList.add("fa-solid","fa-xmark");
        }

        // toggle priority icon
        if (value.priority){
            priority.classList.add("fa-solid","fa-arrow-up-wide-short");
        }else{
            priority.classList.add("fa-solid","fa-arrow-down-wide-short");
        }

        // trash icon
        trash.classList.add("fa-solid","fa-trash");

        // append icons to task
        task.appendChild(status);
        task.appendChild(priority);
        task.appendChild(trash);
        tasks.append(task);

        // click actions
        status.addEventListener("click",(event)=>updateStatus(event))
        priority.addEventListener("click",(event)=>updatepriority(event))
        trash.addEventListener("click",(event)=>trashfun(event))
    })
}
loadTasks();

// add new task
function addTask(){
    let task = document.createElement("li");
    if (input.value == ""){
        alert("Please Fill Required Field");
        return;
    }
    task.innerText = (input.value).trim();
    task.classList.add("task");

    // icons
    let status = document.createElement("i");
    let priority = document.createElement("i");
    let trash = document.createElement("i");

    status.classList.add("fa-solid","fa-xmark");
    priority.classList.add("fa-solid","fa-arrow-down-wide-short");
    trash.classList.add("fa-solid","fa-trash");

    task.appendChild(status);
    task.appendChild(priority);
    task.appendChild(trash);

    // save in storage
    let obj = {name:input.value, status:false, priority:false};
    tasks_arr.push(obj);
    localStorage.setItem("tasks", JSON.stringify(tasks_arr));

    tasks.append(task);

    // event listeners for new icons
    status.addEventListener("click",(event)=>updateStatus(event))
    priority.addEventListener("click",(event)=>updatepriority(event))
    trash.addEventListener("click",(event)=>trashfun(event))

    input.value = "";
}

// update status icon (check/x)
function updateStatus(event){
    let task = event.target;
    let task_name = event.target.parentNode.firstChild.textContent;

    tasks_arr.forEach((value)=>{
        if (!value || !value.name || value.name.trim() === "") return;
        if (value.name == task_name){
            value.status = !value.status;
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks_arr));

    // switch icon
    task.classList.toggle("fa-check");
    task.classList.toggle("fa-xmark");
}

// update priority icon (up/down)
function updatepriority(event){
    let task = event.target;
    let task_name = event.target.parentNode.firstChild.textContent;

    tasks_arr.forEach((value)=>{
        if (!value || !value.name || value.name.trim() === "") return;
        if (value.name == task_name){
            value.priority = !value.priority;
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks_arr));

    task.classList.toggle("fa-arrow-up-wide-short");
    task.classList.toggle("fa-arrow-down-wide-short");
}

// delete task
function trashfun(event){
    let task = event.target.parentElement;
    let task_name = event.target.parentNode.firstChild.textContent;

    tasks_arr = tasks_arr.filter(value => {
        if (!value || !value.name || value.name.trim() === "") return false;
        return value.name != task_name;
    })
    localStorage.setItem("tasks", JSON.stringify(tasks_arr));
    task.remove();
}

// show all tasks
function allTasks(event){
    let cur_tasks = document.querySelectorAll(".task");
    cur_tasks.forEach(value => value.remove());
    loadTasks();
}

// show only completed
function completed(){
    let cur_tasks = document.querySelectorAll(".task");
    cur_tasks.forEach(value => value.remove());

    tasks_arr.forEach(value => {
        if (!value || !value.name || value.name.trim() === "") return false;
        if (value.status){
            let task = document.createElement("li");
            task.innerText = value.name;
            task.classList.add("task");

            let status = document.createElement("i");
            let priority = document.createElement("i");
            let trash = document.createElement("i");

            if (value.priority){
                priority.classList.add("fa-solid","fa-arrow-up-wide-short");
            }else{
                priority.classList.add("fa-solid","fa-arrow-down-wide-short");
            }
            status.classList.add("fa-solid","fa-check");
            trash.classList.add("fa-solid","fa-trash");

            task.appendChild(status);
            task.appendChild(priority);
            task.appendChild(trash);
            tasks.append(task);

            status.addEventListener("click",(event)=>updateStatus(event))
            priority.addEventListener("click",(event)=>updatepriority(event))
            trash.addEventListener("click",(event)=>trashfun(event))
        }
    })   
}

// show pending tasks
function pending(){
    let cur_tasks = document.querySelectorAll(".task");
    cur_tasks.forEach(value => value.remove());

    tasks_arr.forEach(value => {
        if (!value || !value.name || value.name.trim() === "") return false;
        if (!value.status){
            let task = document.createElement("li");
            task.innerText = value.name;
            task.classList.add("task");

            let status = document.createElement("i");
            let priority = document.createElement("i");
            let trash = document.createElement("i");

            if (value.priority){
                priority.classList.add("fa-solid","fa-arrow-up-wide-short");
            }else{
                priority.classList.add("fa-solid","fa-arrow-down-wide-short");
            }
            status.classList.add("fa-solid","fa-xmark");
            trash.classList.add("fa-solid","fa-trash");

            task.appendChild(status);
            task.appendChild(priority);
            task.appendChild(trash);
            tasks.append(task);

            status.addEventListener("click",(event)=>updateStatus(event))
            priority.addEventListener("click",(event)=>updatepriority(event))
            trash.addEventListener("click",(event)=>trashfun(event))
        }
    })   
}

// show only high priority
function high(){
    let cur_tasks = document.querySelectorAll(".task");
    cur_tasks.forEach(value => value.remove());

    tasks_arr.forEach(value => {
        if (!value || !value.name || value.name.trim() === "") return false;
        if (value.priority){
            let task = document.createElement("li");
            task.innerText = value.name;
            task.classList.add("task");

            let status = document.createElement("i");
            let priority = document.createElement("i");
            let trash = document.createElement("i");

            if (value.status){
                status.classList.add("fa-solid","fa-check");
            }else{
                status.classList.add("fa-solid","fa-xmark");
            }
            priority.classList.add("fa-solid","fa-arrow-up-wide-short");
            trash.classList.add("fa-solid","fa-trash");

            task.appendChild(status);
            task.appendChild(priority);
            task.appendChild(trash);
            tasks.append(task);

            status.addEventListener("click",(event)=>updateStatus(event))
            priority.addEventListener("click",(event)=>updatepriority(event))
            trash.addEventListener("click",(event)=>trashfun(event))
        }
    })   
}
