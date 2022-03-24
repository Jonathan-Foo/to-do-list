localStorage.setItem('todos', '{"home": [{"name": "bob"}, {"name": "steve"}], "today": ["item", "item2"], "week": ["item", "item2"]}')

let todos = JSON.parse(localStorage.todos)

todos.home.splice(0, 1)

localStorage.setItem('todos', JSON.stringify(todos))
console.log(todos)


let a = [1, 2, 3, 4, 5, 6]
let index = 3
let b = a.slice(0, index).concat(a.slice(index + 1)) 
console.log(b) 