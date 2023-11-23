describe('Login without wallet', () => {
  before(() => {
    cy.visit('/');
  });

  it('should click unliked button and navigate to dashboard', () => {
    cy.getBySel('login-without-wallet-button').click();
    cy.getBySel('login-without-wallet-modal')
      .should('be.visible')
      .then(() => {
        cy.getBySel('login-without-wallet-confirm-button').click();
      });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/deploy');
    });
  });
});

export {};
