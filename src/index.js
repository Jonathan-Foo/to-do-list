import { isToday, isThisWeek, parseISO, format } from 'date-fns'

// localStorage.setItem('todos', '{"home": [{"name": "bob"}, {"name": "steve"}], "today": ["item", "item2"], "week": ["item", "item2"]}')

// let todos = JSON.parse(localStorage.todos)

// todos.home.splice(0, 1)

// localStorage.setItem('todos', JSON.stringify(todos))
// console.log(todos)


// let a = [1, 2, 3, 4, 5, 6]
// let index = 3
// let b = a.slice(0, index).concat(a.slice(index + 1)) 
// console.log(b) 


const tabsParent = [...document.querySelectorAll('.tab-name')].map(project => project.parentElement)
// const tabs = [...document.querySelectorAll('.tab-name')]

tabsParent.forEach(tab => tab.addEventListener('click', (e) => {
    console.log(e.currentTarget.querySelector('.tab-name').textContent)
}))

// tabs.forEach(tab => tab.addEventListener('click', (e) => {
//     console.log(e.currentTarget)
// }))



// console.log(projects.length > 0)


// const newProjectModal = document.querySelector('.new-project-modal')
// const newProjectModalInput = newProjectModal.querySelector('input')
// console.log(newProjectModal)
// console.log(newProjectModalInput.validity.valid)
// 
    // const toDosData = JSON.parse(localStorage.todos)
 	
    // delete toDosData.home
    // delete toDosData.today
    // delete toDosData.week

    // const projectsNameArr = Object.keys(toDosData)
 
// localStorage.setItem('todos', JSON.stringify(toDosData))




const closeIcon = document.querySelector('#fixed > form > i')

closeIcon.addEventListener('click', (e) => {
    console.log(e)
})



const removeTaskIcon = [...document.querySelectorAll('.fa-backspace')]

// console.log(removeTaskIcon)
removeTaskIcon.forEach(icon => icon.addEventListener('click', (e) => {
    console.log(e.target.parentElement.previousElementSibling.lastElementChild.textContent)
})) 

// const toDosData = JSON.parse(localStorage.todos)
// const taskName = 'steve'
// const newToDosData = {}
// console.log(toDosData)

//     for( let key in toDosData) {
//         newToDosData[key] = toDosData[key].filter(value => value.name !== taskName)
//     }

// console.log(newToDosData)
// toDosData.newProject = [{name: "steve"}, {name: "mike"}, {name: "bob"}]
// toDosData.newProject2 = [{name: "steve"}, {name: "josh"}, {name: "bob"}]
// toDosData.newProject3 = [{name: "kevin"}, {name: "lauren"}, {name: "bob"}]
// toDosData.today = [{name: "kevin"}, {name: "lauren"}, {name: "josh"}]
// toDosData.week = [{name: "mike"}, {name: "josh"}, {name: "steve"}]
// toDosData.home = [{name: "steve"}]


// localStorage.setItem('todos', JSON.stringify(toDosData))


const newTaskModal = document.querySelector('#fixed')
const newTaskForm = newTaskModal.querySelector('form')
const inputs = [...newTaskModal.querySelectorAll('input[type=date], input[type=text], textarea')]
const options = [...newTaskModal.querySelectorAll('input[type=radio]')]
const allInputs = [...newTaskModal.querySelectorAll('input[type=date], input[type=text], textarea, input[type=radio]')]
// console.log(inputs.map(input => input.value))
// console.log(options.map(option => option.checked))
// console.log(allInputs.every(input => input.validity.valid))

const priority = newTaskModal.querySelector('input[name="priority-level"]:checked').value;
const taskName = newTaskModal.querySelector('.task-title').value
const projectName = newTaskForm.dataset.projectName
// const dueDate = getDateFormatted(newTaskModal.querySelector('.due-date-picker').value)
const dueDate = newTaskModal.querySelector('.due-date-picker').value

console.log(taskName)
console.log(priority)
console.log(projectName)

function newTaskInfoFactory(name, detail, priority, project, dueDate) {
    if (project == 'Home' || project == 'Today' || project == 'Week') {
        project = ''
    }
	return {name, detail, priority, project, dueDate}
}

let newInfo = newTaskInfoFactory('Take out Trash', 'Take out Trash', 'mid', 'Home', '2022-03-21')
console.log(newInfo)
// function getDateFormatted(dueDate) {
//     const day = dueDate.split('-')[2]
//     const month = dueDate.split('-')[1]
//     const year = dueDate.split('-')[0]
//     return `${month}/${day}/${year}`
// }


console.log(dueDate)
console.log(isToday(parseISO(dueDate)))
console.log(isThisWeek(parseISO(dueDate)))

console.log(format(parseISO(dueDate), 'dd/MM/yyyy'))


