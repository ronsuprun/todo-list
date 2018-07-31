describe('Add and Remove New Tasks', function () {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#login-email').type('ron@platterz.ca')
    cy.get('#login-password').type('ponies')
    cy.get('.login-button').click()
  })

  it('Adds New Tasks', function () {
    cy.get('#new-task').type('Clean room')
    cy.get('#save-button').click()
    cy.get('tr#1').contains('Clean room')
  })

  it('Removes Task', function () {
    cy.get('#new-task').type('Clean room')
      .then(() => cy.get('#save-button').click())
      .then(() => cy.get('tr#1').then((tr) => tr[0].children[4].firstChild.click()))
      .then(() => cy.get('#current-tasks tr').should('not.exist'))
      .then(() => cy.get('#deleted-tasks tr').contains('Clean room').then((tr) => {tr[0].children.length == 1}));
  })
})