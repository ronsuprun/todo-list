/**
 *  Keep track of sorting
 *    possible statuses: none, asc, desc
 **/

 var sortStatus = {
   '1': {'status':'none', 'id':'id-sort', 'label': 'ID - '},
   '2': { 'status': 'none', 'id': 'name-sort', 'label': 'Name - ' },
   '3': { 'status': 'none', 'id': 'date-sort', 'label': 'Created Date - ' },
   '4': { 'status': 'none', 'id': 'status-sort', 'label': 'Status - ' },
 }


function sort(colNum) {

  // Separate deleted from not deleted tasks
  var currentTasks = taskList.filter(function(task) {return !task.deleted});
  var deletedTasks = taskList.filter(function (task) { return task.deleted });

  // Update button label & sort status
  var oldLabel = sortStatus[String(colNum)]['label']
  var newLabel = oldLabel.substring(0, oldLabel.length-3)
  if (sortStatus[String(colNum)]['status'] == 'none') {
    sortStatus[String(colNum)]['status'] = 'asc';
    sortStatus[String(colNum)]['label'] = newLabel + ' ^ ';
    document.getElementById(sortStatus[String(colNum)]['id']).innerHTML = newLabel + ' ^ ';
  }
  else if (sortStatus[String(colNum)]['status'] == 'asc') {
    sortStatus[String(colNum)]['status'] = 'desc';
    sortStatus[String(colNum)]['label'] = newLabel + ' v ';
    document.getElementById(sortStatus[String(colNum)]['id']).innerHTML = newLabel + ' v ';
  }
  else if (sortStatus[String(colNum)]['status'] == 'desc') {
    sortStatus[String(colNum)]['status'] = 'none';
    sortStatus[String(colNum)]['label'] = newLabel + ' - ';
    document.getElementById(sortStatus[String(colNum)]['id']).innerHTML = newLabel + ' - ';
  }

  // Update other button labels & status
  [1, 2, 3, 4].filter(function (x) { return x != colNum }).forEach(function (i) {
    var currentLabel = sortStatus[String(i)]['label'];
    var updatedLabel = currentLabel.substring(0,currentLabel.length-3) + " - ";
    sortStatus[String(i)]['label'] = updatedLabel;
    sortStatus[String(i)]['status'] = 'none';
    document.getElementById(sortStatus[String(i)]['id']).innerHTML = updatedLabel;
  })

  currentTasks.sort(sortFunc(colNum));
  deletedTasks.sort(sortFunc(colNum));

  // Update DOM task list
  displayTaskList(currentTasks, deletedTasks);

}

function displayTaskList(currTasks, delTasks) {

  // Clear all nodes
  var currentTasks = document.getElementById('current-tasks');
  while (currentTasks.firstChild) {
    currentTasks.removeChild(currentTasks.firstChild);
  }
  var deletedTasks = document.getElementById('deleted-tasks')
  while (deletedTasks.firstChild) {
    deletedTasks.removeChild(deletedTasks.firstChild);
  }

  // Re-add nodes in the correct order
  currTasks.forEach(function(task){ task.addToDOM() });
  delTasks.forEach(function (task) { task.addToDOM() });

}

function sortFunc (colNum) {

  return function (a,b) {
    if (colNum == 1) { // ID
      if (sortStatus[String(colNum)]['status'] == 'asc') { return a.id - b.id }
      else if (sortStatus[String(colNum)]['status'] == 'desc') { return b.id - a.id }
      else { return 0 }
    }
    else if (colNum == 2) { // Name
      if (sortStatus[String(colNum)]['status'] == 'asc') { return a.name.toUpperCase() < b.name.toUpperCase() }
      else if (sortStatus[String(colNum)]['status'] == 'desc') { return a.name.toUpperCase() > b.name.toUpperCase() }
      else { return 0 }
    }
    else if (colNum == 3) { // Created Date
      if (sortStatus[String(colNum)]['status'] == 'asc') { return b.createdDate < a.createdDate }
      else if (sortStatus[String(colNum)]['status'] == 'desc') { return b.createdDate > a.createdDate }
      else { return 0 }

    }
    else if (colNum == 4) { // Status
      if (sortStatus[String(colNum)]['status'] == 'asc') { return a.status == 'Complete' ? 1 : -1 }
      else if (sortStatus[String(colNum)]['status'] == 'desc') { return a.status == 'Complete' ? -1 : 1 }
      else { return 0 }
    }
  }


}