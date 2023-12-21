import { DateSelection } from "./dateSelection";
import { Dialog, Theme } from "@radix-ui/themes";
import { theme } from "../providers/theme";
import { ThemeProvider } from "styled-components";
import { Button } from "../components/button";
import { mount } from "cypress/react18";

describe("<DateSelection />", () => {
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
    mount(render());
    cy.get("span[aria-label='value-Adults']").should("contain", "1");
    cy.get("button[aria-label='increment-Adults']").click();
    cy.get("span[aria-label='value-Adults']").should("contain", "2");
  });
  it("changes the number of children", () => {
    mount(render());
    cy.get("span[aria-label='value-Children']").should("contain", "0");
    cy.get("button[aria-label='increment-Children']").click();
    cy.get("span[aria-label='value-Children']").should("contain", "1");
  });
  it("changes the number of rooms", () => {
    mount(render());
    cy.get("span[aria-label='value-Rooms']").should("contain", "1");
    cy.get("button[aria-label='increment-Rooms']").click();
    cy.get("span[aria-label='value-Rooms']").should("contain", "2");
  });
  it("sets range", () => {
    mount(render());
    cy.get("div[aria-label='Tuesday, December 26, 2023']").click();
    cy.get("div[aria-label='Wednesday, December 27, 2023']").click();
    cy.get("strong[aria-label='total-price']").should("contain", "$400");
    cy.get("button").contains("Continue").should("not.be.disabled");
  });
  it("changes total price when changing number of adults", () => {
    mount(render());
    cy.get("div[aria-label='Tuesday, December 26, 2023']").click();
    cy.get("div[aria-label='Wednesday, December 27, 2023']").click();
    cy.get("span[aria-label='value-Adults']").should("contain", "1");
    cy.get("strong[aria-label='total-price']").should("contain", "$400");
    cy.get("button[aria-label='increment-Adults']").click();
    cy.get("span[aria-label='value-Adults']").should("contain", "2");
    cy.get("strong[aria-label='total-price']").should("contain", "$600");
  });
  it("changes total price when changing number of children", () => {
    mount(render());
    cy.get("div[aria-label='Tuesday, December 26, 2023']").click();
    cy.get("div[aria-label='Wednesday, December 27, 2023']").click();
    cy.get("span[aria-label='value-Children']").should("contain", "0");
    cy.get("strong[aria-label='total-price']").should("contain", "$400");
    cy.get("button[aria-label='increment-Children']").click();
    cy.get("span[aria-label='value-Children']").should("contain", "1");
    cy.get("strong[aria-label='total-price']").should("contain", "$500");
  });
  it("changes total price when changing number of rooms", () => {
    mount(render());
    cy.get("div[aria-label='Tuesday, December 26, 2023']").click();
    cy.get("div[aria-label='Wednesday, December 27, 2023']").click();
    cy.get("span[aria-label='value-Rooms']").should("contain", "1");
    cy.get("strong[aria-label='total-price']").should("contain", "$400");
    cy.get("button[aria-label='increment-Rooms']").click();
    cy.get("span[aria-label='value-Rooms']").should("contain", "2");
    cy.get("strong[aria-label='total-price']").should("contain", "$600");
  });
});
