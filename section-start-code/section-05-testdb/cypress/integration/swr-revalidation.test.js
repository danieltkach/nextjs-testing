import { generateNewReservation } from '../../__tests__/__mocks__/fakeData/newReservation';
import { generateRandomId } from '../../lib/features/reservations/utils';

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30;

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