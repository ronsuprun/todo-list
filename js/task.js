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
    nameCell.innerHTML = this.name;
    createDateCell.innerHTML = this.createdDate;
    statusCell.appendChild(createStatusSelect());
    deleteButton.innerHTML = 'x';
    deleteButton.onclick = function() {return deleteTask(idCell.innerHTML)};
    deleteButton.class = 'delete-btn';
    newTask.id = this.id;

    // append nodes to each other
    newTask.appendChild(idCell);
    newTask.appendChild(nameCell);
    newTask.appendChild(createDateCell);
    newTask.appendChild(statusCell);
    newTask.appendChild(deleteCell);
    deleteCell.appendChild(deleteButton);

    document.getElementById('actual-list-of-tasks').appendChild(newTask);
  }
}

// Returns DOM node for status drop down
function createStatusSelect() {
  // Create nodes
  var select = document.createElement("select");
  var complete = document.createElement("option");
  var incomplete = document.createElement("option");

  // Set attributes
  select.name = "status";
  complete.value = "Complete";
  complete.innerHTML = "Complete";
  incomplete.value = "Incomplete";
  incomplete.innerHTML = "Incomplete";
  incomplete.selected = true;

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

  // Move deleted tasks to the end of the list, apply different styles
  var taskNode = document.getElementById(id);
  document.getElementById('actual-list-of-tasks').removeChild(taskNode);
  taskNode.style.backgroundColor = 'white';
  taskNode.children[3].children[0].disabled = true;
  taskNode.children[4].children[0].disabled = true;
  document.getElementById('actual-list-of-tasks').appendChild(taskNode);

  // Disable Status


  // console.log(taskNode.children);

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
