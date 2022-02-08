// đưa ra hết các elements được yêu cầu
const inputWork = document.querySelector('.add-modal__input');
const inputDate = document.querySelector('.js-input-date');
const inputBegin = document.querySelector('js-time-begin');
const inputFinish = document.querySelector('js-time-finish');
const submitButton = document.querySelector('.js-button-submit');
const taskList = document.querySelector('.tasks-content');
const infoWorkList = document.querySelector('.work-list');
const modalForm = document.querySelector('.add-modal__body');

// DATE FORMAT
const dateTime = { 
    dateFormat : Intl.DateTimeFormat( 0, { year: 'numeric', month: '2-digit', day: '2-digit' }), 
    timeFormat  : Intl.DateTimeFormat(0, { hour12: false, hour: '2-digit', minute: '2-digit' })
    }
const dateTime_parts = (d,fx) => fx.formatToParts(d).reduce((o,{type,value})=>(o[type]=value,o),{})

const getLocalDt = dt => dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset())

inputWork.onkeyup = () => {
    // Lấy phần text người dùng đã nhập
    let userText = inputWork.value;

    if (userText.trim() != 0) {  //nếu phần input có ký tự -> submit hoạt động
        submitButton.classList.add('active');
    }
    else { //nếu không có ký tự thì vẫn không hoạt động
        submitButton.classList.remove('active');
    }
}

showTasks()

//nếu người dùng click vào submit
modalForm.onsubmit = ev => {
    ev.preventDefault()
    todoArr = []
    let userText = inputWork.value;
    let dateWork = dateTime_parts( getLocalDt( modalForm.dateChoose.valueAsDate), dateTime.dateFormat);
    let timeBegin = dateTime_parts( getLocalDt( modalForm.timeFrom.valueAsDate), dateTime.timeFormat);
    let timeFinish = dateTime_parts( getLocalDt( modalForm.timeTo.valueAsDate), dateTime.timeFormat);
    let priority = document.querySelector('input[name="priorityWork"]:checked').value;
    let getNewTodoLocalStorage = localStorage.getItem('New todo:');
    if (getNewTodoLocalStorage == null) { //nếu localStorage trống (chưa có công việc nào)
        todoArrList = []; //tạo mảng mới
    } else {
        todoArrList = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
    }
    todoArrList.push({
        name: userText,
        date: dateWork,
        begin: timeBegin,
        finish: timeFinish,
        pri: priority,
    }); //thêm userText
    localStorage.setItem('New todo:', JSON.stringify(todoArrList));//chuyển js object -> json string
    console.log(todoArrList[0].name);
    showTasks();   
    hideAddScreen();
}

function showTasks() {
    let getNewTodoLocalStorage = localStorage.getItem('New todo:');
    if (getNewTodoLocalStorage == null) { //nếu localStorage trống (chưa có công việc nào)
        todoArrList = []; //tạo mảng mới
    } else {
        todoArrList = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
    }

    let newTaskItem = '';
    let newInfoWork = '';
    todoArrList.forEach((element,index) => {
        newTaskItem += `<li class="tasks-item">
        <div class="task-item__icon">
            <i class="far fa-circle task-circle-icon js-empty-icon"></i>
            <i class="fas fa-check-circle task-done-icon js-done-icon"></i>
        </div>
        
        <div class="task-name">
            <p class="task-label">${todoArrList[index].name}</p>
            <i class="fas fa-caret-down more-icon"></i>
        </div>
    </li>`;
        newInfoWork += `<li class="work-time-section pd-section">
        <div class="time">
            <p>${todoArrList[index].begin.hour}:${todoArrList[index].begin.minute}<br><br><br><br><br>${todoArrList[index].finish.hour}:${todoArrList[index].finish.minute}</p> 
        </div>
        <div class="work">
            <p class="work-priority">${todoArrList[index].pri} Priority</p>
            <h3 class="work-name">${todoArrList[index].name}</h3>
            <p class="work-status">On going</p>
        </div>
    </li>`
    })
    taskList.innerHTML = newTaskItem; //thêm thẻ li mới vào thẻ ul 
    infoWorkList.innerHTML = newInfoWork;
    inputWork.value='';
}