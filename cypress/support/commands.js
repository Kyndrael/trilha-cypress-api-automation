
// Você pode definir comandos customizados aqui, exemplo:
Cypress.Commands.add('loginApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/login',
    body: { email, password }
  }).then((resp) => {
    window.localStorage.setItem('token', resp.body.token)
  })
})
