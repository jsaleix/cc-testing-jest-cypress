describe( '05 - check item', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
        cy.get('.list').get('.list-item').first().click();
    });

    it( 'Display item update modal', () => {
        cy.get('.list-item')
            .first()
            .find('.item-check-input')
            .invoke('attr', 'checked')
            .then( el => {
                    
                cy.get('.list-item')
                    .first()
                    .find('.item-check-input')
                    .click();
                
                cy.reload();

                if(!el){
                    cy.get('.list-item')
                    .first()
                    .find('.item-check-input')
                    .should('be.checked');
                }else{
                    cy.get('.list-item')
                        .first()
                        .find('.item-check-input')
                        .should('not.be.checked');
                }
            });

    });

});