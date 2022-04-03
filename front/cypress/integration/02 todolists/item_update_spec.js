describe( '04 - update item', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
        cy.get('.list').get('.list-item').first().click();
        cy.get('.list-item').first().click();
        cy.get('.create-todolist-modal').should('exist');
    });

    it( 'Display item update modal', () => {
        cy.get('.create-todolist-modal').contains('Update');
    });

    it( 'Can\'t update with empty content', () => {
        cy.get('[data-testid=update-name]')
            .clear()
            .type('New title');
        cy.get('[data-testid=update-content]')
            .clear();
        cy.get('.create-todolist-modal').find('button').click();
        cy.get('#root').should('contain', 'Could not update your item');
    });

    it( 'Can\'t update with empty title', () => {
        cy.get('[data-testid=update-content]').clear().type('New content');
        cy.get('[data-testid=update-name]').clear();
        cy.get('.create-todolist-modal').find('button').click();
        cy.get('#root').should('contain', 'Could not update your item');
    });

    it( 'Should update the title', () => {
        let newtitle = 'New title';
        cy.get('[data-testid=update-name]')
            .clear()
            .type(newtitle);
        cy.get('.create-todolist-modal').find('button').click();
        cy.get('.create-todolist-modal').should('not.exist');
        cy.get('.list-item').first().contains(newtitle);
    });

    it( 'Should update the content', () => {
        let newContent = 'New content';
        cy.get('[data-testid=update-content]')
            .clear()
            .type(newContent);
        cy.get('.create-todolist-modal').find('button').click();
        cy.get('.create-todolist-modal').should('not.exist');  
        cy.get('.list-item').first().contains(newContent);
    });

});