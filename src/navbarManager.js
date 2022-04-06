import todosManager from "./todosManager";

export default (function navBarManager() {

    function openNewProjectModal() {
        const newProjectModal = document.querySelector('.new-project-modal')
        newProjectModal.classList.add('active')
    }
    
    function closeNewProjectModal() {
        const newProjectModal = document.querySelector('.new-project-modal')
        const input = newProjectModal.querySelector('input')
        input.value = ''
        newProjectModal.classList.remove('active')
        removeKeyPressListener()
    }
    
    function hideAddProjectBtn() {
        const addProjectBtn = document.querySelector('.add-projects-btn')
        
        addProjectBtn.classList.remove('active')
    }
    
    function displayAddProjectBtn() {
        const addProjectBtn = document.querySelector('.add-projects-btn')
        
        addProjectBtn.classList.add('active')
    }
    
    
    function submitNewProject() {
        window.addEventListener('keydown', (e) => newProjectKeyPress(e)) 
    }
    
    function removeKeyPressListener() {
     window.removeEventListener('keydown', (e) => newProjectKeyPress(e))
    }
    
    function newProjectKeyPress(e) {
        switch(e.keyCode) {
            case 13:
        newProjectModalCheck();
        break;
        case 27:
        closeNewProjectModal();
        displayAddProjectBtn();
        break; 
    }
    }
    
    function newProjectModalCheck() {
        const newProjectModal = document.querySelector('.new-project-modal')
        const input = newProjectModal.querySelector('input')
        
        if(input.validity.valid) {
            pushNewPojectToLS(input)
            fillNewProjectSection() 
            closeNewProjectModal() 
            displayAddProjectBtn()
            todosManager.activateSlide()
        } else {
            input.reportValidity()
            return 
        }
    }
    
    function pushNewPojectToLS(input) {
        const toDosData = JSON.parse(localStorage.todos)
         const newProject = input.value
    
        toDosData[newProject] = []
    
        localStorage.setItem('todos', JSON.stringify(toDosData))
    }
    
    // Dynamically generating the project items in nav-bar 
    function createNewProjectItem(heading) {
        const projectItem = document.createElement('div')
            projectItem.classList.add('project-item')
    
        const projectIcon = document.createElement('i')
            projectIcon.classList.add('fas')
            projectIcon.classList.add('fa-list-alt')
        
        const projectName = document.createElement('p')
            projectName.classList.add('tab-name')
            projectName.classList.add('nav-subheading')
            projectName.textContent = heading
    
        const closeIcon = document.createElement('i')
            closeIcon.classList.add('fas')
            closeIcon.classList.add('fa-times')
            closeIcon.classList.add('fa-xs')
            closeIcon.addEventListener('click', (e) => removeProject(e))
    
        projectItem.appendChild(projectIcon)
        projectItem.appendChild(projectName)
        projectItem.appendChild(closeIcon)
    
        return projectItem
    }
    
    function removeProject(e) {
        const slideContainer = document.querySelector('.slide')
        const projectName = e.target.previousElementSibling.textContent;
        clearRemovedProjectTask(projectName)
        removeProjectFromLS(projectName)
    }

    function removeProjectFromLS(projectName) {
        const toDosData = JSON.parse(localStorage.todos);
        delete toDosData[projectName];
        localStorage.setItem('todos', JSON.stringify(toDosData));
        fillNewProjectSection()
        todosManager.activateSlide()
    }

    function clearRemovedProjectTask(project) {
        const toDosData = JSON.parse(localStorage.todos);
        
        if (toDosData[project].length !== 0){
            toDosData[project].forEach(task => todosManager.removeTaskFromLS(task.name))
        }
    }

    function fillNewProjectSection() {
        const toDosData = JSON.parse(localStorage.todos)
        delete toDosData.Home
        delete toDosData.Today
        delete toDosData.Week
        const projectsNamesArr = Object.keys(toDosData)
        const newProjectContainer = document.querySelector('.new-projects')
        newProjectContainer.innerHTML = '';

        projectsNamesArr.forEach(name => newProjectContainer.appendChild(createNewProjectItem(name)))
        
    }

    function activateNewProjectModal() {
        const newProjectBtn = document.querySelector('.add-projects-btn')
    
        newProjectBtn.addEventListener('click', () => {
        openNewProjectModal()
        submitNewProject()
        hideAddProjectBtn()
    })
    }
 
    return {
        activateNewProjectModal,
        fillNewProjectSection
        
    }
})();