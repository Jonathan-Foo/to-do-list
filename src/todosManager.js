import { toDate, isToday, isThisWeek, subDays, parseISO, format } from 'date-fns'
import infoPopUp from './infoPopUp';

export default (function todosManager() {
    // CHANGINIG SLIDE  DIV CONTENT    
    function createSlideHeading(e) {
        const slideHeading = document.createElement('p')
        slideHeading.classList.add('slide-heading')
        slideHeading.textContent = e.currentTarget.querySelector('.tab-name').textContent    
        return slideHeading
    }
    
    function createToDoItemContainer() { 
        const toDoItemContainer = document.createElement('div')
	    toDoItemContainer.classList.add('to-do-item-container')

        return toDoItemContainer
    }
    
    function createToDoItems(prioLevel, title, dueDate, index) {
        const toDoItem = document.createElement('div')
            toDoItem.classList.add('to-do-item')
            toDoItem.dataset.index = index
        
        const leftSection = document.createElement('div')
            leftSection.classList.add('left-section')
        
        const priority = document.createElement('span')
            priority.classList.add('priority')
            priority.classList.add(prioLevel)
        
        const checkBox = document.createElement('input')
            checkBox.type = 'checkbox'
            checkBox.setAttribute('name', 'to-do-checkbox')
            checkBox.classList.add('to-do-checkbox')
        
        const toDoTitle = document.createElement('p')
            toDoTitle.classList.add('to-do-title')
            toDoTitle.textContent = title
            
        const rightSection = document.createElement('div')
            rightSection.classList.add('right-section')
    
        const dueDateInfo = document.createElement('p')
        dueDateInfo.classList.add('due-date')
        dueDateInfo.textContent = format(parseISO(dueDate), 'dd/MM/yy')
    
        const editIcon = document.createElement('i')
            editIcon.classList.add('far')
            editIcon.classList.add('fa-edit')
             editIcon.setAttribute('aria-hidden', 'true')
        
        const removeIcon = document.createElement('i')
            removeIcon.classList.add('fas')
            removeIcon.classList.add('fa-backspace')
             removeIcon.setAttribute('aria-hidden', 'true')
        
        leftSection.appendChild(checkBox)
        leftSection.appendChild(toDoTitle)
        
        rightSection.appendChild(dueDateInfo)
        rightSection.appendChild(editIcon)
        rightSection.appendChild(removeIcon)
        
        toDoItem.appendChild(priority)
        toDoItem.appendChild(leftSection)
        toDoItem.appendChild(rightSection)

        toDoItem.addEventListener('click', (e) => infoPopUp.displayInfo(e))
    
        return toDoItem
    }

    function fillToDoItemContainer(e) {
        const toDosData = JSON.parse(localStorage.todos)
        const projectName = e

        const toDoItemContainer = document.querySelector('.to-do-item-container')  
        toDoItemContainer.innerHTML = '';
        if (toDosData[projectName] === undefined || toDosData[projectName].length === 0) {
            return 
        } else {
            toDosData[projectName].forEach((task, index) => toDoItemContainer.appendChild(createToDoItems(task.priority, task.name, task.dueDate, index)))
            removeToDoItem() 
        }
    }
    
    function createPrio(level) {
        const priority = document.createElement ('input')
        priority.type = 'radio'
        priority.setAttribute('name', 'priority-level')
        priority.value = level
        priority.classList.add(`${level}-radio-btn`)
        priority.required = true
        
        return priority
    }

    function createNewTaskModal(e) {
        const newTaskModal = document.createElement('div')
            newTaskModal.classList.add('new-task-modal')
            newTaskModal.setAttribute('id' ,'fixed')
    
    
        const form = document.createElement('form')
            form.action = '/'
            form.setAttribute('autocomplete', 'off')
            form.dataset.projectName = e.currentTarget.querySelector('.tab-name').textContent
        
        const datePicker = document.createElement('input')
            datePicker.type = 'date'
            datePicker.classList.add('due-date-picker')
            datePicker.setAttribute('name', 'due-date-picker')
            datePicker.required = true
    
        const closeIcon = document.createElement('i')
            closeIcon.classList.add('fas')
            closeIcon.classList.add('fa-times-circle')
            closeIcon.classList.add('fa-lg')
    
        const titleInput = document.createElement('input')
            titleInput.type = 'text'
            titleInput.classList.add('task-title')
            titleInput.setAttribute('name', 'task-title')
            titleInput.placeholder = 'Title'
            titleInput.setAttribute('maxlength', '80')
            titleInput.required = true
    
        const descriptionInput = document.createElement('textarea')
            descriptionInput.classList.add('task-detail')
            descriptionInput.setAttribute('name', 'task-detail')
            descriptionInput.placeholder = 'Description'
    
        const options = document.createElement ('div')
            options.classList.add('options')
        
        const priorityPick = document.createElement ('div')
            priorityPick.classList.add('priority-pick')
        
        const lowPrio = createPrio('low')
        const midPrio = createPrio('mid')
        const highPrio = createPrio('high')
        
        const confirmBtn = document.createElement('button')
             confirmBtn.classList.add('add')
             confirmBtn.type = 'button'
             confirmBtn.textContent = 'CONFIRM'
        
        form.appendChild(datePicker)
        form.appendChild(closeIcon)
        form.appendChild(titleInput)
        form.appendChild(descriptionInput)
        priorityPick.appendChild(lowPrio)
        priorityPick.appendChild(midPrio)
        priorityPick.appendChild(highPrio)
        options.appendChild(priorityPick)
        options.appendChild(confirmBtn)
        form.appendChild(options)
        newTaskModal.appendChild(form)
    
        return newTaskModal
    }
    
    
    function createAddNewTaskBtn() {
        const newTaskBtn = document.createElement('button')
            newTaskBtn.classList.add('new-task-btn')
            newTaskBtn.classList.add('active')
    
        const plusIcon = document.createElement('i')
            plusIcon.classList.add('fas')
            plusIcon.classList.add('fa-plus')
        
        newTaskBtn.appendChild(plusIcon)
        newTaskBtn.innerHTML += ` New Task` 
    
        return newTaskBtn
    }
    

    //COMPLETE FILLSLIDE FUNCTION
    function fillSlide(e) {
        const slideContainer = document.querySelector('.slide')
        slideContainer.innerHTML = ''
        slideContainer.appendChild(createSlideHeading(e))
        slideContainer.appendChild(createToDoItemContainer())
        fillToDoItemContainer(e.currentTarget.querySelector('.tab-name').textContent)
        slideContainer.appendChild(createNewTaskModal(e))
        slideContainer.appendChild(createAddNewTaskBtn())
        openAndCloseNewTaskModal()
        displayTabActive(e)
        confirmBtnTrigger()
    
    }

    function activateSlide() {
        const tabsParent = [...document.querySelectorAll('.tab-name')].map(project => project.parentElement)
        tabsParent.forEach(tab => tab.addEventListener('click', (e) =>  fillSlide(e)))
    }


    function displayTabActive(e) {
        const tabs = [...document.querySelectorAll('.tab-name')].map(project => project.parentElement)
        const notesNavItem = document.querySelector('.notes')
        const activeTab = e.currentTarget
        tabs.push(notesNavItem);

        tabs.forEach(tab => { 
            if (tab.classList.contains('active')) {
                tab.classList.remove('active')
            }  
        });

        activeTab.classList.add('active');
    }


    // HANDLING NEW TASK MODAL INFO 
    // THE ABILITY TO OPEN AND CLOSE NEW TASK MODAL SHOULD COME AFTER SLIDE CONTAINER HAS BEEN FILLED!!!
    function resetNewTaskModal() {
        closeNewTaskModal()
        displayNewTaskBtn()
    }
    
    function openNewTaskModal() {
        const newTaskModal = document.querySelector('#fixed')
    
        newTaskModal.classList.add('active')
    }
    
    function closeNewTaskModal() {
        const newTaskModal = document.querySelector('#fixed')
        const inputs = [...newTaskModal.querySelectorAll('input[type=date], input[type=text], textarea')]
        const options = [...newTaskModal.querySelectorAll('input[type=radio]')]
        newTaskModal.classList.remove('active')
        inputs.forEach(input => input.value = '')
        options.forEach(option => option.checked = false)
    }
    
    
    function hideNewTaskBtn() {
        const newTaskBtn = document.querySelector('.new-task-btn')
        newTaskBtn.classList.remove('active')
    }
    
    function displayNewTaskBtn() {
        const newTaskBtn = document.querySelector('.new-task-btn')
        newTaskBtn.classList.add('active')
    }

    function triggerNewTaskModal() {
        const newTaskBtn = document.querySelector('.new-task-btn')
        newTaskBtn.addEventListener('click',  () => {
            openNewTaskModal()
            hideNewTaskBtn()
        })
    }
    
    function deactivateNewTaskModal() {
        const closeIcon = document.querySelector('#fixed > form > i')
        closeIcon.onclick= () => resetNewTaskModal()
    }
    
    function openAndCloseNewTaskModal(){
        triggerNewTaskModal()
        deactivateNewTaskModal()
    }

    //SUBMITTING NEW INFO TO LS
    function confirmBtnTrigger() {
        const confirmBtn = document.querySelector('#fixed > form > .options > button')
        
        confirmBtn.addEventListener('click', (e) => submitNewTaskCheck(e))
    } 
    
    function submitNewTaskCheck(e) {
        const newTaskModal = document.querySelector('#fixed')
        const newTaskForm = document.querySelector('#fixed > form')
        const allInputs = [...newTaskModal.querySelectorAll('input[type=date], input[type=text], textarea, input[type=radio]')]
         const inputValidity = allInputs.every(input => input.validity.valid)	
        if (inputValidity) {
            submitNewTaskSuccess(e)		
        } else {
            newTaskForm.reportValidity()
            return 
        }
    }
    
    function submitNewTaskSuccess(e) {
        pushNewTaskInfoToLS(e)
        fillToDoItemContainer(e.target.parentElement.parentElement.dataset.projectName)
        resetNewTaskModal()
    }

    
    function pushNewTaskInfoToLS(e) {
        const newTaskModal  = document.querySelector('#fixed')
        const taskName = newTaskModal.querySelector('.task-title').value
        const taskDetail = newTaskModal.querySelector('.task-detail').value
        const dueDate = newTaskModal.querySelector('.due-date-picker').value
    
        const priority = newTaskModal.querySelector('input[name="priority-level"]:checked').value;
        const projectName = e.target.parentElement.parentElement.dataset.projectName
        
        const newTaskObj = newTaskInfoFactory(taskName, taskDetail, priority, projectName, dueDate )
 
        newTaskPushProcessor(newTaskObj)
    }
    
    function newTaskPushProcessor(obj) {
        const toDosData = JSON.parse(localStorage.todos)
        toDosData.Home.push(obj)
        
        if (obj.project != '') {
            toDosData[obj.project].push(obj)
        }
    
        if (isToday(parseISO(obj.dueDate))) {
            toDosData.Today.push(obj)
            toDosData.Week.push(obj)
        } else if (isThisWeek(parseISO(obj.dueDate))) {
            toDosData.Week.push(obj)
        }
        
        localStorage.setItem('todos', JSON.stringify(toDosData))
    }
    
    
    function newTaskInfoFactory(name, detail, priority, project, dueDate ) {
        if (project == 'Home' || project == 'Today' || project == 'Week') {
        project = ''
    }
        return {name, detail, priority, project, dueDate}
    }
        
    // Removing To Do Items

    function removeToDoItem() {
        const removeTaskIcon = [...document.querySelectorAll('.fa-backspace')]

        if (removeTaskIcon.length === 0) {
            return
        } else {
            removeTaskIcon.forEach(icon => icon.addEventListener('click', (e) => {
            removeTaskFromLS(e.target.parentElement.previousElementSibling.lastElementChild.textContent)
            fillToDoItemContainer(e.target.parentElement.parentElement.parentElement.previousElementSibling.innerText)}))
            
        }

    } 
    
    function removeTaskFromLS(e) {
        let taskName = e
        const toDosData = JSON.parse(localStorage.todos)
        const newToDosData = {}
        
        for( let key in toDosData) {
            newToDosData[key] =  toDosData[key].filter(value => value.name !== taskName)
        }
        
        localStorage.setItem('todos', JSON.stringify(newToDosData))
    
    }
    
    return{
        activateSlide,
        openAndCloseNewTaskModal,
        newTaskInfoFactory,
        fillToDoItemContainer,
        removeToDoItem,
        confirmBtnTrigger,
        removeTaskFromLS

    };
})();