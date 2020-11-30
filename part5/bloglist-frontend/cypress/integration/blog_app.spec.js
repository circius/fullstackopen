const backendUrl = "http://localhost:3003"
const backendApi = `${backendUrl}/api`
const frontendUrl = "http://localhost:3000/"
const userTokenKey = 'loggedBlogUser'

const geraldine = {
  username: 'geraldine',
  name: 'geraldine dupont',
  password: 'justgeraldine'
}

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request(
    'POST',
    `${backendApi}/login`,
    { username: username, password: password }
  ).then(({ body }) => {
    localStorage.setItem(userTokenKey, JSON.stringify(body))
    cy.visit(frontendUrl)
  })
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request(
    'POST',
    `${backendApi}/users`,
    { name: name, username: username, password: password }
  )
})

Cypress.Commands.add('createBlog', ({ author, title, url }) => {
  cy.request({
    url: `${backendApi}/blogs`,
    method: 'POST',
    body: { author, title, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem(userTokenKey)).token}`
    }
  })

  cy.visit('http://localhost:3000')
})



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
    cy.request('POST', `${backendApi}/users`, geraldine)
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

describe('having logged into the blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${backendApi}/testing/reset`)

    cy.createUser(geraldine)
    cy.login(geraldine)
    cy.visit(frontendUrl)
  })
  it.only("can make new notes", function () {
    cy.contains('new note')
      .click()
    cy.get('#title')
      .type('apples')
    cy.get('#author')
      .type('Munchausen')
    cy.get('#url')
      .type('http://nothi.ng')
    cy.contains('submit')
      .click()

    cy.visit(frontendUrl)
      .contains('apples')
  })
})