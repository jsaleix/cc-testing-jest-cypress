describe( '03 - create item', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
        cy.get('.list').get('.list-item').first().click();
    });

    it('Create an item with a valid Name & Content', () => {
        cy.get('.todolist').find('button').first().click();
        cy.get('.create-todolist-modal').should('exist');
        cy.get('.create-todolist-modal').contains('Add a new item');

        cy.get('[data-testid=create-name]').type('New title');
        cy.get('[data-testid=create-content]').type('New content');

        cy.get('.create-todolist-modal').find('button').first().click();
        cy.get('.create-todolist-modal').should('not.exist');
        cy.get('#root').should('contain', 'Could not add your item');
    });

});