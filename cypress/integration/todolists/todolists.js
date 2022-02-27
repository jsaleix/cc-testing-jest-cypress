describe( '/', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it( 'Displays Your Todolists h2', () => {
        cy.contains('h2', 'Your Todolists');
    });

});