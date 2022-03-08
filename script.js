const existingList = document.querySelector('#taskList');
let pendingValue = document.getElementsByTagName('li');
const pendingPresentation = document.querySelector('.pending');

function randomPostIt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const addTask = document.querySelector('#createTask');
function taskCreator() {
  const itemCreator = document.createElement('li');
  existingList.appendChild(itemCreator);
  const possibilities = ['pinkPostIt', 'pinkPostItStronger', 'bluePostIt', 'yellowPostIt', 'yellowPostItStronger'];
  itemCreator.classList.add(possibilities[randomPostIt(0, 4)]);
  itemCreator.innerText = document.querySelector('#taskText').value;
  document.getElementById('taskText').value = '';
  pendingPresentation.innerHTML = pendingValue.length;
}
addTask.addEventListener('click', taskCreator);

function clickSelector(event) {
  const selectedTask = event.target;
  const listItens = document.getElementsByTagName('li');
  if(selectedTask.id==='taskList'){
    return;
  }
  for (let index = 0; index < listItens.length; index += 1) {
    listItens[index].classList.remove('selectedTask');
  }
  selectedTask.classList.add('selectedTask');
}
existingList.addEventListener('click', clickSelector);


function lineThrough(event) {
  const lineItem = event.target;
  if (lineItem.classList.contains('completed') === true) {
    lineItem.classList.remove('completed');
  } else {
    lineItem.classList.add('completed');
  }
}
existingList.addEventListener('dblclick', lineThrough);

const clearbutton = document.querySelector('#removeAll');
function clearList() {
  existingList.innerHTML = '';
  pendingPresentation.innerHTML = pendingValue.length;
}
clearbutton.addEventListener('click', clearList);

const finishedItens = document.querySelector('#removeEnded');
function finishedRemover() {
  const completedlist = document.getElementsByClassName('completed');
  for (let index = completedlist.length - 1; index >= 0; index -= 1) {
    completedlist[index].remove();
  }
  pendingPresentation.innerHTML = pendingValue.length;
}
finishedItens.addEventListener('click', finishedRemover);

const selectedRemover = document.querySelector('#removeSelected');
function selectedTaskRemover() {
  const selectedTask = document.getElementsByClassName('selectedTask')[0];
  selectedTask.classList.add('fall');
  selectedTask.addEventListener('transitionend', () => {
    selectedTask.remove();
    pendingPresentation.innerHTML = pendingValue.length;
  });
}
selectedRemover.addEventListener('click', selectedTaskRemover);

const storageSave = document.querySelector('#saveTasks');
function save() {
  const listSaver = existingList.innerHTML;
  localStorage.setItem('tasks', listSaver);
}
storageSave.addEventListener('click', save);

function loader() {
  existingList.innerHTML = localStorage.getItem('tasks');
  document.getElementById('today').innerHTML = new Date().toLocaleDateString("en-US");
  pendingPresentation.innerHTML = pendingValue.length;
}
window.onload = loader;

// move up e down
// referência da função insert before adquirida em: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
// e funciona da seguinte maneira: navega-se até o elemento pai do nó que queremos mudar, aplicamos o insertBefore com dois parâmetros sendo o primeiro o elemento novo ou que se quer inserir, coloca-se a vírgula e por último a posição que se quer colocar
const upButton = document.querySelector('#moveUp');
const downButton = document.querySelector('#moveDown');

function up() {
  const li = document.querySelector('.selectedTask');
  const liAll = document.querySelectorAll('.selectedTask');
  if (liAll.length > 0 && !document.querySelectorAll('li')[0].classList.contains('selectedTask')) {
    li.parentNode.insertBefore(li, li.previousSibling);
  }
}

function down() {
  const li = document.querySelector('.selectedTask');
  const liAll = document.querySelectorAll('.selectedTask');
  const liLength = document.querySelectorAll('li').length - 1;
  if (liAll.length > 0 && !document.querySelectorAll('li')[liLength].classList.contains('selectedTask')) {
    li.parentNode.insertBefore(li.nextSibling, li);
  }
}

upButton.addEventListener('click', up);
downButton.addEventListener('click', down);
