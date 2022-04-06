import todosManager from "./todosManager";
import infoPopUp from "./infoPopUp";
import notesManager from "./notesManager";
import navbarManager from "./navbarManager";

(function initializeToDosData() {
    const emptyToDosData = {"Home": [], 
                            "Today": [],
                            "Week": [],
                            "Gym": [],
                            "Work": []
                            } ;
    if (!localStorage.getItem('todos')) {
        emptyToDosData.Home.push(todosManager.newTaskInfoFactory("Take out trash", "take out the recycling waste", "low", "", "2022-11-02"));
        emptyToDosData.Home.push(todosManager.newTaskInfoFactory("Wash the dishes", "wash last nights dishes", "mid", "", "2022-10-12"));
        emptyToDosData.Home.push(todosManager.newTaskInfoFactory("Walk the dog", "take Fred out for a walk", "low", "", "2022-04-04"));
        emptyToDosData.Home.push(todosManager.newTaskInfoFactory("Dentist appointment", "routine dental check-up", "low", "", "2022-04-06"));
        emptyToDosData.Home.push(todosManager.newTaskInfoFactory("Chest workout", "do chest routine", "mid", "Gym", "2022-05-06"));
        emptyToDosData.Home.push(todosManager.newTaskInfoFactory("Complete and submit to-do list app", "submit to do list web app", "high", "Work", "2022-04-08"));

        emptyToDosData.Today.push(todosManager.newTaskInfoFactory("Walk the dog", "take Fred out for a walk", "low", "Today", "2022-04-04"));

        emptyToDosData.Week.push(todosManager.newTaskInfoFactory("Walk the dog", "take Fred out for a walk", "low", "Today", "2022-04-04"));
        emptyToDosData.Week.push(todosManager.newTaskInfoFactory("Dentist appointment", "routine dental check-up", "low", "", "2022-04-06"));
        emptyToDosData.Week.push(todosManager.newTaskInfoFactory("Complete and submit to-do list", "submit to do list web app", "high", "Work", "2022-04-08"));

        emptyToDosData.Gym.push(todosManager.newTaskInfoFactory("Work chest", "do chest routine", "mid", "Gym", "2022-05-06"));

        emptyToDosData.Work.push(todosManager.newTaskInfoFactory("Complete and submit to-do list app", "submit to do list web app", "high", "Work", "2022-04-08"));
    };

    localStorage.setItem('todos', JSON.stringify(emptyToDosData))
})();


(function initializeNotesData() {
	const emptyNotesData = []
	if (!localStorage.getItem(notes)) {
        emptyNotesData.push(notesManager.createNoteObject('Note Example', 'This is the Notes Section where you can create notes'))
        emptyNotesData.push(notesManager.createNoteObject('Note Example', 'This is the Notes Section where you can create notes'))
        emptyNotesData.push(notesManager.createNoteObject('Note Example', 'This is the Notes Section where you can create notes'))
        emptyNotesData.push(notesManager.createNoteObject('Note Example', 'This is the Notes Section where you can create notes'))
    }
    localStorage.setItem('notes', JSON.stringify(emptyNotesData))
})();

todosManager.fillToDoItemContainer('Home')
navbarManager.fillNewProjectSection()




