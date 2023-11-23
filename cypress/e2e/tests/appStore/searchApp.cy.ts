describe('Search an app from app store', () => {
  before(() => {
    cy.loginToMetamask('Polygon', false);
    cy.visit('/app-store');
  });

  it('should search "redis" and open page app', () => {
    cy.getBySel('search-input').should('be.visible').type('redis');
    cy.getBySel('search-button').should('be.visible').click();

    cy.getBySel('search-card-0').should('be.visible');
    cy.getBySel('search-card-title').first().should('contain', 'Redis');
    cy.getBySel('search-card-0').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/app-store/search/redis');
    });

    cy.getBySel('description').should('be.visible');

    cy.getBySel('tab-tags').should('be.visible').click();
    cy.getBySel('tags').should('be.visible');
  });
});

export {};
