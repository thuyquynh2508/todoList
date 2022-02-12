// đưa ra hết các elements được yêu cầu
const inputWork = document.querySelector('.add-modal__input');
const inputDate = document.querySelector('.js-input-date');
const inputBegin = document.querySelector('.js-time-begin');
const inputFinish = document.querySelector('.js-time-finish');
const inputPriority = document.querySelector('.add-modal__priority-select');

const submitButton = document.querySelector('.js-button-submit');
const cancelBtn = document.querySelector('.js-button-cancel');

const taskList = document.querySelector('.tasks-content');
const infoWorkList = document.querySelector('.work-list');
const todayLine = document.querySelector('.date-text');

const clearAllBtn = document.querySelector('.clear-all-btn');
const headerModal = document.querySelector('.add-modal__header');

const dialogModal = document.querySelector('.dialog-container');
const dialogYes = document.querySelector('.dialog-btn__yes');
const dialogNo = document.querySelector('.dialog-btn__no');

const statusSection = document.querySelector('.task-status-container');
const statusCompleteBtn = document.querySelector('.task-btn-status-complete');
const statusComplete = document.getElementsByClassName('task-btn-status-complete');
const statusOngoingBtn = document.querySelector('.task-btn-status-ongoing');
const statusOngoing = document.getElementsByClassName('task-btn-status-ongoing');
const statusPendingBtn = document.querySelector('.task-btn-status-pending');
const statusPending = document.getElementsByClassName('task-btn-status-pending');
const statusCancelBtn = document.querySelector('.task-btn-status-cancel');
const statusCancel = document.getElementsByClassName('task-btn-status-cancel');
const doneStatusBtn = document.querySelector('.task-status-done');

const notifiModal = document.querySelector('.notification-container');
showTasks()
showDateToday()

//nếu người dùng click vào submit
submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    let getNewTodoLocalStorage = localStorage.getItem('New todo:');
    if (getNewTodoLocalStorage == null) { //nếu localStorage trống (chưa có công việc nào)
        todoArr = []; //tạo mảng mới
    } else {
        todoArr = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
    }
    let taskIndex = this.getAttribute('index')
    if (taskIndex == 0 || taskIndex) {
        todoArr[taskIndex].name = inputWork.value;
        todoArr[taskIndex].date = inputDate.value;
        todoArr[taskIndex].begin = inputBegin.value;
        todoArr[taskIndex].finish = inputFinish.value;
        todoArr[taskIndex].pri = inputPriority.value;
        this.removeAttribute('index');
    } else {
        let userText = inputWork.value;
        let dateWork = inputDate.value;
        let timeBegin = inputBegin.value;
        let timeFinish = inputFinish.value;
        let priority = inputPriority.value;
        let status = '';

        let timeNow = showTimeNow();
        let timeNowAll = timeNow.split(":");
        let hourNow = timeNowAll[0];
        let minuteNow = timeNowAll[1];
        let timeBeginAll = timeBegin.split(":");
        let hourBegin = timeBeginAll[0];
        let minuteBegin = timeBeginAll[1];
        let timeFinishAll = timeFinish.split(":");
        let hourFinish = timeFinishAll[0];
        let minuteFinish = timeFinishAll[1];
        
        let beginTime = parseInt(hourBegin) * 60 + parseInt(minuteBegin);
        let nowTime = parseInt(hourNow) * 60 + parseInt(minuteNow);
        let finishTime = parseInt(hourFinish) * 60 + parseInt(minuteFinish);
        if ((nowTime > beginTime) && (finishTime > nowTime)) {
            status = 'On going';
        } else {
            status = 'Pending';
        }
        
        todoArr.push({
            name: userText,
            date: dateWork,
            begin: timeBegin,
            finish: timeFinish,
            pri: priority,
            sta: status,
        }); 
    }
    
    localStorage.setItem('New todo:', JSON.stringify(todoArr));//chuyển js object -> json string
    showTasks();   
    hideAddScreen();
})

cancelBtn.addEventListener('click', function(e) {
    e.preventDefault();
    inputWork.value='';
    inputDate.value='';
    inputBegin.value='';
    inputFinish.value='';
    inputPriority.value= '';
    hideAddScreen();
})

function showTasks() {
    let getNewTodoLocalStorage = localStorage.getItem('New todo:');
    if (getNewTodoLocalStorage == null) { //nếu localStorage trống (chưa có công việc nào)
        todoArr = []; //tạo mảng mới
    } else {
        todoArr = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
    }

    let newTaskItem = '';
    let newInfoWork = '';
    todoArr.forEach((element,index) => {
        newTaskItem += `<li class="tasks-item">
        <div onclick="checkTask(${index})" class="task-item__icon">
            <i class="far fa-circle task-circle-icon"></i>
            <i class="fas fa-check-circle task-done-icon"></i>
        </div>
        
        <div class="task-name">
            <p class="task-label">${todoArr[index].name}</p>
            <i class="fas fa-caret-down more-icon"></i>
        </div>
    </li>`;
        newInfoWork += `<li class="work-time-section pd-section">
        <div class="time">
            <p>${todoArr[index].begin}<br><br><br><br><br>${todoArr[index].finish}</p> 
        </div>
        <div class="work">
            <div class="work-content">
                <p class="work-priority">${todoArr[index].pri} Priority</p>
                <h3 class="work-name">${todoArr[index].name}</h3>
                <p class="work-time">${todoArr[index].begin}-${todoArr[index].finish}</p> 
                <p class="work-status">${todoArr[index].sta}</p>
            </div>
            <div class="function-list">
                <button onclick="statusTask(${index})" class="function-icon btn function-list__status"><i class="fa-regular fa-pen-to-square"></i></button>
                <button onclick="editTask(${index})" class="function-icon btn function-list__edit"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteTask(${index})" class="function-icon btn function-list__delete"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    </li>`
    })
    taskList.innerHTML = newTaskItem; //thêm thẻ li mới vào thẻ ul 
    infoWorkList.innerHTML = newInfoWork;
    inputWork.value='';
    inputDate.value='';
    inputBegin.value='';
    inputFinish.value='';
    inputPriority.value= '';
}

function deleteTask(index){
    dialogModal.classList.add('open');
    dialogYes.addEventListener('click', function() {
        let getNewTodoLocalStorage = localStorage.getItem('New todo:');
        todoArr = JSON.parse(getNewTodoLocalStorage);
        todoArr.splice(index,1); // xóa thẻ tương ứng với index cụ thể
        localStorage.setItem('New todo:', JSON.stringify(todoArr));//chuyển js object -> json string
        showTasks();
        dialogModal.classList.remove('open');
    })

    dialogNo.addEventListener('click', function() {
        dialogModal.classList.remove('open');
    })
       
}

clearAllBtn.onclick = () => {
    dialogModal.classList.add('dialog-clear-all');
    dialogModal.classList.add('open');
    dialogYes.addEventListener('click', function() {
        todoArr = [];
        localStorage.setItem('New todo:', JSON.stringify(todoArr));//chuyển js object -> json string
        showTasks(); 
        dialogModal.classList.remove('open'); 
        dialogModal.classList.remove('dialog-clear-all'); 
    })
    dialogNo.addEventListener('click', function() {
        dialogModal.classList.remove('open');
        dialogModal.classList.remove('dialog-clear-all'); 
    })
}

function editTask (index) {
    let getNewTodoLocalStorage = localStorage.getItem('New todo:');
    todoArr = JSON.parse(getNewTodoLocalStorage);
    inputWork.value=todoArr[index].name;
    inputDate.value=todoArr[index].date;
    inputBegin.value=todoArr[index].begin;
    inputFinish.value=todoArr[index].finish;
    inputPriority.value= todoArr[index].pri;
    submitButton.setAttribute('index',index)   
    headerModal.classList.add('add-modal__header-edit');
    submitButton.classList.add('label-submit-edit');
    addScreen.classList.add('open');
}

function statusTask (index) {
    statusSection.classList.add('open');
    doneStatusBtn.setAttribute('index', index);
}


doneStatusBtn.addEventListener('click', function(ev) {
    ev.preventDefault();
    let getNewTodoLocalStorage = localStorage.getItem('New todo:');
    if (getNewTodoLocalStorage == null) { //nếu localStorage trống (chưa có công việc nào)
        todoArr = []; //tạo mảng mới
    } else {
        todoArr = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
    }
    let checkbox = document.querySelector('input[type="checkbox"]:checked');
    let statusIndex = this.getAttribute('index')
    if (statusIndex == 0 || statusIndex) {
        todoArr[statusIndex].sta = checkbox.value;
        if ((checkbox.value).localeCompare("Complete") == 0) {
            // console.log((checkbox.value).localeCompare("Complete") == 0);
            // workDones[statusIndex].classList.add('tasks-item__done');
        }
        this.removeAttribute('index');
    }
    localStorage.setItem('New todo:', JSON.stringify(todoArr));//chuyển js object -> json string
    showTasks();  
    statusSection.classList.remove('open'); 
})

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('statusContent')
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
            item.checked = false;
        }  
    })
}

