describe( '03 - check item', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
        cy.get('.list').get('.list-item').first().click();
    });

    it( 'Display item update modal', () => {

    });

});