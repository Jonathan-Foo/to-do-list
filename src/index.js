(function initializeToDosData() {
    const emptyToDosData = {"Home": [], 
                            "Today": [],
                            "Week": [],
                            "Gym": [],
                            "Work": []
                            } ;
    if (!localStorage.getItem('todos')) {
        emptyToDosData.Home.push(newTaskInfoFactory("Take out trash", "take out the recycling waste", "low", "", "2022-11-02"));
        emptyToDosData.Home.push(newTaskInfoFactory("Wash the dishes", "wash last nights dishes", "mid", "", "2022-10-12"));
        emptyToDosData.Home.push(newTaskInfoFactory("Walk the dog", "take Fred out for a walk", "low", "", "2022-04-04"));
        emptyToDosData.Home.push(newTaskInfoFactory("Dentist appointment", "routine dental check-up", "low", "", "2022-04-06"));
        emptyToDosData.Home.push(newTaskInfoFactory("Chest workout", "do chest routine", "mid", "Gym", "2022-05-06"));
        emptyToDosData.Home.push(newTaskInfoFactory("Complete and submit to-do list app", "submit to do list web app", "high", "Work", "2022-04-08"));

        emptyToDosData.Today.push(newTaskInfoFactory("Walk the dog", "take Fred out for a walk", "low", "Today", "2022-04-04"));

        emptyToDosData.Week.push(newTaskInfoFactory("Walk the dog", "take Fred out for a walk", "low", "Today", "2022-04-04"));
        emptyToDosData.Week.push(newTaskInfoFactory("Dentist appointment", "routine dental check-up", "low", "", "2022-04-06"));
        emptyToDosData.Week.push(newTaskInfoFactory("Complete and submit to-do list", "submit to do list web app", "high", "Work", "2022-04-08"));

        emptyToDosData.Gym.push(newTaskInfoFactory("Work chest", "do chest routine", "mid", "Gym", "2022-05-06"));

        emptyToDosData.Work.push(newTaskInfoFactory("Complete and submit to-do list app", "submit to do list web app", "high", "Work", "2022-04-08"));
    };

    console.log(emptyToDosData)
})();


// localStorage.clear()


function newTaskInfoFactory(name, detail, priority, project, dueDate ) {
	if (project == 'Home' || project == 'Today' || project == 'Week') {
	project = ''
}
	return {name, detail, priority, project, dueDate}
}

