const backendUrl = "http://localhost:3003"
const backendApi = `${backendUrl}/api`
const frontendUrl = "http://localhost:3000/"
const userTokenKey = 'loggedBlogUser'

const geraldine = {
  username: 'geraldine',
  name: 'geraldine dupont',
  password: 'justgeraldine'
}

const blog1 = {
  title: 'apples',
  author: 'Munchhausen',
  url: 'https://nothi.ng'
}

const blog2 = {
  title: 'two sticks',
  author: 'Whitechapel',
  url: 'http://london.gov',
  likes: 2
}

const blog3 = {
  title: 'oranges and lemons',
  author: 'Clement',
  url: 'chipch.op',
  likes: 1,
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

Cypress.Commands.add('createBlog', ({ author, title, url, likes }) => {
  cy.request({
    url: `${backendApi}/blogs`,
    method: 'POST',
    body: { author, title, url, likes },
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
  it("the user can make new notes", function () {
    cy.contains('new note')
      .click()
    cy.get('#title')
      .type(blog1.title)
    cy.get('#author')
      .type(blog1.author)
    cy.get('#url')
      .type(blog1.url)
    cy.contains('submit')
      .click()

    cy.visit(frontendUrl)
      .contains(blog1.title)
  })
})

describe('when the logged-in user has one new post', function () {
  beforeEach(function () {
    cy.request('POST', `${backendApi}/testing/reset`)
    cy.createUser(geraldine)
    cy.login(geraldine)
    cy.createBlog(blog1)
    cy.visit(frontendUrl)
  })
  it('they can like it', function () {
    cy.contains(blog1.title)
      .contains('view')
      .click()
      .parent().contains('likes: 0')
      .contains('like')
      .click()
      .parent().contains('likes: 1')
  })
  it('then can delete it', function () {
    cy.contains(blog1.title)
      .contains('delete')
      .click()
    cy.contains(blog1.title).not()
  })
})


describe('when the logged-in user has three posts', function () {
  beforeEach(function () {
    cy.request('POST', `${backendApi}/testing/reset`)
    cy.createUser(geraldine)
    cy.login(geraldine)
    cy.createBlog(blog1)
    cy.createBlog(blog2)
    cy.createBlog(blog3)

    cy.visit(frontendUrl)
  })
  it.only('the posts are ordered by likes', function () {
    cy.get('#blogList')
      .children()
      .first().contains('two sticks')
      .parent().last().contains('apples')
  })
})