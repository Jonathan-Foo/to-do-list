/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("(function initializeToDosData() {\n    const emptyToDosData = {\"Home\": [], \n                            \"Today\": [],\n                            \"Week\": [],\n                            \"Gym\": [],\n                            \"Work\": []\n                            } ;\n    if (!localStorage.getItem('todos')) {\n        emptyToDosData.Home.push(newTaskInfoFactory(\"Take out trash\", \"take out the recycling waste\", \"low\", \"\", \"2022-11-02\"));\n        emptyToDosData.Home.push(newTaskInfoFactory(\"Wash the dishes\", \"wash last nights dishes\", \"mid\", \"\", \"2022-10-12\"));\n        emptyToDosData.Home.push(newTaskInfoFactory(\"Walk the dog\", \"take Fred out for a walk\", \"low\", \"\", \"2022-04-04\"));\n        emptyToDosData.Home.push(newTaskInfoFactory(\"Dentist appointment\", \"routine dental check-up\", \"low\", \"\", \"2022-04-06\"));\n        emptyToDosData.Home.push(newTaskInfoFactory(\"Chest workout\", \"do chest routine\", \"mid\", \"Gym\", \"2022-05-06\"));\n        emptyToDosData.Home.push(newTaskInfoFactory(\"Complete and submit to-do list app\", \"submit to do list web app\", \"high\", \"Work\", \"2022-04-08\"));\n\n        emptyToDosData.Today.push(newTaskInfoFactory(\"Walk the dog\", \"take Fred out for a walk\", \"low\", \"Today\", \"2022-04-04\"));\n\n        emptyToDosData.Week.push(newTaskInfoFactory(\"Walk the dog\", \"take Fred out for a walk\", \"low\", \"Today\", \"2022-04-04\"));\n        emptyToDosData.Week.push(newTaskInfoFactory(\"Dentist appointment\", \"routine dental check-up\", \"low\", \"\", \"2022-04-06\"));\n        emptyToDosData.Week.push(newTaskInfoFactory(\"Complete and submit to-do list\", \"submit to do list web app\", \"high\", \"Work\", \"2022-04-08\"));\n\n        emptyToDosData.Gym.push(newTaskInfoFactory(\"Work chest\", \"do chest routine\", \"mid\", \"Gym\", \"2022-05-06\"));\n\n        emptyToDosData.Work.push(newTaskInfoFactory(\"Complete and submit to-do list app\", \"submit to do list web app\", \"high\", \"Work\", \"2022-04-08\"));\n    };\n\n    console.log(emptyToDosData)\n})();\n\n\n// localStorage.clear()\n\n\nfunction newTaskInfoFactory(name, detail, priority, project, dueDate ) {\n\tif (project == 'Home' || project == 'Today' || project == 'Week') {\n\tproject = ''\n}\n\treturn {name, detail, priority, project, dueDate}\n}\n\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;