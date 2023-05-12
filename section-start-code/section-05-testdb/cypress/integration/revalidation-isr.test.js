import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';
import { generateNewShow } from '../../__tests__/__mocks__/fakeData/newShow';
import { generateRandomId } from '../../lib/features/reservations/utils';

it("should load refreshed page from cache after a new band is added", () => {
  cy.task("db:reset").visit("/bands");
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("not.exist");

  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band })
    .then(response => {
      expect(response.body.revalidated).to.equal(true);
    });

  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");

  // reset ISR cache to initial db conditions
  cy.resetDbAndIsrCache();
});

it("should load refreshed page from cache after a new show is added", () => {
  cy.task("db:reset").visit("/shows");

  const showId = generateRandomId();
  const show = generateNewShow(showId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/shows?secret=${secret}`, { newShow: show })
    .then(response => {
      expect(response.body.revalidated).to.equal(true);
    });

  cy.reload();
  cy.findByRole("heading", { name: '' }).should("exist");

  cy.resetDbAndIsrCache();
});