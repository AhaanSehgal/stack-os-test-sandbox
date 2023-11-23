/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
// @ts-ignore
import cypressMetamaskPlugin from 'cypress-metamask-plugin/plugins';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/tests/main.cy.ts',
    viewportHeight: 1000,
    viewportWidth: 1280,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    setupNodeEvents(on, config) {
      cypressMetamaskPlugin(on, config);
      return config;
    },
  },
});
