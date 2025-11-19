const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    setupNodeEvents(on, config) {
      return config
    },
    // retries: {
    //   runMode: 1,   // quando o teste roda no CI
    //   openMode: 1   // quando roda no modo interativo (cypress open)
    // },
  }
})
