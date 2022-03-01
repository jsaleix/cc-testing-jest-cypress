import { click } from "@testing-library/user-event/dist/click";

describe('00 - Login tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Try to log with no credentials', () => {
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Missing credentials');
    });

    it('Missing mail', () => {
        cy.get('[data-testid=login-password]')
            .type('password')
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Missing email');
    });

    it('Missing password', () => {
        cy.get('[data-testid=login-email]')
            .type('samplee@test.fr')
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Missing password');
    });


    it('Invalid credentials', () => {
        cy.get('[data-testid=login-email]')
            .type('wrong@mail.fr')
        cy.get('[data-testid=login-password]')
            .type('password')
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Invalid credentials');
    });

    it('Logging in with right credentials', () => {
        cy.get('[data-testid=login-email]')
            .type('samplee@test.fr')
            .should('have.value', 'samplee@test.fr');
        cy.get('[data-testid=login-password]').type('azerty123');
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'You are now logged in');
        cy.contains('Login').should('not.exist')
    });
});