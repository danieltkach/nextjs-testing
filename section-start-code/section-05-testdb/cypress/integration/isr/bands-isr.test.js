it('skips client-side bundle, confirming data from ISR cache', () => {
  cy.task("db:reset");

  cy.request('/bands')
    .its('body')
    .then(html => {
      const staticHtml = html.replace('/<script.*?>.*?<\/script>/gm', '');
      cy.state('document').write(staticHtml);
    });

  cy.findAllByText(/avalanche of cheese/i).should("exist");
  cy.findAllByText(/the joyous nun riot/i).should("exist");
  cy.findAllByText(/shamrock pete/i).should("exist");
  cy.findAllByText(/the wandering bunnies/i).should("exist");
});
