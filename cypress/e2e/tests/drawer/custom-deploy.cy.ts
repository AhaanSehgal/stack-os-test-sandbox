describe('Open drawer from navbar and deploy custom image', () => {
  before(() => {
    cy.loginToMetamask('Polygon', true);
    cy.visit('/deploy');
  });

  it('should deploy new app successfully', () => {
    cy.getBySel('navbar-deploy').click();
    cy.getBySel('drawer').should('be.visible');
    cy.getBySel('drawer-deploy-option-1').click();
    cy.getBySel('drawer-basic-info').should('be.visible');

    cy.getBySel('drawer-basic-info-name').type('asd');
    cy.getBySel('drawer-basic-info-registry').type('asd');
    cy.getBySel('drawer-basic-info-image').type('asd');
    cy.getBySel('drawer-button-next').click();

    cy.getBySel('drawer-container-image').should('be.visible');
    cy.getBySel('drawer-container-image-protocol').type('TCP');
    cy.getBySel('drawer-button-next').click();

    cy.getBySel('drawer-resources').should('be.visible');
    cy.getBySel('drawer-resources-cpu').type('10');
    cy.getBySel('drawer-resources-memory').type('10');
    cy.getBySel('drawer-resources-bandwidth').type('10');
    cy.getBySel('drawer-resources-storage').type('10');
    cy.getBySel('drawer-button-next').click();

    cy.getBySel('drawer-deploy').should('be.visible');
    cy.getBySel('drawer-button-next').click();

    cy.getBySel('drawer-loading').should('be.visible');
    cy.wait(3000);
    cy.getBySel('drawer-success').should('be.visible');
    cy.getBySel('drawer-button-deployed').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/deploy');
    });
    cy.getBySel('drawer').should('not.be.visible');
  });
});

export {};
