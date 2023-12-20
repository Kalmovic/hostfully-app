describe("booking flow", () => {
  describe("create mode", () => {
    describe("Availability form", () => {
      beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get("button[aria-label='explore']").click();
        cy.get("p").first().should("contain", "Gran Hotel La Florida");
        cy.get("button[aria-haspopup='dialog']").first().click();
      });
      it("it should be able to change the number of adults", () => {
        cy.get("button[aria-label='increment-Adults']").click();
        cy.get("span[aria-label='value-Adults']").should("contain", "2");
        cy.get("button[aria-label='decrement-Adults']").click();
        cy.get("span[aria-label='value-Adults']").should("contain", "1");
        cy.get("button[aria-label='decrement-Adults']").should("be.disabled");
      });
      it("it should be able to change the number of children", () => {
        cy.get("button[aria-label='increment-Children']").click();
        cy.get("span[aria-label='value-Children']").should("contain", "1");
        cy.get("button[aria-label='decrement-Children']").click();
        cy.get("span[aria-label='value-Children']").should("contain", "0");
        cy.get("button[aria-label='decrement-Children']").should("be.disabled");
      });
      it("it should be able to change the number of rooms", () => {
        cy.get("button[aria-label='increment-Rooms']").click();
        cy.get("span[aria-label='value-Rooms']").should("contain", "2");
        cy.get("button[aria-label='decrement-Rooms']").click();
        cy.get("span[aria-label='value-Rooms']").should("contain", "1");
        cy.get("button[aria-label='decrement-Rooms']").should("be.disabled");
      });
      it("it should be able to select the dates", () => {
        cy.get("h1").first().should("contain", "Details and Availability");
        cy.get("div[aria-label='Monday, January 15, 2024']").click();
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("div[aria-label='Monday, January 22, 2024']").click();
        cy.get("button[type='submit']").should("be.enabled");
      });
      it("it should be able to see the price", () => {
        cy.get("h1").first().should("contain", "Details and Availability");
        cy.get("div[aria-label='Monday, January 15, 2024']").click();
        cy.get("div[aria-label='Monday, January 22, 2024']").click();
        cy.get("button[type='submit']").should("be.enabled");
        cy.get("strong[aria-label='total-price']").should("contain", "$2,000");
      });
      it("it should be able to update the price when the number of adults changes", () => {
        cy.get("h1").first().should("contain", "Details and Availability");
        cy.get("div[aria-label='Monday, January 15, 2024']").click();
        cy.get("div[aria-label='Monday, January 22, 2024']").click();
        cy.get("button[type='submit']").should("be.enabled");
        cy.get("strong[aria-label='total-price']").should("contain", "$2,000");
        cy.get("button[aria-label='increment-Adults']").click();
        cy.get("strong[aria-label='total-price']").should("contain", "$3,000");
      });
      it("it should be able to click 'Continue' after selecting the dates", () => {
        cy.get("h1").first().should("contain", "Details and Availability");
        cy.get("div[aria-label='Monday, January 15, 2024']").click();
        cy.get("div[aria-label='Monday, January 22, 2024']").click();
        cy.get("button[type='submit']").should("be.enabled");
        cy.get("button[type='submit']").click();
        cy.get("h1").first().should("contain", "Information");
      });
      it("it should be able to click 'Cancel' and close the dialog", () => {
        cy.get("h1").first().should("contain", "Details and Availability");
        cy.get("button[aria-label='cancel-button']").click();
        cy.get("p").first().should("contain", "Gran Hotel La Florida");
      });
      describe("User info form", () => {
        beforeEach(() => {
          cy.visit("http://localhost:5173/");
          cy.get("button[aria-label='explore']").click();
          cy.get("button[aria-haspopup='dialog']").first().click();
          cy.get("h1").first().should("contain", "Details and Availability");
          cy.get("div[aria-label='Monday, January 15, 2024']").click();
          cy.get("div[aria-label='Monday, January 22, 2024']").click();
          cy.get("button[type='submit']").should("be.enabled");
          cy.get("button[type='submit']").click();
          cy.get("h1").first().should("contain", "Information");
        });
        it("should be able to change the inputs on the user info form", () => {
          cy.get("input[name='firstName']").type("John");
          cy.get("input[name='lastName']").type("Doe");
          cy.get("input[name='email']").type("john.doe@email.com");
          cy.get("input[name='creditCardNumber']").type("1111111111111111");
          cy.get("button[type='submit']").should("be.enabled");
          cy.get("button[type='submit']").click();
        });
      });
      describe("Review", () => {
        beforeEach(() => {
          cy.visit("http://localhost:5173/");
          cy.get("button[aria-label='explore']").click();
          cy.get("button[aria-haspopup='dialog']").first().click();
          cy.get("h1").first().should("contain", "Details and Availability");
          cy.get("div[aria-label='Monday, January 15, 2024']").click();
          cy.get("div[aria-label='Monday, January 22, 2024']").click();
          cy.get("button[type='submit']").should("be.enabled");
          cy.get("button[type='submit']").click();
          cy.get("h1").first().should("contain", "Information");
          cy.get("input[name='firstName']").type("John");
          cy.get("input[name='lastName']").type("Doe");
          cy.get("input[name='email']").type("john.doe@email.com");
          cy.get("input[name='creditCardNumber']").type("1111111111111111");
          cy.get("button[type='submit']").should("be.enabled");
          cy.get("button[type='submit']").click();
        });
        it("should be able to see the review page", () => {
          cy.get("h1").first().should("contain", "Review");
          cy.get("div[aria-label='Booking period']").should(
            "contain",
            "01/15/2024 to 01/22/2024"
          );
          cy.get("div[aria-label='Room details']").should("contain", "1 1 0");
          cy.get("div[aria-label='Total price']").should("contain", "$2,000");
        });
        it("should be able to click 'Confirm' and see the toast", () => {
          cy.get("button[type='submit']").should("be.enabled");
          cy.get("button[type='submit']").click();
          cy.get("span").first().should("contain", "Welcome to");
          cy.get("div[role='alert']").should(
            "contain",
            "Booking created successfully!"
          );
        });
      });
    });
  });
  describe("edit mode", () => {});
});
describe("booked dates in hotel calendar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("button[aria-label='explore']").click();
    cy.get("button[aria-haspopup='dialog']").first().click();
    cy.get("h1").first().should("contain", "Details and Availability");
    cy.get("div[aria-label='Monday, January 15, 2024']").click();
    cy.get("div[aria-label='Monday, January 22, 2024']").click();
    cy.get("button[type='submit']").should("be.enabled");
    cy.get("button[type='submit']").click();
    cy.get("h1").first().should("contain", "Information");
    cy.get("input[name='firstName']").type("John");
    cy.get("input[name='lastName']").type("Doe");
    cy.get("input[name='email']").type("john.doe@email.com");
    cy.get("input[name='creditCardNumber']").type("1111111111111111");
    cy.get("button[type='submit']").should("be.enabled");
    cy.get("button[type='submit']").click();
    cy.get("button[type='submit']").should("be.enabled");
    cy.get("button[type='submit']").click();
    cy.get("span").first().should("contain", "Welcome to");
    cy.get("div[role='alert']").should(
      "contain",
      "Booking created successfully!"
    );
  });
  it("should be able to see the booked hotel dates", () => {
    cy.get("button[aria-label='explore']").click();
    cy.get("button[aria-haspopup='dialog']").first().click();
    cy.get("div[aria-label='Monday, January 15, 2024']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
    cy.get("div[aria-label='Tuesday, January 16, 2024']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
    cy.get("div[aria-label='Monday, January 22, 2024']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
  });
});
