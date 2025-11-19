const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    setupNodeEvents(on, config) {
      return config
    },
    retries: {
      runMode: 1,  
      openMode: 1   
    },
  }
})
