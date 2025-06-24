describe('Exemplo de Teste Cypress', () => {
  it('Visita a página inicial e verifica o título', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('Kitchen Sink')
  })
})

