// List of tasks
taskList = [];

// Task Class
function Task(name) {

  // Fields
  this.id = taskList.length > 0 ? taskList[taskList.length-1].id + 1 : 1;
  this.name = name;
  this.createdDate = getDate();
  this.status = "Incomplete";
  this.deleted = false;

  // Methods
  this.addToDOM = function () {

    // Create nodes
    var newTask = document.createElement("tr");
    var idCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var createDateCell = document.createElement("td");
    var statusCell = document.createElement("td");
    var deleteCell = document.createElement("td");
    var deleteButton = document.createElement("button");

    // Set attributes
    idCell.innerHTML = this.id;
    idCell.className = 'taskID'
    nameCell.innerHTML = this.name;
    nameCell.className = 'taskName';
    createDateCell.innerHTML = this.createdDate;
    createDateCell.className = 'taskDt';
    statusSelect = createStatusSelect(this.status);
    statusCell.appendChild(statusSelect);
    statusCell.className = 'taskStatus';
    deleteButton.innerHTML = 'x';
    deleteButton.onclick = function() {return deleteTask(idCell.innerHTML)};
    deleteButton.className = 'delete-btn';
    deleteCell.className = 'taskX';
    newTask.id = this.id;

    // append nodes to each other
    newTask.appendChild(idCell);
    newTask.appendChild(nameCell);
    newTask.appendChild(createDateCell);
    newTask.appendChild(statusCell);
    newTask.appendChild(deleteCell);
    deleteCell.appendChild(deleteButton);

    if (!this.deleted) {
      document.getElementById('current-tasks').appendChild(newTask);
    }
    else {
      statusSelect.disabled = true;
      deleteButton.disabled = true;
      newTask.className = 'deleted';
      document.getElementById('deleted-tasks').appendChild(newTask);
    }
  }
}

// Returns DOM node for status drop down
function createStatusSelect(status) {
  // Create nodes
  var select = document.createElement("select");
  var complete = document.createElement("option");
  var incomplete = document.createElement("option");

  // Set attributes
  select.name = "status";
  complete.value = "Complete";
  complete.innerHTML = "Complete";
  incomplete.selected = status == 'Complete';
  incomplete.value = "Incomplete";
  incomplete.innerHTML = "Incomplete";
  incomplete.selected = status == 'Incomplete';
  select.addEventListener('change', function (evt) {
    return taskStatusChange(evt);
  });

  // Append to parent
  select.appendChild(complete);
  select.appendChild(incomplete);

  return select;
}

// Function for 'onclick' attribute of delete button
function deleteTask(id) {

  // Set deleted field to true
  taskList.forEach(function(task){
    if (task.id == id) {
      task.deleted = true;
    }
  });

  // Remove task
  var taskNode = document.getElementById(id);
  document.getElementById('current-tasks').removeChild(taskNode);

  // Add deleted style and disable buttons
  taskNode.className = 'deleted';
  taskNode.children[3].children[0].disabled = true;
  taskNode.children[4].children[0].disabled = true;

  // Add task to deleted section
  document.getElementById('deleted-tasks').insertBefore(taskNode,
    document.getElementById('deleted-tasks').firstChild);
}

// Return date in this format: mm/dd/yyyy hh:MM
function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var MM = today.getMinutes();

  // Format to 2 digits
  if (dd < 10) {dd = '0' + dd}
  if (mm < 10) {mm = '0' + mm}
  if (hh < 10) {hh = '0' + hh}
  if (MM < 10) {MM = '0' + MM}

  today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + MM;
  return today;
}

// Create task, add to task list, and add to DOM
function newTask() {
  // Input field node
  var t = document.getElementById('new-task');

  if (t.value && t.value != "") {
    // Add to list of tasks and clear input
    var newTask = new Task(t.value)
    taskList.push(newTask);
    t.value = "";
    newTask.addToDOM();
  }
}

// Change task status using select field
function taskStatusChange(evt) {
  var id = evt.target.parentElement.parentElement.id;
  var taskNode = document.getElementById(id)
  var taskObj = taskList.filter(function (task) { return task.id == id})[0];
  taskObj.status = Array.from(taskNode.children[3].firstChild.children)
    .filter(function(option) {
      if (option.selected == true) {
        return option.value;
      }
  });

  // TODO: FIX THIS?
  // Enter button event listener
  document.getElementById("new-task").addEventListener("keyup", function (evt) {
    console.log("ENTER")
    evt.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("save-button").click();
    }
  })

}