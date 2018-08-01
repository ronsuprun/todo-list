import { CyTasksComponent } from '../helpers/tasks.component.cy';
import { CySortComponent } from '../helpers/sort.component.cy';
import { CyToDoFlows } from '../helpers/todo.flows.cy';

describe('Sort tasks', function () {

  const tasksComponent = new CyTasksComponent();
  const sortComponent = new CySortComponent();
  const flows = new CyToDoFlows();

  beforeEach(() => {
    cy.visit('/')
    flows.login('ron@platterz.ca','ponies');
    flows.createTask('Clean room');
    flows.createTask('Finish homework');
    flows.createTask('Read');
    flows.createTask('Finish Angular Tutorial');
    flows.createTask('Finish Bootcamp');
  })

  it('Sorts by ID', function () {
    sortComponent.idSortOrder.then(order => expect(order.trim()).to.equal("-"));
    flows.checkSortOrder([1,2,3,4,5]);
    flows.sortByID();
    sortComponent.idSortOrder.then(order => expect(order.trim()).to.equal("^"));
    flows.checkSortOrder([1, 2, 3, 4, 5]);
    flows.sortByID();
    sortComponent.idSortOrder.then(order => expect(order.trim()).to.equal("v"));
    flows.checkSortOrder([5,4,3,2,1]);

  })
})