import { CyToDoFlows } from '../helpers/todo.flows.cy';
import { CyLoginComponent } from '../helpers/login.component.cy';

const flows = new CyToDoFlows();
const component = new CyLoginComponent();

describe('Test Login', function() {
  beforeEach(()=>{
    cy.visit('/');
  })

  it('Logs into the application', function () {
    flows.login('ron@platterz.ca','ponies');
    cy.url('should.have','/task-list.html');
  })

  it('Displays error message', function () {
    flows.login('ron@platterz.ca','asdfads');
    component.errorMessage.then((e) => {
      expect(e[0].innerHTML).to.equal('Incorrect username or password');
    });
  })
})