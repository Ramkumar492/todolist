const body = document.querySelector('body');

const input = document.querySelector('.task-input');
const submitbtn = document.querySelector('.submit-btn');
const taskdisplay = document.querySelector('.task-display');

const clearall = document.querySelector('.clearall');
const empty = document.querySelector('.task-empty');

loadFromMemory();





submitbtn.addEventListener('click', function(e) {
  addTask(input.value, 1);
  e.preventDefault();

});

clearall.addEventListener('click', function() {

  if (confirm('Do you want to Clear all Tasks')) {
    let taskNode = document.querySelector('.task-panel');
    while (taskNode.firstChild) {
      taskNode.removeChild(taskNode.lastChild);

      localStorage.clear('tasks');
      emptyDisplay();
    }
  }

});



taskdisplay.addEventListener('click', function(e) {

  if (e.target.parentElement.className == "cancel-btn") {
    cancelTask = e.target.parentElement.parentElement.innerText;

    e.target.parentElement.parentElement.parentElement.parentElement.remove();



    tasks = getTasksfromLocal();

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].trim() === cancelTask.trim()) {
        tasks.splice(i, 1);
        break;
      }
    }

    if (tasks.length === 0) {
      emptyDisplay();
    }



    localStorage.setItem('tasks', JSON.stringify(tasks));




  }
});


function addTask(input, newTask) {
  let taskpanel = document.querySelector('.task-panel');
  var subcard = document.createElement('div');

  subcard.classList.add('card');
  subcard.classList.add('sub-card');

  subcard.innerHTML = `
                  <div class="card-body  sub-card-body">
                    <p class="task-details">
                      ${input}
                      <a href="#" class="cancel-btn"> <i class="fas fa-window-close"></i></a>

                    </p>


                  </div>


               `

  taskpanel.appendChild(subcard);

  if (newTask === 1) {
    tasks = getTasksfromLocal();

    tasks.push(input);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  empty.style = 'display:none';





}



function loadFromMemory() {

  tasks = getTasksfromLocal();

  if (tasks.length == 0) {
    emptyDisplay();
  }



  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      addTask(tasks[i]);
    }
  }

}


function getTasksfromLocal() {
  if (localStorage.getItem('tasks') === null) {

    tasks = [];

  } else {

    tasks = JSON.parse(localStorage.getItem('tasks'));


  }

  return tasks;
}

function emptyDisplay() {
  empty.style = 'display:inline';
}
