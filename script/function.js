const taskBtn = document.querySelector('.js-task-btn');
const chartBtn = document.querySelector('.js-chart-btn');
const homeBtn = document.querySelector('.js-home-btn');
const settingBtn = document.querySelector('.js-setting-btn');
const addBtn = document.querySelector('.js-add-btn');

const taskScreen = document.querySelector('.js-task');
const chartScreen = document.querySelector('.js-chart');
const homeScreen = document.querySelector('.js-home');
const settingScreen = document.querySelector('.js-setting');
const addScreen = document.querySelector('.js-add-screen');
const addModal = document.querySelector('.js-add-modal');

function showTaskScreen() {
    homeBtn.classList.remove('foot-btn-active');
    taskBtn.classList.add('foot-btn-active');
    chartBtn.classList.remove('foot-btn-active');
    settingBtn.classList.remove('foot-btn-active');
    settingScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.remove('open');
    taskScreen.classList.add('open');
}

function showChartScreen() {
    homeBtn.classList.remove('foot-btn-active');
    taskBtn.classList.remove('foot-btn-active');
    chartBtn.classList.add('foot-btn-active');
    settingBtn.classList.remove('foot-btn-active');
    taskScreen.classList.remove('open');
    settingScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.add('open');
}

function showSettingScreen() {
    homeBtn.classList.remove('foot-btn-active');
    taskBtn.classList.remove('foot-btn-active');
    chartBtn.classList.remove('foot-btn-active');
    settingBtn.classList.add('foot-btn-active');
    taskScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.remove('open');
    settingScreen.classList.add('open');
}

function showHomeScreen() {
    homeBtn.classList.add('foot-btn-active');
    taskBtn.classList.remove('foot-btn-active');
    chartBtn.classList.remove('foot-btn-active');
    settingBtn.classList.remove('foot-btn-active');
    taskScreen.classList.remove('open');
    settingScreen.classList.remove('open');
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
settingBtn.addEventListener('click', showSettingScreen)
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

function showTimeNow() {
    let str = Date();
    let array_time = str.split(" ");
    let timeAll = array_time[4];
    return timeAll;
}