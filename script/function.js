const taskBtn = document.querySelector('.js-task-btn');
const chartBtn = document.querySelector('.js-chart-btn');
const homeBtn = document.querySelector('.js-home-btn');
const personBtn = document.querySelector('.js-person-btn');
const addBtn = document.querySelector('.js-add-btn');

const taskScreen = document.querySelector('.js-task');
const chartScreen = document.querySelector('.js-chart');
const homeScreen = document.querySelector('.js-home');
const personScreen = document.querySelector('.js-person');
const addScreen = document.querySelector('.js-add-screen');
const addModal = document.querySelector('.js-add-modal');

function showTaskScreen() {
    homeBtn.classList.remove('foot-btn-active');
    taskBtn.classList.add('foot-btn-active');
    chartBtn.classList.remove('foot-btn-active');
    personBtn.classList.remove('foot-btn-active');
    personScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.remove('open');
    taskScreen.classList.add('open');
}

function showChartScreen() {
    homeBtn.classList.remove('foot-btn-active');
    taskBtn.classList.remove('foot-btn-active');
    chartBtn.classList.add('foot-btn-active');
    personBtn.classList.remove('foot-btn-active');
    taskScreen.classList.remove('open');
    personScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.add('open');
}

function showPersonScreen() {
    homeBtn.classList.remove('foot-btn-active');
    taskBtn.classList.remove('foot-btn-active');
    chartBtn.classList.remove('foot-btn-active');
    personBtn.classList.add('foot-btn-active');
    taskScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.remove('open');
    personScreen.classList.add('open');
}

function showHomeScreen() {
    homeBtn.classList.add('foot-btn-active');
    taskBtn.classList.remove('foot-btn-active');
    chartBtn.classList.remove('foot-btn-active');
    personBtn.classList.remove('foot-btn-active');
    taskScreen.classList.remove('open');
    personScreen.classList.remove('open');
    chartScreen.classList.remove('open');
    homeScreen.classList.remove('hide');
}

function showAddScreen (){
    headerModal.classList.remove('add-modal__header-edit');
    submitButton.classList.remove('label-submit-edit');
    addScreen.classList.add('open');
}

function hideAddScreen() {
    addScreen.classList.remove('open');
}
taskBtn.addEventListener('click', showTaskScreen)
chartBtn.addEventListener('click',showChartScreen)
homeBtn.addEventListener('click', showHomeScreen)
personBtn.addEventListener('click', showPersonScreen)
addBtn.addEventListener('click', showAddScreen)
addScreen.addEventListener('click', hideAddScreen)
addModal.addEventListener('click', function(event) {
    event.stopPropagation()
})


//ngày tháng năm ở trang home
function showDateToday() {
    let str = Date();
    //Wed Feb 09 2022 08:16:12 GMT+0700 (Indochina Time)
    let array_time = str.split(" ");
    let year = array_time[3];
    let month = array_time[1];
    let day = array_time[2];
    let dayofweek = array_time[0];
    todayLine.innerHTML = `${dayofweek}, ${day} ${month} ${year}`
}

// thêm tick khi đã hoàn thành công việc
let workDones = document.getElementsByClassName('tasks-item');

function checkTask(index) {
    workDones[index].classList.toggle('tasks-item__done');
}