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
