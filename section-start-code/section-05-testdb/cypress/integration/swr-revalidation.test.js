import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30 * ONE_SECOND;
const FIFTEEN_SECONDS = 15 * ONE_SECOND;

it("should refresh the shows page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");

  // there should be only one sold-out show
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // buy all tickets for first show (id 0, 10 seats available)
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    setCount: 10,
  });
  cy.task("addReservation", newReservation);

  // advance time (less than 30 second revalidate interval) and check again
  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // advance clock 30 seconds more; now additional sold out show should display
  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/sold out/i).should("have.length", 2);
});

it("should load refreshed page from cache after a new band is added", () => {
  cy.task("db:reset").visit("/bands");

  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");

  // reset ISR cache to initial db conditions
  cy.resetDbAndIsrCache();
});

it("refreshes the reservatoins page after fifteen seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  cy.findByRole("main").within(() =>
    cy
      .findByRole("button", { name: /sign in/i })
      .should("exist")
      .click()
  );

  cy.findByText(/10 seats left/i).should("exist");

  const newReservation = {
    reservationId: generateRandomId,
    showId: 0,
    seatCount: 2,
  };
  cy.task("addReservation", newReservation);

  cy.tick(ONE_SECOND);
  cy.findByText(/10 seats left/i).should("exist");

  cy.tick(FIFTEEN_SECONDS);
  cy.findByText(/8 seats left/i).should("exist");
});
