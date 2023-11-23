describe('Login with metamask wallet', () => {
  before(() => {
    const { SECRET_WORDS, PASSWORD, NETWORK_NAME } = Cypress.env();

    cy.setupMetamask(SECRET_WORDS, NETWORK_NAME, PASSWORD);
    cy.visit('/');
  });

  it('should connect and disconnect Metamask', () => {
    cy.getBySel('Metamask').click();
    cy.acceptMetamaskAccess();

    cy.disconnectMetamaskWalletFromDapp();
  });

  it('should connect with Metamask', () => {
    cy.getBySel('Metamask').click();
    cy.acceptMetamaskAccess();
  });

  it('should navigate to dashboard', () => {
    cy.getBySel('Polygon').click();

    cy.getBySel('Marvel').click();
    cy.confirmMetamaskSignatureRequest();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/deploy');
    });
  });
});

export {};
