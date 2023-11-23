describe('Test all header functionalities', () => {
  before(() => {
    cy.loginToMetamask('Polygon', true);
    cy.visit('/deploy');
  });

  it('should change between all networks', () => {
    cy.getBySel('networks-dropdown').click();
    cy.getBySel('network-option-1').click();
    cy.allowMetamaskToAddAndSwitchNetwork();
    cy.getNetwork().then(() => {
      cy.getBySel('selected-network').should('contain', 'Binance');
    });

    cy.getBySel('networks-dropdown').click();
    cy.getBySel('network-option-2').click();
    cy.allowMetamaskToSwitchNetwork();
    cy.getNetwork().then((network: any) => {
      cy.getBySel('selected-network').should('contain', 'Ethereum');
    });

    cy.getBySel('networks-dropdown').click();
    cy.getBySel('network-option-3').click();
    cy.allowMetamaskToSwitchNetwork();
    cy.getNetwork().then((network: any) => {
      cy.getBySel('selected-network').should('contain', 'Polygon');
    });
  });

  it('should check the address', () => {
    cy.fetchMetamaskWalletAddress().then((address?: string) => {
      if (address) {
        const splitAddress = address.split('...');

        cy.getBySel('header-address')
          .invoke('text')
          .should('contain', splitAddress[0])
          .and('contain', splitAddress[1]);
      }
    });
  });

  it('should reconnect inside the app', () => {
    cy.disconnectMetamaskWalletFromDapp();
    cy.getBySel('connect-wallet').should('contain', 'Connect wallet').click();

    cy.getBySel('Metamask').click();
    cy.acceptMetamaskAccess();
    cy.getBySel('Polygon').click();
    cy.getBySel('Marvel').click();
    cy.confirmMetamaskSignatureRequest();
    cy.getBySel('address-info').should('be.visible');
  });
});

export {};
