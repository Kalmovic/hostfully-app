import { DateSelection } from "./dateSelection";
import { Dialog, Theme } from "@radix-ui/themes";
import { theme } from "../providers/theme";
import { ThemeProvider } from "styled-components";
import { Button } from "../components/button";
import { mount } from "cypress/react18";

describe("<DateSelection />", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    mount(render());
  });
  const render = () => (
    <Theme>
      <ThemeProvider theme={theme}>
        <Dialog.Root>
          <DateSelection
            data={{}}
            defaultPrice={100}
            mode="create"
            unavailableDates={[]}
            onSubmit={() => {}}
            cancelButton={<Button variant="secondary">Cancel</Button>}
          />
        </Dialog.Root>
      </ThemeProvider>
    </Theme>
  );
  it("changes the number of adults", () => {
    cy.get("span[aria-label='value-Adults']").should("contain", "1");
    cy.get("button[aria-label='increment-Adults']").click();
    cy.get("span[aria-label='value-Adults']").should("contain", "2");
  });
  it("changes the number of children", () => {
    cy.get("span[aria-label='value-Children']").should("contain", "0");
    cy.get("button[aria-label='increment-Children']").click();
    cy.get("span[aria-label='value-Children']").should("contain", "1");
  });
  it("changes the number of rooms", () => {
    cy.get("span[aria-label='value-Rooms']").should("contain", "1");
    cy.get("button[aria-label='increment-Rooms']").click();
    cy.get("span[aria-label='value-Rooms']").should("contain", "2");
  });
  it("sets range", () => {
    cy.get("div[aria-label='Friday, January 26, 2024']").click();
    cy.get("div[aria-label='Saturday, January 27, 2024']").click();
    cy.get("strong[aria-label='total-price']").should("contain", "$300");
    cy.get("button").contains("Continue").should("not.be.disabled");
  });
  it("changes total price when changing number of adults", () => {
    cy.get("div[aria-label='Friday, January 26, 2024']").click();
    cy.get("div[aria-label='Saturday, January 27, 2024']").click();
    cy.get("span[aria-label='value-Adults']").should("contain", "1");
    cy.get("strong[aria-label='total-price']").should("contain", "$300");
    cy.get("button[aria-label='increment-Adults']").click();
    cy.get("span[aria-label='value-Adults']").should("contain", "2");
    cy.get("strong[aria-label='total-price']").should("contain", "$800");
  });
  it("changes total price when changing number of children", () => {
    cy.get("div[aria-label='Friday, January 26, 2024']").click();
    cy.get("div[aria-label='Saturday, January 27, 2024']").click();
    cy.get("span[aria-label='value-Children']").should("contain", "0");
    cy.get("strong[aria-label='total-price']").should("contain", "$300");
    cy.get("button[aria-label='increment-Children']").click();
    cy.get("span[aria-label='value-Children']").should("contain", "1");
    cy.get("strong[aria-label='total-price']").should("contain", "$600");
  });
  it("changes total price when changing number of rooms", () => {
    cy.get("div[aria-label='Friday, January 26, 2024']").click();
    cy.get("div[aria-label='Saturday, January 27, 2024']").click();
    cy.get("span[aria-label='value-Rooms']").should("contain", "1");
    cy.get("strong[aria-label='total-price']").should("contain", "$300");
    cy.get("button[aria-label='increment-Rooms']").click();
    cy.get("span[aria-label='value-Rooms']").should("contain", "2");
    cy.get("strong[aria-label='total-price']").should("contain", "$800");
  });
});
