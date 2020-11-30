describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('displays the login form by default', function () {
    cy.get('form')
      .should('contain', 'login')
      .and('contain', 'username')
      .and('contain', 'password')
  })
})