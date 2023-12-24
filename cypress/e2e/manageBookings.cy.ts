describe("read bookings", () => {
  describe("explore tab", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
    it("it should see no bookings message", () => {
      cy.get("button[aria-label='bookings']").click();
      cy.get("span").should("contain", "You have no bookings yet.");
    });
    describe("with bookings", () => {
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
        cy.get("button[aria-label='bookings']").click();
      });
      it("it should create a booking and see it in the list", () => {
        cy.viewport("macbook-16");
        // parent does not have display: none
        cy.get("tbody").find("tr").eq(1).parent().should("have.length", 1);
        cy.get("tbody").find("tr").first().find("td").should("have.length", 6);
        cy.get("td[aria-label='row-title']").should(
          "contain",
          "Gran Hotel La Florida"
        );
        cy.get("td[aria-label='row-period']")
          .find("div")
          .find("span")
          .first()
          .should("contain", "01/15/24");
        cy.get("td[aria-label='row-period']")
          .find("div")
          .find("span")
          .last()
          .should("contain", "01/22/24");
        cy.get("td[aria-label='row-price']").should("contain", "$8,000");
        cy.get("span[aria-label='adults-number']").should("contain", "1");
        cy.get("span[aria-label='children-number']").should("contain", "0");
        cy.get("span[aria-label='rooms-number']").should("contain", "1");
        cy.get("td[aria-label='row-status']").should("contain", "Active");
      });
      it.only("it should be able to cancel a booking", () => {
        cy.get("td[aria-label='row-actions']").find("button").eq(1).click();
        cy.get("button").contains("Yes, cancel booking").click();
        cy.get("div[role='alert']").should(
          "contain",
          "Booking cancelled successfully!"
        );
        cy.get("td[aria-label='row-status']").should("contain", "Cancelled");
      });

      it("it should be able to cancel a booking and see the dates available again", () => {
        cy.get("td[aria-label='row-actions']").find("button").eq(1).click();
        cy.get("button").contains("Yes, cancel booking").click();
        cy.get("div[role='alert']").should(
          "contain",
          "Booking cancelled successfully!"
        );
        cy.get("td[aria-label='row-status']").should("contain", "Cancelled");
        cy.get("td[aria-label='row-actions']")
          .find("button")
          .eq(1)
          .should("have.length", 0);
        cy.get("button[aria-label='explore']").click();
        cy.get("button[aria-haspopup='dialog']").first().click();
        cy.get("div[aria-label='Monday, January 15, 2024']").should(
          "not.have.attr",
          "data-unavailable"
        );
        cy.get("div[aria-label='Tuesday, January 16, 2024']").should(
          "not.have.attr",
          "data-unavailable"
        );
        cy.get("div[aria-label='Monday, January 22, 2024']").should(
          "not.have.attr",
          "data-unavailable"
        );
      });
      it("it should be able to see the dates selected when editing a booking", () => {
        cy.get("td[aria-label='row-actions']").find("button").first().click();
        cy.get("h1").first().should("contain", "Availability");
        cy.get("div[data-selection-start='true']").should("contain", "15");
        cy.get("div[data-selection-end='true']").should("contain", "22");
      });
      it("it should be able to change the number of adults and see the price on bookings list", () => {
        cy.get("td[aria-label='row-actions']").find("button").first().click();
        cy.get("h1").first().should("contain", "Availability");
        cy.get("span[aria-label='value-Adults']").should("contain", "1");
        cy.get("button[aria-label='increment-Adults']").click();
        cy.get("span[aria-label='value-Adults']").should("contain", "2");
        cy.get("strong[aria-label='total-price']").should("contain", "$3,000");
        cy.get("button[type='submit']").click();
        cy.get("h1").first().should("contain", "Information");
        cy.get("input[name='firstName']").should("have.value", "John");
        cy.get("input[name='lastName']").should("have.value", "Doe");
        cy.get("input[name='email']").should(
          "have.value",
          "john.doe@email.com"
        );
        cy.get("input[name='creditCardNumber']").should(
          "have.value",
          "1111111111111111"
        );
        cy.get("button[type='submit']").click();
        cy.get("div[aria-label='Room details']").should("contain", "2 1 0");
        cy.get("div[aria-label='Total price']").should("contain", "$3,000");
        cy.get("button[type='submit']").click();
        cy.get("div[role='alert']").should(
          "contain",
          "Booking updated successfully!"
        );
        cy.get("span[aria-label='adults-number']").should("contain", "2");
        cy.get("span[aria-label='children-number']").should("contain", "0");
        cy.get("span[aria-label='rooms-number']").should("contain", "1");
        cy.get("td[aria-label='row-price']").should("contain", "$3,000");
      });
      it("should be able to change the bookings view and click to edit", () => {
        cy.viewport("iphone-x");
        cy.get("button[aria-label='change-view-mode']").click();
        cy.get("div[aria-label='card-actions-buttons']")
          .find("button")
          .should("have.length", 2);
        cy.get("div[aria-label='card-actions-buttons']")
          .find("button")
          .first()
          .click();
        cy.get("h1").first().should("contain", "Details and Availability");
      });
      it("should be able to change the bookings view and click to cancel", () => {
        cy.viewport("iphone-x");
        cy.get("button[aria-label='change-view-mode']").click();
        cy.get("div[aria-label='card-actions-buttons']")
          .find("button")
          .should("have.length", 2);
        cy.get("div[aria-label='card-actions-buttons']")
          .find("button")
          .last()
          .click();
        cy.get("h1").first().should("contain", "Cancelling booking");
      });
    });
  });
});
