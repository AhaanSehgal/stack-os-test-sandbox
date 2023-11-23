describe('Open drawer from navbar and deploy from AppStore', () => {
  before(() => {
    cy.loginToMetamask('Polygon', true);
    cy.visit('/deploy');
  });

  it('should navigate to app-store', () => {
    cy.getBySel('navbar-deploy').click();
    cy.getBySel('drawer').should('be.visible');
    cy.getBySel('drawer-deploy-option-2').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/app-store');
    });
  });
});

export {};
