/* eslint-disable cypress/unsafe-to-chain-command */
it("runs auth flow for successful login to protected reservations page", () => {
  // visit reservations page for the first show (id = 0)
  cy.task("db:reset").visit("/reservations/0");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should("exist");

  // check that there's no option to purchase tickets
  cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  // enter valid sign-in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit the form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for purchase button and band name
  cy.findByRole("button", { name: /purchase/i }).should("exist");
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");

  // check for email and sign-out button on navbar
  // cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should("exist");
  cy.findByRole("button", { name: "My Profile" }).should("exist");
  cy.findByRole("button", { name: /sign out/i }).should("exist");

  // check that sign in button does not exist
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("checks failed sign-in flow", () => {
  cy.task("db:reset").visit("/user");
  cy.findByRole("heading", { name: /sign in to your account/i }).should("exist");
  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  cy.findByLabelText(/email address/i)
    .clear()
    .type("wrongemail@test.com");
  cy.findByLabelText(/password/i)
    .clear()
    .type("randompassword");
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByText(/sign in failed/i).should("exist");

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit the form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByRole("button", { name: "My Profile" }).should("exist");
  cy.findByRole("button", { name: /sign out/i }).should("exist");

  // check that sign in button does not exist
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("redirects to sign-in for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls) => {
    urls.forEach(($url) => {
      cy.visit($url);
      cy.findByLabelText(/email address/i).should("exist");
      cy.findByLabelText(/password/i).should("exist");
    });
  });
});

it("does not show the sign-in page when already signed in", () => {
  cy.task("db:reset").signIn(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_USER_PASSWORD"));
  cy.visit("/reservations/0");
  cy.findByRole("heading", { name: /sign in to your account/i }).should("not.exist");
  cy.findByRole("button", { name: /purchase/i }).should("exist");
});
