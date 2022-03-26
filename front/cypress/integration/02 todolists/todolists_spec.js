describe( '02 - todolists', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it( 'Displays Your Todolists h2', () => {
        cy.contains('h2', 'Your Todolists');
    });

    it( 'Display LOGOUT button', () => {
        cy.get('#header').contains('LOGOUT').should('exist')
    });

    it( 'Display CREATE TODOLIST button', () =>{
        cy.contains('CREATE A NEW TODOLIST');
    });

    it( 'Display at least one todolist', () => {
        cy.get('.list')
            .then( el => expect(el.length).to.be.at.least(1) )
    });

    it( 'Open Todolist creation modal', () =>{
        cy.contains('CREATE A NEW TODOLIST').click();
        cy.get('.create-todolist-modal').should('exist');
        cy.get('.create-todolist-modal').contains('Create a new todo-list');
    });

    it( 'Don\'t create a todolist without name', () =>{
        cy.contains('CREATE A NEW TODOLIST').click();
        cy.get('.create-todolist-modal').find('button').then(el => el.click());
        cy.get('.create-todolist-modal').should('exist');//The modal should still be here
    });

    it( 'Create a todolist after typing a name', () =>{
        cy.contains('CREATE A NEW TODOLIST').click();
        cy.get('.create-todolist-modal').find('input').type('new list');
        cy.get('.create-todolist-modal').find('button').then(el => el.click());
        cy.get('.create-todolist-modal').should('not.exist');//The modal should still be here
    });

});