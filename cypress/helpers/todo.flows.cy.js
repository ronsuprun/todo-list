import { CyLoginComponent } from './login.component.cy';
import { CyTasksComponent } from './tasks.component.cy';
import { CySortComponent } from './sort.component.cy';

export class CyToDoFlows {

  constructor () {
    this.loginComponent = new CyLoginComponent();
    this.tasks = new CyTasksComponent();
    this.sort = new CySortComponent();
  }

  login(username, password) {
    this.loginComponent.loginEmailField.type(username);
    this.loginComponent.loginPasswordField.type(password);
    this.loginComponent.loginButton.click();
  }

  createTask(taskName) {
    this.tasks.newTaskField.type(taskName);
    this.tasks.saveButton.click();
  }

  deleteTask(taskID) {
    this.tasks.rowDeleteButton(taskID).click();
  }

  sortByID(){
    this.sort.idSortBtn.click();
  }

  sortByName() {
    this.sort.nameSortBtn.click();
  }

  sortByDate(){
    this.sort.dtSortBtn.click();
  }

  sortByStatus(){
    this.sort.statusSortBtn.click();
  }

  checkSortOrder (expectedOrder) {
    this.tasks.allTasks.then(allTasks => {
      expect(allTasks.length).to.equal(expectedOrder.length);
      for (var i = 0; i < allTasks.length; i++) {
        expect(allTasks[i].firstChild.innerHTML).to.equal(String(expectedOrder[i]))
      }
    });


  }

}