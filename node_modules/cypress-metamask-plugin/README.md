# Cypress MetaMask

Interacting with you MetaMask made "easy" from cypress.

This plugin is based on the previous work by [Jakub Mucha - drptbl](https://github.com/drptbl) and [Paulo Cardoso](https://github.com/pcardosolei) but with a more stripped down and simpler approach.

**Note:** This plugin is in development mode.

## Example

1. Update `package.json` dependencies (run npm install later):

```js
"cypress-metamask-plugin": "git://github.com/0xCarbon/cypress-metamask-plugin.git#99cf2329b46e6ea5d628005e3c6de97ba8ecafa2",
```

2. Import the plugin in `cypress/support/index.js`

```js
import './commands';
import 'cypress-metamask-plugin/support/commands';
```

3. Modify your `cypress/plugins/index.js` to include the plugin:

```js
module.exports = (on, config) => {
  require('cypress-metamask-plugin/plugins')(on, config);
};
```

4. Create a `cypress.env.json` file:

```
{
  "SECRET_WORDS": "test test test test test test test test test test test junk",
  "PASSWORD": "TestMetaMask",
  "NETWORK_NAME": "mainnet"
}
```

5. Add these scripts to your `package.json` (or modify your existing scripts):

```json
"cypress": "CYPRESS_REMOTE_DEBUGGING_PORT=9222 cypress run --browser chrome --headed",
"cypress:open": "CYPRESS_REMOTE_DEBUGGING_PORT=9222 cypress open",
```

6. Create a test:

```js
describe('Swap component', () => {
  before(() => {
    const { SECRET_WORDS, PASSWORD, NETWORK_NAME } = Cypress.env();

    cy.setupMetamask(SECRET_WORDS, NETWORK_NAME, PASSWORD);
    cy.showTestnetsInMetamask();
    cy.changeMetamaskNetwork('mainnet');
    cy.visit('/token');
  });

  it('should display initial values', () => {
    cy.getBySel('swap-home').should('be.visible');
    cy.getBySel('home-button').should('have.text', 'Connect Wallet');
  });

  it('successfully connects wallet account', () => {
    cy.getBySel('home-button').click();
    cy.getBySel('swap-connect-modal').should('be.visible');
    cy.getBySel('swap-metaMask').click();
    cy.allowMetamaskToAddAndSwitchNetwork();
    cy.getBySel('account-connected').should('be.visible');
  });
});

export {};
```

7. Run

```bash
$ npm run cypress
// or
$ npm run cypress:open
```
