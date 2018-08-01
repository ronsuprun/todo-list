import { CyTasksComponent } from '../helpers/tasks.component.cy';
import { CyToDoFlows } from '../helpers/todo.flows.cy';

describe('Delete task', function () {
  const taskComponent = new CyTasksComponent();
  const flows = new CyToDoFlows();

  beforeEach(()=>{
    cy.visit('/');
    flows.login('ron@platterz.ca', 'ponies');
  })

  it('disables buttons when task is deleted', function () {
    flows.createTask('Clean room');
    flows.deleteTask(1);
    taskComponent.rowStatusSelectElement(1).then(select => {
      expect(select[0].disabled).to.equal(true)});
  })

  it('moves task to top of deleted list when task is deleted', function () {
    flows.createTask('Clean room');
    flows.createTask('Finish homework');
    flows.deleteTask(1);
    taskComponent.deletedTasks.then(tasks => {expect(tasks[0].id).to.equal('1')});
  })
})