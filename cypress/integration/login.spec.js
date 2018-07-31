describe('Test Login', function() {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('Visits URL', function () {
    cy.get('#login-email')
    cy.get('#login-password')
    cy.get('.login-button')
  })

  it('Logs into the application', function () {
    cy.get('#login-email').type('ron@platterz.ca')
    cy.get('#login-password').type('ponies')
    cy.get('.login-button').click()
    cy.url('should.have','/task-list.html')
  })
})