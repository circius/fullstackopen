const backendUrl = "http://localhost:3003"
const backendApi = `${backendUrl}/api`
const frontendUrl = "http://localhost:3000/"

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${backendApi}/testing/reset`)
    cy.visit(frontendUrl)
  })
  it('displays the login form by default', function () {
    cy.get('form')
      .should('contain', 'login')
      .and('contain', 'username')
      .and('contain', 'password')
  })
})

describe('Logging in to Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${backendApi}/testing/reset`)
    const user = {
      username: 'geraldine',
      name: 'geraldine dupont',
      password: 'justgeraldine'
    }
    cy.request('POST', `${backendApi}/users`, user)
    cy.visit(frontendUrl)
  })
  it('informs the user of failed login attempts', function () {
    cy.get('#username')
      .type('geraldine')
    cy.get('#password')
      .type('myoldpassword')
    cy.get('#submit').click()

    cy.get('.warning')
      .contains('failed')
  })
  it('successfully logs in with correct credentials', function () {
    cy.get('#username')
      .type('geraldine')
    cy.get('#password')
      .type('justgeraldine')
    cy.get('#submit').click()

    cy.get('.telling')
      .contains('logged in!')

    cy.contains('geraldine')
  })
})