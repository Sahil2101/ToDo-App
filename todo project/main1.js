let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working');
function fetchTodos(){

    fetch('')
}


function addTaskToDom(task){
    const li=document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.completed?'checked':''}class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="pic.png" class="delete" data-id="${task.id}" />
  `
  tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDom (tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

function toggleTask(taskId) {
    const task=tasks.filter(function(task){
        return task.id ==taskId
       });  

       if(task.length>0){
        const currentTask=task[0];
        currentTask.completed= !currentTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return;
       }else{
        showNotification('could not toggle the task');
       }
}

function deleteTask (taskId) {
   const newTasks=tasks.filter(function(task){
    return task.id!==taskId
   });  
   tasks =newTasks;
   renderList();
   showNotification('Task deleted succesfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task can not be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key==='Enter'){
        const text=e.target.value;
        console.log('text', text);

        if(!text){
            showNotification("text can't be empty!")
            return;
        }

        const task={
            text,                              //same as text=text,
            id:Date.now().toString(),
            done:false
        }
        e.target.value='';
        addTask(task);
    }
   
}
function handleClickListener(e){
    const target=e.target;
   // console.log(target);

    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}


function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click', handleClickListener);    
}

initializeApp();