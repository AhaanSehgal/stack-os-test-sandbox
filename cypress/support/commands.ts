// @ts-check
///<reference path="../global.d.ts" />

Cypress.Commands.add('getBySel', (selector, ...args): any => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args): any => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
});

Cypress.Commands.add('loginToMetamask', (network: string, alreadyConnected?: boolean): any => {
  const { SECRET_WORDS, PASSWORD, NETWORK_NAME } = Cypress.env();

  if (!alreadyConnected) cy.setupMetamask(SECRET_WORDS, NETWORK_NAME, PASSWORD);
  cy.visit('/');

  cy.getBySel('Metamask').click();
  if (!alreadyConnected) cy.acceptMetamaskAccess();

  cy.getBySel(network).click();
  if (!alreadyConnected) cy.allowMetamaskToAddAndSwitchNetwork();

  cy.getBySel('Marvel').click();
  cy.confirmMetamaskSignatureRequest();
});

export {};
