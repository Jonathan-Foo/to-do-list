import {format, parseISO} from "date-fns";

export default (function infoPopUpManager() {
    function triggerDisplayInfo() {
        const toDoItems = [...document.querySelectorAll('.to-do-item')]
        
        toDoItems.forEach(task => task.addEventListener('click', (e) => displayInfo(e) ))
    }
    
    function displayInfo(e) {
        const projectName = e.target.parentElement.previousElementSibling.textContent 	
        const index = e.target.dataset.index
        const toDosData = JSON.parse(localStorage.todos)
        

        if (index == undefined) {
            return
        } else {
            const taskInfoObj = toDosData[projectName][index]
            generateDisplayInfo(taskInfoObj)
            displayInfoModal() 
        }
    
    }
    
    function deactivateDisplayInfo() {
        const displayInfoContainer = document.querySelector('.display-info-container')
        const closeIcon = document.querySelector('.display-info-modal > i')
        displayInfoContainer.onclick = () => closeInfoDisplay()
        closeIcon.onclick = () => closeInfoDisplay()
    }
    
    function generateDisplayInfo(taskObj) {
        const projectInfo = document.querySelector('.display-project')
        projectInfo.innerHTML += ` ${taskObj.project}`
    
        const priorityInfo =   document.querySelector('.display-priority')
        priorityInfo.innerHTML += ` ${capitalized(taskObj.priority)}`
    
        const dateInfo = document.querySelector('.display-due-date')
        dateInfo.innerHTML += ` ${format(parseISO(taskObj.dueDate), 'dd/MM/yy')}`
    
        const detailInfo = document.querySelector('.display-detail')
        detailInfo.innerHTML += ` ${capitalized(taskObj.detail)}`
    
    }
    
    function capitalized(string) {
        return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
    }
    
    
    function displayInfoModal() {
        const displayInfoContainer = document.querySelector('.display-info-container')
        const displayInfoModal = document.querySelector('.display-info-modal')
        displayInfoContainer.classList.add('active')
        displayInfoModal.classList.add('active')
        deactivateDisplayInfo()
    }
    
    function closeInfoDisplay() {
        const displayInfoContainer = document.querySelector('.display-info-container')
        const displayInfoModal = document.querySelector('.display-info-modal')
        clearDisplayInfo()
        displayInfoContainer.classList.remove('active')
        displayInfoModal.classList.remove('active')
        
    }
    
    function clearDisplayInfo() {
        const displayInfoModal = document.querySelector('.display-info-modal')
        const infoPoints = [...displayInfoModal.querySelectorAll('.point')] 
        infoPoints.forEach(point => clearDetails(point))
    }
    
    function clearDetails(para) {
        const index = para.innerHTML.lastIndexOf('>')
        const cleanTemplate = para.innerHTML.slice(0, index + 1)
        para.innerHTML = cleanTemplate
    }

    return {
        triggerDisplayInfo,
        deactivateDisplayInfo,
        displayInfo
    }
})();