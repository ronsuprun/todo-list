/**
 *  Keep track of sorting
 *    possible statuses: none, asc, desc
 **/

var sortStatus_ID = 'none';
var sortStatus_Name = 'none';
var sortStatus_Dt = 'none';
var sortStatus_Status = 'none';


function sort(colNum) {

  // Sort data structure (list of objects)
  taskList.sort(function (a,b) {
    switch(colNum) {
      case 1: // ID
        if (sortStatus_ID == 'asc') {
          return a.id - b.id;
        }
        else if (sortStatus_ID == 'desc') {
          return b.id - a.id;
        }
        break;
      case 2: // Name
        if (sortStatus_Name == 'asc') {
          return a.name.toUpperCase() - b.name.toUpperCase();
        }
        else if (sortStatus_Name == 'desc') {
          return b.name.toUpperCase() - a.name.toUpperCase();
        }
        break;
      case 3: // Created Date
        if (sortStatus_Dt == 'asc') {
          return a.createdDate - b.createdDate;
        }
        else if (sortStatus_Dt == 'desc') {
          return b.createdDate - a.createdDate;
        }
        break;
      case 4: // Status
        if (sortStatus_Status == 'asc') {
          if (a.status != b.status && a.status == "Complete") {
            return 1;
          }
          else if (a.status != b.status && a.status == "Incomplete") {
            return -1;
          }
          else {
            return 0;
          }
        }
        else if (sortStatus_Status == 'desc') {
          if (a.status != b.status && a.status == "Complete") {
            return -1;
          }
          else if (a.status != b.status && a.status == "Incomplete") {
            return 1;
          }
          else {
            return 0;
          }
        }
        break;
    }


  });

  // Update DOM task list
  displayTaskList();

  // Update button direction & sort status

}

function displayTaskList() {

  // Clear all nodes
  var taskListDOM = document.getElementById('actual-list-of-tasks');
  console.log(taskListDOM.childNodes);
  taskListDOM.childNodes.forEach(function (child) {
    taskListDOM.removeChild(child);
  });

  // Re-add nodes in the correct order
  taskList.forEach(function(task){
    task.addToDOM();
  });


}