import { ManualInput } from "./manualInput";
import { mount } from "cypress/react18";

describe("<ManualInput />", () => {
  it("clicks up button", () => {
    mount(
      <ManualInput
        initialValue="1"
        label="Test"
        onChange={() => {}}
        minimumValue="0"
      />
    );
    cy.get("button[aria-label='increment-Test']").click();
    cy.get("span[aria-label='value-Test']").should("have.text", "2");
  });
  it("clicks down button", () => {
    mount(
      <ManualInput
        initialValue="1"
        label="Test"
        onChange={() => {}}
        minimumValue="0"
      />
    );
    cy.get("button[aria-label='decrement-Test']").click();
    cy.get("span[aria-label='value-Test']").should("have.text", "0");
  });
  it("clicks down button and checks if it is disabled", () => {
    mount(
      <ManualInput
        initialValue="0"
        label="Test"
        onChange={() => {}}
        minimumValue="0"
      />
    );
    cy.get("button[aria-label='decrement-Test']").should(
      "have.attr",
      "disabled"
    );
  });
});
