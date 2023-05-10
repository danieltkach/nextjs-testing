import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '../../lib/features/reservations/utils';

it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays correct heading for the bands route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).click();
  cy.findByRole("heading", { name: /Our Illustrious Performers/i }).should("exist");
});

it("displays correct band name for band route that existed at build time", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
});

it("display an error when the band does not exist", () => {
  cy.task("db:reset").visit("/bands/12345");
  cy.findByText(/error: band not found/i);
});

it("displays name for band that was not preset at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
});