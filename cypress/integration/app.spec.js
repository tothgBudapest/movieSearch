describe('Movie Search', () => {
    it('should make a search and check the first movie card', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/');

        cy.get('#movie_search_field').type('fight').should('have.value', 'fight');

        cy.get('#movie_search_button').click();

        cy.get('.MuiCard-root').find('.MuiTypography-subtitle2').first().should('have.text', 'Fight Club');
    });
});
