describe( '01 - list', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
        cy.get('.list').get('.list-item').first().click();
    });

    it( 'Display page of a todolist', () => {
        cy.contains('DELETE TODOLIST');
    });

    it( 'Should display no list message', () => {
        cy.contains('It looks like you have no list yet');
    });

    it( 'Open item creation modal', () =>{
        cy.get('.todolist').find('button').first().click();
        cy.get('.create-todolist-modal').should('exist');
        cy.get('.create-todolist-modal').contains('Add a new item');
        cy.get('.create-todolist-modal').find('button').first().contains('Add');
    });

    it('Can\'t create an item with no Name or Content', () => {
        cy.get('.todolist').find('button').first().click();
        cy.get('.create-todolist-modal').should('exist');
        cy.get('.create-todolist-modal').contains('Add a new item');
        cy.get('.create-todolist-modal').find('button').first().click();
        cy.get('.create-todolist-modal').should('exist');
        cy.get('#root').should('contain', 'Could not add your item');
    });

});