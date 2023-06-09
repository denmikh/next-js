/// <reference types="Cypress" />

describe('homepage', () => {
  it('loads', () => {
    cy.visit('/');
    cy.get('.logoImage').should('be.visible');
    expect(true).to.equal(true);
  });
});
