
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://seu-endpoint-api.com', // ou localhost se for local
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  projectId: 'xxxxxx' // substitua pelo ID do projeto gerado pela Cypress Cloud
})
