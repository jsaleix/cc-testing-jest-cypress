context('Movie search', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Search movie success', () => {
        cy.getByTestId('input-search')
            .get('input')
            .type('the shining');
        cy.getByTestId('button-search').click();
        cy.getByTestId('movie-title').contains('The Shining');
        cy.getByTestId('movie-year').contains('1980');    });
  });