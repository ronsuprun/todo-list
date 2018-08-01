export class CyLoginComponent {

  get loginEmailField() {
    return cy.get('#login-email');
  }

  get loginPasswordField() {
    return cy.get('#login-password');
  }

  get loginButton() {
    return cy.get('.login-button');
  }

  get errorMessage() {
    return cy.get('#error').then((e) => { return e });
  }

}