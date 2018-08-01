import { CyTasksComponent } from '../helpers/tasks.component.cy';
import { CyToDoFlows } from '../helpers/todo.flows.cy';


describe('Add and Remove New Tasks', function () {

  const tasksComponent = new CyTasksComponent();
  const flows = new CyToDoFlows();

  beforeEach(() => {
    cy.visit('/')
    flows.login('ron@platterz.ca', 'ponies');
  })

  it('Adds New Tasks', function () {
    flows.createTask('Clean room');
    tasksComponent.rowName(1).then((name)=>{expect(name).to.equal('Clean room')});
    tasksComponent.rowStatus(1).then((option)=>{expect(option).to.equal('Incomplete')});
    tasksComponent.currentTasks.then((tasks) => { expect(tasks).to.have.lengthOf(1) });
    tasksComponent.deletedTasks.then((tasks) => { expect(tasks).to.have.lengthOf(0) });
  })

  it('Removes Task', function () {
    flows.createTask('Clean room')
    flows.deleteTask(1);
    tasksComponent.rowName(1).then((name) => {expect(name).to.equal('Clean room') });
    tasksComponent.rowStatus(1).then((option) => {expect(option).to.equal('Incomplete') });
    tasksComponent.currentTasks.then((tasks)=>{expect(tasks).to.have.lengthOf(0)});
    tasksComponent.deletedTasks.then((tasks)=>{expect(tasks).to.have.lengthOf(1)});
  })
})