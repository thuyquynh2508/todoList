const taskBtn = document.querySelector('.js-task-btn');
const chartBtn = document.querySelector('.js-chart-btn');
const homeBtn = document.querySelector('.js-home-btn');
const personBtn = document.querySelector('.js-person-btn');
const addBtn = document.querySelector('.js-add-btn');
const cancelBtn = document.querySelector('.js-button-cancel');

const taskScreen = document.querySelector('.js-task');
const chartScreen = document.querySelector('.js-chart');
const homeScreen = document.querySelector('.js-home');
const personScreen = document.querySelector('.js-person');
const addScreen = document.querySelector('.js-add-screen');
const addModal = document.querySelector('.js-add-modal');

function showTaskScreen() {
    personScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.remove('open');
    taskScreen.classList.add('open');
}

function showChartScreen() {
    taskScreen.classList.remove('open');
    personScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.add('open');
}

function showPersonScreen() {
    taskScreen.classList.remove('open');
    homeScreen.classList.add('hide');
    chartScreen.classList.remove('open');
    personScreen.classList.add('open');
}

function showHomeScreen() {
    taskScreen.classList.remove('open');
    personScreen.classList.remove('open');
    chartScreen.classList.remove('open');
    homeScreen.classList.remove('hide');
}

function showAddScreen (){
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
cancelBtn.addEventListener('click', hideAddScreen)
addScreen.addEventListener('click', hideAddScreen)
addModal.addEventListener('click', function(event) {
    event.stopPropagation()
})

// thêm tick khi đã hoàn thành công việc

// var workDones = document.querySelector('.tasks-content');
// const notDoneIcons = document.querySelectorAll('.js-empty-icon');
// const tickDoneIcons = document.querySelectorAll('.js-done-icon');
// function showTickDone (){
//     workDone.classList.add('tasks-item__done')
// }

// function hideTickDone (){
//     workDone.classList.remove('tasks-item__done')
// }

// workDones.addEventListener('click', function(event) {
//     if (event.target.tagName === 'tasks-item') {
//         event.target.classList.toogle('tasks-item__done');
//     }
// }, false)

// for(const notDone of notDoneIcons) {
//     notDone.addEventListener('click', showTickDone)
// }

// for (const tickDone of tickDoneIcons) {
//     tickDone.addEventListener('click',hideTickDone)
// }

