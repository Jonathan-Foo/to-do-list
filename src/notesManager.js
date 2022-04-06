export default (function notesManager() {
    // OPEN AND CLOSE NOTE MODAL
    function openAndCloseNoteModal() {
        triggerNewNoteModal()
        removeNewNoteModal()
    };

    function triggerNewNoteModal() {
        const addNoteIcon = document.querySelector('[data-open-note-modal]')
        addNoteIcon.addEventListener('click', () => openNewNotesModal())
    }

    function openNewNotesModal() {
        const addNoteModal = document.querySelector('.add-note-modal')
        const addNoteForm = document.querySelector('.add-note-form')
        addNoteModal.classList.add('active')
        addNoteForm.classList.add('active')
    }

    function closeNewNotesModal() {
        const addNoteModal = document.querySelector('.add-note-modal')
        const addNoteForm = document.querySelector('.add-note-form')
        addNoteModal.classList.remove('active')
        addNoteForm.classList.remove('active')
    }


    function clearNoteModal() {
        const newNoteTitle = document.querySelector('.new-note-title')
        const newNoteDetail = document.querySelector('.new-note-detail')
        newNoteTitle.value = ''
        newNoteDetail.value = ''
    }

    
    function clearAndCloseNoteModal() {
        closeNewNotesModal() 
        clearNoteModal()
    }
    
    function removeNewNoteModal() {
        const closeNoteModalTriggers = document.querySelector("[data-close-note-modal]")
        closeNoteModalTriggers.addEventListener('click', clearAndCloseNoteModal)  
    }

    //Creating New Notes

    function addNewNotes() {
        const newNoteTitle = document.querySelector('.new-note-title')
        const newNoteDetail = document.querySelector('.new-note-detail')
        
        return createNoteObject( newNoteTitle.value, newNoteDetail.value)
    }


    function createNoteObject(title, detail) {
        return {title, detail}
    }

    function storeNewNote() {
        const notesData = JSON.parse(localStorage.notes)

        notesData.push(addNewNotes())

        localStorage.setItem('notes', JSON.stringify(notesData))
    }

    function submitNewNote() {
            const newNoteBtn = document.querySelector('.new-note-btn')
            newNoteBtn.addEventListener('click', submitNewNoteCheck)
    }

    function submitNewNoteCheck() {
        const addNoteForm = document.querySelector('.add-note-form')
        const newNoteTitle = document.querySelector('.new-note-title')
        const newNoteDetail = document.querySelector('.new-note-detail')
        const newNoteBtn = document.querySelector('.new-note-btn')

        if (newNoteTitle.value == '' && newNoteDetail.value == '' ) {
                addNoteForm.reportValidity()
                return
        } else {
            storeNewNote()
            fillNotesContainer()
            clearAndCloseNoteModal()
        }
    }

    function createNewNote(title, detail, index){
    const note = document.createElement('div')
        note.classList.add('note')
        note.dataset.index = index

        const closeIcon =  document.createElement('i')
            closeIcon.classList.add('fas')
            closeIcon.classList.add('fa-times')
        
        const noteTitle =document.createElement('div')
            noteTitle.classList.add('note-title')
            noteTitle.setAttribute("contenteditable", "true");
            noteTitle.innerText = title

        const noteDetail = document.createElement('div')
            noteDetail.classList.add('note-detail')
            noteDetail.setAttribute("contenteditable", "true");
            noteDetail.innerText = detail
        
        note.appendChild(closeIcon)
        note.appendChild(noteTitle)
        note.appendChild(noteDetail)

        return note
    }

    function fillNotesContainer() {
        const notesData = JSON.parse(localStorage.notes)	 		
        
        const notesContainer = document.querySelector('.notes-container')
        notesContainer.innerHTML = ''

        notesData.forEach((note, index) => notesContainer.appendChild(createNewNote(note.title, note.detail, index)))
        removeNote()       
    }

    // Remove Note from localStorage then Display 
     function removeNote() {
        const closeNoteIcon = [...document.querySelectorAll('.note > i')]
        closeNoteIcon.forEach(icon => icon.addEventListener('click', (e) => remove(e)))
    }

    function remove(e) {
        const index = e.target.parentElement.dataset.index
        const notesData = JSON.parse(localStorage.notes)
        const newNotesData = notesData.slice(0, index).concat(notesData.slice(index + 1))
        localStorage.setItem('notes', JSON.stringify(newNotesData))
        
        fillNotesContainer()
    }

    // Edit Notes, Push to localStorage, Change Display

    function editNote() {
        const noteDivs = [...document.querySelectorAll('.note > div')]
        noteDivs.forEach(container => container.addEventListener('input', (e) => pushEditedNoteToLS(e)))
    }

    function pushEditedNoteToLS(e) {
        const notesData = JSON.parse(localStorage.notes)
        const typeOfInfo = e.target.classList[0].slice(5)
        const index = e.target.parentElement.dataset.index
        const newText = e.target.textContent
        notesData[index][typeOfInfo] = newText 

        localStorage.setItem('notes', JSON.stringify(notesData))
    }


    function createAndEditNotes() {
        submitNewNote()
        editNote()
    }


    function generateNotesHeader() {
        const noteHeader = document.createElement('div')
            noteHeader.classList.add('notes-header')

        const notesHeading = document.createElement('p')
            notesHeading.classList.add('slide-heading')
            notesHeading.textContent = 'Notes'

        const newNoteIcon = document.createElement('i')
            newNoteIcon.classList.add('fas')
            newNoteIcon.classList.add('fa-plus-square')
            newNoteIcon.classList.add('fa-2x')
            newNoteIcon.setAttribute('data-open-note-modal', '')

        noteHeader.appendChild(notesHeading)
        noteHeader.appendChild(newNoteIcon)
        return noteHeader
    }

    function generateNotesContainer() {
        const newNoteContainer = document.createElement('div')
        newNoteContainer.classList.add('notes-container') 
        return newNoteContainer
    }

    function createNoteSection() {
        const slide = document.querySelector('.slide')
        
        slide.innerHTML = ''
        slide.appendChild(generateNotesHeader())
        slide.appendChild(generateNotesContainer())
    }

    function displayNoteTabActive() {
        const tabs = [...document.querySelectorAll('.tab-name')].map(project => project.parentElement)
        const notesNavItem = document.querySelector('.notes')

        tabs.forEach(tab => { 
            if (tab.classList.contains('active')) {
                tab.classList.remove('active')
            }  
        })

        notesNavItem.classList.add('active')
    }

    function notesFunctionality() {
        openAndCloseNoteModal() 
        createAndEditNotes() 
    }

    function activateNoteSection() {
        const notesNavItem = document.querySelector('.notes')
        
        notesNavItem.addEventListener('click',  () => {
            displayNoteTabActive() 
            createNoteSection() 
            fillNotesContainer()
            notesFunctionality()
            removeNote()
            removeNewNoteModal()
        })  
    }

    return {
        activateNoteSection,
        removeNote,
        removeNewNoteModal,
        createNoteObject,
    }
})();
