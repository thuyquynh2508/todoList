// đưa ra hết các elements được yêu cầu
const inputWork = document.querySelector(".add-modal__input");
const inputDate = document.querySelector(".js-input-date");
const inputBegin = document.querySelector(".js-time-begin");
const inputFinish = document.querySelector(".js-time-finish");
const inputPriority = document.querySelector(".add-modal__priority-select");

const submitButton = document.querySelector(".js-button-submit");
const cancelBtn = document.querySelector(".js-button-cancel");

const taskList = document.querySelector(".tasks-content");
const infoWorkList = document.querySelector(".work-list");
const todayLine = document.querySelector(".date-text");

const clearAllBtn = document.querySelector(".clear-all-btn");
const headerModal = document.querySelector(".add-modal__header");

const dialogModal = document.querySelector(".dialog-container");
const dialogYes = document.querySelector(".dialog-btn__yes");
const dialogNo = document.querySelector(".dialog-btn__no");

const statusSection = document.querySelector(".task-status-container");
const statusCompleteBtn = document.querySelector(".task-btn-status-complete");
const statusComplete = document.getElementsByClassName(
  "task-btn-status-complete"
);
const statusOngoingBtn = document.querySelector(".task-btn-status-ongoing");
const statusOngoing = document.getElementsByClassName(
  "task-btn-status-ongoing"
);
const statusPendingBtn = document.querySelector(".task-btn-status-pending");
const statusPending = document.getElementsByClassName(
  "task-btn-status-pending"
);
const statusCancelBtn = document.querySelector(".task-btn-status-cancel");
const statusCancel = document.getElementsByClassName("task-btn-status-cancel");
const doneStatusBtn = document.querySelector(".task-status-done");

const notifiModal = document.querySelector(".notification-container");
let workDones = document.getElementsByClassName("tasks-item");
const scrollHome = document.querySelector(".scrollbar-home");
const scrollTask = document.querySelector(".task-body-wrapper");

const countHome = document.querySelector(".home-statistic");
showHomeScreen();
showTasks();
showDateToday();

//nếu người dùng click vào submit
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let getNewTodoLocalStorage = localStorage.getItem("New todo:");
  if (getNewTodoLocalStorage == null) {
    //nếu localStorage trống (chưa có công việc nào)
    todoArr = []; //tạo mảng mới
  } else {
    todoArr = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
  }
  let taskIndex = this.getAttribute("index");
  if (taskIndex == 0 || taskIndex) {
    todoArr[taskIndex].name = inputWork.value;
    todoArr[taskIndex].date = inputDate.value;
    todoArr[taskIndex].begin = inputBegin.value;
    todoArr[taskIndex].finish = inputFinish.value;
    todoArr[taskIndex].pri = inputPriority.value;
    this.removeAttribute("index");
  } else {
    let userText = inputWork.value;
    let dateWork = inputDate.value;
    let timeBegin = inputBegin.value;
    let timeFinish = inputFinish.value;
    let priority = inputPriority.value;
    let status = "";
    let timeNow = Date();
    if (
      transformTime(timeNow) > transformTime(timeBegin) &&
      transformTime(timeFinish) > transformTime(timeNow)
    ) {
      status = "On going";
    } else {
      status = "Pending";
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
  localStorage.setItem("New todo:", JSON.stringify(todoArr)); //chuyển js object -> json string
  showTasks();
  hideAddScreen();
});

function transformTime(timeString) {
  let timeAll = timeString.split(":");
  let hour = timeAll[0];
  let minute = timeAll[1];
  let minuteAmount = parseInt(hour) * 60 + parseInt(minute);
  return minuteAmount;
}

function resetForm() {
  inputWork.value = "";
  inputDate.value = "";
  inputBegin.value = "";
  inputFinish.value = "";
  inputPriority.value = "";
}
cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetForm();
  hideAddScreen();
});

function showTasks() {
  let getNewTodoLocalStorage = localStorage.getItem("New todo:");
  if (getNewTodoLocalStorage == null) {
    //nếu localStorage trống (chưa có công việc nào)
    todoArr = []; //tạo mảng mới
  } else {
    todoArr = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
  }
  let newTaskItem = "";
  let newInfoWork = "";
  
  todoArr.forEach((element, index) => {
    
    newTaskItem += `<li class="tasks-item">
        <div onclick="checkTask(${index})" id='1' class="task-item__icon">
            <i class="far fa-circle task-circle-icon"></i>
            <i class="fas fa-check-circle task-done-icon"></i>
        </div>
        
        <div class="task-name">
            <p class="task-label">${todoArr[index].name}</p>
            <i class="fas fa-caret-down more-icon"></i>
        </div>
    </li>`;
    newInfoWork += ` <div class="work-time-section-wrap">
        <li class="work-time-section">
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
    </li>
    </div>`;
  });

  taskList.innerHTML = newTaskItem; //thêm thẻ li mới vào thẻ ul
  var countText = ['Complete','Pending','Canceled', 'On going'];
  var countNumber = [0,0,0,0];
  infoWorkList.innerHTML = newInfoWork;
  for (var workTodo of todoArr) {
    for (var i = 0; i < 4; i++) {
      if (workTodo.sta == countText[i]) {
        countNumber[i] = countNumber[i] + 1;
      }
    }
  }
  countHome.innerHTML = `<div class="statistic-list">
  <div class="statistic-item statistic-completed">
      <a href="" class="statistic-block">
          <i class="far fa-check-square statistic-icon"></i>
          <div class="statistic-info">
              <p class="statistic-number">${countNumber[0]}</p>
              <p class="statistic-name">Completed</p>
          </div>
      </a>
  </div>
  <div class="statistic-item statistic-pending">
      <a href="" class="statistic-block">
          <i class="far fa-clock statistic-icon"></i>
          <div class="statistic-info">
              <p class="statistic-number">${countNumber[1]}</p>
              <p class="statistic-name">Pending</p>
          </div>
      </a>
  </div>
</div>
<div class="statistic-list">
  <div class="statistic-item statistic-canceled">
      <a href="" class="statistic-block">
          <i class="far fa-window-close statistic-icon"></i>
          <div class="statistic-info">
              <p class="statistic-number">${countNumber[2]}</p>
              <p class="statistic-name">Canceled</p>
          </div>
      </a>
  </div>
  <div class="statistic-item statistic-ongoing">
      <a href="" class="statistic-block">
          <i class="far fa-chart-bar statistic-icon"></i>
          <div class="statistic-info">
              <p class="statistic-number">${countNumber[3]}</p>
              <p class="statistic-name">Ongoing</p>
          </div>
      </a>
  </div>                        
</div>`
  resetForm();
  showScroll(todoArr);
}

function deleteTask(index) {
  dialogModal.classList.add("open");
  dialogYes.addEventListener("click", function () {
    let getNewTodoLocalStorage = localStorage.getItem("New todo:");
    todoArr = JSON.parse(getNewTodoLocalStorage);
    todoArr.splice(index, 1); // xóa thẻ tương ứng với index cụ thể
    localStorage.setItem("New todo:", JSON.stringify(todoArr)); //chuyển js object -> json string
    showTasks();
    dialogModal.classList.remove("open");
  });

  dialogNo.addEventListener("click", function () {
    dialogModal.classList.remove("open");
  });
}

clearAllBtn.onclick = () => {
  dialogModal.classList.add("dialog-clear-all");
  dialogModal.classList.add("open");
  dialogYes.addEventListener("click", function () {
    todoArr = [];
    localStorage.setItem("New todo:", JSON.stringify(todoArr)); //chuyển js object -> json string
    showTasks();
    dialogModal.classList.remove("open");
    dialogModal.classList.remove("dialog-clear-all");
  });
  dialogNo.addEventListener("click", function () {
    dialogModal.classList.remove("open");
    dialogModal.classList.remove("dialog-clear-all");
  });
};

function editTask(index) {
  let getNewTodoLocalStorage = localStorage.getItem("New todo:");
  todoArr = JSON.parse(getNewTodoLocalStorage);
  inputWork.value = todoArr[index].name;
  inputDate.value = todoArr[index].date;
  inputBegin.value = todoArr[index].begin;
  inputFinish.value = todoArr[index].finish;
  inputPriority.value = todoArr[index].pri;
  submitButton.setAttribute("index", index);
  headerModal.classList.add("add-modal__header-edit");
  submitButton.classList.add("label-submit-edit");
  addScreen.classList.add("open");
}

function statusTask(index) {
  statusSection.classList.add("open");
  doneStatusBtn.setAttribute("index", index);
}

doneStatusBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  let getNewTodoLocalStorage = localStorage.getItem("New todo:");
  if (getNewTodoLocalStorage == null) {
    //nếu localStorage trống (chưa có công việc nào)
    todoArr = []; //tạo mảng mới
  } else {
    todoArr = JSON.parse(getNewTodoLocalStorage); //chuyển json string -> js object
  }
  let checkbox = document.querySelector('input[type="checkbox"]:checked');
  let statusIndex = this.getAttribute("index");
  if (statusIndex == 0 || statusIndex) {
    todoArr[statusIndex].sta = checkbox.value;
    this.removeAttribute("index");
  }
  localStorage.setItem("New todo:", JSON.stringify(todoArr)); //chuyển js object -> json string
  showTasks();
  statusSection.classList.remove("open");
});

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName("statusContent");
  checkboxes.forEach((item) => {
    if (item !== checkbox) {
      item.checked = false;
    }
  });
}

function checkTask(index) {
  var id = document.getElementsByName("task-item__icon").id;
  if (id == 1) {
    workDones[index].classList.remove("tasks-item__done");
    todoArr[index].sta = 'Pending';
    document.getElementsByName("task-item__icon").id = 0;
  }
  else {
    workDones[index].classList.add("tasks-item__done");
    todoArr[index].sta = 'Complete';
    document.getElementsByName("task-item__icon").id = 1;
  }

}

function showScroll(todoArr) {
  if (todoArr.length <= 2) {
    scrollHome.classList.add("scroll-none");
    scrollTask.classList.add("scroll-none");
  }
  else if (todoArr.length <= 4) {
    scrollHome.classList.add("scroll-none");
    scrollTask.classList.remove("scroll-none");
  }
  else {
    scrollHome.classList.remove("scroll-none");
    scrollTask.classList.remove("scroll-none");
  }
}
